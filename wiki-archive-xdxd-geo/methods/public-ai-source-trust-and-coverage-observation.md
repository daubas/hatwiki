---
type: Research Method
title: 公共 AI 服務的來源可信度與覆蓋率觀測方法
description: 將公共 AI 回答的 answer quality、來源級 trust flag、curated／open-web coverage、abstention 與 citation configuration sensitivity 分層觀測，避免以流暢度或 citation presence 代替來源可信度。
tags:
  - ai-search
  - generative-search
  - retrieval
  - source-trust
  - coverage
  - citation
  - provenance
  - evaluation
  - public-information
  - prompt-ablation
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-27T06:53:57Z
sources:
  - id: arxiv-curated-retrieval-open-web
    resource: /raw/arxiv-curated-retrieval-open-web-2026-08-27.md
    title: "arXiv《Curated retrieval versus open web search in public AI information services: a coverage–trust trade-off》原始研究（2026-08-27 raw capture）"
    author: human:hafsteinn-einarsson-et-al
    last_modified: 2026-08-24
---

# 方法定位

這是一份由 arXiv 原始研究轉成 xdxd GEO／Agent Reader 的 draft observation protocol。來源研究評估單一冰島語公共 AI 資訊服務在 curated RAG 與 open-web search 之間的覆蓋率、來源可信度與 citation behavior；它不是公開搜尋引擎的內部 ranking 規格，也不是 xdxd 已重現的 GEO 成效。[^arxiv-curated-retrieval-open-web]

## 1. 分析單位與必要 strata

固定或版本化保存下列欄位，並把 query、answer、source、configuration 與 reviewer 判斷分開：

- `service_id`、`query_id`、`answer_id`、`locale`、`topic`、`question_type`、`study_window`、`model`／version、`prompt_hash`、`retrieval_mode`、`retrieval_plugin` 與 `configuration_hash`。
- question 的來源是 real-user、固定 panel、人工撰寫或 model-generated；generated question 不可冒充真實使用者分布。
- source 的 `source_url`、`source_snapshot_hash`、`publication_time`、`last_modified`、`retrieval_time`、`source_type`、`primary_or_secondary` 與 URL identity。
- study／review 的 inclusion、exclusion、failed request、abstention、unanswered 與不完整 response；不能因結果不利而刪除分母。

來源的 287 題、兩種 retrieval path、574 eligible answers 與不平衡 review queue 可作欄位設計參考，但不構成 xdxd 的樣本量或通用 power rule。[^arxiv-curated-retrieval-open-web]

## 2. Answer quality 與 source trust 分層

### 2.1 Answer-level rubric

可把 answer-level quality 建成獨立欄位，例如：

- `answers_question`
- `factual_accuracy`
- `relevant_sources`
- `no_hallucinations`
- `appropriate_scope`
- `language_quality`
- `publishable`
- `composite_score`

這些欄位回答「答案表面與內容是否可接受」，不回答個別 cited source 是否值得信任。

### 2.2 Source-level review

每個 cited source 另保存：

- `flag_reason`：例如 `untrustworthy`、`irrelevant`、`outdated`，以及研究特定的其他明確分類；
- `flag_comment`、`reviewer_id`、`reviewer_role`、`adjudication_status`、`review_version`；
- `primary_or_secondary`、是否存在更直接的一手來源、是否有 bibliography、是否為 opinion／partisan／personal blog、是否可取得與是否 broken；
- source 的 publication／modification time、內容 snapshot 與 reviewer 看到的 exact URL。

若不同 retrieval path 可用的 flag reason 不同，跨 mode 的旗標不能解讀成 like-for-like trust gap；應先報告各 mode 內部的分母與 flag 定義，再把跨 mode 差異標成 descriptive。來源研究的 curated item 只查 currency、web item 查 untrustworthy／irrelevant，正是此限制的實例。[^arxiv-curated-retrieval-open-web]

Source flag 是 reviewer judgment，不是自動等同 truth。若用 LLM 對 free-text comment 做 code assignment，另保存 `coder_model`、schema、prompt、輸出 hash、human correction 與未決 disagreement；不要把 LLM coding 當成人工驗證。

## 3. 覆蓋率—可信度漏斗

至少把下列事件分開：

```text
question available
  → candidate retrieved
  → source opened / inspected
  → evidence used in answer
  → source cited
  → citation shown
  → user clicked / returned-to-source
```

並在 answer 層另記 `answered`、`abstained`、`unanswered_reason`。報告至少四種分母：

1. answer-level coverage：回答問題的 answers / eligible answers；
2. answer-level flag rate：有至少一個 source flag 的 reviewed answers / reviewed answers；
3. source-level flag rate：被 flag 的 cited sources / cited sources；
4. distinct-URL flag rate：被 flag 的 distinct URLs / distinct cited URLs。

source trust、answer quality、citation presence 與 click 是不同 outcome；不得由其中一層反推另一層。若 curated corpus 缺資料而系統 abstain，這是 coverage outcome，不能直接標成 generation failure。若對 answered-only subset 做比較，必須標記 conditioning／selection effect，不能當成全體 mode 的無偏比較。[^arxiv-curated-retrieval-open-web]

## 4. Curated 與 open-web 的 paired protocol

在自有或明確授權資料上，以相同 query panel、locale、model、answer policy、時間窗與 evidence snapshot 配對比較：

