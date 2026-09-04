import assert from 'node:assert/strict';
import test from 'node:test';

import { handleEditSourceRequest } from '../src/lib/editSourceHttp.ts';

test('returns the canonical GitHub content and blob sha only to a signed-in actor', async () => {
  let reads = 0;
  const read = async (pageId: string) => {
    reads += 1;
    assert.equal(pageId, 'concepts/hatwiki');
    return { sha: 'blob-123', content: '---\ntitle: HatWiki\n---\n\n# HatWiki' };
  };

  const isPublic = async (pageId: string) => pageId === 'concepts/hatwiki';
  const anonymous = await handleEditSourceRequest(null, 'concepts/hatwiki', isPublic, read);
  const signedIn = await handleEditSourceRequest({ userId: 7, login: 'octo' }, 'concepts/hatwiki', isPublic, read);

  assert.equal(anonymous.status, 401);
  assert.deepEqual(await signedIn.json(), {
    pageId: 'concepts/hatwiki',
    baseSha: 'blob-123',
    content: '---\ntitle: HatWiki\n---\n\n# HatWiki',
  });
  assert.equal(reads, 1);
});

test('rejects invalid or missing canonical pages', async () => {
  let reads = 0;
  const read = async () => {
    reads += 1;
    return null;
  };

  const invalid = await handleEditSourceRequest({ userId: 7, login: 'octo' }, '../secret', async () => false, read);
  const missing = await handleEditSourceRequest({ userId: 7, login: 'octo' }, 'concepts/missing', async () => true, read);

  assert.equal(invalid.status, 400);
  assert.equal(missing.status, 404);
  assert.equal(reads, 1);
});

test('does not expose canonical repository files outside the public projection', async () => {
  let reads = 0;
  const response = await handleEditSourceRequest(
    { userId: 7, login: 'octo' },
    'private/notes',
    async () => false,
    async () => {
      reads += 1;
      return { sha: 'secret', content: 'private' };
    },
  );

  assert.equal(response.status, 404);
  assert.equal(reads, 0);
});
