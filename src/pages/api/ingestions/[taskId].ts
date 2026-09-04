import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { createD1IngestionStore } from '../../../lib/d1IngestionStore.ts';
import { handleGetIngestionRequest } from '../../../lib/sourceHttp.ts';
import { readSessionCookie } from '../../../lib/sessionCookie.ts';

export const GET: APIRoute = async ({ request, params }) => {
  const actor = env.SESSION_SECRET ? await readSessionCookie(env.SESSION_SECRET, request.headers.get('Cookie')) : null;
  return handleGetIngestionRequest(actor, params.taskId, createD1IngestionStore(env.HATWIKI_STATE).get);
};
