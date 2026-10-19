import assert from 'node:assert/strict';
import test from 'node:test';
import { groupWikiIndexByType } from '../src/lib/homeCatalog.ts';
import type { WikiIndexItem } from '../src/lib/wikiIndex.ts';

function item(id: string, title: string): WikiIndexItem {
  return { id, title };
}

test('orders groups by the provided order and drops empty order entries', () => {
  const groups = groupWikiIndexByType(
    [item('entities/a', 'A'), item('workflows/b', 'B'), item('concepts/c', 'C')],
    ['workflows', 'facts', 'concepts'],
  );

  assert.deepEqual(groups.map((group) => group.group), ['workflows', 'concepts', 'entities']);
  assert.deepEqual(groups[0].items.map((entry) => entry.id), ['workflows/b']);
});

test('appends unknown groups after the ordered ones, sorted by group name', () => {
  const groups = groupWikiIndexByType(
    [
      item('entities/a', 'A'),
      item('zzz/z', 'Z'),
      item('concepts/c', 'C'),
      item('aaa/a', 'A'),
    ],
    ['concepts'],
  );

  assert.deepEqual(groups.map((group) => group.group), ['concepts', 'aaa', 'entities', 'zzz']);
});

test('groups items without a slash under root', () => {
  const groups = groupWikiIndexByType(
    [item('index', 'Home'), item('concepts/c', 'C')],
    [],
  );

  assert.deepEqual(groups.map((group) => group.group), ['concepts', 'root']);
  assert.deepEqual(groups[1].items.map((entry) => entry.id), ['index']);
});

test('sorts items within a group by title using zh-Hant collation', () => {
  const groups = groupWikiIndexByType(
    [
      item('concepts/c', '三'),
      item('concepts/a', '乙'),
      item('concepts/b', '一'),
    ],
    ['concepts'],
  );

  assert.deepEqual(groups[0].items.map((entry) => entry.title), ['一', '乙', '三']);
});

test('returns an empty array for empty input', () => {
  assert.deepEqual(groupWikiIndexByType([], ['concepts']), []);
  assert.deepEqual(groupWikiIndexByType([], []), []);
});

test('does not mutate the input array', () => {
  const input = [
    item('entities/a', 'A'),
    item('concepts/c', 'C'),
    item('root-page', 'Home'),
  ];
  const snapshot = JSON.stringify(input);

  groupWikiIndexByType(input, ['concepts']);

  assert.equal(JSON.stringify(input), snapshot);
  assert.deepEqual(input.map((entry) => entry.id), ['entities/a', 'concepts/c', 'root-page']);
});
