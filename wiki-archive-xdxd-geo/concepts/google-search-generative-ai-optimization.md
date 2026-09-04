---
type: Research Claim Set
title: Google 生成式 AI 搜尋的 GEO 研究基線
description: 從 Google Search Central 官方指南、AI features 文件、Review／AggregateRating structured-data guidelines、Site Reputation Policy 公告與 Bing 重複內容／AI Search 官方文章整理生成式 AI 搜尋的排序基礎、RAG／query fan-out、內容品質、review provenance、URL canonicalization、site-reputation 區域處分、可索引性、Search Console 觀測與明確否定的 GEO 迷思。
tags:
  - geo
  - google-search
  - generative-ai
  - ai-overviews
  - ai-mode
  - rag
  - query-fan-out
  - technical-seo
  - search-console
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T17:32:16.982851000Z
sources:
  - id: google-ai-search-guide
    resource: /raw/google-search-ai-optimization-guide.md
    title: Google Search Central 生成式 AI 搜尋最佳化指南（2026-08-21 raw capture）
    author: google/search-central
    last_modified: 2026-07-10
  - id: google-ai-features
    resource: /raw/google-search-ai-features-2026-08-25.md
    title: Google Search Central AI Features and Your Website（2026-08-25 raw capture）
    author: google/search-central
    last_modified: 2025-12-10
  - id: google-gen-ai-performance
    resource: /raw/google-search-generative-ai-performance-2026-08-25.md
    title: Google Search Generative AI performance reports 官方公告（2026-08-25 raw capture）
    author: google/search-central
    last_modified: 2026-06-03
  - id: bing-duplicate-ai-search
    resource: /raw/bing-duplicate-ai-search-2026-08-25.md
    title: Bing Webmaster Blog 重複內容與 AI Search 可見度官方文章（2026-08-25 raw capture）
    author: microsoft/bing-webmaster
    last_modified: 2025-12-19
  - id: googlebot-crawler-bytes
    resource: /raw/googlebot-crawling-bytes-2026-08-25.md
    title: Google Search Central Blog Googlebot 抓取、fetch 與 bytes 官方文章（2026-08-25 raw capture）
    author: google/search-central
    last_modified: 2026-03-31
  - id: google-canonicalization-troubleshooting
    resource: /raw/google-canonicalization-troubleshooting-2026-08-25.md
    title: Google Search Central canonicalization troubleshooting 官方文件（2026-08-25 raw capture）
    author: google/search-central
    last_modified: 2026-08-21
  - id: google-search-favicon-docs
    resource: /raw/google-search-favicon-2026-08-28.md
    title: Google Search favicon 官方文件（2026-08-28 raw capture）
    author: google/search-central
    last_modified: 2026-08-28
  - id: google-site-reputation-policy
    resource: /raw/google-site-reputation-policy-2026-08-28.md
    title: Google Search Central Blog Site Reputation Policy 更新（2026-08-28 raw capture）
    author: google/search-quality
    last_modified: 2026-08-28
  - id: google-review-snippet-docs
    resource: /raw/google-review-snippet-2026-08-28.md
    title: Google Search Central Review／AggregateRating structured data（2026-08-28 raw capture）
    author: google/search-central
    last_modified: 2026-07-24
  - id: google-ai-mode-travel-booking
    resource: /raw/google-ai-mode-travel-booking-2026-08-31.md
    title: Google Search「AI Mode 旅遊規劃與訂房」官方公告（2026-08-31 raw capture）
    author: google/search
    last_modified: 2026-08-27
  - id: arxiv-ai-search-content-ecosystem
    resource: /raw/arxiv-ai-search-content-ecosystem-2026-08-31.md
    title: "arXiv《The Impact of AI Search on the Online Content Ecosystem: Evidence from Google and Reddit》原始研究（2026-08-31 raw capture）"
    author: human:peibo-zhang-ruomeng-cui-dennis-zhang
    last_modified: 2026-06-20
  - id: google-search-docs-updates
    resource: /raw/google-search-docs-updates-2026-09-01.md
    title: "Google Search Central Search Docs updates 官方頁面與 RSS（2026-09-01 raw capture）"
    author: google/search-central
    last_modified: 2026-08-31
---

# Overview

