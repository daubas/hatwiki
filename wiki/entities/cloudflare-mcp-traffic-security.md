---
type: Platform Entity
title: Cloudflare MCP Traffic Detection 與 Portal Governance
description: Cloudflare 第一方文章對 MCP protocol signals、Gateway 觀測、Shadow MCP、Portal bypass 與 Portal-only policy 的平台描述；是 agent traffic governance 研究變項，不是 GEO 效果證據。
resource: https://blog.cloudflare.com/mcp-security-updates/
tags:
  - entity
  - cloudflare
  - mcp
  - agent-security
  - agent-observability
  - protocol-signals
  - agentic-internet
  - traffic-governance
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T17:19:33Z
sources:
  - id: cloudflare-mcp-security-updates-2026-08-25
    resource: /raw/cloudflare-mcp-security-updates-2026-08-25.md
    title: Cloudflare「How Cloudflare detects MCP traffic and helps secure it」官方文章（2026-08-25 raw capture）
    author: cloudflare/aj-gerstenhaber-kenny-johnson
    last_modified: 2026-08-18
  - id: cloudflare-mcp-portals-mcp-2026-08-26
    resource: /raw/cloudflare-mcp-portals-mcp-2026-08-26.md
    title: Cloudflare「MCP server portals support MCP 2026-07-28 specification」官方變更紀錄（2026-08-26 raw capture）
    author: cloudflare/developers
    last_modified: 2026-08-25
---

# Entity

Cloudflare Blog 的 2026-08-14 文章描述 Cloudflare One 如何辨識受檢查的 MCP traffic、顯示產生流量的 users／servers，並在 managed network paths 上控制 direct connections；文章把這些能力放在 MCP Server Portals 與 agent tool governance 的脈絡中。這是 Cloudflare 的第一方產品與技術敘述，不是公開搜尋引擎的通用規格。[^cloudflare-mcp-security-updates-2026-08-25]

## MCP traffic 的可觀測訊號

文章指出 MCP server 可讓 agent discover 與 invoke 由 SaaS、內部應用與 API 支援的 tools；但 MCP traffic 不保證使用特定 hostname 或 `/mcp` path，因此只用 URL／path pattern 可能漏掉普通 API URL，也可能誤判。Cloudflare 將 `MCP-Protocol-Version` 描述為較具體的 positive indicator，並說明其 presence 不能涵蓋 legacy、local `stdio`、custom transport 或 nonconforming traffic；absence 也不能證明不是 MCP。[^cloudflare-mcp-security-updates-2026-08-25]

文章引用 MCP 2026-07-28 的 stateless request model，描述每個 request 可帶 `MCP-Protocol-Version`、`Mcp-Method` 與 `Mcp-Name`，讓 HTTP infrastructure 在不解析 body 的情況下取得 operation／tool 訊號。這裡只記錄 Cloudflare 文章對該 protocol revision 的引用與研究用途，不把文章當成 MCP 規格本身。[^cloudflare-mcp-security-updates-2026-08-25]

## MCP Portal 的 protocol compatibility observation

Cloudflare Developers Changelog 於 2026-08-25 另自述，Cloudflare One Access MCP server portals 支援 stateless MCP 2026-07-28 specification；portal 的 `/mcp` endpoint 可接受 MCP 2026-07-28 requests 與較早的 2025 Streamable HTTP clients。當 portal 連接 upstream Streamable HTTP server 時，會檢查 upstream 是否支援 MCP 2026-07-28，必要時退回 2025 handshake；client 與 upstream 的 protocol selection 可獨立升級，SSE connections 則繼續使用 legacy protocol。這是 Cloudflare 對自身 Portal 實作與相容性行為的第一方描述，不是 MCP 規格本身。[^cloudflare-mcp-portals-mcp-2026-08-26]

對 xdxd 的 agent-facing observation 而言，這支持把 `client_protocol`、`upstream_protocol`、`portal_fallback`、`transport_mode` 與 protocol migration state 分開記錄；它不能推導 MCP Portal、stateless protocol 或 fallback path 會提高公開搜尋 ranking、retrieval、citation、流量或整體 agent discoverability。原始證據與不可變 snapshot 見 [Cloudflare MCP Portal compatibility raw capture](/raw/cloudflare-mcp-portals-mcp-2026-08-26.md)。

## 三個控制層級

Cloudflare 將一次 MCP tool call 的觀測與控制分成三層：

