import assert from 'node:assert/strict';
import test from 'node:test';
import { createGitHubRepository } from '../src/lib/githubRepository.ts';
import { StalePageError } from '../src/lib/editContracts.ts';

test('readPage fetches a wiki file and decodes its UTF-8 content', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async function (this: undefined, url, init) {
      assert.equal(this, undefined);
      calls.push({ url, init });
      return new Response(
        JSON.stringify({
          sha: 'page-sha',
          content: 'SGVsbG8sIOS4lueVjA==',
        }),
        { status: 200 },
      );
    },
  });

  const page = await repository.readPage('concepts/hatwiki');

  assert.deepEqual(page, { sha: 'page-sha', content: 'Hello, 世界' });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.github.com/repos/acme/hatwiki/contents/wiki/concepts/hatwiki.md?ref=main');
  assert.equal(calls[0].init.method, 'GET');
  assert.equal(calls[0].init.headers && (calls[0].init.headers as Record<string, string>).Authorization, 'Bearer secret-token');
  assert.equal(calls[0].init.headers && (calls[0].init.headers as Record<string, string>)['User-Agent'], 'HatWiki-WebMCP');
});

test('readPage returns null for a missing GitHub file', async () => {
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async () => new Response('', { status: 404 }),
  });

  assert.equal(await repository.readPage('missing/page'), null);
});

test('reads and writes a knowledge bundle at the repository root', async () => {
  const requestedUrls: string[] = [];
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'knowledge', branch: 'main', contentRoot: '', token: 'secret-token',
    fetcher: async (url, init) => {
      requestedUrls.push(url);
      return init.method === 'GET'
        ? new Response(JSON.stringify({ sha: 'page-sha', content: 'SGVsbG8=' }), { status: 200 })
        : new Response(JSON.stringify({ commit: { sha: 'commit-sha' } }), { status: 201 });
    },
  });

  await repository.readPage('concepts/webmcp');
  await repository.commitPage({ pageId: 'concepts/webmcp', baseSha: 'page-sha', content: 'Updated', message: 'Update' });

  assert.deepEqual(requestedUrls, [
    'https://api.github.com/repos/acme/knowledge/contents/concepts/webmcp.md?ref=main',
    'https://api.github.com/repos/acme/knowledge/contents/concepts/webmcp.md',
  ]);
});

test('commitPage writes the canonical wiki file with its base SHA', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      return new Response(JSON.stringify({ commit: { sha: 'commit-sha' } }), { status: 201 });
    },
  });

  const result = await repository.commitPage({
    pageId: 'concepts/hatwiki',
    baseSha: 'base-sha',
    content: 'Updated content',
    message: 'Update HatWiki',
  });

  assert.deepEqual(result, { revision: 'commit-sha' });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.github.com/repos/acme/hatwiki/contents/wiki/concepts/hatwiki.md');
  assert.equal(calls[0].init.method, 'PUT');
  assert.deepEqual(JSON.parse(calls[0].init.body as string), {
    message: 'Update HatWiki',
    content: 'VXBkYXRlZCBjb250ZW50',
    branch: 'main',
    sha: 'base-sha',
  });
});

test('saveCandidate writes under encoded canonical candidate segments without a SHA', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      return new Response(JSON.stringify({ commit: { sha: 'candidate-sha' } }), { status: 201 });
    },
  });

  const result = await repository.saveCandidate({
    pageId: 'concepts/hat wiki',
    content: 'Candidate body',
    requestId: 'req-123',
    message: 'Save candidate',
  });

  assert.deepEqual(result, { revision: 'candidate-sha' });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.github.com/repos/acme/hatwiki/contents/candidates/concepts/hat%20wiki/req-123.md');
  assert.equal(calls[0].init.method, 'PUT');
  assert.deepEqual(JSON.parse(calls[0].init.body as string), {
    message: 'Save candidate',
    content: 'Q2FuZGlkYXRlIGJvZHk=',
    branch: 'main',
  });
  assert.equal(Object.hasOwn(JSON.parse(calls[0].init.body as string), 'sha'), false);
});

