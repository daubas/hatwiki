---
type: Platform Entity
title: Cloudflare Agent Readiness 與 AEO
description: Cloudflare 第一方文章描述的 agent readiness diagnostics、AEO prompt panel 與 AI operator visibility 觀測；僅作為平台觀點與研究變項，不是獨立效果證據。
resource: https://blog.cloudflare.com/aeo/
tags:
  - entity
  - cloudflare
  - agent-readiness
  - aeo
  - agent-discoverability
  - ai-search
  - citation-observability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T12:42:54Z
sources:
  - id: cloudflare-aeo-2026-08-25
    resource: /raw/cloudflare-aeo-2026-08-25.md
    title: Cloudflare「From ranking to recommended」官方文章（2026-08-25 raw capture）
    author: cloudflare/blog
    last_modified: 2026-08-06
---

# Entity

Cloudflare 在 2026-08-06 發布的第一方文章中，將 Agent Readiness 與 AEO 放在同一個 dashboard 脈絡：前者描述 agents 是否能進入、發現、讀取並找到可呼叫介面；後者描述 AI assistants 在特定產業與類別 prompt 中是否推薦或引用網站。這是 Cloudflare 的產品框架與觀測設計，不是跨平台公開規格或已驗證的成效結論。[^cloudflare-aeo-2026-08-25]

## Agent Readiness diagnostics

文章把 Diagnostics 描述為對 hostname 執行的技術檢查：確認存取政策與內容發現、取得 machine-readable copy，並找出 agents 可呼叫的介面。它列出的 agent-facing input 包括 `robots.txt`、XML sitemap、AI crawler rules、response headers、Markdown representation、Content Signals、API catalog、link headers、agent login instructions，以及 OAuth discovery、MCP、A2A agent cards、skills index、Web Bot Auth 與 WebMCP。每個檢查以 pass、fail 或 neutral 回傳，並附帶檢查理由與實際 request／response evidence。[^cloudflare-aeo-2026-08-25]

這使 diagnostics 可作為 xdxd 的 **representation／readability** 研究變項：例如檢查同一個資源是否可被不同 agent 以一致方式取得、解析與呼叫；但不能由檢查通過推導該資源已被搜尋索引、retrieval 選取或 citation。

## AEO visibility 觀測

文章描述 AEO 會依網站推斷產業與類別，以可能的客戶 prompt 探測 Anthropic Claude 與 OpenAI GPT，並觀察回答與來源。文章列出的平台指標包括：[^cloudflare-aeo-2026-08-25]

- **Citation Rate**：在指定類別回答中，引用網站為來源的回答比例。
- **Prominence**：網站被引用時，回答中歸屬於該網站的內容量與出現早晚。
- **Mention Rate**：回答提及品牌的比例，不要求同時引用網站。
- **Share of Voice**：網站在同類別競爭者引用中的比例。

Cloudflare 另描述以類別層級的預先計算 panel 建立 baseline，重用於該類別的帳戶；並以多次、多模型 prompt、回答中的來源、文字分析與 Workers AI 輔助評分取得觀測值。這些實作細節意味著結果會依平台指定的模型、prompt panel、類別推斷、baseline 重用與可用性而變動，不能直接當作跨引擎或跨模型的通用 citation metric。[^cloudflare-aeo-2026-08-25]

## AI Operator Activity

文章描述 AI Operator Activity 觀測每個 operator（例如 OpenAI、Google）對網站的實際 crawl、referral 與錯誤，包括 403 blocked、404 dead link 等。這是網站端流量與回訪觀測，可與 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md) 的 crawler 存取控制，以及 [OpenAI Crawlers](/entities/openai-crawlers.md) 的 bot 角色定義互相對照；它不等同於公開搜尋的 ranking、retrieval 或 citation outcome。[^cloudflare-aeo-2026-08-25]

## GEO 研究用途與限制

本頁新增一個可拆分的觀測層：

1. **Readiness／representation**：agent 是否能合法進入、發現、讀取並呼叫資源。
2. **Recommendation／visibility**：指定模型與 prompt panel 是否提及或引用資源。

兩層必須用不同的資料與對照設計驗證。AEO 的 citation、prominence、mention 與 share-of-voice 是 Cloudflare 平台觀測定義，不能直接與 [Bing Webmaster Tools AI Performance](/entities/bing-webmaster-ai-performance.md) 的 Total Citations、Average Cited Pages 或 grounding queries 視為同一量尺，也不能據此宣稱排名、答案位置、點擊或因果改善。與 [Cloudflare Agentic Internet](/entities/cloudflare-agentic-internet.md) 相比，本頁更聚焦可操作的 diagnostics、prompt panel 與 operator telemetry；前者則是 readable／discoverable／callable／payable 的平台框架。研究保存規則見[證據生命週期](/methods/evidence-lifecycle.md)。

原始來源與不可變證據見 [Cloudflare AEO raw capture](/raw/cloudflare-aeo-2026-08-25.md)；HTML snapshot 見 [snapshot](/raw/cloudflare-aeo-2026-08-25/snapshot.html)。

[^cloudflare-aeo-2026-08-25]: Cloudflare Blog, “From ranking to recommended: get your site ready to thrive in the age of AI agents,” published 2026-08-06 and modified 2026-08-06. Source URL: <https://blog.cloudflare.com/aeo/>; immutable raw capture: [metadata](/raw/cloudflare-aeo-2026-08-25.md) and [HTML snapshot](/raw/cloudflare-aeo-2026-08-25/snapshot.html).
