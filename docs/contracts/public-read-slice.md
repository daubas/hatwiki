# Public read slice

The first HatWiki slice exposes one public Wiki snapshot through both the Astro
site and WebMCP read tools.

## Public seams

- `PublicProjection.readSnapshot()` returns `{ revision, pages }`.
- `PublicWiki.searchWiki(query)` returns at most eight concise `{ pageId,
  title, snippet, resource? }` results; `readPage(pageId)` provides the full
  public page.
- `PublicWiki.readPage(pageId)` returns one canonical page plus links,
  backlinks, citations, revision, and pending conflict candidates.
- Anonymous WebMCP sessions expose only `search_wiki` and `read_page`.

## Contracts

- A page ID is its case-preserving, bundle-relative path without `.md`.
- Exact paths resolve first. A bare WikiLink resolves only when its basename is
  unique; ambiguous and missing links remain visible and are never guessed.
- Backlinks and graph edges derive from forward links in the same snapshot.
- Only projected pages enter the snapshot. Raw sources and private extraction
  data never reach these read seams.
- Wiki text is untrusted content. Rendered output must not execute embedded
  HTML or scripts.
- A successful read reports the snapshot revision used for the result.

## Acceptance fixture

The fixture contains two pages with the same basename in different folders, a
resolved full-path link, an ambiguous bare link, an unresolved link, public
citations, and script-like source text. Tests assert the behavior through the
public methods above rather than parser internals.
