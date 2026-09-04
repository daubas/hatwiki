#!/usr/bin/env bash
# Fetch external wiki content from a public GitHub repo.
# Usage: WIKI_REPO=daubas/webmcp-okf WIKI_REF=main ./scripts/fetch-wiki.sh
set -euo pipefail

WIKI_REPO=${WIKI_REPO:-daubas/webmcp-okf}
WIKI_REF=${WIKI_REF:-main}
WIKI_DIR=${WIKI_DIR:-.wiki-external}

echo "Fetching wiki from github.com/$WIKI_REPO@$WIKI_REF..."

rm -rf "$WIKI_DIR"
mkdir -p "$WIKI_DIR"

curl -sL "https://github.com/$WIKI_REPO/archive/$WIKI_REF.tar.gz" \
  | tar xz --strip-components=1 -C "$WIKI_DIR"

# Record provenance
COMMIT=$(curl -s "https://api.github.com/repos/$WIKI_REPO/commits/$WIKI_REF" | grep '"sha"' | head -1 | cut -d'"' -f4)
echo "repo: $WIKI_REPO" > "$WIKI_DIR/.provenance.yml"
echo "ref: $WIKI_REF" >> "$WIKI_DIR/.provenance.yml"
echo "commit: $COMMIT" >> "$WIKI_DIR/.provenance.yml"
echo "fetched: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$WIKI_DIR/.provenance.yml"

echo "Wiki fetched: $WIKI_DIR (commit: ${COMMIT:0:10})"
