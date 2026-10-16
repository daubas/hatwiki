const externalWikiPatterns = [
  '{overview,CONTEXT,SCHEMA}.md',
  '{concepts,entities,methods,guides,comparisons,experiments,models,prompts,workflows,cases,facts,sources,research}/**/*.md',
  '!**/raw/**',
  '!**/index.md',
  '!**/log.md',
];

export function wikiLoaderOptions(wikiDir?: string) {
  return wikiDir
    ? { base: wikiDir, pattern: externalWikiPatterns }
    : { base: './wiki', pattern: '**/*.md' };
}
