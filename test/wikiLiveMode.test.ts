import assert from 'node:assert/strict';
import test from 'node:test';

import { createEditPageService } from '../src/lib/editPageService.ts';
import { createR2OverlayProjection } from '../src/lib/r2OverlayProjection.ts';
import {
  getWikiProjectionNamespace,
  getWikiRepositoryConfig,
  isLiveBranchMode,
} from '../src/lib/wikiRepositoryConfig.ts';

const baseEnv = {
  WIKI_REPO: 'daubas/webmcp-okf',
  WIKI_REF: 'main',
  WIKI_ROOT: '.',
  GITHUB_INSTALLATION_ID: '123',
  GITHUB_REPOSITORY_ID: '1356699469',
};

test('enables live mode only for the exact flag value', () => {
  assert.equal(isLiveBranchMode({}), false);
  assert.equal(isLiveBranchMode({ WIKI_BRANCH_MODE: 'off' }), false);
  assert.equal(isLiveBranchMode({ WIKI_BRANCH_MODE: 'contributor' }), false);
  assert.equal(isLiveBranchMode({ WIKI_BRANCH_MODE: 'live' }), true);
  assert.equal(isLiveBranchMode({ WIKI_BRANCH_MODE: 'LIVE' }), false);
  assert.equal(isLiveBranchMode({ WIKI_BRANCH_MODE: 'live ' }), false);
});

test('accepts live mode only when both controlled refs are exactly wiki-live', () => {
  assert.deepEqual(getWikiRepositoryConfig({
    ...baseEnv,
    WIKI_BRANCH_MODE: 'live',
    WIKI_PUBLIC_REF: 'wiki-live',
    WIKI_WRITE_BRANCH: 'wiki-live',
  }), {
    owner: 'daubas',
    repo: 'webmcp-okf',
    branch: 'wiki-live',
    contentRoot: '',
    installationId: 123,
    repositoryId: 1356699469,
  });

  for (const invalid of [
    { WIKI_PUBLIC_REF: 'main', WIKI_WRITE_BRANCH: 'wiki-live' },
    { WIKI_PUBLIC_REF: 'wiki-live', WIKI_WRITE_BRANCH: 'main' },
    { WIKI_PUBLIC_REF: undefined, WIKI_WRITE_BRANCH: 'wiki-live' },
    { WIKI_PUBLIC_REF: 'wiki-live', WIKI_WRITE_BRANCH: undefined },
  ]) {
    assert.throws(
      () => getWikiRepositoryConfig({ ...baseEnv, ...invalid, WIKI_BRANCH_MODE: 'live' }),
      /Wiki repository is not configured/,
    );
  }
});

test('fails closed for an unknown branch mode', () => {
  assert.throws(
    () => getWikiRepositoryConfig({
      ...baseEnv,
      WIKI_BRANCH_MODE: 'preview',
    }),
    /Wiki repository is not configured/,
  );
});

test('fails closed when off or contributor mode points writes at wiki-live', () => {
  for (const mode of ['off', 'contributor']) {
    assert.throws(
      () => getWikiRepositoryConfig({
        ...baseEnv,
        WIKI_BRANCH_MODE: mode,
        WIKI_WRITE_BRANCH: 'wiki-live',
      }),
      /Wiki repository is not configured/,
    );
  }
});

test('commits a direct wiki-live edit and publishes the same revision', async () => {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async (pageId, ref) => {
        calls.push(`read:${pageId}:${ref ?? 'head'}`);
        return ref === 'wiki-live'
          ? { sha: 'live-before', content: 'Old note' }
          : { sha: 'live-after', content: 'Updated note' };
      },
      findRequestRevision: async (pageId, requestId, _identity, ref) => {
        calls.push(`find:${pageId}:${requestId}:${ref ?? 'default'}`);
        return null;
      },
      commitPage: async (input) => {
        calls.push(`commit:${input.pageId}:${input.ref ?? 'default'}`);
        return { revision: 'live-commit' };
      },
      saveCandidate: async () => ({ revision: 'unused' }),
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      claim: async () => ({ status: 'claimed' as const, token: 'lease' }),
      put: async ({ status }) => calls.push(`receipt.put:${status}`),
    },
    publisher: {
      publish: async ({ revision }) => {
        calls.push(`publish:${revision}`);
        return { revision };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  const result = await service.edit(
    { userId: 42, login: 'octo' },
    {
      requestId: 'request-live',
      pageId: 'guides/overview',
      baseSha: 'live-before',
      content: 'Updated note',
      reason: 'Clarify the note',
      ref: 'wiki-live',
    },
  );

  assert.deepEqual(result, {
    requestId: 'request-live',
    status: 'committed',
    revision: 'live-commit',
  });
  assert.deepEqual(calls, [
    'receipt.get',
    'find:guides/overview:request-live:wiki-live',
    'read:guides/overview:wiki-live',
    'commit:guides/overview:wiki-live',
    'read:guides/overview:live-commit',
    'publish:live-commit',
    'receipt.put:committed',
  ]);
});

test('does not acknowledge a stale wiki-live edit without a variant publisher', async () => {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async (pageId, ref) => {
        calls.push(`read:${pageId}:${ref ?? 'head'}`);
        return { sha: 'live-current', content: 'Current note' };
      },
      findRequestRevision: async (_pageId, _requestId, _identity, ref) => {
        calls.push(`find:${ref ?? 'default'}`);
        return null;
      },
      commitPage: async () => {
        calls.push('commit');
        return { revision: 'unexpected' };
      },
      saveCandidate: async (input) => {
        calls.push(`candidate:${input.ref ?? 'default'}`);
        return { revision: 'live-candidate' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      claim: async () => ({ status: 'claimed' as const, token: 'lease' }),
      put: async ({ status }) => calls.push(`receipt.put:${status}`),
    },
    publisher: {
      publish: async () => {
        calls.push('publish');
        return { revision: 'unexpected' };
      },
    },
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });

  await assert.rejects(() => service.edit(
    { userId: 42, login: 'octo' },
    {
      requestId: 'request-stale-live',
      pageId: 'guides/overview',
      baseSha: 'live-before',
      content: 'Updated note',
      reason: 'Clarify the note',
      ref: 'wiki-live',
    },
  ), /publisher_unavailable/);
  assert.deepEqual(calls, [
    'receipt.get',
    'find:wiki-live',
    'read:guides/overview:wiki-live',
    'candidate:wiki-live',
  ]);
});

test('projects live writes under the repository and wiki-live namespace', async () => {
  const prefixes: string[] = [];
  const env = {
    ...baseEnv,
    WIKI_BRANCH_MODE: 'live',
    WIKI_PUBLIC_REF: 'wiki-live',
    WIKI_WRITE_BRANCH: 'wiki-live',
  };
  const projection = createR2OverlayProjection(
    { readSnapshot: async () => ({ revision: 'fixture', pages: [{ pageId: 'guides/overview', title: 'Overview', markdown: '# Old' }] }) },
    {
      list: async ({ prefix }) => {
        prefixes.push(prefix);
        return { objects: [] };
      },
      get: async () => null,
    },
    getWikiProjectionNamespace(env),
  );

  await projection.readSnapshot();

  assert.deepEqual(prefixes.sort(), [
    'published/daubas%2Fwebmcp-okf%40wiki-live/pages/',
    'published/daubas%2Fwebmcp-okf%40wiki-live/variants/',
  ]);
});
