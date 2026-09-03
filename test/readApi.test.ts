import assert from 'node:assert/strict';
import test from 'node:test';
import { createReadApi } from '../src/lib/readApi.ts';

test('search rejects an empty q query without calling PublicWiki', async () => {
  let searches = 0;
  const api = createReadApi({
    searchWiki: async () => {
      searches += 1;
      return [];
    },
    readPage: async () => null,
  });

  const response = await api.search('https://hatwiki.test/search?q=%20');

  assert.equal(response.status, 400);
  assert.equal(response.headers.get('content-type'), 'application/json');
  assert.deepEqual(await response.json(), { error: 'missing_query' });
  assert.equal(searches, 0);
});

test('search delegates q and returns only PublicWiki JSON without caching', async () => {
  const results = [{ pageId: 'guides/overview', title: 'Overview', markdown: 'Public text.' }];
  const queries: string[] = [];
  const api = createReadApi({
    searchWiki: async (query) => {
      queries.push(query);
      return results;
    },
    readPage: async () => null,
  });

  const response = await api.search('https://hatwiki.test/search?q=public+text');

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), results);
  assert.deepEqual(queries, ['public text']);
});

test('read returns a JSON 404 when PublicWiki has no canonical page', async () => {
  const pageIds: string[] = [];
  const api = createReadApi({
    searchWiki: async () => [],
    readPage: async (pageId) => {
      pageIds.push(pageId);
      return null;
    },
  });

  const response = await api.read('guides/missing');

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('content-type'), 'application/json');
  assert.deepEqual(await response.json(), { error: 'not_found', pageId: 'guides/missing' });
  assert.deepEqual(pageIds, ['guides/missing']);
});

test('read returns only the canonical PublicWiki page without caching', async () => {
  const page = {
    pageId: 'guides/overview',
    title: 'Overview',
    markdown: 'Public text.',
    revision: 'r-17',
    links: [],
    backlinks: [],
  };
  const pageIds: string[] = [];
  const api = createReadApi({
    searchWiki: async () => [],
    readPage: async (pageId) => {
      pageIds.push(pageId);
      return page;
    },
  });

  const response = await api.read(page.pageId);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), page);
  assert.deepEqual(pageIds, [page.pageId]);
});
