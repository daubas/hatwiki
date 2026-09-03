import type { PublicProjection } from './contracts.ts';

export type CollectionEntry = {
  id: string;
  body?: string;
  data: {
    title?: string;
    sources?: unknown;
    pendingCandidates?: unknown;
    visibility?: unknown;
  };
};

function pageIdFor(id: string): string {
  return id.replaceAll('\\', '/').replace(/^\/+/, '').replace(/\.md$/i, '');
}

function isPublicEntry(pageId: string, visibility: unknown): boolean {
  const parts = pageId.split('/');
  const lowerParts = parts.map((part) => part.toLowerCase());
  const leaf = lowerParts[lowerParts.length - 1];

  return pageId.length > 0
    && !lowerParts.some((part) => part.startsWith('_'))
    && lowerParts[0] !== 'raw'
    && lowerParts[0] !== 'extracted'
    && leaf !== 'schema'
    && leaf !== 'log'
    && String(visibility || '').trim().toLowerCase() !== 'private';
}

function publicCitations(sources: unknown): Array<{ id: string; resource: string; title?: string }> | undefined {
  if (!Array.isArray(sources)) return undefined;

  const citations = sources.flatMap((source) => {
    if (!source || typeof source !== 'object' || Array.isArray(source)) return [];
    const record = source as Record<string, unknown>;
    const id = typeof record.id === 'string' ? record.id.trim() : '';
    const resource = typeof record.resource === 'string' ? record.resource.trim() : '';
    if (!id || !resource) return [];

    const citation: { id: string; resource: string; title?: string } = { id, resource };
    if (typeof record.title === 'string' && record.title.trim()) citation.title = record.title.trim();
    return [citation];
  });

  return citations.length > 0 ? citations : undefined;
}

export function createCollectionProjection(
  revision: string,
  entries: CollectionEntry[],
): PublicProjection {
  const pages = entries
    .map((entry) => ({ entry, pageId: pageIdFor(entry.id) }))
    .filter(({ entry, pageId }) => isPublicEntry(pageId, entry.data.visibility))
    .map(({ entry, pageId }) => {
      const citations = publicCitations(entry.data.sources);
      const pendingCandidates = typeof entry.data.pendingCandidates === 'number'
        && Number.isFinite(entry.data.pendingCandidates)
        && entry.data.pendingCandidates >= 0
        ? entry.data.pendingCandidates
        : undefined;
      return {
        pageId,
        title: entry.data.title || pageId,
        markdown: entry.body || '',
        ...(citations ? { citations } : {}),
        ...(pendingCandidates !== undefined ? { pendingCandidates } : {}),
      };
    });

  return {
    async readSnapshot() {
      return { revision, pages };
    },
  };
}
