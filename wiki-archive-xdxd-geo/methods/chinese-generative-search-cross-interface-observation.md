---
type: Research Method
title: 跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法
description: 從中文生成式搜尋、自然瀏覽 search logs、多輪 AI-search、search-agent／dissemination-interface、跨 modality benchmark audit、Google AI Search field experiment、AI Overview browsing panel 與 Wikipedia traffic quasi-experiment 原始研究整理跨平台介面、browser events、citation-level records、source attribution、request state、publisher referral、信任與人類結果的 draft 觀測方法。
tags:
  - generative-search
  - citation
  - source-attribution
  - cross-interface
  - multi-turn
  - request-state
  - observation
  - evaluation
  - chinese-language
  - search-logs
  - browser-observation
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-29T07:07:50Z
sources:
  - id: arxiv-chinese-generative-search
    resource: /raw/chinese-generative-search-2026-08-26.md
    title: "What Do Chinese-Language Generative Search Engines Cite and Surface?"
    last_modified: 2026-07-20
  - id: arxiv-prompt-state
    resource: /raw/arxiv-prompt-state-2026-08-26.md
    title: "The Prompt Is Not the Query: How Request State Evolves Across Multi-Turn AI Conversations"
    author: human:benjamin-tannenbaum
    last_modified: 2026-07-24
  - id: arxiv-search-agent-trust
    resource: /raw/arxiv-search-agent-trust-2026-08-26.md
    title: "From Search Agents to Dissemination Interfaces: Understanding Human Trust in Health Information from Conversational Search"
    author: human:xin-sun
    last_modified: 2026-08-21
  - id: arxiv-ai-search-economic-bargain
    resource: /raw/arxiv-ai-search-economic-bargain-2026-08-26.md
    title: "Answering Without Referring: How AI Search Rewrites the Web's Economic Bargain"
    author: human:qiaoni-shi
    last_modified: 2026-08-24
  - id: arxiv-citation-monoculture
    resource: /raw/arxiv-citation-monoculture-2026-08-26.md
    title: "When AI Writes, Who Gets Cited? Evidence of Citation Monoculture Across Language Models"
    author: human:sina-alemohammad
    last_modified: 2026-08-03
  - id: arxiv-searchlog
    resource: /raw/arxiv-searchlog-2026-08-26.md
    title: "SearchLog: A Web Browser Extension for Capturing Search Logs in Laboratory Studies"
    author: human:jiaman-he-et-al
    last_modified: 2026-06-03
  - id: arxiv-ai-search-publisher-referrals
    resource: /raw/arxiv-ai-search-publisher-referrals-2026-08-26.md
    title: "AI in Search Reduces Publisher Referrals Without Improving User Experience: Experimental Evidence"
    author: human:stephanie-t-wang-et-al
    last_modified: 2026-08-18
  - id: arxiv-ai-search-summaries-traffic
    resource: /raw/arxiv-ai-search-summaries-traffic-2026-08-29.md
    title: "Impact of AI Search Summaries on Website Traffic: Evidence from Google AI Overviews and Wikipedia"
    author: human:mehrzad-khosravi-and-hema-yoganarasimhan
    last_modified: 2026-08-26
  - id: arxiv-new-shape-of-search
    resource: /raw/arxiv-new-shape-of-search-2026-08-29.md
    title: "The New Shape of Search: How Conversational AI Recomposes Information Seeking"
    author: human:michael-iannelli-and-alan-ai
    last_modified: 2026-08-25
  - id: arxiv-ai-benchmark-modality
    resource: /raw/arxiv-ai-benchmarks-unmeasured-2026-08-27.md
    title: "What Current AI Benchmarks Leave Unmeasured: Modality, Search, Citations, and Implications (for Safety Evaluations)"
    author: human:ro-encarnacion-et-al
    last_modified: 2026-08-06
  - id: arxiv-google-ai-overview-click-behavior
    resource: /raw/arxiv-google-ai-overview-clicks-2026-08-28.md
    title: "Investigating Click Behaviors On Google Search Result Pages That Produce an AI Overview"
    author: human:athena-chapekis-et-al
    last_modified: 2026-08-05
---

# 方法定位

本頁從十一份 arXiv 原始研究整理跨平台 Web／App 介面、browser-level natural search events、candidate visibility、citation-level records、source attribution、citation concentration、answer exposure、多輪 conversation-conditioned request state、search-agent／dissemination-interface 對人類信任、AI Search referral／traffic allocation、跨 access modality／search condition 的 response variation、生成式搜尋 feature exposure 的 preregistered field outcome，以及 answer-first feature 對 publisher direct-search traffic 的 quasi-experimental outcome。中文生成式搜尋來源聚焦四個平台的介面差異；SearchLog 補充在熟悉的 open-web browser 中保存 query、SERP ranking、AI summary、HTML snapshot、tab／window 與 page interaction 的 session instrumentation；citation monoculture 來源把已呈現候選與 selection preference 分開，並提供 matched null、cross-model／cross-vendor agreement 與 content-control 的研究設計；多輪來源指出 isolated prompt 不必然等於使用者在 session 中實際提供的 request state；健康資訊來源把資訊本身的 credibility、agent-level trust 與介面呈現的信任結果分開；traffic 來源提醒 citation／source presentation 之外，還要觀測回答是否導出到來源頁與 referral 在哪些 destination 結束；modality audit 則顯示 benchmark 需把 access modality、search condition、multi-run consistency、citation source set 與 abstention 分開；Google field experiment 提供特定 Google Search、七天 forced-treatment 與 publisher／human outcome 的 causal design；Wikipedia traffic quasi-experiment 再補上 default-AIO regime、外部搜尋轉介與 publisher-side traffic 的 reduced-form 分層。十一者都不支持直接外推到所有語言、所有引擎或公開 AI Search 的通用成效；原始來源仍未經 xdxd 獨立重現或人工驗證。[^arxiv-chinese-generative-search] [^arxiv-searchlog] [^arxiv-prompt-state] [^arxiv-search-agent-trust] [^arxiv-ai-search-economic-bargain] [^arxiv-citation-monoculture] [^arxiv-ai-search-publisher-referrals] [^arxiv-ai-search-summaries-traffic] [^arxiv-ai-benchmark-modality] [^arxiv-google-ai-overview-click-behavior]

