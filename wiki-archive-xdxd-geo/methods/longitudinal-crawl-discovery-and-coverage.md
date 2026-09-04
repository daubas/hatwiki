---
type: Research Method
title: 縱向 crawl discovery curve 與 coverage／persistence 觀測方法
description: 從 longitudinal web-crawl 與 collection-growth 原始研究整理可移植到 AI crawler、agent discoverability 與 downstream retrieval robustness 研究的 coverage、persistence、core／shell、CG Axiom 與 discovery dynamics draft protocol。
tags:
  - crawler
  - web-crawl
  - discovery
  - coverage
  - persistence
  - collection-growth
  - retrieval-robustness
  - agent-discoverability
  - measurement
  - reproducibility
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-26T01:54:01Z
sources:
  - id: arxiv-crawl-discovery
    resource: /raw/arxiv-crawl-discovery-2026-08-26.md
    title: "arXiv《Measuring What the Crawler Sees》原始研究（2026-08-26 raw capture）"
    author: human:michael-paris
    last_modified: 2026-07-15
  - id: arxiv-ir-collection-growth
    resource: /raw/arxiv-ir-collection-growth-2026-08-26.md
    title: "arXiv《Robustness of IR Models to Collection Growth》原始研究（2026-08-26 raw capture）"
    author: human:emmanouil-georgios-lionis
    last_modified: 2026-08-25
---

# 方法定位

本頁從兩份 arXiv 原始研究整理一套可供 xdxd GEO 採用的 draft longitudinal observation protocol：把 crawler／fetch 的每輪結果視為變動 URL population 的 partial sample，並以 pairwise containment 與 cumulative discovery curve 同時觀察 coverage、persistence、fresh discovery 與 core／shell dynamics。原始來源仍未經 xdxd 獨立重現或人工驗證；來源在 Common Crawl、German Academic Web 以及特定 benchmark collection-growth setting 的結果不能直接升格為任一 AI crawler、搜尋索引或公開 AI Search 的通用效果證據。[^arxiv-crawl-discovery]

本輪加入的 collection-growth 研究提供一個 downstream robustness 條件：在 crawler／fetch 的 collection snapshot 擴張、索引更新或語料合併後，應另測量非相關文件加入是否改變 retrieval stage、reranking stage 與來源集合歸屬，而不能把 discovery／coverage 變化直接解讀為可見度或答案品質改善。來源的 CG Axiom、MDA／MDD 分類與 `CP@10` 是研究假說與作者 benchmark 結果，不是 xdxd 已驗證的公開 AI Search 指標。[^arxiv-ir-collection-growth]

## Collection growth robustness 作為 downstream 條件

- **CG Axiom（來源定義）**：對 relevant documents 屬於原集合的 query，加入對該 query 不相關的文件後，retrieval performance 應只在小幅 `ε` 內變動；這是來源提出的理想性質，不是平台承諾。[^arxiv-ir-collection-growth]
- **MDA／MDD dependency strata（來源 taxonomy）**：分開不依賴其他文件的單一 query–document scoring，與依賴 top-k、feedback 或 collection-level statistics 的 scoring；PRF、BM25、CDE、listwise／set-based reranking 不應在實驗紀錄中被混成單一 retriever 類別。[^arxiv-ir-collection-growth]
- **Collection-origin control**：除 nDCG／recall／precision 外，保存 top-k 結果來自原集合或新增集合的比例（來源的 `CP@10` 概念），以區分「相關性分數變化」與「被新增文件取代」。[^arxiv-ir-collection-growth]
- **Stage-specific outcome**：first-stage retrieval、PRF／query expansion、reranking 與 final answer／citation 必須分層；來源在單一 benchmark pairing 中觀察到 MDA retriever 較少退化、PRF 可能偏向主導集合、MDA／MDD reranker 結果較接近，但這些不是跨引擎效果。[^arxiv-ir-collection-growth]

以下欄位是依據來源轉成 xdxd 的可移植研究設計推論，不是來源已驗證的 GEO schema：`collection_snapshot_id`、`base_collection_id`、`added_collection_id`、`added_doc_relevance_to_query`、`collection_share`、`retriever_dependency_class`、`pipeline_stage`、`nDCG／Recall／P@k`、`CP@k`、`delta_from_base`、`answer／citation outcome`。[^arxiv-ir-collection-growth]

