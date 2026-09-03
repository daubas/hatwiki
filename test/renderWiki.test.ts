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