## 研究設計

中文生成式搜尋來源研究包含四個主流平台的八個 Web／App 介面、614 個 queries、每個 query-platform-interface combination 三次 replication，並從 214,119 筆 raw records 建立 160,860 筆 cleaned citation-level records。[^arxiv-chinese-generative-search]

若研究 human-facing outcome，應另加 search-agent／dissemination-interface strata，而不能把回答文字或 citation URL 當作信任的代理變數。新增來源以健康資訊為特定情境，Study 1 比較 Google 與 ChatGPT（`N=21`），Study 2 在同一 LLM 下比較文字、語音與具身 CUI（`N=20`）；來源報告不同 agent 與 interface 的信任差異，並以訪談整理 source credibility、search autonomy、prior knowledge、familiarity、usability、presentation、personalization 與 modality 等因素。這些可轉為待驗證的 outcome／moderator 欄位，但不代表公開搜尋的普遍因果效果。[^arxiv-search-agent-trust]

若研究 source presentation 對來源生態或網站價值的影響，應再加入 user-side traffic strata：以一次 ChatGPT conversation session 或傳統 search query 作為 information-seeking occasion，分開記錄是否產生 clean outbound referral、referral destination 類別、referral ratio、session／query denominator 與 access-expansion cohort。該來源以美國桌面 Comscore clickstream 報告 ChatGPT session 的 clean outbound referral ratio 為 5.2%、Google query 為 31.1%，以及 access expansion 後傳統搜尋使用量的變化；這些是特定資料覆蓋、classifier、session rule 與識別設計下的來源結果，不是 xdxd 的重現，也不等於 citation、回答成功、publisher revenue 或 agent discoverability 效果。[^arxiv-ai-search-economic-bargain]

## Access modality、search condition 與 response-level citation audit

新增的 modality audit 以 BBQ 與 SafetyBench 的 401 個 sampled prompts 建立 2×2 條件：logged-out ChatGPT chat UI／OpenAI API，以及 web search enabled／disabled；每個 prompt 在四個 condition 各執行三次，共 4,812 responses，並以一週 collection window 降低 temporal drift。來源把 modality 定義為完整的 deployed access layer，包含 system prompt、search、moderation 與 interface behavior，而不是只比較相同 model name。這是單一 OpenAI model family、兩個 benchmark 的 original research，不是 xdxd 重現。[^arxiv-ai-benchmark-modality]

對跨介面或跨引擎研究，至少要保存：

- `access_modality`、`interface`、`model_family`／version、`account_state`、`search_condition`、region／locale、system／moderation layer 可知性與 collection window；
- `prompt_id`、`benchmark_id`、task category、gold answer、`replication_id`、run time、response snapshot／hash、answer consistency、pairwise disagreement、lexical／semantic similarity；
- `citation_present`、citation rate、normalized URL／domain、source-set union、URL／domain overlap、citation parser version，以及 `abstention`、unresolved／parse-failure reason；
- benchmark／modality／search strata 與 prompt-level random effect、multiple-comparison correction、configuration hash、browser／API route、tool／search state、parser missingness、rollout／release event。

來源 audit 在兩個 benchmark、四個 access condition 中觀察到：search-enabled condition 的 accuracy 與 modality 關係可改變；SafetyBench 的 API accuracy 由 no-search 的 88.5% 降至 search 的 80.6%，chat UI 則為 85.9% 至 84.4%，使 modality 方向反轉。三次 run 的 answer consistency 也會變動，BBQ chat UI／search 的 inconsistency 為 21.2%；跨 modality disagreement 在各 condition 約為較大 within-modality rate 的 1.14–1.30 倍。這些數字只屬來源 sample、model、interface、benchmark 與時段，不是 web search 的通用 accuracy effect。[^arxiv-ai-benchmark-modality]

Citation 觀測只能放在 search-enabled condition，因為來源兩種 modality 在 no-search 下都沒有 citation。BBQ 的至少一筆 citation rate 為 chat UI 46.8%、API 32.2%；SafetyBench 則為 API 73.9%、chat UI 60.6%。同一 prompt 的跨 modality cited-source overlap 很低：URL 約 4%、domain 約 7%；且 chat UI 另有「More Results」補充來源，API 只回傳回答內的來源。因此 `citation_present`、source identity、citation source quality、claim support、shown 與 click 必須分欄，不能用 citation rate 代替 retrieval 或 source trust。[^arxiv-ai-benchmark-modality]

Abstention 也要按 run 與 modality 保存。來源在 SafetyBench 沒有 abstention；BBQ 只有 no-search 出現 6 次，涵蓋 4 個 prompts，其中 3 個 prompts 只在三次 run 的一次 abstain。這個結果是該 benchmark 的 parsing／abstention 定義與單週 audit，不是一般 guardrail bypass 或公開 AI Search prevalence。[^arxiv-ai-benchmark-modality]

此 audit 補強跨介面 protocol，但沒有測試 HTML／Markdown／JSON-LD、schema、中間頁、crawler policy 或內容介入；也沒有 server-side crawl／index logs、公開跨引擎 field experiment、citation quality adjudication 或 GEO outcome。對 xdxd 而言，應把「access modality／search condition 造成的 deployed response difference」和「representation intervention 是否改變公開 Web funnel」分成兩個 paired study，並仍沿用 `candidate_exposed`→`retrieved`→`used_in_answer`→`cited`→`shown`→`clicked` 的分層。[^arxiv-ai-benchmark-modality]

## Google AI Search 的 preregistered field outcome

