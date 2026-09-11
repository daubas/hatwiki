import assert from 'node:assert/strict';
import test from 'node:test';
import { createGitHubRepository } from '../src/lib/githubRepository.ts';

test('commitPage writes an explicit safe ref to GitHub', async () => {
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

  await repository.commitPage({
    pageId: 'concepts/hatwiki',
    baseSha: 'base-sha',
    content: 'Updated content',
    message: 'Update HatWiki',
    ref: 'contrib/u-42/agent-notes',
  });

  assert.equal(calls.length, 1);
  assert.equal(JSON.parse(calls[0].init.body as string).branch, 'contrib/u-42/agent-notes');
});

test('saveCandidate writes an explicit safe ref to GitHub', async () => {
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

  await repository.saveCandidate({
    pageId: 'concepts/hatwiki',
    content: 'Candidate body',
    requestId: 'request-1',
    message: 'Save candidate',
    ref: 'contrib/u-42/agent-notes',
  });

  assert.equal(calls.length, 1);
  assert.equal(JSON.parse(calls[0].init.body as string).branch, 'contrib/u-42/agent-notes');
});

test('omitting ref keeps the repository branch for canonical writes', async () => {
  const branches: string[] = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async (_url, init) => {
      branches.push(JSON.parse(init.body as string).branch);
      return new Response(JSON.stringify({ commit: { sha: 'commit-sha' } }), { status: 201 });
    },
  });

  await repository.commitPage({ pageId: 'concepts/hatwiki', baseSha: 'base-sha', content: 'body', message: 'Update' });
  await repository.saveCandidate({ pageId: 'concepts/hatwiki', content: 'candidate', requestId: 'request-1', message: 'Save' });

  assert.deepEqual(branches, ['main', 'main']);
});

test('rejects unsafe refs before making a GitHub write', async () => {
  let calls = 0;
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async () => {
      calls += 1;
      return new Response(JSON.stringify({ commit: { sha: 'unexpected-sha' } }), { status: 201 });
    },
  });

  for (const ref of ['main?x', '../wiki-live']) {
    await assert.rejects(() => repository.commitPage({
      pageId: 'concepts/hatwiki',
      baseSha: 'base-sha',
      content: 'body',
      message: 'Update',
      ref,
    }));
    await assert.rejects(() => repository.saveCandidate({
      pageId: 'concepts/hatwiki',
      content: 'candidate',
      requestId: 'request-1',
      message: 'Save',
      ref,
    }));
  }

  assert.equal(calls, 0);
});

test('rejects unsafe refs before making a GitHub read', async () => {
  let calls = 0;
  const repository = createGitHubRepository({
    owner: 'acme', repo: 'hatwiki', branch: 'main', token: 'secret-token',
    fetcher: async () => { calls += 1; return new Response('{}', { status: 200 }); },
  });

  await assert.rejects(() => repository.readPage('concepts/hatwiki', 'main?x'), /Invalid branch reference/);
  await assert.rejects(() => repository.readPage('concepts/hatwiki', '../wiki-live'), /Invalid branch reference/);
  assert.equal(calls, 0);
});
