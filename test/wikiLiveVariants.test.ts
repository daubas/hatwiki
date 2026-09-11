import assert from 'node:assert/strict';
import test from 'node:test';

import { createEditPageService } from '../src/lib/editPageService.ts';
import { createPublicWiki } from '../src/lib/publicWiki.ts';
import { createR2OverlayProjection } from '../src/lib/r2OverlayProjection.ts';
import { createR2Publisher } from '../src/lib/r2Publisher.ts';
import { createReadApi } from '../src/lib/readApi.ts';

const primary = {
  pageId: 'guides/overview',
  title: 'Overview',
  markdown: '# Primary overview',
  variants: [{
    variantId: 'candidate-r1',
    title: 'Candidate overview',
    description: 'A public candidate.',
    markdown: '# Candidate overview',
    revision: 'candidate-r1',
    baseSha: 'blob-candidate',
    support: { views: 3, endorsements: 1, disagreements: 1 },
  }],
};

function variantReader() {
  return createPublicWiki({
    readSnapshot: async () => ({ revision: 'snapshot-1', pages: [primary] }),
  });
}

test('readPage keeps the primary page compatible and exposes primary metadata when variants exist', async () => {
  const page = await variantReader().readPage('guides/overview');

  assert.ok(page);
  assert.equal(page.title, 'Overview');
  assert.equal(page.markdown, '# Primary overview');
  assert.notEqual(page.activeVariantId, 'primary');
  assert.ok(page.activeVariantId === undefined || page.variants?.some((variant) => variant.variantId === page.activeVariantId));
  assert.ok(page.selectedVariantId === undefined || page.selectedVariantId === 'primary');
  assert.equal(page.variants?.[0]?.variantId, 'candidate-r1');
});

test('readPage selects a requested public variant without pretending it is the active primary', async () => {
  const page = await variantReader().readPage('guides/overview', 'candidate-r1');

  assert.ok(page);
  assert.equal(page.title, 'Candidate overview');
  assert.equal(page.description, 'A public candidate.');
  assert.equal(page.markdown, '# Candidate overview');
  assert.equal(page.revision, 'candidate-r1');
  assert.notEqual(page.activeVariantId, 'primary');
  assert.ok(page.activeVariantId === undefined || page.variants?.some((variant) => variant.variantId === page.activeVariantId));
  assert.equal(page.selectedVariantId, 'candidate-r1');
});

test('public primary and variant responses expose bounded variant metadata without baseSha or variant markdown', async () => {
  const primaryPage = await variantReader().readPage('guides/overview');
  const selectedPage = await variantReader().readPage('guides/overview', 'candidate-r1');

  for (const page of [primaryPage, selectedPage]) {
    assert.ok(page);
    assert.equal('baseSha' in page, false);
    for (const variant of page.variants ?? []) {
      assert.deepEqual(Object.keys(variant).sort(), ['description', 'revision', 'support', 'title', 'variantId']);
      assert.equal('baseSha' in variant, false);
      assert.equal('markdown' in variant, false);
    }
  }
  assert.equal(primaryPage?.markdown, '# Primary overview');
  assert.equal(JSON.stringify(primaryPage).includes('# Candidate overview'), false);
});

test('readPage returns null for a missing variant but still finds the primary page', async () => {
  const wiki = variantReader();

  assert.equal(await wiki.readPage('guides/overview', 'missing-variant'), null);
  assert.ok(await wiki.readPage('guides/overview'));
});

test('R2 overlays only public variants belonging to the namespaced snapshot page', async () => {
  const namespace = 'acme/wiki@wiki-live';
  const variantPrefix = `published/${encodeURIComponent(namespace)}/variants/`;
  const keys = [
    `${variantPrefix}guides/overview/candidate-r1.json`,
    `${variantPrefix}guides/overview/../traversal.json`,
    `${variantPrefix}guides/overview/private-r1.json`,
    `${variantPrefix}guides/orphan/orphan-r1.json`,
  ];
  const values = new Map<string, unknown>([
    [keys[0], {
      pageId: 'guides/overview',
      variantId: 'candidate-r1',
      content: '---\ntype: Concept\ntitle: Candidate overview\ndescription: A public candidate.\n---\n\n# Candidate overview',
      revision: 'candidate-r1',
      baseSha: 'blob-candidate',
      support: { views: 3, endorsements: 1, disagreements: 1 },
    }],
    [keys[1], {
      pageId: 'guides/overview',
      variantId: '../traversal',
      content: '---\ntype: Concept\ntitle: Traversal\n---\n\n# Should not project',
      revision: 'traversal-r1',
      baseSha: 'blob-traversal',
    }],
    [keys[2], {
      pageId: 'guides/overview',
      variantId: 'private-r1',
      content: '---\ntype: Concept\ntitle: Private\nvisibility: private\n---\n\n# Should not project',
      revision: 'private-r1',
      baseSha: 'blob-private',
    }],
    [keys[3], {
      pageId: 'guides/orphan',
      variantId: 'orphan-r1',
      content: '---\ntype: Concept\ntitle: Orphan\n---\n\n# Should not project',
      revision: 'orphan-r1',
      baseSha: 'blob-orphan',
    }],
  ]);
  const prefixes: string[] = [];
  const projection = createR2OverlayProjection({
    readSnapshot: async () => ({
      revision: 'snapshot-1',
      pages: [{ pageId: 'guides/overview', title: 'Overview', markdown: '# Primary overview' }],
    }),
  }, {
    list: async ({ prefix }) => {
      prefixes.push(prefix);
      return prefix === variantPrefix ? { objects: keys.map((key) => ({ key })) } : { objects: [] };
    },
    get: async (key: string) => values.has(key) ? { json: async () => values.get(key) } : null,
  }, namespace);

  const snapshot = await projection.readSnapshot();
  const page = snapshot.pages[0] as typeof primary;
  const variants = page.variants ?? [];

  assert.ok(prefixes.includes(variantPrefix));
  assert.equal(variants.length, 1);
  assert.equal(variants[0].variantId, 'candidate-r1');
  assert.equal(variants[0].title, 'Candidate overview');
  assert.equal(variants[0].markdown, '\n# Candidate overview');
  assert.deepEqual(variants[0].support, { views: 3, endorsements: 1, disagreements: 1 });
});

