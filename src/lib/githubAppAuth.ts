export type GitHubAppAuthOptions = {
  appId: string;
  clientId: string;
  clientSecret: string;
  privateKeyPem: string;
  redirectUri: string;
  fetcher?: (url: string, init: RequestInit) => Promise<Response>;
  now?: () => number;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function derLength(length: number): Uint8Array {
  if (length < 128) return Uint8Array.of(length);
  const bytes: number[] = [];
  while (length > 0) {
    bytes.unshift(length & 0xff);
    length >>>= 8;
  }
  return Uint8Array.of(0x80 | bytes.length, ...bytes);
}

function joinBytes(...parts: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(parts.reduce((length, part) => length + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function pkcs1ToPkcs8(pkcs1: Uint8Array): Uint8Array {
  const version = Uint8Array.of(0x02, 0x01, 0x00);
  const rsaAlgorithm = Uint8Array.of(
    0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00,
  );
  const privateKey = joinBytes(Uint8Array.of(0x04), derLength(pkcs1.length), pkcs1);
  const body = joinBytes(version, rsaAlgorithm, privateKey);
  return joinBytes(Uint8Array.of(0x30), derLength(body.length), body);
}

function privateKeyBytes(pem: string): Uint8Array {
  const match = /^-----BEGIN (RSA )?PRIVATE KEY-----\s+([A-Za-z0-9+/=\s]+?)\s+-----END (RSA )?PRIVATE KEY-----$/.exec(pem.trim());
  if (!match || match[1] !== match[3]) throw new Error('invalid_private_key');

  try {
    const bytes = Uint8Array.from(atob(match[2].replace(/\s/g, '')), (character) => character.charCodeAt(0));
    return match[1] ? pkcs1ToPkcs8(bytes) : bytes;
  } catch {
    throw new Error('invalid_private_key');
  }
}

async function signingKey(pem: string): Promise<CryptoKey> {
  try {
    return await crypto.subtle.importKey(
      'pkcs8',
      privateKeyBytes(pem),
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign'],
    );
  } catch {
    throw new Error('invalid_private_key');
  }
}

function configuredRedirect(redirectUri: string): URL {
  let url: URL;
  try {
    url = new URL(redirectUri);
  } catch {
    throw new Error('invalid_redirect');
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('invalid_redirect');
  }
  return url;
}

function requiredParameter(url: URL, name: string, error: string): string {
  const values = url.searchParams.getAll(name);
  if (values.length !== 1 || values[0].trim().length === 0 || /[\u0000-\u001f\u007f]/.test(values[0])) throw new Error(error);
  return values[0];
}

function validState(state: unknown): state is string {
  return typeof state === 'string' && state.trim().length > 0 && state === state.trim() && !/[\u0000-\u001f\u007f]/.test(state);
}

async function githubJson(fetcher: NonNullable<GitHubAppAuthOptions['fetcher']>, url: string, init: RequestInit): Promise<unknown> {
  let response: Response;
  try {
    response = await fetcher(url, init);
  } catch {
    throw new Error('github_auth_failed');
  }
  if (!response.ok) throw new Error('github_auth_failed');
  try {
    return await response.json();
  } catch {
    throw new Error('github_auth_failed');
  }
}

function userIdentity(payload: unknown): { id: number; login: string } {
  if (
    !payload || typeof payload !== 'object' ||
    !Number.isSafeInteger((payload as { id?: unknown }).id) ||
    (payload as { id: number }).id <= 0 ||
    typeof (payload as { login?: unknown }).login !== 'string' ||
    !(payload as { login: string }).login.trim() ||
    (payload as { login: string }).login.trim() !== (payload as { login: string }).login ||
    /[\r\n]/.test((payload as { login: string }).login)
  ) {
    throw new Error('github_auth_failed');
  }
  const identity = payload as { id: number; login: string };
  return { id: identity.id, login: identity.login };
}

function positiveInteger(value: unknown): value is number {
  return Number.isSafeInteger(value) && value > 0;
}

export function createGitHubAppAuth(options: GitHubAppAuthOptions) {
  const redirect = configuredRedirect(options.redirectUri);
  const fetcher = options.fetcher ?? fetch;

  const createAppJwt = async (): Promise<string> => {
    const now = Math.floor((options.now?.() ?? Date.now()) / 1000);
    const header = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
    const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({
      iat: now - 60,
      exp: now + 540,
      iss: options.appId,
    })));
    const input = `${header}.${payload}`;
    const signature = await crypto.subtle.sign(
      { name: 'RSASSA-PKCS1-v1_5' },
      await signingKey(options.privateKeyPem),
      new TextEncoder().encode(input),
    );
    return `${input}.${bytesToBase64Url(new Uint8Array(signature))}`;
  };

  return {
    createAppJwt,

    beginUserAuthorization(state: string): string {
      if (!validState(state)) throw new Error('invalid_state');
      const url = new URL('https://github.com/login/oauth/authorize');
      url.searchParams.set('client_id', options.clientId);
      url.searchParams.set('redirect_uri', redirect.toString());
      url.searchParams.set('state', state);
      return url.toString();
    },

    async completeUserAuthorization(callbackUrl: string, expectedState: string) {
      let callback: URL;
      try {
        callback = new URL(callbackUrl);
      } catch {
        throw new Error('invalid_redirect');
      }
      if (
        callback.origin !== redirect.origin ||
        callback.pathname !== redirect.pathname ||
        callback.username || callback.password || callback.hash
      ) {
        throw new Error('invalid_redirect');
      }

      const code = requiredParameter(callback, 'code', 'invalid_callback');
      const state = requiredParameter(callback, 'state', 'invalid_state');
      if (!validState(expectedState) || state !== expectedState) throw new Error('invalid_state');

      const tokenPayload = await githubJson(fetcher, 'https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: options.clientId,
          client_secret: options.clientSecret,
          code,
          redirect_uri: redirect.toString(),
        }).toString(),
        redirect: 'manual',
      });
      const accessToken =
        tokenPayload && typeof tokenPayload === 'object' &&
        typeof (tokenPayload as { access_token?: unknown }).access_token === 'string' &&
        (tokenPayload as { access_token: string }).access_token.trim()
          ? (tokenPayload as { access_token: string }).access_token
          : undefined;
      if (!accessToken) throw new Error('github_auth_failed');

      const user = userIdentity(await githubJson(fetcher, 'https://api.github.com/user', {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'HatWiki-WebMCP',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        redirect: 'manual',
      }));
      return { accessToken, user };
    },

    async createInstallationToken(installationId: number, repositoryId: number) {
      if (!positiveInteger(installationId) || !positiveInteger(repositoryId)) {
        throw new Error('invalid_installation');
      }
      const payload = await githubJson(
        fetcher,
        `https://api.github.com/app/installations/${installationId}/access_tokens`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${await createAppJwt()}`,
            'Content-Type': 'application/json',
            'User-Agent': 'HatWiki-WebMCP',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          body: JSON.stringify({ repository_ids: [repositoryId], permissions: { contents: 'write' } }),
          redirect: 'manual',
        },
      );
      if (
        !payload || typeof payload !== 'object' ||
        typeof (payload as { token?: unknown }).token !== 'string' ||
        !(payload as { token: string }).token.trim() ||
        typeof (payload as { expires_at?: unknown }).expires_at !== 'string' ||
        !(payload as { expires_at: string }).expires_at.trim()
      ) {
        throw new Error('github_auth_failed');
      }
      const token = payload as { token: string; expires_at: string };
      return { token: token.token, expiresAt: token.expires_at };
    },
  };
}
