---
type: Research Method
title: "AI visibility measurement 的 rank stability、structural sufficiency 與介面感知排名"
description: 以 sequential convergence、rank stability、structural sufficiency、pooled LLM evaluation、judge uncertainty、跨 surface source divergence、RDQ、on-domain control 與 downstream decision-stability 判斷 AI visibility／AEO citation ranking 是否足以支援比較性推論的 draft 方法。
tags:
  - ai-visibility
  - generative-search
  - citation
  - measurement
  - exposure
  - evaluation
  - convergence
  - reproducibility
  - ranking
  - decision-stability
  - presentation-dependence
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-03T15:25:35.501502000Z
sources:
  - id: arxiv-ai-visibility-rank-stability
    resource: /raw/arxiv-ai-visibility-rank-stability-2026-08-26.md
    title: arXiv《From Stochastic to Stable》原始研究（2026-08-26 raw capture）
    author: human:ronald-sielinski
    last_modified: 2026-07-11
  - id: arxiv-rank-deviation-quality
    resource: /raw/arxiv-rank-deviation-quality-2026-08-27.md
    title: arXiv《Rank-Deviation Quality》原始研究（2026-08-27 raw capture）
    author: human:xiaokun-zhou-et-al
    last_modified: 2026-08-26
  - id: arxiv-order-consistent-llm-scorers
    resource: /raw/arxiv-order-consistent-llm-scorers-2026-08-28.md
    title: arXiv《Equal Ranking Quality, Different Decisions》原始研究（2026-08-28 raw capture）
    author: human:markus-frohmann-et-al
    last_modified: 2026-08-27
  - id: arxiv-generative-ai-disrupts-search
    resource: /raw/arxiv-generative-ai-disrupts-search-2026-08-27.md
    title: arXiv《How Generative AI Disrupts Search》原始研究（2026-08-27 raw capture）
    author: human:riley-grossman-et-al
    last_modified: 2026-04-30
  - id: arxiv-ai-visibility-uncertainty
    resource: /raw/arxiv-ai-visibility-uncertainty-2026-08-27.md
    title: arXiv《Quantifying Uncertainty in AI Visibility》原始研究（2026-08-27 raw capture）
    author: human:ronald-sielinski
    last_modified: 2026-08-26
  - id: arxiv-retrievable-unencountered
    resource: /raw/arxiv-retrievable-unencountered-2026-08-30.md
    title: arXiv《Retrievable but Unencountered》原始研究（2026-08-30 raw capture）
    author: human:jette-veenstra-et-al
    last_modified: 2026-08-26
  - id: google-eea-search-dataset
    resource: /raw/google-european-search-dataset-licensing-2026-09-01.md
    title: Google European Search Dataset Licensing Program 官方頁面（2026-09-01 raw capture）
    author: team:google-search-central
    last_modified: 2026-08-31
  - id: arxiv-aeo-platform-growth
    resource: /raw/arxiv-aeo-platform-growth-2026-09-02.md
    title: "arXiv《Disentangling Answer Engine Optimization from Platform Growth: A Log-Based Natural Experiment on ChatGPT Referral Traffic》原始研究（2026-09-02 raw capture）"
    author: human:keisuke-watanabe-kazuki-nakayashiki
    last_modified: 2026-08-24
  - id: arxiv-pooled-llm-evaluation
    resource: /raw/arxiv-pooled-llm-evaluation-2026-09-03.md
    title: "arXiv《Incremental Pooled LLM Evaluation for Cost-Effective Retrieval Model Selection》原始研究（2026-09-03 raw capture）"
    author: human:max-nelson-hanoz-bhathena-aviral-joshi-saket-sharma
    last_modified: 2026-09-02
---

# 方法定位

本頁從六份來源整理可供 xdxd GEO 採用的 draft 量測方法：先以 sequential convergence 判斷 citation distribution 是否已達到可比較的穩定與解析度，再用跨 SERP／AIO／Gemini surface 的 source divergence、重複執行與 query-variation controls 描述觀測噪聲，加入 exposure denominator discipline、AEO treated／untreated on-domain control、ITS／placebo 與 Google EEA Search Dataset 的資料取得邊界，避免把不同的 citation list quality、source membership、呈現位置、平台共同成長與上游 exposure 壓成單一未定義 visibility score。六份來源都未經 xdxd 獨立重現或人工驗證；來源數字與 metric behavior 不能直接升格為公開 AI Search 的通用量尺或效果證據。[^arxiv-ai-visibility-uncertainty] [^arxiv-rank-deviation-quality] [^arxiv-generative-ai-disrupts-search] [^arxiv-retrievable-unencountered] [^google-eea-search-dataset] [^arxiv-aeo-platform-growth]

## 0. Visibility metric 的 sampling uncertainty（新增來源）

Sielinski 的原始研究把 AI visibility 的 citation share／prevalence 定義成有限 response sample 對底層 response distribution 的估計，而非一次 query batch 的固定真值。作者在三個 consumer-product topic 上，以 Perplexity Search、OpenAI SearchGPT 與 Google Gemini 做九日 daily repeated sampling；running gear 另有約十分鐘間隔的 high-frequency sampling。這支持把 `run_at`、`replication`、`sampling_regime`、`collection_window` 與 `response_id` 視為 citation measurement 的必要欄位，但不代表這些平台或 query strata 的結果可直接外推至其他時間、地區、介面或主題。[^arxiv-ai-visibility-uncertainty]

來源對 high-frequency regime 有內部不一致：Section 4.3 說 running gear 的十分鐘 sample 涵蓋三個平台，Section 8 的 limitation 又說 Gemini 因 API rate limit 被排除。這個 source-internal inconsistency 保留為 unresolved；xdxd 不應在未回到 PDF、原始資料或作者澄清前，將該 regime 的平台 coverage 當成確定事實。[^arxiv-ai-visibility-uncertainty]