新增原始研究以 Google Search 的三組 feature-exposure condition 做 preregistered randomized field experiment：`No AI Search` 隱藏 AI Overviews 並將 AI Mode 導回一般搜尋；`Current Search` 不修改介面；`AI Mode Search` 將搜尋導向 AI Mode。參與者先經歷三天 baseline，再接受七天 treatment；資料由 Chromium browser extension 收集。這是特定平台 feature exposure 的 downstream outcome study，不是 xdxd 的中間頁、HTML／Markdown／JSON-LD、schema 或 crawler-policy intervention。[^arxiv-ai-search-publisher-referrals]

- 來源共招募 `1,444` 人；`1,100` 人在七天期間至少搜尋一次，進入 behavioral analysis；`956` 人完成 post-survey。behavioral outcomes 的母體是 `N=1,100`，survey outcomes 的母體是 `N=956`；樣本來自 Prolific 與 Northeastern work-study，且以美國、Chrome 與 Google Search 使用者為主。[^arxiv-ai-search-publisher-referrals]
- 相對 Current Search，AI Mode Search 的 external click-through rate ITT 為 `-18.8pp`（95% CI `-22.2` 至 `-15.3`，`p < 0.001`）；No AI Search 的 ITT 為 `+2.7pp`（95% CI `-0.7` 至 `+6.2`，`p = 0.124`），但依實際 exposure 的 No AI LATE 為 `+8.8pp`（95% CI `+2.3` 至 `+15.3`，`p = 0.008`）。ITT、LATE 與 compliance 必須分開報告。[^arxiv-ai-search-publisher-referrals]
- AI Mode Search 使每日 sessions 減少 `-0.92`，但每 session active minutes 增加 `+0.43`；news、Reddit、Wikipedia clicker fraction 分別減少 `-12.5pp`、`-21.2pp`、`-9.9pp`。AI Mode Search 也使 competitor-engine use 增加 `+11.2pp`，trust in information on Google 減少 `-0.34` 分（七點量表），並降低 usefulness、satisfaction、agency 與 personalization／relevance。這些是來源在特定 Google snapshot、樣本與 treatment protocol 下的作者結果，不是公開 Web 的普遍 prevalence 或 GEO uplift。[^arxiv-ai-search-publisher-referrals]
- No AI manipulation 的成功率因 Google 在研究期間更改 AI Overview HTML 而下降，整體 AIO hidden rate 為 `51.1%`；AI Mode routing success 為 `94.7%`。因此 protocol 必須保存 assignment、actual exposure、parser／interface rollout、missingness、ITT／LATE 與 exclusion-restriction assumption，不能把介面操弄失效誤寫成平台本身效果。[^arxiv-ai-search-publisher-referrals]

對 xdxd 的最小 paired protocol，是在自有／明確授權內容與測試環境預先指定 query panel、baseline／treatment window、engine／surface／版本、locale、participant eligibility、primary／secondary outcomes 與長期 follow-up；同時保存 `candidate_exposed`、`summary_exposed`、`retrieved`、`used_in_answer`、`cited`、`shown`、`clicked`、`outbound_referral`、`returned_to_source`、destination domain、human trust／satisfaction、publisher landing engagement、attrition 與 privacy redaction。若 treatment 是公開搜尋 feature，必須把 compliance、interface rollout、parser missingness、forced adoption 與自然 adoption 分開；若 treatment 是 representation 或內容介入，仍須另做 crawl／index／retrieval／citation paired observation。[^arxiv-ai-search-publisher-referrals]

## Standalone assistant 與 conventional search 的 temporal session topology

新增的原始研究 **The New Shape of Search** 將 prompt／response 與同一使用者的 search、content pageview 放入一條 inactivity-defined cross-surface temporal session，補上既有 citation／source presentation、request-state 與 publisher referral 之外的事件位置層。研究只處理 standalone ChatGPT、Claude、Perplexity 與 Gemini surface；Google AI Overviews／AI Mode 因為 search-embedded answer 與 SERP event 共存，未納入其 assistant topology，不能把本來源當成 Google AI feature measurement。[^arxiv-new-shape-of-search]

其可移植的分類是：`assistant-contained`（assistant span 內沒有 observed external web event）、`AI-first`（web 只在 assistant span 後）、`AI-last`（web 只在前）與 `bridge/interleaved`（web 在兩側、assistant events 之間或同時發生）。來源以 2026 年 2 月美國／英國 opt-in panel、30 分鐘 inactivity gap、至少一個 pageview-active day 的主要 frame，報告 user-weighted `34.1%` contained、`10.5%` AI-first、`18.3%` AI-last、`37.1%` bridge；3 月重做後 contained `35.3%`，paired directional recomposition `+20.3` points，與 2 月 `+20.6` points 相近。這些是特定 panel、market、surface、instrumentation 與 session rule 下的 observational estimates，不是公開搜尋通用比例。[^arxiv-new-shape-of-search]

在同時貢獻 assistant 與 search session 的使用者中，content-before／after 的 like-for-like directional contrast 為：assistant 前 `45.5%`、後 `38.9%`；search 前 `46.7%`、後 `60.2%`；paired difference-of-directions `+20.6` points，within-user contained-share difference `+13.0` points。來源將這稱為 observed **recomposition**，不將它寫成 assistant 造成 search displacement、需求改變或任務完成。`assistant-contained` 也不等於 resolved：時間鄰近、沒有觀察到 web event、或有多個 response，都不能單獨建立同一 semantic task、satisfaction、verification 或 internalization。[^arxiv-new-shape-of-search]

對 xdxd 的 protocol，需把 `session_gap_minutes`、boundary buffer、first-event window、full-host search list、unrecognised-assistant policy、same-timestamp rule、active-day coverage、user／session weighting 與 parser version 明確保存；另分開記錄 `assistant_contained`、`assistant_first`、`assistant_last`、`bridge_interleaved`、`content_before`、`content_after`、`retrieved`、`used_in_answer`、`cited`、`shown`、`clicked`、`outbound_referral`、`task_validated` 與 `satisfaction`。來源的 sensitivity 顯示 15→60 分鐘 gap 會使 contained 由 `46.9%` 降至 `29.2%`、bridge 由 `29.4%` 升至 `46.9%`；因此 containment 必須連同 session boundary 與 observation density 報告，不能當作固定 behavioral outcome。[^arxiv-new-shape-of-search]

