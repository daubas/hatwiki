---
type: Platform Entity
title: Google Search Preferred Sources 與 AI summaries 個人化
description: Google 第一方公告描述的 Preferred Sources、AI Overviews、AI Mode 與來源呈現個人化功能；不等同 citation 或排名效果證據。
resource: https://developers.google.com/search/docs/appearance/preferred-sources
tags:
  - entity
  - google
  - search
  - ai-search
  - ai-overviews
  - ai-mode
  - source-presentation
  - personalization
  - agent-discoverability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-27T04:40:34Z
sources:
  - id: google-preferred-sources
    resource: /raw/google-search-preferred-sites-2026-08-25.md
    title: Google Search Preferred Sources 與 AI summaries 官方公告（2026-08-25 raw capture）
    author: google/search
    last_modified: 2026-08-20
  - id: google-preferred-sources-docs
    resource: /raw/google-search-preferred-sources-docs-2026-08-25.md
    title: Google Search Preferred Sources 官方文件（2026-08-25 raw capture）
    author: google/search-central
    last_modified: 2026-08-20
  - id: google-ai-mode
    resource: /raw/google-ai-mode-2026-08-27.md
    title: Google Search AI Mode 官方產品頁（2026-08-27 raw capture）
    author: google/search
---

# Entity

Google Blog 在 2026-08-20 公告 Search、Discover 與 Google News 的新個人化功能；Google Search Central 同日更新 publisher 導入文件。這筆 entity 只整理 Google 對產品行為與實作方式的第一方描述，不把平台自報內容當成獨立效果證據。[^google-preferred-sources] [^google-preferred-sources-docs]

## Preferred Sources 與 AI 搜尋 surface

- Google 描述一個可由 publisher 嵌入頁面的互動式「Preferred Sources」按鈕；讀者點擊後，網站會被加入 Google 的 Preferred Source，並回到 publisher 頁面原本的位置。
- 公告稱使用者較容易在 Top Stories、AI Overviews 與 AI Mode 找到偏好的 publications；Google 同時自述截至公告時已有超過 600,000 個 unique sources 被選取。後者是平台自報數字，沒有在本頁提供獨立測量方法或可重現資料集。[^google-preferred-sources]
- 這個設定比較接近**使用者個人化的來源選擇**與 source presentation 變項，而不是內容本身的 citation、一般排名或答案位置訊號。來源公告沒有證明偏好設定會提高所有查詢、所有使用者或所有區域的 retrieval／citation 機率。

## Google Search Central 官方 publisher 實作文件

- 官方文件表示 Preferred Sources 可在 Google Search 的 Top Stories 中使用；在功能可用的語言與地區，AI Mode 與 AI Overviews 也可能對已被使用者選為偏好來源的內容顯示「preferred」badge。這是產品行為描述，不是對 ranking、retrieval 或 citation 的效果保證。[^google-preferred-sources-docs]
- source preferences tool 的資格以 domain-level 或 subdomain-level site 為單位；文件的例子表示 `https://www.example.com/` 與 `https://code.example.com/` 可符合資格，但 `https://www.example.com/blog` 這類 subdirectory 不符合。[^google-preferred-sources-docs]
- 文件列出三種 publisher 引導方式：推薦的標準 JavaScript 互動按鈕、可自訂設計資產的進階 JavaScript 整合，以及無法使用互動按鈕時的 deeplink。標準按鈕的最小嵌入包含載入 `https://news.google.com/swg/js/v1/publisher.js` 的 `<script>` 與帶有 `google-add-preferred-source-btn` 的 `<div>`；另可設定 `data-theme` 與 `data-lang`。[^google-preferred-sources-docs]
- 文件說明這些方法是幫助讀者選取網站的例子，不是出現在 Preferred Sources 中的必要條件。因此，publisher implementation、使用者選取狀態與 Search surface 必須和 appearance、retrieval、source presentation、citation、click 分開記錄。[^google-preferred-sources-docs]

## Google AI Mode 官方產品 surface

Google Search 官方 AI Mode 產品頁將 AI Mode 描述為可用文字、語音、照片或圖片上傳提問，並以 Gemini 3 的進階推理、思考與多模態理解支援產品體驗；頁面也描述回答中的 web links、follow-up 問題與回到過去搜尋的能力。這是 Google 對現行 user-facing surface 的第一方描述，不是獨立品質或搜尋效果證據。[^google-ai-mode]

同一頁還列出 Search Live 的即時對話／影片脈絡、Personal Intelligence 連接部分 Google app、依問題產生互動式視覺，以及「experimental、可能出錯、結果可能變動」的風險提示。這些應作為實驗中的 surface、輸入模態、session state 與風險欄位保存；不能把「高品質資訊」「評估來源」等產品文案當作 citation entailment、retrieval recall、source diversity 或 GEO uplift 的測量。[^google-ai-mode]