## 1. 來源方法的兩個互補 projection

- **Pairwise containment**：對相隔 `Δt` 的兩輪 crawl，保存前一輪元素在後一輪重現的比例。來源在 homogeneous urn model 下以 `g(Δt) = c · α^Δt` 連結 coverage `c` 與 survival `α`；這是來源的模型關係，不是 xdxd 已核准的 crawler metric。[^arxiv-crawl-discovery]
- **Discovery curve**：以滑動窗口 `U(s,T)` 累計從第 `s` 輪開始的 `T` 輪中觀察到的 distinct URLs；來源把它視為完整 sequence 的 fresh-discovery-weighted projection。[^arxiv-crawl-discovery]
- **Disagreement as diagnostic**：若 containment 與 discovery curve 對同一 strata 的 fit 不一致，不應只挑一個結果，而應把差異記為 homogeneous assumption 可能失效的診斷欄位。來源進一步用 persistent core fraction `κ` 與 shell parameters `α_∂`、`c_∂` 的 two-component model 調和兩個 projection；shell residual 仍可提示 shell heterogeneity。[^arxiv-crawl-discovery]

## 2. 可移植到 xdxd 的觀測 protocol（推論）

以下是依據來源方法轉成 xdxd 研究可執行欄位的推論，不是來源對 xdxd 的驗證：

1. **固定觀測 strata**：至少分開 `engine_or_crawler`、user-agent／crawler role、entry surface、region、language、content class、URL granularity、observation window 與 policy version。`OAI-SearchBot`、`PerplexityBot`、一般 Googlebot 或使用者觸發 fetch 不應混成一條 stream；角色差異可參考 [OpenAI Crawlers](/entities/openai-crawlers.md) 與 [Perplexity Crawlers](/entities/perplexity-crawlers.md)。
2. **每輪保存 immutable snapshot**：記錄 normalized URL、final URL、status、content-type、response bytes、ETag／Last-Modified、body hash、robots.txt／WAF／policy version、request timestamp、crawl role 與錯誤分類；來源更新或政策變更應建立新 snapshot，不覆寫舊輪次。
3. **同時計算兩條序列**：一條以 URL／domain set intersection 計算 containment trajectory；另一條以 sliding window 累加 distinct URL／domain footprint 計算 discovery curve。除百分比外，保留每輪的分子、分母、normalization rules 與缺失原因。
4. **做 model-fit 對照**：可在授權 corpus 上分別擬合 homogeneous baseline 與 core／shell extension，保存 `α`、`c`、`κ`、`α_∂`、`c_∂`、confidence／residual、granularity 與 fit window；參數是 coverage／persistence 的模型摘要，不是搜尋排名分數。
5. **將 crawler 前置證據與搜尋 outcome 分層**：`requested`、`fetched`、`stored`、`indexed`、`retrieved`、`used`、`cited`、`shown`、`clicked` 必須分開記錄。即使 discovery curve 或 containment 改善，也不能直接宣稱 retrieval、citation、排名或 Agent Reader correctness 改善。
6. **加入 paired collection-growth run**：固定 query、model、retrieval policy、URL normalization 與 observation window，對 base snapshot 與加入明確非相關文件的 snapshot 做 paired comparison；保存 collection composition、injected share、retriever dependency、pipeline stage 與 `CP@k`，再分別比較 retrieval／reranking／answer／citation outcome。這是 xdxd 的待驗證設計，不是來源 benchmark 的直接複製。[^arxiv-ir-collection-growth]

## 3. 最小資料表欄位

| 層級 | 必要欄位 |
|---|---|
| 觀測 strata | engine_or_crawler、role、entry、region、language、content class、granularity、policy version |
| 每輪 crawl | round_id、run_at、request／response URL、normalized URL、final URL、status、content-type、bytes、ETag／Last-Modified、body hash、robots／WAF decision |
| set metrics | previous_round、lag、intersection_count、base_count、containment、window_start、window_length、distinct_count、new_count、discovery_curve |
| model diagnostics | baseline／core-shell model、parameter estimates、fit window、residual、uncertainty、heterogeneity flag |
| downstream funnel | indexed、retrieved、used、cited、shown、clicked、source snapshot、claim／citation linkage |
| collection-growth | base／added snapshot、added share、query relevance、dependency class、pipeline stage、CP@k、performance delta |

