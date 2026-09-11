import assert from 'node:assert/strict';
import test from 'node:test';

import { getWikiProjectionNamespace, getWikiPublicRef } from '../src/lib/wikiRepositoryConfig.ts';
import { createR2OverlayProjection } from '../src/lib/r2OverlayProjection.ts';

const repository = 'daubas/webmcp-okf';

test('isolates the R2 projection namespace by repository and public ref', () => {
  const main = getWikiProjectionNamespace({ WIKI_REPO: repository, WIKI_REF: 'main' });
  const live = getWikiProjectionNamespace({ WIKI_REPO: repository, WIKI_REF: 'main', WIKI_PUBLIC_REF: 'wiki-live' });
  const otherRepository = getWikiProjectionNamespace({ WIKI_REPO: 'acme/other-wiki', WIKI_REF: 'main' });

  assert.equal(main, getWikiProjectionNamespace({ WIKI_REPO: repository, WIKI_REF: 'main' }));
  assert.equal(live, getWikiProjectionNamespace({ WIKI_REPO: repository, WIKI_REF: 'main', WIKI_PUBLIC_REF: 'wiki-live' }));
  assert.notEqual(main, live);
  assert.notEqual(main, otherRepository);
});

test('uses separate R2 prefixes for main and wiki-live projections', async () => {
  const prefixes: string[] = [];
  const base = { readSnapshot: async () => ({ revision: 'base', pages: [] }) };
  const bucket = {
    list: async ({ prefix }: { prefix: string; limit: number }) => {
      prefixes.push(prefix);
      return { objects: [] };
    },
    get: async () => null,
  };

  await createR2OverlayProjection(base, bucket, getWikiProjectionNamespace({ WIKI_REPO: repository, WIKI_REF: 'main' })).readSnapshot();
  await createR2OverlayProjection(base, bucket, getWikiProjectionNamespace({ WIKI_REPO: repository, WIKI_REF: 'main', WIKI_PUBLIC_REF: 'wiki-live' })).readSnapshot();

  assert.equal(prefixes.length, 4);
  assert.equal(new Set(prefixes).size, 4);
  assert.equal(prefixes.filter((prefix) => /published\/.*\/pages\/$/.test(prefix)).length, 2);
  assert.equal(prefixes.filter((prefix) => /published\/.*\/variants\/$/.test(prefix)).length, 2);
});

test('falls back to WIKI_REF when no public ref is configured', () => {
  assert.equal(getWikiPublicRef({ WIKI_REF: 'main' }), 'main');
  assert.equal(getWikiPublicRef({ WIKI_REF: 'main', WIKI_PUBLIC_REF: undefined }), 'main');
});

test('rejects unsafe public refs before constructing a projection namespace', () => {
  for (const ref of ['', ' ', 'wiki live', '../main', 'main@{1}', '.hidden', 'release.lock', 'main?raw=1']) {
    assert.throws(
      () => getWikiPublicRef({ WIKI_REF: 'main', WIKI_PUBLIC_REF: ref }),
      /Wiki repository is not configured/,
      `expected unsafe ref to be rejected: ${ref}`,
    );
  }
});
