import assert from 'node:assert/strict';
import test from 'node:test';
import { diffMarkdown } from '../src/lib/variantDiff.ts';

test('diffMarkdown keeps shared lines and marks each side of a change', () => {
  assert.deepEqual(diffMarkdown('A\nB\nC', 'A\nX\nC'), [
    { kind: 'same', text: 'A' },
    { kind: 'removed', text: 'B' },
    { kind: 'added', text: 'X' },
    { kind: 'same', text: 'C' },
  ]);
});
