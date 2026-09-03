import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createWebMcpTools } from '../src/lib/webmcpTools.ts';

test('anonymous sessions expose only the public read tools', () => {
  const tools = createWebMcpTools({
    searchWiki: async () => [],
    readPage: async () => null,
  }, 'anonymous');

  assert.deepEqual(tools.map(tool => tool.name), ['read_page', 'search_wiki']);
});

test('read tools are read-only and mark wiki text as untrusted', () => {
  const handlers = { searchWiki: async () => [], readPage: async () => null };

  for (const session of ['anonymous', 'authenticated'] as const) {
    const tools = createWebMcpTools(handlers, session);

    assert.deepEqual(tools.map(tool => tool.name), ['read_page', 'search_wiki']);
    for (const tool of tools) {
      assert.equal(typeof tool.description, 'string');
      assert.ok(tool.description.length > 0);
      assert.deepEqual(tool.annotations, {
        readOnlyHint: true,
        untrustedContentHint: true,
      });
    }
  }
});

test('read tool handlers delegate and return structured content', async () => {
  const calls: Array<string> = [];
  const page = {
    pageId: 'topics/agents',
    title: 'Agents',
    markdown: 'Shared memory.',
    revision: 'r1',
    links: [],
    backlinks: [],
  };
  const tools = createWebMcpTools({
    searchWiki: async (query: string) => {
      calls.push(`search:${query}`);
      return [page];
    },
    readPage: async (pageId: string) => {
      calls.push(`read:${pageId}`);
      return page;
    },
  });

  const search = tools.find(tool => tool.name === 'search_wiki');
  const read = tools.find(tool => tool.name === 'read_page');
  assert.ok(search && read);

  const searchResult = await search.execute({ query: 'agents' });
  const readResult = await read.execute({ pageId: page.pageId });

  assert.deepEqual(searchResult.structuredContent, [page]);
  assert.deepEqual(readResult.structuredContent, page);
  assert.deepEqual(calls, ['search:agents', 'read:topics/agents']);
});

test('read_page reports a missing page as a structured error', async () => {
  const tools = createWebMcpTools({
    searchWiki: async () => [],
    readPage: async () => null,
  });
  const read = tools.find(tool => tool.name === 'read_page');
  assert.ok(read);

  const result = await read.execute({ pageId: 'missing/page' });

  assert.equal(result.isError, true);
  assert.deepEqual(result.structuredContent, {
    error: 'not_found',
    pageId: 'missing/page',
  });
});

test('read_page rejects an invalid page ID without calling the reader', async () => {
  let calls = 0;
  const tools = createWebMcpTools({
    searchWiki: async () => [],
    readPage: async () => {
      calls += 1;
      return null;
    },
  });
  const read = tools.find(tool => tool.name === 'read_page');
  assert.ok(read);

  const result = await read.execute({ pageId: '' });

  assert.equal(result.isError, true);
  assert.deepEqual(result.structuredContent, {
    error: 'invalid_input',
    field: 'pageId',
  });
  assert.equal(calls, 0);
});

test('search_wiki rejects a non-string query without calling the searcher', async () => {
  let calls = 0;
  const tools = createWebMcpTools({
    searchWiki: async () => {
      calls += 1;
      return [];
    },
    readPage: async () => null,
  });
  const search = tools.find(tool => tool.name === 'search_wiki');
  assert.ok(search);

  const result = await search.execute({ query: 42 });

  assert.equal(result.isError, true);
  assert.deepEqual(result.structuredContent, {
    error: 'invalid_input',
    field: 'query',
  });
  assert.equal(calls, 0);
});
