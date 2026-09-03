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

test('renders unpublished raw evidence references as non-clickable text', async () => {
  const html = await renderWiki('[Raw capture](/raw/source.md)');

  assert.match(html, /<span class="source-unavailable">Raw capture<\/span>/);
  assert.doesNotMatch(html, /<a /);
});
