import assert from 'node:assert/strict';
import test from 'node:test';

import { createD1IngestionStore } from '../src/lib/d1IngestionStore.ts';

test('stores private ingestion tasks and scopes reads and updates to the GitHub user', async () => {
  const prepared: string[] = [];
  const bound: unknown[][] = [];
  const row = {
    task_id: 'task-1', request_id: 'request-1', user_id: 7, login: 'octo', title: 'Note', content: 'Private body',
    content_sha256: 'a'.repeat(64), target_page_id: 'concepts/hatwiki', status: 'stored', created_at: '2026-09-04T01:00:00Z', revision: null, edit_request_id: null,
  };
  const db = {
    prepare(query: string) {
      prepared.push(query);
      return {
        bind(...values: unknown[]) { bound.push(values); return this; },
        async first() { return row; },
        async run() { return { meta: { changes: 1 } }; },
      };
    },
  };
  const store = createD1IngestionStore(db);

  assert.equal((await store.findByRequest(7, 'request-1'))?.content, 'Private body');
  assert.equal((await store.get('task-1', 7))?.taskId, 'task-1');
  await store.put({ taskId: 'task-1', requestId: 'request-1', userId: 7, login: 'octo', title: 'Note', content: 'Private body', contentSha256: 'a'.repeat(64), targetPageId: 'concepts/hatwiki', status: 'stored', createdAt: '2026-09-04T01:00:00Z' });
  assert.equal(await store.claimEdit('task-1', 7, 'edit-1'), true);
  assert.equal(await store.updateResult('task-1', 7, 'edit-1', 'committed', 'commit-1'), true);

  assert.equal(prepared.length, 5);
  assert.deepEqual(bound[0], [7, 'request-1']);
  assert.deepEqual(bound[1], ['task-1', 7]);
  assert.deepEqual(bound[3], ['edit-1', 'task-1', 7, 'stored', 'edit-1']);
  assert.deepEqual(bound[4], ['committed', 'commit-1', 'task-1', 7, 'edit-1', 'stored', 'committed', 'commit-1']);
});