本頁是 xdxd GEO 研究的 Google 官方基線，綜合 Google Search Central 的生成式 AI 搜尋最佳化指南，以及 2025-12-10 更新的 AI features 文件。兩份來源都把 AI Overviews 與 AI Mode 放在既有 Google Search、SEO 與品質系統中說明；本頁新增整理仍是 `status: draft`，尚未經人工審閱。[^google-ai-search-guide] [^google-ai-features]

## 1. 生成式搜尋仍以核心排序與品質系統為基礎

Google 明確表示，生成式 AI 功能仍建立在核心 Search ranking and quality systems 上；既有 SEO 最佳實務仍然相關。AI features 文件進一步表示沒有額外的 AI-specific appearance requirements 或特殊最佳化。這是研究設計上的基線：不能先假設 GEO 是一套脫離一般搜尋的獨立排名系統。[^google-ai-search-guide] [^google-ai-features]

## 2. RAG 與 query fan-out

官方指南把兩種 AI 技術列為從 Search index 取用內容的方式：[^google-ai-search-guide]

- **Retrieval-augmented generation（RAG／grounding）**：核心 Search 排序系統先從 Search index 擷取相關且較新的網頁；系統再檢視擷取頁面的特定資訊，生成較可靠、有用的回答，並顯示支持回答的可點擊網頁連結。
- **Query fan-out**：模型為了回應使用者原始問題，同時產生一組相關查詢，以取得更多資訊與額外搜尋結果。官方範例把「如何處理長滿雜草的草坪」拆成除草劑、非化學除草與預防雜草等相關查詢。

AI features 文件也說 AI Overviews 與 AI Mode 可能使用 query fan-out，並在生成回應時尋找更廣泛、更多元的 supporting links；兩者可能使用不同模型與技術，因此 responses 與 links 會變動，AI Overviews 也只在系統判斷對傳統 Search 有額外價值時顯示。這些是 Google 對平台行為的描述，不是對 xdxd 結果的保證。[^google-ai-features]

對 xdxd GEO 研究而言，這支持把「單一 prompt → 單一結果」視為不足的觀測模型：實驗應保留原始問題、可能的子查詢線索、結果頁與引用；後半句是研究方法上的推論，不是 Google 對 xdxd 系統的保證。

## 3. 非商品化、第一手與 people-first 內容

Google 指南稱，讓人覺得獨特、有吸引力且有用的內容，長期可能比其他建議更影響生成式 AI 搜尋中的呈現；它特別建議提供獨特觀點、自己根據經驗創作，而不是重述網路既有內容。官方用第一手評論作為個人經驗視角的例子，並區分一般常識式的商品化內容與超越常識、具專家或經驗取向的非商品化內容。[^google-ai-search-guide]

因此，xdxd 的內容介入實驗應把「第一手證據、獨特觀點、專業／經驗深度、helpful／reliable／people-first」作為可標記的內容變項；「被 AI 改寫得像答案」本身不能當成官方效果訊號。後一句是研究解讀，不是 Google 的直接承諾。

## 4. 技術可索引性與可抓取性

要有資格出現在 Google Search 的生成式 AI 功能中，頁面必須已被索引、且符合可在 Google Search 以 snippet 顯示的技術要求；AI features 文件明確補充沒有額外的技術要求。官方同時提醒，即使符合要求、最佳實務與政策，也不保證 Google 會抓取、索引或提供該內容。[^google-ai-search-guide] [^google-ai-features]

Google 建議維持允許 crawling、可由 internal links 找到、重要內容以文字呈現，並使 structured data 與頁面可見文字一致；它也說不需要完美的 semantic HTML。[^google-ai-features] 指南把 Google Search 找到及處理頁面的方式視為 AI 系統存取資料的核心，並建議維持公開、可抓取的內容；清楚的人類可讀結構仍有益於其他使用者與 Agent 導覽。[^google-ai-search-guide]

對 xdxd 研究而言，「可索引、可抓取、可呈現 snippet」應是前置條件與控制變項，而不是把任何後續引用結果歸因於 GEO 文案改寫；索引與服務不保證則應記錄為研究限制。

### 4.1 Googlebot 的 fetch byte budget 與 WRS 邊界

