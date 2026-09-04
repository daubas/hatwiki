import type { PublicPage, PublicProjection } from './contracts.ts';
import { isPublicMarkdown } from './collectionProjection.ts';
import type { PublishedPage } from './r2Publisher.ts';

type R2Like = {
  list(options: { prefix: string; limit: number }): Promise<{ objects: Array<{ key: string }> }>;
  get(key: string): Promise<{ json<T>(): Promise<T> } | null>;
};

function valid(page: unknown, key: string): page is PublishedPage {
  if (!page || typeof page !== 'object') return false;
  const value = page as Record<string, unknown>;
  return typeof value.pageId === 'string'
    && key === `published/pages/${value.pageId}.json`
    && !value.pageId.split('/').some((part) => !part || part === '.' || part === '..')
    && typeof value.content === 'string'
    && isPublicMarkdown(value.pageId, value.content)
    && typeof value.revision === 'string'
    && typeof value.baseSha === 'string';
}

function project(page: PublishedPage): PublicPage {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(page.content);
  const title = frontmatter?.[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || page.pageId;
  return {
    pageId: page.pageId,
    title,
    markdown: frontmatter?.[2] ?? page.content,
  };
}

export async function overlayRevision(baseRevision: string, pages: PublishedPage[]): Promise<string> {
  if (pages.length === 0) return baseRevision;
  const state = pages.map((page) => `${page.pageId}\0${page.revision}`).sort().join('\n');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(state));
  return `r2-${[...new Uint8Array(digest)].slice(0, 8).map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;
}

export function createR2OverlayProjection(base: PublicProjection, bucket: R2Like): PublicProjection {
  return {
    async readSnapshot() {
      const snapshot = await base.readSnapshot();
      // ponytail: one R2 list page supports the first 1,000 overrides; paginate when a Wiki reaches that size.
      const listed = await bucket.list({ prefix: 'published/pages/', limit: 1000 });
      const pages = new Map(snapshot.pages.map((page) => [page.pageId, page]));
      const published: PublishedPage[] = [];
      for (const { key } of listed.objects) {
        const object = await bucket.get(key);
        const value = object ? await object.json<unknown>() : null;
        if (valid(value, key)) {
          pages.set(value.pageId, project(value));
          published.push(value);
        }
      }
      return { revision: await overlayRevision(snapshot.revision, published), pages: [...pages.values()] };
    },
  };
}
