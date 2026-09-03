import assert from 'node:assert/strict';
import test from 'node:test';
import { createEditPageService } from '../src/lib/editPageService.ts';

test('commits only after GitHub readback and the public projection confirm the same revision', async () => {
  const calls: string[] = [];
  const commits: Array<Record<string, string>> = [];
  const receipts: Array<Record<string, string>> = [];
  const service = createEditPageService({
    repository: {
      readPage: async (pageId, ref) => {
        calls.push(`read:${pageId}:${ref ?? 'head'}`);
        return ref
          ? { sha: 'blob-after', content: 'Updated note ✅' }
          : { sha: 'blob-before', content: 'Old note' };
      },
      findRequestRevision: async (pageId, requestId) => {
        calls.push(`find:${pageId}:${requestId}`);
        return null;
      },
      commitPage: async (input) => {
        calls.push(`commit:${input.pageId}`);
        commits.push(input);
        return { revision: 'commit-123' };
      },
      saveCandidate: async () => ({ revision: 'candidate-unused' }),
    },
    receipts: {
      get: async (requestId) => {
        calls.push(`receipt.get:${requestId}`);
        return null;
      },
      put: async (receipt) => {
        calls.push(`receipt.put:${receipt.status}`);
        receipts.push(receipt as Record<string, string>);
      },
    },
    publisher: {
      publish: async (revision) => {
        calls.push(`publish:${revision}`);
        return { revision };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 7, login: 'octo', agent: 'helper\nHatWiki-User-ID: forged' },
    {
      requestId: 'request-1',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: 'Updated note ✅',
      reason: 'Clarify the note',
    },
  );

  assert.deepEqual(result, { requestId: 'request-1', status: 'committed', revision: 'commit-123' });
  assert.deepEqual(calls, [
    'receipt.get:request-1',
    'find:guides/overview:request-1',
    'read:guides/overview:head',
    'commit:guides/overview',
    'read:guides/overview:commit-123',
    'publish:commit-123',
    'receipt.put:committed',
  ]);
  assert.deepEqual(commits, [{
    pageId: 'guides/overview',
    baseSha: 'blob-before',
    content: 'Updated note ✅',
    message: 'Clarify the note\n\nHatWiki-User-ID: 7\nHatWiki-Login: octo\nHatWiki-Request-ID: request-1\nHatWiki-Agent: helper HatWiki-User-ID: forged',
  }]);
  assert.deepEqual(receipts, [{ requestId: 'request-1', status: 'committed', revision: 'commit-123' }]);
});

test('rejects malformed edit input before reading receipts or the repository', async () => {
  let receiptReads = 0;
  let repositoryReads = 0;
  const service = createEditPageService({
    repository: {
      readPage: async () => {
        repositoryReads += 1;
        return null;
      },
      findRequestRevision: async () => null,
      commitPage: async () => ({ revision: 'unused' }),
      saveCandidate: async () => ({ revision: 'unused' }),
    },
    receipts: {
      get: async () => {
        receiptReads += 1;
        return null;
      },
      put: async () => {},
    },
    publisher: { publish: async (revision) => ({ revision }) },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });
  const valid = {
    requestId: 'request-2',
    pageId: 'guides/overview',
    baseSha: 'blob-before',
    content: 'Updated note',
    reason: 'Clarify the note',
  };

  for (const input of [
    { ...valid, requestId: '' },
    { ...valid, pageId: '/guides/overview' },
    { ...valid, pageId: 'guides/../secret' },
    { ...valid, pageId: 'guides/overview.md' },
    { ...valid, pageId: 'guides/overview.MD' },
    { ...valid, pageId: 'guides/\nsecret' },
    { ...valid, baseSha: '' },
    { ...valid, baseSha: 'blob before' },
    { ...valid, content: '  ' },
    { ...valid, content: 7 as unknown as string },
    { ...valid, reason: '  ' },
    { ...valid, reason: 'Clarify\nHatWiki-User-ID: forged' },
    { ...valid, requestId: 'request\nforged' },
    { ...valid, requestId: 7 as unknown as string },
  ]) {
    await assert.rejects(service.edit({ userId: 7, login: 'octo' }, input), /invalid_input/);
  }

  assert.equal(receiptReads, 0);
  assert.equal(repositoryReads, 0);
});

test('rejects an invalid actor before reading receipts', async () => {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async () => {
        calls.push('repository.read');
        return null;
      },
      findRequestRevision: async () => {
        calls.push('repository.find');
        return null;
      },
      commitPage: async () => ({ revision: 'unused' }),
      saveCandidate: async () => ({ revision: 'unused' }),
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      put: async () => {},
    },
    publisher: { publish: async (revision) => ({ revision }) },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });
  const input = {
    requestId: 'request-actor',
    pageId: 'guides/overview',
    baseSha: 'blob-before',
    content: 'Updated note',
    reason: 'Clarify the note',
  };

  for (const actor of [
    { userId: 0, login: 'octo' },
    { userId: 1.5, login: 'octo' },
    { userId: 7, login: '' },
    { userId: 7, login: ' octo' },
    { userId: 7, login: 'octo\nforged' },
  ]) {
    await assert.rejects(service.edit(actor, input), /invalid_actor/);
  }

  assert.deepEqual(calls, []);
});