Google Search Central Blog 對 Googlebot 的第一方說明指出，Googlebot 是共用抓取基礎設施的其中一個 client；不同產品可使用不同 crawler name、user-agent 與 fetch 設定。[^googlebot-crawler-bytes] 文章目前描述 Googlebot 對單一 URL（PDF 除外）最多抓取 2MB，PDF 為 64MB；沒有另行指定限制的其他 crawler 預設為 15MB，而圖片／影片 crawler 的門檻依產品而異。這些是 Google Search crawler 的平台邊界，不是跨引擎或 AI Search 的通用規則。[^googlebot-crawler-bytes]

來源進一步描述，HTML 超過 2MB 時，前 2MB（包含 HTTP request headers）會被當成完整檔案交給 indexing systems 與 Web Rendering Service（WRS）；超過截點的 bytes 不會被抓取、render 或 index。WRS 會處理已抓到的 JavaScript、CSS 與 XHR 以理解頁面文字與結構，但只能執行 crawler 實際取得的 code；HTML 所引用的資源各自有獨立的 per-URL byte counter，且 WRS 在 request 間清除 local storage 與 session data。[^googlebot-crawler-bytes]

對 xdxd GEO 實驗而言，這支持把**實際 response bytes、HTTP headers、重要 metadata／canonical／structured data 在 HTML 中的位置、外部資源大小、render 結果與 server response time**列為 Google Search 抓取／索引前置觀測。Google 文章建議把重要元素放在 HTML 較前位置、將大型 CSS／JavaScript 移到外部資源，並監測 server logs；這些可作為可重現的技術控制或介入變項，但不能直接推導 AI Overviews、AI Mode、retrieval 或 citation 改善。來源也提醒 2MB limit 可能隨網路演進改變，研究須保存來源版本與擷取時間。[^googlebot-crawler-bytes]

## 4.2 Google Search favicon 的 hostname／抓取前置條件

Google Search Central 在 2026-08-28 更新的 favicon 文件說明，favicon 即使符合 guidelines，也不保證會出現在搜尋結果中；因此 favicon appearance 應和 ranking、retrieval、AI citation、答案位置及 click 分開記錄。文件把 site 定義為 hostname，並說一個 hostname 只支援一個 favicon；domain-level 與 subdomain-level home page 可分別支援，subdirectory-level home page 不可設定獨立 favicon。[^google-search-favicon-docs]

文件另要求 `Googlebot-Image` 能抓取 favicon 檔案，`Googlebot` 能抓取首頁，且兩者都不能被阻擋。favicon 應為 1:1 square、至少 8x8px；文件建議大於 48x48px，並明確列出 BMP、GIF、ICO、PNG、JPEG、PPM、TIFF 等支援格式。favicon URL 應保持穩定；不適當圖像可能被替換為預設 icon。這些是 Google Search 的資產抓取與呈現規則，不是對 AI Overviews、AI Mode 或其他生成式搜尋 citation／visibility 的效果估計。[^google-search-favicon-docs]

對 xdxd GEO 研究而言，若把 favicon 作為 source-presentation 或 brand-recognition 的 intervention／control，至少應保存 hostname、首頁與 favicon URL、`<link>` implementation、Googlebot／Googlebot-Image crawl permission、HTTP content type／bytes、asset hash、更新時間、實際 Search surface 與是否出現。即使 appearance 改變，也不能把它直接歸因於 retrieval、citation 或 GEO uplift；Google 文件本身沒有提供這些效果證據。這是依官方規則提出的研究欄位翻譯，不是來源對 xdxd 的效果承諾。

## 4.3 Site Reputation Policy 的區域與內容來源邊界

Google Search Central Blog 說明，Google 在 2024 年引入 Site Reputation Policy，以處理把第三方內容放在受信任網站上、只為利用該網站既有聲譽提高 Search 排名的做法；Google 將此描述為會傷害搜尋品質並造成不良使用者體驗的行為。[^google-site-reputation-policy]

公告指出，自 2026-08-30 起，該政策的 manual action 對 EEA 與非 EEA 搜尋者有不同效果：對 EEA 以外使用者，處分直接影響網站受影響的部分，網站其他部分不受影響；對 EEA 使用者，manual action 的影響不適用於搜尋結果，但受影響區段可能在 Google 系統中被分離，隨時間獨立排名。網站所有者仍會在 Search Console 收到通知，可提交 reconsideration request；符合資格者在申訴後也可能進入 mediation。[^google-site-reputation-policy]

