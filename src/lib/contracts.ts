export type PublicPage = {
  pageId: string;
  title: string;
  markdown: string;
  citations?: Array<{ id: string; resource: string; title?: string }>;
  pendingCandidates?: number;
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
  backlinks: string[];
};

export interface PublicProjection {
  readSnapshot(): Promise<PublicSnapshot>;
}