test('routes an exactly protected path to a stored approval receipt without writing', async () => {
  const calls: string[] = [];
  const stored: Array<Record<string, string>> = [];
  const service = createEditPageService({
    repository: {
      readPage: async () => {
        calls.push('repository.read');
        return null;
      },
      findRequestRevision: async () => null,
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'unused' };
      },
      saveCandidate: async () => {
        calls.push('repository.candidate');
        return { revision: 'unused' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      put: async (receipt) => {
        calls.push('receipt.put');
        stored.push(receipt as Record<string, string>);
      },
    },
    publisher: {
      publish: async () => {
        calls.push('publisher.publish');
        return { revision: 'unused' };
      },
    },
    policy: { protectedPaths: ['system'], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 7, login: 'octo' },
    {
      requestId: 'request-protected',
      pageId: 'system',
      baseSha: 'blob-before',
      content: 'Updated note',
      reason: 'Clarify the note',
    },
  );

  assert.deepEqual(result, { requestId: 'request-protected', status: 'approval_required' });
  assert.deepEqual(calls, ['receipt.get', 'receipt.put']);
  assert.deepEqual(stored, [{ requestId: 'request-protected', status: 'approval_required' }]);
});

test('routes a path under a trailing /** protected prefix to approval', async () => {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async () => {
        calls.push('repository.read');
        return null;
      },
      findRequestRevision: async () => null,
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'unused' };
      },
      saveCandidate: async () => {
        calls.push('repository.candidate');
        return { revision: 'unused' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      put: async (receipt) => {
        calls.push(`receipt.put:${receipt.status}`);
      },
    },
    publisher: {
      publish: async () => {
        calls.push('publisher.publish');
        return { revision: 'unused' };
      },
    },
    policy: { protectedPaths: ['policies/**'], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 7, login: 'octo' },
    {
      requestId: 'request-policy-prefix',
      pageId: 'policies/editorial',
      baseSha: 'blob-before',
      content: 'Updated note',
      reason: 'Clarify the note',
    },
  );

  assert.deepEqual(result, { requestId: 'request-policy-prefix', status: 'approval_required' });
  assert.deepEqual(calls, ['receipt.get', 'receipt.put:approval_required']);
});

test('routes a UTF-8 large edit to approval without committing', async () => {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async () => {
        calls.push('repository.read');
        return { sha: 'blob-before', content: '' };
      },
      findRequestRevision: async () => null,
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'unused' };
      },
      saveCandidate: async () => {
        calls.push('repository.candidate');
        return { revision: 'unused' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      put: async (receipt) => {
        calls.push(`receipt.put:${receipt.status}`);
      },
    },
    publisher: {
      publish: async () => {
        calls.push('publisher.publish');
        return { revision: 'unused' };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 2 },
  });

  const result = await service.edit(
    { userId: 7, login: 'octo' },
    {
      requestId: 'request-large',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: '✅',
      reason: 'Clarify the note',
    },
  );

  assert.deepEqual(result, { requestId: 'request-large', status: 'approval_required' });
  assert.deepEqual(calls, ['receipt.get', 'repository.read', 'receipt.put:approval_required']);
});