這對 xdxd 是一項**研究設計推論**而非 AI Search 效果證據：任何把第三方來源轉成公開 resource page 的配對實驗，都應把內容來源／權利、原始網站與衍生頁的區段關係、使用者區域、頁面日期、Search surface、manual-action／reconsideration 狀態與 selected canonical 分開保存。不能把 EEA 的 Search 結果處分差異解讀成 AI Overviews、AI Mode 或其他 AI Search 的 ranking、retrieval、citation 或 GEO 行為必然相同。

對公開 AI 搜尋加速器命題而言，這個公告新增的風險邊界是：**把第三方內容放到受信任網域本身，不等於具備可公開索引或可引用的品質資格**。若頁面只是利用宿主網站聲譽，應維持 `draft`／unresolved，不得宣稱能提高 AI 可見度；Phase B 若要 opt in，仍須先證明授權、可辨識的獨特價值、來源揭露、更新責任與內容品質，再以區域化、長期配對資料觀察結果。以上產品與實驗要求是依官方政策做的風險翻譯，不是 Google 對 AI Search 的直接承諾。

## 4.4 Review／AggregateRating structured data 的品質與呈現邊界

Google Search Central 的 Review／AggregateRating 文件說明，review snippet 可能在 rich results 或 Knowledge Panels 顯示星級與其他 review 摘要；但實際搜尋呈現可能不同，且 Google 不保證消費 structured data 的功能一定顯示。文件要求被標記的 review content、rating 與對應 item 能在標記頁面上被使用者看見，review 應針對特定 item，而非 category 或 item list。[^google-review-snippet-docs]

文件的 guidelines 明確禁止在頁面或 structured data markup 中放入 fake reviews 或未揭露的 incentivized reviews；列舉的例子包括不基於真實產品／服務體驗的 reviews，以及以金錢、折扣、優惠券或免費產品換取、但未清楚且醒目揭露激勵關係的 reviews。對 local business／organization，文件另列 self-serving review、ratings 必須直接來自使用者，以及不得依靠 human editors 建立、整理或彙編 ratings 的限制；違反 guidelines 可能導致 manual action。[^google-review-snippet-docs]

對 xdxd GEO 研究而言，review structured data 應被視為 Search appearance eligibility／source-presentation 的條件與控制變項，不是 AI Search 成效訊號。若公開 resource page 包含 review 或 rating，實驗至少應保存 review source、item identity、頁面可見文字、aggregate 計算、incentive disclosure、頁面版本與實際 Search surface；這是依官方文件做的研究設計推論。應把 markup 是否可解析、rich-result 是否出現、AI Overview／AI Mode 是否引用、答案中的 claim support 與 click 分開量測，不能因為通過 Rich Results Test 或符合 guideline 就宣稱公開 AI Search visibility、citation 或 GEO uplift。

## 4.5 AI Mode 的 application-side action surface 與交易完成邊界

Google 2026-08-27 的第一方公告描述 AI Mode 新增航班價格追蹤、航班／飯店點數或里程成本顯示，以及對話式飯店訂房；公告列出合作夥伴、地區 rollout、`Continue on Google`、Google Pay 與 merchant-of-record 邊界。[^google-ai-mode-travel-booking]

這筆證據可把 AI Mode 從「回答中提供 supporting links」之外，標記為一個**application-side action surface**：使用者在對話中表達需求，系統呈現合作夥伴資料，並可能把流程交給合作夥伴或在 Google 介面內完成訂房。這是依第一方產品描述做的研究分類，不是 Google 對 agentic discoverability、任務完成率或 GEO 的承諾。[^google-ai-mode-travel-booking]

對 xdxd 而言，這要求把 `candidate_exposed`、`retrieved`、`used_in_answer`、`cited`、`shown`、`clicked` 與 `action_started`、`action_completed` 分開記錄；訂房完成不能被當作 citation、ranking 或 GEO uplift 的替代指標。若做 paired observation，至少固定 Search surface、query／對話、地區／語言、登入與會員狀態、partner handoff、booking outcome、錯誤與時間戳。以上是研究設計推論；來源沒有提供 xdxd 可重現的 live trace 或因果估計。

## 4.6 AI Search outcome 依內容類型與介面而變

