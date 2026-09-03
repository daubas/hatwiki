import assert from 'node:assert/strict';
import test from 'node:test';
import {
  mergeWikiIndexPages,
  filterWikiIndex,
  type WikiIndexItem,
} from '../src/lib/wikiIndex.ts';
import {
  addHeadingIds,
  extractWikiOutline,
  removeLeadingTitle,
} from '../src/lib/wikiOutline.ts';

const items: WikiIndexItem[] = [
  {
    id: 'concepts/hatwiki',
    title: 'HatWiki',
    description: 'A Git-native Wiki for people and agents.',
    tags: ['agents', 'webmcp'],
  },
  {
    id: 'guides/getting-started',
    title: 'Getting started',
    description: 'Read the public Wiki before editing.',
    tags: ['guide'],
  },
];

test('filters the public Wiki index across title, description, id, and tags', () => {
  assert.deepEqual(filterWikiIndex(items, ''), items);
  assert.deepEqual(filterWikiIndex(items, '  AGENTS  ').map((item) => item.id), ['concepts/hatwiki']);
  assert.deepEqual(filterWikiIndex(items, 'getting-started').map((item) => item.id), ['guides/getting-started']);
  assert.deepEqual(filterWikiIndex(items, 'missing'), []);
});

test('builds the index only from pages admitted by the public projection', () => {
  assert.deepEqual(mergeWikiIndexPages(
    [{ pageId: 'guides/getting-started', title: 'Getting started' }],
    [...items, { id: 'raw/secret', title: 'Secret' }],
  ), [items[1]]);
});

test('extracts a stable nested outline and disambiguates duplicate headings', () => {
  assert.deepEqual(extractWikiOutline('# HatWiki\n\n## Shared memory\n\n### Links & sources\n\n## Shared memory'), [
    { id: 'shared-memory', text: 'Shared memory', level: 2 },
    { id: 'links-sources', text: 'Links & sources', level: 3 },
    { id: 'shared-memory-2', text: 'Shared memory', level: 2 },
  ]);
});

test('adds outline ids to rendered headings and removes the duplicated markdown title', () => {
  const outline = extractWikiOutline('# HatWiki\n\n## Shared memory');
  const rendered = '<h1>HatWiki</h1>\n<p>Intro</p>\n<h2>Shared memory</h2>';

  assert.equal(removeLeadingTitle(rendered), '<p>Intro</p>\n<h2>Shared memory</h2>');
  assert.equal(addHeadingIds(removeLeadingTitle(rendered), outline), '<p>Intro</p>\n<h2 id="shared-memory">Shared memory</h2>');
});
