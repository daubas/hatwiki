---
type: Research Method
title: Ontology-grounded retrieval 的 auditability、provenance 與 citation traceability
description: 將 ontology／knowledge graph 的來源鏈、邊界約束、retrieval trace 與 citation traceability 納入 Agent Reader 與生成式搜尋的可稽核性觀測；不把 traceability F1 當成公開 AI Search 效果。
tags:
  - ontology
  - knowledge-graph
  - graph-rag
  - provenance
  - auditability
  - citation
  - retrieval
  - structured-content
  - agent-discoverability
  - measurement
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-30T10:38:40.878411000Z
sources:
  - id: arxiv-auditable-by-construction
    resource: /raw/arxiv-auditable-by-construction-2026-08-30.md
    title: "arXiv《Auditable by Construction: An Ontology-Driven Framework for Trustworthy LLM Analytics in Enterprise Finance》原始研究（2026-08-30 raw capture）"
    author: human:sergiy-lunyakin
    last_modified: 2026-08-21
---

# 方法定位

本頁把「檢索到了什麼」與「能否說明為何檢索、如何約束、證據從何而來」分開，作為 xdxd 已知 URL Agent Reader／自有授權 corpus 的 draft measurement method。起點是 KDAF／CARP 原始研究：來源主張在高風險分析工作流中，RAG 不應只以 answer correctness 評估，也應保留可回溯的 source lineage、typed traversal、boundary decision 與 retrieval trace。這是來源的架構與研究主張，不是公開 AI Search 的產品規格或已驗證 GEO 效果。[^arxiv-auditable-by-construction]