type VariantPublisher = {
  publishVariant(input: Record<string, string>): Promise<{ revision: string }>;
};

const variantInput = {
  revision: 'candidate-r1',
  baseSha: 'blob-candidate',
  pageId: 'guides/overview',
  variantId: 'candidate-r1',
  content: '# Candidate overview',
};

test('publishVariant writes a safe namespaced key and retries identical content idempotently', async () => {
  const namespace = 'acme/wiki@wiki-live';
  const values = new Map<string, { value: Record<string, unknown>; etag: string }>();
  const puts: Array<{ key: string; value: string; options: Record<string, unknown> }> = [];
  const bucket = {
    put: async (key: string, value: string, options: Record<string, unknown>) => {
      const current = values.get(key);
      const onlyIf = options.onlyIf as Record<string, string> | undefined;
      if ((onlyIf?.etagDoesNotMatch === '*' && current) || (onlyIf?.etagMatches && onlyIf.etagMatches !== current?.etag)) return null;
      puts.push({ key, value, options });
      values.set(key, { value: JSON.parse(value), etag: `etag-${puts.length}` });
      return {};
    },
    get: async (key: string) => {
      const current = values.get(key);
      return current ? { etag: current.etag, json: async () => current.value } : null;
    },
  };
  const publisher = createR2Publisher(bucket, namespace) as unknown as VariantPublisher;

  assert.equal(typeof publisher.publishVariant, 'function');
  assert.equal((await publisher.publishVariant(variantInput)).revision, 'candidate-r1');
  assert.equal((await publisher.publishVariant(variantInput)).revision, 'candidate-r1');
  assert.equal(puts.length, 1);
  assert.equal(puts[0].key, `published/${encodeURIComponent(namespace)}/variants/guides/overview/candidate-r1.json`);
  assert.deepEqual(JSON.parse(puts[0].value), {
    ...variantInput,
    support: { views: 0, endorsements: 0, disagreements: 0 },
  });
  assert.deepEqual(puts[0].options.onlyIf, { etagDoesNotMatch: '*' });
});

test('publishVariant rejects unsafe variant IDs without writing an unsafe key', async () => {
  let writes = 0;
  const publisher = createR2Publisher({
    put: async () => { writes += 1; return {}; },
    get: async () => null,
  }, 'acme/wiki@wiki-live') as unknown as VariantPublisher;

  assert.equal(typeof publisher.publishVariant, 'function');
  for (const variantId of ['', '../secret', 'nested/id', 'nested\\id', 'draft?raw=1', 'draft#fragment']) {
    await assert.rejects(() => publisher.publishVariant({ ...variantInput, variantId }), /./);
  }
  assert.equal(writes, 0);
});

test('publishVariant does not overwrite a newer variant with a stale predecessor', async () => {
  let writes = 0;
  const publisher = createR2Publisher({
    put: async () => { writes += 1; return {}; },
    get: async () => ({
      etag: 'etag-new',
      json: async () => ({ ...variantInput, revision: 'newer-r1', baseSha: 'blob-new', content: '# Newer candidate' }),
    }),
  }, 'acme/wiki@wiki-live') as unknown as VariantPublisher;

  await assert.rejects(() => publisher.publishVariant(variantInput), /publisher_conflict/);
  assert.equal(writes, 0);
});

test('publishVariant does not acknowledge a failed variant readback', async () => {
  let reads = 0;
  let writes = 0;
  const publisher = createR2Publisher({
    put: async () => { writes += 1; return {}; },
    get: async () => {
      reads += 1;
      return reads === 1 ? null : {
        json: async () => ({ ...variantInput, content: '# Mismatched candidate' }),
      };
    },
  }, 'acme/wiki@wiki-live') as unknown as VariantPublisher;

  await assert.rejects(() => publisher.publishVariant(variantInput), /publisher_mismatch/);
  assert.equal(writes, 1);
});

