import assert from 'node:assert/strict';
import test from 'node:test';

import { createSessionCookie, readSessionCookie } from '../src/lib/sessionCookie.ts';

test('round-trips a signed GitHub identity in a secure cookie', async () => {
  const cookie = await createSessionCookie(
    'secret-at-least-32-characters-long',
    { userId: 6070892, login: 'daubas' },
    new Date('2026-09-03T12:00:00Z'),
  );

  assert.match(cookie, /^__Host-hatwiki_session=/);
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /Secure/);
  assert.match(cookie, /SameSite=Lax/);
  assert.deepEqual(
    await readSessionCookie('secret-at-least-32-characters-long', cookie, new Date('2026-09-03T13:00:00Z')),
    { userId: 6070892, login: 'daubas' },
  );
});

test('rejects tampered, expired, and weakly configured sessions', async () => {
  const secret = 'secret-at-least-32-characters-long';
  const cookie = await createSessionCookie(secret, { userId: 7, login: 'octo' }, new Date('2026-09-03T12:00:00Z'));
  const tampered = cookie.replace('__Host-hatwiki_session=', '__Host-hatwiki_session=x');

  assert.equal(await readSessionCookie(secret, tampered, new Date('2026-09-03T13:00:00Z')), null);
  assert.equal(await readSessionCookie(secret, cookie, new Date('2026-09-04T13:00:01Z')), null);
  assert.equal(await readSessionCookie(secret, 'other=value', new Date('2026-09-03T13:00:00Z')), null);
  await assert.rejects(createSessionCookie('short', { userId: 7, login: 'octo' }), /invalid_secret/);
});
