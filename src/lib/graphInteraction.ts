export type SearchableGraphNode = {
  id: string;
  title: string;
};

export type GraphInteractionEdge = {
  source: string;
  target: string;
};

export function matchingGraphNodeIds(nodes: readonly SearchableGraphNode[], query: string): string[] {
  const term = query.trim().toLowerCase();
  return nodes
    .filter((node) => !term || `${node.id} ${node.title}`.toLowerCase().includes(term))
    .map((node) => node.id);
}

export function focusedGraphNodeIds(edges: readonly GraphInteractionEdge[], selectedId: string): Set<string> {
  const focused = new Set([selectedId]);
  for (const edge of edges) {
    if (edge.source === selectedId) focused.add(edge.target);
    if (edge.target === selectedId) focused.add(edge.source);
  }
  return focused;
}

export function graphKeyboardAction(key: string): 'select' | 'clear' | undefined {
  if (key === 'Enter' || key === ' ') return 'select';
  if (key === 'Escape') return 'clear';
  return undefined;
}

export function observeResize(target: Pick<EventTarget, 'addEventListener' | 'removeEventListener'>, listener: () => void): () => void {
  target.addEventListener('resize', listener);
  return () => target.removeEventListener('resize', listener);
}
