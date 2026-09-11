import assert from 'node:assert/strict';
import test from 'node:test';

import { getWikiProjectionNamespace, getWikiPublicRef, getWikiRepositoryConfig, isContributorBranchMode, isSafeBranch } from '../src/lib/wikiRepositoryConfig.ts';

test('uses one external content repository for authenticated reads and writes', () => {
  assert.deepEqual(getWikiRepositoryConfig({
    WIKI_REPO: 'daubas/webmcp-okf',
    WIKI_REF: 'main',
    WIKI_ROOT: '.',
    GITHUB_INSTALLATION_ID: '123',
    GITHUB_REPOSITORY_ID: '1356699469',
  }), {
    owner: 'daubas',
    repo: 'webmcp-okf',
    branch: 'main',
    contentRoot: '',
    installationId: 123,
    repositoryId: 1356699469,
  });
});

test('enables contributor branch mode only for the exact opt-in flag', () => {
  assert.equal(isContributorBranchMode({}), false);
  assert.equal(isContributorBranchMode({ WIKI_BRANCH_MODE: 'off' }), false);
  assert.equal(isContributorBranchMode({ WIKI_BRANCH_MODE: 'contributor' }), true);
  assert.equal(isContributorBranchMode({ WIKI_BRANCH_MODE: 'CONTRIBUTOR' }), false);
  assert.equal(isContributorBranchMode({ WIKI_BRANCH_MODE: 'unexpected' }), false);
});

test('separates the controlled public ref from the GitHub write branch', () => {
  assert.deepEqual(getWikiRepositoryConfig({
    WIKI_REPO: 'daubas/webmcp-okf',
    WIKI_REF: 'main',
    WIKI_PUBLIC_REF: 'wiki-live',
    WIKI_WRITE_BRANCH: 'contrib/octo/geo',
    WIKI_BRANCH_MODE: 'contributor',
    WIKI_ROOT: '.',
    GITHUB_INSTALLATION_ID: '123',
    GITHUB_REPOSITORY_ID: '1356699469',
  }), {
    owner: 'daubas',
    repo: 'webmcp-okf',
    branch: 'contrib/octo/geo',
    contentRoot: '',
    installationId: 123,
    repositoryId: 1356699469,
  });
  assert.equal(getWikiPublicRef({ WIKI_REF: 'main', WIKI_PUBLIC_REF: 'wiki-live' }), 'wiki-live');
  assert.equal(getWikiProjectionNamespace({ WIKI_REPO: 'daubas/webmcp-okf', WIKI_REF: 'main', WIKI_PUBLIC_REF: 'wiki-live' }), 'daubas/webmcp-okf@wiki-live');
  assert.notEqual(
    getWikiProjectionNamespace({ WIKI_REPO: 'daubas/webmcp-okf', WIKI_REF: 'main' }),
    getWikiProjectionNamespace({ WIKI_REPO: 'daubas/webmcp-okf', WIKI_REF: 'main', WIKI_PUBLIC_REF: 'wiki-live' }),
  );
});

test('rejects missing or malformed repository configuration', () => {
  const base = {
    WIKI_REPO: 'daubas/webmcp-okf',
    WIKI_REF: 'main',
    WIKI_ROOT: '.',
    GITHUB_INSTALLATION_ID: '123',
    GITHUB_REPOSITORY_ID: '1356699469',
  };

  for (const invalid of [
    { ...base, WIKI_REPO: undefined },
    { ...base, WIKI_REPO: 'webmcp-okf' },
    { ...base, WIKI_REPO: '../target' },
    { ...base, WIKI_REPO: 'owner/repo name' },
    { ...base, WIKI_ROOT: '../private' },
    { ...base, WIKI_PUBLIC_REF: 'wiki live' },
    { ...base, WIKI_WRITE_BRANCH: 'contrib//octo' },
    { ...base, WIKI_BRANCH_MODE: 'off', WIKI_WRITE_BRANCH: 'contrib/u-42/geo' },
    { ...base, GITHUB_REPOSITORY_ID: 'not-a-number' },
  ]) {
    assert.throws(() => getWikiRepositoryConfig(invalid), /Wiki repository is not configured/);
  }
});

test('rejects hidden path segments in Git refs', () => {
  assert.equal(isSafeBranch('contrib/u-42/.hidden'), false);
  assert.equal(isSafeBranch('contrib/u-42/topic.lock'), false);
});
