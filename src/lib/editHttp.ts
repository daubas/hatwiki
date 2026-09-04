import type { EditActor, EditPageInput, EditReceipt } from './editContracts.ts';

type Edit = (actor: EditActor, input: EditPageInput) => Promise<EditReceipt>;

function json(value: unknown, status = 200): Response {
  return Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } });
}

export function withEditLinks(receipt: EditReceipt, pageId: string, requestUrl: string): EditReceipt {
  const revision = receipt.revision ?? receipt.candidateRevision;
  return {
    ...receipt,
    pageUrl: `${new URL(requestUrl).origin}/wiki/${pageId.split('/').map(encodeURIComponent).join('/')}`,
    ...(revision ? { revisionUrl: `https://github.com/daubas/hatwiki/commit/${encodeURIComponent(revision)}` } : {}),
  };
}

export async function handleEditRequest(request: Request, actor: EditActor | null, edit: Edit): Promise<Response> {
  if (!actor) return json({ error: 'authentication_required' }, 401);
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'cross_origin_request' }, 403);

  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid_input');
    if (body.authorizationConfirmed !== true) return json({ error: 'authorization_required' }, 400);
    return json(await edit(actor, {
      requestId: body.requestId as string,
      pageId: body.pageId as string,
      baseSha: body.baseSha as string,
      content: body.content as string,
      reason: body.reason as string,
    }));
  } catch (error) {
    if (error instanceof SyntaxError || (error instanceof Error && error.message === 'invalid_input')) return json({ error: 'invalid_input' }, 400);
    if (error instanceof Error && error.message === 'page_not_found') return json({ error: 'page_not_found' }, 404);
    throw error;
  }
}
