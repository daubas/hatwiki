import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { wikiLoaderOptions } from './lib/wikiLoader.ts';

const wiki = defineCollection({
  loader: glob(wikiLoaderOptions(process.env.HATWIKI_WIKI_DIR)),
  schema: z.object({
    type: z.string(),
    title: z.string(),
    description: z.string().optional(),
    summary: z.string().optional(),
    okf_version: z.string().optional(),
    id: z.string().optional(),
    status: z.string().optional(),
    stale_after: z.string().optional(),
    resource: z.string().optional(),
    tags: z.array(z.string()).optional(),
    visibility: z.enum(['public', 'private']).optional(),
    pendingCandidates: z.number().int().nonnegative().optional(),
    sources: z.array(z.object({
      id: z.string().optional(),
      resource: z.string().optional(),
      uri: z.string().optional(),
      title: z.string().optional(),
      author: z.string().optional(),
    })).optional(),
  }).transform((data) => ({
    ...data,
    description: data.description ?? data.summary,
  })),
});

export const collections = { wiki };
