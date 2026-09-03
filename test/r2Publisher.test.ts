import assert from 'node:assert/strict';
import test from 'node:test';
import { createR2Publisher, readR2Page } from '../src/lib/r2Publisher.ts';

test('publish stores the page with a conditional write and returns the same revision', async () => {
  const calls: Array<{ key: string; value: string; options: Record<string, unknown> }> = [];
  const values = new Map<string, string>();
  const bucket = {
    async put(key: string, value: string, options: Record<string, unknown>) {
      calls.push({ key, value, options });
      values.set(key, value);
      return {};
    },
    async get(key: string) {
      const value = values.get(key);
      return value ? { json: async () => JSON.parse(value) } : null;
    },
  };

  const publisher = createR2Publisher(bucket);

  assert.deepEqual(await publisher.publish({ revision: 'rev-1', previousSha: 'blob-before', baseSha: 'blob-1', pageId: 'concepts/hatwiki', content: '# HatWiki' }), { revision: 'rev-1' });
  assert.deepEqual(calls, [
    {
      key: 'published/pages/concepts/hatwiki.json',
      value: JSON.stringify({ pageId: 'concepts/hatwiki', content: '# HatWiki', revision: 'rev-1', baseSha: 'blob-1' }),
      options: {
        onlyIf: { etagDoesNotMatch: '*' },
        httpMetadata: { contentType: 'application/json' },
        customMetadata: { revision: 'rev-1' },
      },
    },
  ]);
});

test('does not acknowledge a publication that fails R2 readback', async () => {
  let pageReads = 0;
  const publisher = createR2Publisher({
    put: async () => ({}),
    get: async (key: string) => {
      pageReads += 1;
      return pageReads === 1 ? null : {
        json: async () => ({ pageId: 'concepts/hatwiki', content: '# Other', revision: 'rev-1', baseSha: 'blob-1' }),
      };
    },
  });

  await assert.rejects(publisher.publish({
    revision: 'rev-1', previousSha: 'blob-before', baseSha: 'blob-1', pageId: 'concepts/hatwiki', content: '# HatWiki',
  }), /publisher_mismatch/);
});

test('reads an edited page from the public projection', async () => {
  const keys: string[] = [];
  const bucket = {
    async get(key: string) {
      keys.push(key);
      return { json: async () => ({ pageId: 'concepts/hatwiki', content: '# HatWiki', revision: 'rev-1', baseSha: 'blob-1' }) };
    },
  };

  assert.deepEqual(await readR2Page(bucket, 'concepts/hatwiki'), {
    pageId: 'concepts/hatwiki', content: '# HatWiki', revision: 'rev-1', baseSha: 'blob-1',
  });
  assert.deepEqual(keys, ['published/pages/concepts/hatwiki.json']);
  assert.equal(await readR2Page({ get: async () => null }, 'missing'), null);
  assert.equal(await readR2Page({ get: async () => { throw new Error('unexpected'); } }, '../secret'), null);
});

test('rejects a stale predecessor without overwriting a newer published page', async () => {
  const puts: string[] = [];
  const publisher = createR2Publisher({
    put: async (key) => {
      puts.push(key);
      return {};
    },
    get: async () => ({
      etag: 'etag-new',
      json: async () => ({ pageId: 'concepts/hatwiki', content: '# Newer', revision: 'rev-new', baseSha: 'blob-new' }),
    }),
  });

  await assert.rejects(publisher.publish({
    revision: 'rev-old', previousSha: 'blob-before-old', baseSha: 'blob-old', pageId: 'concepts/hatwiki', content: '# Old',
  }), /publisher_conflict/);
  assert.deepEqual(puts, []);
});
