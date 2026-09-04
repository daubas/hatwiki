import assert from 'node:assert/strict';
import test from 'node:test';
import { wikiLoaderOptions } from '../src/lib/wikiLoader.ts';

test('chooses bundled or safe external wiki loader options', () => {
  assert.deepEqual(wikiLoaderOptions(undefined), {
    base: './wiki',
    pattern: '**/*.md',
  });

  assert.deepEqual(wikiLoaderOptions('/tmp/xdxd-geo-okf-kb'), {
    base: '/tmp/xdxd-geo-okf-kb',
    pattern: [
      '{overview,CONTEXT,SCHEMA}.md',
      '{concepts,entities,methods,guides,comparisons,experiments}/**/*.md',
      '!**/raw/**',
      '!**/index.md',
      '!**/log.md',
    ],
  });
});
