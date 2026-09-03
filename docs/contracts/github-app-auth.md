# GitHub App auth

This framework-neutral library performs GitHub App authentication for a
Cloudflare Worker. It does not create routes, sessions, or cookies.

## Public seam

`createGitHubAppAuth(config)` returns:

- `createAppJwt()` — signs an RS256 App JWT using the configured app ID and
  private key.
- `beginUserAuthorization(state)` — returns the GitHub authorization URL.
- `completeUserAuthorization(callbackUrl, expectedState)` — verifies the
  callback origin and path, checks its one-time state value, exchanges its
  code, and returns `{ accessToken, user: { id, login } }` from `GET /user`.
- `createInstallationToken(installationId, repositoryId)` — returns a
  repository-scoped installation token.

## Security boundary

- `redirectUri` must be a configured HTTPS callback URL with no credentials,
  query, or fragment. The callback must have the same origin and pathname.
- The caller owns a cryptographically random, session-bound, single-use state
  value and supplies it as `expectedState`; the library does not persist it.
- The App private key, client secret, user token, and installation token stay
  server-side. Errors never include their values.
- GitHub's downloaded PKCS#1 RSA PEM and PKCS#8 PEM are accepted; signing uses
  Workers WebCrypto `RSASSA-PKCS1-v1_5` with SHA-256.
