---
type: Research Program
title: xdxd GEO 研究計畫
description: 定義 xdxd GEO 知識庫的研究目標、核心物件、責任邊界與第一階段交付。
tags:
  - geo
  - ai-search
  - observability
  - okf
status: stable
generated:
  by: codex/gpt-5.6
  at: 2026-08-21T07:21:11Z
sources:
  - id: geo-wiki-research
    resource: https://github.com/castle-studio-work/xdxd.im/blob/main/docs/GEO_LLM_WIKI_RESEARCH_2026.md
    title: GEO LLM Wiki／自建知識庫研究（2026）
  - id: okf-review
    resource: https://github.com/castle-studio-work/xdxd.im/blob/main/docs/GOOGLE_OKF_LLM_WIKI_REVIEW_2026.md
    title: Google Open Knowledge Format（OKF）與 LLM Wiki 評估
  - id: product-concept
    resource: https://github.com/castle-studio-work/xdxd.im/blob/main/docs/XDXD_GEO_OBSERVABILITY_PRODUCT_CONCEPT.md
    title: xdxd.im GEO Observability Product Concept
---

# xdxd GEO 研究計畫

本知識庫是 xdxd 的 GEO 研究層，目標是把容易變動、來源分散的 AI 搜尋資訊，整理成 Agent 與人類都能查詢、核對和持續更新的知識包。它採用 OKF v0.2 作為交換格式，保留 LLM Wiki 的漸進揭露與 raw／compiled 分工。[^geo-wiki-research][^okf-review]

## 核心研究問題

- AI 搜尋、回答引擎與 Agent 如何發現、擷取、選擇及引用網頁？
- 哪些網站介入能改善可讀性、可擷取性或引用機率？
- 不同引擎、模型、入口、地區與時間的結果如何改變？
- 哪些結果可以直接觀測，哪些只能抽樣或推論？
- 如何保存足以重現主張的 prompt、response、citation 與 crawl evidence？

## 核心物件

- `Source`／`Snapshot`：原始來源與特定時間版本。
- `Claim`：帶來源、產生者、驗證者與生命週期的研究主張。
- `Entity`：搜尋引擎、模型、Agent、Crawler、平台、廠商或標準。
- `Experiment`：研究假說、prompt、目標頁面、控制條件與執行方法。
- `Run`／`Response`／`Citation`：單次執行及其回答與引用證據。
- `CrawlObservation`／`SearchOutcome`：到站行為與外部搜尋結果。

## 與 xdxd 產品的邊界

本 KB 保存研究知識、實驗定義與可追溯結論；不取代 xdxd 正式服務的短連結、事件資料庫、使用者權限、計費或監測執行系統。產品可引用 KB 的方法與結論，但正式觀測事件仍以產品資料庫為準。[^product-concept]

## 第一階段

1. 以現有研究文件建立少量高價值 concept、entity 與 method 頁。
2. 新研究先保存 raw evidence，再編譯成 concept。
3. 每個可變主張填寫來源、`generated`、`verified`、`status` 與適當的 `stale_after`。
4. 用 OKF validator 檢查格式與引用；Git 保存 diff 與審核歷史。
5. 只有實際出現檢索失敗時才加入 MCP、全文索引、RAG 或 graph retrieval。

## 不承諾

- 不把 OKF、Markdown、Schema、MCP 或短網址宣稱為 AI 搜尋排名訊號。
- 不承諾任何頁面一定會被索引、回答或引用。
- 不把 Agent 產生的摘要視為原始證據。
- 不用單一 visibility score 取代可檢查的實驗結果。

[^geo-wiki-research]: GEO LLM Wiki／自建知識庫研究（2026）。
[^okf-review]: Google Open Knowledge Format（OKF）與 LLM Wiki 評估。
[^product-concept]: xdxd.im GEO Observability Product Concept。
