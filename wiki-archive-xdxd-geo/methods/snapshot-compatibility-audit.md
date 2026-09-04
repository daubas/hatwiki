---
type: Research Method
title: 生成式搜尋 snapshot compatibility 與 answer churn 觀測方法
description: 將 Snapshot Compatibility Audit 轉成生成式搜尋與檢索狀態變更的 draft 跨版本觀測 protocol，區分 corpus／index 變化與一般生成重複噪聲。
tags:
  - generative-search
  - ai-search
  - retrieval
  - answer-churn
  - compatibility
  - reproducibility
  - observation
  - evaluation
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T19:36:21Z
sources:
  - id: arxiv-answer-churn
    resource: /raw/arxiv-answer-churn-2026-08-26.md
    title: "Same Agent, Different Answers: A Repeat-Aware Audit of Corpus-Induced Answer Churn in Retrieval-Augmented QA"
    author: "human:jingjie-ning"
    last_modified: 2026-08-24
---

# 方法定位

本頁把一份 arXiv 原始研究提出的 Snapshot Compatibility Audit 整理成 xdxd GEO 可採用的 draft 觀測方法。來源研究的實證對象是固定 single-turn retriever-generator 與 FineWeb nested corpus path；本頁的生成式搜尋、跨引擎、citation 與 agent discoverability 欄位是研究設計推論，不是來源已驗證的平台標準或公開搜尋效果。[^arxiv-answer-churn]

## 核心區分

- **Utility**：新 snapshot 的答案正確率、coverage 或其他目標是否改變。
- **Compatibility**：在使用者與下游系統可觀察的層級，old snapshot 與 new snapshot 是否仍保持相近答案行為。
- **Repeat noise**：同一 snapshot、同一問題與相同 evidence 下，獨立生成本來就可能產生的差異。
- **Excess answer churn**：跨 snapshot 的差異扣除同 snapshot 的 repeat noise；正值支持「這次狀態變更帶來超出一般重複噪聲的答案移動」，不等於錯誤、傷害或排名提升。[^arxiv-answer-churn]

若 `L`、`H` 是 old／new snapshot，問題 `i` 在各狀態各取兩個 response，令 `k` 為 exact 或 semantic similarity：

```text
w_i = 1/2 [k(L_i,a, L_i,b) + k(H_i,a, H_i,b)]
c_i = 1/4 Σ_{r∈{a,b}, s∈{a,b}} k(L_i,r, H_i,s)
D_hat = 1/N Σ_i (w_i - c_i)
```

`D_hat > 0` 表示跨 snapshot agreement 低於同 snapshot repeat agreement。這是 question-cluster 的 agreement gap；來源研究明確把它解讀為 path-specific corpus-associated contrast，而不是通用 scaling effect 或單純的「答案改變題數比例」。[^arxiv-answer-churn]

## 最小 protocol

### 1. Freeze the comparison

先命名 old／new snapshot，固定 query、model identifier、prompt、retrieval policy、evidence depth、rendering、exposed generation controls、region／language 與時間窗。若要研究 AI Search 的 corpus／index 變化，必須保存 query 到 response 間的 source set、citation URL、normalized URL、evidence bytes 或 hash；若 retrieval 本身隨機，須鎖定 retrieved evidence，或把 retrieval variation 明確納入 repeated state。[^arxiv-answer-churn]

### 2. Question-level replicate

每個 query、session state 或固定 prompt，在每個 snapshot 至少收集兩個獨立 response；保留執行順序、retry、transport failure 與 accepted empty／UNKNOWN response，不以 outcome 選擇性重抽。生成式搜尋若包含 multi-turn state，應先把 session state 固定，再做 old／new paired run；不能把 isolated final turn 的結果直接當成 session-compatible evidence。

### 3. Blind compare

至少分開報告：

- within-snapshot exact agreement；
- within-snapshot semantic agreement；
- cross-snapshot exact／semantic agreement；
- `D_hat` 與 whole-question bootstrap interval；
- retrieved、selected／exposed、cited、supported、clicked 的分層結果。

判定 exact／semantic agreement 時，應對 judge 隱藏 snapshot、evidence、citation state 與 correctness；可加第二個 judge family 或人工 subset 作 sensitivity analysis，但不能用 outcome 決定替換資料。來源研究的 semantic judge 不是人工驗證，xdxd 也不得把 machine agreement 寫成 `verified: human:*`。[^arxiv-answer-churn]

