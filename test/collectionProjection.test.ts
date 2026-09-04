import assert from 'node:assert/strict';
import test from 'node:test';
import { createCollectionProjection } from '../src/lib/collectionProjection.ts';

test('projects a public collection entry into a public snapshot', async () => {
  const projection = createCollectionProjection('rev-1', [
    {
      id: 'guides/overview',
      body: '# Overview',
      data: { title: 'Overview', description: 'A plain-language overview.' },
    },
  ]);

  assert.deepEqual(await projection.readSnapshot(), {
    revision: 'rev-1',
    pages: [
      {
        pageId: 'guides/overview',
        title: 'Overview',
        description: 'A plain-language overview.',
        markdown: '# Overview',
      },
    ],
  });
});

test('projects only an HTTP canonical resource for public reading', async () => {
  const projection = createCollectionProjection('rev-resource', [
    { id: 'entities/public', data: { title: 'Public', resource: 'https://example.test/source' } },
    { id: 'entities/internal', data: { title: 'Internal', resource: '/raw/source.md' } },
  ]);

  const snapshot = await projection.readSnapshot();
  assert.equal(snapshot.pages[0].resource, 'https://example.test/source');
  assert.equal(snapshot.pages[1].resource, undefined);
});

test('excludes private and system collection entries from the snapshot', async () => {
  const projection = createCollectionProjection('rev-2', [
    { id: 'guides/visible', data: { title: 'Visible' } },
    { id: 'raw/source', data: { title: 'Raw source' } },
    { id: 'extracted/source', data: { title: 'Extracted source' } },
    { id: '_draft/page', data: { title: 'Draft' } },
    { id: 'SCHEMA', data: { title: 'Schema' } },
    { id: 'log', data: { title: 'Log' } },
    { id: 'guides/secret', data: { title: 'Secret', visibility: 'private' } },
    { id: 'guides/whitespace-secret', data: { title: 'Secret', visibility: ' PRIVATE ' } },
  ]);

  const snapshot = await projection.readSnapshot();

  assert.deepEqual(snapshot.pages.map((page) => page.pageId), ['guides/visible']);
});

test('projects only allowlisted citations with a resource', async () => {
  const projection = createCollectionProjection('rev-3', [
    {
      id: 'guides/citations',
      data: {
        title: 'Citations',
        sources: [
          {
            id: 'source-1',
            resource: 'https://example.test/one',
            title: 'One',
            secret: 'do-not-publish',
          },
          { id: 'source-without-resource', title: 'Not public' },
          { id: 'source-2', resource: 'https://example.test/two', extra: true },
        ],
      },
    },
  ]);

  const snapshot = await projection.readSnapshot();

  assert.deepEqual(snapshot.pages[0].citations, [
    { id: 'source-1', resource: 'https://example.test/one', title: 'One' },
    { id: 'source-2', resource: 'https://example.test/two' },
  ]);
});

test('projects a numeric pending candidate count', async () => {
  const projection = createCollectionProjection('rev-4', [
    {
      id: 'guides/conflict',
      data: { title: 'Conflict', pendingCandidates: 2 },
    },
  ]);

  const snapshot = await projection.readSnapshot();

  assert.equal(snapshot.pages[0].pendingCandidates, 2);
});

test('keeps canonical ID casing while removing a markdown extension', async () => {
  const projection = createCollectionProjection('rev-5', [
    { id: 'Guides/Overview.MD', data: {} },
  ]);

  const snapshot = await projection.readSnapshot();

  assert.deepEqual(snapshot.pages[0], {
    pageId: 'Guides/Overview',
    title: 'Guides/Overview',
    markdown: '',
  });
});
