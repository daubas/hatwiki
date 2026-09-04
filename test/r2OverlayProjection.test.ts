import assert from 'node:assert/strict';
import test from 'node:test';

import { createR2OverlayProjection, overlayRevision } from '../src/lib/r2OverlayProjection.ts';

test('overlays R2 edits onto the bundled public snapshot', async () => {
  const objects = new Map<string, unknown>([
    ['published/revision.json', { revision: 'commit-2' }],
    ['published/pages/concepts/hatwiki.json', {
      pageId: 'concepts/hatwiki',
      content: '---\ntype: Concept\ntitle: Better HatWiki\ndescription: A clearer shared Wiki.\n---\n\n# Updated',
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
    revision: await overlayRevision('fixture', [{
      pageId: 'concepts/hatwiki',
      content: '---\ntype: Concept\ntitle: Better HatWiki\ndescription: A clearer shared Wiki.\n---\n\n# Updated',
      revision: 'commit-2',
      baseSha: 'blob-2',
    }]),
    pages: [{
      pageId: 'concepts/hatwiki',
      title: 'Better HatWiki',
      description: 'A clearer shared Wiki.',
      markdown: '\n# Updated',
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

test('does not overlay a page whose latest content is private', async () => {
  const original = { pageId: 'concepts/hatwiki', title: 'HatWiki', markdown: '# Public' };
  const projection = createR2OverlayProjection({
    readSnapshot: async () => ({ revision: 'fixture', pages: [original] }),
  }, {
    list: async () => ({ objects: [{ key: 'published/pages/concepts/hatwiki.json' }] }),
    get: async () => ({ json: async () => ({
      pageId: 'concepts/hatwiki',
      content: '---\ntype: Concept\ntitle: HatWiki\nvisibility: private\n---\n\nprivate update',
      revision: 'private-revision',
      baseSha: 'private-blob',
    }) }),
  });

  assert.deepEqual(await projection.readSnapshot(), { revision: 'fixture', pages: [original] });
});

test('does not add an orphaned R2 page to the current Wiki', async () => {
  const original = { pageId: 'concepts/current', title: 'Current', markdown: '# Current' };
  const projection = createR2OverlayProjection({
    readSnapshot: async () => ({ revision: 'fixture', pages: [original] }),
  }, {
    list: async () => ({ objects: [{ key: 'published/pages/concepts/old-wiki.json' }] }),
    get: async () => ({ json: async () => ({
      pageId: 'concepts/old-wiki',
      content: '---\ntype: Concept\ntitle: Old Wiki\n---\n\n# Old Wiki',
      revision: 'old-revision',
      baseSha: 'old-blob',
    }) }),
  });

  assert.deepEqual(await projection.readSnapshot(), { revision: 'fixture', pages: [original] });
});

test('lists only R2 pages for the current Wiki namespace', async () => {
  const prefixes: string[] = [];
  const projection = createR2OverlayProjection({
    readSnapshot: async () => ({ revision: 'fixture', pages: [{ pageId: 'concepts/current', title: 'Current', markdown: '# Old' }] }),
  }, {
    list: async ({ prefix }) => { prefixes.push(prefix); return { objects: [{ key: `${prefix}concepts/current.json` }] }; },
    get: async () => ({ json: async () => ({
      pageId: 'concepts/current',
      content: '---\ntype: Concept\ntitle: Current\n---\n\n# New',
      revision: 'current-revision',
      baseSha: 'current-blob',
    }) }),
  }, 'daubas/webmcp-okf');

  const snapshot = await projection.readSnapshot();
  assert.deepEqual(prefixes, ['published/daubas%2Fwebmcp-okf/pages/']);
  assert.equal(snapshot.pages[0].markdown, '\n# New');
});