作者使用 response-level bootstrap 重新抽樣並重算 citation share／prevalence，將 numerator／denominator 的依賴一併帶入 confidence interval；其 sample 中不少 domain 的 apparent point-estimate differences 落在 sampling noise floor。作者的 sample-size crossing points 是 protocol-bound guidance：citation share 約為 Gemini `40–50`、Perplexity `100`、SearchGPT `≥150` queries；citation prevalence 約為 SearchGPT `60–80`、Gemini／Perplexity `140–150`。這些不是 xdxd 的預設樣本數或跨平台標準，仍須以自己的 engine、topic、metric、query panel 與 fixed sample-size pilot 校準。[^arxiv-ai-visibility-uncertainty]

作者進一步以 weighted rank stability 檢查完整 frequently-cited domain set，並指出短窗的相鄰 sample 穩定不保證九日長窗沒有 cumulative drift。對 xdxd 而言，visibility experiment 至少應同時保存：

- response-level bootstrap CI、metric definition、resampling unit 與 `bootstrap_seed`；
- `ci_width`、effective sample／citation volume、sample-size curve 與 fixed-sample stop rule；
- consecutive-pair 與 first-vs-last span 的 rank correlation、CI width、sufficiency status；
- page-content hash、scrape coverage、blocking／format missingness 與 changed-hash 的 rendering-variation caveat。

這是從來源研究轉成 xdxd 的方法推論，不是 AI Search 平台 schema。任何 pre／post GEO 或 representation intervention 的效果，必須先顯示 uncertainty、長窗 replication 與 content-change control，再分開判斷 crawl、index、retrieval、citation、shown、click 與 conversion；單次 citation share 增加不能單獨支持介入因果結論。[^arxiv-ai-visibility-uncertainty]

## 0A. Google EEA Search Dataset：資料取得與 outcome 邊界

Google Search Central 的第一方頁面描述一個依 DMA Measures 提供的 European Search Dataset licensing program。頁面把該 Search Dataset 描述為包含 EEA Google Search 的 ranking、query、click 與 view data，並列出 FRAND licensing、申請資格、資料樣本與第三方 assurance 要求。這是 Google 對其計畫的產品／政策描述，不是 xdxd 已取得的資料或獨立核對的 dataset schema。[^google-eea-search-dataset]

來源列出的 in-principle eligibility 不是一般研究者資格：申請者須是面向 EEA 使用者的 online search engine provider，符合 state-actor／EU sanctions 限制，並具備指定的 EU operating history 或投資條件及至少 50,000 monthly average EU users。Sample A／B／C 分別描述為免費 1,000 rows、付費至多 10 million queries 的 synthetic dataset、以及付費 5% Search Dataset；頁面說 samples 自 2026-11-16 起可用。這些條件與日期是來源 claim，不能被解讀為 xdxd 已符合資格、已取得資料或已看到 sample payload。[^google-eea-search-dataset]

對 xdxd 的方法推論是把 `licensed_google_search_dataset` 視為一個獨立的 data-access arm，而不是把它混入 public SERP／AI-answer observation：

1. 若未取得 license、sample 或 delivery receipt，`dataset_license_status`、`schema_status`、`field_coverage`、`delivery_cadence` 與 `data_quality_status` 必須是 `unknown`，不能以官方頁面描述填補。
2. 若未另有證據，已描述的 event layers 僅是 `ranking`、`query`、`click`、`view`；`ai_overview`、`ai_mode`、generated answer、citation、claim support、source presentation、referral 或 GEO outcome 不得由「Google Search」字樣推導。
3. 取得資料後，至少保存 `dataset_snapshot_id`、license／agreement version、EEA population boundary、query／ranking／click／view schema、anonymization／access-control status、sample type、delivery timestamp 與資料 hash；把它們與 public-panel 或 live-SERP 的 `engine_surface`、region、language、query panel、observation window 分開。
4. 傳統 Search 的 ranking／click／view 資料可以作為 exposure／downstream calibration 候選，但不能代替 AI Search 的 `candidate_exposed`→`retrieved`→`used_in_answer`→`citation_entails`→`cited`→`shown`→`clicked` funnel；若要研究 AI surface，必須另存 AI-answer response、citation record 與 claim-level support。

這筆來源因此新增的是 measurement-access 與 denominator governance 的研究變項，而不是公開 AI Search 或 GEO 效果證據。Google 頁面未授予 xdxd 資格，未提供可供本輪重現的 sample 或 license；下一步僅在明確授權且完成安全／稽核前置條件的情況下評估申請，不把申請意向寫成 access。[^google-eea-search-dataset]

## 0B. AEO referral 的 platform-tailwind control 與 intervention bundle 邊界

Watanabe 與 Nakayashiki 的原始研究把 AEO 的下游結果定義為 ChatGPT referral traffic，並以單一 glasp.co 網域內的 `/youtube/` treated corpus 與其他未介入 paths 建立 contemporaneous control。兩組共享 domain authority、analytics／bot-filtering regime 與 answer-engine platform tailwind；因此研究不是把 treated pages 的 raw before／after growth 直接當成 AEO effect，而是以同網域 control 吸收共同成長。這是來源在單一網域與 ChatGPT-dominant traffic 下的 field-study design，不是跨平台的通用 causal identification。[^arxiv-aeo-platform-growth]

來源的 intervention 是不可分解的 bundle：duplicate URL canonicalization、依 AI-bot 404 request mining 產生新頁面、question-form title／兩至三句 lead-summary rewrite，以及鎖定有 meaningful Google clicks 頁面的 SEO Guard。由於新增頁面與 rewrite 同時發生，任何估計都混合 per-page improvement、corpus expansion 與四種 tactic，不能把結果歸因給單一標題、摘要、canonical 或 bot-demand tactic。[^arxiv-aeo-platform-growth]

