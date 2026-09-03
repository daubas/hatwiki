---
type: Research Method
title: 個人層級 AI visibility、姓名辨識與 roster denominator 觀測
description: 從 grounded-model 原始研究整理個人點名、citation type、語言差異與 roster overlap 的 draft 量測方法，不等同公開 AI Search 或 GEO 效果證據。
tags:
  - ai-visibility
  - generative-search
  - entity-discoverability
  - citation
  - measurement
  - denominator
  - language
  - entity-resolution
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-29T23:42:05Z
sources:
  - id: arxiv-who-gets-named
    resource: /raw/arxiv-who-gets-named-2026-08-30.md
    title: "arXiv《Who Gets Named: Citation Type Predicts Individual Naming by Grounded Language Models, and a Roster Instrument Captures 0.5% of It》"
    author: human:dmitrij-zatuchin
    last_modified: 2026-08-01
---

# 方法定位

個人層級的 AI visibility 不只是「某個名字是否在回答中出現」。它同時涉及回答是否要求個人、姓名 span 是否真的指向個人、該人是否來自預先建立的 roster、引用來源屬於哪一類，以及語言、地區、模型與時間窗如何改變觀測。以下方法由一份 grounded language model 原始研究整理成 xdxd 的 draft protocol；來源不是 xdxd 重現，也沒有證明任何網頁表示或 GEO 介入會改善公開搜尋結果。[^arxiv-who-gets-named]

## 1. 來源研究的觀測設計

來源在 2026-07-24 的單一兩小時窗口，對四個歐洲市場、三個 person-centric buying categories、五種查詢語言與四個 grounded models 執行 120 個 buyer-intent prompts、每 prompt 五次迭代，共 2,400 次 API calls。研究問題是模型是否在「買方要選哪一個人」的問題中點名個人專業人士，而不是只測量公司品牌是否出現。這些欄位應完整保存：`engine`、`model_or_api`、`interface`、`market`、`language`、`category`、`prompt_id`、`prompt_text`、`replication`、`run_at`、`response_id` 與原始 response hash。[^arxiv-who-gets-named]

來源同時採兩種 instrument：

1. **Roster-free text detection**：只看回答文字，以候選姓名形狀、公司／地理／一般詞 blocklist、公司鄰接、角色或 given-name 正向證據，以及同名美國城市排除等規則，辨識模型實際輸出的個人 spans。
2. **Roster overlap**：把回答中的姓名與 939 人公開 LinkedIn roster 比對。這不是同一個 estimand；它只量到「模型輸出的個人」與「預先 roster 覆蓋的人」的交集。[^arxiv-who-gets-named]

來源的 detector precision 為 96.9%，對 roster ground truth 的 recall 為 61.7%；因此 roster-free naming rate 仍受漏檢影響，來源將其視為 lower bound。xdxd 若採用類似 detector，必須保存規則版本、正向證據、blocklist、同名地理處理與獨立 audit sample，不能只報一個未說明 parser 的姓名計數。[^arxiv-who-gets-named]

## 2. 來源研究的觀察結果（source-bound）

在來源指定的 protocol 中，回答點名個人的比例為 25.8%；real estate、car dealerships 與 insurance 分別為 35.4%、32.9% 與 9.1%，模型結果從 Grok 38.0% 到 Gemini 9.3%。這些是作者的 observational results，受到特定模型版本、grounding mechanism、prompt panel、地區、語言與單日窗口限制，不能當作公開 AI Search 的 prevalence 或 ranking 常數。[^arxiv-who-gets-named]

來源也報告 citation composition 與 naming outcome 的關聯：點名個人的回答較常引用個人自有網站（+2.6 個百分點）與 category portals（+4.3 個百分點），firm-owned page 比率則為 44.1% 對 45.5%。這只說明來源研究中的 citation type 分層，不能把 citation volume、citation type 或被引用直接解讀成 claim support、citation entailment、公開 ranking 或 click。[^arxiv-who-gets-named]

九組 exact English／local-language translation pairs 中，英文點名率為 36.7%，local-language 為 15.6%；OR 為 3.14、clustered p = 0.074。這是方向性但未關閉的比較；樣本小、整體 prompt set 並非全數翻譯配對，不能宣稱語言造成個人 visibility 差異。[^arxiv-who-gets-named]

來源的 roster instrument 匹配 27,293 個 name-shaped mentions 中的 128 個（0.47%），而 939 位 roster 成員中只有 26 位曾被點名。來源另報 roster-free detector 解析的 1,876 個個人 spans 中有 128 個被 roster 捕捉（6.8%）。因此 0.47%／6.8% 應記為 instrument overlap，不是個人 AI visibility 的 population rate。[^arxiv-who-gets-named]

## 3. xdxd 的可移植 protocol（推論）

以下是依來源整理的 xdxd 研究推論，不是來源已驗證的標準：