一篇原始研究以 Reddit 的 SFW／NSFW exposure contrast 估計 Google AI Overviews 對內容平台 engagement 的來源特定效果。作者建立 `105,012` 個 subreddit 的平衡 panel，使用 2024-08-15 國際 rollout 作為主要 treatment date，並以 subreddit／day fixed effects 估計。其報告的 SFW 相對 NSFW effect size 是 daily comments `12.0%`、daily comment authors `12.4%`；這些數字可作為來源在其 cohort、Google surface、日期與 identification assumptions 下的 evidence，不是現行 Google 或其他引擎的通用 uplift。[^arxiv-ai-search-content-ecosystem]

來源另以 Gemini 3 Flash 將 subreddit 分成 search goods 與 experience goods，報告 experience-good 相對 search-good 的 treatment effect 約為 comments `2.3×`、comment authors `2.8×`；其解釋是 static AI summary 可能同時具有替代與 discovery 作用，且討論／個人經驗的價值較難由摘要取代。這是來源指定內容分類、模型與 triple-difference protocol 的 observational evidence，分類本身沒有由 xdxd 獨立人工標註。[^arxiv-ai-search-content-ecosystem]

來源再比較 2025-08-21 global AI Mode rollout 前後的 experience-good premium，報告 comments 由 `9.54` 變為 `−0.17`、comment authors 由 `6.29` 變為 `2.57`，對應 `102%` 與 `59%` attenuation。這可補強本頁既有的 interface／source-presentation 分層：static summary、conversation、content engagement、citation、shown、click 與 referral 不能合併為單一 GEO outcome；來源的 post-AI-Mode observation window 有限，介面解釋仍需保留為 protocol-bound inference。[^arxiv-ai-search-content-ecosystem]