test('rejects unsafe page paths before making a GitHub request', async () => {
  let calls = 0;
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async () => {
      calls += 1;
      return new Response('{}', { status: 200 });
    },
  });

  for (const pageId of ['', '.', '..', 'concepts/../hatwiki', 'concepts//hatwiki']) {
    await assert.rejects(() => repository.readPage(pageId), /Invalid page path/);
    await assert.rejects(() => repository.findRequestRevision(pageId, 'req-1'), /Invalid page path/);
    await assert.rejects(
      () => repository.commitPage({ pageId, baseSha: 'base-sha', content: 'body', message: 'message' }),
      /Invalid page path/,
    );
    await assert.rejects(
      () => repository.saveCandidate({ pageId, content: 'body', requestId: 'req-1', message: 'message' }),
      /Invalid page path/,
    );
  }
  await assert.rejects(() => repository.findRequestRevision('concepts/hatwiki', ''), /Invalid candidate path/);
  await assert.rejects(
    () => repository.saveCandidate({ pageId: 'concepts/hatwiki', content: 'body', requestId: '', message: 'message' }),
    /Invalid candidate path/,
  );

  assert.equal(calls, 0);
});

test('does not include the token in GitHub error messages', async () => {
  const token = 'secret-token';
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token,
    fetcher: async () => new Response(JSON.stringify({ message: token }), { status: 500 }),
  });

  await assert.rejects(() => repository.commitPage({
    pageId: 'concepts/hatwiki',
    baseSha: 'base-sha',
    content: 'body',
    message: 'message',
  }), (error: unknown) => {
    assert.equal(error instanceof Error, true);
    assert.equal((error as Error).message.includes(token), false);
    assert.match((error as Error).message, /500/);
    return true;
  });
});

test('reports a GitHub commit conflict as a stale page', async () => {
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async () => new Response('{}', { status: 409 }),
  });

  await assert.rejects(repository.commitPage({
    pageId: 'concepts/hatwiki', baseSha: 'old-blob', content: 'Updated', message: 'Edit',
  }), StalePageError);
});

test('findRequestRevision returns the first page commit with an exact request trailer', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      return new Response(JSON.stringify([
        { sha: 'other-sha', commit: { message: 'Other edit\n\nHatWiki-Request-ID: other' } },
        { sha: 'page-sha', commit: { message: 'Retry me\n\nHatWiki-Request-ID: request-1' } },
      ]), { status: 200 });
    },
  });

  const result = await repository.findRequestRevision('concepts/hatwiki', 'request-1');

  assert.deepEqual(result, { kind: 'page', revision: 'page-sha' });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.github.com/repos/acme/hatwiki/commits?path=wiki%2Fconcepts%2Fhatwiki.md&sha=main&per_page=100');
  assert.equal(calls[0].init.method, 'GET');
  assert.equal(calls[0].init.headers && (calls[0].init.headers as Record<string, string>)['X-GitHub-Api-Version'], '2022-11-28');
});

test('findRequestRevision recovery requires the exact actor and source task trailers', async () => {
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async () => new Response(JSON.stringify([
      { sha: 'wrong-actor', commit: { message: 'Edit\n\nHatWiki-User-ID: 99\nHatWiki-Request-ID: request-1\nHatWiki-Source-Task: task-1' } },
      { sha: 'missing-source', commit: { message: 'Edit\n\nHatWiki-User-ID: 7\nHatWiki-Request-ID: request-1' } },
      { sha: 'exact', commit: { message: 'Edit\n\nHatWiki-User-ID: 7\nHatWiki-Request-ID: request-1\nHatWiki-Source-Task: task-1' } },
    ]), { status: 200 }),
  });
  assert.deepEqual(await repository.findRequestRevision('concepts/hatwiki', 'request-1', { actorUserId: 7, sourceTaskId: 'task-1' }), { kind: 'page', revision: 'exact' });
});