其 measurement contract 是 GA4 `sessionSource` 含 `chatgpt` 的 referral sessions、engaged sessions，以及 Google Search Console 的 organic clicks／impressions；分析把 weekly `log(treated/control)` 放進 47-week segmented regression（26 pre、21 post），以 HAC／Newey–West 與 moving-block bootstrap，並加入 pre-period placebo-in-time permutation。來源報告 monthly total ChatGPT referrals `5.7×`、untreated control `3.5×`，以及 ITS level break `1.82×`（95% CI `1.31–2.54`、HAC `p=0.001`）；engaged-session robustness 為 `2.27×`，但 placebo `p=0.16`，所以作者將結果定義為 **suggestive, not conclusive**。這些數字是來源的 first-party logs／private analytics protocol-bound observation，不能當作 xdxd 結果。[^arxiv-aeo-platform-growth]

來源另報 treated-page organic clicks 約下降 `25%`、site-wide 約下降 `20%`，impressions 接近 baseline，並以此描述與 SEO Guard 一致、沒有額外 deindexation；它不支持 AEO 必然提升 organic search，也不構成長期 SEO safety guarantee。來源的 pre-trend、內容異質、可能 spillover、mid-March bot-filtering change、近似 intervention date、single domain／single dominant engine 與 non-random bundle，均需保留在外部效度與因果解讀邊界。[^arxiv-aeo-platform-growth]

對 xdxd 的可移植研究推論是：任何 AEO／representation intervention 都應同時報告 raw platform growth、treated outcome、untreated same-domain control、platform-adjusted contrast 與 uncertainty；先固定 assignment、content／page hash、page creation、treatment bundle、treatment window、engine／surface／model／locale，再分開保存 `platform_referral`、`engaged_referral`、`organic_clicks`、`impressions`、`indexation_status`、`pretrend`、`estimator`、`confidence_interval`、`placebo`、`bot_filter_version`、`citation_present`、`citation_entails`、`shown`、`clicked` 與 `outbound_referral`。`citation` 或 source presentation 不能替代 referral，referral 也不能回推 crawler、index、retrieval 或 citation causality；此段是 xdxd 的 draft protocol inference，不是來源的公開 GEO 承諾。[^arxiv-aeo-platform-growth]

## Google SERP、AIO 與 Gemini 的來源差異和 repeatability evidence

Grossman 等人在單一 Google ecosystem 的作者研究中，以 11,500-query benchmark、time-sensitive query sets、SerpAPI 與 Gemini 2.5 Flash API 比較 traditional SERP、AI Overview（AIO）與 Google Search-grounded Gemini 的 source lists。主要資料於 2025-12-07–2025-12-08 收集；作者報告 ORCAS representative queries 的 AIO prevalence 為 `51.5%`，三種 surface 的總體 URL-level Jaccard 為 AIO–SERP `0.18`、AIO–Gemini `0.11`、Gemini–SERP `0.16`。這提供「跨 surface source exposure 不是同一個 ranking list」的作者 evidence，但不是目前 Google 行為的保證，也不是 xdxd 重現。[^arxiv-generative-ai-disrupts-search]

這份研究亦提供可納入 protocol 的 controls：同一 query repeated run、device／location variation、cosmetic query edit、source-list Jaccard／RBO、query collection window、API／surface identity、domain attribute 與 robots policy snapshot。作者在其 sample 中觀察到 AIO source lists 相較 traditional SERP 較不一致，且 AIO 對小幅 query edit 的 source overlap 較低；阻擋 Google-Extended bot 的網站在作者 model 中較少被生成式 surface 取回。這些是 sample-bound descriptive association，不能把 source blocking 解讀成已證明的因果 mechanism。[^arxiv-generative-ai-disrupts-search]

因此，xdxd 的跨引擎／跨介面量測至少應保存 `collection_window`、`engine_surface`、`model_or_api`、`device`、`region`、`query_version`、`source_list_layer`、`candidate_source_urls`、`jaccard`、`rbo`、`replication_id` 與 `source_policy_snapshot`；同一研究不得把 AIO、SERP、Gemini 或其他 engine 的 exposure、retrieval、used、cited、shown、clicked 混成單一 visibility score。此欄位設計是 xdxd 的研究推論，不是論文或平台正式 schema。[^arxiv-generative-ai-disrupts-search]

## 1. 來源提出的兩個收斂條件

- **Rank stability**：隨著觀測逐步累積，追蹤 domain citation ranking 的 rank-correlation trajectory；當 trajectory 到達由資料結構顯示的 structural plateau，排名變化已相對穩定。來源並未因此主張單一固定 query 數適用於所有平台或主題。[^arxiv-ai-visibility-rank-stability]
- **Structural sufficiency**：先辨識 citation-share confidence interval 不含零的 established domains，再比較這些 domain 的 citation-share spread 與估計值的不確定性；目的是判斷差異是否足以支援比較性推論，而不是只看排名順序是否停止大幅變動。[^arxiv-ai-visibility-rank-stability]
- **Sequential convergence**：兩個條件互補，用來區分「排名已穩定」與「排名已充分解析」；來源摘要報告這套框架以平台／主題分層應用於 Gemini、SearchGPT 與 Perplexity 的 30 個 combinations。這些是作者報告的應用範圍，不是 xdxd 的重現結果。[^arxiv-ai-visibility-rank-stability]

## 2. RDQ 作為 citation／source-order 的候選補充量測（推論）

