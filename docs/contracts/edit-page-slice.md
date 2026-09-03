# Edit page slice

This slice lets any GitHub-authenticated user edit an ordinary Wiki page while
the HatWiki GitHub App remains the Git committer.

## Input

`edit_page` accepts `requestId`, `pageId`, `baseSha`, full Markdown `content`, a
short `reason`, and optional public citations. The authenticated server session
supplies `userId`, `login`, and an optional self-declared agent name.

## Authority and attribution

- Anonymous requests are rejected before the edit service runs.
- Ordinary pages are open to every authenticated GitHub user.
- Protected paths and large edits return `approval_required` without a commit.
- The GitHub App is the committer. Commit trailers retain `HatWiki-User-ID`,
  `HatWiki-Login`, and optional unverified `HatWiki-Agent`.

## Concurrency and idempotency

- `requestId` is unique per Wiki, is recorded in the commit trailer, and
  returns the original receipt on retry. If a process stops after GitHub writes
  but before the receipt is stored, the retry recovers that request from Git
  history instead of writing again.
- The repository page SHA must equal `baseSha` before an ordinary commit.
- A stale base is saved as a conflict candidate; it never overwrites the page.

## Success receipt

The edit is complete only when all of these revisions are identical:

1. GitHub reports the commit SHA.
2. A trusted GitHub readback at that SHA contains the submitted bytes.
3. The Publisher reports the same revision after refreshing the public
   projection and derived indexes.

No intermediate state is reported as complete.
Publishing the same revision must be idempotent so a recovered request can
safely finish the readback and projection steps again.
