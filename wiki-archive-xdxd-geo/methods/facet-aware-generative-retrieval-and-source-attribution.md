---
type: Research Method
title: "Facet-aware generative retrieval 與來源歸因"
description: 從 GRAFT 原始研究整理多面向關係、生成式檢索與來源歸因可供 xdxd GEO 採用的 draft 觀測方法。
tags:
  - generative-search
  - generative-retrieval
  - source-presentation
  - citation
  - agent-discoverability
  - structured-content
  - measurement
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T18:21:58Z
sources:
  - id: arxiv-graft-generative-retrieval
    resource: /raw/arxiv-graft-generative-retrieval-2026-08-26.md
    title: "arXiv《GRAFT: Graph-Distilled Generative Retrieval for Facet-Aware Scientific Literature Exploration》原始研究（2026-08-26 raw capture）"
    author: human:italo-luis-da-silva
    last_modified: 2026-08-23
---

# 方法定位

本頁從一份 arXiv 原始研究整理一個可供 xdxd GEO 採用的 draft 方法：把「候選被找到」與「為什麼被找到、由哪一種關係支持」拆開量測。GRAFT 的實驗對象是 scientific related-paper retrieval，不是公開網頁搜尋；以下對 xdxd 的欄位與介入設計都是研究操作化推論，不能描述為來源已驗證或已證明能改善公開 AI Search。[^arxiv-graft-generative-retrieval]

這個方法可補足[跨介面生成式搜尋 citation 與 source presentation 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md)對 citation-level records 的記錄，並與[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)的 evidence utilization、以及[AI visibility measurement 的 rank stability 與 structural sufficiency](/methods/ai-visibility-measurement-convergence.md)的累積收斂判定並列；[GEO 證據生命週期](/methods/evidence-lifecycle.md)仍是 raw、compiled、verified 與 stale 的生命週期規則。

## 1. 來源研究支持的結構

- **多面向關係**：來源以 problem、method、result、contribution 四類 facet 描述論文間關係，而不是把所有相關性壓成單一相似度分數。[^arxiv-graft-generative-retrieval]
- **facet 與 citation signals**：來源把 facet similarity、bibliographic coupling 與 co-citation 組合成帶有 facet 類型與權重的圖；圖上的候選可保留「由哪個 facet 帶出」的 provenance。[^arxiv-graft-generative-retrieval]
- **生成式識別碼**：Graft 以自然語言 facet-item 作為 paper identifier，透過 constrained decoding 生成有效 paper；但有效 identifier 不等於候選與 query 有關，因此來源另外使用 graph-RRF 以 query-candidate edge support 做融合與過濾。[^arxiv-graft-generative-retrieval]
- **coverage-aware distillation**：來源報告 naive training pair enumeration 只有 84% 的 corpus 進入 target position，並以 coverage floor、edge-weighted sampling 與 reverse-neighbour fallback 補足可學習 coverage。這是該論文資料與訓練設定下的結果，不是普遍生成式檢索定律。[^arxiv-graft-generative-retrieval]
- **結果與歸因分開**：來源同時報告 Recall@k 與 facet attribution precision，示範「取回哪些候選」和「候選由什麼關係支持」不是同一個 outcome。[^arxiv-graft-generative-retrieval]

## 2. xdxd GEO 的可移植觀測 protocol（推論）

以下欄位是依據來源結構轉成 xdxd 研究可執行的推論，不是來源對公開搜尋的驗證：

1. **建立可追溯節點**：每個來源頁、版本、作者／出版者、主張或 evidence span 可作為獨立節點；保存 canonical URL、content hash、擷取時間、發布／修改時間與權利狀態。
2. **標記關係類型**：對每個 query—candidate 或 claim—source 邊記錄可解釋的關係類型，例如 `topic`、`method`、`result`、`definition`、`first-party`、`citation` 或 `version`。這些是 xdxd 的研究 schema 候選，不是 GRAFT 原文宣稱的 web schema。
3. **分開候選與歸因**：至少保存 `retrieved`、`selected`、`used`、`cited`、`shown`、`clicked`，以及 `source_id`、`relation_type`、`relation_weight`、`rank`、`evidence_span`、`claim_id`。不可用一個 visibility 或 citation score 代替整條漏斗。
4. **保留 explanation contract**：每一筆 citation 或 source presentation 都應能回指候選被帶出的關係、來源片段及原始 response；若只有 URL 而沒有 claim／source support，應標記為 attribution incomplete。
5. **設計 paired test**：在有明確授權的 corpus 中，以相同 query、模型／介面、時間窗與來源集合比較 `opaque representation` 和 `structured relation representation`；主要 outcome 分開記錄 source retrieval、citation target、claim-level entailment、citation position、click／returned-to-source，不把其中一層的變化外推到其他層。
6. **處理 freshness 與更新**：若把關係或 facet materialize 進模型／索引，來源更新後須重新建立版本與 hash；不要把一次生成的 facet 摘要當成永久事實，也不要覆寫舊 raw evidence。

