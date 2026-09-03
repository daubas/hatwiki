import assert from 'node:assert/strict';
import test from 'node:test';

import { createR2OverlayProjection } from '../src/lib/r2OverlayProjection.ts';

test('overlays R2 edits onto the bundled public snapshot', async () => {
  const objects = new Map<string, unknown>([
    ['published/revision.json', { revision: 'commit-2' }],
    ['published/pages/concepts/hatwiki.json', {
      pageId: 'concepts/hatwiki',
      content: '---\ntitle: Better HatWiki\n---\n\n# Updated',
      revision: 'commit-2',
      baseSha: 'blob-2',
    }],
  ]);
  const projection = createR2OverlayProjection({
    readSnapshot: async () => ({
      revision: 'fixture',
      pages: [{ pageId: 'concepts/hatwiki', title: 'HatWiki', markdown: '# Old' }],
    }),
  }, {
    list: async () => ({ objects: [{ key: 'published/pages/concepts/hatwiki.json' }] }),
    get: async (key: string) => objects.has(key) ? { json: async () => objects.get(key) } : null,
  });

  assert.deepEqual(await projection.readSnapshot(), {
    revision: 'commit-2',
    pages: [{
      pageId: 'concepts/hatwiki',
      title: 'Better HatWiki',
      markdown: '\n# Updated',
      sourceMarkdown: '---\ntitle: Better HatWiki\n---\n\n# Updated',
      baseSha: 'blob-2',
    }],
  });
});

test('ignores malformed or mismatched R2 page objects', async () => {
  const projection = createR2OverlayProjection({
    readSnapshot: async () => ({ revision: 'fixture', pages: [{ pageId: 'safe', title: 'Safe', markdown: '# Safe' }] }),
  }, {
    list: async () => ({ objects: [{ key: 'published/pages/safe.json' }, { key: 'published/pages/bad.json' }] }),
    get: async (key: string) => key === 'published/revision.json' ? null : ({ json: async () => key.endsWith('safe.json')
      ? { pageId: '../safe', content: 'bad', revision: 'x', baseSha: 'x' }
      : { pageId: 'other', content: 'bad', revision: 'x', baseSha: 'x' } }),
  });

  assert.deepEqual(await projection.readSnapshot(), {
    revision: 'fixture', pages: [{ pageId: 'safe', title: 'Safe', markdown: '# Safe' }],
  });
});