RDQ 原始論文針對一般多答案 retrieval／ranking，而不是 AI Search 或 GEO；以下是把它映射到 xdxd citation／source presentation 的研究推論，不是來源對公開搜尋的驗證。RDQ 的輸入是每個 query 的 ordered reference list（ORL）與 candidate list：只對 ORL 內 item 給分，並把 candidate position 的重要性與 item 相對 ORL rank 的偏離分開處理；ORL 可以有 ties、query-varying size，且可用 ordinal preference 產生，不必先假定跨 query 的絕對 gain scale。[^arxiv-rank-deviation-quality]

可在 xdxd 的受控實驗中建立一個 **RDQ overlay**：

1. 將 `cited` 或 `shown` layer 的來源／URL list 作為 candidate list，但先固定要量測的 layer；不可把 `retrieved`、`used_in_answer`、`cited`、`shown`、`clicked` 混成一個分數。
2. 由獨立、版本化的 relevance／authority／claim-support adjudication 產生 ORL；記錄 ORL 的建立者、規則、ties、完整性與 `orl_snapshot_hash`。ORL 不完整時，未列出的有效來源會被 RDQ 當成零分，必須標記 `orl_completeness_status: unknown|partial|complete`，不得默認 complete。
3. 預先註冊 `rdq_variant`（`M1` 或 `M2`）、`alpha`、`lambda`、`position_weight_profile` 與 cutoff。`M2` 的 displacement penalty 與 UI weights 是應用選擇，不應依 outcome 臨時調參。
4. 同時報告 membership／coverage、ORL rank deviation、position-weighted RDQ、citation entailment、source quality 與 answer outcome；RDQ 只回答 supplied ORL 下的排序／多答案評估，不能替代 claim-level support 或 user preference validation。

來源在 POI sample 中報告 `RDQ_M2-alpha1@5` 的 median power@100 與 system-ranking stability 結果，但這是作者指定的 5,000-query、12-system、silver-standard／randomization／subsampling protocol；在 TREC-DL，RDQ 需要把 graded labels 轉成 tied ORL tiers，結果也依 4-system、221-query panel 而定。這些數字只能作為候選 metric 的來源 evidence，不是 xdxd 的 benchmark baseline。[^arxiv-rank-deviation-quality]

## 2A. Presentation dependence 與 downstream decision stability

另一份原始研究提醒：共同提示中的 scorer 即使在 ranking quality 接近時，也可能因候選項目的呈現順序而改變 threshold 保留集合、reader 答案或 preference model 選出的 pair。來源把這種對候選 order、window partition、slot marker 與 answer skeleton 的敏感度稱為 presentation dependence；固定 query 與 candidate pool，只重排候選項目即可形成受控對照。這是來源在 batched pointwise scorer、reranking、multi-document QA 與 response-ranking protocol 中的研究定義，不是公開 AI Search 已採用的機制。[^arxiv-order-consistent-llm-scorers]

來源的 ranking／decision 分離可直接補強本頁的 convergence checks：在其 Qwen3-4B、18-collection passage-reranking aggregation 中，single-order distillation 的 nDCG@10／`τ-PSI`／retained-set Jaccard 為 `0.455`／`0.209`／`0.656`，OC-SFT 為 `0.459`／`0.083`／`0.835`；來源另報告五個 trained scorers 的 nDCG@10 差距可在 `0.010` 內，但排列後 retained-set overlap 仍跨 `0.656–0.835`。這些數字是作者指定模型、候選 first stage、window、threshold、seed、collection 與十排列設定的 observational evidence，不能當作 xdxd 或公開搜尋平台的 baseline。[^arxiv-order-consistent-llm-scorers]

對 xdxd 而言，這支持把「排名移動」與「下游決策變更」並列而不互相取代：

1. 固定 `engine／model／interface × topic × query panel × observation window`，再固定 `candidate_set_hash`、candidate identity、presentation／permutation ID、window size、partition rule、slot marker 與 answer-skeleton hash。
2. 對同一 candidate pool 做預先註冊的排列／presentation replication，保存 citation/source list 的 membership、position、Kendall／RBO／RDQ 或其他 ranking measure，同時保存 `τ-PSI` 或等價的 order-instability measure。
3. 對會實際消費排序的元件另外量測 retained-set overlap、top-k reader answer／claim-verdict flip、preference pair flip；若研究的是公開生成式搜尋，還要把 `retrieved`、`used_in_answer`、`cited`、`shown` 與 `clicked` 分層，不能把 scorer 的 closed-corpus decision stability 當作 citation 或 GEO 成效。
4. 若導入 training、reranker、prompt presentation 或中間頁 representation intervention，必須分開保存 quality、order stability、decision stability、claim support、citation entailment 與 human／publisher outcome；一個層級改善不代表下一層級改善。

來源的 OC-SFT 是候選 mitigation，不是 xdxd 的採納方案；其 attenuation 仍依 shared prompt、model、task、marker 與 training protocol 而定，且來源指出 marker renaming 等未訓練的 presentation channel 不一定同步改善。xdxd 下一步可在自有或明確授權 corpus 做 fixed candidate set、permutation、marker、window／partition 與 skeleton 的 factorial paired run，但不得用此 closed benchmark 直接宣稱公開 AI Search ranking、citation、referral 或 GEO uplift。[^arxiv-order-consistent-llm-scorers]

## 2B. Exposure denominator：retrievable 不等於 encountered

Veenstra 與 Munoz Arias 在 academic ebook collection 的 problem paper 中區分 **retrievability** 與 **encounterability**：前者是查詢已指定目標時系統回傳項目的機率，後者是項目在讀者未先指定書名的活動中進入注意範圍的機率。這個 distinction 可移植到 xdxd 的測量語言，但來源本身不是公開 AI Search 或 GEO 實驗。[^arxiv-retrievable-unencountered]