- 欄位設計是 xdxd 的重現與稽核推論；兩份原始研究分別支持 longitudinal crawl、containment、discovery curve、core／shell model，以及 collection-growth、dependency class、CP@k 與 stage-specific robustness，不支持上述欄位已是業界標準 schema。[^arxiv-crawl-discovery][^arxiv-ir-collection-growth]

## 4. 研究邊界與待驗證事項

- 本頁目前包含兩份 arXiv 原始研究來源，均沒有新增 `verified`，不能描述為已由 xdxd 或人工核准。
- 來源的 archive-level 結果來自 Common Crawl（2020–2025、domain granularity）與 German Academic Web（URL granularity）；它們不是 OpenAI、Google、Bing、Perplexity 或 Cloudflare 的 crawler log，也不提供這些平台的 ranking、retrieval 或 citation evidence。[^arxiv-crawl-discovery]
- `α`、`c`、`κ` 與 shell residual 是模型與資料粒度相關的診斷量，不可直接當成「可見度」「權威性」或 agent discoverability score；不同 crawler role、URL normalization、robots／WAF、時間窗口與 archive construction 可能改變估計。
- CG Axiom 與 `CP@k` 也不是可直接跨引擎比較的 visibility／citation 分數；若新增文件不是對 query 明確非相關、集合比例極端不平衡、或模型預訓練與 benchmark 有重疊，應把結果標成 confounded，不能宣稱 collection growth 本身造成變化。[^arxiv-ir-collection-growth]
- 下一步應只在自有或明確授權 corpus 做 longitudinal paired observation：固定 URL panel、分開 crawler role、保存 raw response／policy metadata，並在足夠輪次後比較 containment／discovery curve 與 downstream indexing／retrieval／citation outcomes。
- 下一步可在同一授權 corpus 的 base／added snapshots 做 retrieval robustness paired run，再把 retrieval／reranking 的 `CP@k` 與 answer／citation trace 對齊；來源的單一 MS MARCO＋TREC-COVID benchmark、1.9% 注入比例與預訓練混淆不得直接外推為 AI Search prevalence。[^arxiv-ir-collection-growth]
- 權利與再利用仍應回到 [原始 raw capture](/raw/arxiv-crawl-discovery-2026-08-26.md) 的 abstract、HTML／PDF、API、HTTP metadata 與授權訊息核對；本方法頁不取代原始論文。[^arxiv-crawl-discovery]

## 5. 與既有方法的連接

此方法可與 [GEO 內容偵測與 citation URL audit](/methods/geo-content-detection-and-citation-audit.md) 串接：前者處理 crawl／coverage 的 longitudinal 前置層，後者處理頁面 intervention、citation URL accessibility 與 frozen-bundle pollution／publisher attribute audit。若觀測公開 AI Search 的引用分布，另應遵循 [AI visibility measurement 的 rank stability 與 structural sufficiency](/methods/ai-visibility-measurement-convergence.md) 的 sequential measurement boundary；整體 raw、compile、verify、stale 規則見 [證據生命週期](/methods/evidence-lifecycle.md)。

[^arxiv-crawl-discovery]: Michael Paris, Hande Çelikkanat, and Luca Foppiano, “Measuring What the Crawler Sees: Discovery Curves, Core Persistence, and Shell Dynamics in Longitudinal Web Crawls,” arXiv:2607.13636v1, submitted 2026-07-15. Source URL: <https://arxiv.org/abs/2607.13636>. Immutable raw capture: [metadata](/raw/arxiv-crawl-discovery-2026-08-26.md), [abstract HTML](/raw/arxiv-crawl-discovery-2026-08-26/abstract.html), [paper HTML](/raw/arxiv-crawl-discovery-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-crawl-discovery-2026-08-26/paper.pdf).

[^arxiv-ir-collection-growth]: Emmanouil Georgios Lionis, Sean MacAvaney, and Debasis Ganguly, “Robustness of IR Models to Collection Growth,” arXiv:2608.23419v2, revised 2026-08-25. Source URL: <https://arxiv.org/abs/2608.23419>. Immutable raw capture: [metadata](/raw/arxiv-ir-collection-growth-2026-08-26.md), [abstract HTML](/raw/arxiv-ir-collection-growth-2026-08-26/abstract.html), [paper HTML](/raw/arxiv-ir-collection-growth-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-ir-collection-growth-2026-08-26/paper.pdf).
