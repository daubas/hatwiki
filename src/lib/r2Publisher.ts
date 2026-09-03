import type { PublicPublisher } from './editContracts.ts';

type R2PutOptions = {
  httpMetadata?: { contentType?: string };
  customMetadata?: Record<string, string>;
};

type R2BucketLike = {
  put(key: string, value: string, options: R2PutOptions): Promise<unknown>;
};

type R2ReaderLike = {
  get(key: string): Promise<{ json<T>(): Promise<T> } | null>;
};

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
      return { revision };
    },
  };
}