## Google AIO default regime、publisher traffic 與 source-page referral

新增的原始研究 **Impact of AI Search Summaries on Website Traffic** 不操弄內容、schema 或中間頁，而是利用 Google AI Overviews（AIO）在地理上的 staggered rollout 與 Wikipedia 的多語言 article matching，估計 answer-first search 對 publisher-side direct-search traffic 的 reduced-form outcome。作者以 English Wikipedia 作為 treated edition，German／French 版本作為控制，使用 Wikimedia `other-search` 的 monthly external-search referrals，建構 2023-12 至 2024-12 的 article–language–month panel，並以 article×language 與 month fixed effects 的 PPML difference-in-differences 分別比較 English–German 與 English–French。這是來源的原始研究設計，不是 xdxd 重現，也不是公開平台通用的 traffic schema。[^arxiv-ai-search-summaries-traffic]

作者報告在其樣本與 exposure proxy 下，English Wikipedia search traffic 相對 German 下降約 `5.45%`，相對 French 下降約 `4.82%`；pre-trend、event study、Honest DiD、替代 censoring assignment、placebo 與額外 Japanese comparison 用來檢查結果穩健性。English–Japanese 的 `16.53%` 被作者定位為不同語言受眾與較短 post-treatment window 下的 corroborating evidence，沒有與主控制組 pooled。這些是 source-reported observational estimates，受 study window、language-as-geography proxy、`other-search` 混合搜尋引擎、post-treatment censoring 與 parallel-trends 假設限制。[^arxiv-ai-search-summaries-traffic]

這筆研究補上既有 citation／source-presentation 與 field-exposure protocol 之後的 publisher traffic layer，但不能由 traffic change 直接推出 citation quality、source-page support、organic rank、crawler／index 狀態、consumer welfare 或長期 content-supply effect。作者也未觀察每筆 query 是否實際顯示 AIO，且未估計 content／schema／representation intervention。對 xdxd 而言，應把 `feature_default_state`、`summary_exposed`、`citation_source_shown`、`source_page_opened`、`external_referral`、`returned_to_source`、`publisher_landing_engagement` 與 `crawled`／`indexed`／`retrieved`／`used_in_answer`／`cited`／`shown`／`clicked` 分開保存；不能以 citation count 或單次 answer snapshot 代替 referral outcome。[^arxiv-ai-search-summaries-traffic]

若研究 AI Search 對來源生態的 downstream effect，最小 paired design 應固定 query panel、engine／surface／version、locale、feature rollout、source snapshot、觀測窗與 outcome denominator，並同時保存 assignment／actual exposure、parser／layout change、censoring rule、ITT／LATE（若適用）、attrition、privacy boundary、direct search referral 與其他 referral channel。代表性研究結果必須保留為 platform／time／population-bound evidence，不得從 Wikipedia direct-search estimate 外推所有 publisher、平台、地區、裝置或長期 revenue。[^arxiv-ai-search-summaries-traffic]

## Google AI Overview 的自然瀏覽與來源點擊觀測

一份 Pew Research Center 的原始研究補上與 preregistered intervention 不同的自然瀏覽層：來源以 Ipsos KnowledgePanel Digital 的 900 位美國成年人，觀察 2025-03-01 至 2025-03-31 的瀏覽資料；研究者記錄 2,457,176 次網頁瀏覽，其中 91,121 次是 Google Search pages，對應 68,879 個 distinct queries，並在 2025-04-10 至 2025-04-11 對資料中的 Google Search URL 重新擷取 SERP 與 AI Overview text／最多三個直接突出的引用來源。這是來源對特定 panel、Google surface、時間窗與 SERP recapture 的研究設計，不是公開平台內部 logging schema。[^arxiv-google-ai-overview-click-behavior]

來源報告約 18% 的 Google searches 產生 AI Overview；較長 query、以 question word 開頭，或同時含有 noun 與 verb 的 query 較常出現 AI Overview。在該來源的行為抽取規則下，AI Overview 頁面直接突出引用來源的 click 約占 1% visits；一般搜尋結果 click 在無 AI Overview 頁面約為 15%，有 AI Overview 頁面約為 8%；session ending 則約為 16% 與 26%。作者使用包含 query attributes 與 panelist random effects 的 logistic mixed-effects models，但明確將資料定義為 observational，因此這些是 association／observational evidence，不可直接寫成 AI Overview 導致 click 或 session change 的因果效果。[^arxiv-google-ai-overview-click-behavior]

對 xdxd 的 downstream observation，可新增以下欄位而不覆蓋既有 citation／source funnel：

- `ai_overview_present`、`summary_source_shown`、`summary_source_count`、`citation_source_scope`（例如直接突出的 top-three 或完整 Show-all list）、`device`、`layout_variant` 與 `serp_snapshot_hash`；
- `citation_source_clicked`、`organic_result_clicked`、`continued_search`、`left_to_other_site`、`session_ended`、`next_url_class`、`session_boundary` 與各自的 query／visit denominator；
- `query_text`、`query_length`、`question_word`、`noun_verb_rule`、`engine`、`surface`、`interface_version`、`parser_version`、`collection_window`、`recapture_at` 與 `missingness_reason`；
- 與公開 Web funnel 分開保存 `crawled`、`indexed`、`candidate_exposed`、`retrieved`、`used_in_answer`、`cited`、`shown`、`supported`、`clicked`、`outbound_referral` 與 `returned_to_source`。

