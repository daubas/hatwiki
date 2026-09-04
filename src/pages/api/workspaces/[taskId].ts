import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { createD1IngestionStore } from '../../../lib/d1IngestionStore.ts';
import { createD1WorkspaceStore } from '../../../lib/d1WorkspaceStore.ts';
import { readSessionCookie } from '../../../lib/sessionCookie.ts';
import { handleGetWorkspaceRequest, handleSaveWorkspaceRequest } from '../../../lib/workspaceHttp.ts';

const actorFor = (request: Request) => env.SESSION_SECRET ? readSessionCookie(env.SESSION_SECRET, request.headers.get('Cookie')) : Promise.resolve(null);

export const GET: APIRoute = async ({ request, params }) => {
  const actor = await actorFor(request);
  return handleGetWorkspaceRequest(actor, params.taskId, createD1IngestionStore(env.HATWIKI_STATE).get, createD1WorkspaceStore(env.HATWIKI_STATE).get);
};

export const PUT: APIRoute = async ({ request, params }) => {
  const actor = await actorFor(request);
  return handleSaveWorkspaceRequest(request, actor, params.taskId, createD1IngestionStore(env.HATWIKI_STATE).get, createD1WorkspaceStore(env.HATWIKI_STATE).save);
};
