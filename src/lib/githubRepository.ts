import { StalePageError, type RepositoryPage } from './editContracts.ts';
import { isContributorBranch, isSafeBranch } from './wikiRepositoryConfig.ts';

type GitHubResponse = {
  status: number;
  json(): Promise<unknown>;
};

type GitHubFetcher = (url: string, init: RequestInit) => Promise<GitHubResponse>;

export type GitHubRepositoryOptions = {
  owner: string;
  repo: string;
  branch: string;
  contentRoot?: string;
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

function wikiPath(pageId: string, contentRoot: string): string {
  return `contents/${contentRoot ? `${encodeSegments(contentRoot.split('/'))}/` : ''}${encodeSegments(wikiFileSegments(pageId))}`;
}

function wikiRelativePath(pageId: string, contentRoot: string): string {
  return `${contentRoot ? `${contentRoot}/` : ''}${wikiFileSegments(pageId).join('/')}`;
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

function refSha(payload: unknown): string {
  const sha = payload && typeof payload === 'object'
    && (payload as { object?: { sha?: unknown } }).object
    && typeof (payload as { object: { sha?: unknown } }).object.sha === 'string'
    ? (payload as { object: { sha: string } }).object.sha
    : undefined;
  if (!sha || !/^[a-f\d]{40,64}$/i.test(sha)) throw new Error('GitHub response was invalid');
  return sha;
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

export function createGitHubRepository(options: GitHubRepositoryOptions) {
  const fetcher = options.fetcher;
  const apiBase = `https://api.github.com/repos/${encodeURIComponent(options.owner)}/${encodeURIComponent(options.repo)}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${options.token}`,
    'User-Agent': 'HatWiki-WebMCP',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const readRef = async (ref: string): Promise<string | null> => {
    let response: GitHubResponse;
    try {
      response = await fetcher(`${apiBase}/git/ref/heads/${encodeURIComponent(ref)}`, { method: 'GET', headers });
    } catch {
      throw new Error('GitHub request failed');
    }
    if (response.status === 404) return null;
    if (response.status < 200 || response.status >= 300) throw new Error(`GitHub request failed (${response.status})`);
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new Error('GitHub response was invalid');
    }
    return refSha(payload);
  };

  const createRef = async (branch: string, sha: string): Promise<string | null> => {
    let response: GitHubResponse;
    try {
      response = await fetcher(`${apiBase}/git/refs`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha }),
      });
    } catch {
      throw new Error('GitHub request failed');
    }
    if (response.status === 409 || response.status === 422) return null;
    if (response.status < 200 || response.status >= 300) throw new Error(`GitHub request failed (${response.status})`);
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new Error('GitHub response was invalid');
    }
    return refSha(payload);
  };

  const findCommitRevision = async (
    relativePath: string,
    requestId: string,
    identity?: { actorUserId: number; sourceTaskId?: string },
    ref?: string,
  ): Promise<string | null> => {
    const branch = ref ?? options.branch;
    if (!isSafeBranch(branch)) throw new Error('Invalid branch reference');
    const url = `${apiBase}/commits?path=${encodeURIComponent(relativePath)}&sha=${encodeURIComponent(branch)}&per_page=100`;
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

  const contentRoot = options.contentRoot ?? 'wiki';
  return {
    async ensureBranch({ branch, baseRef }: { branch: string; baseRef?: string }) {
      if (!isContributorBranch(branch)) throw new Error('Invalid contribution branch');
      if (baseRef !== undefined && !isSafeBranch(baseRef)) throw new Error('Invalid branch reference');

      const existing = await readRef(branch);
      if (existing) return { branch, sha: existing, created: false };

      const baseRefs = baseRef === undefined
        ? ['wiki-live', 'main']
        : [baseRef, ...['wiki-live', 'main'].filter((ref) => ref !== baseRef)];
      for (const candidateBaseRef of baseRefs) {
        const baseSha = await readRef(candidateBaseRef);
        if (!baseSha) continue;
        const created = await createRef(branch, baseSha);
        if (created) return { branch, sha: created, created: true, baseRef: candidateBaseRef };
        const raced = await readRef(branch);
        if (raced) return { branch, sha: raced, created: false };
        throw new Error('GitHub branch creation conflict');
      }
      throw new Error('GitHub base branch was not found');
    },

    async readPage(pageId: string, ref = options.branch): Promise<RepositoryPage | null> {
      if (!isSafeBranch(ref)) throw new Error('Invalid branch reference');
      const url = `${apiBase}/${wikiPath(pageId, contentRoot)}?ref=${encodeURIComponent(ref)}`;
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

    async findRequestRevision(pageId: string, requestId: string, identity, ref?: string) {
      const pagePath = wikiRelativePath(pageId, contentRoot);
      const candidateFilePath = candidateRelativePath(pageId, requestId);
      const pageRevision = await findCommitRevision(pagePath, requestId, identity, ref);
      if (pageRevision) return { kind: 'page' as const, revision: pageRevision };
      const candidateRevision = await findCommitRevision(candidateFilePath, requestId, identity, ref);
      if (candidateRevision) return { kind: 'candidate' as const, revision: candidateRevision };
      return null;
    },

    async commitPage(input: { pageId: string; baseSha: string; content: string; message: string; ref?: string }) {
      const branch = input.ref ?? options.branch;
      if (!isSafeBranch(branch)) throw new Error('Invalid branch reference');
      return putContent(fetcher, `${apiBase}/${wikiPath(input.pageId, contentRoot)}`, headers, {
        message: input.message,
        content: encodeBase64Utf8(input.content),
        branch,
        sha: input.baseSha,
      }, true);
    },

    async saveCandidate(input: { pageId: string; content: string; requestId: string; message: string; ref?: string }) {
      const branch = input.ref ?? options.branch;
      if (!isSafeBranch(branch)) throw new Error('Invalid branch reference');
      return putContent(fetcher, `${apiBase}/${candidatePath(input.pageId, input.requestId)}`, headers, {
        message: input.message,
        content: encodeBase64Utf8(input.content),
        branch,
      });
    },
  };
}
