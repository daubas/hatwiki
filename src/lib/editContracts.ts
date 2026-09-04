export type EditActor = {
  userId: number;
  login: string;
  agent?: string;
};

export class StalePageError extends Error {
  constructor() {
    super('stale_page');
  }
}

export type EditPageInput = {
  requestId: string;
  pageId: string;
  baseSha: string;
  content: string;
  reason: string;
  sourceTaskId?: string;
};

export type RepositoryPage = {
  sha: string;
  content: string;
};

export type EditReceipt = {
  requestId: string;
  status: 'committed' | 'conflict' | 'approval_required';
  revision?: string;
  candidateRevision?: string;
  pageUrl?: string;
  revisionUrl?: string;
  sourceTaskId?: string;
  changes?: import('./inspectChanges.ts').WikiChangeSummary;
};

export type EditReceiptBinding = {
  actorUserId: number;
  pageId: string;
  inputSha256: string;
};

export type StoredEditReceipt = EditReceipt & {
  actorUserId: number | null;
  pageId: string | null;
  inputSha256: string | null;
};

export interface WikiRepository {
  readPage(pageId: string, ref?: string): Promise<RepositoryPage | null>;
  findRequestRevision(pageId: string, requestId: string, identity?: { actorUserId: number; sourceTaskId?: string }): Promise<{ kind: 'page' | 'candidate'; revision: string } | null>;
  commitPage(input: { pageId: string; baseSha: string; content: string; message: string }): Promise<{ revision: string }>;
  saveCandidate(input: { pageId: string; content: string; requestId: string; message: string }): Promise<{ revision: string }>;
}

export interface EditReceiptStore {
  get(requestId: string): Promise<StoredEditReceipt | null>;
  claim(requestId: string, binding: EditReceiptBinding): Promise<{ status: 'claimed'; token: string } | { status: 'in_progress' | 'conflict' }>;
  put(receipt: EditReceipt, binding: EditReceiptBinding, claimToken: string): Promise<void>;
}

export interface PublicPublisher {
  publish(page: { revision: string; previousSha: string; baseSha: string; pageId: string; content: string }): Promise<{ revision: string }>;
}

export type EditPolicy = {
  protectedPaths: string[];
  largeEditThreshold: number;
};
