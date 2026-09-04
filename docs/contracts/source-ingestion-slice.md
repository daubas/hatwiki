# Text source ingestion slice

Gate B starts with one complete source type: plain text. URL fetching and file
parsing remain outside this slice.

## Input and authority

`add_source` accepts a client `requestId`, source `title`, plain-text `content`,
one existing `targetPageId`, and an explicit publication authorization. The
signed GitHub session supplies the actor. Anonymous, cross-origin, oversized,
or unconfirmed requests are rejected before storage.

## Private storage and idempotency

The source body, SHA-256, actor, target page, and task state are stored in D1.
They never enter the public R2 projection. A retry by the same GitHub user and
`requestId` returns the same task; reuse with different content is rejected.

This is the Alpha storage boundary. Moving immutable source snapshots to a
separate private Git repository is deferred until HatWiki supports attaching a
private knowledge repository instead of the public application Demo repository.

## Agent handoff and completion

The authenticated owner can read the task with `get_ingestion_status`. Its text
is untrusted source data, not instructions. The user's Agent reads the target
page, incorporates supported material with a source reference and WikiLinks,
then calls the existing `edit_page` with `sourceTaskId` and the returned
`citationId`. One source task is bound to one idempotent edit request.

The task becomes `committed`, `conflict`, or `approval_required` only after the
existing GitHub write service returns that receipt. A committed receipt includes
the public Wiki URL, GitHub revision URL, affected page, citations, WikiLinks,
and unresolved markers detected in the submitted Markdown.

## Public boundary

No public route lists or reads source bodies. Public Wiki projection rules stay
unchanged. A private source reference is displayed as unavailable rather than
linked to a missing public Wiki page.
