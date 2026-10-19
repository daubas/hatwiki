import type { WikiIndexItem } from './wikiIndex.ts';

function groupKeyOf(id: string): string {
  const slashIndex = id.indexOf('/');
  return slashIndex === -1 ? 'root' : id.slice(0, slashIndex);
}

function sortByTitle(items: WikiIndexItem[]): WikiIndexItem[] {
  return [...items].sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));
}

export function groupWikiIndexByType(
  items: WikiIndexItem[],
  order: string[],
): Array<{ group: string; items: WikiIndexItem[] }> {
  const buckets = new Map<string, WikiIndexItem[]>();
  for (const item of items) {
    const group = groupKeyOf(item.id);
    const bucket = buckets.get(group);
    if (bucket) bucket.push(item);
    else buckets.set(group, [item]);
  }

  const result: Array<{ group: string; items: WikiIndexItem[] }> = [];
  for (const group of order) {
    const bucket = buckets.get(group);
    if (!bucket) continue;
    result.push({ group, items: sortByTitle(bucket) });
    buckets.delete(group);
  }

  const remaining = [...buckets.keys()].sort((a, b) => a.localeCompare(b, 'zh-Hant'));
  for (const group of remaining) {
    result.push({ group, items: sortByTitle(buckets.get(group)!) });
  }

  return result;
}