來源指出，usage telemetry 的 zero 不足以識別低價值，因為 observed non-use 可能混合 never-rendered、rendered-but-unnoticed、noticed-but-rejected 與未被儀器觀察到的 off-channel use；作者在其 library review 範圍內也找不到標準 metric 記錄 item impression。這是來源對 library instruments 的 evidence boundary，不是對所有 AI Search platform telemetry 的盤點。[^arxiv-retrievable-unencountered]

對 xdxd 而言，**known-target retrieval test** 只能回答「指定 URL／title 時是否可被取得」，不能回答 unprompted discovery。公開生成式搜尋的觀測表應把 `candidate_exposed`／`rendered`、`noticed`（通常仍是未觀察或僅 proxy）、`selected`、`retrieved`、`used_in_answer`、`cited`、`shown` 與 `clicked` 分開；若只有 final answer 或 citation list，`exposure_denominator_status` 應為 `unknown`，不可把 citation share 或 usage 當成完整 exposure。這是 xdxd 的研究推論，不是來源或平台正式 schema。[^arxiv-retrievable-unencountered]

來源提出的四個方向可轉成受控研究設計：title／candidate-level impression logging 並與後續 request join、digital new-arrivals surface 的 before-after 或 randomized test、把 ebook 納入 browse surface，以及用 exposure log partition zero-use。每一方向都要保留 rendering 不等於 noticing、goal-directed click 與 off-channel use 的 residual；因此它們是縮小 identification gap 的方法，不是已證明的 GEO intervention。[^arxiv-retrievable-unencountered]

最小欄位可包含 `exposure_request_id`、`candidate_set_hash`、`surface`、`position`、`rendered_at`、`noticing_proxy`、`selected`、`opened`、`retrieved`、`used_in_answer`、`cited`、`shown`、`clicked`、`never_rendered`、`rendered_unselected`、`off_channel`、`instrument_missing` 與 `unknown`。這些欄位必須和本頁既有的 `engine／model／interface × topic × query panel × observation window` strata、response／content hash 與 downstream decision stability 一起保存；欄位設計是 xdxd 的 draft protocol。[^arxiv-retrievable-unencountered]

## 2C. Pooled LLM evaluation、judgment reuse 與 ranking uncertainty

Nelson 等人的原始研究補上本頁既有 sequential convergence／rank stability 方法中的 **evaluation substrate layer**：多個 retrieval systems 對同一 query set 取 top-`k` 文件 union，對唯一 `(query, document)` pair 做一次 graded LLM judgment，新增 system 時只對它貢獻的新文件補判，並以 shared judgments 比較所有 systems。這可降低 repeated retrieval evaluation 的重複成本，但 judgment reuse 是 lineage／成本屬性，不是新的獨立 evidence source。來源研究限於四個 retrieval benchmarks 與一個 financial-news RAG deployment，不是公開 AI Search 平台測量。[^arxiv-pooled-llm-evaluation]

來源的 metric reasoning 指出：在 ranked lists 與 relevance labels frozen 的條件下，P@k 與 DCG@k 對 pool expansion 不變；recall@k、AP、nDCG@k 的 per-query pairwise ordering 可因 shared query denominator 保持，但 macro-averaged benchmark ranking 不由定義保證。因此本頁的 `rank stability` 應區分：

1. **Definition-level invariance**：由 metric 與 frozen label 條件直接推出的層級；
2. **Empirical pool-growth stability**：不同 system-addition order、pool snapshot 與 query aggregation 下的實測層級；
3. **Decision resolution**：score gap 是否大於 qrels／judge 的 sampling uncertainty，足以支援 model selection；
4. **Public-Web visibility**：`candidate_exposed`、`retrieved`、`used_in_answer`、`cited`、`shown`、`clicked` 等下游層，不能由前三層回填。

來源用 `B=10,000` 次 query bootstrap 計算 pairwise swap probability，並以 500 個 random system-addition orderings 檢查 pool-growth reversal。其 benchmark 結果中，FiQA 的 reversal 集中在 final nDCG@10 gap `0.000014` 的 near-tie，FinRAGBench-V 的 reversal 對應 gap `0.0006`，NQ／TREC-COVID 未觀察到 reversal；測試中 gap 大於 `0.001` 的 pair 沒有 reversal。這些是來源指定 datasets、11-system pool、nDCG@10、qrels 與 permutation protocol 的 observational evidence，不是 universal stability threshold。[^arxiv-pooled-llm-evaluation]

來源同時揭示 LLM judge 的 calibration 與 judge-choice 邊界：primary judge 為 pinned `gpt-4.1-2025-04-14`、temperature `0`，另以 Claude Sonnet 4.6 做部分重判。來源報告 pooled pseudolabel 與 gold-qrel 的 nDCG@10 system-ranking Spearman correlation 依 dataset 為 `.909`、`.691`、`.945`、`.909`；但 pseudolabel 的絕對 nDCG／recall 可能相對 qrels 有 dataset-dependent offset。對 xdxd 而言，應保存 `judge_model_version`、`judge_prompt_hash`、`temperature`、`label_scale`、`gold_qrel`／`pseudolabel`、`pool_snapshot_id` 與 rejudge sample，而不是把 judge score 當成 external truth。[^arxiv-pooled-llm-evaluation]

來源 production section 以約 300,000 個 OpenSearch news article pages、303 個 queries 與 62 個 retrieval configurations 示範增量 pool；final pool 的 766,350 unique judgments 相對 3,765,643 independent judgments 報告 79.6% reuse／4.9x cost reduction。這筆 application-side deployment observation 可作為 measurement-cost planning 的候選參考，但不支持 xdxd 的成本、品質、公開 AI Search ranking 或 GEO outcome。[^arxiv-pooled-llm-evaluation]

