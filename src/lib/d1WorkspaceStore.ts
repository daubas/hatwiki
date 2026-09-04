import { isCanonicalPageId } from './editPageService.ts';
import type { WorkspaceDraft } from './workspaceHttp.ts';

type D1Statement = { bind(...values: unknown[]): D1Statement; first<T>(): Promise<T | null>; run(): Promise<unknown> };
type D1DatabaseLike = { prepare(query: string): D1Statement };
type DraftRow = {
  task_id: string; user_id: number; target_page_id: string; base_sha: string; content: string;
  content_sha256: string; feedback: string; version: number; created_at: string; updated_at: string;
};
type SaveInput = Omit<WorkspaceDraft, 'contentSha256' | 'version' | 'createdAt' | 'updatedAt'> & { expectedVersion: number };

const columns = 'task_id, user_id, target_page_id, base_sha, content, content_sha256, feedback, version, created_at, updated_at';
const fromRow = (row: DraftRow): WorkspaceDraft => ({
  taskId: row.task_id, userId: row.user_id, targetPageId: row.target_page_id, baseSha: row.base_sha,
  content: row.content, contentSha256: row.content_sha256, feedback: row.feedback, version: row.version,
  createdAt: row.created_at, updatedAt: row.updated_at,
});
const sha256 = async (value: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))), (byte) => byte.toString(16).padStart(2, '0')).join('');

function validate(input: SaveInput): void {
  if (typeof input.taskId !== 'string' || !input.taskId.trim() || /[\r\n]/.test(input.taskId)
    || !Number.isSafeInteger(input.userId) || input.userId <= 0
    || !isCanonicalPageId(input.targetPageId)
    || typeof input.baseSha !== 'string' || !input.baseSha.trim() || input.baseSha.length > 160 || /\s/.test(input.baseSha)
    || typeof input.content !== 'string' || !input.content.trim()
    || typeof input.feedback !== 'string' || input.feedback.length > 2_000
    || !Number.isSafeInteger(input.expectedVersion) || input.expectedVersion < 0) throw new Error('invalid_input');
  if (new TextEncoder().encode(input.content).length > 200_000) throw new Error('draft_too_large');
}

export function createD1WorkspaceStore(db: D1DatabaseLike, options: { now?: () => string } = {}) {
  const get = async (taskId: string, userId: number) => {
    const row = await db.prepare(`SELECT ${columns} FROM workspace_drafts WHERE task_id = ? AND user_id = ?`).bind(taskId, userId).first<DraftRow>();
    return row ? fromRow(row) : null;
  };
  return {
    get,
    async save(input: SaveInput): Promise<WorkspaceDraft> {
      validate(input);
      const now = (options.now ?? (() => new Date().toISOString()))();
      const contentSha256 = await sha256(input.content);
      const next: WorkspaceDraft = {
        taskId: input.taskId, userId: input.userId, targetPageId: input.targetPageId, baseSha: input.baseSha,
        content: input.content, contentSha256, feedback: input.feedback, version: input.expectedVersion + 1,
        createdAt: now, updatedAt: now,
      };

      if (input.expectedVersion === 0) {
        try {
          await db.prepare(`INSERT INTO workspace_drafts (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(
            input.taskId, input.userId, input.targetPageId, input.baseSha, input.content, contentSha256, input.feedback, 1, now, now,
          ).run();
        } catch (error) {
          if (await get(input.taskId, input.userId)) throw new Error('workspace_stale');
          throw error;
        }
        return next;
      }

      const result = await db.prepare('UPDATE workspace_drafts SET base_sha = ?, content = ?, content_sha256 = ?, feedback = ?, version = ?, updated_at = ? WHERE task_id = ? AND user_id = ? AND target_page_id = ? AND version = ?')
        .bind(input.baseSha, input.content, contentSha256, input.feedback, next.version, now, input.taskId, input.userId, input.targetPageId, input.expectedVersion).run() as { meta?: { changes?: number } };
      if ((result.meta?.changes ?? 0) !== 1) throw new Error('workspace_stale');
      return { ...next, createdAt: (await get(input.taskId, input.userId))?.createdAt ?? now };
    },
  };
}