本次 snapshot 未提供可定位的發布或最後修改日期；後續若頁面模型、功能、可用地區或警示改變，應建立新的 dated snapshot，而不是覆寫既有 raw evidence。原始證據見 [Google AI Mode raw capture](/raw/google-ai-mode-2026-08-27.md) 與 [HTML snapshot](/raw/google-ai-mode-2026-08-27/snapshot.html)。

## 研究用途

後續若觀測 Google Search 的 AI surface，應把下列條件分開保存，而不是合併成一個「GEO 成效」欄位：

- Search surface：Top Stories、AI Overviews、AI Mode 或其他產品 surface。
- 使用者／測試設定：Preferred Source 是否已選取、帳戶或匿名狀態、區域、語言、裝置與功能 rollout 狀態。
- 查詢與結果：原始 query、時間、顯示的 source URL、是否出現 source link、答案中的 citation／link 呈現與點擊；若無法觀測則明確記錄為 unknown。
- outcome 分層：appearance、retrieval、source presentation、citation、click；不能用 Preferred Source 被選取取代其中任一 outcome。

這與 [Google Search Console Search Generative AI performance reports](/entities/google-search-generative-ai-performance.md) 的 aggregate appearance／visibility 報表應分開分析；後者也不等同 citation。Google 官方 GEO 研究基線則可用來區分可索引性、內容品質與平台個人化變項。[Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md)

## 來源呈現的額外邊界

同一公告另描述 Google News Android audio briefings 可按主題自訂，並提供清楚的來源 attribution 與前往完整文章的連結。這支持把「來源是否被清楚標示及可回溯」列為 source-presentation 觀測欄位，但它屬於 Google News audio briefing，不應直接外推到 Search 的 AI citation 行為。[^google-preferred-sources]

## Evidence boundary

本頁支持：Preferred Sources 功能的公告存在、Google 對 AI Overviews／AI Mode 中偏好來源呈現的產品描述、domain／subdomain 資格與 publisher button／deeplink implementation，以及 Google News audio briefings 的 attribution／link 描述。本頁不支持：

- Preferred Sources 會提高 Google 排名、AI citation rate、答案位置、點擊或轉換。
- Google 自述的 600,000 unique sources 可代表整體使用者、所有市場或所有 Search surface。
- AI summary、source preference、appearance、retrieval、citation 與 click 可以互換。
- 這項 Google 個人化功能可直接推論到 Bing、ChatGPT、Claude、Perplexity 或其他跨引擎結果。
- publisher button 或 deeplink 的導入會提高 Google ranking、retrieval、citation、答案位置、click 或轉換。

本頁維持 `draft`，尚無人工或獨立第二方驗證紀錄。原始來源與不可變證據見 [Google Preferred Sources 公告 raw capture](/raw/google-search-preferred-sites-2026-08-25.md) 及 [Google Preferred Sources 官方文件 raw capture](/raw/google-search-preferred-sources-docs-2026-08-25.md)；HTML snapshots 見 [公告 snapshot](/raw/google-search-preferred-sites-2026-08-25/snapshot.html) 與 [官方文件 snapshot](/raw/google-search-preferred-sources-docs-2026-08-25/snapshot.html)。

[^google-preferred-sources]: Google Blog, “Personalize the content you see on Search, Discover, and News,” published 2026-08-20, modified 2026-08-20. Source URL: <https://blog.google/products-and-platforms/products/search/personalize-search-discover-news/>; immutable raw capture: [metadata](/raw/google-search-preferred-sites-2026-08-25.md) and [HTML snapshot](/raw/google-search-preferred-sites-2026-08-25/snapshot.html).

[^google-preferred-sources-docs]: Google Search Central, “Guide to Preferred Sources in Google Search for Web Publishers,” last updated 2026-08-20 UTC. Source URL: <https://developers.google.com/search/docs/appearance/preferred-sources>; immutable raw capture: [metadata](/raw/google-search-preferred-sources-docs-2026-08-25.md), [HTML snapshot](/raw/google-search-preferred-sources-docs-2026-08-25/snapshot.html), and [HTTP headers](/raw/google-search-preferred-sources-docs-2026-08-25/response-headers.txt).

[^google-ai-mode]: Google Search, “Google AI Mode - a new way to search, whatever’s on your mind.” Source URL: <https://search.google/ways-to-search/ai-mode/>; immutable raw capture: [metadata](/raw/google-ai-mode-2026-08-27.md), [HTML snapshot](/raw/google-ai-mode-2026-08-27/snapshot.html), and [HTTP headers](/raw/google-ai-mode-2026-08-27/response-headers.txt). The capture did not expose a separately attributable publication or last-modified date.
