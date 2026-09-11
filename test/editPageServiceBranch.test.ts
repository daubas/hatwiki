import assert from 'node:assert/strict';
import test from 'node:test';

import { createEditPageService } from '../src/lib/editPageService.ts';

const contributorRef = 'contrib/u-42/agent-notes';

test('commits a contributor edit as pending_live without publishing and keeps one ref', async () => {
  const calls: string[] = [];
  const stored: unknown[] = [];
  let published = 0;
  const service = createEditPageService({
    repository: {
      readPage: async (pageId, ref) => {
        calls.push(`read:${pageId}:${ref ?? 'head'}`);
        return ref === 'commit-contributor'
          ? { sha: 'blob-after', content: 'Updated note' }
          : { sha: 'blob-before', content: 'Old note' };
      },
      findRequestRevision: async (pageId, requestId, _identity, ref) => {
        calls.push(`find:${pageId}:${requestId}:${ref ?? 'default'}`);
        return null;
      },
      commitPage: async (input) => {
        calls.push(`commit:${input.pageId}:${input.ref ?? 'default'}`);
        return { revision: 'commit-contributor' };
      },
      saveCandidate: async (input) => {
        calls.push(`candidate:${input.pageId}:${input.ref ?? 'default'}`);
        return { revision: 'candidate-unused' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      claim: async () => ({ status: 'claimed' as const, token: 'lease' }),
      put: async (receipt) => {
        calls.push(`receipt.put:${receipt.status}`);
        stored.push(receipt);
      },
    },
    publisher: {
      publish: async ({ revision }) => {
        published += 1;
        calls.push(`publish:${revision}`);
        return { revision };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 42, login: 'octo' },
    {
      requestId: 'request-contributor',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: 'Updated note',
      reason: 'Clarify the note',
      ref: contributorRef,
    },
  );

  assert.deepEqual(result, { requestId: 'request-contributor', status: 'pending_live', revision: 'commit-contributor' });
  assert.deepEqual(calls, [
    'receipt.get',
    `find:guides/overview:request-contributor:${contributorRef}`,
    `read:guides/overview:${contributorRef}`,
    `commit:guides/overview:${contributorRef}`,
    'read:guides/overview:commit-contributor',
    'receipt.put:pending_live',
  ]);
  assert.equal(published, 0);
  assert.deepEqual(stored, [{ requestId: 'request-contributor', status: 'pending_live', revision: 'commit-contributor' }]);
});

test('recovers a contributor commit with the revision readback and explicit branch head', async () => {
  const calls: string[] = [];
  let published = 0;
  const service = createEditPageService({
    repository: {
      readPage: async (pageId, ref) => {
        calls.push(`read:${pageId}:${ref ?? 'head'}`);
        return { sha: 'recovered-sha', content: 'Recovered note' };
      },
      findRequestRevision: async (pageId, requestId, _identity, ref) => {
        calls.push(`find:${pageId}:${requestId}:${ref ?? 'default'}`);
        return { kind: 'page', revision: 'recovered-commit' };
      },
      commitPage: async () => {
        calls.push('commit:unexpected');
        return { revision: 'unexpected' };
      },
      saveCandidate: async () => {
        calls.push('candidate:unexpected');
        return { revision: 'unexpected' };
      },
    },
    receipts: {
      get: async () => null,
      claim: async () => ({ status: 'claimed' as const, token: 'lease' }),
      put: async ({ status }) => calls.push(`receipt.put:${status}`),
    },
    publisher: {
      publish: async ({ revision }) => {
        published += 1;
        calls.push(`publish:${revision}`);
        return { revision };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 42, login: 'octo' },
    {
      requestId: 'request-recovered-contributor',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: 'Recovered note',
      reason: 'Recover the note',
      ref: contributorRef,
    },
  );

  assert.deepEqual(result, {
    requestId: 'request-recovered-contributor',
    status: 'pending_live',
    revision: 'recovered-commit',
  });
  assert.deepEqual(calls, [
    `find:guides/overview:request-recovered-contributor:${contributorRef}`,
    'read:guides/overview:recovered-commit',
    `read:guides/overview:${contributorRef}`,
    'receipt.put:pending_live',
  ]);
  assert.equal(published, 0);
});

test('stores a stale contributor candidate on the same ref without publishing', async () => {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async (pageId, ref) => {
        calls.push(`read:${pageId}:${ref ?? 'head'}`);
        return { sha: 'blob-current', content: 'Old note' };
      },
      findRequestRevision: async (pageId, requestId, _identity, ref) => {
        calls.push(`find:${pageId}:${requestId}:${ref ?? 'default'}`);
        return null;
      },
      commitPage: async () => {
        calls.push('commit:unexpected');
        return { revision: 'unexpected' };
      },
      saveCandidate: async (input) => {
        calls.push(`candidate:${input.pageId}:${input.ref ?? 'default'}`);
        return { revision: 'candidate-contributor' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      claim: async () => ({ status: 'claimed' as const, token: 'lease' }),
      put: async ({ status }) => calls.push(`receipt.put:${status}`),
    },
    publisher: {
      publish: async ({ revision }) => {
        calls.push(`publish:${revision}`);
        return { revision };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 42, login: 'octo' },
    {
      requestId: 'request-stale-contributor',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: 'Updated note',
      reason: 'Clarify the note',
      ref: contributorRef,
    },
  );

  assert.deepEqual(result, {
    requestId: 'request-stale-contributor',
    status: 'conflict',
    candidateRevision: 'candidate-contributor',
  });
  assert.deepEqual(calls, [
    'receipt.get',
    `find:guides/overview:request-stale-contributor:${contributorRef}`,
    `read:guides/overview:${contributorRef}`,
    `candidate:guides/overview:${contributorRef}`,
    'receipt.put:conflict',
  ]);
});

test('does not reuse one request ID across contributor refs', async () => {
  const firstRef = contributorRef;
  const secondRef = 'contrib/u-42/research-notes';
  let stored: Record<string, unknown> | null = null;
  let writes = 0;
  const service = createEditPageService({
    repository: {
      readPage: async (_pageId, ref) => ref === 'commit-one'
        ? { sha: 'blob-after', content: 'Updated note' }
        : { sha: 'blob-before', content: 'Old note' },
      findRequestRevision: async () => null,
      commitPage: async () => {
        writes += 1;
        return { revision: 'commit-one' };
      },
      saveCandidate: async () => ({ revision: 'candidate-unused' }),
    },
    receipts: {
      get: async () => stored as never,
      claim: async () => ({ status: 'claimed' as const, token: 'lease' }),
      put: async (receipt, binding) => {
        stored = { ...receipt, ...binding };
      },
    },
    publisher: { publish: async ({ revision }) => ({ revision }) },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const input = {
    requestId: 'request-same-id',
    pageId: 'guides/overview',
    baseSha: 'blob-before',
    content: 'Updated note',
    reason: 'Clarify the note',
  };

  await service.edit({ userId: 42, login: 'octo' }, { ...input, ref: firstRef });
  await assert.rejects(
    service.edit({ userId: 42, login: 'octo' }, { ...input, ref: secondRef }),
    /request_conflict/,
  );
  assert.equal(writes, 1);
});
