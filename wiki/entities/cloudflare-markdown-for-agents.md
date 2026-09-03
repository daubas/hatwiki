---
type: Platform Entity
title: Cloudflare Markdown for Agents
description: Cloudflare 官方文件描述以 Accept text/markdown 進行 HTML 邊緣轉換、回應 metadata 與 Content Signals，作為 agent-facing content representation 的平台能力。
resource: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
tags:
  - entity
  - cloudflare
  - markdown
  - agent-discoverability
  - structured-content
  - content-negotiation
  - content-signals
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T15:22:46Z
sources:
  - id: cloudflare-markdown-for-agents-docs
    resource: /raw/cloudflare-markdown-for-agents-2026-08-25.md
    title: Cloudflare Markdown for Agents 官方文件（2026-08-25 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-07-13
---

# Entity

Cloudflare 官方文件把 **Markdown for Agents** 描述為一種由 edge 進行的內容轉換能力：當 client 以 `Accept: text/markdown` 請求、且網站啟用該功能時，Cloudflare 可從 origin 取得 HTML，轉成 Markdown，再回傳給 agent 或其他 AI system。這是 Cloudflare 的平台產品描述，不是公開搜尋引擎的通用行為規則。[^cloudflare-markdown-for-agents-docs]

## Agent-facing response contract

- 轉換後 response 的 `Content-Type` 為 `text/markdown; charset=utf-8`；`Vary` 會包含 `Accept`，使 HTML 與 Markdown 變體可分開快取。來源也說明 `Content-Length` 會重算，描述原始 body 的 `ETag`、`Last-Modified` 等 headers 會被移除。[^cloudflare-markdown-for-agents-docs]
- Cloudflare 會加入 `x-markdown-tokens` 與 `x-original-tokens`，分別表示轉換後 Markdown 與原始 HTML 的估計 token 數，可供 context-window sizing 或 chunking strategy 參考。[^cloudflare-markdown-for-agents-docs]
- 本輪對同一 canonical URL 的 `Accept: text/markdown` response 實測保存 `x-markdown-tokens: 4289`、`x-original-tokens: 46485`；這是本次 response metadata observation，不是跨來源效果量。原始 headers 與 response body 見 [raw capture](/raw/cloudflare-markdown-for-agents-2026-08-25.md)。[^cloudflare-markdown-for-agents-docs]

## Structured output

文件描述轉換輸出固定包含三個可能部分：從 HTML meta tags 擷取的 YAML frontmatter、清除 headers／footers／navigation／scripts／styles 後的 Markdown body，以及保留在結尾 fenced `json` code block 的 JSON-LD。YAML frontmatter 支援 `title`、`description`、`image`；`title` 與 `description` 先取標準 `meta`，缺少時才 fallback 到 Open Graph meta。[^cloudflare-markdown-for-agents-docs]

這讓 Markdown 變體可作為一個明確的 **agent-facing representation** 研究變項：同一 URL 可在固定 HTML 與 `text/markdown` 請求下比較 metadata、正文結構、JSON-LD 保留、token 數、retrieval、引用與答案呈現，而不必把「格式較適合 AI」直接當成已證實的搜尋效果。

## Content Signals 與政策邊界

來源說明：若 origin 已提供 `content-signal` header，轉換 response 會保留 origin 的值；若 origin 沒有提供，Markdown for Agents 會加入預設 `Content-Signal: ai-train=yes, search=yes, ai-input=yes`，其中 `ai-input` 包含 agentic use。這是 content-use preference 的平台表示，不等於 crawler 已抓取、搜尋系統已索引、回答已引用或 agent 已發現來源。[^cloudflare-markdown-for-agents-docs]

## 啟用與限制

文件把啟用方式放在 Cloudflare AI Crawl Control 與 Configuration Rules 的 zone、subdomain 或 path scope，也描述 API `content_converter` 設定；頁面標示 Pro、Business、Enterprise 與 SSL for SaaS 可用，且轉換僅支援 HTML，origin response 上限為 2 MB（2,097,152 bytes）。這些產品資格與限制可能變更，研究保存時應以新的 snapshot 重新核對。[^cloudflare-markdown-for-agents-docs]

## GEO 研究用途與邊界

與 [Cloudflare AI Search 的 agent-facing surface](/entities/cloudflare-ai-search-agent-integrations.md) 及 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md) 相比，本 entity 的焦點是**同一來源的內容表示與政策 header**，不是 agent retrieval endpoint 或 crawler access control。可納入受控實驗的欄位包括：canonical URL、`Accept` header、HTML／Markdown content type、`Vary`、token headers、Content Signals、YAML metadata、正文結構、JSON-LD、origin bytes、crawl／index observation、retrieved source、citation 與答案位置。[^cloudflare-markdown-for-agents-docs]

本 entity 不支持「啟用 Markdown for Agents 即提升 Google、Bing、ChatGPT、Perplexity 或其他公開搜尋的排名、retrieval、citation、答案位置、click 或整體 agent discoverability」的因果結論；平台文件的效益語句仍屬 Cloudflare 第一方產品敘述。整理內容維持 `status: draft`，未加入人工 `verified`。

原始證據與不可變 body 見 [Cloudflare Markdown for Agents raw capture](/raw/cloudflare-markdown-for-agents-2026-08-25.md)、[HTML snapshot](/raw/cloudflare-markdown-for-agents-2026-08-25/snapshot.html) 與 [`text/markdown` response](/raw/cloudflare-markdown-for-agents-2026-08-25/markdown-response.txt)。研究保存規則見[證據生命週期](/methods/evidence-lifecycle.md)。

[^cloudflare-markdown-for-agents-docs]: Cloudflare Developers, “Markdown for Agents,” page marked last updated 2026-07-13. Source URL: <https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/>; immutable raw capture: [metadata](/raw/cloudflare-markdown-for-agents-2026-08-25.md), [HTML snapshot](/raw/cloudflare-markdown-for-agents-2026-08-25/snapshot.html), and [`text/markdown` response](/raw/cloudflare-markdown-for-agents-2026-08-25/markdown-response.txt).
