import assert from 'node:assert/strict';
import test from 'node:test';

import { getWikiRepositoryConfig } from '../src/lib/wikiRepositoryConfig.ts';

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
    { ...base, GITHUB_REPOSITORY_ID: 'not-a-number' },
  ]) {
    assert.throws(() => getWikiRepositoryConfig(invalid), /Wiki repository is not configured/);
  }
});
