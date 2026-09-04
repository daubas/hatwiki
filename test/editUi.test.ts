import assert from 'node:assert/strict';
import test from 'node:test';
import { editDiff, editRequestForInput, editResultMessage, type EditUiLabels } from '../src/lib/editUi.ts';

const labels: EditUiLabels = {
  completed: '已完成',
  unableToSubmit: '無法送出',
  status: {
    committed: '已提交',
    conflict: '發生衝突',
    approval_required: '等待審核',
  },
  error: {
    authentication_required: '需要先登入',
    invalid_input: '內容無效',
    network_error: '網路連線失敗',
    request_conflict: '修改請求與既有請求衝突，請修改內容後再試',
    request_in_progress: '修改請求仍在處理中，請稍後再試',
    recovery_head_advanced: '頁面在復原修改時已更新，請重新載入後再試',
  },
  unknownStatus: '已收到回應',
  unknownError: '請稍後再試',
};

test('formats known edit receipts and errors without exposing machine codes', () => {
  assert.equal(editResultMessage({ ok: true, status: 'committed' }, labels), '已完成：已提交');
  assert.equal(editResultMessage({ ok: true, status: 'approval_required' }, labels), '已完成：等待審核');
  assert.equal(editResultMessage({ ok: false, error: 'authentication_required' }, labels), '無法送出：需要先登入');
  assert.equal(editResultMessage({ ok: false, error: 'unknown_error' }, labels), '無法送出：請稍後再試');
  assert.equal(editResultMessage({ ok: true, status: 'new_status' }, labels), '已完成：已收到回應');
});

test('reuses an edit request id only when the submitted input is unchanged', () => {
  const first = editRequestForInput('first', undefined, () => 'request-1');
  assert.deepEqual(editRequestForInput('first', first, () => 'request-2'), first);
  assert.deepEqual(editRequestForInput('second', first, () => 'request-2'), { input: 'second', requestId: 'request-2' });
});

test('keeps retry errors distinct from source-task errors', () => {
  const source = editResultMessage({ ok: false, error: 'source_already_used' }, { ...labels, error: { ...labels.error, source_already_used: '這筆資料已被使用' } });
  for (const error of ['request_conflict', 'request_in_progress', 'recovery_head_advanced']) {
    assert.notEqual(editResultMessage({ ok: false, error }, labels), source);
  }
});

test('shows only the changed line span in a minimal markdown diff', () => {
  assert.equal(editDiff('# Title\n\nOld line\nSame tail', '# Title\n\nNew line\nSame tail'), '- Old line\n+ New line');
  assert.equal(editDiff('Same', 'Same'), '');
  assert.equal(editDiff('A', 'A\nB'), '+ B');
});
