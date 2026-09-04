---
type: Research Method
title: 生成式引擎品牌 visibility 與來源組成觀測方法
description: 從五平台品牌 visibility 原始研究整理 unbranded discovery、citation source composition、page audit、跨引擎 overlap 與介入前後量測的 draft protocol。
tags:
  - generative-search
  - geo
  - ai-visibility
  - citation
  - source-presentation
  - brand
  - measurement
  - cross-engine
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T22:49:30Z
sources:
  - id: arxiv-generative-engine-optimization-scale
    resource: /raw/arxiv-generative-engine-optimization-2026-08-26.md
    title: "Generative Engine Optimization at Scale: Measuring Brand Visibility Across AI Search Engines"
    author: human:pratyush-kumar
    last_modified: 2026-06-18
---

# 方法定位

本頁從一份 arXiv 原始研究整理可供 xdxd GEO 採用的 draft 觀測 protocol：把品牌是否出現、出現位置、來源類型、source-to-brand relation、頁面表示與 sentiment 分開測量，避免以單一 AI visibility score 代替完整的 crawl／index／retrieval／citation funnel。來源是 Ranqo co-founder 的 vendor-produced、single-author preprint；資料、查詢與 audit pipeline 未公開，原始結果未經 xdxd 獨立重現或人工驗證。[^arxiv-generative-engine-optimization-scale]

## 1. 來源研究的可移植設計

- **平台與介面 strata**：來源使用 ChatGPT／GPT-5、Gemini／Gemini-3、Perplexity／Sonar、Claude／Claude Sonnet、Grok／Grok-3 的 search-enabled production variant，並透過官方 API 執行。Gemini、Perplexity、Grok 每次皆 grounded；ChatGPT 與 Claude 依品牌採每週 search cooldown，形成可比較的 search-on／search-off observation，但不是公開平台內部 retrieval 的直接讀取。[^arxiv-generative-engine-optimization-scale]
- **Prompt strata**：分為 `discovery`、`problem_solution`、`comparison`、`use_case`、`expert`、`brand_research` 六類。`discovery`、`problem_solution`、`use_case`、`expert` 預設不在 prompt 中放品牌名稱，測量 generic discovery；`comparison` 與 `brand_research` 會點名品牌，必須另列為 branded condition。
- **Replication unit**：保存 `(brand, prompt, platform, run)` tuple。來源在 2026-03 至 2026-05 報告超過 100K responses、超過 100 brands；正文另報 102,025 brand-tracking responses。這些是來源資料規模，不是 xdxd 的樣本規模。
- **回答抽取**：每個 tuple 至少保存 `brandMentioned`、`brandPosition`、sentiment label／score、每個 grounded URL、canonical domain、source type、source-to-brand relation、competitor mentions 與 ordinal position；原始 response、prompt、platform／model configuration、run time 與 response hash 應一併保存。

## 2. 指標分層

### 2.1 Brand-level outcomes

1. `visibility`：某 engine 上品牌 prompts 被 mention 的比例；unbranded prompts 應作為主要 generic discovery outcome。
2. `average_position`：只在品牌被 mention 的 prompts 上計算 ordinal position；未出現不應被當成末位。
3. `sentiment`：另存 positive／neutral／negative 與連續 score；不可與 mention rate 直接合併成未經驗證的 composite score。
4. `share_of_voice`：品牌 mentions 除以品牌與 qualified competitors 的 mentions；competitor denominator 規則需明確排除一次性幻覺名稱。

### 2.2 Source-level outcomes

每個 citation source 保存：

- `citation_url`、normalized URL、canonical domain、source type。
- `source_to_brand_relation`：tracked brand、competitor、non-competitor、editorial、forum、review、social、reference、institutional 或 other。
- `page_type`：content／non-content，以及 listicle、generic article、how-to、video、comparison、topic guide、documentation、review、research、checklist、case study 等細分。
- `retrieved`、`used`、`cited`、`shown`、`supported` 與 `clicked`；不能用 source citation 反推其前面的 retrieval 或後面的 claim support／click。

### 2.3 Page representation audit

若對自有或明確授權頁面做 representation 觀測，可將以下六個維度作為候選欄位，而不是既定標準或排名公式：

- `crawlability`：robots、sitemap、canonical、HTTPS、JS rendering、mobile checks。
- `content_quality`：word count、readability、paragraph／heading structure、internal links、freshness。
- `page_speed`：來源列出的 Core Web Vitals（LCP、FID、CLS）與載入觀測。
- `ai_readiness`：entity clarity、structured answers、inline citations、evidence density、provenance markers。
- `citation_potential`：可引用的 numbers／definitions／named claims、source attribution、data availability。
- `authority_trust`：byline、credentials、domain authority、topical depth、E-E-A-T markers。

這六維 audit 只可視為待驗證的 representation／quality features；來源沒有以 randomized experiment 證明任一維度必然提高公開 AI Search visibility。[^arxiv-generative-engine-optimization-scale]

## 3. xdxd GEO 的建議觀測 protocol（推論）

以下是依據來源設計轉成 xdxd 研究欄位的推論，不是來源對 xdxd 的驗證：

