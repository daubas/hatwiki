import assert from 'node:assert/strict';
import test from 'node:test';
import { parseWikiLog } from '../src/lib/wikiLog.ts';

const sample = [
  '## [2026-10-18] verify | concepts/h3-acceleration-lora 依清單修正 5 項',
  '以 python 回 3 份逐字稿驗證。',
  '',
  '## [2026-10-18] compile | 代碼原理解說動畫體系',
  '新增 entities/claude-motion-explainer。',
  '',
  '## 2026-10-16(晚)',
  '- **舊格式條目**：不應被解析。',
  '',
  '## [2026-10-15] ingest | facts/minimax-h3-pricing 新增',
  '價格與日期。',
].join('\n');

test('parses dated headings with date, action, title, body, and pageId', () => {
  const entries = parseWikiLog(sample);

  assert.deepEqual(entries[0], {
    date: '2026-10-18',
    action: 'verify',
    title: 'concepts/h3-acceleration-lora 依清單修正 5 項',
    body: '以 python 回 3 份逐字稿驗證。',
    pageId: 'concepts/h3-acceleration-lora',
  });
});

test('skips old-format headings and keeps file order', () => {
  const entries = parseWikiLog(sample);

  assert.deepEqual(entries.map((entry) => entry.title), [
    'concepts/h3-acceleration-lora 依清單修正 5 項',
    '代碼原理解說動畫體系',
    'facts/minimax-h3-pricing 新增',
  ]);
  assert.equal(entries[2].pageId, 'facts/minimax-h3-pricing');
});

test('limits the number of returned entries', () => {
  const entries = parseWikiLog(sample, 2);

  assert.equal(entries.length, 2);
  assert.deepEqual(entries.map((entry) => entry.title), [
    'concepts/h3-acceleration-lora 依清單修正 5 項',
    '代碼原理解說動畫體系',
  ]);
});

test('uses the first non-empty body line and truncates it to 120 characters', () => {
  const long = 'x'.repeat(200);
  const truncated = parseWikiLog(`## [2026-10-18] verify | concepts/a 標題\n\n\n第一行內容\n${long}`);

  assert.equal(truncated[0].body, '第一行內容');

  const entries = parseWikiLog(`## [2026-10-18] verify | concepts/a 標題\n${long}`);
  assert.equal(entries[0].body.length, 120);
  assert.equal(entries[0].body, 'x'.repeat(120));
});

test('detects pageId only for known lowercase path prefixes', () => {
  const entries = parseWikiLog([
    '## [2026-10-18] verify | entities/minimax-h3 模型頁',
    'body',
    '## [2026-10-17] compile | 一般標題',
    'body',
    '## [2026-10-16] lint | Concepts/upper 大寫開頭',
    'body',
    '## [2026-10-15] query | facts/a_b 底線不在允許字元',
    'body',
  ].join('\n'));

  assert.equal(entries[0].pageId, 'entities/minimax-h3');
  assert.equal('pageId' in entries[1], false);
  assert.equal('pageId' in entries[2], false);
  assert.equal('pageId' in entries[3], false);
});

test('returns an empty array for empty input', () => {
  assert.deepEqual(parseWikiLog(''), []);
  assert.deepEqual(parseWikiLog('', 10), []);
});
