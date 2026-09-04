import type { EditActor, RepositoryPage } from './editContracts.ts';
import { isPublicMarkdown } from './collectionProjection.ts';
import { isCanonicalPageId } from './editPageService.ts';

type ReadPage = (pageId: string) => Promise<RepositoryPage | null>;
type IsPublicPage = (pageId: string) => Promise<boolean>;

function json(value: unknown, status = 200): Response {
  return Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function handleEditSourceRequest(actor: EditActor | null, pageId: unknown, isPublicPage: IsPublicPage, readPage: ReadPage): Promise<Response> {
  if (!actor) return json({ error: 'authentication_required' }, 401);
  if (!isCanonicalPageId(pageId)) return json({ error: 'invalid_input' }, 400);
  if (!await isPublicPage(pageId)) return json({ error: 'page_not_found' }, 404);
  const page = await readPage(pageId);
  return page && isPublicMarkdown(pageId, page.content)
    ? json({ pageId, baseSha: page.sha, content: page.content })
    : json({ error: 'page_not_found' }, 404);
}
