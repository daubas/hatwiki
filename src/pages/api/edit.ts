import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { createD1ReceiptStore } from '../../lib/d1ReceiptStore.ts';
import { createD1IngestionStore } from '../../lib/d1IngestionStore.ts';
import { handleEditRequest, withEditLinks } from '../../lib/editHttp.ts';
import { createEditPageService } from '../../lib/editPageService.ts';
import { createGitHubAppAuth } from '../../lib/githubAppAuth.ts';
import { createGitHubRepository } from '../../lib/githubRepository.ts';
import { createR2Publisher } from '../../lib/r2Publisher.ts';
import { readSessionCookie } from '../../lib/sessionCookie.ts';
import { completeSourceEdit } from '../../lib/sourceEdit.ts';
import { getSiteWiki } from '../../lib/siteWiki.ts';
import { getWikiRepositoryConfig } from '../../lib/wikiRepositoryConfig.ts';

export const POST: APIRoute = async ({ request }) => {
  const actor = env.SESSION_SECRET ? await readSessionCookie(env.SESSION_SECRET, request.headers.get('Cookie')) : null;
  if (!actor) return handleEditRequest(request, null, async () => { throw new Error('unreachable'); });
  if (!env.GITHUB_APP_ID || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.GITHUB_PRIVATE_KEY) {
    return Response.json({ error: 'github_app_not_configured' }, { status: 503 });
  }
  let repositoryConfig;
  try {
    repositoryConfig = getWikiRepositoryConfig(env);
  } catch {
    return Response.json({ error: 'github_app_not_configured' }, { status: 503 });
  }

  const auth = createGitHubAppAuth({
    appId: env.GITHUB_APP_ID,
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    privateKeyPem: env.GITHUB_PRIVATE_KEY,
    redirectUri: `${new URL(request.url).origin}/auth/callback`,
  });
  const installation = await auth.createInstallationToken(repositoryConfig.installationId, repositoryConfig.repositoryId);
  const service = createEditPageService({
    repository: createGitHubRepository({ ...repositoryConfig, token: installation.token, fetcher: fetch }),
    receipts: createD1ReceiptStore(env.HATWIKI_STATE),
    publisher: createR2Publisher(env.HATWIKI_PUBLIC),
    policy: { protectedPaths: ['policies/**'], largeEditThreshold: 50_000 },
  });
  const wiki = await getSiteWiki();
  const ingestions = createD1IngestionStore(env.HATWIKI_STATE);
  return handleEditRequest(request, actor, async (editActor, input) => {
    if (!await wiki.readPage(input.pageId)) throw new Error('page_not_found');
    return withEditLinks(await completeSourceEdit(editActor, input, ingestions, service.edit), input.pageId, request.url, `${repositoryConfig.owner}/${repositoryConfig.repo}`);
  });
};
