import type { APIRoute } from 'astro';

import { getLocale, withLocale } from '../../lib/i18n.ts';
import { clearSessionCookie } from '../../lib/sessionCookie.ts';

export const GET: APIRoute = async ({ request }) => new Response(null, {
  status: 302,
  headers: {
    Location: withLocale('/', getLocale(new URL(request.url))),
    'Set-Cookie': clearSessionCookie,
    'Cache-Control': 'no-store',
  },
});