因此，xdxd 的跨介面觀測可在既有 [跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md) 之外，增加 `content_type`、`ai_overview_present`、`ai_mode_available`、`platform_engagement` 與 `outbound_referral`，並與 `crawled`、`indexed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開。這是依來源建立的 draft protocol，不是 structured content、schema、robots、crawler access 或其他 GEO intervention 的效果證明。[^arxiv-ai-search-content-ecosystem]

## 4.7 官方更新紀錄是 freshness／版本證據，不是演算法變更證據

Google Search Central 的官方 Search documentation updates 頁面與 RSS 在 2026-08-31 記錄 EEA Search Dataset Licensing Program 頁面更新，理由是刷新 program overview、eligibility criteria 與 application details；這與本頁已保存的 dataset program snapshot 是同一變更脈絡，但更新紀錄本身不提供 xdxd eligibility、資料交付或 dataset schema。[^google-search-docs-updates]

同一份更新紀錄在 2026-08-28 說明 favicon 文件改為明列支援格式，並指出 Google Search 的支援格式沒有改變；同日也記錄 site reputation policy 的 EEA enforcement approach 調整。2026-08-20 的條目則記錄 Preferred Sources 文件新增 custom interactive button 指引。[^google-search-docs-updates] 這些條目可作為來源 refresh、snapshot version、policy-date 與 linked-page provenance 的官方時間訊號，但不能被解讀為 Search ranking、AI Overview／AI Mode retrieval、citation selection 或 GEO outcome 的 live evidence。

對 xdxd 研究而言，應保存 changelog URL、RSS／HTML representation、`pubDate`、HTTP `Last-Modified`、payload hash、被更新的 canonical URL，以及該 linked page 的獨立 snapshot。`documentation_changed`、`policy_changed` 與 `product_behavior_observed` 必須分開，並與 `crawled`、`indexed`、`retrieved`、`used_in_answer`、`citation_entails`、`shown`、`clicked` 分層；這是依官方更新紀錄建立的 draft freshness protocol，不是 Google 對公開 AI 搜尋效果的承諾。

## 5. Google 明確否定的 GEO 迷思

以下是來源頁面明確列為不需要、不可當作 Google Search 特殊訊號的做法：[^google-ai-search-guide] [^google-ai-features]

- **`llms.txt` 與其他特殊標記**：不需要為 Google Search 建立新的機器可讀檔、AI text file、特殊 markup 或 Markdown；AI features 文件也明確說不需要專用 schema.org structured data 才能出現在這些功能。自行為其他服務維護此類檔案，不能據此推論 Google Search 的可見度或排名改變。
- **強制「chunking」內容**：沒有要求把內容切成極小片段供 AI 理解；Google 系統可以理解同一頁的多個主題並顯示相關片段。沒有理想頁面長度，頁面長短應依受眾與主題決定。
- **只為 AI 改寫內容**：不需要為生成式 AI 搜尋採用特定寫法；AI 系統能理解同義詞與一般語意，不必為了每個 long-tail keyword 或每種查詢變體重寫內容。

來源頁面另指出，生成式 AI 搜尋不要求特殊的 structured data 或特別的 schema.org markup；這不等於 structured data 對整體 SEO 或 rich results 沒有用途。[^google-ai-search-guide] [^google-ai-features]

## 6. Search Console 觀測邊界

AI features 文件的 2025-12-10 版本說，出現在 AI Overviews 或 AI Mode 的網站表現納入 Search Console 的整體 Search traffic，並在 `Web` search type 中呈現；這是產品報表範圍的官方描述，不是獨立 citation rate、答案位置、排名或因果改善指標。[^google-ai-features]

KB 另有 2026-06-03 的 Google Search Generative AI performance reports 公告，描述 Search 與 Discover 的專用 generative-AI 報表與欄位。兩份來源有不同頁面日期與產品語境，研究資料應保存來源版本並分開標記 appearance／visibility、citation、click 與其他 outcome，不把它們合併成單一指標。[^google-ai-features] [^google-gen-ai-performance]

## Bing 的跨引擎 URL canonicalization 觀測邊界

Microsoft Bing Webmaster Blog 的官方文章表示，重複或近重複 URL 本身不會自動造成網站處罰，但可能使搜尋引擎用來選擇 URL 的訊號分散、讓非預期版本被呈現，並增加 crawler 處理重複頁的成本；文章建議用 canonical、redirect、hreflang、noindex、metadata 一致性與 IndexNow 協助收斂偏好的 URL。[^bing-duplicate-ai-search]

文章另以第一方平台觀點描述 AI Search：近重複頁可能被 AI 系統聚成群組並選出代表頁，且頁面意圖差異不足時，系統較難判斷哪個版本符合查詢。這些敘述可轉成 xdxd 的**研究控制與假說**：保存 URL 變體、canonical／redirect／hreflang／noindex 狀態、IndexNow 通知、頁面版本與最終被 retrieval／citation 的 URL；但不可把單一 Bing 文章當成跨引擎的 clustering 實作證明，也不可推導 canonical 或 IndexNow 必然提升排名、retrieval、citation 或 agent discoverability。[^bing-duplicate-ai-search]

## Google duplicate cluster 的 canonical 重新評估邊界

Google Search Central 的 canonicalization troubleshooting 文件指出，即使網站明確指定 canonical page，Google 仍可能因內容品質或 technical signals 選擇不同的 canonical；排查流程包括用 URL Inspection 確認 Google 選擇的 canonical、檢查 technical canonicalization issues，以及確認被聚類的頁面具有足夠差異。文件目前說明，修正內容問題後，Google 可能讓頁面留在 duplicate cluster 最長約兩週；新內容與同群組頁面的差異清楚且顯著時，通常較快分離。[^google-canonicalization-troubleshooting]

這為 xdxd GEO 的 URL identity／canonical 實驗增加一個**平台明示的時間控制變項**：實驗應保存 duplicate cluster 狀態、Google 選擇的 canonical、preferred canonical、內容差異、URL Inspection／重新索引請求時間與後續觀測時間；不能在介入後立即把 citation、retrieval 或 visibility 的變化歸因於 canonical 修正。此文件仍只支持 Google Search canonicalization 與 indexing re-evaluation 邊界，不支持 AI Overviews、AI Mode、跨引擎或 agent discoverability 效果推論。

## 研究使用邊界

- 本頁是 Google 第一方來源的 draft claim set，不是 Google 排名公式，也不是 GEO 排名保證；本輪沒有新增人工驗證。
- `query fan-out`、內容變項、前置條件與控制變項如何落地到 xdxd 實驗，是研究設計推論；每次實驗仍須保存 prompt、response、citation 與 crawl／index observation。
- 平台文件對 supporting links、Search Console 或較高品質點擊的描述，不能直接推導公開搜尋 ranking、retrieval、citation 或因果改善；需要跨引擎、跨時間與固定 query 的原始觀測。
- Googlebot 的 2MB HTML fetch、WRS 與資源限制只支持記錄 Google Search 的 crawling／rendering 前置邊界；不能當成 AI Overviews、AI Mode、跨引擎 retrieval、citation 或 agent discoverability 的效果證據。後續實驗應把 byte budget、HTML 元素位置與 render／index observation 分開保存。[^googlebot-crawler-bytes]
- 原始證據與授權資料位於 [Google 生成式 AI 搜尋指南 raw capture](/raw/google-search-ai-optimization-guide.md)、[Google AI features raw capture](/raw/google-search-ai-features-2026-08-25.md) 與 [Bing 重複內容／AI Search raw capture](/raw/bing-duplicate-ai-search-2026-08-25.md)；不可變 body 分別是 [指南 snapshot](/raw/google-search-ai-optimization-guide-2026-08-21/snapshot.html)、[AI features snapshot](/raw/google-search-ai-features-2026-08-25/snapshot.html) 與 [Bing snapshot](/raw/bing-duplicate-ai-search-2026-08-25/snapshot.html)。
- 本輪新增的 [Google AI Mode 旅遊規劃與訂房 raw wrapper](/raw/google-ai-mode-travel-booking-2026-08-31.md) 保存官方公告的 metadata、忠實摘要、claim ledger、HTTP headers 與 fetched body digest；因未發現明確開放再散布授權，未保存完整文章 HTML 或圖片。它支持 application-side action surface 的產品描述，不支持公開 crawler、index、ranking、retrieval、citation、referral、click 或 GEO uplift。
- 本輪新增的 Googlebot 原始證據見 [Googlebot bytes raw capture](/raw/googlebot-crawling-bytes-2026-08-25.md)，不可變 body 見 [Googlebot snapshot](/raw/googlebot-crawling-bytes-2026-08-25/snapshot.html)。
- 本輪新增的 Google canonicalization troubleshooting 原始證據見 [raw capture](/raw/google-canonicalization-troubleshooting-2026-08-25.md)，不可變 body 見 [canonicalization snapshot](/raw/google-canonicalization-troubleshooting-2026-08-25/snapshot.html)。
- 本輪新增的 Google Site Reputation Policy 公告原始證據見 [raw capture](/raw/google-site-reputation-policy-2026-08-28.md)，不可變 body 見 [Site Reputation Policy snapshot](/raw/google-site-reputation-policy-2026-08-28/snapshot.html)，HTTP metadata 見 [headers](/raw/google-site-reputation-policy-2026-08-28/response-headers.txt)。

[^google-ai-search-guide]: Google Search Central, “Google's Guide to Optimizing for Generative AI Features on Google Search,” page updated 2026-07-10 UTC. Source URL: <https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>. Immutable raw capture: [metadata](/raw/google-search-ai-optimization-guide.md) and [HTML snapshot](/raw/google-search-ai-optimization-guide-2026-08-21/snapshot.html).
[^google-ai-features]: Google Search Central, “AI Features and Your Website,” page updated 2025-12-10 UTC. Source URL: <https://developers.google.com/search/docs/appearance/ai-features>. Immutable raw capture: [metadata](/raw/google-search-ai-features-2026-08-25.md) and [HTML snapshot](/raw/google-search-ai-features-2026-08-25/snapshot.html).
[^google-gen-ai-performance]: Google Search Central Blog, “Introducing Search Generative AI performance reports in Search Console,” published 2026-06-03. Source URL: <https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports>. Immutable raw capture: [metadata](/raw/google-search-generative-ai-performance-2026-08-25.md).
[^bing-duplicate-ai-search]: Microsoft Bing Webmaster Blog, “Does Duplicate Content Hurt SEO and AI Search Visibility?”, published 2025-12-19. Source URL: <https://blogs.bing.com/webmaster/December-2025/Does-Duplicate-Content-Hurt-SEO-and-AI-Search-Visibility>. Immutable raw capture: [metadata](/raw/bing-duplicate-ai-search-2026-08-25.md) and [HTML snapshot](/raw/bing-duplicate-ai-search-2026-08-25/snapshot.html).
[^googlebot-crawler-bytes]: Google Search Central Blog, “Inside Googlebot: demystifying crawling, fetching, and the bytes we process,” published 2026-03-31. Source URL: <https://developers.google.com/search/blog/2026/03/crawler-blog-post>. Immutable raw capture: [metadata](/raw/googlebot-crawling-bytes-2026-08-25.md) and [HTML snapshot](/raw/googlebot-crawling-bytes-2026-08-25/snapshot.html).
[^google-canonicalization-troubleshooting]: Google Search Central, “Fix Canonicalization Issues,” last updated 2026-08-21 UTC. Source URL: <https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting>. Immutable raw capture: [metadata](/raw/google-canonicalization-troubleshooting-2026-08-25.md) and [HTML snapshot](/raw/google-canonicalization-troubleshooting-2026-08-25/snapshot.html).
[^google-search-favicon-docs]: Google Search Central, “Define Website Favicon for Search Results,” last updated 2026-08-28 UTC. Source URL: <https://developers.google.com/search/docs/appearance/favicon-in-search>. Immutable raw capture: [metadata](/raw/google-search-favicon-2026-08-28.md), [HTML snapshot](/raw/google-search-favicon-2026-08-28/snapshot.html), and [HTTP headers](/raw/google-search-favicon-2026-08-28/response-headers.txt).
[^google-site-reputation-policy]: Google Search Central Blog, “Update to the Site Reputation Policy,” 2026-08-28. Source URL: <https://developers.google.com/search/blog/2026/08/update-site-reputation-policy>. Immutable raw capture: [metadata](/raw/google-site-reputation-policy-2026-08-28.md), [HTML snapshot](/raw/google-site-reputation-policy-2026-08-28/snapshot.html), and [HTTP headers](/raw/google-site-reputation-policy-2026-08-28/response-headers.txt).
[^google-review-snippet-docs]: Google Search Central, “Review snippet (Review, AggregateRating) structured data,” last updated 2026-07-24. Source URL: <https://developers.google.com/search/docs/appearance/structured-data/review-snippet>. Immutable raw capture: [metadata](/raw/google-review-snippet-2026-08-28.md), [HTML snapshot](/raw/google-review-snippet-2026-08-28/snapshot.html), and [HTTP headers](/raw/google-review-snippet-2026-08-28/response-headers.txt).
[^google-ai-mode-travel-booking]: Google Search, “3 new ways to plan and book travel in Search,” published 2026-08-27. Source URL: <https://blog.google/products-and-platforms/products/search/book-travel-ai-mode/>; immutable wrapper: [metadata and claim ledger](/raw/google-ai-mode-travel-booking-2026-08-31.md), [capture metadata](/raw/google-ai-mode-travel-booking-2026-08-31/capture-metadata.json), [HTTP headers](/raw/google-ai-mode-travel-booking-2026-08-31/response-headers.txt), and [fetched-response digest](/raw/google-ai-mode-travel-booking-2026-08-31/sha256.txt). Full article body is not retained under the stated rights boundary.

[^arxiv-ai-search-content-ecosystem]: Peibo Zhang, Ruomeng Cui, and Dennis J. Zhang, “The Impact of AI Search on the Online Content Ecosystem: Evidence from Google and Reddit,” arXiv:2605.16428v3, submitted 2026-05-14, revised 2026-06-20. Source URL: <https://arxiv.org/abs/2605.16428>; immutable raw capture: [capture metadata](/raw/arxiv-ai-search-content-ecosystem-2026-08-31/capture-metadata.json), [abstract HTML](/raw/arxiv-ai-search-content-ecosystem-2026-08-31/abstract.html), [experimental HTML](/raw/arxiv-ai-search-content-ecosystem-2026-08-31/paper.html), [paper PDF](/raw/arxiv-ai-search-content-ecosystem-2026-08-31/paper.pdf), and [arXiv API](/raw/arxiv-ai-search-content-ecosystem-2026-08-31/arxiv-api.xml). The source reports Google AI Overviews／AI Mode and Reddit engagement estimates under its own cohort and identification protocol; it does not test xdxd representation or GEO interventions.
[^google-search-docs-updates]: Google Search Central, “Search documentation updates,” canonical URL: <https://developers.google.com/search/updates>; official RSS: <https://developers.google.com/search/updates/search_docs_updates.rss>. Immutable raw capture: [wrapper](/raw/google-search-docs-updates-2026-09-01.md), [HTML](/raw/google-search-docs-updates-2026-09-01/source.html), [RSS](/raw/google-search-docs-updates-2026-09-01/search_docs_updates.rss), and [capture metadata](/raw/google-search-docs-updates-2026-09-01/capture-metadata.json). The record supports documentation freshness and version provenance, not live ranking, retrieval, citation, or GEO effects.
