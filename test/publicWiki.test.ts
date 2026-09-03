import assert from 'node:assert/strict';
import test from 'node:test';
import { createPublicWiki } from '../src/lib/publicWiki.ts';
import { publicProjection } from './fixtures/public-wiki.ts';

test('readPage returns a canonical page with its revision, citations, candidates, and exact-path link', async () => {
  const wiki = createPublicWiki(publicProjection);

  const page = await wiki.readPage('guides/overview');

  assert.ok(page);
  assert.equal(page.revision, '9c0ffee');
  assert.deepEqual(page.citations, [{ id: 'source-1', resource: 'https://example.test/source', title: 'Public source' }]);
  assert.equal(page.pendingCandidates, 2);
  assert.deepEqual(page.links[0], { target: 'concepts/shared', status: 'resolved', pageId: 'concepts/shared' });
});

test('readPage resolves a bare WikiLink only when its basename is unique', async () => {
  const wiki = createPublicWiki(publicProjection);

  const page = await wiki.readPage('guides/overview');

  assert.ok(page);
  assert.deepEqual(page.links[1], { target: 'unique', status: 'resolved', pageId: 'topics/unique' });
});

test('readPage exposes ambiguous and unresolved WikiLinks instead of guessing', async () => {
  const wiki = createPublicWiki(publicProjection);

  const page = await wiki.readPage('guides/overview');

  assert.ok(page);
  assert.equal(page.links[2].status, 'ambiguous');
  assert.deepEqual([...page.links[2].candidates ?? []].sort(), ['archive/shared', 'concepts/shared']);
  assert.deepEqual(page.links[3], { target: 'missing-page', status: 'unresolved' });
});

test('readPage derives backlinks from resolved links in the same snapshot', async () => {
  const wiki = createPublicWiki(publicProjection);

  const page = await wiki.readPage('guides/overview');

  assert.ok(page);
  assert.deepEqual(page.backlinks, ['notes/reviewer']);
});

test('searchWiki finds only projected pages whose public text matches the query', async () => {
  const wiki = createPublicWiki(publicProjection);

  const pages = await wiki.searchWiki('comet');

  assert.deepEqual(pages.map((page) => ({ pageId: page.pageId, title: page.title })), [
    { pageId: 'topics/unique', title: 'Unique topic' },
  ]);
});

test('readPage normalizes internal Markdown paths and applies the WikiLink ambiguity rules', async () => {
  const wiki = createPublicWiki(publicProjection);

  const page = await wiki.readPage('guides/overview');

  assert.ok(page);
  const markdownLinks = page.links.slice(4);
  assert.deepEqual(markdownLinks[0], { target: 'concepts/shared', status: 'resolved', pageId: 'concepts/shared' });
  assert.equal(markdownLinks[1].status, 'ambiguous');
  assert.deepEqual([...markdownLinks[1].candidates ?? []].sort(), ['archive/shared', 'concepts/shared']);
  assert.deepEqual(markdownLinks[2], { target: 'missing-page', status: 'unresolved' });
  assert.equal(markdownLinks.some((link) => link.target === 'https://example.test/source'), false);
});
