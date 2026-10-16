import type { LinkResolution, PageRead, PublicPage, PublicProjection, PublicSearchResult, PublicVariant, PublicVariantMetadata } from './contracts.ts';

const SEARCH_RESULT_LIMIT = 8;
const SEARCH_SNIPPET_LENGTH = 180;
const VARIANT_RESULT_LIMIT = 32;

function variantMetadata(variant: PublicVariant): PublicVariantMetadata {
  return {
    variantId: variant.variantId,
    revision: variant.revision,
    title: variant.title,
    ...(variant.description ? { description: variant.description } : {}),
    support: {
      views: variant.support.views,
      endorsements: variant.support.endorsements,
      disagreements: variant.support.disagreements,
    },
  };
}

function variantsForRead(variants: PublicVariant[] | undefined, selected?: PublicVariant): PublicVariantMetadata[] | undefined {
  if (!variants?.length) return undefined;
  const listed = variants.slice(0, VARIANT_RESULT_LIMIT);
  // ponytail: cap metadata to keep public reads bounded; add pagination when candidates outgrow this.
  return (selected && !listed.includes(selected) ? [...listed.slice(0, -1), selected] : listed).map(variantMetadata);
}

function resolveLink(target: string, pages: PublicPage[]): LinkResolution {
  const exact = pages.find((page) => page.pageId === target);
  if (exact) return { target, status: 'resolved', pageId: exact.pageId };
  if (target.includes('/')) return { target, status: 'unresolved' };

  const candidates = pages.filter((page) => page.pageId.split('/').at(-1) === target);
  if (candidates.length === 1) return { target, status: 'resolved', pageId: candidates[0].pageId };
  if (candidates.length > 1) return { target, status: 'ambiguous', candidates: candidates.map((page) => page.pageId) };
  return { target, status: 'unresolved' };
}

function normalizeMarkdownTarget(target: string, pageId: string): string | null {
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

interface DetailedLinkResolution extends LinkResolution {
  alias?: string;
  snippet?: string;
}

function extractLinkSnippet(markdown: string, matchIndex: number, matchLength: number): string {
  const before = markdown.slice(0, matchIndex);
  const after = markdown.slice(matchIndex + matchLength);

  const lastNewline = before.lastIndexOf('\n');
  const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
  const nextNewline = after.indexOf('\n');
  const lineEnd = nextNewline === -1 ? markdown.length : matchIndex + matchLength + nextNewline;

  let raw = markdown.slice(lineStart, lineEnd).trim();
  raw = raw.replace(/^([#>\-*|]|\d+\.)+\s+/, '').trim();
  raw = raw
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, alias) => alias || target.split('/').at(-1) || target)
    .replace(/(?<!!)\[([^\]]*)\]\([^)\s]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();

  if (raw.length <= 80) return raw;
  return '…' + raw.slice(0, 75).trim() + '…';
}

function detailedLinksFor(page: PublicPage, pages: PublicPage[]): DetailedLinkResolution[] {
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]|(?<!!)\[([^\]]*)\]\(([^)\s]+)\)/g;
  return [...page.markdown.matchAll(regex)].map((match) => {
    const isWiki = match[1] !== undefined;
    const rawTarget = isWiki ? match[1].trim() : normalizeMarkdownTarget(match[4] ?? '', page.pageId);
    if (!rawTarget) return null;
    const resolved = resolveLink(rawTarget, pages);
    const alias = isWiki ? match[2]?.trim() : (match[3]?.trim() || undefined);
    const snippet = extractLinkSnippet(page.markdown, match.index ?? 0, match[0].length);

    return {
      ...resolved,
      ...(alias ? { alias } : {}),
      ...(snippet ? { snippet } : {}),
    };
  }).filter((item): item is DetailedLinkResolution => item !== null);
}