### 對 xdxd measurement contract 的新增欄位

- `pool_snapshot_id`、`pool_parent_id`、`pool_growth_order`、`candidate_set_hash`；
- `new_document_count`、`reused_judgment_count`、`reuse_rate`、`rejudge_policy`；
- `judge_model_version`、`judge_prompt_hash`、`temperature`、`label_scale`、`label_provenance`；
- `gold_qrel_snapshot`、`pseudolabel_snapshot`、`bootstrap_seed`、`bootstrap_iterations`、`swap_probability`、`qrels_uncertain`；
- `system_pair`、`score_gap`、`near_tie_threshold`、`pairwise_order`、`order_reversal`、`decision_resolution`；
- `retrieval_stage`、`reranker_present`、`query_formulation`、`representation_hash` 與 `source_snapshot_hash`；
- 若研究 public Web，再另存 `crawled`、`indexed`、`candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked`、`outbound_referral`。

這些是 xdxd 的 `draft` research-design inference。新增 pool、shared judgment 或高 rank correlation 不代表 source claim 被 citation entailment 支援，也不代表公開 AI Search 的 referral／click 或 GEO uplift；若 near-tie 的 uncertainty 尚未解析，結果應輸出 `inconclusive_tie`，而不是強制排序。[^arxiv-pooled-llm-evaluation]

## 3. xdxd GEO 的可移植觀測 protocol

1. **固定比較單位**：每一個 `engine／model／entry × topic × query panel × observation window` 作為獨立 strata；保存平台、介面、模型或版本、地區／語言、query、執行時間與 run ID。
2. **逐步累積資料**：在每個 strata 以可重現順序加入 query 或 replication；每一個累積節點保存 citation-level records、normalized citation URL、domain、citation share、domain rank、confidence interval、原始 response snapshot 與（若採用）ORL／RDQ contract。
3. **分開計算兩種收斂判斷**：一條序列保存 rank-correlation trajectory 與 plateau 判斷；另一條序列保存 established-domain 邊界、citation-share spread 與估計不確定性。不可用單一「排名變化變小」替代 structural sufficiency。[^arxiv-ai-visibility-rank-stability]
4. **在固定 layer 上計算 RDQ overlay**：保存 `orl_id`、`orl_rank`、`orl_tier`、`orl_completeness_status`、`rdq_variant`、`alpha`、`lambda`、`position_weight_profile`、`candidate_position`、`candidate_membership`、`rank_deviation` 與 `rdq_score`。同一 response 可有多層 records，但每層分數要獨立標示。
5. **停止規則**：研究者可把 rank stability 與 structural sufficiency 都達成作為「可支援比較性推論」的候選停止點；若只有 rank stability 而沒有 structural sufficiency，應標記為穩定但尚未充分解析。RDQ 的 power／stability 不得單獨取代這兩個 convergence checks。這是 xdxd 的操作化選擇，須以重現實驗檢查敏感度。
6. **保留漏斗分層**：`candidate_exposed`、`retrieved`、`used_in_answer`、`cited`、`shown` 與 `clicked` 不得合併成單一 visibility score；本方法處理 citation distribution 與候選排序的補充量測，不替代 crawler、index、retrieval、claim-level entailment 或 click observation。

這套 protocol 可與[跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md)、[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)及[證據生命週期](/methods/evidence-lifecycle.md)共同使用：前者保存平台／介面 strata，中者分開 evidence utilization 與 citation support，後者規定 raw、compiled、verified 與 stale 的生命週期。Google SERP／AIO／Gemini 的 source divergence、repeatability 與 query-edit controls 則應作為額外的 observed-surface layer，不得取代 crawler、index、retrieval 或 claim-support measurement。[^arxiv-generative-ai-disrupts-search]

## 4. 研究資料表的最小欄位

| 層級 | 必要欄位 |
|---|---|
| 平台 strata | engine、model、interface、region、language、topic、observation window |
| 查詢與執行 | query_id、query text、replication、run_at、run_id、prompt／設定 hash |
| 回答與引用 | response snapshot、citation URL、normalized URL、domain、citation position、claim／source linkage |
| ORL／RDQ contract | orl_id、orl_rank／tier、orl completeness、rdq variant、alpha、lambda、position weight profile、cutoff |
| 累積量測 | cumulative_n、domain citation share、rank、rank-correlation statistic、confidence interval、established flag、RDQ score |
| 研究判定 | stability status、plateau evidence、sufficiency status、uncertainty、stop decision、limitations |

欄位設計是 xdxd 的重現與稽核推論；第一份來源支持 sequential convergence、rank stability、structural sufficiency 與平台／主題應用範圍，第二份來源支持 RDQ 的 metric contract 與其作者指定實驗結果；兩者都不支持上述欄位已是 AI Search 標準 schema。[^arxiv-ai-visibility-rank-stability] [^arxiv-rank-deviation-quality]

## 5. 證據邊界與待驗證事項

