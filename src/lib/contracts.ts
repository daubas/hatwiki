export type PublicPage = {
  pageId: string;
  title: string;
  description?: string;
  markdown: string;
  resource?: string;
  citations?: Array<{ id: string; resource: string; title?: string }>;
  pendingCandidates?: number;
  status?: string;
  staleAfter?: string;
  variants?: PublicVariant[];
};

export function isDraftStatus(status: string | undefined): boolean {
  return status?.trim().toLowerCase() === 'draft';
}

// stale_after 到期（<= today，YYYY-MM-DD）只是信任訊號；無法解析的日期視為未過期。
export function isStale(staleAfter: string | undefined, today: string = new Date().toISOString().slice(0, 10)): boolean {
  const value = staleAfter?.trim().slice(0, 10);
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value) && value <= today);
}

export type PublicVariantSupport = {
  views: number;
  endorsements: number;
  disagreements: number;
};

export type PublicVariant = {
  variantId: string;
  revision: string;
  title: string;
  description?: string;
  markdown: string;
  support: PublicVariantSupport;
};

export type PublicVariantMetadata = Omit<PublicVariant, 'markdown'>;

export function isPublicVariantSupport(value: unknown): value is PublicVariantSupport {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const support = value as Record<string, unknown>;
  return ['views', 'endorsements', 'disagreements'].every((key) => Number.isSafeInteger(support[key]) && (support[key] as number) >= 0);
}

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

export type PageRead = Omit<PublicPage, 'variants'> & {
  revision: string;
  selectedVariantId?: string;
  variants?: PublicVariantMetadata[];
  links: LinkResolution[];
  linkedPages: Array<{ pageId: string; title: string }>;
  backlinks: string[];
  backlinkPages: Array<{ pageId: string; title: string; alias?: string; snippet?: string; status?: string }>;
};

export interface PublicProjection {
  readSnapshot(): Promise<PublicSnapshot>;
}
