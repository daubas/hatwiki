---
type: Knowledge Overview
title: xdxd GEO 知識總覽
description: 以最高壓縮層整理目前可依賴的研究邊界、核心模型、產品含義與待驗證缺口。
tags:
  - geo
  - ai-search
  - synthesis
status: draft
generated:
  by: codex/gpt-5.6
  at: 2026-08-27T04:00:00Z
sources:
  - id: research-program
    resource: /concepts/xdxd-geo-research-program.md
    title: xdxd GEO 研究計畫
  - id: google-baseline
    resource: /concepts/google-search-generative-ai-optimization.md
    title: Google 生成式 AI 搜尋的 GEO 研究基線
  - id: evidence-lifecycle
    resource: /methods/evidence-lifecycle.md
    title: GEO 證據生命週期
  - id: cross-interface-observation
    resource: /methods/chinese-generative-search-cross-interface-observation.md
    title: 跨介面生成式搜尋觀測方法
---

# xdxd GEO 知識總覽

## 一句話結論

目前證據支持把 xdxd 發展成可管理、可撤銷、可觀測、可追溯來源的 Agent-facing link／content control layer；尚不支持承諾 Markdown、中間頁、短網址、結構化 metadata 或任何單一介入會提高公開 AI 搜尋排名或引用率。[^research-program][^google-baseline]

## 目前最可靠的共同模型

1. **先分層，再談效果。** `crawled`、`indexed`、`retrieved`、`used in answer`、`cited`、`shown`、`clicked` 與 `returned to source` 是不同事件，不能用其中一層代替其他層。
2. **Crawler 身分與用途不同。** 搜尋索引、模型訓練與使用者觸發擷取可能由不同 bot 或 request path 執行；robots.txt、WAF 與平台控制應分別觀測。
3. **可讀不等於可發現。** Markdown、清楚標題、canonical URL、結構化欄位與較小 token footprint 可能改善已知 URL 的解析與檢索，但不是公開搜尋 visibility 或 citation 的充分條件。
4. **平台內部不可見。** 公開 AI 搜尋通常無法直接觀察 candidate generation、retrieval、reranking 與 answer composition，因此必須以來源端 crawl、平台報表、固定 query panel、回答與 citation snapshot 分層蒐證。
5. **結果會隨時間與介面改變。** 引擎、模型、地區、語言、登入狀態、介面與 query fan-out 都可能改變結果；單次查詢不能支撐穩定結論。[^cross-interface-observation]

## 對 xdxd 產品的含義

- **可以承諾的能力**：URL identity、redirect 與撤銷控制；來源與中間表示的版本；agent/crawler request observation；來源快照；跨引擎、跨時間的 query/citation evidence；可匯出的稽核紀錄。
- **需要實驗才能宣稱的效果**：中間頁是否改善 known-URL Agent Reader 的解析、檢索、evidence alignment 或 task completion。
- **目前不能承諾的效果**：提高 Google、Bing、ChatGPT、Perplexity 或其他公開引擎的排名、被選入率、引用率、答案位置或流量。
- **最合理的定位**：portable semantic links × auditable GEO experiments × cross-site outcome intelligence，而不是「縮網址就保證被 AI 搜尋」。

## 研究與讀取路徑

- 產品與責任邊界：[xdxd GEO 研究計畫](/concepts/xdxd-geo-research-program.md)
- 搜尋平台基線與迷思：[Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md)
- Crawler、平台與工具：[Entities](/entities/index.md)
- 可重現觀測設計：[Methods](/methods/index.md)
- 原始文件、論文與 snapshots：[Raw evidence](/raw/index.md)
- 未來實際執行紀錄：[Experiments](/experiments/index.md) 與 [Comparisons](/comparisons/index.md)

## 證據成熟度與缺口（2026-08-27 snapshot）

- KB 仍以資料蒐集與研究設計為主；絕大多數內容是 `draft`，人工或第二 Agent verification 很少。
- `experiments/` 與 `comparisons/` 尚無實際 concept，因此目前不能從 KB 推導 xdxd 介入的因果效果。
- 多個 method 頁聚合大量研究，後續應在主題穩定後拆出較小 concept，並持續檢查重複、矛盾、過期與缺少交叉連結的主張。
- 任何新結論都應沿用 [證據生命週期](/methods/evidence-lifecycle.md)：保留 immutable raw、claim-level attribution、狀態與 freshness，再更新本總覽。[^evidence-lifecycle]

[^research-program]: [xdxd GEO 研究計畫](/concepts/xdxd-geo-research-program.md)。
[^google-baseline]: [Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md)。
[^evidence-lifecycle]: [GEO 證據生命週期](/methods/evidence-lifecycle.md)。
[^cross-interface-observation]: [跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md)。
