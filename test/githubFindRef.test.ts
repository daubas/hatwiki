import assert from 'node:assert/strict';
import test from 'node:test';

import { createGitHubRepository } from '../src/lib/githubRepository.ts';

test('findRequestRevision uses the explicit ref for page and candidate history', async () => {
  const calls: string[] = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async (url) => {
      calls.push(url);
      return calls.length === 1
        ? new Response(JSON.stringify([{ sha: 'other-sha', commit: { message: 'Other edit\n\nHatWiki-Request-ID: other' } }]), { status: 200 })
        : new Response(JSON.stringify([{ sha: 'candidate-sha', commit: { message: 'Candidate edit\n\nHatWiki-User-ID: 42\nHatWiki-Request-ID: request-1' } }]), { status: 200 });
    },
  });

  const result = await repository.findRequestRevision(
    'concepts/hatwiki',
    'request-1',
    { actorUserId: 42 },
    'contrib/u-42/agent-notes',
  );

  assert.deepEqual(result, { kind: 'candidate', revision: 'candidate-sha' });
  assert.deepEqual(calls, [
    'https://api.github.com/repos/acme/hatwiki/commits?path=wiki%2Fconcepts%2Fhatwiki.md&sha=contrib%2Fu-42%2Fagent-notes&per_page=100',
    'https://api.github.com/repos/acme/hatwiki/commits?path=candidates%2Fconcepts%2Fhatwiki%2Frequest-1.md&sha=contrib%2Fu-42%2Fagent-notes&per_page=100',
  ]);
});

test('findRequestRevision keeps options.branch when ref is omitted', async () => {
  const calls: string[] = [];
  const repository = createGitHubRepository({
    owner: 'acme',
    repo: 'hatwiki',
    branch: 'main',
    token: 'secret-token',
    fetcher: async (url) => {
      calls.push(url);
      return new Response(JSON.stringify([{ sha: 'page-sha', commit: { message: 'Edit\n\nHatWiki-User-ID: 42\nHatWiki-Request-ID: request-1' } }]), { status: 200 });
    },
  });

  assert.deepEqual(
    await repository.findRequestRevision('concepts/hatwiki', 'request-1', { actorUserId: 42 }),
    { kind: 'page', revision: 'page-sha' },
  );
  assert.deepEqual(calls, [
    'https://api.github.com/repos/acme/hatwiki/commits?path=wiki%2Fconcepts%2Fhatwiki.md&sha=main&per_page=100',
  ]);
});
