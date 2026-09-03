export type EditActor = {
  userId: number;
  login: string;
  agent?: string;
};

export type EditPageInput = {
  requestId: string;
  pageId: string;
  baseSha: string;
  content: string;
  reason: string;
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
};

export interface WikiRepository {
  readPage(pageId: string, ref?: string): Promise<RepositoryPage | null>;
  findRequestRevision(pageId: string, requestId: string): Promise<{ kind: 'page' | 'candidate'; revision: string } | null>;
  commitPage(input: { pageId: string; baseSha: string; content: string; message: string }): Promise<{ revision: string }>;
  saveCandidate(input: { pageId: string; content: string; requestId: string; message: string }): Promise<{ revision: string }>;
}

export interface EditReceiptStore {
  get(requestId: string): Promise<EditReceipt | null>;
  put(receipt: EditReceipt): Promise<void>;
}

export interface PublicPublisher {
  publish(revision: string): Promise<{ revision: string }>;
}

export type EditPolicy = {
  protectedPaths: string[];
  largeEditThreshold: number;
};
