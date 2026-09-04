export type WikiChangeSummary = {
  affectedPages: string[];
  citations: string[];
  wikiLinks: string[];
  unresolved: string[];
};

const unique = (values: Iterable<string>) => [...new Set(values)];
const pageId = (value: string) => value.trim().replace(/^\/wiki\//, '').replace(/^\//, '').replace(/\.md$/i, '');

export function inspectWikiChanges(affectedPage: string, markdown: string): WikiChangeSummary {
  const citations = unique(markdown.matchAll(/\[\^([^\]]+)\]/g).map((match) => match[1]));
  const wikiLinks = unique([
    ...markdown.matchAll(/\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g).map((match) => pageId(match[1])),
    ...markdown.matchAll(/\[[^\]]+\]\((\/?(?!https?:|mailto:|#)[^)]+)\)/gi).map((match) => pageId(match[1])),
  ].filter((target) => target && !target.startsWith('../') && !target.startsWith('raw/') && !target.startsWith('sources/')));
  const unresolved = unique(markdown.split(/\r?\n/)
    .filter((line) => /\bTODO\b|\bunresolved\b|待確認|未解/i.test(line))
    .map((line) => line.trim().replace(/^[-*]\s*/, '')));
  return { affectedPages: [affectedPage], citations, wikiLinks, unresolved };
}