這個層級特別提醒：citation source click 不是所有 cited source 的 click，因為來源只比對 AI Overview 在當時桌面／頁面 layout 直接突出且最多三個來源；mobile、Show more／Show all、layout rollout、SERP recapture 與 parser missingness 會改變分母。研究樣本也不能代表其他引擎、地區、年份或長期 publisher revenue。對 xdxd 而言，本研究可補強 [SearchLog](/methods/chinese-generative-search-cross-interface-observation.md) 的 browser event instrumentation 與既有 field experiment 的 assignment／actual-exposure 區分，但不提供 representation intervention 或 GEO uplift evidence。[^arxiv-google-ai-overview-click-behavior]

## SearchLog：自然瀏覽與 AI summary 的觀測層

SearchLog 將「生成式搜尋頁面提供了什麼」與「使用者在頁面上實際看了什麼、做了什麼」拆成可保存的 browser-level evidence。來源的 Chromium extension／local Flask backend 在明確啟動的 study session 中記錄 Mouse、Keyboard、Search、Browser 四個模組，並保存 query、SERP ranking、AI-generated summary（若出現）、HTML snapshot、有序 JSON event stream、tab／window state 與 page interaction。這補足只保存 final answer、citation URL 或 click 的觀測缺口，但來源的功能描述與 validation 仍是作者 toolkit 的證據，不是公開搜尋平台的內部 schema。[^arxiv-searchlog]

對 xdxd 的跨引擎／跨介面觀測，SearchLog 可轉成以下 instrumentation layer：

- `session_id`、`participant_id`、`task_id`、`session_start`、`session_end`、`logging_active`、browser、engine、interface、region、language 與 consent／deletion state。
- `query_id`、query text、submit time、query reformulation、SERP snapshot hash、result id、rank、title、URL、description、`ai_summary_present` 與 summary snapshot hash。
- `event_id`、event time、event type、tab／window id、hovered text、scroll range、click target、selection、page visit、dwell time 與 return-to-source event。
- parser／DOM selector version、engine／interface rollout、raw HTML／ranking／event hash、excluded-event reason，以及若有模型呼叫時的 model／version、token、latency、cost。

這一層必須和公開 AI Search funnel 分開：`candidate_exposed`、`summary_exposed`、`result_inspected`、`page_opened`、`retrieved`、`used_in_answer`、`cited`、`shown`、`supported` 與 `clicked` 不可互相代換。SearchLog 目前只描述 Google／Bing 與作者的 six-scenario technical validation；商用頁面 layout 改變可能造成 parser missingness，且 natural search logs 可能含有 query、typed text、URL、AI summary 或 page snapshot 等敏感資料。因此 xdxd 若採用此類工具，應明確設定 active-session boundary、privacy masking、withdrawal／deletion policy、DOM parser version 與介面變更事件，並以同一 query／task 的 cross-interface paired run 檢查遺失與 exposure 差異，而不是以記錄筆數高低推論搜尋成效。[^arxiv-searchlog]

SearchLog 的 browser logs 可以補充 source presentation、human inspection 與 click／dwell path，但不能取代 crawler／index 的 server-side evidence，也不能由使用者 click 回推 claim-level citation entailment、source support、答案正確性或 Agent discoverability。對公開 AI Search 仍須另外保存 `crawled`、`indexed`、`retrieved`、`used`、`cited`、`shown` 與 `clicked`，並把 no-summary、no-citation、no-click、parser failure 與 session-aborted 視為可分析 outcome。[^arxiv-searchlog]

## Candidate visibility 與 citation concentration

citation-level record 之外，應把「候選是否已被呈現／retrieve」與「候選是否被選入 citation」分開。新增的原始研究在固定 candidate panel、均勻 exposure、blinded metadata 與 protocol-matched uniform null 下觀察模型的 selection preference；來源報告 top-decile citation share、exclusion、cross-model／cross-vendor agreement、shared preference component 與 model-mixing residual。這提供一個可移植的 selection-only control，但研究對象是已呈現給模型的論文，不是公開 Web retrieval 或搜尋排名。[^arxiv-citation-monoculture]

對 xdxd GEO 的跨引擎觀測，建議在每個 query／replication 保存：

- `candidate_set`、candidate exposure／retrieval provenance、`retrieved`、`selected`、`cited`、`shown` 與 `supported`；不能用 citation share 代替 retrieved coverage，也不能用 selected 代替 claim-level support。
- model／vendor／interface／version、候選 panel hash、budget／cap、prompt、response hash 與同 panel 的 matched null；null 的 binding 規則要和實際 selection 的 realized budget 一致。
- top-decile share、HHI／concentration、never-cited exclusion、pairwise citation overlap、cross-model／cross-vendor agreement 與 shared-map／mixture residual；每項都要同時報告 panel、曝光、時間窗與 null。
- content-slot crossover、controlled paraphrase、design resampling 或其他 representation control 的 paired run；這些是控制「內容本身」與 metadata／位置效果的研究設計，不是已證明的 GEO 介入。

若加入人工或專家對照，應保存相同 panel、相同 cap、相同 task instruction、完成的 prompt subset 與 annotator／agreement metadata；不能把人類結果當作模型 selection 的 ground truth。來源 benchmark 報告 11 個模型、3 個 vendor 與 8 位 domain experts 的特定 blinded-panel 結果；其 `23.3%–30.2%`、`15.6%` null、約 `68%–73%` shared component、約 `55%` residual 與約 `90%` content attribution 都是來源結果，不是 xdxd 重現，也不是公開 AI Search citation prevalence 或 uplift。[^arxiv-citation-monoculture]

跨介面測試不可只把一段文字當作穩定 query。對多輪 AI-search，應把 `conversation episode`／`request-state trajectory` 作為上位觀測單位，再把每一個 user turn 作為 state update；至少分開保存：

