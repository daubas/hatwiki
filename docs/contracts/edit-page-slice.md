# Edit page slice

This slice lets a GitHub-authenticated user edit an ordinary public Wiki page
while the HatWiki GitHub App remains the Git committer. WebMCP tool registration
is a convenience layer, not the authority boundary: every write is checked
again by the server.

## Input and authority

`edit_page` accepts `requestId`, `pageId`, `baseSha`, full Markdown `content`,
a short `reason`, and `authorizationConfirmed: true`. It can also accept an
optional `sourceTaskId` for an owned plain-text source task. The authenticated
GitHub session supplies `userId`, `login`, and an optional self-declared agent
name.

- Anonymous requests are rejected before the edit service runs; anonymous
  WebMCP sessions do not register write tools.
- A signed-in user must explicitly declare that they may publish the submitted
  material. The declaration is required input, not proof that HatWiki has
  obtained copyright, privacy, confidentiality, or third-party permission.
- Ordinary pages are open to every authenticated GitHub user. Protected paths
  and large edits return `approval_required` without a commit.
- When `sourceTaskId` is present, it must belong to the signed-in user, target
  the same page, and be visibly cited in the submitted Markdown. It does not
  make the private source body public.
- The GitHub App is the committer. Commit trailers retain `HatWiki-User-ID`,
  `HatWiki-Login`, `HatWiki-Request-ID`, optional `HatWiki-Agent`, and the
  source-task ID when one is used.

A signed-in `read_page` can supply canonical Markdown and `baseSha` for an edit,
but only for a page already in the public projection. It cannot be used to read
unprojected repository files.

## Privacy and publication boundary

An accepted page edit is eligible for the public Wiki projection. Private
plain-text source bodies, hashes, and owner-scoped task state remain in D1; a
published page may show an unavailable private-source reference without linking
to its body. Submitters must not place secrets, personal data, or material they
cannot lawfully publish in an edit or source task.

## Concurrency and idempotency

- A receipt binds `requestId` to the GitHub user, page, and submitted payload.
  Retrying that exact request returns the original receipt; reusing the ID for a
  different actor, page, or payload is rejected.
- If a process stops after GitHub writes but before the receipt is stored, a
  retry recovers the matching page or candidate revision from Git history rather
  than writing again.
- A source task can bind to only one idempotent edit request. Source-task state
  changes only after that edit has a final receipt.
- The repository page SHA must equal `baseSha` before an ordinary commit. A
  stale base is saved as a conflict candidate; it never overwrites the page.

## Success receipt

The edit is complete only when:

1. GitHub reports the commit SHA.
2. A trusted GitHub readback at that SHA contains the submitted bytes.
3. The Publisher writes and reads back an R2 page with that committed content.

No intermediate state is reported as complete. Completing a recovered Git
commit is idempotent so a retry can safely finish its readback and projection
steps again. The later public read surface reports a derived `r2-*` snapshot
revision; it is intentionally a different identifier from the Git commit SHA.
