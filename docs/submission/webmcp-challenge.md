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

## Demo script — target length 2:40

### 0:00–0:20 — The problem

Show the HatWiki home page and say:

> Agent conversations are useful, but their context is temporary. HatWiki is a
> shared memory layer where humans and agents can read the same knowledge and
> preserve the decisions that matter.

### 0:20–0:55 — Human browsing

Open the Wiki index, search for `agent`, open a GEO research page, and show its
source link, citations, and related page links.

Say:

> The same knowledge is readable as a normal Wiki, with provenance and graph
> relationships visible to a person.

### 0:55–1:35 — Agent discovery and reading

In ChatGPT with WebMCP enabled, ask the agent:

> Find the HatWiki page about Agent2UCB, then read it and summarize the evidence
> boundary in three bullets.

Show the agent selecting `search_wiki`, then `read_page`, and point out that the
page ID, citations, links, and revision come from the structured result.

### 1:35–2:20 — Human-authorized publishing

Ask the agent:

> Propose a small clarification to the evidence-boundary paragraph. Do not
> publish until I explicitly approve it.

Show the proposed content, then explicitly approve it. Show the agent calling
`edit_page`, followed by the resulting revision or commit link. Refresh the page
and show the updated text and backlink/graph context.

Say:

> The agent can prepare the change, but publication is an explicit human action.
> The result is a durable Git revision, not an untraceable chat mutation.

### 2:20–2:40 — Close

Say:

> HatWiki demonstrates a practical WebMCP pattern: agents help maintain shared
> knowledge, people control publication, and every public result remains
> inspectable.

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
