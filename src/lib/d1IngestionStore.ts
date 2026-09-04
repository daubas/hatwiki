import type { IngestionStatus, IngestionTask, IngestionTaskStore } from './sourceIngestion.ts';

type D1Statement = { bind(...values: unknown[]): D1Statement; first<T>(): Promise<T | null>; run(): Promise<unknown> };
type D1DatabaseLike = { prepare(query: string): D1Statement };
type TaskRow = {
  task_id: string; request_id: string; user_id: number; login: string; title: string; content: string;
  content_sha256: string; target_page_id: string; status: IngestionStatus; created_at: string; revision: string | null; edit_request_id: string | null;
};

const columns = 'task_id, request_id, user_id, login, title, content, content_sha256, target_page_id, status, created_at, revision, edit_request_id';
const taskFromRow = (row: TaskRow): IngestionTask => ({
  taskId: row.task_id,
  requestId: row.request_id,
  userId: row.user_id,
  login: row.login,
  title: row.title,
  content: row.content,
  contentSha256: row.content_sha256,
  targetPageId: row.target_page_id,
  status: row.status,
  createdAt: row.created_at,
  ...(row.revision ? { revision: row.revision } : {}),
  ...(row.edit_request_id ? { editRequestId: row.edit_request_id } : {}),
});

export function createD1IngestionStore(db: D1DatabaseLike): IngestionTaskStore {
  const read = async (query: string, values: unknown[]) => {
    const row = await db.prepare(query).bind(...values).first<TaskRow>();
    return row ? taskFromRow(row) : null;
  };
  return {
    findByRequest: (userId, requestId) => read(`SELECT ${columns} FROM ingestion_tasks WHERE user_id = ? AND request_id = ?`, [userId, requestId]),
    get: (taskId, userId) => read(`SELECT ${columns} FROM ingestion_tasks WHERE task_id = ? AND user_id = ?`, [taskId, userId]),
    async put(task) {
      await db.prepare(`INSERT INTO ingestion_tasks (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(task.taskId, task.requestId, task.userId, task.login, task.title, task.content, task.contentSha256, task.targetPageId, task.status, task.createdAt, task.revision ?? null, task.editRequestId ?? null)
        .run();
    },
    async claimEdit(taskId, userId, requestId) {
      const result = await db.prepare('UPDATE ingestion_tasks SET edit_request_id = ? WHERE task_id = ? AND user_id = ? AND status = ? AND (edit_request_id IS NULL OR edit_request_id = ?)')
        .bind(requestId, taskId, userId, 'stored', requestId).run() as { meta?: { changes?: number } };
      return (result.meta?.changes ?? 0) > 0;
    },
    async updateResult(taskId, userId, requestId, status, revision) {
      const result = await db.prepare('UPDATE ingestion_tasks SET status = ?, revision = ? WHERE task_id = ? AND user_id = ? AND edit_request_id = ? AND (status = ? OR (status = ? AND revision IS ?))')
        .bind(status, revision ?? null, taskId, userId, requestId, 'stored', status, revision ?? null).run() as { meta?: { changes?: number } };
      return (result.meta?.changes ?? 0) > 0;
    },
  };
}
