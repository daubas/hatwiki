import type { LinkResolution, PageRead, PublicPage, PublicProjection } from './contracts.ts';

function resolveLink(target: string, pages: PublicPage[]): LinkResolution {
  const exact = pages.find((page) => page.pageId === target);
  if (exact) return { target, status: 'resolved', pageId: exact.pageId };
  if (target.includes('/')) return { target, status: 'unresolved' };

  const candidates = pages.filter((page) => page.pageId.split('/').at(-1) === target);
  if (candidates.length === 1) return { target, status: 'resolved', pageId: candidates[0].pageId };
  if (candidates.length > 1) return { target, status: 'ambiguous', candidates: candidates.map((page) => page.pageId) };
  return { target, status: 'unresolved' };
}

function normalizeMarkdownTarget(target: string): string | null {
  const path = target.split(/[?#]/, 1)[0];
  if (!path || /^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith('//')) return null;
  if (path.split('/').includes('..')) return null;
  return path.replace(/^\/+/, '').replace(/\.md$/i, '');
}

function linksFor(page: PublicPage, pages: PublicPage[]): LinkResolution[] {
  return [...page.markdown.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]|(?<!!)\[[^\]]*\]\(([^)\s]+)\)/g)]
    .map((match) => match[1]?.trim() ?? normalizeMarkdownTarget(match[2] ?? ''))
    .filter((target): target is string => target !== null)
    .map((target) => resolveLink(target, pages));
}

export function createPublicWiki(projection: PublicProjection) {
  return {
    async searchWiki(query: string): Promise<PublicPage[]> {
      const needle = query.trim().toLowerCase();
      if (!needle) return [];

      const snapshot = await projection.readSnapshot();
      return snapshot.pages.filter((page) => `${page.title}\n${page.markdown}`.toLowerCase().includes(needle));
    },

    async readPage(pageId: string): Promise<PageRead | null> {
      const snapshot = await projection.readSnapshot();
      const page = snapshot.pages.find((candidate) => candidate.pageId === pageId);
      if (!page) return null;

      const links = linksFor(page, snapshot.pages);
      // ponytail: scans the current snapshot; add a per-revision link index if public wikis grow large.
      const backlinks = snapshot.pages
        .filter((candidate) => candidate.pageId !== pageId)
        .filter((candidate) => linksFor(candidate, snapshot.pages).some((link) => link.pageId === pageId))
        .map((candidate) => candidate.pageId);

      return { ...page, revision: snapshot.revision, links, backlinks };
    },
  };
}
