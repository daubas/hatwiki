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
  assert.deepEqual(registered.map(({ tool }) => tool.name), ['search_wiki', 'read_page', 'edit_page']);
  assert.ok(registered.every(({ signal }) => signal && !signal.aborted));
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

  await registerBrowserReadTools(modelContext, fetchJson);
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

test('does nothing in browsers without WebMCP', async () => {
  const registration = await registerBrowserReadTools(undefined, fetch);
  assert.equal(registration.supported, false);
  registration.dispose();
});
