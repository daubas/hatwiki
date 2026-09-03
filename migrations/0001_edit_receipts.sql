CREATE TABLE IF NOT EXISTS edit_receipts (
  request_id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('committed', 'conflict', 'approval_required')),
  revision TEXT,
  candidate_revision TEXT
);
