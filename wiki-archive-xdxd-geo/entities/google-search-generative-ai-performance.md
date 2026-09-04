---
type: Platform Entity
title: Google Search Console Search Generative AI performance reports
description: Google 第一方公告描述的 Search Console 生成式 AI 搜尋與 Discover 可見性報表；可作為 Google 端觀測變項，不是 citation 或排名效果證據。
resource: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
tags:
  - entity
  - google
  - search-console
  - ai-search
  - generative-search
  - agent-discoverability
  - observability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T12:09:14Z
sources:
  - id: google-gen-ai-performance-reports
    resource: /raw/google-search-generative-ai-performance-2026-08-25.md
    title: Google Search Generative AI performance reports 官方公告（2026-08-25 raw capture）
    author: google/search-central
    last_modified: 2026-06-03
---

# Entity

Google Search Central Blog 在 2026-06-03 公告 Search Console 的 **Search Generative AI performance reports**，用來觀察網站在 Google Search 與 Discover 生成式 AI 功能中的呈現情況。公告說明功能先向部分網站 rollout，並未表示已對所有網站開放。[^google-gen-ai-performance-reports]

## 公告列出的觀測範圍

- **Search 與 Discover**：兩者各有專用的生成式 AI performance report。
- **Impressions**：URL 在生成式 AI 功能中出現的次數。
- **Pages**：哪些網站 URL 出現在 AI features 中。
- **Countries**：按國家理解可見性。
- **Devices**：Search 結果可按裝置觀察。
- **Dates**：可用 hourly、daily、weekly、monthly 粒度觀察時間變化。
- **整體 performance report**：公告說明生成式 AI 資料仍納入整體報表，另提供專用視圖。[^google-gen-ai-performance-reports]

## GEO 研究用途與證據邊界

這個 entity 可把 Google 第一方的生成式 AI **appearance／visibility** 資料作為 Google 端觀測變項，並與 [Bing Webmaster Tools AI Performance](/entities/bing-webmaster-ai-performance.md) 的平台觀測分開記錄。它不等同於 citation observability：本公告列出的欄位是 impressions、pages、countries、devices 與 dates，沒有把引用次數、答案中的引用 URL、答案位置或排名列為本公告的指標。[^google-gen-ai-performance-reports]

因此，本頁不推導以下結論：

- 出現 impression 等於頁面被引用、支持答案或帶來點擊。
- 報表數據等於 Google 排名訊號或 AI answer quality。
- 納入報表等於公開搜尋 visibility、agent discoverability 或流量因果改善。
- Google 的報表與 Bing 的 citation 指標可直接互換或合併成同一個 outcome。

後續若用於 xdxd 實驗，應保存 report surface、property、query／日期範圍、country、device、page 與資料擷取時間，並將 appearance、retrieval、citation、click 分層；本頁目前維持 `draft`，沒有人工或第二 Agent 的 `verified` 紀錄。

原始來源定位見 [Google Search Generative AI performance reports metadata-only raw record](/raw/google-search-generative-ai-performance-2026-08-25.md)。該次 HTML／headers payload 未保存成功，因此引用產品現況前必須回到 canonical source 重新核對。

[^google-gen-ai-performance-reports]: Google Search Central Blog, “Introducing Search Generative AI performance reports in Search Console,” 2026-06-03. Source URL: <https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports>; metadata-only record: [raw locator](/raw/google-search-generative-ai-performance-2026-08-25.md).
