---
type: Platform Entity
title: Bing Webmaster Tools AI Performance
description: Microsoft Bing Webmaster Tools 公開預覽中的 AI 回答引用觀測與頁面層級可見度功能。
resource: https://www.bing.com/webmasters/about
tags:
  - entity
  - bing
  - ai-search
  - citation
  - geo
  - observability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T11:08:57Z
sources:
  - id: bing-ai-performance-announcement
    resource: /raw/bing-ai-performance-webmaster-tools.md
    title: Bing Webmaster Tools AI Performance 公開預覽官方公告（2026-08-25 raw capture）
    author: microsoft/bing-webmaster
    last_modified: 2026-02-10
---

# Entity

Bing Webmaster Tools 的 **AI Performance** 是 Microsoft 在 2026-02-10 公告的 public preview 功能，用來觀察網站內容在 Microsoft Copilot、Bing 的 AI-generated summaries 與選定合作夥伴整合中的引用情況。[^bing-ai-performance-announcement] 本頁只記錄第一手公告所描述的能力，不把產品宣稱當成 GEO 效果證據。

## 官方公告記載的觀測訊號

- **Total Citations**：在選定時間範圍內，AI 生成回答以來源形式顯示的引用總數。[^bing-ai-performance-announcement]
- **Average Cited Pages**：每天平均有多少個網站頁面被顯示為 AI 回答來源；公告明確說它不代表排名、權威性或單一回答中的頁面角色。[^bing-ai-performance-announcement]
- **Grounding queries**：AI 用來擷取並引用內容的關鍵片語；公告說這是整體引用活動的樣本，並會持續調整。[^bing-ai-performance-announcement]
- **Page-level citation activity**：特定 URL 在選定日期範圍內被引用的次數；不代表頁面重要性、排名或答案中的位置。[^bing-ai-performance-announcement]
- **Visibility trends**：跨支援的 AI experience 追蹤引用活動隨時間的變化。[^bing-ai-performance-announcement]

公告也表示 Bing 尊重 `robots.txt` 與其他支援的內容控制機制。[^bing-ai-performance-announcement] 這使 AI Performance 可作為 Bing surface 的 citation observation 入口，但不等同於 crawler 存取紀錄，也不保證每個 AI surface、查詢或 partner integration 都被完整觀測。

## GEO 研究用途與邊界

對 xdxd GEO 研究而言，AI Performance 可作為**平台提供的觀測訊號**：

1. 將網站 URL、觀測時間範圍、grounding query sample 與 page-level citation activity 保存為 Bing surface 的引用觀測。
2. 把 citation count 的時間序列與內容改版、索引狀態、crawl observation 及其他引擎結果分開記錄。
3. 不把 citation 次數直接解讀為排名、答案位置、權威性、轉換或因果效果；這些需由獨立、可重現的實驗驗證。
4. 將「supported AI experiences」與「sample」視為 coverage 限制，避免把 dashboard 數字當成整個生成式搜尋市場的總量。

## 研究限制

本 entity 來自單一 Microsoft 官方公告，status 保持 `draft`，尚未有人工作確認。它描述工具的資料面與官方解讀邊界，不提供 dashboard 實際資料，也沒有證明 IndexNow、內容結構、證據引用或其他介入會增加 AI citations。原始證據見 [Bing AI Performance raw capture](/raw/bing-ai-performance-webmaster-tools.md)。

[^bing-ai-performance-announcement]: Microsoft Bing Webmaster Blog, “Introducing AI Performance in Bing Webmaster Tools Public Preview,” 2026-02-10. Source URL: <https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview>. Immutable raw capture: [metadata](/raw/bing-ai-performance-webmaster-tools.md) and [HTML snapshot](/raw/bing-ai-performance-webmaster-tools-2026-08-25/snapshot.html).
