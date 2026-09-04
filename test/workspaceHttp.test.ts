import assert from 'node:assert/strict';
import test from 'node:test';

import { handleGetWorkspaceRequest, handleSaveWorkspaceRequest } from '../src/lib/workspaceHttp.ts';

const actor = { userId: 7, login: 'octo' };
const source = {
  taskId: 'task-1', requestId: 'source-1', userId: 7, login: 'octo', title: 'Interview', content: 'Private evidence.',
  contentSha256: 'a'.repeat(64), targetPageId: 'concepts/hatwiki', status: 'stored' as const, createdAt: '2026-09-04T01:00:00Z',
};

test('owner reads one private source and its shared draft through the workspace interface', async () => {
  const response = await handleGetWorkspaceRequest(actor, 'task-1', async () => source, async () => ({
    taskId: 'task-1', userId: 7, targetPageId: 'concepts/hatwiki', baseSha: 'blob-1', content: '# Draft',
    contentSha256: 'b'.repeat(64), feedback: 'Clarify this.', version: 2, createdAt: '2026-09-04T01:00:00Z', updatedAt: '2026-09-04T02:00:00Z',
  }));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.deepEqual(await response.json(), {
    changeId: 'task-1', status: 'stored',
    source: { title: 'Interview', targetPageId: 'concepts/hatwiki', citationId: 'source-task-1', content: 'Private evidence.' },
    draft: { baseSha: 'blob-1', content: '# Draft', contentSha256: 'b'.repeat(64), feedback: 'Clarify this.', version: 2, updatedAt: '2026-09-04T02:00:00Z' },
  });
});

test('workspace reads stay owner scoped and do not reveal task existence anonymously', async () => {
  assert.equal((await handleGetWorkspaceRequest(null, 'task-1', async () => source, async () => null)).status, 401);
  assert.equal((await handleGetWorkspaceRequest(actor, 'task-1', async () => null, async () => null)).status, 404);
});

test('owner saves a versioned draft for the source target page', async () => {
  let saved: unknown;
  const request = new Request('https://hatwiki.test/api/workspaces/task-1', {
    method: 'PUT', headers: { Origin: 'https://hatwiki.test', 'Content-Type': 'application/json' },
    body: JSON.stringify({ baseSha: 'blob-1', content: '# Draft', feedback: 'Check wording.', expectedVersion: 0 }),
  });
  const response = await handleSaveWorkspaceRequest(request, actor, 'task-1', async () => source, async (value) => {
    saved = value;
    return { ...value, taskId: 'task-1', userId: 7, contentSha256: 'b'.repeat(64), version: 1, createdAt: '2026-09-04T01:00:00Z', updatedAt: '2026-09-04T01:00:00Z' };
  });

  assert.equal(response.status, 200);
  assert.deepEqual(saved, { taskId: 'task-1', userId: 7, targetPageId: 'concepts/hatwiki', baseSha: 'blob-1', content: '# Draft', feedback: 'Check wording.', expectedVersion: 0 });
  assert.equal((await response.json() as { draft: { version: number } }).draft.version, 1);
});

test('workspace save rejects stale, closed, cross-origin, and unauthenticated requests', async () => {
  const request = (origin = 'https://hatwiki.test') => new Request('https://hatwiki.test/api/workspaces/task-1', {
    method: 'PUT', headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify({ baseSha: 'blob-1', content: '# Draft', feedback: '', expectedVersion: 1 }),
  });
  assert.equal((await handleSaveWorkspaceRequest(request(), null, 'task-1', async () => source, async () => { throw new Error('unreachable'); })).status, 401);
  assert.equal((await handleSaveWorkspaceRequest(request('https://evil.test'), actor, 'task-1', async () => source, async () => { throw new Error('unreachable'); })).status, 403);
  assert.equal((await handleSaveWorkspaceRequest(request(), actor, 'task-1', async () => ({ ...source, status: 'committed' }), async () => { throw new Error('unreachable'); })).status, 409);
  assert.equal((await handleSaveWorkspaceRequest(request(), actor, 'task-1', async () => source, async () => { throw new Error('workspace_stale'); })).status, 409);
});
