import assert from 'node:assert/strict';
import test from 'node:test';

import { inspectWikiChanges } from '../src/lib/inspectChanges.ts';

test('summarizes affected page, citations, WikiLinks, and unresolved markers', () => {
  const markdown = `# Updated\n\nSee [[concepts/shared|Shared]] and [Method](/methods/testing.md).[^source-1]\n\n- TODO: verify date\n\n[^source-1]: Interview note.`;
  assert.deepEqual(inspectWikiChanges('concepts/hatwiki', markdown), {
    affectedPages: ['concepts/hatwiki'],
    citations: ['source-1'],
    wikiLinks: ['concepts/shared', 'methods/testing'],
    unresolved: ['TODO: verify date'],
  });
});
