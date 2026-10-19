import assert from 'node:assert/strict';
import test from 'node:test';

import { extractWikiIntro } from '../src/lib/wikiIntro.ts';

test('takes the first paragraph under the H1 and skips frontmatter', () => {
  const intro = extractWikiIntro('---\nokf_version: "0.2"\n---\n\n# KB 名稱\n\n第一段說明。\n接續同一段。\n\n第二段不取。\n');
  assert.deepEqual(intro, { title: 'KB 名稱', text: '第一段說明。 接續同一段。' });
});

test('strips links and bold from the intro text', () => {
  const intro = extractWikiIntro('# T\n\n見 [AGENTS](AGENTS.md) 與 **重點**。\n');
  assert.equal(intro?.text, '見 AGENTS 與 重點。');
});

test('returns undefined without an H1 or paragraph', () => {
  assert.equal(extractWikiIntro('沒有標題'), undefined);
  assert.equal(extractWikiIntro('# T\n\n- 只有清單\n'), undefined);
  assert.equal(extractWikiIntro(''), undefined);
});
