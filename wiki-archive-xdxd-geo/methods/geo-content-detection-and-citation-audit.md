---
type: Research Method
title: GEO 內容偵測與 citation URL audit
description: 從 GEO-Flag、publisher-attribute 與 FORGE 原始研究整理頁面級 GEO intervention 偵測、citation URL 可驗證性、rank-aware web content pollution 與潛在 attack-surface 審計的 draft 方法。
tags:
  - geo
  - generative-search
  - detection
  - retrieval
  - citation
  - provenance
  - evaluation
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T18:34:10Z
sources:
  - id: arxiv-geo-flag
    resource: /raw/arxiv-geo-flag-2026-08-26.md
    title: "arXiv《GEO-Flag: Detecting and Measuring GEO-Optimized Web Content》原始研究（2026-08-26 raw capture）"
    last_modified: 2026-08-20
  - id: arxiv-gse-attack-surface
    resource: /raw/arxiv-generative-search-attack-surface-2026-08-26.md
    title: "arXiv《Assessing Attack Surfaces in Generative Search Engines through Publisher Attributes》原始研究（2026-08-26 raw capture）"
    last_modified: 2026-08-16
  - id: arxiv-forge-web-pollution
    resource: /raw/arxiv-web-content-pollution-2026-08-26.md
    title: "arXiv《One Polluted Page Is Enough: Evaluating Web Content Pollution in LLM Recommenders》原始研究（2026-08-26 raw capture）"
    author: human:minghao-luo-liang-chen
    last_modified: 2026-08-24
---

# 方法定位

本頁從兩份 arXiv 原始研究整理一套可供 xdxd GEO 採用的 draft 方法：先辨識內容是否接受過以 generative search selection／citation 為目標的 GEO intervention，再把被標記頁面的 citation URL 做來源層級、可取得性與 publisher-attribute／潛在 attack-surface 審計。原始來源仍未經 xdxd 獨立重現或人工驗證；來源報告的數字不能直接升格為公開 AI Search 的通用 prevalence、排名或因果效果。[^arxiv-geo-flag]

## 1. 頁面級 GEO detection 任務

- 來源把 GEO detection 定義成 binary task：在只看到結果內容、沒有原始版本、建構 prompt 或 provenance metadata 的 instance-only setting 下，判斷頁面是否接受過 GEO-specific intervention。目標不是判斷作者是人或 AI，也不是單純判斷文風。[^arxiv-geo-flag]
- `GEOFlagBench` 包含 3,200 個 web content instances、400 個 query、Health／Finance／Technology／Travel 四個 domain，以及八個 GEO optimizer families；非 GEO controls 分成 human-written、AI-polished 與 AI-generated。這種控制設計可把「一般 AI 改寫」與「以 GEO 為目標的介入」分開。[^arxiv-geo-flag]
- 來源報告的 query-level grouped split、method-level evaluation 與 authorship-conditioned evaluation 是重要控制：aggregate F1 很高時，仍可能依賴 authorship 或一般 LLM-writing shortcut。ModernBERT 加入 Intervention-Paired Training（IPT）後，論文報告 F1 由 0.862 升至 0.944，worst-group accuracy 由 0.725 升至 0.883；這些是該預印本的 benchmark 結果，不是 xdxd 已重現的 baseline。[^arxiv-geo-flag]

## 2. Citation URL audit

來源在 page-level detector 後加入 GEO-gated Agent：抽取被偵測頁面的 citation URL，再分開標記 URL publisher source tier（C1／C2／C3）與 accessibility，最後依 deterministic rules 產生 citation URL verifiability。來源在獨立的 562-instance benchmark 上報告，最強 Agent 的 source-tier accuracy 為 84.75%，citation URL verifiability accuracy 為 83.00%。[^arxiv-geo-flag]

