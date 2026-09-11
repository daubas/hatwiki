import type { PageRead, PublicSearchResult } from './contracts.ts';

type PublicWiki = {
  searchWiki(query: string): Promise<PublicSearchResult[]>;
  readPage(pageId: string, variantId?: string): Promise<PageRead | null>;
};

export function createReadApi(wiki: PublicWiki) {
  return {
    async search(requestUrl: string | URL): Promise<Response> {
      const query = new URL(requestUrl).searchParams.get('q')?.trim();
      if (!query) return Response.json({ error: 'missing_query' }, { status: 400 });
      return Response.json(await wiki.searchWiki(query), { headers: { 'Cache-Control': 'no-store' } });
    },

    async read(pageId: string, requestUrl?: string | URL): Promise<Response> {
      let variantId: string | undefined;
      if (requestUrl !== undefined) {
        if (requestUrl instanceof URL) variantId = requestUrl.searchParams.get('variant') ?? undefined;
        else {
          try {
            variantId = new URL(requestUrl).searchParams.get('variant') ?? undefined;
          } catch {
            // Backward-compatible direct call seam: a bare second string is a variant ID.
            variantId = requestUrl.trim() || undefined;
          }
        }
      }
      const page = await wiki.readPage(pageId, variantId);
      if (!page) return Response.json({ error: 'not_found', pageId }, { status: 404 });
      return Response.json(page, { headers: { 'Cache-Control': 'no-store' } });
    },
  };
}
