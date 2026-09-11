import assert from 'node:assert/strict';
import test from 'node:test';

// Terra-owned runtime contract: export contributorBranchFor from
// src/lib/wikiRepositoryConfig.ts once the branch-aware write seam is wired.
import { contributorBranchFor } from '../src/lib/wikiRepositoryConfig.ts';

test('builds a deterministic contributor branch from the GitHub numeric user ID', () => {
  const first = contributorBranchFor(42, 'Agent Notes');

  assert.equal(first, 'contrib/u-42/agent-notes');
  assert.equal(contributorBranchFor(42, 'Agent Notes'), first);
  assert.notEqual(contributorBranchFor(43, 'Agent Notes'), first);
  assert.notEqual(contributorBranchFor(42, 'Research Notes'), first);
});

test('uses the stable user ID as the ownership key without requiring a login name', () => {
  assert.equal(contributorBranchFor(12345, 'Shared Wiki'), 'contrib/u-12345/shared-wiki');
});

test('rejects invalid contributor identities', () => {
  for (const userId of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, 1.5]) {
    assert.throws(() => contributorBranchFor(userId, 'Agent Notes'));
  }
});

test('rejects empty, traversal, control-character, and overlong topics', () => {
  const unsafeTopics = [
    '',
    '   ',
    '../secret',
    'notes/../../main',
    'notes\\secret',
    'notes\nforged',
    'notes\u0000forged',
    'topic-'.repeat(100),
    '!!!',
  ];

  for (const topic of unsafeTopics) {
    assert.throws(
      () => contributorBranchFor(42, topic),
      `expected unsafe topic to be rejected: ${JSON.stringify(topic)}`,
    );
  }
});

test('rejects reserved public refs as contributor topics', () => {
  for (const topic of ['main', 'wiki-live', 'HEAD', 'refs/heads/main']) {
    assert.throws(
      () => contributorBranchFor(42, topic),
      `expected reserved ref to be rejected: ${topic}`,
    );
  }
});