這個 audit 不等於 claim-level citation entailment，也不等於「高 source tier 就一定支持該主張」：source tier 是 publisher-level operationalization，accessibility 是在擷取時能否解析目標內容；兩者應和 claim、evidence span、citation precision／completeness 分開保存。這一分層可接到 [生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md) 的 retrieval、evidence utilization 與 citation entailment 分離原則。

## 3. Rank-aware web content pollution intervention

FORGE 提供一個與 GEO detection 不同的研究軸：不是從成品頁面判斷是否被 GEO 介入，而是在固定的搜尋結果 bundle 上對來源內容做可重現的局部改寫，再量測 LLM recommendation 是否被假品牌帶偏。這是來源報告的 benchmark 設計，不是 xdxd 已重現的攻擊或公開搜尋效果。[^arxiv-forge-web-pollution]

- **凍結 evidence bundle**：為每個 query 保存原始搜尋結果與 rank、來源 URL、頁面 body／headers、過濾規則與擷取時間；介入版只複製 bundle，不覆寫 clean snapshot。來源以固定 bundle 比較不同 attack condition 與 model，避免 live web 變動混入結果。
- **介入欄位**：至少保存 `query_id`、`scenario`、`category`、`language`、`source_rank`、`n_polluted`、`attack_style`、`model`、`model_version`、`prompt`、`decoding`、clean／polluted content hash 與 retrieval timestamp。來源的主要設計涵蓋 entity replacement、passage-level 與 full-document synthesis，並以 top-3 replacement、單頁 rank position 與污染頁數做比較。[^arxiv-forge-web-pollution]
- **rank 與 dose 分離**：不要只記錄「有無污染」。至少分開污染頁所在 rank（特別是 rank 1 與後續 top-10 位置）、污染頁數量、是否集中於 top-3，以及 attack style；來源報告單一 rank-1 頁面與多頁污染的結果方向不同，這只能作為該 benchmark 的 rank-aware 假說，不能外推為所有引擎的 attention rule。[^arxiv-forge-web-pollution]
- **outcome 分層**：保存 recommendation membership、rank／position、是否被明確 endorsement、citation／source mention、social-proof marker、clean recommendation utility 與 false-positive control。`cited`、`shown`、`recommended` 與 `clicked` 不可合併成同一個 GEO 成效指標；這裡的 `fooled rate` 是來源定義的 benchmark outcome，不是 citation rate 或搜尋排名。
- **威脅模型邊界**：來源假設對手能讓看似一般 UGC 的頁面進入目標 query 的 retrieved top-k，但不知道實際模型、訓練資料、index 或 prompt。實驗紀錄必須把這個 closed-world assumption 與真實 crawler／index／publisher control 分開，不能把 local rewrite 稱為 live poisoning success。[^arxiv-forge-web-pollution]

這個設計可與前面的 GEO detector、citation URL audit 及 publisher-attribute audit 串接：先對頁面做 `geo_intervention_flag`，再以 frozen clean／polluted pair 記錄 `retrieval_rank`、`pollution_dose`、`recommendation_outcome` 與 evidence-level defense；但不得把 detector label、source tier 或 fooled rate 單獨當成來源不可靠或 GEO 必然有效的證明。

## 4. Publisher-attribute attack surface audit

另一份原始研究把 citation audit 從「來源內容是否支持回答」延伸到「來源的 publisher attributes 讓內容多難被注入」。作者將 `content-injection barrier` 作為潛在 attack-surface 變項，依 primary／opponent source 與 publisher category 將 citation 分為 primary、opponent、low、medium、high；這是針對 publisher authority／editorial process 的操作化，不是對單一頁面真實安全性的證明。[^arxiv-gse-attack-surface]

