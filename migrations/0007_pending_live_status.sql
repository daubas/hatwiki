-- Preserve existing data while allowing branch writes to leave a pending-live receipt.
CREATE TABLE edit_receipts_pending_live (
  request_id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('committed', 'pending_live', 'conflict', 'approval_required')),
  revision TEXT,
  candidate_revision TEXT,
  actor_user_id INTEGER,
  page_id TEXT,
  input_sha256 TEXT
);

INSERT INTO edit_receipts_pending_live (request_id, status, revision, candidate_revision, actor_user_id, page_id, input_sha256)
SELECT request_id, status, revision, candidate_revision, actor_user_id, page_id, input_sha256 FROM edit_receipts;
DROP TABLE edit_receipts;
ALTER TABLE edit_receipts_pending_live RENAME TO edit_receipts;

-- Rebuild the child first so the parent can be replaced without losing drafts.
CREATE TABLE workspace_drafts_backup AS
SELECT task_id, user_id, target_page_id, base_sha, content, content_sha256, feedback, version, created_at, updated_at
FROM workspace_drafts;
DROP TABLE workspace_drafts;

CREATE TABLE ingestion_tasks_pending_live (
  task_id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  login TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_sha256 TEXT NOT NULL,
  target_page_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('stored', 'committed', 'pending_live', 'conflict', 'approval_required')),
  created_at TEXT NOT NULL,
  revision TEXT,
  edit_request_id TEXT,
  UNIQUE (user_id, request_id)
);

INSERT INTO ingestion_tasks_pending_live (task_id, request_id, user_id, login, title, content, content_sha256, target_page_id, status, created_at, revision, edit_request_id)
SELECT task_id, request_id, user_id, login, title, content, content_sha256, target_page_id, status, created_at, revision, edit_request_id FROM ingestion_tasks;
DROP TABLE ingestion_tasks;
ALTER TABLE ingestion_tasks_pending_live RENAME TO ingestion_tasks;

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

INSERT INTO workspace_drafts (task_id, user_id, target_page_id, base_sha, content, content_sha256, feedback, version, created_at, updated_at)
SELECT task_id, user_id, target_page_id, base_sha, content, content_sha256, feedback, version, created_at, updated_at FROM workspace_drafts_backup;
DROP TABLE workspace_drafts_backup;
CREATE INDEX workspace_drafts_user_id ON workspace_drafts(user_id);
