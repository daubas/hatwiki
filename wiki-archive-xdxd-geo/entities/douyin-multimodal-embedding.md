---
type: Model Entity
title: Douyin Multimodal Embedding（DME）
description: Douyin technical report 描述的兩階段多模態 embedding model，連結 evidence-grounded retrieval representation、AI search deployment 與 representation-level paired evaluation。
tags:
  - entity
  - douyin
  - multimodal-retrieval
  - generative-search
  - ai-search
  - agent-discoverability
  - evidence-utilization
  - semantic-sufficiency
  - cross-modal-search
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-29T14:24:19Z
sources:
  - id: arxiv-douyin-dme
    resource: /raw/arxiv-douyin-multimodal-embedding-2026-08-29.md
    title: "arXiv《Douyin Multimodal Embedding Model Technical Report》原始研究（2026-08-29 raw capture）"
    author: human:haonan-chen-et-al
    last_modified: 2026-08-18
---

# Entity

**Douyin Multimodal Embedding（DME）** 是來源 technical report 描述的多模態檢索模型。它面向文字、圖片、影片、visual documents 與混合模態，試圖同時滿足大規模 indexing 效率與 hard negative 的細粒度語意辨識。以下內容是來源的模型／產品描述，不代表 xdxd 已重現。[^arxiv-douyin-dme]

## Model and retrieval surface

DME 的 Stage 1 使用大規模 contrastive pre-training 建立統一 embedding space；Stage 2 以 Evidence-Grounded Typed Latent Reasoning 將 retrieval-relevant evidence 組織到 hidden-space latent states，再以 Cross-Conditional Reconstruction 讓 embedding 在訓練中承擔 counterpart-side semantics 的 reconstruction supervision。來源表示這些額外 supervision 只在 training 使用，inference 仍維持單次 encoder 的 dense-vector bi-encoder 路徑，不在 online retrieval 時進行顯式長鏈生成或 cross-encoder reranking。[^arxiv-douyin-dme]

對 xdxd 的研究模型而言，這個 entity 應連到 [生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)：representation quality、evidence grounding、candidate retrieval 與 downstream answer／citation outcome 必須是不同觀測層；也可參照 [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 的 retrieve／use／citation funnel。

## Source-reported results

| 層級 | 來源報告 | 狀態與限制 |
|---|---|---|
| 公開 benchmark | DME-2B／DME-9B 在 MMEB-v2 overall score `74.8`／`78.4`；作者宣稱同尺度 state-of-the-art，video／visual-document retrieval 特別突出。[^arxiv-douyin-dme] | `observational`；受 benchmark、baseline、model scale、data 與 metric protocol 限制，未由 xdxd 重跑。 |
| Douyin internal offline | overall score `+2.92%` relative improvement。[^arxiv-douyin-dme] | `observational`；內部 evaluation set、traffic、metric receipt 與 raw logs 未公開／未保存。 |
| Douyin Search online | Lifetime（LT）`+0.1%` online A/B gain。[^arxiv-douyin-dme] | `observational`；未提供 randomization、confidence interval、完整 denominator、traffic allocation 或 raw experiment receipt。 |
| 公開 GEO | 沒有公開跨引擎 crawler、index、ranking、citation、source presentation、referral 或 click study。 | `unresolved`；不能把 Douyin production retrieval 結果外推為公開 AI Search 或 GEO uplift。 |

## Research variables for xdxd

若在自有或明確授權 corpus 對照 representation，應保存：

1. `source_snapshot_hash`、query／document modality、content／evidence span identity 與 rights basis；
2. embedding model／version、training-only objective、encoder route、vector dimension、index build hash、ANN／rerank configuration；
3. hard-negative construction、candidate pool、`candidate_exposed`、`retrieved`、`reranked`、`evidence_selected` 與 latency／cost；
4. `used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 與 task-validated outcome；
5. model／prompt／response schema、run seed、budget、platform／interface 與版本化結果。

這些欄位是 xdxd 的研究設計 translation，不是 DME report 已經提供的公開完整 receipt。[^arxiv-douyin-dme]

## Evidence boundary

本 entity 支持對 DME 模型設計、來源指定的 MMEB-v2 結果與 Douyin 自報 deployment／A/B 描述做時間化引用；不支持下列更強主張：

- DME 或任何 multimodal embedding 一定提升公開 Google、Bing、Perplexity、OpenAI 或其他 AI Search 的 ranking、retrieval、citation、source presentation、referral、click 或 GEO visibility；
- `semantic sufficiency` 或 representation completeness 已成為跨平台標準；
- Douyin 的 internal offline／online 結果可作為 xdxd 的重現、因果估計或跨引擎常數。

因此本頁與 [DME raw capture](/raw/arxiv-douyin-multimodal-embedding-2026-08-29.md) 均維持 `draft`，沒有 `verified`。來源保存與權利邊界見 [raw record](/raw/arxiv-douyin-multimodal-embedding-2026-08-29.md) 及其 [rights record](/raw/arxiv-douyin-multimodal-embedding-2026-08-29/rights.txt)。

[^arxiv-douyin-dme]: Haonan Chen, Chu Li, Zhicheng Wang, Yuanwei Liu, Yuanjiang Wang, Shaohua Jiang, and Zhicheng Dou, “Douyin Multimodal Embedding Model Technical Report,” arXiv:2608.02148v3, submitted 2026-08-03 and last revised 2026-08-18. Immutable raw capture: [metadata](/raw/arxiv-douyin-multimodal-embedding-2026-08-29/capture-metadata.json), [raw wrapper](/raw/arxiv-douyin-multimodal-embedding-2026-08-29.md), and [source URL](https://arxiv.org/abs/2608.02148v3).
