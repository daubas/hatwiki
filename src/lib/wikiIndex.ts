import { isDraftStatus } from './contracts.ts';

export type WikiIndexItem = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  status?: string;
  staleAfter?: string;
  pendingCandidates?: number;
};

export function mergeWikiIndexPages(
  pages: Array<{ pageId: string; title: string; status?: string; staleAfter?: string; pendingCandidates?: number }>,
  metadata: WikiIndexItem[],
  options: { includeDrafts?: boolean } = {},
): WikiIndexItem[] {
  const byId = new Map(metadata.map((item) => [item.id, item]));
  return pages
    .filter((page) => options.includeDrafts || !isDraftStatus(page.status))
    .map((page) => ({
      ...byId.get(page.pageId), id: page.pageId, title: page.title,
      ...(page.status ? { status: page.status } : {}),
      ...(page.staleAfter ? { staleAfter: page.staleAfter } : {}),
      ...(page.pendingCandidates !== undefined ? { pendingCandidates: page.pendingCandidates } : {}),
    }));
}

function normalizeSearchText(value: string): string {
  return value.normalize('NFKC').toLowerCase().trim().replace(/\s+/g, ' ');
}

export function filterWikiIndex(items: WikiIndexItem[], query: string): WikiIndexItem[] {
  const needle = normalizeSearchText(query);
  if (!needle) return items;

  return items.filter((item) => [item.id, item.title, item.description ?? '', ...(item.tags ?? [])]
    .map(normalizeSearchText)
    .some((value) => value.includes(needle)));
}
