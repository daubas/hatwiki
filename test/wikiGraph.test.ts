import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWikiGraph } from '../src/lib/wikiGraph.ts';

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
      { id: 'guides/one', title: 'One' },
      { id: 'topics/two', title: 'Two' },
    ],
    edges: [{ source: 'guides/one', target: 'topics/two' }],
  });
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
