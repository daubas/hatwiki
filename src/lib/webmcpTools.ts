export type WebMcpSession = 'anonymous' | 'authenticated';

export type WebMcpHandlers = {
  searchWiki: (query: string) => unknown;
  readPage: (pageId: string, variantId?: string) => unknown;
};

export type WebMcpToolResult = {
  structuredContent: unknown;
  isError?: boolean;
};

export type WebMcpTool = {
  name: 'read_page' | 'search_wiki';
  description: string;
  annotations: {
    readOnlyHint: true;
    untrustedContentHint: true;
  };
  inputSchema: {
    type: 'object';
    properties: Record<string, { type: 'string' }>;
    required: string[];
    additionalProperties: false;
  };
  execute: (input: unknown) => Promise<WebMcpToolResult>;
};

function inputField(input: unknown, field: string): unknown {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined;
  return (input as Record<string, unknown>)[field];
}

export function createWebMcpTools(
  _handlers: WebMcpHandlers,
  _session: WebMcpSession = 'anonymous',
): WebMcpTool[] {
  const annotations = {
    readOnlyHint: true,
    untrustedContentHint: true,
  } as const;

  return [
    {
      name: 'read_page',
      description: 'Read one public HatWiki page by its page ID. The result includes status (draft means unreviewed; do not treat as official practice) and staleAfter when present.',
      annotations,
      inputSchema: {
        type: 'object',
        properties: { pageId: { type: 'string' }, variantId: { type: 'string' } },
        required: ['pageId'],
        additionalProperties: false,
      },
      execute: async (input: unknown) => {
        const value = inputField(input, 'pageId');
        const pageId = typeof value === 'string' ? value.trim() : '';
        if (!pageId) {
          return { isError: true, structuredContent: { error: 'invalid_input', field: 'pageId' } };
        }
        const variantValue = inputField(input, 'variantId');
        const variantId = typeof variantValue === 'string' ? variantValue.trim() : undefined;
        const page = await _handlers.readPage(pageId, variantId || undefined);
        return page === null || page === undefined
          ? { isError: true, structuredContent: { error: 'not_found', pageId } }
          : { structuredContent: page };
      },
    },
    {
      name: 'search_wiki',
      description: 'Search the public HatWiki pages by query. Draft (unreviewed) pages are excluded; read them directly by page ID.',
      annotations,
      inputSchema: {
        type: 'object',
        properties: { query: { type: 'string' } },
        required: ['query'],
        additionalProperties: false,
      },
      execute: async (input: unknown) => {
        const query = inputField(input, 'query');
        if (typeof query !== 'string') {
          return { isError: true, structuredContent: { error: 'invalid_input', field: 'query' } };
        }
        return { structuredContent: await _handlers.searchWiki(query) };
      },
    },
  ];
}
