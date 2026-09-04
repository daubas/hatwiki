import assert from 'node:assert/strict';
import test from 'node:test';

import { handleAddSourceRequest, handleGetIngestionRequest } from '../src/lib/sourceHttp.ts';

const actor = { userId: 7, login: 'octo' };
const input = { requestId: 'source-1', title: 'Note', content: 'Private body', targetPageId: 'concepts/hatwiki', authorizationConfirmed: true };

test('requires the signed-in owner and passes only the text ingestion contract', async () => {
  const calls: unknown[] = [];
  const anonymous = await handleAddSourceRequest(new Request('https://hatwiki.test/api/sources', { method: 'POST', body: JSON.stringify(input) }), null, async () => ({}) as never);
  const response = await handleAddSourceRequest(
    new Request('https://hatwiki.test/api/sources', { method: 'POST', headers: { Origin: 'https://hatwiki.test' }, body: JSON.stringify({ ...input, ignored: 'x' }) }),
    actor,
    async (editActor, source) => { calls.push(editActor, source); return { taskId: 'task-1', status: 'stored' } as never; },
  );

  assert.equal(anonymous.status, 401);
  assert.equal(response.status, 201);
  assert.deepEqual(calls, [actor, input]);
});

test('returns private source text only to its signed-in owner', async () => {
  const task = { taskId: 'task-1', requestId: 'source-1', userId: 7, login: 'octo', title: 'Note', content: 'Private body', contentSha256: 'a'.repeat(64), targetPageId: 'concepts/hatwiki', status: 'stored' as const, createdAt: '2026-09-04T01:00:00Z' };
  const anonymous = await handleGetIngestionRequest(null, 'task-1', async () => task);
  const missing = await handleGetIngestionRequest(actor, 'task-2', async () => null);
  const response = await handleGetIngestionRequest(actor, 'task-1', async (taskId, userId) => taskId === 'task-1' && userId === 7 ? task : null);

  assert.equal(anonymous.status, 401);
  assert.equal(missing.status, 404);
  assert.deepEqual(await response.json(), {
    taskId: 'task-1', requestId: 'source-1', title: 'Note', content: 'Private body', contentSha256: 'a'.repeat(64),
    targetPageId: 'concepts/hatwiki', status: 'stored', createdAt: '2026-09-04T01:00:00Z', citationId: 'source-task-1',
  });
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});

test('returns a stable invalid-input error for missing fields', async () => {
  const response = await handleAddSourceRequest(
    new Request('https://hatwiki.test/api/sources', { method: 'POST', body: '{}' }),
    actor,
    async () => { throw new Error('invalid_input'); },
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'invalid_input' });
});

test('does not expose storage failures as client error text', async () => {
  await assert.rejects(
    handleAddSourceRequest(new Request('https://hatwiki.test/api/sources', { method: 'POST', body: JSON.stringify(input) }), actor, async () => { throw new Error('database details'); }),
    /database details/,
  );
});
