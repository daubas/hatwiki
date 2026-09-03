import assert from 'node:assert/strict';
import test from 'node:test';

import { handleEditRequest } from '../src/lib/editHttp.ts';

const body = {
  requestId: 'request-web-1',
  pageId: 'concepts/hatwiki',
  baseSha: 'blob-before',
  content: '# Updated',
  reason: 'Clarify the page',
  authorizationConfirmed: true,
};

test('requires a signed-in actor and an explicit publication authorization', async () => {
  let calls = 0;
  const edit = async () => {
    calls += 1;
    return { requestId: 'unused', status: 'committed' as const };
  };

  const anonymous = await handleEditRequest(new Request('https://hatwiki.test/api/edit', { method: 'POST', body: JSON.stringify(body) }), null, edit);
  const unconfirmed = await handleEditRequest(
    new Request('https://hatwiki.test/api/edit', { method: 'POST', body: JSON.stringify({ ...body, authorizationConfirmed: false }) }),
    { userId: 7, login: 'octo' },
    edit,
  );

  assert.equal(anonymous.status, 401);
  assert.equal(unconfirmed.status, 400);
  assert.deepEqual(await unconfirmed.json(), { error: 'authorization_required' });
  assert.equal(calls, 0);
});

test('passes only the edit contract to the service and returns its receipt', async () => {
  const calls: unknown[] = [];
  const response = await handleEditRequest(
    new Request('https://hatwiki.test/api/edit', { method: 'POST', body: JSON.stringify({ ...body, ignored: 'value' }) }),
    { userId: 7, login: 'octo' },
    async (actor, input) => {
      calls.push(actor, input);
      return { requestId: input.requestId, status: 'committed', revision: 'commit-1' };
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { requestId: 'request-web-1', status: 'committed', revision: 'commit-1' });
  assert.deepEqual(calls, [
    { userId: 7, login: 'octo' },
    {
      requestId: 'request-web-1',
      pageId: 'concepts/hatwiki',
      baseSha: 'blob-before',
      content: '# Updated',
      reason: 'Clarify the page',
    },
  ]);
});

test('rejects malformed JSON without invoking the edit service', async () => {
  let calls = 0;
  const response = await handleEditRequest(
    new Request('https://hatwiki.test/api/edit', { method: 'POST', body: '{' }),
    { userId: 7, login: 'octo' },
    async () => {
      calls += 1;
      return { requestId: 'unused', status: 'committed' };
    },
  );

  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});

test('rejects a cross-origin edit before parsing it', async () => {
  let calls = 0;
  const response = await handleEditRequest(
    new Request('https://hatwiki.test/api/edit', {
      method: 'POST',
      headers: { Origin: 'https://attacker.test' },
      body: JSON.stringify(body),
    }),
    { userId: 7, login: 'octo' },
    async () => {
      calls += 1;
      return { requestId: 'unused', status: 'committed' };
    },
  );

  assert.equal(response.status, 403);
  assert.equal(calls, 0);
});
