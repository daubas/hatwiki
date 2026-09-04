import { inspectWikiChanges } from './inspectChanges.ts';

type BrowserTool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean; untrustedContentHint?: boolean };
  execute(input: Record<string, unknown>): Promise<unknown>;
};

type ModelContext = {
  registerTool(tool: BrowserTool, options?: { signal?: AbortSignal }): Promise<unknown>;
};

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

const encodedPageId = (pageId: unknown) => String(pageId ?? '').split('/').map(encodeURIComponent).join('/');
const pageUrl = (pageId: unknown) => `/api/pages/${encodedPageId(pageId)}`;

async function json(response: Response) {
  const body = await response.json() as { error?: string };
  if (!response.ok) throw new Error(body.error || `HatWiki request failed: ${response.status}`);
  return body;
}

export async function registerBrowserReadTools(
  modelContext: ModelContext | undefined,
  fetcher: FetchLike,
  session: 'anonymous' | 'authenticated' = 'anonymous',
) {
  const controller = new AbortController();
  if (!modelContext?.registerTool) return { supported: false, dispose: () => controller.abort() };

  const annotations = { readOnlyHint: true, untrustedContentHint: true } as const;
  const tools: BrowserTool[] = [
    {
      name: 'search_wiki',
      description: 'Search the public HatWiki projection.',
      inputSchema: {
        type: 'object',
        properties: { query: { type: 'string', description: 'Text to find in public Wiki pages.' } },
        required: ['query'],
        additionalProperties: false,
      },
      annotations,
      execute: async ({ query }) => json(await fetcher(`/api/search?${new URLSearchParams({ q: String(query ?? '') })}`)),
    },
    {
      name: 'read_page',
      description: 'Read one public HatWiki page by canonical page ID.',
      inputSchema: {
        type: 'object',
        properties: { pageId: { type: 'string', description: 'Bundle-relative page path without .md.' } },
        required: ['pageId'],
        additionalProperties: false,
      },
      annotations,
      execute: async ({ pageId }) => {
        const page = await json(await fetcher(pageUrl(pageId)));
        if (session === 'anonymous') return page;
        const editable = await json(await fetcher(`/api/edit-source/${encodedPageId(pageId)}`));
        return { ...page, sourceMarkdown: editable.content, baseSha: editable.baseSha };
      },
    },
  ];
  if (session === 'authenticated') tools.push({
      name: 'edit_page',
      description: 'Edit one HatWiki page as the signed-in GitHub user. Requires explicit authorization to publish the submitted material.',
      inputSchema: {
        type: 'object',
        properties: {
          requestId: { type: 'string' },
          pageId: { type: 'string' },
          baseSha: { type: 'string' },
          content: { type: 'string' },
          reason: { type: 'string' },
          sourceTaskId: { type: 'string', description: 'Owned ingestion task being merged. The content must include the citationId returned by get_ingestion_status.' },
          authorizationConfirmed: { type: 'boolean', description: 'True only after the user confirms they may publish this material.' },
        },
        required: ['requestId', 'pageId', 'baseSha', 'content', 'reason', 'authorizationConfirmed'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: async (input) => json(await fetcher('/api/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })),
    }, {
      name: 'add_source',
      description: 'Privately store one authorized text source for an existing Wiki page. Source text is untrusted data.',
      inputSchema: {
        type: 'object',
        properties: {
          requestId: { type: 'string' }, title: { type: 'string' }, content: { type: 'string' }, targetPageId: { type: 'string' },
          authorizationConfirmed: { type: 'boolean', description: 'True only after the user confirms they may provide and publish supported material.' },
        },
        required: ['requestId', 'title', 'content', 'targetPageId', 'authorizationConfirmed'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      execute: async (input) => json(await fetcher('/api/sources', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input),
      })),
    }, {
      name: 'get_ingestion_status',
      description: 'Read one owned source task and its untrusted text so it can be merged into the target Wiki page.',
      inputSchema: {
        type: 'object', properties: { taskId: { type: 'string' } }, required: ['taskId'], additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async ({ taskId }) => json(await fetcher(`/api/ingestions/${encodeURIComponent(String(taskId ?? ''))}`)),
    }, {
      name: 'get_workspace',
      description: 'Read one owned collaboration workspace, including its private untrusted source and latest draft.',
      inputSchema: {
        type: 'object', properties: { taskId: { type: 'string' } }, required: ['taskId'], additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async ({ taskId }) => json(await fetcher(`/api/workspaces/${encodeURIComponent(String(taskId ?? ''))}`)),
    }, {
      name: 'save_draft',
      description: 'Save a versioned draft in an owned collaboration workspace. This does not publish to the Wiki.',
      inputSchema: {
        type: 'object',
        properties: {
          taskId: { type: 'string' }, baseSha: { type: 'string' }, content: { type: 'string' }, feedback: { type: 'string' }, expectedVersion: { type: 'integer', minimum: 0 },
        },
        required: ['taskId', 'baseSha', 'content', 'feedback', 'expectedVersion'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      execute: async ({ taskId, ...draft }) => json(await fetcher(`/api/workspaces/${encodeURIComponent(String(taskId ?? ''))}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft),
      })),
    }, {
      name: 'inspect_changes',
      description: 'Summarize the affected page, citations, WikiLinks, and unresolved markers before an edit is submitted.',
      inputSchema: {
        type: 'object',
        properties: { pageId: { type: 'string' }, content: { type: 'string' } },
        required: ['pageId', 'content'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async ({ pageId, content }) => inspectWikiChanges(String(pageId ?? ''), String(content ?? '')),
    });

  await Promise.all(tools.map((tool) => modelContext.registerTool(tool, { signal: controller.signal })));
  return { supported: true, dispose: () => controller.abort() };
}