test('saves a stale edit as a conflict candidate instead of committing it', async () => {
  const calls: string[] = [];
  const candidates: Array<Record<string, string>> = [];
  const stored: Array<Record<string, string>> = [];
  const service = createEditPageService({
    repository: {
      readPage: async () => {
        calls.push('repository.read');
        return { sha: 'blob-current', content: 'Old note' };
      },
      findRequestRevision: async () => null,
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'unused' };
      },
      saveCandidate: async (input) => {
        calls.push(`repository.candidate:${input.pageId}`);
        candidates.push(input);
        return { revision: 'candidate-123' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      put: async (receipt) => {
        calls.push(`receipt.put:${receipt.status}`);
        stored.push(receipt as Record<string, string>);
      },
    },
    publisher: {
      publish: async () => {
        calls.push('publisher.publish');
        return { revision: 'unused' };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 7, login: 'octo' },
    {
      requestId: 'request-stale',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: 'Updated note',
      reason: 'Clarify the note',
    },
  );

  assert.deepEqual(result, {
    requestId: 'request-stale',
    status: 'conflict',
    candidateRevision: 'candidate-123',
  });
  assert.deepEqual(calls, [
    'receipt.get',
    'repository.read',
    'repository.candidate:guides/overview',
    'receipt.put:conflict',
  ]);
  assert.deepEqual(candidates, [{
    pageId: 'guides/overview',
    content: 'Updated note',
    requestId: 'request-stale',
    message: 'Clarify the note\n\nHatWiki-User-ID: 7\nHatWiki-Login: octo\nHatWiki-Request-ID: request-stale',
  }]);
  assert.deepEqual(stored, [{
    requestId: 'request-stale',
    status: 'conflict',
    candidateRevision: 'candidate-123',
  }]);
});

test('returns the original receipt on a retry without touching any writer', async () => {
  const calls: string[] = [];
  const original = {
    requestId: 'request-retry',
    status: 'conflict' as const,
    candidateRevision: 'candidate-123',
  };
  const service = createEditPageService({
    repository: {
      readPage: async () => {
        calls.push('repository.read');
        return null;
      },
      findRequestRevision: async () => null,
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'unused' };
      },
      saveCandidate: async () => {
        calls.push('repository.candidate');
        return { revision: 'unused' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return original;
      },
      put: async () => {
        calls.push('receipt.put');
      },
    },
    publisher: {
      publish: async () => {
        calls.push('publisher.publish');
        return { revision: 'unused' };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 7, login: 'octo' },
    {
      requestId: 'request-retry',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: 'Updated note',
      reason: 'Clarify the note',
    },
  );

  assert.equal(result, original);
  assert.deepEqual(calls, ['receipt.get']);
});

test('does not complete or publish when the committed revision reads back different bytes', async () => {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async (_pageId, ref) => {
        calls.push(`repository.read:${ref ?? 'head'}`);
        return ref
          ? { sha: 'blob-after', content: 'cafe\u0301' }
          : { sha: 'blob-before', content: 'café' };
      },
      findRequestRevision: async () => null,
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'commit-123' };
      },
      saveCandidate: async () => {
        calls.push('repository.candidate');
        return { revision: 'unused' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      put: async () => {
        calls.push('receipt.put');
      },
    },
    publisher: {
      publish: async () => {
        calls.push('publisher.publish');
        return { revision: 'unused' };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  await assert.rejects(
    service.edit(
      { userId: 7, login: 'octo' },
      {
        requestId: 'request-readback-mismatch',
        pageId: 'guides/overview',
        baseSha: 'blob-before',
        content: 'café',
        reason: 'Clarify the note',
      },
    ),
    /readback_mismatch/,
  );

  assert.deepEqual(calls, [
    'receipt.get',
    'repository.read:head',
    'repository.commit',
    'repository.read:commit-123',
  ]);
});

test('does not store a committed receipt when the publisher reports another revision', async () => {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async (_pageId, ref) => {
        calls.push(`repository.read:${ref ?? 'head'}`);
        return { sha: ref ? 'blob-after' : 'blob-before', content: 'Updated note' };
      },
      findRequestRevision: async () => null,
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'commit-123' };
      },
      saveCandidate: async () => {
        calls.push('repository.candidate');
        return { revision: 'unused' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      put: async () => {
        calls.push('receipt.put');
      },
    },
    publisher: {
      publish: async (revision) => {
        calls.push(`publisher.publish:${revision}`);
        return { revision: 'commit-other' };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  await assert.rejects(
    service.edit(
      { userId: 7, login: 'octo' },
      {
        requestId: 'request-publisher-mismatch',
        pageId: 'guides/overview',
        baseSha: 'blob-before',
        content: 'Updated note',
        reason: 'Clarify the note',
      },
    ),
    /publisher_mismatch/,
  );

  assert.deepEqual(calls, [
    'receipt.get',
    'repository.read:head',
    'repository.commit',
    'repository.read:commit-123',
    'publisher.publish:commit-123',
  ]);
});

test('recovers a Git-written page revision before attempting a new write', async () => {
  const calls: string[] = [];
  const stored: Array<Record<string, string>> = [];
  const service = createEditPageService({
    repository: {
      readPage: async (pageId, ref) => {
        calls.push(`repository.read:${pageId}:${ref ?? 'head'}`);
        if (!ref) throw new Error('unexpected_head_read');
        return { sha: 'blob-after', content: 'Recovered note' };
      },
      findRequestRevision: async (pageId, requestId) => {
        calls.push(`repository.find:${pageId}:${requestId}`);
        return { kind: 'page', revision: 'commit-recovered' };
      },
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'unexpected' };
      },
      saveCandidate: async () => {
        calls.push('repository.candidate');
        return { revision: 'unexpected' };
      },
    },
    receipts: {
      get: async (requestId) => {
        calls.push(`receipt.get:${requestId}`);
        return null;
      },
      put: async (receipt) => {
        calls.push(`receipt.put:${receipt.status}`);
        stored.push(receipt as Record<string, string>);
      },
    },
    publisher: {
      publish: async (revision) => {
        calls.push(`publisher.publish:${revision}`);
        return { revision };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 7, login: 'octo' },
    {
      requestId: 'request-recovered-page',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: 'Recovered note',
      reason: 'Finish interrupted edit',
    },
  );

  assert.deepEqual(result, {
    requestId: 'request-recovered-page',
    status: 'committed',
    revision: 'commit-recovered',
  });
  assert.deepEqual(calls, [
    'receipt.get:request-recovered-page',
    'repository.find:guides/overview:request-recovered-page',
    'repository.read:guides/overview:commit-recovered',
    'publisher.publish:commit-recovered',
    'receipt.put:committed',
  ]);
  assert.deepEqual(stored, [{
    requestId: 'request-recovered-page',
    status: 'committed',
    revision: 'commit-recovered',
  }]);
});

test('recovers a Git-written candidate as a conflict without another write', async () => {
  const calls: string[] = [];
  const stored: Array<Record<string, string>> = [];
  const service = createEditPageService({
    repository: {
      readPage: async () => {
        calls.push('repository.read');
        return null;
      },
      findRequestRevision: async (pageId, requestId) => {
        calls.push(`repository.find:${pageId}:${requestId}`);
        return { kind: 'candidate', revision: 'candidate-recovered' };
      },
      commitPage: async () => {
        calls.push('repository.commit');
        return { revision: 'unexpected' };
      },
      saveCandidate: async () => {
        calls.push('repository.candidate');
        return { revision: 'unexpected' };
      },
    },
    receipts: {
      get: async (requestId) => {
        calls.push(`receipt.get:${requestId}`);
        return null;
      },
      put: async (receipt) => {
        calls.push(`receipt.put:${receipt.status}`);
        stored.push(receipt as Record<string, string>);
      },
    },
    publisher: {
      publish: async () => {
        calls.push('publisher.publish');
        return { revision: 'unexpected' };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 7, login: 'octo' },
    {
      requestId: 'request-recovered-candidate',
      pageId: 'guides/overview',
      baseSha: 'blob-before',
      content: 'Recovered note',
      reason: 'Finish interrupted edit',
    },
  );

  assert.deepEqual(result, {
    requestId: 'request-recovered-candidate',
    status: 'conflict',
    candidateRevision: 'candidate-recovered',
  });
  assert.deepEqual(calls, [
    'receipt.get:request-recovered-candidate',
    'repository.find:guides/overview:request-recovered-candidate',
    'receipt.put:conflict',
  ]);
  assert.deepEqual(stored, [{
    requestId: 'request-recovered-candidate',
    status: 'conflict',
    candidateRevision: 'candidate-recovered',
  }]);
});
