import { isPublicVariantSupport } from './contracts.ts';
import type { PublicPage, PublicProjection, PublicVariant } from './contracts.ts';
import { isSafeVariantId } from './editContracts.ts';
import { isPublicMarkdown } from './collectionProjection.ts';
import type { PublishedPage, PublishedVariant } from './r2Publisher.ts';

const R2_LIST_LIMIT = 1000;

type R2Like = {
  list(options: { prefix: string; limit: number }): Promise<{ objects: Array<{ key: string }> }>;
  get(key: string): Promise<{ json<T>(): Promise<T> } | null>;
};

function canonical(pageId: unknown): pageId is string {
  return typeof pageId === 'string'
    && pageId.length > 0
    && !pageId.startsWith('/')
    && !/[\\?#\u0000-\u001f\u007f]/.test(pageId)
    && pageId.split('/').every((part) => part !== '' && part !== '.' && part !== '..');
}

function validPage(page: unknown, key: string, prefix: string): page is PublishedPage {
  if (!page || typeof page !== 'object') return false;
  const value = page as Record<string, unknown>;
  return canonical(value.pageId)
    && key === `${prefix}${value.pageId}.json`
    && typeof value.content === 'string'
    && isPublicMarkdown(value.pageId, value.content)
    && typeof value.revision === 'string'
    && typeof value.baseSha === 'string';
}

function validVariant(variant: unknown, key: string, prefix: string): variant is PublishedVariant {
  if (!variant || typeof variant !== 'object') return false;
  const value = variant as Record<string, unknown>;
  return canonical(value.pageId)
    && isSafeVariantId(value.variantId)
    && key === `${prefix}${value.pageId}/${value.variantId}.json`
    && typeof value.content === 'string'
    && isPublicMarkdown(value.pageId, value.content)
    && typeof value.revision === 'string'
    && typeof value.baseSha === 'string'
    && isPublicVariantSupport(value.support);
}

function project(page: PublishedPage): PublicPage {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(page.content);
  const title = frontmatter?.[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || page.pageId;
  const description = frontmatter?.[1].match(/^description:\s*["']?(.+?)["']?\s*$/m)?.[1];
  return {
    pageId: page.pageId,
    title,
    ...(description ? { description } : {}),
    markdown: frontmatter?.[2] ?? page.content,
  };
}

function projectVariant(variant: PublishedVariant): PublicVariant {
  const page = project(variant);
  return {
    variantId: variant.variantId,
    revision: variant.revision,
    title: page.title,
    ...(page.description ? { description: page.description } : {}),
    markdown: page.markdown,
    support: variant.support,
  };
}

export async function overlayRevision(baseRevision: string, pages: PublishedPage[], variants: PublishedVariant[] = []): Promise<string> {
  if (pages.length === 0 && variants.length === 0) return baseRevision;
  const state = [
    ...pages.map((page) => `page\0${page.pageId}\0${page.revision}`),
    ...variants.map((variant) => `variant\0${variant.pageId}\0${variant.variantId}\0${variant.revision}\0${variant.support.views}\0${variant.support.endorsements}\0${variant.support.disagreements}`),
  ].sort().join('\n');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(state));
  return `r2-${[...new Uint8Array(digest)].slice(0, 8).map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;
}

export function createR2OverlayProjection(base: PublicProjection, bucket: R2Like, namespace = ''): PublicProjection {
  const pagePrefix = namespace ? `published/${encodeURIComponent(namespace)}/pages/` : 'published/pages/';
  const variantPrefix = namespace ? `published/${encodeURIComponent(namespace)}/variants/` : 'published/variants/';
  return {
    async readSnapshot() {
      const snapshot = await base.readSnapshot();
      // ponytail: bounded public lists; paginate only when a Wiki exceeds this cap.
      const [listedPages, listedVariants] = await Promise.all([
        bucket.list({ prefix: pagePrefix, limit: R2_LIST_LIMIT }),
        bucket.list({ prefix: variantPrefix, limit: R2_LIST_LIMIT }),
      ]);
      const pages = new Map(snapshot.pages.map((page) => [page.pageId, page]));
      const published: PublishedPage[] = [];
      for (const { key } of listedPages.objects) {
        const object = await bucket.get(key);
        const value = object ? await object.json<unknown>() : null;
        if (validPage(value, key, pagePrefix) && pages.has(value.pageId)) {
          pages.set(value.pageId, project(value));
          published.push(value);
        }
      }
      const variantsByPage = new Map<string, Map<string, PublicVariant>>();
      const publishedVariants = new Map<string, PublishedVariant>();
      for (const { key } of listedVariants.objects) {
        const object = await bucket.get(key);
        const value = object ? await object.json<unknown>() : null;
        if (!validVariant(value, key, variantPrefix) || !pages.has(value.pageId)) continue;
        const variants = variantsByPage.get(value.pageId) ?? new Map<string, PublicVariant>();
        variants.set(value.variantId, projectVariant(value));
        variantsByPage.set(value.pageId, variants);
        publishedVariants.set(`${value.pageId}\0${value.variantId}`, value);
      }
      for (const [pageId, variants] of variantsByPage) {
        const page = pages.get(pageId);
        if (page) pages.set(pageId, { ...page, variants: [...variants.values()].sort((left, right) => left.variantId.localeCompare(right.variantId)) });
      }
      return { revision: await overlayRevision(snapshot.revision, published, [...publishedVariants.values()]), pages: [...pages.values()] };
    },
  };
}