1. **先分 unbranded 與 branded**：同一 topic 建立不含品牌名的 discovery panel，以及另列的 comparison／brand-research panel；不要把被點名後的 mention 當成 generic discoverability。
2. **固定跨引擎 strata**：每個 `engine × model × interface × region × language × topic × prompt_category × observation_window` 保存版本與設定；若 engine 的 grounding policy 不同，新增 `search_policy` 欄位並避免無條件合併。
3. **保留原始 tuple**：至少保存 `brand_id`、`prompt_id`、prompt text、replication、run_at、run_id、response snapshot／hash、citation URL、source snapshot／hash、model／prompt settings 與 parser／classification version。
4. **分開 visibility 與 reliability**：mention、position、sentiment、share-of-voice、source overlap 與 claim-level support 各自報告；若 sentiment 的 repeated-run flip 高於 mention，不能用 sentiment-weighted score 取代 mention outcome。
5. **量測跨引擎 source overlap**：同一 prompt 的 cited-domain set 以 pairwise Jaccard 或其他預先指定的 overlap metric 比較，並同時報告 exposure、query panel、時間窗與 source normalization 規則。
6. **建立 repeat-aware baseline**：在無介入期間保存 per-brand／per-engine visibility trajectory；對 parser error、API failure、search policy、model version 與 content update 分開標記，不能把一次 query failure 當作 visibility drop。
7. **介入研究先做 paired／controlled design**：若測試 entity-first、schema、AI-readiness、citation potential、authority、crawlability 或 page speed，需固定 topic／query、版本化頁面、明確 treatment／control、記錄 re-crawl／re-index latency，並把 P3 類 recommendation RCT 與 P7 類 white-hat ablation 分開。

## 4. 來源提出的後續 protocol 與 xdxd 對應

| 來源 protocol | 來源狀態 | xdxd 可觀測化方向 |
|---|---|---|
| P1 source overlap | CRM 約 0.12；建議擴至 1,000 prompts | `citation_domain_set`、pairwise Jaccard、engine／topic strata |
| P2 position decay | designed、未完成 | `citation_position`、top-k share、full-quarter trajectory |
| P3 closed-loop RCT | designed、未完成 | tier／category pair、random assignment、14+ day re-audit、treatment／control |
| P4 schema vs citation | designed、未完成 | structured-data／page-audit covariates 與 visibility 的分層回歸 |
| P5 entity-first | designed、未完成 | entity／provenance offset、content quality matching、citation outcome |
| P6 web-search on/off | analysis pending | retrieval-layer／training-layer hypothesis，需固定 model／brand／prompt |
| P7 white-hat C-SEO | designed、未完成 | AI Readiness／Citation Potential／Authority & Trust vs Crawlability／Page Speed ablation |

表中「來源狀態」是原始論文的研究議程，不是 xdxd 已完成的 experiment。[^arxiv-generative-engine-optimization-scale]

## 5. 證據邊界與限制

- 來源是 vendor-produced、single-author study；作者為 Ranqo co-founder 且持有股權，production dataset、query／audit pipeline、scoring configuration 與 recommendation engine 未公開。這要求將其結果作為 draft evidence，並在跨來源比較時標示利益關係與不可重現部分。[^arxiv-generative-engine-optimization-scale]
- Brand cohort 偏向 SaaS、retail-execution、fintech 與 Indian DTC；Tier 1 cell 為 `n=11`，Grok／Claude 的部分品牌數也較少，不能直接當作 category-representative prevalence。
- Brand stature 是依 Wikipedia、press、funding 等公開 proxy 手動分級；73%／44%／11% 的 visibility ladder 是 observational quantification，不是 stature 對 citation 的 causal effect。
- 每個 engine 只測一個 search-enabled production model variant；平台內部如何 ingest、retain、retrieve 不可見。跨 engine 結果不能當作平台官方 ranking／retrieval 公式。
- Sentiment 由模型對 mention spans 做 heuristic classification；45.5% flip rate 混合輸出變異與 classifier noise，不能直接視為品牌情緒真實波動。
- 本方法不支持 schema、listicle、YouTube、entity-first、page score 或 recommendation 必然提高 ranking、retrieval、citation、click 或整體 agent discoverability。

本頁與[AI visibility measurement 的 rank stability 與 structural sufficiency](/methods/ai-visibility-measurement-convergence.md)、[跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md)、[GEO 內容偵測與 citation URL audit](/methods/geo-content-detection-and-citation-audit.md)、[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)及[GEO 證據生命週期](/methods/evidence-lifecycle.md)銜接；更新時建立新 raw snapshot，不覆寫舊資料。

[^arxiv-generative-engine-optimization-scale]: Pratyush Kumar, “Generative Engine Optimization at Scale: Measuring Brand Visibility Across AI Search Engines,” arXiv:2606.20065v1, submitted 2026-06-18. Source URL: <https://arxiv.org/abs/2606.20065>. Immutable raw capture: [metadata](/raw/arxiv-generative-engine-optimization-2026-08-26.md), [official HTML](/raw/arxiv-generative-engine-optimization-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-generative-engine-optimization-2026-08-26/paper.pdf).
