import type { EditActor, EditPageInput, EditReceipt } from './editContracts.ts';
import { inspectWikiChanges } from './inspectChanges.ts';
import { hasVisiblePrivateSourceCitation } from './renderWiki.ts';
import type { IngestionTaskStore } from './sourceIngestion.ts';

type Edit = (actor: EditActor, input: EditPageInput) => Promise<EditReceipt>;

export async function completeSourceEdit(actor: EditActor, input: EditPageInput, store: IngestionTaskStore, edit: Edit): Promise<EditReceipt> {
  if (!input.sourceTaskId) return edit(actor, input);
  const task = await store.get(input.sourceTaskId, actor.userId);
  if (!task) throw new Error('source_not_found');
  if (task.targetPageId !== input.pageId) throw new Error('source_target_mismatch');
  const changes = inspectWikiChanges(input.pageId, input.content);
  if (!hasVisiblePrivateSourceCitation(input.content, `source-${task.taskId}`)) throw new Error('source_citation_missing');
  if (task.editRequestId && task.editRequestId !== input.requestId) throw new Error('source_already_used');
  if (task.status === 'stored' && !await store.claimEdit(task.taskId, actor.userId, input.requestId)) throw new Error('source_already_used');
  const result = await edit(actor, input);
  if (task.status === 'stored' && !await store.updateResult(task.taskId, actor.userId, input.requestId, result.status, result.revision ?? result.candidateRevision)) throw new Error('source_state_conflict');
  return { ...result, sourceTaskId: task.taskId, changes };
}
