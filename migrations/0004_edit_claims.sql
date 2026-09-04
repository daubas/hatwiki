CREATE TABLE edit_claims (
  request_id TEXT PRIMARY KEY,
  actor_user_id INTEGER NOT NULL,
  page_id TEXT NOT NULL,
  input_sha256 TEXT NOT NULL,
  claimed_at INTEGER NOT NULL
);
