import assert from 'node:assert/strict';
import test from 'node:test';

import { createOAuthState, localeFromOAuthState, readOAuthState } from '../src/lib/oauthState.ts';

test('binds the locale into a host-bound OAuth state cookie', () => {
  const english = createOAuthState('en');
  const traditional = createOAuthState('zh-Hant');

  assert.equal(english.state.length, 43);
  assert.equal(traditional.state.length, 43);
  assert.equal(english.state[0], 'e');
  assert.equal(traditional.state[0], 'z');
  assert.equal(/^[A-Za-z0-9_-]{42}$/.test(english.state.slice(1)), true);
  assert.equal(/^[A-Za-z0-9_-]{42}$/.test(traditional.state.slice(1)), true);
  assert.match(english.cookie, /^__Host-hatwiki_oauth_state=/);
  assert.match(english.cookie, /HttpOnly; Secure; SameSite=Lax/);
  assert.equal(localeFromOAuthState(readOAuthState(`other=x; ${english.cookie}`)), 'en');
  assert.equal(localeFromOAuthState(readOAuthState(traditional.cookie)), 'zh-Hant');
  assert.equal(readOAuthState('other=x'), null);
});
