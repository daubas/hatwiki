# WebMCP Challenge Submission Draft

## Project

**HatWiki — Humans and Agents Together**

- Live demo: https://hatwiki.daubas-chen.workers.dev
- Source: https://github.com/daubas/hatwiki
- License: Apache License 2.0

## One-line pitch

HatWiki is a Git-native collaborative knowledge base where people and browser
agents can discover, read, and—only after explicit human authorization—publish
traceable knowledge updates.

## Submission description

Most agent work disappears when a conversation ends. HatWiki gives agents a
shared, inspectable memory surface: a public Wiki projection with canonical
page IDs, citations, WikiLink relationships, backlinks, revisions, and
conflict candidates.

HatWiki uses WebMCP as a browser-native interface to that layer through
`document.modelContext`. Anonymous sessions register public `search_wiki` and
`read_page`. A GitHub-signed-in session also registers `edit_page`,
`add_source`, `get_ingestion_status`, and `inspect_changes`. The page reuses
the browser's signed-in session; tools do not receive GitHub tokens.

The result is a small but complete human-agent workflow: a signed-in participant
provides an authorized source, an agent reads and inspects a proposed cited
change, and the participant explicitly declares that it may be published. The
server validates every write, detects stale revisions, records idempotent
receipts, and reports success only after GitHub and the R2 page have read back
the committed bytes. The subsequent public API identifies its derived `r2-*`
snapshot, which is distinct from the Git commit SHA.

## Why WebMCP matters here

HatWiki is not only a website with an API. WebMCP lets a browser agent discover
the page's capabilities in the context where the knowledge is being read. The
agent uses the same public read surface as a human, while signed-in operations
remain bound to the site's GitHub session and server-side checks. The host's
approval mode does not replace those checks.

The tools are intentionally small:

- `search_wiki(query)`: returns bounded public page summaries and snippets.
- `read_page(pageId)`: returns a canonical public page, citations, links,
  backlinks, revision, and pending conflict candidates. A signed-in read also
  gets the canonical Markdown and base SHA for an already projected page.
- `add_source(...)`: privately stores one authorized plain-text source for an
  existing page and returns its task and citation IDs.
- `get_ingestion_status(taskId)`: lets only the signed-in owner read that
  source task and its untrusted source text.
- `inspect_changes(pageId, content)`: summarizes affected pages, citations,
  WikiLinks, and unresolved markers before an edit is submitted.
- `edit_page(...)`: requires a signed-in session and an explicit publication
  declaration. It can merge an owned source task only when the submitted page
  visibly cites it.

Plain-text source bodies, hashes, and owner-scoped task state stay in private
D1. They are not copied into the public R2 projection; a public page can retain
an unavailable private-source reference without exposing its body. The required
declaration says that the submitter may provide and publish the material—it is
not a substitute for copyright, privacy, confidentiality, or third-party
permissions.

## What is novel

HatWiki combines three usually separate layers into one browser workflow:

1. a human-readable Wiki and graph view;
2. an agent-readable WebMCP tool surface; and
3. a Git-native, conflict-aware publication trail.

The important design choice is that an agent does not silently become the
publisher. It can help maintain shared knowledge, while people retain the
final publication decision and the repository preserves attribution and
history.

## Video plan — source of truth

The final video is governed by the recorded-course artifacts in
[`docs/submission/video-flow/`](video-flow/). The machine-authoritative paper
edit is [`paper-edit.json`](video-flow/paper-edit.json); its generated human
review is [`generated/v0.5-paper-edit.md`](video-flow/generated/v0.5-paper-edit.md).

The 2:40 video is a compact five-beat course flow with one outcome:

> An authorized source becomes a cited Wiki correction that a new browser-agent
> session can read through WebMCP.

The required story is: GitHub sign-in → authorized `add_source` →
`get_ingestion_status` → `search_wiki` and `read_page` → `inspect_changes` →
explicit publication declaration → `edit_page` → GitHub and R2 readback → fresh agent
session reads the corrected page.

Gate C operational acceptance has verified this flow in a real external browser
host, including idempotent source and edit replays, conflict retry, and a fresh
session readback. The paper edit remains `proposed`: operational acceptance is
not recorded-video evidence. Do not call planned footage evidence, mark a
cut-list Resolve-ready, or publish a final master until clean, redacted takes
and the separate editorial, privacy, rights, technical, and publication gates
exist.

## Gate C operational acceptance

- [x] An external browser host exposed all six tools through
      `document.modelContext` in the appropriate GitHub session.
- [x] Authorized source creation, owner-scoped status reading, change
      inspection, and idempotent source/edit replays were exercised.
- [x] A committed change was read back by a genuinely new browser-agent session;
      stale-base conflict handling and retry were exercised separately.
- [x] The deployed Wiki and Graph were checked at 320 px and 375 px viewports,
      and keyboard Graph interaction was checked.

## Recording checklist

- [ ] Use the deployed URL, not a localhost address.
- [ ] Make all six tool names and the source-to-edit handoff legible in the
      recording; keep the main outcome understandable rather than replaying the
      entire acceptance suite.
- [ ] Keep the source body, GitHub account details, cookies, and credentials out
      of the recording. Redact any necessary session information.
- [ ] Keep the write example harmless and show the explicit publication
      declaration on camera.
- [ ] Show the Git commit receipt and public R2 snapshot after the edit.
- [ ] Record clear audio and keep the final video below three minutes.
- [ ] Upload the video publicly to YouTube and use the same title and pitch as
      this document.

## Submission checklist

- [x] Confirm the live URL and the six-tool session boundary in an external
      browser host.
- [ ] Confirm the final demo visibly covers the source-to-edit story and a fresh
      session readback.
- [ ] Record a public YouTube video under three minutes with clear audio.
- [ ] Keep the video, title, description, and README in English, or provide
      English translations for any other language material.
- [ ] Confirm the GitHub repository is public and contains source, assets,
      setup instructions, and the Apache 2.0 license.
- [ ] Mention any pre-existing work and clearly describe the WebMCP additions.
- [ ] Test the exact deployed revision after the final deployment.

## Pre-existing work disclosure

HatWiki began as a Git-native Wiki experiment. The competition-period work
extends it with browser-native WebMCP registration, public projection and read
APIs, GitHub-session-bound editing, private D1 text-source handoff,
revision-safe Git/R2 publication, the interactive graph, and the GEO knowledge
demo.
