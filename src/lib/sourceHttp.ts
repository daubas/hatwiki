import type { EditActor } from './editContracts.ts';
import type { IngestionReceipt, IngestionTask } from './sourceIngestion.ts';

type Add = (actor: EditActor, input: {
  requestId: string; title: string; content: string; targetPageId: string; authorizationConfirmed: boolean;
}) => Promise<IngestionReceipt>;
type Get = (taskId: string, userId: number) => Promise<IngestionTask | null>;

const json = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } });

export async function handleAddSourceRequest(request: Request, actor: EditActor | null, add: Add): Promise<Response> {
  if (!actor) return json({ error: 'authentication_required' }, 401);
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'cross_origin_request' }, 403);
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid_input');
    const value = body as Record<string, unknown>;
    return json(await add(actor, {
      requestId: value.requestId as string,
      title: value.title as string,
      content: value.content as string,
      targetPageId: value.targetPageId as string,
      authorizationConfirmed: value.authorizationConfirmed === true,
    }), 201);
  } catch (error) {
    const code = error instanceof SyntaxError ? 'invalid_input' : error instanceof Error ? error.message : 'invalid_input';
    if (!['invalid_input', 'invalid_actor', 'page_not_found', 'authorization_required', 'source_too_large', 'request_conflict'].includes(code)) throw error;
    const status = code === 'page_not_found' ? 404 : code === 'authorization_required' ? 400 : code === 'source_too_large' ? 413 : code === 'request_conflict' ? 409 : 400;
    return json({ error: code }, status);
  }
}

export async function handleGetIngestionRequest(actor: EditActor | null, taskId: unknown, get: Get): Promise<Response> {
  if (!actor) return json({ error: 'authentication_required' }, 401);
  if (typeof taskId !== 'string' || !taskId.trim() || /[\r\n]/.test(taskId)) return json({ error: 'invalid_input' }, 400);
  const task = await get(taskId, actor.userId);
  if (!task) return json({ error: 'not_found' }, 404);
  const { userId: _userId, login: _login, ...view } = task;
  return json({ ...view, citationId: `source-${task.taskId}` });
}