1. **先固定 estimand**：至少分開 `person_naming_rate_text_detected`、`roster_match_rate`、`named_person_count`、`citation_type_by_naming` 與 `language_contrast`；不可用 roster match 代替所有個人點名。
2. **建立 prompt strata**：把 person-centric buyer intent、generic discovery、branded comparison 與 known-URL query 分開；保存 category、market／region、language、model、interface、grounding state 與 observation window。
3. **採重複抽樣**：同一 prompt 至少保存 replication 與 response-level identity；跨 prompt 的 inference 要以 prompt cluster 為單位，避免把 nominal response count 當成有效樣本量。
4. **做姓名／實體解析 audit**：將 `candidate_name_span`、`positive_evidence`、`company_like`、`geographic_homonym`、`resolved_entity_type`、`detector_version` 與 `audit_verdict` 逐筆保存，並分開 precision、recall、unresolved 與 lower-bound status。
5. **將引用來源分類獨立建模**：至少分 `person_owned_site`、`firm_owned_page`、`category_portal`、`social`、`review` 與 `other`；citation volume、source type、claim support 與 click 是不同欄位，不得壓成單一 visibility score。
6. **把 roster 當作抽樣框而非真實全集**：保存 roster construction rule、coverage scope、capture date、去重規則、個資／權利依據與 `roster_overlap_denominator_status`；若沒有完整 population frame，結果標記為 overlap-only。
7. **語言比較使用 exact pair 優先**：保存 translation pair ID、語言、城市／category、prompt equivalence verdict、replication 與 clustered interval；非配對語料只能作 descriptive comparison。
8. **保留公開搜尋漏斗**：`candidate_exposed`、`crawled`、`indexed`、`retrieved`、`used_in_answer`、`citation_entails`、`cited`、`shown`、`clicked` 分開記錄。來源研究的 grounded API response 不能替代公開 crawler、index 或 click observation。

## 4. 最小資料表

| 層級 | 建議欄位 |
|---|---|
| 執行 strata | `engine`、`model_or_api`、`interface`、`grounding_state`、`market`、`language`、`category`、`observation_window` |
| Prompt／run | `prompt_id`、`prompt_text`、`translation_pair_id`、`replication`、`run_at`、`run_id`、`response_hash` |
| 姓名偵測 | `candidate_name_span`、`positive_evidence`、`company_like`、`geographic_homonym`、`resolved_entity_type`、`detector_version`、`audit_verdict` |
| Roster instrument | `roster_id`、`roster_capture_at`、`roster_scope`、`roster_match`、`roster_overlap_denominator_status`、`rights_basis` |
| Citation composition | `citation_url`、`normalized_domain`、`source_type`、`source_to_person_relation`、`citation_position`、`claim_support_status` |
| 結果與不確定性 | `naming_rate`、`roster_match_rate`、`precision`、`recall`、`cluster_method`、`effective_n`、`confidence_interval`、`lower_bound_reason` |
| 公開漏斗 | `candidate_exposed`、`crawled`、`indexed`、`retrieved`、`used_in_answer`、`citation_entails`、`cited`、`shown`、`clicked` |

## 5. 證據邊界與待驗證事項

- 來源是 arXiv v2 預印本，作者隸屬 Rankfor.AI，研究由單一作者執行並自付 API／tooling 成本；不能視為獨立第三方 validation。來源的 result、detector 與 legal／ethical description 仍維持 `draft`，未加入人工 `verified`。[^arxiv-who-gets-named]
- 全部 2,400 calls 集中在一個兩小時窗口；模型、搜尋工具、索引內容、語言與地區會變動。來源沒有主張 temporal stability，也不是 2026-08 公開 AI Search 的現行平台常數。
- 61.7% recall 使 naming rates 成為 lower bounds；13.3% detections 是形似姓名的公司名稱，且同名美國城市會造成地理誤判。任何跨市場或跨語言比較都要重新核對 detector sensitivity。
- 939 人 roster 來自公開 LinkedIn search，不是完整市場 population；其中的個資處理與 GDPR 結論是作者自述。本 KB 未保存 roster 或 Zenodo dataset，只保存來源明示的資料可得性連結與研究結果摘要。
- 來源結果不包含 xdxd 的 HTML／Markdown／JSON-LD representation intervention、公開 crawler／index trace、claim-level citation entailment、referral、click 或 conversion，因此不能支持「結構化內容／中間頁使個人或品牌更容易被公開 AI 搜尋到」的因果命題。
- 下一步可在自有或明確授權 corpus 做 `roster-free detector` 對 `roster match`、raw prose 對 structured representation、English 對 exact local translation、以及 `citation type` 對 `citation volume` 的配對實驗；每一組都要保留 response／source snapshot、parser version、denominator 與公開漏斗層級。

本方法與[AI visibility measurement 的 rank stability、structural sufficiency 與介面感知排名](/methods/ai-visibility-measurement-convergence.md)、[生成式引擎品牌 visibility 與來源組成觀測方法](/methods/generative-engine-brand-visibility-measurement.md)、[跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md)及[證據生命週期](/methods/evidence-lifecycle.md)銜接。新增 raw snapshot 時不得覆寫本次保存的原始檔案。

[^arxiv-who-gets-named]: Dmitrij Żatuchin, “Who Gets Named: Citation Type Predicts Individual Naming by Grounded Language Models, and a Roster Instrument Captures 0.5% of It,” arXiv:2607.23893v2, submitted 2026-07-26, last revised 2026-08-01. Source URL: <https://arxiv.org/abs/2607.23893>. Immutable raw capture: [wrapper](/raw/arxiv-who-gets-named-2026-08-30.md), [abstract HTML](/raw/arxiv-who-gets-named-2026-08-30/abstract.html), [paper HTML](/raw/arxiv-who-gets-named-2026-08-30/paper.html), [paper PDF](/raw/arxiv-who-gets-named-2026-08-30/paper.pdf), and [Atom API](/raw/arxiv-who-gets-named-2026-08-30/arxiv-api.xml).
