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
    fetcher: async (url, init) => {
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
