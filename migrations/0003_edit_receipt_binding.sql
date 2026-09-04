ALTER TABLE edit_receipts ADD COLUMN actor_user_id INTEGER;
ALTER TABLE edit_receipts ADD COLUMN page_id TEXT;
ALTER TABLE edit_receipts ADD COLUMN input_sha256 TEXT;
ALTER TABLE ingestion_tasks ADD COLUMN edit_request_id TEXT;
