import assert from 'node:assert/strict';
import test from 'node:test';
import { createCollectionProjection } from '../src/lib/collectionProjection.ts';
import { isStale } from '../src/lib/contracts.ts';
import { createPublicWiki } from '../src/lib/publicWiki.ts';
import { buildWikiGraph } from '../src/lib/wikiGraph.ts';
import { mergeWikiIndexPages } from '../src/lib/wikiIndex.ts';
import { createWebMcpTools } from '../src/lib/webmcpTools.ts';

const projection = createCollectionProjection('rev', [
  { id: 'guides/official', body: 'Official [[sources/note]] shipping', data: { title: 'Official', status: 'active', stale_after: '2020-01-01' } },
  { id: 'sources/note', body: 'Draft shipping note [[guides/official]]', data: { title: 'Note', status: 'draft' } },
  { id: 'guides/plain', body: 'No status', data: { title: 'Plain' } },
]);

test('projection carries status and stale_after', async () => {
  const { pages } = await projection.readSnapshot();
  assert.equal(pages[0].status, 'active');
  assert.equal(pages[0].staleAfter, '2020-01-01');
  assert.equal(pages[2].status, undefined);
});

test('draft pages stay out of default search but can be included', async () => {
  const wiki = createPublicWiki(projection);
  assert.deepEqual((await wiki.searchWiki('shipping')).map((r) => r.pageId), ['guides/official']);
  assert.deepEqual((await wiki.searchWiki('shipping', { includeDrafts: true })).map((r) => r.pageId), ['guides/official', 'sources/note']);
});

test('draft pages are directly readable with status; backlinks flag drafts', async () => {
  const wiki = createPublicWiki(projection);
  assert.equal((await wiki.readPage('sources/note'))?.status, 'draft');
  const official = await wiki.readPage('guides/official');
  assert.equal(official?.status, 'active');
  assert.deepEqual(official?.backlinkPages.map((b) => [b.pageId, b.status]), [['sources/note', 'draft']]);
});

test('read_page tool result exposes status', async () => {
  const wiki = createPublicWiki(projection);
  const tool = createWebMcpTools({ searchWiki: (q) => wiki.searchWiki(q), readPage: (id, v) => wiki.readPage(id, v) })[0];
  const result = await tool.execute({ pageId: 'sources/note' });
  assert.equal((result.structuredContent as { status: string }).status, 'draft');
});

test('graph and index hide drafts by default', async () => {
  const snapshot = await projection.readSnapshot();
  assert.deepEqual(buildWikiGraph(snapshot).nodes.map((n) => n.id), ['guides/official', 'guides/plain']);
  assert.deepEqual(buildWikiGraph(snapshot).edges, []);
  assert.equal(buildWikiGraph(snapshot, { includeDrafts: true, includeSources: true }).nodes.length, 3);
  assert.deepEqual(mergeWikiIndexPages(snapshot.pages, []).map((i) => i.id), ['guides/official', 'guides/plain']);
  const withDrafts = mergeWikiIndexPages(snapshot.pages, [], { includeDrafts: true });
  assert.equal(withDrafts.find((i) => i.id === 'sources/note')?.status, 'draft');
});

test('isStale treats stale_after <= today as expired', () => {
  assert.equal(isStale('2026-10-17', '2026-10-17'), true);
  assert.equal(isStale('2026-10-16', '2026-10-17'), true);
  assert.equal(isStale('2026-10-18', '2026-10-17'), false);
  assert.equal(isStale(undefined, '2026-10-17'), false);
  assert.equal(isStale('not-a-date', '2026-10-17'), false);
});
