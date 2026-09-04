import assert from 'node:assert/strict';
import test from 'node:test';
import { createD1ReceiptStore } from '../src/lib/d1ReceiptStore.ts';

test('get reads a stored edit receipt and restores optional revision metadata', async () => {
  const prepared: string[] = [];
  const bound: unknown[][] = [];
  const db = {
    prepare(query: string) {
      prepared.push(query);
      return {
        bind(...values: unknown[]) {
          bound.push(values);
          return this;
        },
        async first() {
          return {
            request_id: 'request-1',
            status: 'conflict',
            revision: null,
            candidate_revision: 'candidate-1',
            actor_user_id: 7,
            page_id: 'concepts/hatwiki',
            input_sha256: 'a'.repeat(64),
          };
        },
        async run() {},
      };
    },
  };

  const store = createD1ReceiptStore(db);

  assert.deepEqual(await store.get('request-1'), {
    requestId: 'request-1',
    status: 'conflict',
    candidateRevision: 'candidate-1',
    actorUserId: 7,
    pageId: 'concepts/hatwiki',
    inputSha256: 'a'.repeat(64),
  });
  assert.deepEqual(prepared, [
    'SELECT request_id, status, revision, candidate_revision, actor_user_id, page_id, input_sha256 FROM edit_receipts WHERE request_id = ?',
  ]);
  assert.deepEqual(bound, [['request-1']]);
});

test('put upserts a receipt with both revision fields', async () => {
  const prepared: string[] = [];
  const bound: unknown[][] = [];
  let runs = 0;
  const db = {
    prepare(query: string) {
      prepared.push(query);
      return {
        bind(...values: unknown[]) {
          bound.push(values);
          return this;
        },
        async first() {
          return null;
        },
        async run() {
          runs += 1;
          return { meta: { changes: 1 } };
        },
      };
    },
  };

  const store = createD1ReceiptStore(db);

  await store.put({
    requestId: 'request-2',
    status: 'conflict',
    revision: undefined,
    candidateRevision: 'candidate-2',
  }, { actorUserId: 7, pageId: 'concepts/hatwiki', inputSha256: 'b'.repeat(64) }, 'lease-1');

  assert.deepEqual(prepared, [
    'INSERT INTO edit_receipts (request_id, status, revision, candidate_revision, actor_user_id, page_id, input_sha256) SELECT ?, ?, ?, ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM edit_claims WHERE request_id = ? AND claim_token = ?) ON CONFLICT(request_id) DO UPDATE SET status = excluded.status, revision = excluded.revision, candidate_revision = excluded.candidate_revision WHERE actor_user_id = excluded.actor_user_id AND page_id = excluded.page_id AND input_sha256 = excluded.input_sha256',
    'DELETE FROM edit_claims WHERE request_id = ? AND claim_token = ?',
  ]);
  assert.deepEqual(bound, [
    ['request-2', 'conflict', null, 'candidate-2', 7, 'concepts/hatwiki', 'b'.repeat(64), 'request-2', 'lease-1'],
    ['request-2', 'lease-1'],
  ]);
  assert.equal(runs, 2);
});

test('claims an edit request once and rejects a conflicting binding', async () => {
  let insertChanges = 1;
  const db = {
    prepare(query: string) {
      return {
        bind() { return this; },
        async first() { return { actor_user_id: 7, page_id: 'concepts/hatwiki', input_sha256: 'a'.repeat(64) }; },
        async run() {
          if (query.startsWith('INSERT OR IGNORE')) return { meta: { changes: insertChanges-- > 0 ? 1 : 0 } };
          return { meta: { changes: 0 } };
        },
      };
    },
  };
  const store = createD1ReceiptStore(db);
  assert.equal((await store.claim('request-1', { actorUserId: 7, pageId: 'concepts/hatwiki', inputSha256: 'a'.repeat(64) })).status, 'claimed');
  assert.deepEqual(await store.claim('request-1', { actorUserId: 8, pageId: 'concepts/hatwiki', inputSha256: 'b'.repeat(64) }), { status: 'conflict' });
});

test('rejects a receipt written with an expired fencing token', async () => {
  const db = {
    prepare() {
      return { bind() { return this; }, async first() { return null; }, async run() { return { meta: { changes: 0 } }; } };
    },
  };
  const store = createD1ReceiptStore(db);
  await assert.rejects(store.put({ requestId: 'request-1', status: 'committed', revision: 'old' }, { actorUserId: 7, pageId: 'concepts/hatwiki', inputSha256: 'a'.repeat(64) }, 'expired-lease'), /request_conflict/);
});