test('findRequestRevision falls back to the deterministic candidate path', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'feature/release',
    token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      const payload = calls.length === 1
        ? [{ sha: 'near-match', commit: { message: 'Edit\n\nHatWiki-Request-ID: request-1-extra' } }]
        : [{ sha: 'candidate-sha', commit: { message: 'Conflict candidate\n\nHatWiki-Request-ID: request-1' } }];
      return new Response(JSON.stringify(payload), { status: 200 });
    },
  });

  const result = await repository.findRequestRevision('concepts/hat wiki', 'request-1');

  assert.deepEqual(result, { kind: 'candidate', revision: 'candidate-sha' });
  assert.deepEqual(calls.map(({ url }) => url), [
    'https://api.github.com/repos/acme/hatwiki/commits?path=wiki%2Fconcepts%2Fhat%20wiki.md&sha=feature%2Frelease&per_page=100',
    'https://api.github.com/repos/acme/hatwiki/commits?path=candidates%2Fconcepts%2Fhat%20wiki%2Frequest-1.md&sha=feature%2Frelease&per_page=100',
  ]);
  assert.equal(calls.every(({ init }) => (init.headers as Record<string, string>)['X-GitHub-Api-Version'] === '2022-11-28'), true);
});

test('findRequestRevision treats a missing or empty commit history as null', async () => {
  const calls: string[] = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async (url) => {
      calls.push(url);
      return calls.length === 1 ? new Response('', { status: 404 }) : new Response('[]', { status: 200 });
    },
  });

  assert.equal(await repository.findRequestRevision('concepts/hatwiki', 'request-1'), null);
  assert.equal(calls.length, 2);
});

test('ensureBranch reuses an existing validated contributor branch without writing', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      return new Response(JSON.stringify({ object: { sha: 'a'.repeat(40) } }), { status: 200 });
    },
  });

  assert.deepEqual(await repository.ensureBranch({ branch: 'contrib/u-42/geo' }), {
    branch: 'contrib/u-42/geo', sha: 'a'.repeat(40), created: false,
  });
  assert.deepEqual(calls.map(({ url, init }) => [url, init.method]), [[
    'https://api.github.com/repos/acme/hatwiki/git/ref/heads/contrib%2Fu-42%2Fgeo', 'GET',
  ]]);
});

test('ensureBranch creates a missing contributor branch from wiki-live without force', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const baseSha = 'b'.repeat(40);
  const createdSha = 'c'.repeat(40);
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      if (calls.length === 1) return new Response('', { status: 404 });
      if (calls.length === 2) return new Response(JSON.stringify({ object: { sha: baseSha } }), { status: 200 });
      return new Response(JSON.stringify({ object: { sha: createdSha } }), { status: 201 });
    },
  });

  assert.deepEqual(await repository.ensureBranch({ branch: 'contrib/u-42/geo' }), {
    branch: 'contrib/u-42/geo', sha: createdSha, created: true, baseRef: 'wiki-live',
  });
  assert.deepEqual(calls.map(({ url, init }) => [url, init.method]), [
    ['https://api.github.com/repos/acme/hatwiki/git/ref/heads/contrib%2Fu-42%2Fgeo', 'GET'],
    ['https://api.github.com/repos/acme/hatwiki/git/ref/heads/wiki-live', 'GET'],
    ['https://api.github.com/repos/acme/hatwiki/git/refs', 'POST'],
  ]);
  assert.deepEqual(JSON.parse(calls[2].init.body as string), {
    ref: 'refs/heads/contrib/u-42/geo', sha: baseSha,
  });
});