- 研究同時保存三個分析軸：barrier distribution、以 character count 重算的 domination score，以及以 sentence-level multilingual SBERT maximum similarity 聚合的 citation grounding score。這可把「被引用的來源類型」「引用內容在回答中的佔比」與「回答是否反映來源」分開記錄。[^arxiv-gse-attack-surface]
- 作者在美國與日本政治領域，以 GPT-5、Claude Sonnet 4、Gemini Flash 2.5 search mode、33 個問題模板、13 個政黨與 3 個 user profiles 產生 3,861 份回答；另以 Brave Search API top-10 結果近似比較 retrieval stage，因受測 GSE 的實際搜尋後端未公開。[^arxiv-gse-attack-surface]
- 來源報告的方向性結果是：barrier distribution 依 GSE model 而異；web search／query-generation stage 會塑造 citation composition；在該政治任務中，ruling-party questions 的 primary-source ratio 較低、潛在 attack surface 較寬；user profile 對 barrier pattern、grounding 與 domination 的影響整體很小。這些仍是單一預印本在特定國家、領域、問題與模型條件下的作者報告。[^arxiv-gse-attack-surface]

這個軸線適合在 citation URL audit 旁新增 `publisher_category`、`primary_source`、`content_injection_barrier`、`domination_score`、`grounding_score`、`retrieval_stage_presence`、`user_profile`、`target_entity` 與 `question_domain` 欄位；但不得把較低 barrier、較高 domination 或較高 grounding 直接解讀為實際 poisoning 成功、可靠性下降或內容介入必然有效。

## 5. 公開結果估計的資料邊界

來源把完整 pipeline 部署到 1,000 個 real-user ORCAS queries 的 released Google Search 與 Gemini-grounded retrieval results：資料含 13,985 個 unique URLs，成功取得 10,095 個 usable pages；作者估計整體 GEO prevalence 為 8.90%，在頁面 `dateModified` 顯示為 2026 的子集達 16.36%。被 detector 標記的 GEO pages 所產生的 6,663 個 citation occurrences 中，作者報告 69.34% 被標為 LOW verifiability；Gemini 與 Google Search 的 LOW share 也有差異。[^arxiv-geo-flag]

這些數字只能作為作者 pipeline 的 empirical estimates：它們受 released result coverage、頁面不可取得、日期 metadata、detector error、URL normalization、citation parser 與 source-tier rubric 影響，不能視為整體網路的 prevalence 或兩個搜尋產品的因果比較。與 [Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md) 一樣，`retrieved`、`used`、`cited` 與 `clicked` 必須是不同 outcome；本研究的 page flag 也不能取代 crawler／index／retrieval observation。

## 6. xdxd 可移植的實驗設計

1. 建立 query-level split，固定 query、domain、時間窗與頁面擷取 protocol；每個 intervention 保留原始頁面、衍生內容、prompt／strategy、model、版本與 content hash。
2. 至少並列 human／原始非 GEO、AI-polished non-GEO、AI-generated non-GEO 與明確 GEO intervention；不要把「AI 生成」或「像答案」直接當作 GEO label。
3. 保存 detector score、threshold、method family、authorship condition、worst-group metrics 與 false-positive／false-negative 分布；aggregate F1 不足以說明跨 domain 或跨作者穩健性。
4. 對被標記頁面保存抽出的 citation URL、normalized URL、source tier、accessibility、retrieval timestamp、HTTP status 與 claim-level entailment；若加入 publisher-attribute audit，再保存 `publisher_category`、`primary_source`、`content_injection_barrier`、`domination_score`、`grounding_score`、`retrieval_stage_presence`、`user_profile` 與 `target_entity`，並將 URL audit 與公開搜尋的 retrieval／citation／click outcome 分開。
5. 若做公開搜尋觀測，沿用 [GEO 證據生命週期](/methods/evidence-lifecycle.md) 保存不可變 page snapshot、HTTP metadata、crawler／index 事件與後續 citation response；任何 prevalence 或 uplift 都要標示資料覆蓋、標註與 detector 限制。

## 7. 證據邊界與待驗證事項

