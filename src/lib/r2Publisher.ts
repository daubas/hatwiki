import { isSafeVariantId } from './editContracts.ts';
import type { PublicPublisher } from './editContracts.ts';
import { isPublicVariantSupport } from './contracts.ts';
import type { PublicVariantSupport } from './contracts.ts';

type R2PutOptions = {
  onlyIf?: { etagMatches?: string; etagDoesNotMatch?: string };
  httpMetadata?: { contentType?: string };
  customMetadata?: Record<string, string>;
};

type R2BucketLike = {
  put(key: string, value: string, options: R2PutOptions): Promise<unknown>;
  get(key: string): Promise<{ etag?: string; json<T>(): Promise<T> } | null>;
};

type R2ReaderLike = Pick<R2BucketLike, 'get'>;

export type PublishedPage = { pageId: string; content: string; revision: string; baseSha: string };
export type PublishedVariant = PublishedPage & { variantId: string; support: PublicVariantSupport };

function canonical(pageId: string): boolean {
  return pageId.length > 0
    && !pageId.startsWith('/')
    && !/[\\?#\u0000-\u001f\u007f]/.test(pageId)
    && pageId.split('/').every((part) => part !== '' && part !== '.' && part !== '..');
}

function prefix(namespace: string, type: 'pages' | 'variants'): string {
  return namespace ? `published/${encodeURIComponent(namespace)}/${type}/` : `published/${type}/`;
}

export async function readR2Page(bucket: R2ReaderLike, pageId: string, namespace = ''): Promise<PublishedPage | null> {
  if (!canonical(pageId)) return null;
  const object = await bucket.get(`${prefix(namespace, 'pages')}${pageId}.json`);
  return object ? object.json<PublishedPage>() : null;
}

export async function readR2Variant(bucket: R2ReaderLike, pageId: string, variantId: string, namespace = ''): Promise<PublishedVariant | null> {
  if (!canonical(pageId) || !isSafeVariantId(variantId)) return null;
  const object = await bucket.get(`${prefix(namespace, 'variants')}${pageId}/${variantId}.json`);
  return object ? object.json<PublishedVariant>() : null;
}

export function createR2Publisher(bucket: R2BucketLike, namespace = ''): PublicPublisher {
  const pagePrefix = prefix(namespace, 'pages');
  const variantPrefix = prefix(namespace, 'variants');
  return {
    async publish({ revision, previousSha, baseSha, pageId, content }) {
      const pageKey = `${pagePrefix}${pageId}.json`;
      const currentObject = await bucket.get(pageKey);
      const current = currentObject ? await currentObject.json<PublishedPage>() : null;
      if (current?.revision === revision && current.baseSha === baseSha && current.content === content) return { revision };
      if (current && current.baseSha !== previousSha) throw new Error('publisher_conflict');
      if (currentObject && !currentObject.etag) throw new Error('publisher_conflict');

      const written = await bucket.put(pageKey, JSON.stringify({ pageId, content, revision, baseSha }), {
        onlyIf: currentObject ? { etagMatches: currentObject.etag } : { etagDoesNotMatch: '*' },
        httpMetadata: { contentType: 'application/json' },
        customMetadata: { revision },
      });
      if (!written) throw new Error('publisher_conflict');
      const readback = await readR2Page(bucket, pageId, namespace);
      if (!readback
        || readback.pageId !== pageId
        || readback.revision !== revision
        || readback.baseSha !== baseSha
        || readback.content !== content) throw new Error('publisher_mismatch');
      return { revision };
    },

    async publishVariant({ variantId, revision, baseSha, pageId, content }) {
      if (!canonical(pageId) || !isSafeVariantId(variantId)) throw new Error('invalid_variant');
      const variantKey = `${variantPrefix}${pageId}/${variantId}.json`;
      const currentObject = await bucket.get(variantKey);
      const current = currentObject ? await currentObject.json<PublishedVariant>() : null;
      if (current?.pageId === pageId
        && current.variantId === variantId
        && current.revision === revision
        && current.baseSha === baseSha
        && current.content === content
        && isPublicVariantSupport(current.support)) return { revision };
      if (current) throw new Error('publisher_conflict');

      const written = await bucket.put(variantKey, JSON.stringify({
        pageId,
        variantId,
        content,
        revision,
        baseSha,
        support: { views: 0, endorsements: 0, disagreements: 0 },
      }), {
        onlyIf: { etagDoesNotMatch: '*' },
        httpMetadata: { contentType: 'application/json' },
        customMetadata: { revision },
      });
      const readback = await readR2Variant(bucket, pageId, variantId, namespace);
      if (readback?.pageId === pageId
        && readback.variantId === variantId
        && readback.revision === revision
        && readback.baseSha === baseSha
        && readback.content === content
        && isPublicVariantSupport(readback.support)) return { revision };
      throw new Error(written ? 'publisher_mismatch' : 'publisher_conflict');
    },
  };
}
