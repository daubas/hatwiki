import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import test from 'node:test';
import { createGitHubAppAuth } from '../src/lib/githubAppAuth.ts';

function base64UrlBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

test('creates a verifiable RS256 App JWT from a GitHub PKCS#1 private key', async () => {
  const pair = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const privateKeyPem = pair.privateKey.export({ format: 'pem', type: 'pkcs1' }).toString();
  const publicKey = await crypto.subtle.importKey(
    'spki',
    pair.publicKey.export({ format: 'der', type: 'spki' }),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  const auth = createGitHubAppAuth({
    appId: 'app-123',
    clientId: 'client-123',
    clientSecret: 'client-secret',
    privateKeyPem,
    redirectUri: 'https://wiki.example/auth/github/callback',
    now: () => 1_700_000_000_000,
  });

  const jwt = await auth.createAppJwt();
  const [header, payload, signature] = jwt.split('.');

  assert.deepEqual(JSON.parse(new TextDecoder().decode(base64UrlBytes(header))), {
    alg: 'RS256',
    typ: 'JWT',
  });
  assert.deepEqual(JSON.parse(new TextDecoder().decode(base64UrlBytes(payload))), {
    iat: 1_699_999_940,
    exp: 1_700_000_540,
    iss: 'app-123',
  });
  assert.equal(
    await crypto.subtle.verify(
      { name: 'RSASSA-PKCS1-v1_5' },
      publicKey,
      base64UrlBytes(signature),
      new TextEncoder().encode(`${header}.${payload}`),
    ),
    true,
  );
});

test('exchanges a verified callback code and returns the GitHub user identity', async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const auth = createGitHubAppAuth({
    appId: 'app-123',
    clientId: 'client-123',
    clientSecret: 'client-secret',
    privateKeyPem: 'unused',
    redirectUri: 'https://wiki.example/auth/github/callback',
    fetcher: async (url, init) => {
      calls.push({ url, init });
      if (url === 'https://github.com/login/oauth/access_token') {
        return new Response(JSON.stringify({ access_token: 'user-token', token_type: 'bearer' }));
      }
      if (url === 'https://api.github.com/user') {
        return new Response(JSON.stringify({ id: 42, login: 'octocat' }));
      }
      return new Response(null, { status: 404 });
    },
  });

  const authorizationUrl = new URL(auth.beginUserAuthorization('state-123'));
  const result = await auth.completeUserAuthorization(
    'https://wiki.example/auth/github/callback?code=code-123&state=state-123',
    'state-123',
  );

  assert.equal(authorizationUrl.origin, 'https://github.com');
  assert.equal(authorizationUrl.pathname, '/login/oauth/authorize');
  assert.deepEqual(Object.fromEntries(authorizationUrl.searchParams), {
    client_id: 'client-123',
    redirect_uri: 'https://wiki.example/auth/github/callback',
    state: 'state-123',
  });
  assert.deepEqual(result, { accessToken: 'user-token', user: { id: 42, login: 'octocat' } });
  assert.deepEqual(calls, [
    {
      url: 'https://github.com/login/oauth/access_token',
      init: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'client_id=client-123&client_secret=client-secret&code=code-123&redirect_uri=https%3A%2F%2Fwiki.example%2Fauth%2Fgithub%2Fcallback',
        redirect: 'error',
      },
    },
    {
      url: 'https://api.github.com/user',
      init: {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: 'Bearer user-token',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        redirect: 'error',
      },
    },
  ]);
});

test('rejects untrusted state and callback redirects before exchanging a code', async () => {
  const calls: string[] = [];
  const auth = createGitHubAppAuth({
    appId: 'app-123',
    clientId: 'client-123',
    clientSecret: 'client-secret',
    privateKeyPem: 'unused',
    redirectUri: 'https://wiki.example/auth/github/callback',
    fetcher: async (url) => {
      calls.push(url);
      return new Response('{}');
    },
  });

  assert.throws(() => auth.beginUserAuthorization(' state-123 '), /invalid_state/);
  for (const [callbackUrl, expectedState, error] of [
    ['https://attacker.example/auth/github/callback?code=code-123&state=state-123', 'state-123', /invalid_redirect/],
    ['https://wiki.example/auth/other?code=code-123&state=state-123', 'state-123', /invalid_redirect/],
    ['https://wiki.example/auth/github/callback?code=code-123&state=wrong', 'state-123', /invalid_state/],
    ['https://wiki.example/auth/github/callback?code=code-123&state=state-123&state=again', 'state-123', /invalid_state/],
    ['https://wiki.example/auth/github/callback?code=code-123&state=%20state-123%20', ' state-123 ', /invalid_state/],
    ['https://wiki.example/auth/github/callback?code=code-123&state=state%00x', 'state\u0000x', /invalid_state/],
  ] as const) {
    await assert.rejects(auth.completeUserAuthorization(callbackUrl, expectedState), error);
  }

  assert.deepEqual(calls, []);
});

test('creates a repository-scoped installation token with an App JWT', async () => {
  const pair = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const privateKeyPem = pair.privateKey.export({ format: 'pem', type: 'pkcs1' }).toString();
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const auth = createGitHubAppAuth({
    appId: 'app-123',
    clientId: 'client-123',
    clientSecret: 'client-secret',
    privateKeyPem,
    redirectUri: 'https://wiki.example/auth/github/callback',
    now: () => 1_700_000_000_000,
    fetcher: async (url, init) => {
      calls.push({ url, init });
      return new Response(JSON.stringify({
        token: 'installation-token',
        expires_at: '2026-09-03T02:00:00Z',
      }));
    },
  });

  const result = await auth.createInstallationToken(99, 1234);

  assert.deepEqual(result, {
    token: 'installation-token',
    expiresAt: '2026-09-03T02:00:00Z',
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.github.com/app/installations/99/access_tokens');
  assert.deepEqual(calls[0].init, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: (calls[0].init.headers as Record<string, string>).Authorization,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ repository_ids: [1234], permissions: { contents: 'write' } }),
    redirect: 'error',
  });
  const authorization = (calls[0].init.headers as Record<string, string>).Authorization;
  assert.match(authorization, /^Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9\./);
});