- 本頁的六份來源中五份是 arXiv 預印本；Google EEA Search Dataset 來源是 Google Search Central 第一方頁面。所有新增內容都沒有 `verified`，不能描述為已由 xdxd 或人工核准。
- Google SERP／AIO／Gemini 的作者 study 主要資料來自 2025-12-07–2025-12-08 的單一 Google ecosystem、SerpAPI／Gemini API 與特定 device／location；`51.5%` AIO prevalence、低 source overlap、較低 repeatability 與 crawler-blocking association 都不能直接當成 2026-08 的現行平台常數或因果效果。[^arxiv-generative-ai-disrupts-search]
- 第一份來源沒有讓本頁取得可直接重現的完整 experiment receipt；rank-correlation trajectory、confidence interval、structural constants、platform／topic sampling 與停止判定仍應回到 PDF、程式碼與資料核對。[^arxiv-ai-visibility-rank-stability]
- 第二份來源的 POI ORL 依賴 GenAI-assisted silver-standard labels，TREC-DL 只有 4 個 systems／6 個 pairs，且作者尚未完成 human-preference validation；RDQ 的 discriminative power／ranking stability 是相對於 supplied ORL 的內部統計性質，不等同使用者感知品質。[^arxiv-rank-deviation-quality]
- ORL 不完整會使未列出的有效來源得零分；因此任何公開 AI Search citation 應用都要先保存 ORL completeness 與 independent adjudication，不得直接把 RDQ 當成 authority 或 citation truth。
- `alpha`、`lambda`、position weights、cutoff、citation layer 與 ORL construction 都可能改變結果；需 pre-register 並做 parameter／layout sensitivity，不可從來源的單一最佳配置推導產品承諾。
- 來源的 30 個 platform-topic combinations 與 RDQ 的 POI／TREC 結果都是作者研究範圍，不是跨平台 prevalence，也不代表任一平台的官方推薦、排名公式或 citation 保證。[^arxiv-ai-visibility-rank-stability] [^arxiv-rank-deviation-quality]
- 本方法不支持「RDQ 分數高就代表來源權威」、「增加 query 數必然提高某一 domain 的排名」或「citation share 差異由內容介入造成」等產品命題；要評估介入，仍需 paired content、固定 query、版本化 response、獨立 ORL 與漏斗分層的 longitudinal experiment。
- AEO referral 研究的 on-domain control、ITS 與 placebo design 只在其單一 glasp.co／ChatGPT-dominant、非隨機 bundle、短 pre-period 與 withheld-absolute-counts 邊界內成立；`1.82×`／`2.27×` 與 `5.7×`／`3.5×` 是 source-reported observational results，不能外推為所有網站、引擎、內容介入或公開 AI Search 的 causal effect。[^arxiv-aeo-platform-growth]
- AEO 的 raw referral、engaged session、organic click／impression、citation、shown、clicked 與 crawl／index／retrieval 是不同 layers；新增研究沒有提供 public crawler、index、citation entailment 或 cross-engine trace。後續若要估計 representation intervention，應同時保存 untreated control、platform-tailwind assumption、bundle／corpus-expansion status、pre-trend、bot-filter change、placebo與 downstream referral，而不是只報 raw multiple。[^arxiv-aeo-platform-growth]
- presentation dependence 研究的 downstream decision stability 不能替代公開 Web 的 crawl、index、retrieval、citation、shown、click 或 conversion observation；其排列 replication、retained-set overlap 與 reader／pair flip 只能作為 scorer／候選集合層級的補充 measurement，且必須保留 candidate set、consumer、presentation 與 threshold 邊界。[^arxiv-order-consistent-llm-scorers]
- academic ebook 的 retrievability／encounterability distinction 與 zero-use exposure denominator gap 可作為 exposure measurement 的 logic transfer，但不等同公開 AI Search 的 candidate rendering、attention、citation 或 click evidence；若沒有 item-level impression／request join，任何上游 exposure 仍應標成 `unknown`。[^arxiv-retrievable-unencountered]
- 權利與再利用應回到[rank-stability raw capture](/raw/arxiv-ai-visibility-rank-stability-2026-08-26.md)、[RDQ raw capture](/raw/arxiv-rank-deviation-quality-2026-08-27.md)、[Google SERP／AIO／Gemini raw capture](/raw/arxiv-generative-ai-disrupts-search-2026-08-27.md)與[Google EEA Search Dataset raw capture](/raw/google-european-search-dataset-licensing-2026-09-01.md)的原始檔案、HTTP metadata 與授權訊息核對。

[^arxiv-ai-visibility-uncertainty]: Ronald Sielinski, “Quantifying Uncertainty in AI Visibility: A Statistical Framework for Generative Search Measurement,” arXiv:2603.08924v3, submitted 2026-03-09, last revised 2026-08-26. Source URL: <https://arxiv.org/abs/2603.08924>. Immutable raw capture: [metadata](/raw/arxiv-ai-visibility-uncertainty-2026-08-27/capture-metadata.json), [experimental HTML](/raw/arxiv-ai-visibility-uncertainty-2026-08-27/paper.html), and [paper PDF](/raw/arxiv-ai-visibility-uncertainty-2026-08-27/paper.pdf).

[^arxiv-ai-visibility-rank-stability]: Ronald Sielinski, “From Stochastic to Stable: Rank Stability and Structural Sufficiency in AI Visibility Measurement,” arXiv:2607.10341v1, submitted 2026-07-11. Source URL: <https://arxiv.org/abs/2607.10341>. Immutable raw capture: [metadata](/raw/arxiv-ai-visibility-rank-stability-2026-08-26.md), [abstract HTML](/raw/arxiv-ai-visibility-rank-stability-2026-08-26/abstract.html), and [paper PDF](/raw/arxiv-ai-visibility-rank-stability-2026-08-26/paper.pdf).

[^arxiv-rank-deviation-quality]: Xiaokun Zhou, Alessandro Moschitti, and Danielle Class, “Rank-Deviation Quality: A Distance-Aware Metric for Multi-Answer Retrieval and Ranking Evaluation,” arXiv:2608.25318v1, submitted 2026-08-26. Source URL: <https://arxiv.org/abs/2608.25318>. Immutable raw capture: [metadata](/raw/arxiv-rank-deviation-quality-2026-08-27.md), [experimental HTML](/raw/arxiv-rank-deviation-quality-2026-08-27/paper.html), and [paper PDF](/raw/arxiv-rank-deviation-quality-2026-08-27/paper.pdf).

