import type { PublicProjection, PublicSnapshot } from '../../src/lib/contracts.ts';

const snapshot: PublicSnapshot = {
  revision: '9c0ffee',
  pages: [
    {
      pageId: 'guides/overview',
      title: 'Overview',
      markdown: '# Overview\n\n<script>ignore this as data</script>\n\n[[concepts/shared]]\n[[unique]]\n[[shared]]\n[[missing-page]]\n\n[Exact Markdown](concepts/shared.md)\n[Ambiguous Markdown](shared.md)\n[Missing Markdown](missing-page.md)\n[External source](https://example.test/source)\n[Root-relative Markdown](/concepts/hatwiki.md)\n[Traversal](../concepts/hatwiki.md)',
      citations: [{ id: 'source-1', resource: 'https://example.test/source', title: 'Public source' }],
      pendingCandidates: 2,
    },
    {
      pageId: 'concepts/shared',
      title: 'Shared concept',
      markdown: '# Shared concept',
    },
    {
      pageId: 'concepts/hatwiki',
      title: 'HatWiki',
      markdown: '# HatWiki',
    },
    {
      pageId: 'archive/shared',
      title: 'Archived shared concept',
      markdown: '# Archived shared concept',
    },
    {
      pageId: 'topics/unique',
      title: 'Unique topic',
      markdown: '# Unique topic\n\nA comet makes this page searchable.',
    },
    {
      pageId: 'notes/reviewer',
      title: 'Review note',
      markdown: '# Review note\n\n[[guides/overview]]',
    },
  ],
};

export const publicProjection: PublicProjection = {
  async readSnapshot() {
    return snapshot;
  },
};
