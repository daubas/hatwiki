import { StalePageError } from './editContracts.ts';
import type {
  EditActor,
  EditPageInput,
  EditPolicy,
  EditReceipt,
  EditReceiptStore,
  PublicPublisher,
  WikiRepository,
} from './editContracts.ts';

type EditDependencies = {
  repository: WikiRepository;
  receipts: EditReceiptStore;
  publisher: PublicPublisher;
  policy: EditPolicy;
};

function trailerValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ');
}

function messageFor(actor: EditActor, input: EditPageInput): string {
  return `${input.reason}\n\nHatWiki-User-ID: ${actor.userId}\nHatWiki-Login: ${trailerValue(actor.login)}\nHatWiki-Request-ID: ${trailerValue(input.requestId)}`
    + (actor.agent ? `\nHatWiki-Agent: ${trailerValue(actor.agent)}` : '');
}

function sameBytes(left: string, right: string): boolean {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  return leftBytes.length === rightBytes.length && leftBytes.every((byte, index) => byte === rightBytes[index]);
}

function isTrimmedNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value === value.trim();
}

function isNonBlank(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isCanonicalPageId(pageId: unknown): pageId is string {
  return isTrimmedNonEmpty(pageId)
    && !pageId.startsWith('/')
    && !/\.md$/i.test(pageId)
    && !/[\u0000-\u001f\u007f\\?#]/.test(pageId)
    && pageId.split('/').every((segment) => segment !== '' && segment !== '.' && segment !== '..');
}

function isValidInput(input: EditPageInput): boolean {
  return isTrimmedNonEmpty(input.requestId)
    && !/[\r\n]/.test(input.requestId)
    && isCanonicalPageId(input.pageId)
    && isTrimmedNonEmpty(input.baseSha)
    && !/\s/.test(input.baseSha)
    && isNonBlank(input.content)
    && isNonBlank(input.reason)
    && !/[\r\n]/.test(input.reason);
}

function isValidActor(actor: EditActor): boolean {
  return Number.isSafeInteger(actor.userId)
    && actor.userId > 0
    && isTrimmedNonEmpty(actor.login)
    && !/[\r\n]/.test(actor.login);
}

function isProtectedPage(pageId: string, protectedPaths: string[]): boolean {
  return protectedPaths.some((protectedPath) => {
    if (protectedPath.endsWith('/**')) {
      const prefix = protectedPath.slice(0, -3);
      return prefix !== '' && (pageId === prefix || pageId.startsWith(`${prefix}/`));
    }
    return pageId === protectedPath;
  });
}

function changedByteCount(before: string, after: string): number {
  const beforeBytes = new TextEncoder().encode(before);
  const afterBytes = new TextEncoder().encode(after);
  let start = 0;
  while (start < beforeBytes.length && start < afterBytes.length && beforeBytes[start] === afterBytes[start]) start += 1;

  let beforeEnd = beforeBytes.length;
  let afterEnd = afterBytes.length;
  // ponytail: A single changed span safely overestimates disjoint edits without adding a diff dependency.
  while (beforeEnd > start && afterEnd > start && beforeBytes[beforeEnd - 1] === afterBytes[afterEnd - 1]) {
    beforeEnd -= 1;
    afterEnd -= 1;
  }
  return beforeEnd - start + afterEnd - start;
}

export function createEditPageService({ repository, receipts, publisher, policy }: EditDependencies) {
  async function completePage(input: EditPageInput, revision: string): Promise<EditReceipt> {
    const readback = await repository.readPage(input.pageId, revision);
    if (!readback || !sameBytes(readback.content, input.content)) throw new Error('readback_mismatch');

    const published = await publisher.publish({ revision, baseSha: readback.sha, pageId: input.pageId, content: input.content });
    if (published.revision !== revision) throw new Error('publisher_mismatch');

    const receipt: EditReceipt = { requestId: input.requestId, status: 'committed', revision };
    await receipts.put(receipt);
    return receipt;
  }

  return {
    async edit(actor: EditActor, input: EditPageInput): Promise<EditReceipt> {
      if (!isValidActor(actor)) throw new Error('invalid_actor');
      if (!isValidInput(input)) throw new Error('invalid_input');

      const existing = await receipts.get(input.requestId);
      if (existing) return existing;

      const recovered = await repository.findRequestRevision(input.pageId, input.requestId);
      if (recovered?.kind === 'page') return completePage(input, recovered.revision);
      if (recovered?.kind === 'candidate') {
        const receipt: EditReceipt = {
          requestId: input.requestId,
          status: 'conflict',
          candidateRevision: recovered.revision,
        };
        await receipts.put(receipt);
        return receipt;
      }

      if (isProtectedPage(input.pageId, policy.protectedPaths)) {
        const receipt: EditReceipt = { requestId: input.requestId, status: 'approval_required' };
        await receipts.put(receipt);
        return receipt;
      }

      const current = await repository.readPage(input.pageId);
      if (!current) throw new Error('page_not_found');

      if (changedByteCount(current.content, input.content) > policy.largeEditThreshold) {
        const receipt: EditReceipt = { requestId: input.requestId, status: 'approval_required' };
        await receipts.put(receipt);
        return receipt;
      }

      const saveConflict = async () => {
        const candidate = await repository.saveCandidate({
          pageId: input.pageId,
          content: input.content,
          requestId: input.requestId,
          message: messageFor(actor, input),
        });
        const receipt: EditReceipt = {
          requestId: input.requestId,
          status: 'conflict',
          candidateRevision: candidate.revision,
        };
        await receipts.put(receipt);
        return receipt;
      };

      if (current.sha !== input.baseSha) return saveConflict();

      let revision: string;
      try {
        ({ revision } = await repository.commitPage({
          pageId: input.pageId,
          baseSha: input.baseSha,
          content: input.content,
          message: messageFor(actor, input),
        }));
      } catch (error) {
        if (error instanceof StalePageError) return saveConflict();
        throw error;
      }
      return completePage(input, revision);
    },
  };
}
