export type WikiIndexItem = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
};

export function mergeWikiIndexPages(
  pages: Array<{ pageId: string; title: string }>,
  metadata: WikiIndexItem[],
): WikiIndexItem[] {
  const byId = new Map(metadata.map((item) => [item.id, item]));
  return pages.map((page) => ({ ...byId.get(page.pageId), id: page.pageId, title: page.title }));
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