- curated corpus／controlled RAG；
- open-web 或明確記錄來源池的 search path；
- 必要時加入 no-search／abstain control。

每個 pair 保存 `question_hash`、`source_pool_hash`、`retrieval_snapshot_hash`、`retrieval_mode`、candidate／retrieved URLs、rank、opened、used、cited、shown、clicked、answer quality、source flag 與 reviewer evidence。固定 prompt 不足以證明 path 相同；應另保存 plugin version、redirect resolution、citation parser、structured／free-text output format、account／locale、run time 與 failure state。

來源研究的 262 RAG／187 web reviewed answers 並非隨機平衡 assignment，且兩 mode 的 flag rubric 不對稱；xdxd 若要估計 mode 差異，應預先規劃 balanced reviewer assignment 或明確把結果限為 observational。[^arxiv-curated-retrieval-open-web]

## 5. Prompt、citation format 與 configuration ablation

對 trusted-domain list 或其他 prompt guidance 做 ablation 時，至少固定：

- question order、query snapshot、model／version、API route、search plugin、tool schema、citation format、redirect resolution、temperature／seed、run time window；
- `domain_list_present`、`citation_capture_format`、`list_compliance`、`citation_mix`、`source_trust_reviewed`。

`list_compliance` 只能回答 cited domains 是否落在清單中，不回答來源是否可信。若有／無 list 的 citation capture 使用 structured output，而 production 使用 free-text parsing，或兩次執行相隔數日，必須把這些當成 configuration confounds；不要把差異歸因於 prompt 單一因素。來源 ablation 中 listed-domain share 從 12% 到 21% 的結果只支持 compliance 變化，不能支持 trustworthiness 改善。[^arxiv-curated-retrieval-open-web]

同一 model／prompt 也不代表 citation mix 穩定。應對 citation parser、source URL resolution、render／tool response、time、account、surface 與 deployment policy 做 configuration hash，並在不同 configuration 間只作分層描述或明確的 paired comparison。

## 6. Source-quality claim tracing

對每個 consequential source claim 建立 claim ledger：

| 欄位 | 最小內容 |
|---|---|
| `claim_id` | 穩定識別碼 |
| `claim_status` | `supported`、`partially-supported`、`observational`、`unresolved` 或 `contradicted` |
| `source_id` | 擁有該 claim 的來源 |
| `population` | 服務、語言、題型與 reviewer population |
| `interface` | RAG、web-search、Web／App 或其他 surface |
| `date_boundary` | 發布、擷取與研究期間 |
| `denominator` | eligible、reviewed、answered、source 或 distinct URL |
| `limitation` | review design、selection、adjudication、confound 與 external-validity boundary |

來源本身把 source flags、answer rubric、prompt compliance 與 configuration sensitivity 分開；xdxd compiled concept 不應將 35% web flag、91.5% answer coverage 或 21% list compliance 寫成跨平台常數。[^arxiv-curated-retrieval-open-web]

## 7. 對 xdxd 公開 GEO 命題的邊界

這份方法能補強「citation 是否來自值得信任的來源」與「回答 coverage 是否由 corpus 缺口造成」的研究面，但不能回答：

- 某個 intermediary page、schema、structured content 或 AEO／GEO intervention 是否提高公開引擎的 crawl、index、ranking、retrieval、citation、source presentation、click 或 conversion；
- 單一公共服務、單一語言或單一公投期間的 source flag rate 是否代表整體 AI Search；
- trusted-domain prompt list 的 compliance 是否等於 source quality、factual accuracy 或 user trust 改善。

若要把本方法接到 xdxd 的公開 Web funnel，仍需另收 `crawled`、`indexed`、`retrieved`、`reranked`、`used`、`cited`、`supported`、`shown`、`clicked`、source snapshot、citation entailment 與 human／judge calibration；Agent Reader 的 evidence utilization 也不能直接替代公開搜尋 visibility。上述轉換是 xdxd 的研究設計推論，不是來源的公開平台效果聲稱。

## 8. Evidence boundary

本頁維持 `status: draft` 且無 `verified`。來源是 original research，但只提供特定服務的 pre-launch、非隨機、不平衡 observational comparison；source flags 多數不是雙重審查的 adjudicated labels，prompt ablation 的 citations 也未經同等 trust review。任何跨服務、跨語言、跨引擎或 GEO 因果結論仍為 `unresolved`，必須以新的 primary evidence 或 xdxd 授權實驗核對。[^arxiv-curated-retrieval-open-web]

## Source citation

[^arxiv-curated-retrieval-open-web]: Hafsteinn Einarsson, Hafsteinn Birgir Einarsson, Jón Gunnar Ólafsson, and Jón Gunnar Þorsteinsson, “Curated retrieval versus open web search in public AI information services: a coverage–trust trade-off,” arXiv:2607.05217v2, submitted 2026-07-07. Source URL: <https://arxiv.org/abs/2607.05217>. Immutable raw capture: [raw evidence](/raw/arxiv-curated-retrieval-open-web-2026-08-27.md), [capture metadata](/raw/arxiv-curated-retrieval-open-web-2026-08-27/capture-metadata.json), and [SHA-256](/raw/arxiv-curated-retrieval-open-web-2026-08-27/sha256.txt).