- `conversation_id`、`turn_id`、`replication`、`run_at` 與 response hash。
- `local_user_turn`：當輪實際送出的文字。
- `cumulative_user_state`：截至當輪已觀察到的 user-authored goals、constraints、alternatives、corrections、evaluation criteria 與 evidence requirements。
- `state_delta`：該輪新增、修正或重新指涉的可觀測 request-state dimension。
- `history_policy`：full interleaved history、user-turn-only history 或 isolated final turn。
- `platform`、`model`、`interface`、region／language、版本、retrieved source set、answer snapshot、citation URL 與 source hash。

多輪來源將這個區分定義為 conversation-conditioned request state，而不是 latent intent；其中「未在 final prompt 重述」不等於已證明使用者心理狀態消失，也不等於模型必然無法恢復。[^arxiv-prompt-state]

## 觀測欄位與結果邊界

應將 `retrieved`、`cited`、`selected/exposed`、`supported` 與 `clicked` 分成不同 outcome；`selected/exposed` 不等於 claim-level citation entailment。來源報告的 8.3% brand-selection、12.4% contact-information contribution、約 39／68 日 citation page half-life、約 13% unmatched brand exposure 與約 71% unmatched contact-information exposure，受 query panel、平台樣本、介面、時間窗與資料清理限制，不是整體網路 prevalence、跨引擎排名、citation 保證或 agent discoverability 成效。[^arxiv-chinese-generative-search]

在這個 funnel 之後另加 `outbound_referral` 與 `returned_to_source`，但不可把它們併入 `cited` 或 `clicked`：citation 可能沒有可操作連結，click 也可能不是來源頁；同樣地，沒有 outbound referral 不代表使用者沒有完成任務。至少保存 `information_seeking_occasion`、`session_or_query_id`、`referral_ratio`、`clean_referral_count`、`destination_domain`、`destination_category`、`referrer_observed`、`session_boundary`、`access_expansion_cohort` 與 `traffic_observation_window`。來源報告的 referral／displacement 結果可作為研究設計參考，但其 Comscore 美國桌面 panel 與 2024-10 至 2025-07 observation window 不可直接外推至所有 AI Search、行動端或長期來源生產。[^arxiv-ai-search-economic-bargain]

對 human-facing outcome，至少再分開保存 `trust_in_information`、`trust_in_agent`、`trust_in_interface`、`perceived_credibility`、`search_autonomy`、`usability`、`familiarity`、`presentation_style`、`modality` 與 `personalization`；不得把 perceived trust 當成 retrieval、citation entailment、答案正確性或公開可見度。健康資訊來源的 agent／interface 結果是特定研究情境下的 draft evidence，應保存任務、模型、介面、樣本、量表、訪談規則與倫理／資料保護條件。[^arxiv-search-agent-trust]

針對 request state，對每一個 final turn 計算但不混用以下指標：

- `history_only_state = S_(T-1) - D_T`：前一輪累積觀察到、但 final turn 未重現的 request-state dimensions。
- `endpoint_added_state = D_T - S_(T-1)`：首次在 final turn 出現的新 dimensions。
- `state_completeness = |D_T| / |S_T|`：只在有可觀察 dimensions 時報告 final turn 對累積 state 的 categorical coverage。
- `final_lexical_coverage = |V_T| / |V|`：final turn 的 user-side content vocabulary 相對全 session vocabulary；必須附上 length-matched null，避免把 turn 長度效果誤讀為 semantic drift。
- `best_single_turn_representation`：任何單一 user turn 對累積 state 的最高 coverage；不可把挑出的最佳 turn 當作真實使用者 query。

多輪來源在 670 個 English commercial multi-turn conversations 與 7,463 個 PRISM conversations 中，報告 final prompt median unique user-side vocabulary coverage 為 35.6%／36.4%，最多含 session vocabulary 一半的比例為 68.4%／74.3%；至少一個 request-state dimension 留在 history 而未出現在 final prompt 的比例為 50.3%／44.8%，有 dimension 的對話中完整重現 observed dimension set 的比例為 26.1%／26.2%，final prompt 新增此前未見 dimension 的比例為 17.9%／19.3%。這些是來源研究特定 cohort、規則與描述性結果，不是 xdxd 的重現或所有 AI-search session 的 prevalence。[^arxiv-prompt-state]

Web／App source-set difference 應作為獨立 strata；若做跨平台比較，另行控制平台、模型、入口、版本、rollout 與 conversation history policy。若要評估 history 對答案、品牌、來源、confidence 或 constraint satisfaction 的因果影響，應固定 final turn 與 model，至少 paired-run 比較 full interleaved history、user-turn-only history 與 isolated final turn；本頁的 request-state observation 本身不提供該因果效果。[^arxiv-prompt-state]

## 最小資料表

| 層級 | 必要欄位 |
|---|---|
| Session strata | engine、model、interface、region、language、topic、observation window、history policy |
| 查詢與執行 | conversation_id、turn_id、query／turn text、replication、run_at、run_id、prompt／設定 hash |
| Request state | cumulative state dimensions、state delta、history-only state、endpoint-added state、state completeness、length-matched null |
| 回答與引用 | response snapshot、retrieved source set、citation URL、normalized URL、domain、citation position、claim／source linkage |
| Exposure funnel | retrieved、used、cited、shown、supported、clicked、brand／entity exposure、contact-information exposure |
| Human outcome | trust in information／agent／interface、perceived credibility、search autonomy、usability、familiarity、presentation style、modality、personalization |
| 研究判定 | interface consistency、state sufficiency、source-set difference、uncertainty、stop decision、limitations |

欄位設計是 xdxd 的重現與稽核推論；來源研究只支持各自報告的 citation／source presentation 或 request-state measurement 設計與結果，不支持上述欄位已是平台標準 schema。[^arxiv-chinese-generative-search] [^arxiv-prompt-state]

## 待驗證事項

