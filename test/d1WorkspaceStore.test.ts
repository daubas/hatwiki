import assert from 'node:assert/strict';
import test from 'node:test';

import { createD1WorkspaceStore } from '../src/lib/d1WorkspaceStore.ts';

test('creates and updates an owner-scoped draft with version fencing', async () => {
  const prepared: string[] = [];
  const bound: unknown[][] = [];
  let changes = 1;
  const row = {
    task_id: 'task-1', user_id: 7, target_page_id: 'concepts/hatwiki', base_sha: 'blob-1', content: '# Draft',
    content_sha256: 'b'.repeat(64), feedback: 'Review', version: 2, created_at: '2026-09-04T01:00:00Z', updated_at: '2026-09-04T02:00:00Z',
  };
  const db = { prepare(query: string) { prepared.push(query); return {
    bind(...values: unknown[]) { bound.push(values); return this; },
    async first() { return row; },
    async run() { return { meta: { changes } }; },
  }; } };
  const store = createD1WorkspaceStore(db, { now: () => '2026-09-04T03:00:00Z' });

  assert.equal((await store.get('task-1', 7))?.version, 2);
  assert.equal((await store.save({ taskId: 'task-1', userId: 7, targetPageId: 'concepts/hatwiki', baseSha: 'blob-1', content: '# New', feedback: '', expectedVersion: 0 })).version, 1);
  assert.equal((await store.save({ taskId: 'task-1', userId: 7, targetPageId: 'concepts/hatwiki', baseSha: 'blob-1', content: '# Newer', feedback: 'Review', expectedVersion: 2 })).version, 3);
  assert.match(prepared[1], /^INSERT /);
  assert.match(prepared[2], /^UPDATE /);
  assert.deepEqual(bound[2].slice(-4), ['task-1', 7, 'concepts/hatwiki', 2]);

  changes = 0;
  await assert.rejects(() => store.save({ taskId: 'task-1', userId: 7, targetPageId: 'concepts/hatwiki', baseSha: 'blob-1', content: '# Stale', feedback: '', expectedVersion: 2 }), /workspace_stale/);
});

test('rejects invalid and oversized draft input before writing', async () => {
  const db = { prepare() { throw new Error('must not write'); } };
  const store = createD1WorkspaceStore(db);
  await assert.rejects(() => store.save({ taskId: 'task-1', userId: 7, targetPageId: 'concepts/hatwiki', baseSha: '', content: '# Draft', feedback: '', expectedVersion: 0 }), /invalid_input/);
  await assert.rejects(() => store.save({ taskId: 'task-1', userId: 7, targetPageId: 'concepts/hatwiki', baseSha: 'a'.repeat(161), content: '# Draft', feedback: '', expectedVersion: 0 }), /invalid_input/);
  await assert.rejects(() => store.save({ taskId: 'task-1', userId: 7, targetPageId: 'concepts/hatwiki', baseSha: 'blob-1', content: 'x'.repeat(200_001), feedback: '', expectedVersion: 0 }), /draft_too_large/);
});
