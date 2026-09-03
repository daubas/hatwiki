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

Authenticated writes require a repository-installed GitHub App and these
server-only Worker secrets: `GITHUB_APP_ID`, `GITHUB_CLIENT_ID`,
`GITHUB_CLIENT_SECRET`, `GITHUB_PRIVATE_KEY`, `GITHUB_INSTALLATION_ID`,
`GITHUB_REPOSITORY_ID`, and `SESSION_SECRET`.
