import type { APIRoute } from 'astro';

import { createReadApi } from '../../../lib/readApi.ts';
import { getSiteWiki } from '../../../lib/siteWiki.ts';

export const GET: APIRoute = async ({ params }) => createReadApi(await getSiteWiki()).read(params.pageId ?? '');
