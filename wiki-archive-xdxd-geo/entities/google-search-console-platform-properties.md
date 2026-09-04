---
type: Platform Entity
title: Google Search Console 平台屬性
description: Google 第一方公告描述的社群與影音平台屬性觀測，可用於跨 Search、Discover、News 的內容表現與介入追蹤；不等同 AI citation 或排名效果。
resource: https://developers.google.com/search/blog/2026/07/platform-properties-social-video-guide
tags:
  - entity
  - google
  - search-console
  - cross-surface-observability
  - structured-content
  - agent-discoverability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T14:06:07Z
sources:
  - id: google-search-console-platform-properties
    resource: /raw/google-search-platform-properties-2026-08-25.md
    title: Google Search Console 平台屬性官方公告（2026-08-25 raw capture）
    author: google/search-central
    last_modified: 2026-07-29
  - id: google-search-console-social-video-platforms
    resource: /raw/google-search-console-social-video-2026-08-25.md
    title: Google Search Console 社群／影音平台屬性官方公告（2026-08-25 raw capture）
    author: google/search-central
    last_modified: 2026-07-07
---

# Entity

Google Search Central Blog 於 2026-07-29 公告 Search Console 平台屬性已全球可用，讓使用者追蹤 Instagram、TikTok、X 與 YouTube 的社群／影音貼文在 Google Search、Discover 與 Google News 的表現。[^google-search-console-platform-properties]

## 官方公告列出的觀測與分析

- **跨平台屬性**：可將不同平台的內容作為 Search Console properties 觀測；公告明確列出 Instagram、TikTok、X 與 YouTube。[^google-search-console-platform-properties]
- **Search、Discover、Google News**：觀測範圍是這三個 Google surface；此頁沒有把平台屬性描述成 AI Overviews 或 AI Mode 報表。[^google-search-console-platform-properties]
- **Search audience**：Insights report 可用 query groups 觀察哪些搜尋主題將流量送到社群與影音內容。[^google-search-console-platform-properties]
- **短期波動**：公告列出 24-hour filter，用來找近期貼文的搜尋流量突增。[^google-search-console-platform-properties]
- **跨平台比較**：可將多個 property 的 performance data 匯出至同一 spreadsheet，並排比較 YouTube、Instagram、X 與 TikTok。[^google-search-console-platform-properties]
- **介入追蹤**：公告提到用 annotations 記錄改寫 YouTube title 或 TikTok caption 等外部更新，再觀察 Search performance 是否隨時間變化；這可作為研究設計的事件標記，不是公告已證明的因果效果。[^google-search-console-platform-properties]
- **格式與內容比較**：頁面提到 page filters 與 comparison mode，可比較 video playlist 或短影音與長影音的 Search traffic。[^google-search-console-platform-properties]

## 社群／影音 platform property 的直接產品描述

Google 於 2026-07-07 的另一篇 Search Central Blog 公告直接說明 platform properties 的用途是理解社群與影音貼文在 Google Search、Discover 的表現，並列出 Instagram、TikTok、X、YouTube 四種平台。[^google-search-console-social-video-platforms]

- **Performance report**：官方公告列出 total clicks、impressions 與其他指標，可依貼文與 query 篩選／排序，並可匯出資料。[^google-search-console-social-video-platforms]
- **Insights report**：官方公告列出近期流量趨勢、熱門貼文，以及使用者如何在 Google 發現帳號的高層次摘要。[^google-search-console-social-video-platforms]
- **Achievements 與 rollout**：公告描述可追蹤最近 28 天的點擊里程碑，且 platform properties 在 2026-07-07 公告時會於接下來數週逐步開放。[^google-search-console-social-video-platforms]

## GEO 研究用途與證據邊界

本 entity 可補充 [Google Search Console Search Generative AI performance reports](/entities/google-search-generative-ai-performance.md) 的 Google 端觀測面：前者聚焦社群／影音 property 在 Search、Discover、News 的 performance，後者聚焦公告所述的生成式 AI features appearance／visibility。兩者的 surface、欄位與定義必須分開保存，不應合併成單一 AI discoverability outcome。[^google-search-console-platform-properties]

兩篇公告的觀測範圍需分開核對：2026-07-07 頁面直接描述 Search 與 Discover 的 platform property 報表；2026-07-29 頁面則描述平台屬性全球可用與 Search、Discover、Google News 的跨 surface 觀測。[^google-search-console-social-video-platforms][^google-search-console-platform-properties] 新頁面本身不支持把 platform property 指標解讀為 AI Overviews／AI Mode appearance、citation、排名或 agent discoverability 成效。[^google-search-console-social-video-platforms]

這份公告支持把以下內容納入跨時間、跨平台的觀測設計：

1. property 與 platform identity；
2. Search／Discover／News surface；
3. query group、日期範圍、24-hour filter、page／format filter；
4. title、caption 等外部介入的 annotation 與前後時間窗；
5. 多平台匯出後的並排比較。

但它不支持以下結論：

- 社群或影音 property 的可觀測表現等於 AI answer citation、grounding 或答案中的來源位置。
- 平台屬性或內容結構會提升 Google 排名、AI Overviews／AI Mode appearance 或 agent discoverability。
- annotation 前後的變化是平台功能造成的因果效果。
- Search、Discover、Google News 的 performance 指標可直接與 Bing citation 或 Google generative-AI report 的欄位互換。

本頁維持 `draft`，沒有人工或第二 Agent 的 `verified` 紀錄。原始來源與不可變證據見 [Google Search Console 平台屬性 raw capture](/raw/google-search-platform-properties-2026-08-25.md) 與 [Google Search Console 社群／影音平台屬性 raw capture](/raw/google-search-console-social-video-2026-08-25.md)；HTML snapshots 見 [平台屬性 snapshot](/raw/google-search-platform-properties-2026-08-25/snapshot.html) 與 [社群／影音 snapshot](/raw/google-search-console-social-video-2026-08-25/snapshot.html)。

[^google-search-console-platform-properties]: Google Search Central Blog, “Platform properties roll out globally, plus a new social and video performance guide,” 2026-07-29. Source URL: <https://developers.google.com/search/blog/2026/07/platform-properties-social-video-guide>; immutable raw capture: [metadata](/raw/google-search-platform-properties-2026-08-25.md) and [snapshot](/raw/google-search-platform-properties-2026-08-25/snapshot.html).

[^google-search-console-social-video-platforms]: Google Search Central Blog, “See how content from social and video platforms performs on Google Search,” 2026-07-07. Source URL: <https://developers.google.com/search/blog/2026/07/search-console-social-video-platforms>; immutable raw capture: [metadata](/raw/google-search-console-social-video-2026-08-25.md) and [snapshot](/raw/google-search-console-social-video-2026-08-25/snapshot.html).
