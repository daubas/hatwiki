import { StalePageError, type RepositoryPage, type WikiRepository } from './editContracts.ts';

type GitHubResponse = {
  status: number;
  json(): Promise<unknown>;
};

type GitHubFetcher = (url: string, init: RequestInit) => Promise<GitHubResponse>;

export type GitHubRepositoryOptions = {
  owner: string;
  repo: string;
  branch: string;
  token: string;
  fetcher: GitHubFetcher;
};

function canonicalSegments(pageId: string): string[] {
  if (typeof pageId !== 'string' || !pageId) throw new Error('Invalid page path');
  const segments = pageId.split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new Error('Invalid page path');
  }
  return segments;
}

function encodeSegments(segments: string[]): string {
  return segments.map((segment) => encodeURIComponent(segment)).join('/');
}

function wikiFileSegments(pageId: string): string[] {
  const segments = canonicalSegments(pageId);
  const last = segments.pop() as string;
  return [...segments, `${last}.md`];
}

function wikiPath(pageId: string): string {
  return `contents/wiki/${encodeSegments(wikiFileSegments(pageId))}`;
}

function wikiRelativePath(pageId: string): string {
  return `wiki/${wikiFileSegments(pageId).join('/')}`;
}

function candidateSegments(pageId: string, requestId: string): string[] {
  if (typeof requestId !== 'string' || !requestId || requestId === '.' || requestId === '..') {
    throw new Error('Invalid candidate path');
  }
  return [...canonicalSegments(pageId), `${requestId}.md`];
}

function candidatePath(pageId: string, requestId: string): string {
  return `contents/candidates/${encodeSegments(candidateSegments(pageId, requestId))}`;
}

function candidateRelativePath(pageId: string, requestId: string): string {
  return `candidates/${candidateSegments(pageId, requestId).join('/')}`;
}

function decodeBase64Utf8(value: string): string {
  const binary = atob(value.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64Utf8(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

async function putContent(
  fetcher: GitHubFetcher,
  url: string,
  headers: Record<string, string>,
  body: Record<string, string>,
  staleOnConflict = false,
): Promise<{ revision: string }> {
  let response: GitHubResponse;
  try {
    response = await fetcher(url, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('GitHub request failed');
  }
  if (staleOnConflict && response.status === 409) throw new StalePageError();
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`GitHub request failed (${response.status})`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error('GitHub response was invalid');
  }
  const revision =
    payload && typeof payload === 'object' &&
    (payload as { commit?: { sha?: unknown } }).commit &&
    typeof (payload as { commit: { sha?: unknown } }).commit.sha === 'string'
      ? (payload as { commit: { sha: string } }).commit.sha
      : undefined;
  if (!revision) throw new Error('GitHub response was invalid');
  return { revision };
}

export function createGitHubRepository(options: GitHubRepositoryOptions): WikiRepository {
  const fetcher = options.fetcher;
  const apiBase = `https://api.github.com/repos/${encodeURIComponent(options.owner)}/${encodeURIComponent(options.repo)}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${options.token}`,
    'User-Agent': 'HatWiki-WebMCP',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const findCommitRevision = async (
    relativePath: string,
    requestId: string,
    identity?: { actorUserId: number; sourceTaskId?: string },
  ): Promise<string | null> => {
    const url = `${apiBase}/commits?path=${encodeURIComponent(relativePath)}&sha=${encodeURIComponent(options.branch)}&per_page=100`;
    let response: GitHubResponse;
    try {
      response = await fetcher(url, { method: 'GET', headers });
    } catch {
      throw new Error('GitHub request failed');
    }
    if (response.status === 404) return null;
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`GitHub request failed (${response.status})`);
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new Error('GitHub response was invalid');
    }
    if (!Array.isArray(payload)) throw new Error('GitHub response was invalid');
    const trailers = [`HatWiki-Request-ID: ${requestId}`];
    if (identity) trailers.push(`HatWiki-User-ID: ${identity.actorUserId}`);
    if (identity?.sourceTaskId) trailers.push(`HatWiki-Source-Task: ${identity.sourceTaskId}`);
    for (const entry of payload) {
      if (
        entry && typeof entry === 'object' &&
        typeof (entry as { sha?: unknown }).sha === 'string' &&
        (entry as { commit?: unknown }).commit &&
        typeof (entry as { commit: { message?: unknown } }).commit.message === 'string' &&
        trailers.every((trailer) => (entry as { commit: { message: string } }).commit.message.split(/\r?\n/).includes(trailer))
        && (!identity || identity.sourceTaskId !== undefined || !(entry as { commit: { message: string } }).commit.message.split(/\r?\n/).some((line) => line.startsWith('HatWiki-Source-Task: ')))
      ) {
        return (entry as { sha: string }).sha;
      }
    }
    return null;
  };

  return {
    async readPage(pageId: string, ref = options.branch): Promise<RepositoryPage | null> {
      const url = `${apiBase}/${wikiPath(pageId)}?ref=${encodeURIComponent(ref)}`;
      let response: GitHubResponse;
      try {
        response = await fetcher(url, { method: 'GET', headers });
      } catch {
        throw new Error('GitHub request failed');
      }
      if (response.status === 404) return null;
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`GitHub request failed (${response.status})`);
      }

      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        throw new Error('GitHub response was invalid');
      }
      if (
        !payload ||
        typeof payload !== 'object' ||
        typeof (payload as { sha?: unknown }).sha !== 'string' ||
        typeof (payload as { content?: unknown }).content !== 'string'
      ) {
        throw new Error('GitHub response was invalid');
      }
      const file = payload as { sha: string; content: string };
      return { sha: file.sha, content: decodeBase64Utf8(file.content) };
    },

    async findRequestRevision(pageId: string, requestId: string, identity) {
      const pagePath = wikiRelativePath(pageId);
      const candidateFilePath = candidateRelativePath(pageId, requestId);
      const pageRevision = await findCommitRevision(pagePath, requestId, identity);
      if (pageRevision) return { kind: 'page' as const, revision: pageRevision };
      const candidateRevision = await findCommitRevision(candidateFilePath, requestId, identity);
      if (candidateRevision) return { kind: 'candidate' as const, revision: candidateRevision };
      return null;
    },

    async commitPage(input: { pageId: string; baseSha: string; content: string; message: string }) {
      return putContent(fetcher, `${apiBase}/${wikiPath(input.pageId)}`, headers, {
        message: input.message,
        content: encodeBase64Utf8(input.content),
        branch: options.branch,
        sha: input.baseSha,
      }, true);
    },

    async saveCandidate(input: { pageId: string; content: string; requestId: string; message: string }) {
      return putContent(fetcher, `${apiBase}/${candidatePath(input.pageId, input.requestId)}`, headers, {
        message: input.message,
        content: encodeBase64Utf8(input.content),
        branch: options.branch,
      });
    },
  };
}
