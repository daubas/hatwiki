import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { wikiLoaderOptions } from './lib/wikiLoader.ts';

const wiki = defineCollection({
  loader: glob(wikiLoaderOptions(process.env.HATWIKI_WIKI_DIR)),
  schema: z.object({
    type: z.string(),
    title: z.string(),
    description: z.string().optional(),
    resource: z.string().optional(),
    tags: z.array(z.string()).optional(),
    visibility: z.enum(['public', 'private']).optional(),
    pendingCandidates: z.number().int().nonnegative().optional(),
    sources: z.array(z.object({
      id: z.string().optional(),
      resource: z.string(),
      title: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { wiki };
