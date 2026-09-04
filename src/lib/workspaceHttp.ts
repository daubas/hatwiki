import type { EditActor } from './editContracts.ts';
import type { IngestionTask } from './sourceIngestion.ts';

export type WorkspaceDraft = {
  taskId: string;
  userId: number;
  targetPageId: string;
  baseSha: string;
  content: string;
  contentSha256: string;
  feedback: string;
  version: number;
  createdAt: string;
  updatedAt: string;
};

type GetTask = (taskId: string, userId: number) => Promise<IngestionTask | null>;
type GetDraft = (taskId: string, userId: number) => Promise<WorkspaceDraft | null>;
type SaveDraft = (input: {
  taskId: string;
  userId: number;
  targetPageId: string;
  baseSha: string;
  content: string;
  feedback: string;
  expectedVersion: number;
}) => Promise<WorkspaceDraft>;

const json = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } });
const validTaskId = (value: unknown): value is string => typeof value === 'string' && Boolean(value.trim()) && !/[\r\n]/.test(value);
const draftView = ({ taskId: _taskId, userId: _userId, targetPageId: _target, createdAt: _createdAt, ...draft }: WorkspaceDraft) => draft;
const workspaceView = (source: IngestionTask, draft: WorkspaceDraft | null) => ({
  changeId: source.taskId,
  status: source.status,
  source: {
    title: source.title,
    targetPageId: source.targetPageId,
    citationId: `source-${source.taskId}`,
    content: source.content,
  },
  draft: draft ? draftView(draft) : null,
});

export async function handleGetWorkspaceRequest(
  actor: EditActor | null,
  taskId: unknown,
  getTask: GetTask,
  getDraft: GetDraft,
): Promise<Response> {
  if (!actor) return json({ error: 'authentication_required' }, 401);
  if (!validTaskId(taskId)) return json({ error: 'invalid_input' }, 400);
  const source = await getTask(taskId, actor.userId);
  if (!source) return json({ error: 'not_found' }, 404);
  return json(workspaceView(source, await getDraft(taskId, actor.userId)));
}

export async function handleSaveWorkspaceRequest(
  request: Request,
  actor: EditActor | null,
  taskId: unknown,
  getTask: GetTask,
  saveDraft: SaveDraft,
): Promise<Response> {
  if (!actor) return json({ error: 'authentication_required' }, 401);
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'cross_origin_request' }, 403);
  if (!validTaskId(taskId)) return json({ error: 'invalid_input' }, 400);
  const source = await getTask(taskId, actor.userId);
  if (!source) return json({ error: 'not_found' }, 404);
  if (source.status !== 'stored') return json({ error: 'workspace_closed' }, 409);

  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid_input');
    const value = body as Record<string, unknown>;
    const draft = await saveDraft({
      taskId,
      userId: actor.userId,
      targetPageId: source.targetPageId,
      baseSha: value.baseSha as string,
      content: value.content as string,
      feedback: value.feedback as string,
      expectedVersion: value.expectedVersion as number,
    });
    return json(workspaceView(source, draft));
  } catch (error) {
    const code = error instanceof SyntaxError ? 'invalid_input' : error instanceof Error ? error.message : 'invalid_input';
    if (!['invalid_input', 'workspace_stale', 'workspace_closed', 'draft_too_large'].includes(code)) throw error;
    return json({ error: code }, code === 'draft_too_large' ? 413 : code.startsWith('workspace_') ? 409 : 400);
  }
}
