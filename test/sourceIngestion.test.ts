import assert from 'node:assert/strict';
import test from 'node:test';

import { createSourceIngestionService, type IngestionTask } from '../src/lib/sourceIngestion.ts';

test('stores one authorized text source idempotently without publishing its body', async () => {
  const tasks: IngestionTask[] = [];
  const service = createSourceIngestionService({
    findByRequest: async (userId, requestId) => tasks.find((task) => task.userId === userId && task.requestId === requestId) ?? null,
    get: async () => null,
    put: async (task) => { tasks.push(task); },
    claimEdit: async () => true,
    updateResult: async () => true,
  }, { now: () => '2026-09-04T01:00:00Z', createId: () => 'task-1' });
  const actor = { userId: 7, login: 'octo' };
  const input = { requestId: 'source-1', title: 'Interview note', content: 'A source body.', targetPageId: 'concepts/hatwiki', authorizationConfirmed: true };

  const first = await service.add(actor, input);
  const retry = await service.add(actor, input);

  assert.equal(tasks.length, 1);
  assert.equal(first.taskId, 'task-1');
  assert.equal(first.status, 'stored');
  assert.equal(first.citationId, 'source-task-1');
  assert.equal(first.content, undefined);
  assert.deepEqual(retry, first);
  assert.equal(tasks[0].content, 'A source body.');
  assert.match(tasks[0].contentSha256, /^[a-f0-9]{64}$/);
});

test('rejects unconfirmed, oversized, and conflicting idempotency input', async () => {
  const tasks: IngestionTask[] = [];
  const service = createSourceIngestionService({
    findByRequest: async (userId, requestId) => tasks.find((task) => task.userId === userId && task.requestId === requestId) ?? null,
    get: async () => null,
    put: async (task) => { tasks.push(task); },
    claimEdit: async () => true,
    updateResult: async () => true,
  }, { createId: () => 'task-1' });
  const actor = { userId: 7, login: 'octo' };
  const valid = { requestId: 'source-1', title: 'Note', content: 'Body', targetPageId: 'concepts/hatwiki', authorizationConfirmed: true };

  await assert.rejects(service.add(actor, { ...valid, authorizationConfirmed: false }), /authorization_required/);
  await assert.rejects(service.add(actor, { authorizationConfirmed: true } as never), /invalid_input/);
  await assert.rejects(service.add(actor, { ...valid, content: 'x'.repeat(100_001) }), /source_too_large/);
  await service.add(actor, valid);
  await assert.rejects(service.add(actor, { ...valid, content: 'Changed' }), /request_conflict/);
});

test('recovers an idempotent task created by a concurrent request', async () => {
  let stored: IngestionTask | null = null;
  const service = createSourceIngestionService({
    findByRequest: async () => stored,
    get: async () => null,
    put: async (task) => { stored = { ...task, taskId: 'winning-task' }; throw new Error('unique constraint'); },
    claimEdit: async () => true,
    updateResult: async () => true,
  }, { createId: () => 'losing-task' });
  const result = await service.add(
    { userId: 7, login: 'octo' },
    { requestId: 'source-1', title: 'Note', content: 'Body', targetPageId: 'concepts/hatwiki', authorizationConfirmed: true },
  );
  assert.equal(result.taskId, 'winning-task');
});

test('reports a concurrent same-key payload mismatch as a request conflict', async () => {
  const stored = { taskId: 'winner', requestId: 'source-1', userId: 7, login: 'octo', title: 'Note', content: 'Other', contentSha256: '0'.repeat(64), targetPageId: 'concepts/hatwiki', status: 'stored' as const, createdAt: '2026-09-04T01:00:00Z' };
  let reads = 0;
  const service = createSourceIngestionService({ findByRequest: async () => (++reads === 1 ? null : stored), get: async () => null, put: async () => { throw new Error('unique constraint'); }, claimEdit: async () => true, updateResult: async () => true }, { createId: () => 'loser' });
  await assert.rejects(service.add({ userId: 7, login: 'octo' }, { requestId: 'source-1', title: 'Note', content: 'Body', targetPageId: 'concepts/hatwiki', authorizationConfirmed: true }), /request_conflict/);
});

test('preserves and hashes the exact authorized source text', async () => {
  const tasks: IngestionTask[] = [];
  const service = createSourceIngestionService({ findByRequest: async () => null, get: async () => null, put: async (task) => { tasks.push(task); }, claimEdit: async () => true, updateResult: async () => true }, { createId: () => 'task-1' });
  await service.add({ userId: 7, login: 'octo' }, { requestId: 'source-1', title: 'Note', content: '  exact body\n', targetPageId: 'concepts/hatwiki', authorizationConfirmed: true });
  assert.equal(tasks[0].content, '  exact body\n');
});
