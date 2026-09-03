import type { PublicPublisher } from './editContracts.ts';

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

function canonical(pageId: string): boolean {
  return pageId.length > 0
    && !pageId.startsWith('/')
    && !/[\\?#\u0000-\u001f\u007f]/.test(pageId)
    && pageId.split('/').every((part) => part !== '' && part !== '.' && part !== '..');
}

export async function readR2Page(bucket: R2ReaderLike, pageId: string): Promise<PublishedPage | null> {
  if (!canonical(pageId)) return null;
  const object = await bucket.get(`published/pages/${pageId}.json`);
  return object ? object.json<PublishedPage>() : null;
}

export function createR2Publisher(bucket: R2BucketLike): PublicPublisher {
  return {
    async publish({ revision, previousSha, baseSha, pageId, content }) {
      const pageKey = `published/pages/${pageId}.json`;
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
      const readback = await readR2Page(bucket, pageId);
      if (!readback
        || readback.pageId !== pageId
        || readback.revision !== revision
        || readback.baseSha !== baseSha
        || readback.content !== content) throw new Error('publisher_mismatch');
      return { revision };
    },
  };
}
