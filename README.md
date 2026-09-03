# HatWiki

Humans and Agents Together: a Git-native collaborative Wiki exposed to browser
agents through WebMCP.

HatWiki is under test-driven development. See
[`docs/contracts/public-read-slice.md`](docs/contracts/public-read-slice.md) for
the first executable product slice.

Live test: <https://hatwiki.daubas-chen.workers.dev>

```sh
npm ci
npm test
npm run build
```

The canonical Markdown lives in `wiki/`. Private Git keeps history and
attribution; Cloudflare R2 serves the public projection, D1 stores idempotent
edit receipts, and browser agents use the same read/edit APIs through WebMCP.

The WikiLink graph is a derived, force-directed view: pages and WikiLink
targets are nodes, links are edges, and backlinks may influence node size. Its
drag, zoom, tooltip, and page-opening interactions take visual inspiration from
[Lieflat Charts](https://github.com/larashero3-dotcom/lieflat-charts/blob/main/templates/big-force.html),
but HatWiki implements them independently with its existing D3 stack. Lieflat's
PolyForm Noncommercial code and templates are not dependencies.

Authenticated writes require a repository-installed GitHub App and these
server-only Worker secrets: `GITHUB_APP_ID`, `GITHUB_CLIENT_ID`,
`GITHUB_CLIENT_SECRET`, `GITHUB_PRIVATE_KEY`, `GITHUB_INSTALLATION_ID`,
`GITHUB_REPOSITORY_ID`, and `SESSION_SECRET`.

## License

HatWiki source code is licensed under the
[Apache License 2.0](LICENSE). Demo Wiki content and third-party materials
retain their source-specific licenses and attribution requirements.
