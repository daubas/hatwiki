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
  });
  assert.deepEqual(prepared, [
    'SELECT request_id, status, revision, candidate_revision FROM edit_receipts WHERE request_id = ?',
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
  });

  assert.deepEqual(prepared, [
    'INSERT OR REPLACE INTO edit_receipts (request_id, status, revision, candidate_revision) VALUES (?, ?, ?, ?)',
  ]);
  assert.deepEqual(bound, [['request-2', 'conflict', null, 'candidate-2']]);
  assert.equal(runs, 1);
});
