import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { createGitHubAppAuth } from '../../lib/githubAppAuth.ts';
import { t, withLocale } from '../../lib/i18n.ts';
import { clearOAuthStateCookie, localeFromOAuthState, readOAuthState } from '../../lib/oauthState.ts';
import { createSessionCookie } from '../../lib/sessionCookie.ts';

export const GET: APIRoute = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const expectedState = readOAuthState(request.headers.get('Cookie'));
  const locale = localeFromOAuthState(expectedState);
  if (!expectedState || !env.GITHUB_APP_ID || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.GITHUB_PRIVATE_KEY || !env.SESSION_SECRET) {
    return new Response(t(locale, 'authInvalidLogin'), { status: 400, headers: { 'Set-Cookie': clearOAuthStateCookie } });
  }
  try {
    const auth = createGitHubAppAuth({
      appId: env.GITHUB_APP_ID,
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      privateKeyPem: env.GITHUB_PRIVATE_KEY,
      redirectUri: `${requestUrl.origin}/auth/callback`,
    });
    const { user } = await auth.completeUserAuthorization(request.url, expectedState);
    const headers = new Headers({ Location: withLocale('/', locale), 'Cache-Control': 'no-store' });
    headers.append('Set-Cookie', clearOAuthStateCookie);
    headers.append('Set-Cookie', await createSessionCookie(env.SESSION_SECRET, { userId: user.id, login: user.login }));
    return new Response(null, { status: 302, headers });
  } catch {
    return new Response(t(locale, 'authLoginFailed'), { status: 400, headers: { 'Set-Cookie': clearOAuthStateCookie } });
  }
};