本頁整合十一份 arXiv 預印本來源，沒有 `verified`。研究設計、資料清理、平台介面、cue rules、統計分析、trust 量表、訪談編碼、browser parser、modality／search condition audit、state-aware paired rerun 與 publisher direct-search traffic replication 仍待 xdxd 取得可重現 protocol／data 後重現；不支持結構化內容、schema、短網址、crawler policy 或其他介入必然提高 citation、exposure、trust、referral 或 agent discoverability。SearchLog 的 Google／Bing technical validation、自然搜尋 logging 與 AI summary extraction 不能直接外推為其他引擎或公開 AI Search 的結果。健康資訊來源的樣本與其 Google／ChatGPT、文字／語音／具身介面設定，不能直接外推成公開 AI Search 的 ranking、retrieval 或 citation 效果。modality audit 的單一 OpenAI model family、BBQ／SafetyBench、logged-out chat UI／API 與單週 collection window 不能外推成所有部署介面的 accuracy、consistency、citation 或 abstention pattern；其 cited-source overlap 也沒有替代 source quality 或公開 Web funnel。Google field experiment 只操弄特定 Google Search AI feature exposure，沒有測試中間頁或內容 representation；其 ITT／LATE、compliance、七天 forced adoption 與 publisher／human outcome 不能直接外推為 GEO intervention、跨平台結果或長期 publisher revenue。新增 Wikipedia traffic quasi-experiment 也只提供特定 English／German／French Wikipedia、2024 default-AIO regime、Wikimedia `other-search` 與 reduced-form traffic evidence；其 language-as-geography proxy、非純 Google referral、未觀察 query-level AIO exposure 與 publisher／content-supply boundary 仍須保留。[^arxiv-search-agent-trust] [^arxiv-searchlog] [^arxiv-ai-search-publisher-referrals] [^arxiv-ai-search-summaries-traffic] [^arxiv-ai-benchmark-modality]

request-state 的透明 cue 會有 false positive／false negative，也不能從 transcript 單獨分辨 delayed disclosure、clarification、preference change 或 assistant influence；因此應保存規則版本、原始 response 與不可變 hash，並將 observation 與 causal answer-effect experiment 分開。[^arxiv-prompt-state]

與 [AI visibility measurement 的 rank stability 與 structural sufficiency](/methods/ai-visibility-measurement-convergence.md)、[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)、[生成式搜尋 crawlable commons 與來源生態永續性](/concepts/generative-search-corpus-sustainability.md)、[GEO 內容偵測與 citation URL audit](/methods/geo-content-detection-and-citation-audit.md) 及 [GEO 證據生命週期](/methods/evidence-lifecycle.md) 的分層原則銜接；更新時建立新 raw capture，不覆寫舊資料。

[^arxiv-searchlog]: Jiaman He, Riccardo Xia, Dana McKay, Damiano Spina, and Johanne R. Trippas, "SearchLog: A Web Browser Extension for Capturing Search Logs in Laboratory Studies," arXiv:2606.05040v1, submitted 2026-06-03. Source URL: <https://arxiv.org/abs/2606.05040>; immutable raw capture: [metadata](/raw/arxiv-searchlog-2026-08-26.md), [abstract HTML](/raw/arxiv-searchlog-2026-08-26/abstract.html), [official HTML](/raw/arxiv-searchlog-2026-08-26/paper.html), [paper PDF](/raw/arxiv-searchlog-2026-08-26/paper.pdf), and [API](/raw/arxiv-searchlog-2026-08-26/arxiv-api.xml).

[^arxiv-chinese-generative-search]: Tao Zhen, Yue Liu, Gege Zhang, and Yixuan Niu, "What Do Chinese-Language Generative Search Engines Cite and Surface? A Large-Scale Empirical Study," arXiv:2607.15771v1, submitted 2026-07-17. Source URL: <https://arxiv.org/abs/2607.15771>. Immutable raw capture: [metadata](/raw/chinese-generative-search-2026-08-26.md), [abstract HTML](/raw/chinese-generative-search-2026-08-26/abstract.html), and [paper PDF](/raw/chinese-generative-search-2026-08-26/paper.pdf).

[^arxiv-prompt-state]: Benjamin Tannenbaum, “The Prompt Is Not the Query: How Request State Evolves Across Multi-Turn AI Conversations,” arXiv:2607.22392v1, submitted 2026-07-24. Source URL: <https://arxiv.org/abs/2607.22392>. Immutable raw capture: [metadata](/raw/arxiv-prompt-state-2026-08-26.md), [official HTML](/raw/arxiv-prompt-state-2026-08-26/paper.html), [paper PDF](/raw/arxiv-prompt-state-2026-08-26/paper.pdf), and [arXiv API response](/raw/arxiv-prompt-state-2026-08-26/arxiv-api.xml).

[^arxiv-search-agent-trust]: Xin Sun, Rongjun Ma, Xiaochang Zhao, Janne Lindqvist, Jan de Wit, Zhuying Li, Abdallah El Ali, and Jos A. Bosch, “From Search Agents to Dissemination Interfaces: Understanding Human Trust in Health Information from Conversational Search,” arXiv:2608.21177v1, submitted 2026-08-21. Source URL: <https://arxiv.org/abs/2608.21177>. Immutable raw capture: [metadata](/raw/arxiv-search-agent-trust-2026-08-26.md), [official HTML](/raw/arxiv-search-agent-trust-2026-08-26/paper.html), [paper PDF](/raw/arxiv-search-agent-trust-2026-08-26/paper.pdf), and [arXiv API response](/raw/arxiv-search-agent-trust-2026-08-26/arxiv-api.xml).

[^arxiv-ai-search-economic-bargain]: Qiaoni Shi, Kai Zhu, and Kai Gu, “Answering Without Referring: How AI Search Rewrites the Web's Economic Bargain,” arXiv:2607.07652v1, submitted 2026-07-08. Source URL: <https://arxiv.org/abs/2607.07652>. Immutable raw capture: [metadata](/raw/arxiv-ai-search-economic-bargain-2026-08-26.md), [experimental HTML](/raw/arxiv-ai-search-economic-bargain-2026-08-26/paper.html), [paper PDF](/raw/arxiv-ai-search-economic-bargain-2026-08-26/paper.pdf), and [arXiv API response](/raw/arxiv-ai-search-economic-bargain-2026-08-26/arxiv-api.xml).

