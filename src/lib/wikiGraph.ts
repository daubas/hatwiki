import type { PublicSnapshot } from './contracts.ts';

export type WikiGraphNode = {
  id: string;
  title: string;
  backlinks: number;
  connections: number;
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
  const pages = snapshot.pages.map(({ pageId, title }) => ({ id: pageId, title }));
  const pageIds = new Set(pages.map((node) => node.id));
  const basenameMap = new Map<string, string[]>();
  for (const node of pages) {
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

  const backlinks = new Map(pages.map(({ id }) => [id, 0]));
  const neighbors = new Map(pages.map(({ id }) => [id, new Set<string>()]));
  for (const edge of edges) {
    backlinks.set(edge.target, (backlinks.get(edge.target) || 0) + 1);
    neighbors.get(edge.source)?.add(edge.target);
    neighbors.get(edge.target)?.add(edge.source);
  }
  const nodes = pages.map((node) => ({
    ...node,
    backlinks: backlinks.get(node.id) || 0,
    connections: neighbors.get(node.id)?.size || 0,
  }));

  return { revision: snapshot.revision, nodes, edges };
}
