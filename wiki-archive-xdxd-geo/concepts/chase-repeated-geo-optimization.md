---
type: Research Finding
title: CHASE：重複 GEO 最佳化下的內容生態系統動力
description: 從 CHASE 原始研究整理固定 LLM ranking signal 下反覆內容改寫的 quality–ranking divergence、來源可見度代理、控制條件與公開 AI Search 證據邊界。
tags:
  - generative-engine-optimization
  - generative-search
  - ai-search
  - ranking
  - source-visibility
  - citation
  - content-ecosystem
  - quality
  - repeated-optimization
  - simulation
  - evidence-boundary
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T03:24:32.230587Z
sources:
  - id: arxiv-chase
    resource: /raw/arxiv-chase-2026-09-01.md
    title: "arXiv《CHASE: How Content Ecosystems Are Reshaped When Ranking Is the Only Target》原始研究（2026-09-01 raw capture）"
    author: human:qianwen-gao-zichang-su-yiwen-hou-arlen-kumar-leanid-palkhouski
    last_modified: 2026-08-31
---

# 核心觀察

CHASE 是一個受控 simulation framework，將內容適應拆成 `Rank → Discriminate → Rewrite → Evaluate` 四階段，研究創作者反覆對固定 LLM ranking signal 進行最佳化時，文件族群、ranking-predictive features 與獨立 quality measure 如何變化。主要實驗涵蓋 Retail、Video Games、Books、Web、News、Debate 六個 domains、20 輪與五個獨立 seeds；ranking、rewriting、quality evaluation 使用不同 model family。這是來源的模擬設計，不是公開 AI Search 平台的完整實作描述。[^arxiv-chase]

來源以 grounded generated response 的 document-ID citation 驗證 ranking proxy：六個 domains、三個 seeds、五個 evaluation rounds（`n=90`）的 rank–citation AUC 為 `0.853 ± 0.093`。這只表示在 CHASE 的條件下，較好的 Stage 1 ranking 與來源出現在 grounded response 的機率有正向關聯；不能把它解讀為完整公開搜尋的 retrieval、citation entailment 或 source presentation 規則。[^arxiv-chase]

# 來源報告的主要結果

| Domain | quality–ranking alignment `ρ`：R0→R20 | `Δρ` |
|---|---:|---:|
| Retail | `.110→.063` | `−.047` |
| Video Games | `.129→.062` | `−.067` |
| Books | `.022→.004` | `−.018` |
| Web | `.202→.095` | `−.107` |
| News | `.164→.060` | `−.104` |
| Debate | `.104→.039` | `−.065` |

六個 domains 的 `ρ` 在 R20 都低於 R0，變化範圍為 `−.107` 至 `−.018`，平均 `−.068`。作者將其稱為 **quality–ranking divergence**：更接近 ranking-derived feature profile 的文件，隨模擬進行而與獨立 quality score 的對齊減弱。這不等於 document quality 本身在每個 domain 都下降；來源指出 quality trajectory 具有 domain-specific 差異。[^arxiv-chase]

控制條件提供較窄的解讀：

- **No-rewrite**：文件凍結後重複 ranking／feature extraction，在 Retail 與 Debate 的 homogeneity 分別為 `.732→.732` 與 `.633→.633`，支持內容族群變化需要實際改寫，而非單純重複 ranking。
- **Random-target**：保留改寫、但以隨機 feature target 取代 discriminator target；Retail、Debate、News 的 `Δρ` 為 `+.001`、`+.014`、`−.036`，CHASE 則為 `−.047`、`−.065`、`−.104`。這支持「朝 ranking-derived target 適應」與較大 alignment decline 有關的來源解讀，但仍是 simulation-bound observational contrast。[^arxiv-chase]

來源的 rewrite integrity audit 涵蓋 `3,472` 個 accepted rewrites，報告 `93.0%` 通過全部檢查、fabrication `3.4%`、citation removal `2.3%`、quotation removal `2.1%`；另以 `60` documents、`3` annotators 做 human validation。這些是來源指定 pool、模型、判定規則與 sample 的作者結果，不是所有 LLM 改寫的錯誤率或 xdxd 驗證。[^arxiv-chase]

# 解讀邊界

CHASE 固定 ranker、以 25 維 feature space 表示內容、使用相對乾淨的 inferred signal，並把 creators 視為 myopic／independent；結果只觀察 20 輪。來源明確指出完整 deployed generative-search system 還可能包含 retrieval、reranking、generation、personalization、user feedback 與 ranker retraining。因此，本頁的數字與「quality–ranking divergence」只能標示為原始研究的 draft evidence，不得升格為公開 Google、Bing、Perplexity、ChatGPT 或其他平台的普遍 GEO 因果效果。[^arxiv-chase]

本研究沒有操弄或量測 HTML／Markdown／JSON-LD、structured data、robots、canonical、crawler access、公開 index、live retrieval、UI shown、referral 或 click。相關公開 AI Search 與內容介入效果仍為 unresolved；請回到[Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md)及[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)閱讀不同 evidence layer。

# 對 xdxd 的 draft 研究用途

若要把這個方向轉成 xdxd 的受控 intervention，應把單輪單頁 before／after 擴展為 population-level paired protocol：固定 query、engine／ranker、rewriter、quality judge、content snapshot、domain、seed 與 round，並設置 no-rewrite、random-target、ranking-derived-target 與必要的 placebo／frozen controls。每輪保存 content version／hash、feature profile、ranking output、citation source ID、quality score、homogeneity、`quality_ranking_alignment` 與 rewrite-integrity result。

公開 Web 研究仍要另行保存 `crawled`、`indexed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 與 `referral`；不得用 CHASE 的 ranking proxy、RAG citation 或 simulation quality 取代公開搜尋漏斗。以上是依來源建立的 xdxd draft protocol 推論，不是來源對公開 AI Search 或 GEO uplift 的承諾。[^arxiv-chase]

# Source

完整的來源 metadata、HTTP headers、不可變 payload、bytes、SHA-256 與 rights boundary 見 [CHASE raw capture](/raw/arxiv-chase-2026-09-01.md)。

[^arxiv-chase]: Qianwen Gao, Zichang Su, Yiwen Hou, Arlen Kumar, and Leanid Palkhouski, “CHASE: How Content Ecosystems Are Reshaped When Ranking Is the Only Target,” arXiv:2608.30466v1, submitted 2026-08-31; accepted to COLM 2026. Source URL: <https://arxiv.org/abs/2608.30466>; raw evidence: [CHASE raw capture](/raw/arxiv-chase-2026-09-01.md).