type ServicePublisher = {
  publish(input: { revision: string }): Promise<{ revision: string }>;
  publishVariant?: (input: Record<string, string>) => Promise<{ revision: string }>;
};

function staleEdit(ref: string | undefined, publisher: ServicePublisher) {
  const calls: string[] = [];
  const service = createEditPageService({
    repository: {
      readPage: async (pageId, pageRef) => {
        calls.push(`read:${pageId}:${pageRef ?? 'head'}`);
        return { sha: 'live-head', content: 'Current note' };
      },
      findRequestRevision: async (pageId, requestId, _identity, pageRef) => {
        calls.push(`find:${pageId}:${requestId}:${pageRef ?? 'default'}`);
        return null;
      },
      commitPage: async () => {
        calls.push('commit:unexpected');
        return { revision: 'unexpected' };
      },
      saveCandidate: async (input) => {
        calls.push(`candidate:${input.pageId}:${input.ref ?? 'default'}`);
        return { revision: 'candidate-r1' };
      },
    },
    receipts: {
      get: async () => {
        calls.push('receipt.get');
        return null;
      },
      claim: async () => ({ status: 'claimed' as const, token: 'lease' }),
      put: async ({ status }) => calls.push(`receipt.put:${status}`),
    },
    publisher: publisher as never,
    policy: { protectedPaths: [], largeEditThreshold: 1000 },
  });
  return { calls, service };
}

const staleInput = {
  requestId: 'request-stale-live',
  pageId: 'guides/overview',
  baseSha: 'blob-before',
  content: 'Updated stale note',
  reason: 'Clarify the stale note',
};

test('stale wiki-live edits publish a public variant when the optional publisher method exists', async () => {
  const variantInputs: Array<Record<string, string>> = [];
  const { calls, service } = staleEdit('wiki-live', {
    publish: async ({ revision }) => {
      calls.push(`publish:${revision}`);
      return { revision };
    },
    publishVariant: async (input) => {
      variantInputs.push(input);
      calls.push(`publishVariant:${input.variantId}`);
      return { revision: input.revision };
    },
  });

  const result = await service.edit({ userId: 42, login: 'octo' }, { ...staleInput, ref: 'wiki-live' });

  assert.deepEqual(result, { requestId: 'request-stale-live', status: 'conflict', candidateRevision: 'candidate-r1' });
  assert.deepEqual(calls, [
    'receipt.get',
    'find:guides/overview:request-stale-live:wiki-live',
    'read:guides/overview:wiki-live',
    'candidate:guides/overview:wiki-live',
    'publishVariant:request-stale-live',
    'receipt.put:conflict',
  ]);
  assert.equal(variantInputs.length, 1);
  assert.equal(variantInputs[0].variantId, staleInput.requestId);
  assert.equal(variantInputs[0].revision, 'candidate-r1');
  assert.equal(variantInputs[0].pageId, 'guides/overview');
  assert.equal(variantInputs[0].content, 'Updated stale note');
});

test('off and contributor stale edits keep the old conflict behavior even with publishVariant available', async () => {
  for (const ref of [undefined, 'contrib/u-42/agent-notes']) {
    let publishedVariants = 0;
    const { service } = staleEdit(ref, {
      publish: async ({ revision }) => {
        return { revision };
      },
      publishVariant: async () => {
        publishedVariants += 1;
        return { revision: 'unexpected' };
      },
    });

    const result = await service.edit({ userId: 42, login: 'octo' }, { ...staleInput, requestId: `request-stale-${ref ?? 'off'}`, ...(ref ? { ref } : {}) });

    assert.equal(result.status, 'conflict');
    assert.equal(result.candidateRevision, 'candidate-r1');
    assert.equal(publishedVariants, 0);
  }
});

test('a stale live edit is not acknowledged when publisher has no publishVariant method', async () => {
  const { calls, service } = staleEdit('wiki-live', {
    publish: async ({ revision }) => {
      calls.push(`publish:${revision}`);
      return { revision };
    },
  });

  await assert.rejects(() => service.edit({ userId: 42, login: 'octo' }, { ...staleInput, requestId: 'request-stale-no-variant', ref: 'wiki-live' }), /publisher_unavailable/);
  assert.equal(calls.some((call) => call.startsWith('publish')), false);
  assert.equal(calls.some((call) => call === 'receipt.put:conflict'), false);
});

test('read API forwards the selected variant ID to PublicWiki', async () => {
  const calls: Array<[string, string | undefined]> = [];
  const api = createReadApi({
    searchWiki: async () => [],
    readPage: async (pageId, variantId) => {
      calls.push([pageId, variantId]);
      return { pageId, title: 'Candidate overview', markdown: '# Candidate overview', revision: 'candidate-r1', links: [], linkedPages: [], backlinks: [], backlinkPages: [] };
    },
  });

  const response = await api.read('guides/overview', 'https://hatwiki.test/?variant=candidate%2Dr1');

  assert.equal(response.status, 200);
  assert.deepEqual(calls, [['guides/overview', 'candidate-r1']]);
});
