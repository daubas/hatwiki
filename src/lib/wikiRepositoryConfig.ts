export type WikiRepositoryEnv = {
  WIKI_REPO?: string;
  WIKI_REF?: string;
  WIKI_ROOT?: string;
  GITHUB_INSTALLATION_ID?: string;
  GITHUB_REPOSITORY_ID?: string;
};

export function getWikiRepositoryConfig(env: WikiRepositoryEnv) {
  const repository = env.WIKI_REPO?.match(/^([A-Za-z0-9._-]+)\/([A-Za-z0-9._-]+)$/);
  const installationId = Number(env.GITHUB_INSTALLATION_ID);
  const repositoryId = Number(env.GITHUB_REPOSITORY_ID);
  const root = env.WIKI_ROOT === '.' ? '' : env.WIKI_ROOT;
  const safeRoot = root === '' || Boolean(root && root.split('/').every((part) => part && part !== '.' && part !== '..'));

  if (
    !repository || repository[1] === '.' || repository[1] === '..' || repository[2] === '.' || repository[2] === '..' ||
    !env.WIKI_REF || !safeRoot ||
    !Number.isSafeInteger(installationId) || installationId <= 0 ||
    !Number.isSafeInteger(repositoryId) || repositoryId <= 0
  ) throw new Error('Wiki repository is not configured');

  return {
    owner: repository[1],
    repo: repository[2],
    branch: env.WIKI_REF,
    contentRoot: root as string,
    installationId,
    repositoryId,
  };
}
