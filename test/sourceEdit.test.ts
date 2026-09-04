import assert from 'node:assert/strict';
import test from 'node:test';

import { completeSourceEdit } from '../src/lib/sourceEdit.ts';

test('links an owned ingestion task to the existing edit receipt and change summary', async () => {
  const updates: unknown[][] = [];
  const store = {
    findByRequest: async () => null,
    get: async (taskId: string, userId: number) => taskId === 'task-1' && userId === 7 ? {
      taskId, requestId: 'source-1', userId, login: 'octo', title: 'Note', content: 'Private', contentSha256: 'a'.repeat(64),
      targetPageId: 'concepts/hatwiki', status: 'stored' as const, createdAt: '2026-09-04T01:00:00Z',
    } : null,
    put: async () => {},
    claimEdit: async (...values: unknown[]) => { updates.push(['claim', ...values]); return true; },
    updateResult: async (...values: unknown[]) => { updates.push(values); return true; },
  };
  const input = { requestId: 'edit-1', pageId: 'concepts/hatwiki', baseSha: 'blob-1', content: '# HatWiki\n\n[[concepts/shared]][^source-task-1]\n\n[^source-task-1]: Note.', reason: 'Merge source', sourceTaskId: 'task-1' };
  const receipt = await completeSourceEdit({ userId: 7, login: 'octo' }, input, store, async () => ({ requestId: 'edit-1', status: 'committed', revision: 'commit-1' }));

  assert.equal(receipt.sourceTaskId, 'task-1');
  assert.deepEqual(receipt.changes, { affectedPages: ['concepts/hatwiki'], citations: ['source-task-1'], wikiLinks: ['concepts/shared'], unresolved: [] });
  assert.deepEqual(updates, [['claim', 'task-1', 7, 'edit-1'], ['task-1', 7, 'edit-1', 'committed', 'commit-1']]);
});

test('rejects missing, foreign, or mismatched source tasks before editing', async () => {
  let edits = 0;
  const store = {
    findByRequest: async () => null,
    get: async () => null,
    put: async () => {},
    claimEdit: async () => true,
    updateResult: async () => true,
  };
  const input = { requestId: 'edit-1', pageId: 'concepts/hatwiki', baseSha: 'blob-1', content: '# HatWiki', reason: 'Merge', sourceTaskId: 'missing' };
  await assert.rejects(completeSourceEdit({ userId: 7, login: 'octo' }, input, store, async () => { edits += 1; return { requestId: 'edit-1', status: 'committed' }; }), /source_not_found/);
  assert.equal(edits, 0);
});

test('requires the source citation and prevents a second edit request from consuming the task', async () => {
  const base = { taskId: 'task-1', requestId: 'source-1', userId: 7, login: 'octo', title: 'Note', content: 'Private', contentSha256: 'a'.repeat(64), targetPageId: 'concepts/hatwiki', status: 'stored' as const, createdAt: '2026-09-04T01:00:00Z' };
  let edits = 0;
  const store = { findByRequest: async () => null, get: async () => base, put: async () => {}, claimEdit: async () => false, updateResult: async () => true };
  await assert.rejects(completeSourceEdit({ userId: 7, login: 'octo' }, { requestId: 'edit-1', pageId: 'concepts/hatwiki', baseSha: 'blob', content: '# No citation', reason: 'Merge', sourceTaskId: 'task-1' }, store, async () => { edits += 1; return { requestId: 'edit-1', status: 'committed' }; }), /source_citation_missing/);
  await assert.rejects(completeSourceEdit({ userId: 7, login: 'octo' }, { requestId: 'edit-2', pageId: 'concepts/hatwiki', baseSha: 'blob', content: '[^source-task-1]\n\n[^source-task-1]: Note.', reason: 'Merge', sourceTaskId: 'task-1' }, store, async () => { edits += 1; return { requestId: 'edit-2', status: 'committed' }; }), /source_already_used/);
  assert.equal(edits, 0);
});

test('does not accept a source citation hidden in code or an HTML comment', async () => {
  const task = { taskId: 'task-1', requestId: 'source-1', userId: 7, login: 'octo', title: 'Note', content: 'Private', contentSha256: 'a'.repeat(64), targetPageId: 'concepts/hatwiki', status: 'stored' as const, createdAt: '2026-09-04T01:00:00Z' };
  const store = { findByRequest: async () => null, get: async () => task, put: async () => {}, claimEdit: async () => true, updateResult: async () => true };
  for (const content of ['`[^source-task-1]`', '<!-- [^source-task-1] -->', '<!-- [^source-task-1]', '```md\n[^source-task-1]\n```', '```md\n[^source-task-1]', '\t[^source-task-1]', '[^source-task-1]: Definition only']) {
    await assert.rejects(completeSourceEdit({ userId: 7, login: 'octo' }, { requestId: 'edit-1', pageId: 'concepts/hatwiki', baseSha: 'blob', content, reason: 'Merge', sourceTaskId: 'task-1' }, store, async () => ({ requestId: 'edit-1', status: 'committed' })), /source_citation_missing/);
  }
});
