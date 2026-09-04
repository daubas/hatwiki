import type { EditActor } from './editContracts.ts';
import { isCanonicalPageId } from './editPageService.ts';

export type IngestionStatus = 'stored' | 'committed' | 'conflict' | 'approval_required';

export type IngestionTask = {
  taskId: string;
  requestId: string;
  userId: number;
  login: string;
  title: string;
  content: string;
  contentSha256: string;
  targetPageId: string;
  status: IngestionStatus;
  createdAt: string;
  revision?: string;
  editRequestId?: string;
};

export type IngestionReceipt = Omit<IngestionTask, 'content' | 'userId' | 'login'> & { content?: never; citationId: string };

export interface IngestionTaskStore {
  findByRequest(userId: number, requestId: string): Promise<IngestionTask | null>;
  get(taskId: string, userId: number): Promise<IngestionTask | null>;
  put(task: IngestionTask): Promise<void>;
  claimEdit(taskId: string, userId: number, requestId: string): Promise<boolean>;
  updateResult(taskId: string, userId: number, requestId: string, status: IngestionStatus, revision?: string): Promise<boolean>;
}

type AddSourceInput = {
  requestId: string;
  title: string;
  content: string;
  targetPageId: string;
  authorizationConfirmed: boolean;
};

const receipt = ({ content: _content, userId: _userId, login: _login, ...task }: IngestionTask): IngestionReceipt => ({ ...task, citationId: `source-${task.taskId}` });

async function sha256(value: string): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function createSourceIngestionService(
  store: IngestionTaskStore,
  options: { now?: () => string; createId?: () => string } = {},
) {
  return {
    async add(actor: EditActor, input: AddSourceInput): Promise<IngestionReceipt> {
      if (!input.authorizationConfirmed) throw new Error('authorization_required');
      if (!Number.isSafeInteger(actor.userId) || actor.userId <= 0 || typeof actor.login !== 'string' || !actor.login.trim() || /[\r\n]/.test(actor.login)) throw new Error('invalid_actor');
      if (typeof input.requestId !== 'string' || !input.requestId.trim() || input.requestId.length > 160 || /[\r\n]/.test(input.requestId)
        || typeof input.title !== 'string' || !input.title.trim() || input.title.length > 160
        || typeof input.content !== 'string' || !isCanonicalPageId(input.targetPageId)) throw new Error('invalid_input');
      const content = input.content;
      if (!content.trim()) throw new Error('invalid_input');
      if (new TextEncoder().encode(content).length > 100_000) throw new Error('source_too_large');
      const contentSha256 = await sha256(content);
      const existing = await store.findByRequest(actor.userId, input.requestId);
      if (existing) {
        if (existing.contentSha256 !== contentSha256 || existing.targetPageId !== input.targetPageId) throw new Error('request_conflict');
        return receipt(existing);
      }

      const task: IngestionTask = {
        taskId: (options.createId ?? crypto.randomUUID)(),
        requestId: input.requestId,
        userId: actor.userId,
        login: actor.login,
        title: input.title.trim(),
        content,
        contentSha256,
        targetPageId: input.targetPageId,
        status: 'stored',
        createdAt: (options.now ?? (() => new Date().toISOString()))(),
      };
      try {
        await store.put(task);
      } catch (error) {
        const raced = await store.findByRequest(actor.userId, input.requestId);
        if (!raced) throw error;
        if (raced.contentSha256 !== contentSha256 || raced.targetPageId !== input.targetPageId) throw new Error('request_conflict');
        return receipt(raced);
      }
      return receipt(task);
    },
  };
}
