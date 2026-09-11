export type WikiRepositoryEnv = {
  WIKI_REPO?: string;
  WIKI_REF?: string;
  WIKI_PUBLIC_REF?: string;
  WIKI_WRITE_BRANCH?: string;
  WIKI_BRANCH_MODE?: string;
  WIKI_ROOT?: string;
  GITHUB_INSTALLATION_ID?: string;
  GITHUB_REPOSITORY_ID?: string;
};

export function isSafeBranch(value: unknown): value is string {
  return typeof value === 'string'
    && value.length > 0
    && value.length <= 255
    && value === value.trim()
    && value !== '@'
    && !value.startsWith('/')
    && !value.endsWith('/')
    && !value.startsWith('.')
    && !value.endsWith('.')
    && !value.includes('..')
    && !value.includes('//')
    && !value.includes('@{')
    && !value.split('/').some((part) => part.startsWith('.') || part.endsWith('.lock'))
    && !/[~^:?*[\\\s\u0000-\u001f\u007f]/.test(value);
}

export function isContributorBranch(value: unknown): value is string {
  return typeof value === 'string'
    && /^contrib\/u-[1-9]\d{0,15}\/[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(value);
}

export function contributorBranchFor(userId: number, topic: string): string {
  if (!Number.isSafeInteger(userId) || userId <= 0 || typeof topic !== 'string') throw new Error('Invalid contribution branch');
  const trimmed = topic.trim();
  if (!trimmed || trimmed.length > 160 || /[\\/\u0000-\u001f\u007f]/.test(trimmed) || trimmed.includes('..')) {
    throw new Error('Invalid contribution branch');
  }
  const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (!slug || slug.length > 63 || ['main', 'wiki-live', 'head'].includes(slug)) throw new Error('Invalid contribution branch');
  const branch = `contrib/u-${userId}/${slug}`;
  if (!isSafeBranch(branch) || !isContributorBranch(branch)) throw new Error('Invalid contribution branch');
  return branch;
}

export function isContributorBranchMode(env: Pick<WikiRepositoryEnv, 'WIKI_BRANCH_MODE'>): boolean {
  return env.WIKI_BRANCH_MODE === 'contributor';
}

export function isLiveBranchMode(env: Pick<WikiRepositoryEnv, 'WIKI_BRANCH_MODE'>): boolean {
  return env.WIKI_BRANCH_MODE === 'live';
}

export function getWikiPublicRef(env: Pick<WikiRepositoryEnv, 'WIKI_REF' | 'WIKI_PUBLIC_REF'>): string {
  const ref = env.WIKI_PUBLIC_REF ?? env.WIKI_REF;
  if (!isSafeBranch(ref)) throw new Error('Wiki repository is not configured');
  return ref;
}

export function getWikiProjectionNamespace(env: Pick<WikiRepositoryEnv, 'WIKI_REPO' | 'WIKI_REF' | 'WIKI_PUBLIC_REF'>): string {
  const repository = env.WIKI_REPO?.match(/^([A-Za-z0-9._-]+)\/([A-Za-z0-9._-]+)$/);
  if (!repository || repository[1] === '.' || repository[1] === '..' || repository[2] === '.' || repository[2] === '..') {
    throw new Error('Wiki repository is not configured');
  }
  return `${repository[1]}/${repository[2]}@${getWikiPublicRef(env)}`;
}

export function getWikiRepositoryConfig(env: WikiRepositoryEnv) {
  const repository = env.WIKI_REPO?.match(/^([A-Za-z0-9._-]+)\/([A-Za-z0-9._-]+)$/);
  const installationId = Number(env.GITHUB_INSTALLATION_ID);
  const repositoryId = Number(env.GITHUB_REPOSITORY_ID);
  const root = env.WIKI_ROOT === '.' ? '' : env.WIKI_ROOT;
  const branch = env.WIKI_WRITE_BRANCH ?? env.WIKI_REF;
  const publicRef = getWikiPublicRef(env);
  const contributorMode = isContributorBranchMode(env);
  const liveMode = isLiveBranchMode(env);
  const knownBranchMode = env.WIKI_BRANCH_MODE === undefined || env.WIKI_BRANCH_MODE === 'off' || contributorMode || liveMode;
  const unsafeWriteBranch = !isSafeBranch(branch)
    || (!contributorMode && branch.startsWith('contrib/'))
    || (!liveMode && branch === 'wiki-live');
  const safeRoot = root === '' || Boolean(root && root.split('/').every((part) => part && part !== '.' && part !== '..'));

  if (
    !repository || repository[1] === '.' || repository[1] === '..' || repository[2] === '.' || repository[2] === '..' ||
    !knownBranchMode || unsafeWriteBranch || !safeRoot ||
    (liveMode && (publicRef !== 'wiki-live' || branch !== 'wiki-live')) ||
    !Number.isSafeInteger(installationId) || installationId <= 0 ||
    !Number.isSafeInteger(repositoryId) || repositoryId <= 0
  ) throw new Error('Wiki repository is not configured');

  return {
    owner: repository[1],
    repo: repository[2],
    branch,
    contentRoot: root as string,
    installationId,
    repositoryId,
  };
}
