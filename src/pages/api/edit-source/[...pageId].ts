import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { handleEditSourceRequest } from '../../../lib/editSourceHttp.ts';
import { createGitHubAppAuth } from '../../../lib/githubAppAuth.ts';
import { createGitHubRepository } from '../../../lib/githubRepository.ts';
import { readSessionCookie } from '../../../lib/sessionCookie.ts';
import { getSiteWiki } from '../../../lib/siteWiki.ts';
import { getWikiRepositoryConfig } from '../../../lib/wikiRepositoryConfig.ts';

export const GET: APIRoute = async ({ request, params }) => {
  const actor = env.SESSION_SECRET ? await readSessionCookie(env.SESSION_SECRET, request.headers.get('Cookie')) : null;
  if (!actor) return handleEditSourceRequest(null, params.pageId, async () => false, async () => null);
  if (!env.GITHUB_APP_ID || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.GITHUB_PRIVATE_KEY) {
    return Response.json({ error: 'github_app_not_configured' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  let repositoryConfig;
  try {
    repositoryConfig = getWikiRepositoryConfig(env);
  } catch {
    return Response.json({ error: 'github_app_not_configured' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }

  const auth = createGitHubAppAuth({
    appId: env.GITHUB_APP_ID,
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    privateKeyPem: env.GITHUB_PRIVATE_KEY,
    redirectUri: `${new URL(request.url).origin}/auth/callback`,
  });
  const installation = await auth.createInstallationToken(repositoryConfig.installationId, repositoryConfig.repositoryId);
  const repository = createGitHubRepository({ ...repositoryConfig, token: installation.token, fetcher: fetch });
  const wiki = await getSiteWiki();
  return handleEditSourceRequest(actor, params.pageId, async (pageId) => Boolean(await wiki.readPage(pageId)), repository.readPage);
};