[^arxiv-generative-ai-disrupts-search]: Riley Grossman, Songjiang Liu, Michael K. Chen, Mike Smith, Cristian Borcea, and Yi Chen, “How Generative AI Disrupts Search: An Empirical Study of Google Search, Gemini, and AI Overviews,” arXiv:2604.27790v1, submitted 2026-04-30; accepted to ACM SIGIR 2026. Source URL: <https://arxiv.org/abs/2604.27790>. Immutable raw capture: [metadata](/raw/arxiv-generative-ai-disrupts-search-2026-08-27/capture-metadata.json), [experimental HTML](/raw/arxiv-generative-ai-disrupts-search-2026-08-27/paper.html), and [paper PDF](/raw/arxiv-generative-ai-disrupts-search-2026-08-27/paper.pdf).
[^arxiv-order-consistent-llm-scorers]: Markus Frohmann, Mahdiyar Alavi, Elizabeth Lingg, and Navid Rekabsaz, “Equal Ranking Quality, Different Decisions: Training Order-Consistent LLM Scorers,” arXiv:2608.26762v1, submitted 2026-08-27. Source URL: <https://arxiv.org/abs/2608.26762>; immutable raw capture: [metadata](/raw/arxiv-order-consistent-llm-scorers-2026-08-28/capture-metadata.json), [abstract HTML](/raw/arxiv-order-consistent-llm-scorers-2026-08-28/abstract.html), [official HTML](/raw/arxiv-order-consistent-llm-scorers-2026-08-28/paper.html), and [paper PDF](/raw/arxiv-order-consistent-llm-scorers-2026-08-28/paper.pdf).

[^arxiv-retrievable-unencountered]: Jette Veenstra and Mauricio Munoz Arias, “Retrievable but Unencountered: The Missing Exposure Denominator in Large Academic Ebook Collections,” arXiv:2608.26308v1, submitted 2026-08-26. Source URL: <https://arxiv.org/abs/2608.26308>; immutable raw capture: [metadata](/raw/arxiv-retrievable-unencountered-2026-08-30/capture-metadata.json), [experimental HTML](/raw/arxiv-retrievable-unencountered-2026-08-30/paper.html), and [paper PDF](/raw/arxiv-retrievable-unencountered-2026-08-30/paper.pdf).

[^google-eea-search-dataset]: Google Search Central, “Google European Search Dataset Licensing Program,” <https://developers.google.com/search/help/about-search-data-program>, page last updated 2026-08-31 UTC; immutable raw capture: [wrapper](/raw/google-european-search-dataset-licensing-2026-09-01.md), [source HTML](/raw/google-european-search-dataset-licensing-2026-09-01/source.html), and [capture metadata](/raw/google-european-search-dataset-licensing-2026-09-01/capture-metadata.json).

[^arxiv-aeo-platform-growth]: Keisuke Watanabe and Kazuki Nakayashiki, “Disentangling Answer Engine Optimization from Platform Growth: A Log-Based Natural Experiment on ChatGPT Referral Traffic,” arXiv:2606.04362v1, submitted 2026-06-03. Source URL: <https://arxiv.org/abs/2606.04362v1>; immutable raw capture: [metadata](/raw/arxiv-aeo-platform-growth-2026-09-02/capture-metadata.json), [abstract HTML](/raw/arxiv-aeo-platform-growth-2026-09-02/abstract.html), [experimental HTML](/raw/arxiv-aeo-platform-growth-2026-09-02/paper.html), [paper PDF](/raw/arxiv-aeo-platform-growth-2026-09-02/paper.pdf), [Atom API](/raw/arxiv-aeo-platform-growth-2026-09-02/arxiv-api.xml), [selected excerpts](/raw/arxiv-aeo-platform-growth-2026-09-02/selected-excerpts.txt), [SHA-256 receipt](/raw/arxiv-aeo-platform-growth-2026-09-02/sha256.txt), and [rights record](/raw/arxiv-aeo-platform-growth-2026-09-02/rights.txt). The source reports a single-domain, ChatGPT-dominant, non-random bundle intervention using first-party analytics and server logs; xdxd did not reproduce the study or access its private analytics.

[^arxiv-pooled-llm-evaluation]: Max Nelson, Hanoz Bhathena, Aviral Joshi, and Saket Sharma, “Incremental Pooled LLM Evaluation for Cost-Effective Retrieval Model Selection,” arXiv:2609.02745v1, submitted 2026-09-02. Source URL: <https://arxiv.org/abs/2609.02745v1>; immutable raw capture: [metadata](/raw/arxiv-pooled-llm-evaluation-2026-09-03/capture-metadata.json), [abstract HTML](/raw/arxiv-pooled-llm-evaluation-2026-09-03/abstract.html), [experimental HTML](/raw/arxiv-pooled-llm-evaluation-2026-09-03/paper.html), [paper PDF](/raw/arxiv-pooled-llm-evaluation-2026-09-03/paper.pdf), [Atom API](/raw/arxiv-pooled-llm-evaluation-2026-09-03/arxiv-api.xml), [selected excerpts](/raw/arxiv-pooled-llm-evaluation-2026-09-03/selected-excerpts.txt), [SHA-256 manifest](/raw/arxiv-pooled-llm-evaluation-2026-09-03/sha256.txt), and [rights record](/raw/arxiv-pooled-llm-evaluation-2026-09-03/rights.txt). All four official representations returned HTTP 200 during the 2026-09-03 capture; the experimental HTML displays CC BY 4.0. The source is limited to retrieval-model evaluation and an internal financial-news RAG deployment; xdxd did not reproduce it and it does not establish public AI Search or GEO outcomes.
