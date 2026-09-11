import { getCollection } from 'astro:content';
import { env } from 'cloudflare:workers';

import { createCollectionProjection } from './collectionProjection.ts';
import { createPublicWiki } from './publicWiki.ts';
import { createR2OverlayProjection } from './r2OverlayProjection.ts';
import { getWikiProjectionNamespace, isContributorBranchMode, isLiveBranchMode } from './wikiRepositoryConfig.ts';

async function getProjection() {
  const entries = await getCollection('wiki');
  const namespace = isContributorBranchMode(env) || isLiveBranchMode(env) ? getWikiProjectionNamespace(env) : env.WIKI_REPO;
  return createR2OverlayProjection(createCollectionProjection('local-fixture', entries), env.HATWIKI_PUBLIC, namespace);
}

export async function getSiteWiki() {
  return createPublicWiki(await getProjection());
}

export async function getSiteSnapshot() {
  return (await getProjection()).readSnapshot();
}