## 3. 最小資料表

| 層級 | 必要欄位 |
|---|---|
| source node | source_id、canonical_url、final_url、publisher／author、content_hash、captured_at、published_at、modified_at、rights_basis |
| relation edge | query_id、candidate_source_id、relation_type、relation_weight、rank、retrieval_stage、model／interface、run_id |
| claim support | claim_id、answer_text_span、evidence_span、citation_target、entailment_status、support_strength |
| presentation | citation_position、shown_label、source_title、deeplink、source_attribution、response_snapshot |
| outcome | retrieved、selected、used、cited、shown、clicked、returned_to_source、run_at |
| reproducibility | prompt／config hash、model version、query panel、region／language、raw response path、method version |

這套資料表是 xdxd 的研究設計推論；來源論文只直接支持 facet-aware retrieval、coverage-aware distillation、graph-RRF 與 facet attribution 的 scientific-retrieval 實作。[^arxiv-graft-generative-retrieval]

## 4. 研究判定與建議比較

可把以下判定分開，不建立單一「可發現性」總分：

- **Retrieval gain**：structured relation representation 是否改變 `hit@k`、source recall 或 query-candidate coverage。
- **Attribution gain**：候選是否附有穩定且可核對的 relation type、source span 與 citation target；可測 attribution completeness、unsupported citation rate 與 claim-level precision。
- **Ranking／presentation change**：source rank、citation position、source label、link prominence 是否改變；這不是 retrieval 或 entailment 的同義詞。
- **Update cost**：來源變更後 relation／facet 是否需要重抽取、重索引或重訓練；把 freshness latency 與 stale rate 獨立記錄。
- **Transfer boundary**：在 corpus 外的新來源、跨語言、跨介面或不同引擎上，分別保存 query strata 與結果；不可把 scientific corpus 的 transfer 結果當成公開 AI Search 的跨引擎效果。

若要把這套方法用在[Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md)所描述的公開搜尋漏斗，至少要把 crawler、index／canonical、retrieval、used／cited、source presentation 與 click 觀測分層，並與[生成式搜尋 crawlable commons 與來源生態永續性](/concepts/generative-search-corpus-sustainability.md)的 access、referral、freshness 觀測對接。

## 5. 證據邊界與待驗證事項

- 本頁只有一份 arXiv v1 原始研究來源，`status: draft` 且沒有 `verified`；不能描述為已由 xdxd、人工或第二 Agent 驗證。
- 來源的 11,359 篇 NLP papers、in-corpus／out-of-corpus Recall、84% coverage、0.922 attribution precision 與四類 facet 都屬作者在特定 LitWeave、模型、資料切分與實驗設定下的報告，不是公開網路 prevalence、平台 ranking 或 citation guarantee。[^arxiv-graft-generative-retrieval]
- 來源使用 LLM 抽取 facet、以模型權重作為部分 index，且論文 limitations 指出 corpus 範圍、圖建構成本、更新困難與模型容量限制；移植到動態網頁或 agent-facing resource 前，必須獨立檢查 facet fidelity、更新延遲、權利與可追溯性。
- 本頁不支持「加入 structured metadata、facet、schema 或 explanation 就會提高 Google、Bing、Perplexity 或其他引擎的排名、retrieval、citation 或 agent discoverability」；要評估該命題，仍需授權 corpus、paired intervention、固定 query、版本化 response 與漏斗分層 outcome。
- 權利、版本與不可變檔案見[GRAFT raw capture](/raw/arxiv-graft-generative-retrieval-2026-08-26.md)；頁面或論文更新時應新增 snapshot，不覆寫舊 raw evidence。

[^arxiv-graft-generative-retrieval]: Italo Luis da Silva et al., “GRAFT: Graph-Distilled Generative Retrieval for Facet-Aware Scientific Literature Exploration,” arXiv:2608.22381v1, submitted 2026-08-23. Source URL: <https://arxiv.org/abs/2608.22381>. Immutable raw capture: [metadata](/raw/arxiv-graft-generative-retrieval-2026-08-26.md), [paper HTML](/raw/arxiv-graft-generative-retrieval-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-graft-generative-retrieval-2026-08-26/paper.pdf).