[^arxiv-citation-monoculture]: Sina Alemohammad, Denghui Zhang, Bolong Tang, Anthony Qin, Gengchen Mai, Ahmed Abbasi, Richard Baraniuk, and Zhangyang Wang, “When AI Writes, Who Gets Cited? Evidence of Citation Monoculture Across Language Models,” arXiv:2608.19230v1, submitted 2026-08-03. Source URL: <https://arxiv.org/abs/2608.19230>. Immutable raw capture: [metadata](/raw/arxiv-citation-monoculture-2026-08-26.md), [abstract HTML](/raw/arxiv-citation-monoculture-2026-08-26/abstract.html), [official HTML](/raw/arxiv-citation-monoculture-2026-08-26/paper.html), [paper PDF](/raw/arxiv-citation-monoculture-2026-08-26/paper.pdf), and [API response](/raw/arxiv-citation-monoculture-2026-08-26/arxiv-api.xml).

[^arxiv-ai-search-publisher-referrals]: Stephanie T. Wang, Jeffrey Gleason, Yakov Bart, Christo Wilson, and Danaé Metaxa, “AI in Search Reduces Publisher Referrals Without Improving User Experience: Experimental Evidence,” arXiv:2608.18352v1, submitted 2026-08-18. Source URL: <https://arxiv.org/abs/2608.18352>; immutable raw capture: [metadata](/raw/arxiv-ai-search-publisher-referrals-2026-08-26.md), [abstract HTML](/raw/arxiv-ai-search-publisher-referrals-2026-08-26/abstract.html), [paper HTML](/raw/arxiv-ai-search-publisher-referrals-2026-08-26/paper.html), [paper PDF](/raw/arxiv-ai-search-publisher-referrals-2026-08-26/paper.pdf), and [arXiv API](/raw/arxiv-ai-search-publisher-referrals-2026-08-26/arxiv-api.xml).

[^arxiv-ai-benchmark-modality]: Ro Encarnación, Tina Behzad, Emma Lurie, and Danaé Metaxa, “What Current AI Benchmarks Leave Unmeasured: Modality, Search, Citations, and Implications (for Safety Evaluations),” arXiv:2608.06202v1, submitted 2026-08-06. Source URL: <https://arxiv.org/abs/2608.06202>. Immutable raw capture: [metadata](/raw/arxiv-ai-benchmarks-unmeasured-2026-08-27.md), [abstract HTML](/raw/arxiv-ai-benchmarks-unmeasured-2026-08-27/abstract.html), [paper HTML](/raw/arxiv-ai-benchmarks-unmeasured-2026-08-27/paper.html), [paper PDF](/raw/arxiv-ai-benchmarks-unmeasured-2026-08-27/paper.pdf), [Atom API](/raw/arxiv-ai-benchmarks-unmeasured-2026-08-27/arxiv-api.xml), and [SHA-256](/raw/arxiv-ai-benchmarks-unmeasured-2026-08-27/sha256.txt).

[^arxiv-google-ai-overview-click-behavior]: Athena Chapekis, Anna Lieb, Sono Shah, and Aaron Smith, “Investigating Click Behaviors On Google Search Result Pages That Produce an AI Overview,” arXiv:2608.04831v1, submitted 2026-08-05. Source URL: <https://arxiv.org/abs/2608.04831>; immutable raw capture: [metadata](/raw/arxiv-google-ai-overview-clicks-2026-08-28/capture-metadata.json), [abstract HTML](/raw/arxiv-google-ai-overview-clicks-2026-08-28/abstract.html), [official HTML](/raw/arxiv-google-ai-overview-clicks-2026-08-28/paper.html), [paper PDF](/raw/arxiv-google-ai-overview-clicks-2026-08-28/paper.pdf), and [arXiv API](/raw/arxiv-google-ai-overview-clicks-2026-08-28/arxiv-api.xml).

[^arxiv-ai-search-summaries-traffic]: Mehrzad Khosravi and Hema Yoganarasimhan, “Impact of AI Search Summaries on Website Traffic: Evidence from Google AI Overviews and Wikipedia,” arXiv:2602.18455v5, first submitted 2026-02-05 and updated 2026-08-26. Source URL: <https://arxiv.org/abs/2602.18455v5>; immutable raw capture: [metadata](/raw/arxiv-ai-search-summaries-traffic-2026-08-29/capture-metadata.json), [abstract HTML](/raw/arxiv-ai-search-summaries-traffic-2026-08-29/abstract.html), [official HTML](/raw/arxiv-ai-search-summaries-traffic-2026-08-29/paper.html), [paper PDF](/raw/arxiv-ai-search-summaries-traffic-2026-08-29/paper.pdf), [arXiv API](/raw/arxiv-ai-search-summaries-traffic-2026-08-29/arxiv-api.xml), and [SHA-256](/raw/arxiv-ai-search-summaries-traffic-2026-08-29/sha256.txt).

[^arxiv-new-shape-of-search]: Michael Iannelli and Alan Ai, “The New Shape of Search: How Conversational AI Recomposes Information Seeking,” arXiv:2607.04282v3, first submitted 2026-07-05 and updated 2026-08-25. Source URL: <https://arxiv.org/abs/2607.04282v3>; immutable raw capture: [capture metadata](/raw/arxiv-new-shape-of-search-2026-08-29/capture-metadata.json), [abstract HTML](/raw/arxiv-new-shape-of-search-2026-08-29/abstract.html), [official HTML](/raw/arxiv-new-shape-of-search-2026-08-29/paper.html), [paper PDF](/raw/arxiv-new-shape-of-search-2026-08-29/paper.pdf), [arXiv API](/raw/arxiv-new-shape-of-search-2026-08-29/arxiv-api.xml), and [SHA-256](/raw/arxiv-new-shape-of-search-2026-08-29/sha256.txt).
