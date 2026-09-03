import type { PublicPublisher } from './editContracts.ts';

type R2PutOptions = {
  httpMetadata?: { contentType?: string };
  customMetadata?: Record<string, string>;
};

type R2BucketLike = {
  put(key: string, value: string, options: R2PutOptions): Promise<unknown>;
  get(key: string): Promise<{ json<T>(): Promise<T> } | null>;
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

export function createR2Publisher(bucket: R2BucketLike, key = 'published/revision.json'): PublicPublisher {
  return {
    async publish({ revision, baseSha, pageId, content }) {
      await bucket.put(`published/pages/${pageId}.json`, JSON.stringify({ pageId, content, revision, baseSha }), {
        httpMetadata: { contentType: 'application/json' },
        customMetadata: { revision },
      });
      await bucket.put(key, JSON.stringify({ revision }), {
        httpMetadata: { contentType: 'application/json' },
        customMetadata: { revision },
      });
      const [readback, marker] = await Promise.all([
        readR2Page(bucket, pageId),
        bucket.get(key).then((object) => object?.json<{ revision?: unknown }>()),
      ]);
      if (!readback
        || readback.pageId !== pageId
        || readback.revision !== revision
        || readback.baseSha !== baseSha
        || readback.content !== content
        || marker?.revision !== revision) throw new Error('publisher_mismatch');
      return { revision };
    },
  };
}
