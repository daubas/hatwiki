import { getCollection } from 'astro:content';

import { createCollectionProjection } from './collectionProjection.ts';
import { createPublicWiki } from './publicWiki.ts';

export async function getSiteWiki() {
  const entries = await getCollection('wiki');
  return createPublicWiki(createCollectionProjection('local-fixture', entries));
}

export async function getSiteSnapshot() {
  const entries = await getCollection('wiki');
  return createCollectionProjection('local-fixture', entries).readSnapshot();
}
