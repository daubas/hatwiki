import assert from 'node:assert/strict';
import test from 'node:test';

import { registerBrowserReadTools } from '../src/lib/browserWebMcp.ts';

test('registers browser-native read tools that reuse the public HTTP API', async () => {
  const registered: Array<{ tool: any; signal?: AbortSignal }> = [];
  const requests: string[] = [];
  const modelContext = {
    registerTool: async (tool: any, options?: { signal?: AbortSignal }) => registered.push({ tool, signal: options?.signal }),
  };
  const fetchJson = async (url: string) => {
    requests.push(url);
    return { ok: true, json: async () => ({ url }) } as Response;
  };

  const registration = await registerBrowserReadTools(modelContext, fetchJson);

  assert.equal(registration.supported, true);
  assert.deepEqual(registered.map(({ tool }) => tool.name), ['search_wiki', 'read_page']);
  assert.ok(registered.every(({ signal }) => signal && !signal.aborted));
  for (const { tool } of registered) {
    assert.deepEqual(tool.annotations, {
      readOnlyHint: true,
      untrustedContentHint: true,
    });
  }
  assert.deepEqual(await registered[0].tool.execute({ query: 'shared memory' }), { url: '/api/search?q=shared+memory' });
  assert.deepEqual(await registered[1].tool.execute({ pageId: 'concepts/hatwiki' }), { url: '/api/pages/concepts/hatwiki' });
  assert.deepEqual(requests, ['/api/search?q=shared+memory', '/api/pages/concepts/hatwiki']);

  registration.dispose();
  assert.ok(registered.every(({ signal }) => signal?.aborted));
});

test('registers edit_page as an authorization-gated write through the session API', async () => {
  const registered: any[] = [];
  const requests: Array<{ url: string; init?: RequestInit }> = [];
  const modelContext = { registerTool: async (tool: any) => registered.push(tool) };
  const fetchJson = async (url: string, init?: RequestInit) => {
    requests.push({ url, init });
    return { ok: true, json: async () => ({ status: 'committed' }) } as Response;
  };

  await registerBrowserReadTools(modelContext, fetchJson, 'authenticated');
  const tool = registered.find(({ name }) => name === 'edit_page');
  const input = {
    requestId: 'request-1',
    pageId: 'concepts/hatwiki',
    baseSha: 'blob-1',
    content: '# Updated',
    reason: 'Clarify',
    authorizationConfirmed: true,
  };

  assert.equal(tool.annotations.readOnlyHint, false);
  assert.match(tool.description, /GitHub/);
  assert.deepEqual(await tool.execute(input), { status: 'committed' });
  assert.deepEqual(requests, [{
    url: '/api/edit',
    init: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) },
  }]);
});

test('authenticated read_page includes the canonical markdown and blob sha needed by edit_page', async () => {
  const registered: any[] = [];
  const modelContext = { registerTool: async (tool: any) => registered.push(tool) };
  const fetchJson = async (url: string) => ({
    ok: true,
    json: async () => url.startsWith('/api/edit-source/')
      ? { pageId: 'concepts/example', baseSha: 'blob-1', content: '# Canonical' }
      : { pageId: 'concepts/example', title: 'Example', markdown: '# Public' },
  }) as Response;

  await registerBrowserReadTools(modelContext, fetchJson, 'authenticated');

  assert.deepEqual(await registered.find(({ name }) => name === 'read_page').execute({ pageId: 'concepts/example' }), {
    pageId: 'concepts/example',
    title: 'Example',
    markdown: '# Public',
    sourceMarkdown: '# Canonical',
    baseSha: 'blob-1',
  });
});

test('registers the Gate B source tools only for authenticated sessions', async () => {
  const registered: any[] = [];
  const requests: Array<{ url: string; init?: RequestInit }> = [];
  const modelContext = { registerTool: async (tool: any) => registered.push(tool) };
  const fetchJson = async (url: string, init?: RequestInit) => {
    requests.push({ url, init });
    return { ok: true, json: async () => ({ url }) } as Response;
  };

  await registerBrowserReadTools(modelContext, fetchJson, 'authenticated');
  assert.deepEqual(registered.map(({ name }) => name), ['search_wiki', 'read_page', 'edit_page', 'add_source', 'get_ingestion_status', 'inspect_changes']);
  assert.equal(registered[2].inputSchema.properties.sourceTaskId.type, 'string');
  const addInput = { requestId: 'source-1', title: 'Note', content: 'Body', targetPageId: 'concepts/hatwiki', authorizationConfirmed: true };
  assert.deepEqual(await registered[3].execute(addInput), { url: '/api/sources' });
  assert.deepEqual(await registered[4].execute({ taskId: 'task-1' }), { url: '/api/ingestions/task-1' });
  assert.deepEqual(await registered[5].execute({ pageId: 'concepts/hatwiki', content: '[[concepts/shared]]' }), {
    affectedPages: ['concepts/hatwiki'], citations: [], wikiLinks: ['concepts/shared'], unresolved: [],
  });
  assert.equal(registered[3].annotations.readOnlyHint, false);
  assert.equal(registered[4].annotations.untrustedContentHint, true);
  assert.deepEqual(requests.slice(-2), [
    { url: '/api/sources', init: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(addInput) } },
    { url: '/api/ingestions/task-1', init: undefined },
  ]);
});

test('does nothing in browsers without WebMCP', async () => {
  const registration = await registerBrowserReadTools(undefined, fetch);
  assert.equal(registration.supported, false);
  registration.dispose();
});
