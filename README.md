# HatWiki

Humans and Agents Together: a Git-native collaborative Wiki exposed to browser
agents through WebMCP.

HatWiki is under test-driven development. See
[`docs/contracts/public-read-slice.md`](docs/contracts/public-read-slice.md),
[`docs/contracts/edit-page-slice.md`](docs/contracts/edit-page-slice.md), and
[`docs/contracts/source-ingestion-slice.md`](docs/contracts/source-ingestion-slice.md)
for the executable product slices.

Live test: <https://hatwiki.daubas-chen.workers.dev>

```sh
npm ci
npm test
npm run build
```

Published Wiki edits are committed through GitHub and served from the Cloudflare
R2 public projection. D1 stores idempotent edit receipts and private plain-text
source tasks; it is not a second public Wiki.

## Browser-agent setup

Open the live site in a browser that provides the browser-native
`document.modelContext` API. HatWiki registers tools there when the page loads;
without that API, the site remains an ordinary Wiki. It reuses the site's GitHub
session—tools never accept a GitHub token as input.

- Anonymous sessions register `search_wiki` and `read_page` for the public
  projection.
- A signed-in GitHub session additionally registers `edit_page`, `add_source`,
  `get_ingestion_status`, and `inspect_changes`.

`search_wiki` returns bounded public summaries and `read_page` returns a public
page. In a signed-in session, `read_page` also supplies the canonical Markdown
and base SHA needed to prepare an edit, but only for a page already in the
public projection. `add_source` privately stores one authorized plain-text
source for an existing page; `get_ingestion_status` is limited to that source's
owner; and `inspect_changes` summarizes a proposed page's citations, WikiLinks,
affected page, and unresolved markers before submission.

## Publication, privacy, and rights boundaries

`edit_page` and `add_source` require a signed-in GitHub session plus an explicit
declaration that the submitter may provide and publish the material. That
declaration is a required user assertion, not a grant of copyright, privacy, or
third-party rights. Do not submit secrets, personal data, or material you are
not allowed to publish.

Source bodies, their hashes, and owner-scoped task state stay in private D1 and
never enter the public R2 projection. A published page may retain a private
source citation, but it is displayed as an unavailable reference rather than a
link to the source body. Each write is authorized again by the server; a
successful receipt follows GitHub and R2 page-byte readback. A later public
`read_page` response reports a derived `r2-*` snapshot revision, not the Git
commit SHA. Stale edits become conflict candidates instead of overwriting a
newer page.

The WikiLink graph is a derived, force-directed view: pages and WikiLink
targets are nodes, links are edges, and backlinks may influence node size. Its
drag, zoom, keyboard, tooltip, and page-opening interactions take visual
inspiration from [Lieflat Charts](https://github.com/larashero3-dotcom/lieflat-charts/blob/main/templates/big-force.html),
but HatWiki implements them independently with its existing D3 stack. Lieflat's
PolyForm Noncommercial code and templates are not dependencies.

## Deployment requirements

Use Node.js 22.12 or newer. The Worker needs a D1 binding named
`HATWIKI_STATE`, an R2 binding named `HATWIKI_PUBLIC`, and a GitHub App whose
callback is `<worker-origin>/auth/callback`. Install that App only on the Wiki
repository with repository metadata read and contents read/write permissions,
then apply the checked-in D1 migrations before deployment:

```sh
npx wrangler d1 migrations apply hatwiki-state --remote
npm run deploy
```

Authenticated writes require these server-only Worker secrets:
`GITHUB_APP_ID`, `GITHUB_CLIENT_ID`,
`GITHUB_CLIENT_SECRET`, `GITHUB_PRIVATE_KEY`, `GITHUB_INSTALLATION_ID`,
`GITHUB_REPOSITORY_ID`, and `SESSION_SECRET`. Never expose them in browser code,
tool input, recordings, or source material.

## License

HatWiki source code is licensed under the
[Apache License 2.0](LICENSE). Demo Wiki content and third-party materials
retain their source-specific licenses and attribution requirements.
