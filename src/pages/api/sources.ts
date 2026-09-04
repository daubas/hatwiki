import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { createD1IngestionStore } from '../../lib/d1IngestionStore.ts';
import { handleAddSourceRequest } from '../../lib/sourceHttp.ts';
import { createSourceIngestionService } from '../../lib/sourceIngestion.ts';
import { readSessionCookie } from '../../lib/sessionCookie.ts';
import { getSiteWiki } from '../../lib/siteWiki.ts';

export const POST: APIRoute = async ({ request }) => {
  const actor = env.SESSION_SECRET ? await readSessionCookie(env.SESSION_SECRET, request.headers.get('Cookie')) : null;
  const service = createSourceIngestionService(createD1IngestionStore(env.HATWIKI_STATE));
  const wiki = await getSiteWiki();
  return handleAddSourceRequest(request, actor, async (sourceActor, input) => {
    if (!await wiki.readPage(input.targetPageId)) throw new Error('page_not_found');
    return service.add(sourceActor, input);
  });
};
