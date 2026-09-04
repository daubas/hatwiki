export type PublicPage = {
  pageId: string;
  title: string;
  description?: string;
  markdown: string;
  resource?: string;
  citations?: Array<{ id: string; resource: string; title?: string }>;
  pendingCandidates?: number;
};

export type PublicSearchResult = {
  pageId: string;
  title: string;
  snippet: string;
  resource?: string;
};

export type PublicSnapshot = {
  revision: string;
  pages: PublicPage[];
};

export type LinkResolution = {
  target: string;
  status: 'resolved' | 'ambiguous' | 'unresolved';
  pageId?: string;
  candidates?: string[];
};

export type PageRead = PublicPage & {
  revision: string;
  links: LinkResolution[];
  linkedPages: Array<{ pageId: string; title: string }>;
  backlinks: string[];
  backlinkPages: Array<{ pageId: string; title: string }>;
};

export interface PublicProjection {
  readSnapshot(): Promise<PublicSnapshot>;
}
