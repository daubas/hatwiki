import type { EditReceipt, EditReceiptStore, StoredEditReceipt } from './editContracts.ts';

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
  actor_user_id: number | null;
  page_id: string | null;
  input_sha256: string | null;
};

function receiptFromRow(row: ReceiptRow): StoredEditReceipt {
  const receipt: StoredEditReceipt = {
    requestId: row.request_id,
    status: row.status,
    actorUserId: row.actor_user_id,
    pageId: row.page_id,
    inputSha256: row.input_sha256,
  };
  if (row.revision != null) receipt.revision = row.revision;
  if (row.candidate_revision != null) receipt.candidateRevision = row.candidate_revision;
  return receipt;
}

export function createD1ReceiptStore(db: D1DatabaseLike): EditReceiptStore {
  return {
    async get(requestId: string) {
      const row = await db
        .prepare('SELECT request_id, status, revision, candidate_revision, actor_user_id, page_id, input_sha256 FROM edit_receipts WHERE request_id = ?')
        .bind(requestId)
        .first<ReceiptRow>();
      return row ? receiptFromRow(row) : null;
    },

    async claim(requestId, binding) {
      const now = Date.now();
      const token = crypto.randomUUID();
      const inserted = await db.prepare('INSERT OR IGNORE INTO edit_claims (request_id, actor_user_id, page_id, input_sha256, claimed_at, claim_token) VALUES (?, ?, ?, ?, ?, ?)')
        .bind(requestId, binding.actorUserId, binding.pageId, binding.inputSha256, now, token).run() as { meta?: { changes?: number } };
      if ((inserted.meta?.changes ?? 0) > 0) return { status: 'claimed', token };
      const existing = await db.prepare('SELECT actor_user_id, page_id, input_sha256 FROM edit_claims WHERE request_id = ?').bind(requestId)
        .first<{ actor_user_id: number; page_id: string; input_sha256: string }>();
      if (!existing || existing.actor_user_id !== binding.actorUserId || existing.page_id !== binding.pageId || existing.input_sha256 !== binding.inputSha256) return { status: 'conflict' };
      // ponytail: A two-minute D1 lease recovers crashed requests without adding a queue or coordinator.
      const reclaimed = await db.prepare('UPDATE edit_claims SET claimed_at = ?, claim_token = ? WHERE request_id = ? AND claimed_at < ?')
        .bind(now, token, requestId, now - 120_000).run() as { meta?: { changes?: number } };
      return (reclaimed.meta?.changes ?? 0) > 0 ? { status: 'claimed', token } : { status: 'in_progress' };
    },

    async put(receipt, binding, claimToken) {
      const result = await db
        .prepare('INSERT INTO edit_receipts (request_id, status, revision, candidate_revision, actor_user_id, page_id, input_sha256) SELECT ?, ?, ?, ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM edit_claims WHERE request_id = ? AND claim_token = ?) ON CONFLICT(request_id) DO UPDATE SET status = excluded.status, revision = excluded.revision, candidate_revision = excluded.candidate_revision WHERE actor_user_id = excluded.actor_user_id AND page_id = excluded.page_id AND input_sha256 = excluded.input_sha256')
        .bind(receipt.requestId, receipt.status, receipt.revision ?? null, receipt.candidateRevision ?? null, binding.actorUserId, binding.pageId, binding.inputSha256, receipt.requestId, claimToken)
        .run() as { meta?: { changes?: number } };
      if ((result.meta?.changes ?? 0) === 0) throw new Error('request_conflict');
      await db.prepare('DELETE FROM edit_claims WHERE request_id = ? AND claim_token = ?')
        .bind(receipt.requestId, claimToken).run();
    },
  };
}
