import type { LinkResolution, PublicPage } from './contracts.ts';

export function resolveLink(target: string, pages: ReadonlyArray<Pick<PublicPage, 'pageId'>>): LinkResolution {
  const exact = pages.find((page) => page.pageId === target);
  if (exact) return { target, status: 'resolved', pageId: exact.pageId };
  if (target.includes('/')) return { target, status: 'unresolved' };

  const candidates = pages.filter((page) => page.pageId.split('/').at(-1) === target);
  if (candidates.length === 1) return { target, status: 'resolved', pageId: candidates[0].pageId };
  if (candidates.length > 1) return { target, status: 'ambiguous', candidates: candidates.map((page) => page.pageId) };
  return { target, status: 'unresolved' };
}

export function normalizeMarkdownTarget(target: string, pageId: string): string | null {
  const path = target.split(/[?#]/, 1)[0];
  if (!path || /^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith('//')) return null;
  const segments = path.startsWith('/') ? [] : pageId.split('/').slice(0, -1);
  for (const segment of path.replace(/^\/+/, '').split('/')) {
    if (!segment || segment === '.') continue;
    if (segment === '..') {
      if (!segments.pop()) return null;
    } else {
      segments.push(segment);
    }
  }
  const normalized = segments.join('/').replace(/\.md$/i, '');
  if (normalized === 'raw' || normalized.startsWith('raw/') || normalized === 'extracted' || normalized.startsWith('extracted/')) return null;
  return normalized;
}