function linksFor(page: PublicPage, pages: PublicPage[]): LinkResolution[] {
  return [...page.markdown.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]|(?<!!)\[[^\]]*\]\(([^)\s]+)\)/g)]
    .map((match) => match[1]?.trim() ?? normalizeMarkdownTarget(match[2] ?? '', page.pageId))
    .filter((target): target is string => target !== null)
    .map((target) => resolveLink(target, pages));
}

function searchSnippet(page: PublicPage, needle: string): string {
  const text = `${page.title}\n${page.markdown}`.replace(/\s+/g, ' ').trim();
  const match = text.toLowerCase().indexOf(needle);
  const start = Math.max(0, match < 0 ? 0 : match - 60);
  const excerpt = text.slice(start, start + SEARCH_SNIPPET_LENGTH).trim();
  return `${start > 0 ? '…' : ''}${excerpt}${start + excerpt.length < text.length ? '…' : ''}`;
}

export function createPublicWiki(projection: PublicProjection) {
  return {
    async searchWiki(query: string): Promise<PublicSearchResult[]> {
      const needle = query.trim().toLowerCase();
      if (!needle) return [];

      const snapshot = await projection.readSnapshot();
      // ponytail: fixed result cap keeps Agent context bounded; add ranking/indexing when the corpus outgrows this.
      return snapshot.pages
        .filter((page) => `${page.title}\n${page.markdown}`.toLowerCase().includes(needle))
        .slice(0, SEARCH_RESULT_LIMIT)
        .map((page) => ({
          pageId: page.pageId,
          title: page.title,
          snippet: searchSnippet(page, needle),
          ...(page.resource ? { resource: page.resource } : {}),
        }));
    },

    async readPage(pageId: string, variantId?: string): Promise<PageRead | null> {
      const snapshot = await projection.readSnapshot();
      const page = snapshot.pages.find((candidate) => candidate.pageId === pageId);
      if (!page) return null;
      const selectedVariant = variantId === undefined ? undefined : page.variants?.find((candidate) => candidate.variantId === variantId);
      if (variantId !== undefined && !selectedVariant) return null;
      const activePage = selectedVariant
        ? (() => {
          const next = { ...page, title: selectedVariant.title, markdown: selectedVariant.markdown };
          if (selectedVariant.description) next.description = selectedVariant.description;
          else delete next.description;
          // Variant metadata is independently projected; do not attribute the primary page's sources to it.
          delete next.resource;
          delete next.citations;
          delete next.pendingCandidates;
          return next;
        })()
        : page;

      const links = linksFor(activePage, snapshot.pages);
      const linkedPages = [...new Set(links.flatMap((link) => link.status === 'resolved' && link.pageId ? [link.pageId] : []))]
        .flatMap((linkedPageId) => {
          const linkedPage = snapshot.pages.find((candidate) => candidate.pageId === linkedPageId);
          return linkedPage ? [{ pageId: linkedPage.pageId, title: linkedPage.title }] : [];
        });
      const backlinkPages = snapshot.pages
        .filter((candidate) => candidate.pageId !== pageId)
        .flatMap((candidate) => {
          const matched = detailedLinksFor(candidate, snapshot.pages).filter((link) => link.pageId === pageId);
          if (matched.length === 0) return [];
          const first = matched[0];
          return [{
            pageId: candidate.pageId,
            title: candidate.title,
            ...(first.alias ? { alias: first.alias } : {}),
            ...(first.snippet ? { snippet: first.snippet } : {}),
          }];
        });
      const backlinks = backlinkPages.map((candidate) => candidate.pageId);
      const { variants: _variants, ...publicPage } = activePage;
      const variants = variantsForRead(page.variants, selectedVariant);

      return {
        ...publicPage,
        revision: selectedVariant?.revision ?? snapshot.revision,
        ...(selectedVariant ? { selectedVariantId: selectedVariant.variantId } : {}),
        ...(variants ? { variants } : {}),
        links,
        linkedPages,
        backlinks,
        backlinkPages,
      };
    },
  };
}