本頁應與 [AAP 與 KG Agent discoverability](/concepts/agentic-affordance-profile-kg-discoverability.md) 的 planning-time fitness、[Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 的 Agent-facing retrieval、[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md) 的 evidence／citation funnel，以及 [多表面機器可讀 metadata 一致性與 Agent discoverability 觀測方法](/methods/multi-surface-metadata-consistency-observation.md) 的 representation audit 並讀。它補上的不是「更多 metadata 就會被搜尋引擎引用」，而是當一個 Agent Reader 已經能取得候選後，如何把來源邊界與檢索決策變成可重播、可稽核的 evidence。

# 來源研究的可移植結構

來源 KDAF 以六階段方法連接 competency questions、minimum viable ontology、schema-guided extraction、帶 contextual relevance／provenance 的表示、混合驗證與 CARP。CARP 的 evaluated profile 將以下資訊寫入 retrieval trace：[^arxiv-auditable-by-construction]

- seed entity、node type、match reason 與 seed score；
- typed traversal edge、path score、深度與動態 threshold；
- candidate 的 accepted／rejected decision 與 rejection reason；
- selected evidence 的 company → filing → page → evidence provenance chain；
- final selection 的 evidence identifier、context assembly 與 generator input。

來源的實驗 graph 把 company boundary 作為 hard eligibility constraint，把 period 放在 soft scoring term；final ranking 仍是 hybrid，normalized lexical score 權重為 `0.45`。因此這個方法不能把「ontology」理解成取代 lexical retrieval 的單一排名訊號，而應將其視為把 entity boundary、reachability 與 provenance 變成可檢查結構的方式。來源的 causal／supporting／correlational contextual relation 仍是 design-level，沒有在 FinanceBench graph 中完整實例化。[^arxiv-auditable-by-construction]

# 觀測單位與最小 schema

對每個 `query_id`、`run_id`、`representation_version` 與 `source_snapshot_hash`，保存：

| 層級 | 建議欄位 | 觀測目的 |
|---|---|---|
| Query／seed | `query_text`、`query_hash`、`seed_id`、`node_type`、`match_reason`、`seed_score` | 判斷 query 如何進入知識結構 |
| Traversal | `edge_type`、`from_id`、`to_id`、`depth`、`path_score`、`threshold`、`decision`、`rejection_reason` | 重建可達性與邊界決策 |
| Provenance | `source_document_id`、`source_page_id`、`evidence_id`、`source_url`、`source_snapshot_hash`、完整 path | 確認 evidence identity 與來源鏈 |
| Selection | `final_score`、`lexical_score`、`propagation_score`、`coverage_score`、`period_score`、`budget_rank` | 分解 final ranking，而非只存總分 |
| Generation | `model`、`model_version`、`prompt_hash`、`context_hash`、`answer_hash`、`citation_ids` | 將 retrieval 與 answer-side attribution 對接 |
| Replay | `retrieval_code_version`、`graph_digest`、`config_hash`、`seed`、`replay_id` | 判斷重跑是否真的相同 |

每個 evidence path 應能回答「從哪個 seed、沿哪些 typed edges、經過哪些 boundary decision、到哪個 source page」。若只保存排序分數、最終 URL 或 LLM answer，不能聲稱已保存 audit trace。

# 指標與解讀

來源在 145 題 FinanceBench pilot 中報告 KDAF traceability F1 `0.515`，BM25 `0.463`，graph without ontology `0.488`；KDAF 對 BM25 的 paired traceability delta 為 `+0.052`（95% CI `[+0.024, +0.083]`），但 correctness delta 為 `-0.007`（95% CI `[-0.021, 0.000]`）。這組結果支持在該受限 protocol 中分開看 answer correctness 與 citation traceability，不支持 ontology-grounded retrieval 一般更準確。[^arxiv-auditable-by-construction]

建議在 xdxd 將下列指標分開：

1. **Path validity**：selected evidence 是否有非空 typed path；若沒有獨立重建，標示為 serialization check。
2. **Complete provenance chain rate**：company／entity → document → page → evidence 是否端到端解析。
3. **Provenance resolution failure**：recorded identifier 是否指向另一個 evidence item；失敗數必須明確報告，不以 success rate 掩蓋。
4. **Retrieval replay fidelity**：相同 graph／source snapshot／config 下，兩次 retrieval 的 selection、order、threshold decision 是否一致。
5. **Boundary leakage**：selected evidence 是否跨越 query subject 的 entity、tenant、locale、time period 或 rights scope；hard boundary 與 soft score 必須分開。
6. **Citation identifier alignment**：回答引用的 identifier 與 gold／authoritative evidence set 的 precision、recall、F1；記錄 granularity 與 normalization rule。
7. **Path faithfulness、review effort 與 human trust**：不得由 traceability F1 代替，需另做 claim-level adjudication、reviewer time、error detection 或 trust study。

來源的 selected graph evidence 在其 benchmark 中 valid path／complete chain 都是 `1.000`、provenance failures `0`、retrieval replay `145/145`；KDAF cross-entity leakage `0/426`，但 off-period evidence 仍為 `70/341`（`20.5%`），因 period 不是 hard filter。這些是該 source slice 的 exhaustive counts，不是所有 corpus、模型或公開搜尋的常數。[^arxiv-auditable-by-construction]

# Paired protocol

對 representation 或 retrieval intervention，至少設置以下配對：

- flat lexical retrieval vs ontology／graph-constrained retrieval；
- graph boundary as hard eligibility vs same field as soft ranking feature；
- provenance-complete trace vs answer-only citation list；
- exact evidence ID vs normalized page／document ID；
- deterministic replay vs stochastic seeds；
- source snapshot fixed vs source update／stale condition；
- candidate pool independent from gold vs source-restricted diagnostic pool。

每個 paired run 固定 query panel、source snapshot、corpus rights basis、model／provider、prompt、retrieval budget、parser／tokenizer、locale、time window、configuration hash 與 outcome denominator。若 intervention 是 HTML／Markdown／JSON-LD／ontology representation，另保存 `crawled`、`indexed`、`candidate_exposed`、`retrieved`、`reranked`、`selected`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`source_page_opened`、`outbound_referral` 與 `clicked`；local provenance trace 不能回填公開 Web funnel。

# 主要陷阱

- **Gold-derived candidate pool**：來源的 189 筆 evidence pool 是為 FinanceBench slice 建立的 gold-derived pool，不是完整 filing corpus；它適合做 shared-condition comparison，不適合估計 open-corpus recall 或公開索引 coverage。[^arxiv-auditable-by-construction]
- **Exact-ID 偏差**：traceability F1 對 evidence identifier 做 exact set matching、不做 normalization；正確頁面但 ID granularity 不同可能被算成 miss。需報告 identifier granularity、normalization 與 partial-match policy。
- **Trace serialization ≠ trace validation**：來源指出 valid path rate 只確認 path 被記錄，沒有獨立重建 seed 起點、edge continuity 與 graph resolution。xdxd 應做 deterministic path reconstruction。
- **正確性量測偏差**：來源的 automatic correctness 是 conservative exact-match／numeric equivalence；30 題 Llama-3-assisted review 不是獨立人工 ground truth。不能以 reviewed correctness 宣稱 human validation。
- **結構化 ≠ compact**：來源的 KDAF context 平均 `1,581` tokens，高於 lexical hybrid 的 `1,402`；graph retrieval p50 `4.14 ms`，但 end-to-end generation latency 較高。需把 retrieval cost、context size、generation latency 與 traceability 分開。
- **邊界設定**：entity boundary 可以被 hard-enforce，但 period／freshness／rights／language 等欄位若只做 soft score，仍會有 leakage；應把每種 boundary 的 semantic commitment 明確登記。

# 與公開 AI Search 的關係

這個 method 可用來設計已知 URL Agent Reader 或授權 corpus 的 evidence path，但來源沒有測試 Google、Bing、Perplexity、ChatGPT Search、AI Overviews、AI Mode 或其他公開搜尋平台的 crawler、index、ranking、retrieval、citation、source presentation、referral 或 click。它也沒有測試 HTML、Markdown、JSON-LD、schema、intermediary page 或 ontology 介入。因此：

- provenance chain 是供 Agent／reviewer 重建的 local evidence，不等於 crawler 已讀取；
- citation traceability 是 evidence-identifier alignment，不等於 claim-level citation entailment；
- graph boundary 的 leakage result 不等於公開搜尋 ranking 或 citation preference；
- `0/426`、`145/145`、`0` failure 與 `0.515` F1 都不能外推為 GEO uplift；
- 若要研究公開 AI Search，必須另行取得 server／platform／interface evidence，並和本頁的 local trace 同時保存而不互相代換。

這些邊界延續 [xdxd GEO 研究計畫](/concepts/xdxd-geo-research-program.md) 的「Known-URL Agent Reader 可先驗證；公開 AI 搜尋加速器仍需端到端 evidence」判斷。本頁沒有 `verified`，維持 `draft`。

# 下一步

1. 在自有或明確授權 corpus 建立 stable entity／document／page／evidence IDs 與 source snapshot manifest。
2. 先以 deterministic governed profile 驗證 provenance chain、hard／soft boundary、replay receipt 與 rejection audit，再比較 lexical、dense、graph 或 hybrid retriever。
3. 為 selected 與 reachable-but-not-selected evidence 都保存 decision reason，避免 evidence budget 外的候選成為不可解釋漏失。
4. 以 claim-level support／citation entailment、path faithfulness 與 reviewer verification effort 取代單一 citation overlap 作為後續 auditability outcome；另外保留公開 `crawled`→`indexed`→`retrieved`→`used_in_answer`→`cited`→`shown`→`clicked` funnel。

[^arxiv-auditable-by-construction]: Sergiy Lunyakin, “Auditable by Construction: An Ontology-Driven Framework for Trustworthy LLM Analytics in Enterprise Finance,” arXiv:2608.20661v1, submitted 2026-08-21. Source URL: <https://arxiv.org/abs/2608.20661>; immutable raw capture: [metadata](/raw/arxiv-auditable-by-construction-2026-08-30/capture-metadata.json), [abstract HTML](/raw/arxiv-auditable-by-construction-2026-08-30/abstract.html), [paper PDF](/raw/arxiv-auditable-by-construction-2026-08-30/paper.pdf), [Atom API](/raw/arxiv-auditable-by-construction-2026-08-30/arxiv-api.xml), [SHA-256](/raw/arxiv-auditable-by-construction-2026-08-30/sha256.txt), and [rights record](/raw/arxiv-auditable-by-construction-2026-08-30/rights.txt).
