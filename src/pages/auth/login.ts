import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { createGitHubAppAuth } from '../../lib/githubAppAuth.ts';
import { getLocale, t } from '../../lib/i18n.ts';
import { createOAuthState } from '../../lib/oauthState.ts';

export const GET: APIRoute = async ({ request }) => {
  const locale = getLocale(new URL(request.url));
  if (!env.GITHUB_APP_ID || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.GITHUB_PRIVATE_KEY) {
    return new Response(t(locale, 'authAppNotConfigured'), { status: 503 });
  }
  const { state, cookie } = createOAuthState();
  const auth = createGitHubAppAuth({
    appId: env.GITHUB_APP_ID,
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    privateKeyPem: env.GITHUB_PRIVATE_KEY,
    redirectUri: `${new URL(request.url).origin}/auth/callback`,
  });
  return new Response(null, {
    status: 302,
    headers: { Location: auth.beginUserAuthorization(state), 'Set-Cookie': cookie, 'Cache-Control': 'no-store' },
  });
};
