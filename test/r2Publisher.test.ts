import assert from 'node:assert/strict';
import test from 'node:test';
import { createR2Publisher, readR2Page } from '../src/lib/r2Publisher.ts';

test('publish stores the revision marker and returns the same revision', async () => {
  const calls: Array<{ key: string; value: string; options: Record<string, unknown> }> = [];
  const bucket = {
    async put(key: string, value: string, options: Record<string, unknown>) {
      calls.push({ key, value, options });
      return {};
    },
  };

  const publisher = createR2Publisher(bucket);

  assert.deepEqual(await publisher.publish({ revision: 'rev-1', baseSha: 'blob-1', pageId: 'concepts/hatwiki', content: '# HatWiki' }), { revision: 'rev-1' });
  assert.deepEqual(calls, [
    {
      key: 'published/pages/concepts/hatwiki.json',
      value: JSON.stringify({ pageId: 'concepts/hatwiki', content: '# HatWiki', revision: 'rev-1', baseSha: 'blob-1' }),
      options: {
        httpMetadata: { contentType: 'application/json' },
        customMetadata: { revision: 'rev-1' },
      },
    },
    {
      key: 'published/revision.json',
      value: JSON.stringify({ revision: 'rev-1' }),
      options: {
        httpMetadata: { contentType: 'application/json' },
        customMetadata: { revision: 'rev-1' },
      },
    },
  ]);
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
