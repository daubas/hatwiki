import { normalizeMarkdownTarget, resolveLink } from './wikiLinks.ts';
import { isDraftStatus, type PublicPage, type PublicSnapshot } from './contracts.ts';

export type WikiGraphNode = {
  id: string;
  title: string;
  group: string;
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

export type WikiGraphOptions = { includeDrafts?: boolean; includeSources?: boolean };

function isVisiblePage(page: PublicPage, options: WikiGraphOptions): boolean {
  const status = page.status?.trim().toLowerCase();
  const segments = page.pageId.split('/');
  if (status === 'archived' || status === 'deprecated') return false;
  if (!options.includeDrafts && isDraftStatus(page.status)) return false;
  if (['catalog', 'index'].includes(segments.at(-1) || '')) return false;
  return !!options.includeSources || !['sources', 'research'].includes(segments[0]);
}

export function buildWikiGraph(snapshot: PublicSnapshot, options: WikiGraphOptions = {}): WikiGraph {
  return graphForPages(snapshot, snapshot.pages.filter((page) => isVisiblePage(page, options)));
}

function graphForPages(snapshot: PublicSnapshot, visiblePages: PublicPage[]): WikiGraph {
  const pages = visiblePages.map(({ pageId, title }) => ({ id: pageId, title }));
  const pageIds = new Set(pages.map((node) => node.id));

  const edgeKeys = new Set<string>();
  const edges: WikiGraphEdge[] = [];

  for (const page of visiblePages) {
    for (const match of page.markdown.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]|(?<!!)\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const target = match[1]?.trim() || normalizeMarkdownTarget(match[2] || '', page.pageId);
      if (!target) continue;
      const resolution = resolveLink(target, snapshot.pages);
      const resolved = resolution.status === 'resolved' ? resolution.pageId : undefined;
      const key = `${page.pageId}\u0000${resolved}`;
      if (resolved && pageIds.has(resolved) && !edgeKeys.has(key)) {
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
    group: node.id.includes('/') ? node.id.split('/')[0] : 'root',
    backlinks: backlinks.get(node.id) || 0,
    connections: neighbors.get(node.id)?.size || 0,
  }));

  return { revision: snapshot.revision, nodes, edges };
}

export function buildLocalWikiGraph(snapshot: PublicSnapshot, pageId: string): WikiGraph {
  const graph = graphForPages(snapshot, snapshot.pages.filter((page) => page.pageId === pageId || isVisiblePage(page, {})));
  const graphNodeIds = new Set(graph.nodes.map((node) => node.id));
  if (!graphNodeIds.has(pageId)) return { ...graph, nodes: [], edges: [] };

  const localNodeIds = new Set([pageId]);
  for (const edge of graph.edges) {
    if (edge.source === pageId || edge.target === pageId) {
      localNodeIds.add(edge.source);
      localNodeIds.add(edge.target);
    }
  }

  const edges = graph.edges.filter((edge) => localNodeIds.has(edge.source) && localNodeIds.has(edge.target));
  const backlinks = new Map<string, number>();
  const neighbors = new Map<string, Set<string>>();
  for (const nodeId of localNodeIds) {
    backlinks.set(nodeId, 0);
    neighbors.set(nodeId, new Set());
  }
  for (const edge of edges) {
    backlinks.set(edge.target, (backlinks.get(edge.target) || 0) + 1);
    neighbors.get(edge.source)?.add(edge.target);
    neighbors.get(edge.target)?.add(edge.source);
  }

  const nodes = graph.nodes
    .filter((node) => localNodeIds.has(node.id))
    .map((node) => ({
      ...node,
      backlinks: backlinks.get(node.id) || 0,
      connections: neighbors.get(node.id)?.size || 0,
    }));
  return { revision: graph.revision, nodes, edges };
}