- 本頁目前有三個 arXiv 原始研究來源，且都未經 xdxd 獨立重現；沒有新增 `verified`，不能描述為已由 xdxd 或人工核准。
- GEOFlagBench 的優化器家族、IPT、source-tier rubric、citation URL verifiability 與 released-result prevalence 尚待取得可重現 code／data／protocol 後重現；publisher-attribute 研究的 barrier classifier、Brave Search 近似 retrieval、GSE model、政治領域與 user-profile 結果，以及 FORGE 的 frozen-bundle pollution、模型／prompt／產品類別效果也尚未由 xdxd 重現。三份來源報告的數字不可直接外推到 xdxd 資源頁或產品流量。
- 這個方法適合增加「內容是否疑似被 GEO intervention」、「citation URL 是否可被核對」與「rank-aware web content pollution 是否改變 recommendation」三個研究變項，不支持「偵測到 GEO 就代表頁面不可靠」或「偵測／移除 GEO 必然改善 AI Search」的產品命題。
- publisher-attribute 研究只提供潛在 attack-surface 的量測框架，不支持「低 barrier citation 就等於惡意來源」或「提高 primary-source ratio 必然改善所有任務」的產品命題；不同任務可能需要 primary 與 secondary source 的平衡。[^arxiv-gse-attack-surface]
- FORGE 的 fooled rate 與防禦比較只反映其凍結搜尋結果、局部改寫、模型、prompt、語言與產品情境；它不等於 live index poisoning、公開網路 prevalence、citation uplift 或跨引擎效果。[^arxiv-forge-web-pollution]
- 權利與再利用仍應回到 [GEO-Flag raw capture](/raw/arxiv-geo-flag-2026-08-26.md)、[publisher-attribute raw capture](/raw/arxiv-generative-search-attack-surface-2026-08-26.md) 與 [FORGE raw capture](/raw/arxiv-web-content-pollution-2026-08-26.md) 的 abstract、HTML／PDF、HTTP metadata 與授權說明核對。

[^arxiv-geo-flag]: Junjie Chu, Ye Leng, Mingjie Li, Yun Shen, Xinyue Shen, and Yang Zhang, “GEO-Flag: Detecting and Measuring GEO-Optimized Web Content,” arXiv:2608.16824v2, last revised 2026-08-20. Source URL: <https://arxiv.org/abs/2608.16824>. Immutable raw capture: [metadata](/raw/arxiv-geo-flag-2026-08-26.md), [abstract HTML](/raw/arxiv-geo-flag-2026-08-26/abstract.html), and [paper PDF](/raw/arxiv-geo-flag-2026-08-26/paper.pdf).

[^arxiv-gse-attack-surface]: Riku Mochizuki, Shusuke Komatsu, Souta Noguchi, and Kazuto Ataka, “Assessing Attack Surfaces in Generative Search Engines through Publisher Attributes: A Case Study in Political Domains,” arXiv:2608.15814v1, submitted 2026-08-16. Source URL: <https://arxiv.org/abs/2608.15814>. Immutable raw capture: [metadata](/raw/arxiv-generative-search-attack-surface-2026-08-26.md), [abstract HTML](/raw/arxiv-generative-search-attack-surface-2026-08-26/abstract.html), [full HTML](/raw/arxiv-generative-search-attack-surface-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-generative-search-attack-surface-2026-08-26/paper.pdf).

[^arxiv-forge-web-pollution]: Minghao Luo and Liang Chen, “One Polluted Page Is Enough: Evaluating Web Content Pollution in LLM Recommenders,” arXiv:2606.13610v2, last revised 2026-08-24, EMNLP 2026 Findings. Source URL: <https://arxiv.org/abs/2606.13610>. Immutable raw capture: [metadata](/raw/arxiv-web-content-pollution-2026-08-26.md), [abstract HTML](/raw/arxiv-web-content-pollution-2026-08-26/abstract.html), [full HTML](/raw/arxiv-web-content-pollution-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-web-content-pollution-2026-08-26/paper.pdf).
