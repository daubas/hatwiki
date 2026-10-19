import assert from 'node:assert/strict';
import test from 'node:test';
import { buildLocalWikiGraph, buildWikiGraph } from '../src/lib/wikiGraph.ts';

test('builds canonical page nodes and resolved link edges for a snapshot', () => {
  const graph = buildWikiGraph({
    revision: 'rev-1',
    pages: [
      {
        pageId: 'guides/one',
        title: 'One',
        markdown: 'See [[topics/two]].',
      },
      {
        pageId: 'topics/two',
        title: 'Two',
        markdown: '',
      },
    ],
  });

  assert.deepEqual(graph, {
    revision: 'rev-1',
    nodes: [
      { id: 'guides/one', title: 'One', group: 'guides', backlinks: 0, connections: 1 },
      { id: 'topics/two', title: 'Two', group: 'topics', backlinks: 1, connections: 1 },
    ],
    edges: [{ source: 'guides/one', target: 'topics/two' }],
  });
});

test('counts backlinks and unique connections for graph sizing', () => {
  const graph = buildWikiGraph({
    revision: 'rev-counts',
    pages: [
      { pageId: 'one', title: 'One', markdown: '[[two]] [[three]]' },
      { pageId: 'two', title: 'Two', markdown: '[[one]]' },
      { pageId: 'three', title: 'Three', markdown: '[[two]]' },
    ],
  });

  assert.deepEqual(graph.nodes, [
    { id: 'one', title: 'One', group: 'root', backlinks: 1, connections: 2 },
    { id: 'two', title: 'Two', group: 'root', backlinks: 2, connections: 2 },
    { id: 'three', title: 'Three', group: 'root', backlinks: 1, connections: 2 },
  ]);
});

test('deduplicates edges and omits missing or ambiguous links', () => {
  const graph = buildWikiGraph({
    revision: 'rev-2',
    pages: [
      {
        pageId: 'guides/one',
        title: 'One',
        markdown: '[[topics/two]] [[topics/two]] [[missing]] [[shared]]',
      },
      { pageId: 'topics/two', title: 'Two', markdown: '' },
      { pageId: 'archive/shared', title: 'Archived shared', markdown: '' },
      { pageId: 'concepts/shared', title: 'Shared concept', markdown: '' },
    ],
  });

  assert.deepEqual(graph.edges, [{ source: 'guides/one', target: 'topics/two' }]);
});

test('resolves a bare WikiLink only when its basename is unique', () => {
  const graph = buildWikiGraph({
    revision: 'rev-3',
    pages: [
      {
        pageId: 'guides/one',
        title: 'One',
        markdown: '[[unique]] [[shared]]',
      },
      { pageId: 'topics/unique', title: 'Unique', markdown: '' },
      { pageId: 'archive/shared', title: 'Archived shared', markdown: '' },
      { pageId: 'concepts/shared', title: 'Shared concept', markdown: '' },
    ],
  });

  assert.deepEqual(graph.edges, [{ source: 'guides/one', target: 'topics/unique' }]);
});

test('includes resolved standard Markdown links and ignores external image links', () => {
  const graph = buildWikiGraph({
    revision: 'rev-4',
    pages: [
      {
        pageId: 'guides/one',
        title: 'One',
        markdown: '[Two](topics/two.md#details) [External](https://example.test/two) ![Image](https://example.test/image.png)',
      },
      { pageId: 'topics/two', title: 'Two', markdown: '' },
    ],
  });

  assert.deepEqual(graph.edges, [{ source: 'guides/one', target: 'topics/two' }]);
});

test('resolves root-relative Markdown links but ignores parent traversal', () => {
  const graph = buildWikiGraph({
    revision: 'rev-5',
    pages: [
      {
        pageId: 'guides/one',
        title: 'One',
        markdown: '[HatWiki](/concepts/hatwiki.md) [Escape](../concepts/hatwiki.md)',
      },
      { pageId: 'concepts/hatwiki', title: 'HatWiki', markdown: '' },
    ],
  });

  assert.deepEqual(graph.edges, [{ source: 'guides/one', target: 'concepts/hatwiki' }]);
});

test('graph nodes carry the first path segment as their group', () => {
  const graph = buildWikiGraph({
    revision: 'r1',
    pages: [
      { pageId: 'entities/a', title: 'A', markdown: '' },
      { pageId: 'facts/b', title: 'B', markdown: '' },
    ],
  } as never);
  assert.deepEqual(graph.nodes.map((n) => n.group), ['entities', 'facts']);
});

test('local graph includes incoming and outgoing neighbors but excludes two-hop pages', () => {
  const graph = buildLocalWikiGraph({ revision: 'local', pages: [
    { pageId: 'center', title: 'Center', markdown: '[[outgoing]]' },
    { pageId: 'incoming', title: 'Incoming', markdown: '[[center]] [[outgoing]]' },
    { pageId: 'outgoing', title: 'Outgoing', markdown: '[[distant]]' },
    { pageId: 'distant', title: 'Distant', markdown: '' },
    { pageId: 'draft', title: 'Draft', markdown: '[[center]]', status: 'draft' },
  ] }, 'center');
  assert.deepEqual(graph.nodes.map((node) => node.id), ['center', 'incoming', 'outgoing']);
  assert.equal(graph.edges.length, 3);
  assert.equal(graph.nodes.find((node) => node.id === 'outgoing')?.connections, 2);
});

test('local graph retains a draft focus and excludes other drafts before resolving bare links', () => {
  const graph = buildLocalWikiGraph({ revision: 'draft-local', pages: [
    { pageId: 'sources/note', title: 'Draft focus', markdown: '[[topic]]', status: 'draft' },
    { pageId: 'concepts/topic', title: 'Topic', markdown: '[[sources/note]]' },
    { pageId: 'sources/topic', title: 'Other draft', markdown: '[[sources/note]]', status: 'draft' },
  ] }, 'sources/note');
  assert.deepEqual(graph.nodes.map((node) => node.id), ['sources/note', 'concepts/topic']);
  assert.equal(graph.edges.length, 2);
});

test('local graph retains an isolated page and handles an absent focus', () => {
  const snapshot = { revision: 'isolated', pages: [{ pageId: 'alone', title: 'Alone', markdown: '' }] };
  assert.deepEqual(buildLocalWikiGraph(snapshot, 'alone').nodes.map((node) => node.id), ['alone']);
  assert.deepEqual(buildLocalWikiGraph(snapshot, 'missing'), { revision: 'isolated', nodes: [], edges: [] });
});