1. **Client**：client hook 可在 request serialization 前讀取 destination、tool name 與 arguments，也能處理不產生 network traffic 的 local `stdio` server；但組織必須跨不同 client 重複部署控制。
2. **Network**：具 TLS decryption 的 secure web gateway 可在 managed path 關聯 user／device、檢查 destination／protocol headers、辨識 remote MCP traffic，並依政策允許或阻擋；它看不到 local `stdio` 或 off-network traffic。
3. **Server**：MCP server middleware 擁有最完整的 authentication、tool schema、arguments 與 execution context，可在 handler 執行前授權、限速、檢查與記錄結果。

這個分層可作為 xdxd agent observation 的資料模型候選，但不能把任何一層的存在推導成搜尋 ranking、retrieval 或 citation 改善。[^cloudflare-mcp-security-updates-2026-08-25]

## Shadow MCP 與 Portal bypass

文章把 **Shadow MCP** 定義為組織尚未核准的 MCP server direct connection；把 **Portal bypass** 定義為已放入 MCP Portal 的 approved server 被直接連到 upstream URL，因而繞過 Portal 的 Access policy、curated tool catalog、DLP 與 tool-level audit trail。這兩者需要分開記錄，因為「未知 server」與「已知 server 的 approved path 被繞過」是不同治理問題。[^cloudflare-mcp-security-updates-2026-08-25]

Cloudflare 文章自述 Gateway 可對 TLS-inspected request 套用 `experimental.is_mcp == true` selector，並提供 MCP traffic dashboard，觀察 MCP requests、unique users／servers、server request counts、on-ramp、Portal 與 direct client connections，以及 Portal 外的 top servers。文章也給出以 `experimental.is_mcp == true` 搭配非 `mcp_portal` on-ramp 的 baseline block policy；這些是 Cloudflare 平台的第一方能力描述，應以產品版本與授權環境重驗。[^cloudflare-mcp-security-updates-2026-08-25]

## GEO／Agent observability 研究用途與邊界

此 entity 可作為 agent-facing traffic governance 與觀測方法的候選資料模型。授權實驗可分開保存：

- client、transport（remote HTTP／local `stdio`）、MCP protocol version 與 request／response timestamp；
- destination server、path、`MCP-Protocol-Version`、`Mcp-Method`、`Mcp-Name`、JSON-RPC method 與 tool arguments 的 hash 或受控摘要；
- TLS inspection、user／device scope、Portal／direct on-ramp、policy decision、server-side authorization 與 tool execution outcome；
- shadow／approved／bypass classification，以及與 representation、retrieval、citation、click outcome 的時間對齊。

這些欄位支持觀察 agent 能否在授權邊界內發現、呼叫與完成工具操作；不支持「MCP detection、Portal、protocol headers 或治理政策會提升 Google、Bing、ChatGPT、Perplexity 或其他公開 AI Search 的 ranking、retrieval、citation 或整體 agent discoverability」。本頁維持 `status: draft`，未加入人工 `verified`。

與 [Cloudflare Agentic Internet](/entities/cloudflare-agentic-internet.md) 相比，本頁聚焦 MCP traffic 的 network／server governance 與 observability；與 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md) 相比，本頁不是網站端 AI crawler access policy。研究保存規則見[證據生命週期](/methods/evidence-lifecycle.md)。原始證據與不可變 body 見 [Cloudflare MCP security raw capture](/raw/cloudflare-mcp-security-updates-2026-08-25.md) 與 [HTML snapshot](/raw/cloudflare-mcp-security-updates-2026-08-25/snapshot.html)。

[^cloudflare-mcp-security-updates-2026-08-25]: Cloudflare Blog, “How Cloudflare detects MCP traffic and helps secure it,” published 2026-08-14 and modified 2026-08-18. Source URL: <https://blog.cloudflare.com/mcp-security-updates/>; immutable raw capture: [metadata](/raw/cloudflare-mcp-security-updates-2026-08-25.md) and [HTML snapshot](/raw/cloudflare-mcp-security-updates-2026-08-25/snapshot.html).

[^cloudflare-mcp-portals-mcp-2026-08-26]: Cloudflare Developers Changelog, “MCP server portals support MCP 2026-07-28 specification,” published and modified 2026-08-25. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-25-mcp-portals-mcp-2026-07-28/>; immutable raw capture: [metadata](/raw/cloudflare-mcp-portals-mcp-2026-08-26.md) and [HTML snapshot](/raw/cloudflare-mcp-portals-mcp-2026-08-26/snapshot.html).