test('ensureBranch can create a contributor branch from the configured public ref', async () => {
  const calls: string[] = [];
  const baseSha = '2'.repeat(40);
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push(`${init?.method}:${url}`);
      if (calls.length === 1) return new Response('', { status: 404 });
      if (calls.length === 2) return new Response(JSON.stringify({ object: { sha: baseSha } }), { status: 200 });
      return new Response(JSON.stringify({ object: { sha: '3'.repeat(40) } }), { status: 201 });
    },
  });

  assert.deepEqual(await repository.ensureBranch({ branch: 'contrib/u-42/geo', baseRef: 'release' }), {
    branch: 'contrib/u-42/geo', sha: '3'.repeat(40), created: true, baseRef: 'release',
  });
  assert.deepEqual(calls, [
    'GET:https://api.github.com/repos/acme/hatwiki/git/ref/heads/contrib%2Fu-42%2Fgeo',
    'GET:https://api.github.com/repos/acme/hatwiki/git/ref/heads/release',
    'POST:https://api.github.com/repos/acme/hatwiki/git/refs',
  ]);
});

test('ensureBranch rejects an unsafe configured public ref before contacting GitHub', async () => {
  let calls = 0;
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async () => { calls += 1; return new Response('{}', { status: 200 }); },
  });

  await assert.rejects(() => repository.ensureBranch({ branch: 'contrib/u-42/geo', baseRef: '../main' }), /Invalid branch reference/);
  assert.equal(calls, 0);
});

test('ensureBranch falls back from a missing wiki-live ref to main', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const baseSha = 'd'.repeat(40);
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      if (calls.length < 3) return new Response('', { status: 404 });
      if (calls.length === 3) return new Response(JSON.stringify({ object: { sha: baseSha } }), { status: 200 });
      return new Response(JSON.stringify({ object: { sha: 'e'.repeat(40) } }), { status: 201 });
    },
  });

  assert.deepEqual(await repository.ensureBranch({ branch: 'contrib/u-42/geo' }), {
    branch: 'contrib/u-42/geo', sha: 'e'.repeat(40), created: true, baseRef: 'main',
  });
  assert.deepEqual(calls.map(({ url }) => url), [
    'https://api.github.com/repos/acme/hatwiki/git/ref/heads/contrib%2Fu-42%2Fgeo',
    'https://api.github.com/repos/acme/hatwiki/git/ref/heads/wiki-live',
    'https://api.github.com/repos/acme/hatwiki/git/ref/heads/main',
    'https://api.github.com/repos/acme/hatwiki/git/refs',
  ]);
});

test('ensureBranch recovers a competing 422 create by reading the branch again', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      if (calls.length === 1) return new Response('', { status: 404 });
      if (calls.length === 2) return new Response(JSON.stringify({ object: { sha: 'f'.repeat(40) } }), { status: 200 });
      if (calls.length === 3) return new Response('{}', { status: 422 });
      return new Response(JSON.stringify({ object: { sha: '1'.repeat(40) } }), { status: 200 });
    },
  });

  assert.deepEqual(await repository.ensureBranch({ branch: 'contrib/u-42/geo' }), {
    branch: 'contrib/u-42/geo', sha: '1'.repeat(40), created: false,
  });
  assert.equal(calls.length, 4);
});

test('ensureBranch rejects unsafe or non-contributor refs before contacting GitHub', async () => {
  let calls = 0;
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async () => { calls += 1; return new Response('{}', { status: 200 }); },
  });

  for (const branch of ['main', 'contrib/octo/geo', 'contrib/u-0/geo', 'contrib/u-42/geo/extra', 'contrib/u-42/../wiki-live', 'contrib/u-42/geo space']) {
    await assert.rejects(() => repository.ensureBranch({ branch }), /Invalid contribution branch/);
  }
  assert.equal(calls, 0);
});

test('ensureBranch does not include the installation token in ref errors', async () => {
  const token = 'secret-token';
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token,
    fetcher: async () => new Response(JSON.stringify({ message: token }), { status: 500 }),
  });

  await assert.rejects(() => repository.ensureBranch({ branch: 'contrib/u-42/geo' }), (error: unknown) => {
    assert.equal(error instanceof Error, true);
    assert.equal((error as Error).message.includes(token), false);
    assert.match((error as Error).message, /500/);
    return true;
  });
});
