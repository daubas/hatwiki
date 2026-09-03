import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { readSessionCookie } from '../../lib/sessionCookie.ts';

export const GET: APIRoute = async ({ request }) => Response.json({
  actor: env.SESSION_SECRET ? await readSessionCookie(env.SESSION_SECRET, request.headers.get('Cookie')) : null,
}, { headers: { 'Cache-Control': 'no-store' } });
