import type { EditReceipt, EditReceiptStore } from './editContracts.ts';

type D1Statement = {
  bind(...values: unknown[]): D1Statement;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
};

type D1DatabaseLike = {
  prepare(query: string): D1Statement;
};

type ReceiptRow = {
  request_id: string;
  status: EditReceipt['status'];
  revision: string | null;
  candidate_revision: string | null;
};

function receiptFromRow(row: ReceiptRow): EditReceipt {
  const receipt: EditReceipt = {
    requestId: row.request_id,
    status: row.status,
  };
  if (row.revision != null) receipt.revision = row.revision;
  if (row.candidate_revision != null) receipt.candidateRevision = row.candidate_revision;
  return receipt;
}

export function createD1ReceiptStore(db: D1DatabaseLike): EditReceiptStore {
  return {
    async get(requestId: string) {
      const row = await db
        .prepare('SELECT request_id, status, revision, candidate_revision FROM edit_receipts WHERE request_id = ?')
        .bind(requestId)
        .first<ReceiptRow>();
      return row ? receiptFromRow(row) : null;
    },

    async put(receipt) {
      await db
        .prepare('INSERT OR REPLACE INTO edit_receipts (request_id, status, revision, candidate_revision) VALUES (?, ?, ?, ?)')
        .bind(receipt.requestId, receipt.status, receipt.revision ?? null, receipt.candidateRevision ?? null)
        .run();
    },
  };
}