### 4. Triage and decision

將 `D_hat` 與 utility、EM-match／nonmatch transition、repeat-stable semantic flip、retrieval／citation URL overlap、source-set difference、答案版本 hash 一起檢視。正的 `D_hat` 先標為 compatibility risk；是否要回滾、人工 review 或接受變更，必須依產品用途與風險設定 application-specific threshold。來源研究也提醒，答案變化可能是修復、替代答案或語意等價變化，不自動等於 regression。[^arxiv-answer-churn]

## xdxd GEO 的觀測欄位

| 層級 | 必要欄位 |
|---|---|
| Snapshot | engine、model、interface、region、language、version／rollout、old／new snapshot id、observation window |
| Query／session | query_id、conversation_id、turn_id、history policy、prompt／state hash、replication、run_at |
| Retrieval | retrieved source IDs、normalized citation URLs、rank／position、evidence text hash、retrieval response hash、endpoint／crawler context |
| Response | raw response snapshot、answer hash、exact／semantic normalization、selected／exposed／cited／supported／clicked labels |
| Audit | within agreement、cross agreement、`D_hat`、bootstrap method／seed、stable-flip flag、EM transition、source-set overlap、judge version |
| Decision | utility metrics、compatibility threshold、triage outcome、manual-review-needed flag、limitations |

這些欄位是 xdxd 的可重現 protocol 推論，不是來源研究已提出的 AI Search schema。跨引擎比較時，先在每一個 engine／interface 內完成 paired old／new audit，再把 `D_hat` 與其 uncertainty 分層比較；不能把不同引擎的 response difference 直接當作同一 snapshot 的 compatibility gap。

## 適用範圍與限制

本方法可作為以下研究的 repeat-aware 控制：corpus／index refresh、retriever replacement、chunking／deduplication 介入、external-memory 更新、citation source-set 變更，或同一 prompt 在不同時間／介面上的 state snapshot audit。它不提供 retrieval、citation、ranking、click 或 agent discoverability 的因果識別；若同時改 model、transport、provider default sampling 或 evidence path，結果只能標為多因素 post-hoc replication，不能宣稱 model-only 或 corpus-only effect。[^arxiv-answer-churn]

它也不能取代 session-level multi-turn protocol、跨介面 source presentation 分層或 longitudinal crawl coverage 觀測；應與[跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md)、[AI visibility measurement 的 rank stability 與 structural sufficiency](/methods/ai-visibility-measurement-convergence.md)、[縱向 crawl discovery curve 與 coverage／persistence 觀測方法](/methods/longitudinal-crawl-discovery-and-coverage.md)、[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)及[GEO 內容偵測與 citation URL audit](/methods/geo-content-detection-and-citation-audit.md)分層使用。研究原始證據的保存規則遵循[GEO 證據生命週期](/methods/evidence-lifecycle.md)。

## 待驗證事項

- 在 Google、Bing、Perplexity、OpenAI 或中文生成式搜尋介面上，是否可穩定取得可鎖定的 retrieved／citation evidence set。
- 對跨引擎、跨 interface、跨 session state 的 compatibility gap，如何預先註冊 query panel、old／new state、judge rules 與 application-specific threshold。
- citation URL、source presentation、答案內容與 clicked outcome 的 compatibility 是否需要不同 `k` 與分層 estimand。
- 本頁未經人工核對，沒有 `verified`；原始研究也不等同 xdxd 的重現。新增平台實驗前仍須保存不可變 response、evidence、headers、時間與 hash。[^arxiv-answer-churn]

[^arxiv-answer-churn]: Jingjie Ning and Xueqi Li, “Same Agent, Different Answers: A Repeat-Aware Audit of Corpus-Induced Answer Churn in Retrieval-Augmented QA,” arXiv:2608.22856v1, submitted 2026-08-24. Source URL: <https://arxiv.org/abs/2608.22856>. Immutable raw capture: [metadata](/raw/arxiv-answer-churn-2026-08-26.md), [abstract HTML](/raw/arxiv-answer-churn-2026-08-26/abstract.html), [paper HTML](/raw/arxiv-answer-churn-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-answer-churn-2026-08-26/paper.pdf).
