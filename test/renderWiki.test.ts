import assert from 'node:assert/strict';
import test from 'node:test';

import { renderWiki } from '../src/lib/renderWiki.ts';

test('renders WikiLinks without executing untrusted HTML', async () => {
  const html = await renderWiki(
    '# Hello\n\nSee [[concepts/hatwiki|HatWiki]].\n\n<script>alert("xss")</script>',
  );

  assert.match(html, /<h1>Hello<\/h1>/);
  assert.match(html, /href="\/wiki\/concepts\/hatwiki"/);
  assert.doesNotMatch(html, /<script/i);
  assert.match(html, /&lt;script&gt;/);
});

test('routes root-relative Markdown links through the Wiki reader', async () => {
  const html = await renderWiki('[Evidence](/methods/evidence-lifecycle.md)');

  assert.match(html, /href="\/wiki\/methods\/evidence-lifecycle"/);
});

test('routes relative Markdown links from the current Wiki page', async () => {
  const sibling = await renderWiki('[WebMCP](webmcp.md)', 'concepts/tool-registration');
  const parent = await renderWiki('[MCP](../entities/model-context-protocol.md)', 'concepts/webmcp');

  assert.match(sibling, /href="\/wiki\/concepts\/webmcp"/);
  assert.match(parent, /href="\/wiki\/entities\/model-context-protocol"/);
});

test('renders unpublished raw evidence references as non-clickable text', async () => {
  const html = await renderWiki('[Raw capture](/raw/source.md)');

  assert.match(html, /<span class="source-unavailable">Raw capture<\/span>/);
  assert.doesNotMatch(html, /<a /);
});

test('keeps relative private evidence links non-clickable', async () => {
  const html = await renderWiki('[Raw](../raw/source.md) [Extracted](../extracted/source.md)', 'concepts/page');

  assert.match(html, /<span class="source-unavailable">Raw<\/span>/);
  assert.match(html, /<span class="source-unavailable">Extracted<\/span>/);
  assert.doesNotMatch(html, /<a /);
});

test('renders private source citations as non-clickable references', async () => {
  const html = await renderWiki('Text[^source-task-1]\n\n[^source-task-1]: Private note.');
  assert.match(html, /<span class="source-unavailable">\[source-task-1\]<\/span>/);
  assert.doesNotMatch(html, /href="Private note/);
});

test('renders OKF source footnotes as readable references instead of raw Markdown', async () => {
  const html = await renderWiki(
    'HatWiki is Git-native.[^hatwiki-readme]\n\n[^hatwiki-readme]: [HatWiki README](https://github.com/daubas/hatwiki/blob/main/README.md).',
  );

  assert.match(html, /class="citation-ref"/);
  assert.match(html, /class="citation-definition"/);
  assert.match(html, /href="https:\/\/github\.com\/daubas\/hatwiki\/blob\/main\/README\.md"/);
  assert.doesNotMatch(html, /\[\^hatwiki-readme\]/);
});
