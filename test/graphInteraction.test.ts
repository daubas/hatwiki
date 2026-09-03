import assert from 'node:assert/strict';
import test from 'node:test';
import { focusedGraphNodeIds, graphKeyboardAction, matchingGraphNodeIds, observeResize } from '../src/lib/graphInteraction.ts';

test('finds graph nodes by title or id and reports no matches', () => {
  const nodes = [
    { id: 'concepts/atlas', title: 'World Atlas' },
    { id: 'methods/search', title: 'Search method' },
  ];

  assert.deepEqual(matchingGraphNodeIds(nodes, 'atlas'), ['concepts/atlas']);
  assert.deepEqual(matchingGraphNodeIds(nodes, 'METHODS'), ['methods/search']);
  assert.deepEqual(matchingGraphNodeIds(nodes, 'missing'), []);
});

test('focuses a selected node and its direct neighbors', () => {
  const edges = [
    { source: 'atlas', target: 'search' },
    { source: 'search', target: 'review' },
  ];

  assert.deepEqual([...focusedGraphNodeIds(edges, 'search')].sort(), ['atlas', 'review', 'search']);
  assert.deepEqual([...focusedGraphNodeIds(edges, 'atlas')], ['atlas', 'search']);
});

test('maps keyboard controls to node details and clearing', () => {
  assert.equal(graphKeyboardAction('Enter'), 'select');
  assert.equal(graphKeyboardAction(' '), 'select');
  assert.equal(graphKeyboardAction('Escape'), 'clear');
  assert.equal(graphKeyboardAction('ArrowDown'), undefined);
});

test('recomputes on resize and removes the listener during cleanup', () => {
  const target = new EventTarget();
  let calls = 0;
  const cleanup = observeResize(target, () => { calls += 1; });

  target.dispatchEvent(new Event('resize'));
  assert.equal(calls, 1);
  cleanup();
  target.dispatchEvent(new Event('resize'));
  assert.equal(calls, 1);
});
