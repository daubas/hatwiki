import assert from 'node:assert/strict';
import test from 'node:test';
import { editDiff, editResultMessage, type EditUiLabels } from '../src/lib/editUi.ts';

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

test('shows only the changed line span in a minimal markdown diff', () => {
  assert.equal(editDiff('# Title\n\nOld line\nSame tail', '# Title\n\nNew line\nSame tail'), '- Old line\n+ New line');
  assert.equal(editDiff('Same', 'Same'), '');
  assert.equal(editDiff('A', 'A\nB'), '+ B');
});
