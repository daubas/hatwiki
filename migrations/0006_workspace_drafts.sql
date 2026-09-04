CREATE TABLE workspace_drafts (
  task_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  target_page_id TEXT NOT NULL,
  base_sha TEXT NOT NULL,
  content TEXT NOT NULL,
  content_sha256 TEXT NOT NULL,
  feedback TEXT NOT NULL DEFAULT '',
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (task_id) REFERENCES ingestion_tasks(task_id) ON DELETE CASCADE
);

CREATE INDEX workspace_drafts_user_id ON workspace_drafts(user_id);
