import assert from 'node:assert/strict';
import test from 'node:test';

import { createOAuthState, readOAuthState } from '../src/lib/oauthState.ts';

test('creates a host-bound OAuth state cookie and reads it back', () => {
  const { state, cookie } = createOAuthState();

  assert.match(state, /^[A-Za-z0-9_-]{43}$/);
  assert.match(cookie, /^__Host-hatwiki_oauth_state=/);
  assert.match(cookie, /HttpOnly; Secure; SameSite=Lax/);
  assert.equal(readOAuthState(`other=x; ${cookie}`), state);
  assert.equal(readOAuthState('other=x'), null);
});
