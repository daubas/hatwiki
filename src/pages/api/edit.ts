import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { createD1ReceiptStore } from '../../lib/d1ReceiptStore.ts';
import { handleEditRequest } from '../../lib/editHttp.ts';
import { createEditPageService } from '../../lib/editPageService.ts';
import { createGitHubAppAuth } from '../../lib/githubAppAuth.ts';
import { createGitHubRepository } from '../../lib/githubRepository.ts';
import { createR2Publisher } from '../../lib/r2Publisher.ts';
import { readSessionCookie } from '../../lib/sessionCookie.ts';

export const POST: APIRoute = async ({ request }) => {
  const actor = env.SESSION_SECRET ? await readSessionCookie(env.SESSION_SECRET, request.headers.get('Cookie')) : null;
  if (!actor) return handleEditRequest(request, null, async () => { throw new Error('unreachable'); });
  if (!env.GITHUB_APP_ID || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.GITHUB_PRIVATE_KEY) {
    return Response.json({ error: 'github_app_not_configured' }, { status: 503 });
  }

  const auth = createGitHubAppAuth({
    appId: env.GITHUB_APP_ID,
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    privateKeyPem: env.GITHUB_PRIVATE_KEY,
    redirectUri: `${new URL(request.url).origin}/auth/callback`,
  });
  const installation = await auth.createInstallationToken(Number(env.GITHUB_INSTALLATION_ID), Number(env.GITHUB_REPOSITORY_ID));
  const service = createEditPageService({
    repository: createGitHubRepository({ owner: 'daubas', repo: 'hatwiki', branch: 'main', token: installation.token, fetcher: fetch }),
    receipts: createD1ReceiptStore(env.HATWIKI_STATE),
    publisher: createR2Publisher(env.HATWIKI_PUBLIC),
    policy: { protectedPaths: ['policies/**'], largeEditThreshold: 50_000 },
  });
  return handleEditRequest(request, actor, service.edit);
};
