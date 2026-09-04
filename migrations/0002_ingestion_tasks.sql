CREATE TABLE IF NOT EXISTS ingestion_tasks (
  task_id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  login TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_sha256 TEXT NOT NULL,
  target_page_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('stored', 'committed', 'conflict', 'approval_required')),
  created_at TEXT NOT NULL,
  revision TEXT,
  UNIQUE (user_id, request_id)
);
