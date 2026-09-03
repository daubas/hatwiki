import type { PublicSnapshot } from './contracts.ts';

export type WikiGraphNode = {
  id: string;
  title: string;
};

export type WikiGraphEdge = {
  source: string;
  target: string;
};

export type WikiGraph = {
  revision: string;
  nodes: WikiGraphNode[];
  edges: WikiGraphEdge[];
};

function normalizeMarkdownTarget(target: string): string | undefined {
  const path = target.split(/[?#]/, 1)[0];
  if (!path || /^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith('//')) return undefined;
  if (path.split('/').includes('..')) return undefined;
  return path.replace(/^\/+/, '').replace(/\.md$/i, '');
}

export function buildWikiGraph(snapshot: PublicSnapshot): WikiGraph {
  const nodes = snapshot.pages.map(({ pageId, title }) => ({ id: pageId, title }));
  const pageIds = new Set(nodes.map((node) => node.id));
  const basenameMap = new Map<string, string[]>();
  for (const node of nodes) {
    const basename = node.id.split('/').at(-1) || node.id;
    const candidates = basenameMap.get(basename) || [];
    candidates.push(node.id);
    basenameMap.set(basename, candidates);
  }

  const resolveTarget = (target: string): string | undefined => {
    if (pageIds.has(target)) return target;
    if (target.includes('/')) return undefined;
    const candidates = basenameMap.get(target) || [];
    return candidates.length === 1 ? candidates[0] : undefined;
  };

  const edgeKeys = new Set<string>();
  const edges: WikiGraphEdge[] = [];

  for (const page of snapshot.pages) {
    for (const match of page.markdown.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]|(?<!!)\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const target = match[1]?.trim() || normalizeMarkdownTarget(match[2] || '');
      if (!target) continue;
      const resolved = resolveTarget(target);
      const key = `${page.pageId}\u0000${resolved}`;
      if (resolved && !edgeKeys.has(key)) {
        edgeKeys.add(key);
        edges.push({ source: page.pageId, target: resolved });
      }
    }
  }

  return { revision: snapshot.revision, nodes, edges };
}
