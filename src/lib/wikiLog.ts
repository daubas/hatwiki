const HEADING_PATTERN = /^## \[(\d{4}-\d{2}-\d{2})\]\s+([^|]+?)\s*\|\s*(.+)$/;
const PAGE_PREFIXES = ['concepts/', 'entities/', 'workflows/', 'facts/', 'comparisons/', 'prompts/', 'cases/'];
const PAGE_ID_PATTERN = /^[a-z0-9\-\/]+$/;

function extractPageId(title: string): string | undefined {
  const firstWord = title.split(/\s+/)[0] ?? '';
  if (!PAGE_PREFIXES.some((prefix) => firstWord.startsWith(prefix))) return undefined;
  if (!PAGE_ID_PATTERN.test(firstWord)) return undefined;
  return firstWord;
}

export function parseWikiLog(
  markdown: string,
  limit = 5,
): Array<{ date: string; action: string; title: string; body: string; pageId?: string }> {
  const entries: Array<{ date: string; action: string; title: string; body: string; pageId?: string }> = [];
  const lines = markdown.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const match = HEADING_PATTERN.exec(lines[index]);
    if (!match) continue;

    const [, date, action, title] = match;
    const trimmedTitle = title.trim();

    let body = '';
    for (let bodyIndex = index + 1; bodyIndex < lines.length; bodyIndex += 1) {
      if (lines[bodyIndex].startsWith('## ')) break;
      if (body === '' && lines[bodyIndex].trim()) {
        body = lines[bodyIndex].trim().slice(0, 120);
      }
    }

    const pageId = extractPageId(trimmedTitle);
    entries.push({
      date,
      action: action.trim(),
      title: trimmedTitle,
      body,
      ...(pageId ? { pageId } : {}),
    });

    if (entries.length >= limit) break;
  }

  return entries;
}
