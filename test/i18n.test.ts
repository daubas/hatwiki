import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_LOCALE, getLocale, switchLocaleUrl, t, withLocale } from '../src/lib/i18n.ts';

test('falls back to zh-Hant and preserves the current URL while switching languages', () => {
  assert.equal(getLocale(new URL('https://hatwiki.test/wiki/concepts/hatwiki')), DEFAULT_LOCALE);
  assert.equal(getLocale(new URL('https://hatwiki.test/graph?lang=en')), 'en');
  assert.equal(getLocale(new URL('https://hatwiki.test/graph?lang=ja')), DEFAULT_LOCALE);
  assert.equal(t(getLocale(new URL('https://hatwiki.test/?lang=ja')), 'login'), '登入');

  assert.equal(
    switchLocaleUrl(new URL('https://hatwiki.test/wiki/concepts/hatwiki?tag=geo&lang=en#sources'), DEFAULT_LOCALE),
    '/wiki/concepts/hatwiki?tag=geo#sources',
  );
  assert.equal(
    switchLocaleUrl(new URL('https://hatwiki.test/wiki/concepts/hatwiki?tag=geo#sources'), 'en'),
    '/wiki/concepts/hatwiki?tag=geo&lang=en#sources',
  );
  assert.equal(withLocale('/graph?view=full#top', 'en'), '/graph?view=full&lang=en#top');
  assert.equal(withLocale('/', 'en'), '/?lang=en');
  assert.equal(withLocale('/?lang=en', DEFAULT_LOCALE), '/');
});
