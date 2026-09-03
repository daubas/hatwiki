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
page IDs, source citations, WikiLink relationships, backlinks, revisions, and
conflict-aware publishing.

HatWiki uses WebMCP as a browser-native interface to that knowledge layer. An
anonymous agent can search the public Wiki with `search_wiki` and read a
canonical page with `read_page`. A signed-in user can also expose `edit_page`,
but publishing requires an explicit authorization field. The server validates
the edit, detects stale revisions, records idempotent receipts, and publishes
only after the GitHub commit and public projection agree on the same revision.

The result is a small but complete human-agent workflow: find evidence, inspect
the source context, propose a correction, obtain consent, and leave a durable
Git-backed record instead of an invisible chat-only change.

## Why WebMCP matters here

HatWiki is not only a website with an API. WebMCP lets a browser agent discover
the page's capabilities in the context where the knowledge is being read. The
agent can use the same public read surface as a human, while the write surface
is deliberately narrower and authorization-gated.

The tools are intentionally small:

- `search_wiki(query)`: returns bounded page summaries and short evidence
  snippets.
- `read_page(pageId)`: returns the full canonical page, citations, links,
  backlinks, revision, and pending candidates.
- `edit_page(...)`: available only to an authenticated session and requires
  explicit publication authorization.

## What is novel

HatWiki combines three usually separate layers into one browser workflow:

1. a human-readable Wiki and graph view;
2. an agent-readable WebMCP tool surface; and
3. a Git-native, conflict-aware publication trail.

The important design choice is that an agent does not silently become the
publisher. It can help maintain shared knowledge, while people retain the
final publication decision and the repository preserves attribution and
history.

## Video plan — target length 2:40

Record one continuous task in English. Keep the browser zoom high enough that
tool names, page IDs, citations, and revision values are readable. Prepare a
signed-in session before recording, but begin the video with the public read
flow. Use a harmless, pre-approved one-line clarification for the edit step.

### 0:00–0:15 — Hook

**Screen:** HatWiki home page. Hold long enough to show the product name and
the knowledge graph.

**Voiceover:**

> Agent conversations are useful, but their context is temporary. HatWiki is a
> shared memory layer where people and browser agents can maintain knowledge
> together.

**Proof to show:** The live HatWiki URL and the human-facing Wiki experience.

### 0:15–0:35 — The human surface

**Screen:** Open the Wiki index, search for `agent`, and open the Agent2UCB
page. Show the source link, citations, and table of contents without scrolling
through the whole article.

**Voiceover:**

> A person can browse the same knowledge as a normal Wiki. Pages keep their
> source links, citations, and relationships instead of becoming anonymous
> chat text.

### 0:35–1:10 — Agent discovery through WebMCP

**Screen:** In ChatGPT with WebMCP enabled, ask:

> Find the HatWiki page about Agent2UCB. Use HatWiki's tools, then return the
> canonical page ID and its source.

Show `search_wiki` being selected and the concise result with `pageId`, title,
and snippet. Then ask:

> Read that page and summarize its evidence boundary in three bullets.

Show `read_page` and briefly highlight the returned citations, links, and
revision. Do not leave the full raw result on screen for more than a few
seconds.

**Voiceover:**

> WebMCP makes the browser page's capabilities discoverable to the agent. The
> agent searches first, then reads the canonical page instead of guessing from
> temporary conversation context.

### 1:10–1:45 — Prepare, but do not publish

**Screen:** Ask:

> Propose one sentence that clarifies the evidence boundary. Do not publish
> anything until I explicitly approve the exact text.

Show the proposed sentence and the agent stopping before the write tool.

**Voiceover:**

> HatWiki separates assistance from publication. The agent can prepare a
> useful correction, but it cannot silently write to the shared knowledge base.

### 1:45–2:20 — Explicit authorization and durable revision

**Screen:** Say:

> I approve this exact sentence. Publish it to HatWiki using edit_page.

Show `edit_page`, the authorization field, the success receipt or revision, and
then refresh the page. Briefly show the resulting GitHub revision or the updated
revision on the page.

**Voiceover:**

> After explicit human approval, the authenticated write path validates the
> change and records a durable Git-backed revision. This is a shared memory
> update with attribution and history, not an invisible chat mutation.

### 2:20–2:40 — Close

**Screen:** End on the updated page, then return to the graph or home page.

**Voiceover:**

> HatWiki demonstrates a practical WebMCP pattern: agents help maintain shared
> knowledge, people control publication, and every public result remains
> inspectable.

## Recording checklist

- [ ] Use the deployed URL, not a localhost address.
- [ ] Make `search_wiki`, `read_page`, and `edit_page` visibly readable in the
      recording.
- [ ] Keep the write example harmless and obtain explicit approval on camera.
- [ ] Show one concrete revision or commit result after the edit.
- [ ] Record clear audio and keep the final video below three minutes.
- [ ] Upload the video publicly to YouTube and use the same title and pitch as
      this document.

## Submission checklist

- [ ] Confirm the live URL opens in the required browser environment.
- [ ] Confirm `search_wiki`, `read_page`, and the authenticated `edit_page` flow
      are visible in the final demo.
- [ ] Record a public YouTube video under three minutes with clear audio.
- [ ] Keep the video, title, description, and README in English, or provide
      English translations for any other language material.
- [ ] Confirm the GitHub repository is public and contains source, assets,
      setup instructions, and the Apache 2.0 license.
- [ ] Mention any pre-existing work and clearly describe the WebMCP additions.
- [ ] Test the exact deployed revision after the final deployment.

## Pre-existing work disclosure

HatWiki began as a Git-native Wiki experiment. The competition-period work
extends it with the browser-native WebMCP registration, public projection and
read APIs, authenticated human-authorized editing, revision-safe publication,
the interactive graph, and the GEO knowledge demo.
