---
type: Platform Entity
title: Perplexity Agent API／MCP／Pro Search：citation surface 與 runtime 更新
description: Perplexity 官方 migration、benchmark、changelog、Agent API Models、Agent API Web Search、Pro Search、Pro Search Quickstart、Router API、model-catalog、Sonar Prompt Guide、Stream Mode 與 Sonar Deep Research 文件記載的 Sonar→Agent API lifecycle、BrowseComp／DSQA／WideSearch benchmark surface、typed output／SSE／search_results、presets、inline citations、MCP、web-search／fetch_url_content tools、reasoning_steps、`pro`／`fast`／`auto` search classification、concise／full stream_mode、Deep Research model／source-coverage／token pricing surface、reasoning／search／cost chunk boundary、filters、context budget、rate limits、billing units、多 deployment routing、automatic failover、stream reliability、多 provider model pricing、priority service tier、fallback chain、model catalog、allowlist、user／system message 的搜尋／回答分工與 grounding prompt guidance；不等同公開 AI Search 或 GEO 效果證據。
resource: https://docs.perplexity.ai/docs/resources/changelog
tags:
  - entity
  - perplexity
  - agent-api
  - mcp
  - citation
  - source-presentation
  - prompt-caching
  - agent-discoverability
  - sonar-api
  - structured-output
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-30T23:46:57Z
sources:
  - id: perplexity-agent-api-mcp
    resource: /raw/perplexity-agent-api-mcp-2026-08-31.md
    title: Perplexity MCP 官方文件（2026-08-31 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-23
  - id: perplexity-agent-api-presets
    resource: /raw/perplexity-agent-api-presets-2026-08-31.md
    title: Perplexity Agent API Presets 官方文件（2026-08-31 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-21
  - id: perplexity-changelog
    resource: /raw/perplexity-agent-api-changelog-2026-08-28.md
    title: Perplexity Changelog 官方文件（2026-08-28 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-agent-web-search
    resource: /raw/perplexity-agent-api-web-search-2026-08-29.md
    title: Perplexity Agent API Web Search 官方文件（2026-08-29 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-29
  - id: perplexity-pro-search-tools
    resource: /raw/perplexity-pro-search-tools-2026-08-29.md
    title: Perplexity Pro Search Built-in Tool Capabilities 官方文件（2026-08-29 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-rate-limits-usage-tiers
    resource: /raw/perplexity-rate-limits-usage-tiers-2026-08-29.md
    title: Perplexity Rate Limits & Usage Tiers 官方文件（2026-08-29 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-agent-api-migrate-from-sonar
    resource: /raw/perplexity-agent-api-migrate-from-sonar-2026-08-29.md
    title: Perplexity Migrate from Sonar to the Agent API 官方文件（2026-08-29 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-agent-api-migrate-how-to
    resource: /raw/perplexity-agent-api-migrate-how-to-2026-08-30.md
    title: Perplexity How to migrate from Sonar 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-29
  - id: perplexity-agent-api-benchmarks
    resource: /raw/perplexity-agent-api-benchmarks-2026-08-30.md
    title: Perplexity Agent API vs Sonar benchmarks 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-29
  - id: perplexity-async-sonar-post
    resource: /raw/perplexity-async-sonar-post-2026-08-30.md
    title: Perplexity Create Async Chat Completion 官方 API 文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-29
  - id: perplexity-async-sonar-get
    resource: /raw/perplexity-async-sonar-get-2026-08-30.md
    title: Perplexity Get Async Chat Completion 官方 API 文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-29
  - id: perplexity-router-routing-reliability
    resource: /raw/perplexity-router-routing-reliability-2026-08-30.md
    title: Perplexity Router API Routing & Reliability 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-30
  - id: perplexity-router-models
    resource: /raw/perplexity-router-models-2026-08-30.md
    title: Perplexity List Models Router API 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-27
  - id: perplexity-sonar-post
    resource: /raw/perplexity-sonar-chat-completion-2026-08-30.md
    title: Perplexity Create Chat Completion 官方 API 文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-agent-api-models
    resource: /raw/perplexity-agent-api-models-2026-08-30.md
    title: Perplexity Agent API Models 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-sonar-prompt-guide
    resource: /raw/perplexity-sonar-prompt-guide-2026-08-30.md
    title: Perplexity Sonar Prompt Guide 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-sonar-stream-mode
    resource: /raw/perplexity-sonar-stream-mode-2026-08-30.md
    title: "Perplexity Stream Mode: Concise vs Full 官方文件（2026-08-30 raw capture）"
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-agent-define-the-run
    resource: /raw/perplexity-agent-api-define-the-run-2026-08-30.md
    title: Perplexity Agent API Define the run 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-25
  - id: perplexity-agent-api-output-control
    resource: /raw/perplexity-agent-api-output-control-2026-08-30.md
    title: Perplexity Agent API Output Control 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-22
  - id: perplexity-sonar-pro-search-quickstart
    resource: /raw/perplexity-sonar-pro-search-quickstart-2026-08-30.md
    title: Perplexity Pro Search Quickstart 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-pro-search-classifier
    resource: /raw/perplexity-pro-search-classifier-2026-08-30.md
    title: Perplexity Pro Search Classifier 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-sonar-deep-research
    resource: /raw/perplexity-sonar-deep-research-2026-08-31.md
    title: Perplexity Sonar Deep Research 官方文件（2026-08-31 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
---

# Entity

Perplexity 官方 changelog 是一個版本化但未逐項標示日期的第一方產品 surface。此次 snapshot 最直接補上 Agent API／MCP 的 citation 與 runtime 觀測欄位；它不是公開搜尋引擎排名或 GEO uplift 的測量。[^perplexity-changelog]

## Sonar Prompt Guide：搜尋 seed 與回答政策的分工

Perplexity 官方 Sonar Prompt Guide 說明，Sonar 先執行 Web search，再生成回答；只有 user message 會驅動搜尋，system prompt 不會被搜尋讀取，而是在結果已取得後影響回答生成。文件因此要求把 user message 同時當作給模型的問題與搜尋 seed，並以具體、描述性的問題取代模糊提問。這是 Perplexity 對 Sonar interface 的第一方描述，不是本 KB 已完成的 live request 或獨立 retrieval benchmark。[^perplexity-sonar-prompt-guide]

System prompt 的適用範圍是 tone、style 與 grounding rules，而不是搜尋指令；文件建議明確允許模型在結果不足時說明找不到答案，並揭露只有相關但不完全匹配的 near-miss。文件也列出共通 prompting rules：限制所需結果數量、不把完整答案內容 few-shot 給搜尋階段、不要求模型在回答 prose 中輸出 URL，以及以 parameters 而非 prose 表達 filters。這些是產品使用 guidance，不是跨平台標準或已證明的 citation／GEO uplift。[^perplexity-sonar-prompt-guide]

若將此 surface 納入 xdxd 的 Agent Reader 或自有／明確授權 corpus paired run，應保存 `user_message_hash`、`system_prompt_hash`、query／filter parameters、model／route、source snapshot、request／response hash、搜尋結果、`search_triggered`、`candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown` 與 `clicked`；並配對比較具體／模糊 user message、有／無 grounding policy 與不同 near-miss policy。這是依官方文件提出的 draft research translation，不是 Perplexity 宣布的 GEO schema；不可把 user-message wording guidance 推導成公開 AI Search ranking、citation、source presentation、referral 或 click 效果。[^perplexity-sonar-prompt-guide]

## Sonar Chat Completion：request／response contract

Perplexity 官方 API reference 以 OpenAPI 3.1 描述 Sonar API 的 `POST /v1/sonar`，要求 bearer authentication，成功 response 為 `200`，validation failure 為 `422`。Request 必須包含 `model` 與 `messages`；文件列出 `sonar`、`sonar-pro`、`sonar-deep-research`、`sonar-reasoning-pro`，並提供 `stream`／SSE、`response_format`（`text` 或 `json_schema`）、sampling、停止序列與最多 128,000 completion tokens 的 schema 欄位。這是文件所述 endpoint contract，不是本 KB 已完成的 authenticated live request。[^perplexity-sonar-post]

同一份 schema 描述 web search configuration：`web_search_options` 可指定 search context、`fast`／`pro`／`auto` search type 與 `user_location`；request 另有 `search_mode`（`web`、`academic`、`sec`）、`disable_search`、`enable_search_classifier`、domain／language／recency／publication-date／last-updated filters、image／related-question options 與 preferred response language。這些是 request-level controls，不是公開搜尋內部 ranking 或本輪 live search 結果。[^perplexity-sonar-post]

Completion response schema 要求 `id`、`model`、`created` 與 `choices`，並可包含 `citations` URL array、`search_results`、images 與 related questions。`ApiPublicSearchResult` 可帶 `title`、`url`、`date`、`last_updated`、`snippet` 與 `source`（`web` 或 `attachment`）；文件把 `citations` 描述為產生 response 所用來源 URLs，把 `search_results` 描述為 response context 所用搜尋結果。這補強 API-level source-presentation parser 的欄位邊界，但不等於 claim-level support、citation entailment、UI shown 或 click。[^perplexity-sonar-post]

Usage schema 可記錄 prompt／completion／total tokens、search context、citation tokens、`num_search_queries`、reasoning tokens 與 input／output／request／citation／search-query／total USD cost。頁面頂端的 deprecation notice 表示 Sonar Chat Completions 現在轉向 Agent API，並寫明 Sonar 支援至 `2026-09-27`；這是文件版本的 lifecycle 訊號，不是本 KB 對所有帳戶、endpoint 或 migration 已完成的獨立驗證。[^perplexity-sonar-post]

若將 Sonar route 納入 Agent Reader 或自有／明確授權 corpus paired run，應固定 endpoint、model、messages、search mode／context、filters、response format、request／response hash、usage receipt、latency、retry 與 citation parser，並把 `retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開保存。文件 schema 不支持公開 AI Search 或 GEO 成效結論；產品判斷仍是 **Known-URL Agent Reader 可先驗證；公開 AI 搜尋加速器仍需端到端 evidence。**

## Sonar→Agent API migration surface

最新 migration 文件將 Sonar Chat Completions 與 Agent API 的 lifecycle、request／response shape 與功能邊界放在同一頁。文件標示 Sonar 支援至 `2026-09-27`，並建議既有使用者遷移、新專案採用 Agent API；這是 Perplexity 對自身產品的第一方 lifecycle 描述，不是本 KB 對每個帳戶或 endpoint 已完成切換的獨立驗證。[^perplexity-agent-api-migrate-from-sonar]

文件列出 Agent API 的 built-in web search、URL fetching、sandbox、MCP、finance／people search、task-intensity presets（`fast`／`low`／`medium`／`high`／`xhigh`）、Open Responses compatibility 與 multi-turn response continuation。這些可作為 Agent Reader／跨介面實驗的 route、tool、preset、state 與 portability 變項；文件本身沒有提供 xdxd live request、tool trace、usage receipt 或跨引擎結果。[^perplexity-agent-api-migrate-from-sonar]

在 response shape 上，文件以 Sonar `messages`／`choices` 對照 Agent API `input`／typed `output` array，並以 `message` item 承載回答、`search_results` item 承載來源。這補強可解析的 typed-output／source-presentation surface；研究上仍須把 `search_results` identity、URL、citation marker、claim support、citation entailment、shown 與 click 分開，不可把 output item 存在視為來源主張已被正確支持或實際呈現。[^perplexity-agent-api-migrate-from-sonar]

文件也以 Perplexity internal benchmarks 描述 Sonar→Agent API preset mapping 與效能／品質改善，並稱 `xhigh` 為最高品質 preset。這些屬平台自報的比較性主張；未提供足以重現的完整 benchmark data、query panel、model／prompt／tool configuration 或 usage receipt，故在 xdxd 維持 `partially-supported`／`observational`，不外推為公開搜尋或 GEO uplift。[^perplexity-agent-api-migrate-from-sonar]

若納入本 entity 的研究，除既有 request／tool／result／citation funnel 外，應固定 Sonar／Agent route、preset、model alias、reasoning effort、tool sequence、typed output parser、response hash、文件 snapshot、migration state 與 lifecycle date；並將 `candidate_exposed`、`retrieved`、`opened`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分層。此 migration 文件沒有公開 crawler log、index state、內容介入對照或 GEO outcome，因此產品判斷不變：**Known-URL Agent Reader 可先驗證；公開 AI 搜尋加速器仍需端到端 evidence。**[^perplexity-agent-api-migrate-from-sonar]

## Migration how-to：trace、搜尋與 citation parser surface

最新 how-to 將 migration 拆成 endpoint／method、`messages`→`input`、typed output、streaming、web search、inline citations、preset、background run 與 parameter mapping；同頁 deprecation notice 仍標示 Sonar 支援至 `2026-09-27`。這是 Perplexity 對自身 migration contract 的第一方描述，不是本 KB 對每個帳戶、endpoint 或 SDK 版本已完成切換的獨立驗證。[^perplexity-agent-api-migrate-how-to]

文件建議把請求移到 `/v1/agent`、由 `chat.completions.create()` 改為 `responses.create()`，把 `messages` 改成 `input`，並以 `response.output_text` 取得回答；文件並稱 `output` array 可記錄搜尋、搜尋結果、sandbox 執行程式與產生的檔案。Streaming 則由 Sonar 的 `delta.content` 轉為 typed SSE events：回答文字使用 `response.output_text.delta`，tool call 與 reasoning 使用各自的 `response.output_item.*` 與 `response.reasoning.*` events。這補強 Agent-facing trace 的可觀測欄位，但不是 xdxd 已執行的 live trace。[^perplexity-agent-api-migrate-how-to]

Web search 在 Sonar 是固定開啟；在 Agent API 必須把 `web_search` 放入 request 的 `tools`，否則模型可不搜尋而直接以自身知識回答。Sonar 的 top-level `search_recency_filter` 與 `search_domain_filter` 在 Agent API 移到 `web_search.filters`。對 citation，文件描述 `fast`／`low`／`medium`／`high` presets 已包含 source-backed claim 的 inline markers，其中 `fast` 使用 numbered markers（例如 `[1]`），其餘使用 source-typed markers（例如 `[web:1]`）；自訂 configuration 則應在 instructions 要求引用實際使用的 web-search result。Markers 直接嵌入 answer text，來源則在 `output` 的 `search_results` item 中，以 result `id` 對應 marker。這是可解析的 source-presentation surface，不是 claim-level entailment、citation correctness、shown 或 click 的保證。[^perplexity-agent-api-migrate-how-to]

Migration guidance 建議 `sonar`→`fast`、`sonar-pro`→`low`、`sonar-reasoning-pro`→`medium`、`sonar-deep-research`→`high`；async migration 對應為 `background: true` 的 background run，再按 response id polling。參數表也把 filters、`search_context_size`、`user_location`、`max_results` 與 `reasoning.effort` 對應到 Agent API tool／field，並指出 `stream_mode` 改為 typed SSE、images／videos 沒有等價物。這些是 contract mapping，仍需由 live request、SDK version 與 usage receipt 驗證實際行為；不應外推為品質、成本或 GEO uplift。[^perplexity-agent-api-migrate-how-to]

## Agent API vs Sonar benchmarks

Perplexity 另以同一官方 workload 比較 Agent API presets 與 Sonar models，涵蓋 BrowseComp（Accuracy）、DSQA／DeepSearchQA（F1）與 WideSearch（F1）。頁面宣稱 Agent API presets 位於 Sonar 的 quality／cost curve 之上，並指出 BrowseComp、WideSearch 等多步任務的高階 preset 分數高於 Sonar 最佳模型；這是 Perplexity 對自身 benchmark 的第一方描述，不是 xdxd 重現或跨引擎效果證據。[^perplexity-agent-api-benchmarks]

頁面內嵌資料列出 protocol-bound score／cost，例如 BrowseComp 的 Sonar `Deep Research` 為 `29.10`、`$0.611` per request，Agent API `high` 為 `79.67`、`$0.7776`；DSQA 為 `48.94`、`$0.5656` 對 `85.86`、`$0.5278`；WideSearch 為 `19.42`、`$0.5815` 對 `63.86`、`$0.9390`。這些可作 route／preset／quality／cost 的分層與 parser fixture，但頁面沒有完整 query panel、資料切分、模型／tool configuration、統計不確定性、raw output 或 usage receipt，故維持 `partially-supported`／`observational`，不能外推為通用成本優勢或 GEO uplift。[^perplexity-agent-api-benchmarks]

文件提供 Sonar→Agent API 的起點式 mapping：Sonar→`fast`、Sonar Pro→`low`、Sonar Reasoning Pro→`medium`、Sonar Deep Research→`high`，並另建議 state-of-the-art deep research 使用 `xhigh`；同頁要求使用者以自己的 traffic 確認。研究上應把 benchmark name／metric、route、preset、model alias、reasoning、tool sequence、query／source snapshot、response hash、usage／cost、latency 與 `candidate_exposed`→`retrieved`→`opened`→`used_in_answer`→`claim_supported`→`citation_entails`→`cited`→`shown`→`clicked` 分開保存。[^perplexity-agent-api-benchmarks]

這筆 benchmark evidence 不改變目前產品判斷：**Known-URL Agent Reader 可先驗證；公開 AI 搜尋加速器仍需端到端 evidence。** Perplexity 的 benchmark score、preset recommendation 與 migration contract 不能替代公開 crawler、index、ranking、retrieval、citation、source presentation、referral 或 click observation。

## Async Sonar endpoint：非同步執行、搜尋狀態與 usage receipt surface

Perplexity 的官方 API reference 另以 OpenAPI 3.1 描述 `POST /v1/async/sonar`：request body 必須包含要非同步執行的 chat completion request，可帶 `idempotency_key` 防止重複請求；response 以 async id、model、created／started／completed／failed timestamps、status 與 completion 或 error 欄位表達執行狀態。這是產品 contract 的第一方描述，不是本 KB 已完成的 authenticated live request 或 polling 重現。[^perplexity-async-sonar-post]

schema 的 status enum 為 `CREATED`、`IN_PROGRESS`、`COMPLETED`、`FAILED`。其 Sonar request model enum 包含 `sonar`、`sonar-pro`、`sonar-deep-research`、`sonar-reasoning-pro`，並公開 messages、streaming、`response_format`（text／JSON Schema）、web／academic／sec search mode、search-context／type、domain／language／recency／date filters、image／related-question 與 preferred-language 欄位。這補強 route、configuration、structured-output 與 asynchronous state 的觀測維度；不表示每個帳戶、SDK 或版本均具有相同可用性。[^perplexity-async-sonar-post]

完成 response 可包含 `citations` URL array、`search_results`（title、url、publication／last-updated date、snippet、source type）、images、related questions，以及拆分的 prompt／completion／citation／search-query／reasoning token 與 USD cost 欄位；usage 還有 `num_search_queries`。研究上應把這些 contract fields 與實際搜尋結果、claim support、citation entailment、shown、click 和 GEO outcome 分開，不能把 schema 中的 citation／search result presence 當作品質或公開搜尋效果證據。[^perplexity-async-sonar-post]

若在 xdxd 的 Agent Reader 或自有／明確授權 corpus 研究，應固定 endpoint、model、request／idempotency key、query、messages、response format、search mode、context size／type、filters、source snapshot、response hash、async timestamps、polling／retry、usage、`num_search_queries`、cost、latency 與 citation parser，並記錄 `candidate_exposed`→`retrieved`→`opened`→`used_in_answer`→`claim_supported`→`citation_entails`→`cited`→`shown`→`clicked`。這是依官方 schema 整理的 draft research translation，不是 Perplexity 宣布的 GEO schema。

## Async Sonar GET endpoint：單筆 polling、完成 response 與 usage receipt

Perplexity 的另一份官方 API reference 描述 `GET /v1/async/sonar/{api_request}`，以 path 中的 async request identifier 取得指定非同步 chat completion 的 response；文件列出 bearer authentication、`200` 的 `AsyncApiChatCompletionsResponse` 與 `422` validation error。這補上既有 POST endpoint 之後的單筆 polling contract，但不是本 KB 已完成的 authenticated live request 或 polling 重現。[^perplexity-async-sonar-get]

GET 回應 required fields 是 `id`、`model`、`created_at` 與 `status`；可選的 `started_at`、`completed_at`、`failed_at`、`error_message` 與 `response` 用來表示處理時間、失敗訊息與完成結果。status enum 為 `CREATED`、`IN_PROGRESS`、`COMPLETED`、`FAILED`。這可作為 Agent Reader 的 async lifecycle parser fixture，但不支持實際轉移時間、retry／timeout 行為或失敗率。[^perplexity-async-sonar-get]

完成的 `response` 可包含 `choices`、`citations`、`search_results`、images 與 related questions；`search_results` 的 result 至少有 title／url，並可帶 publication date、last-updated date、snippet 與 `web`／`attachment` source type。`usage` 可拆 prompt／completion／total tokens、search context、citation／reasoning tokens、`num_search_queries` 與 input／output／request／citation／search-query／total USD cost。這些是 response schema，不是 live usage receipt、citation correctness、UI shown 或 click evidence。[^perplexity-async-sonar-get]

此 GET schema 也允許 completion message 以字串或 text／image／file／PDF／video structured chunks 表示，video URL 可帶 `frame_interval`；頁首仍標示 Sonar Chat Completions 將支援至 `2026-09-27`，並連到 Agent API migration guide。若與 [Create Async Chat Completion raw capture](/raw/perplexity-async-sonar-post-2026-08-30.md) 配對，研究應保存 POST request／idempotency key、GET identifier、polling interval、retry／timeout、status timestamps、response／source hash、usage／cost 與 citation parser，且將 `retrieved`、`used_in_answer`、`citation_entails`、`shown`、`clicked` 分開。[^perplexity-async-sonar-get]

## 文件記載的 Agent API surface

- **Preset model／runtime contract**：changelog 記錄 `fast` preset 使用 `openai/gpt-5.6-luna`、`minimal` reasoning 與 priority processing，並記錄 `low` preset 的模型、reasoning 與 maximum-output 更新。動態 preset 會自動採用更新；frozen configuration 則需要依文件的 current preset values 手動同步。[^perplexity-changelog]
- **Inline citation marker**：文件把 `fast` 的 search-result citations 描述為 numbered markers（例如 `[1]`），把 `low`、`medium`、`high` 的 tool-result／provided-artifact citations 描述為 source-typed markers（例如 `[web:1]`），並聲稱成功 tool call 後後三者的 final answer 至少有一個 citation。這是可被 response parser 觀測的 surface，不是 claim-level citation entailment 的保證。[^perplexity-changelog]
- **Prompt caching**：Agent API presets 自動使用穩定 prompt cache keys，使同 preset 的獨立 request 可重用 system prompt 與 tool definitions 的 shared prefix；explicit `prompt_cache_key` 可覆寫預設值。文件的約 5% cost reduction 是條件式平台自報數字，不是 xdxd 的成本實驗。[^perplexity-changelog]
- **Model／route change as confound**：同一 query 若跨 changelog snapshot、preset、model、reasoning effort 或 `service_tier`，不能直接把 response／citation 差異歸因於 source representation 或 prompt；應將 preset values、model alias、reasoning、service tier、price table 與 snapshot hash 一起保存。[^perplexity-changelog]

## Web Search tool contract

最新 Web Search 文件把 Agent API 的 `web_search` 定義為 request 內由模型呼叫的 web-grounded search tool；啟用方式是在 `tools` array 加入 `type: "web_search"`，何時呼叫則依 prompt 與 instructions 決定。這是 Perplexity 自有 Agent API 的第一方 interface 描述，不是公開 AI Search ranking 或 GEO uplift 證據。[^perplexity-agent-web-search]

文件列出會隨版本更新的 named search-context budgets：`low` 為 300／300、`medium` 為 1,000／1,000、`high` 為 4,000／4,000，分別對應 `max_tokens` 與 `max_tokens_per_page`。若要固定成本、延遲或 evaluation budget，可改用 explicit token caps；文件稱 explicit values 會覆寫 named budget，並依實際消耗的 search-context tokens 計費。這些是文件版本的設定與 billing 描述，尚未由本 KB authenticated request、usage receipt 或帳單重現。[^perplexity-agent-web-search]

Web Search 也提供 domain、recency、publication／last-updated date 與 `user_location` filters。`search_domain_filter` 最多接受 20 個 domain 或 URL，且 allowlist 與 denylist 不可混用；`search_recency_filter` 支援 hour、day、week、month、year，日期範圍 filter 使用 `MM/DD/YYYY`。`user_location` 可含 ISO country、region、city、latitude 與 longitude，座標必須和 country 一起提供。[^perplexity-agent-web-search]

Response 可在 final assistant message 之前提供 `search_results` item，result 具有 `id`、canonical `url`、`title`、`snippet`、`date`、`last_updated` 與 `source` 欄位。文件指出 inline citation marker 是否出現取決於 prompt，result `id` 與 `url` 才是 citation 的 source of truth；因此它可作為 parser 的 source-presentation surface，但不能直接當作 claim-level entailment、shown、click 或使用者品質證據。[^perplexity-agent-web-search]

## Pro Search built-in tools 與 trace visibility

Perplexity 的 Pro Search 文件把 `web_search` 與 `fetch_url_content` 定義為由模型自動使用的兩個 built-in tools；模型決定何時使用，文件並稱 custom tools 不能註冊。這補充 Agent API Web Search 的 request-level tool contract，但仍只是 Perplexity 對自身產品的第一方描述。[^perplexity-pro-search-tools]

文件稱 streaming response 的 `reasoning_steps` array 會呈現所有 tool executions，使整合者可以觀察模型如何研究 query。`web_search` 與 `fetch_url_content` 的示例都保留 result 的 `title`、`url`、`date`、`last_updated`、`snippet`、`source` 等欄位；這些是可供 parser 使用的 tool／result metadata，不是本 KB 已執行的 live trace，也不等於 claim-level citation entailment 或終端使用者看到的 citation。[^perplexity-pro-search-tools]

Pro Search 文件也以示例描述多工具工作流：`web_search` → `fetch_url_content` → 再次 `web_search`。研究時應把這種 illustrative workflow 與實際 request trace 分開，保存每個 tool call、result identity、response hash 與 parser version；不能把文件示例外推為每個 query 的必然行為或品質提升。[^perplexity-pro-search-tools]

同一頁的 deprecation notice 標示 Sonar Chat Completions 已轉向 Agent API，Sonar 支援至 `2026-09-27`，並提供 migration guide。這是文件版本的生命週期訊號；跨 Sonar／Agent API 的比較必須把 route、model、prompt、tool surface 與文件 snapshot 一起保存，且不得把 deprecation notice 解讀成公開搜尋或 GEO 效果證據。[^perplexity-pro-search-tools]

若要把 Pro Search 的 trace surface 納入 xdxd 已知 URL Agent Reader 或自有／明確授權 corpus 實驗，除既有的 request／tool-call／source artifact／citation 欄位外，應新增 `reasoning_steps`、`web_search`／`fetch_url_content` tool type、multi-tool sequence、URL fetch target、search result metadata 與 Sonar／Agent route lifecycle；並持續把 `candidate_exposed`、`retrieved`、`opened`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開。這是依官方 surface 整理的 draft research translation，不是 Perplexity 宣布的 GEO schema。[^perplexity-pro-search-tools]

## Pro Search Quickstart：streaming gate、auto classification 與 pricing controls

Perplexity 的 Pro Search Quickstart 把 Pro Search 定義為 Sonar Pro 上的 automated tool usage／multi-step reasoning 模式，涉及 web search 與 URL content fetching，並列出 dynamic tool execution、real-time thought streaming 與 adaptive research strategies。這是 Perplexity 自身產品的第一方 interface description，不是 xdxd 對公開搜尋排名或 GEO 成效的獨立測量。[^perplexity-sonar-pro-search-quickstart]

Quickstart 明確寫出 Pro Search 只有在 streaming 啟用時才會運作；non-streaming request 會 fallback 到 standard Sonar Pro。手動啟用需 `stream: true` 與 `web_search_options.search_type: "pro"`，regular Sonar Pro 的預設 search type 為 `"fast"`。因此在 Pro／Fast 對照中，route、stream flag 與 search type 都是不能省略的 request controls；本 KB 尚未執行 live fallback check。[^perplexity-sonar-pro-search-quickstart]

同一文件也描述 `search_type: "auto"` 會依 query complexity 在 Pro Search 與 Fast Search 間自動分類：multi-step、comparative、deep-research 類 query 被列為 Pro Search 例子，simple fact lookup、direct retrieval、basic QA 則被列為 Fast Search 例子。文件列出按 search type／context size 區分的 request fees 與 input／output token rates；這些是時間化產品／計費描述，不是 classifier threshold、live billing 或品質的獨立驗證。[^perplexity-sonar-pro-search-quickstart]

若把此 surface 納入 Agent Reader 或自有／明確授權 corpus 的 paired run，應保存 Quickstart snapshot hash、route、model、`stream`、`search_type`、query、context size、filters、classification result、request／response hash、tool trace、usage／cost、latency 與 retry／rate-limit state；並把 `candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開。`auto` 與手動 `pro`／`fast` 應作為不同 arms，不能把官方分類 guidance 推導成公開 AI Search ranking、citation 或 GEO uplift。[^perplexity-sonar-pro-search-quickstart]

若要把這個 surface 納入 xdxd 的已知 URL Agent Reader 或自有／明確授權 corpus 實驗，應固定並保存：文件 snapshot hash、model／preset、query／query count、named 或 explicit token budgets、filters、`max_results`、citation instruction、response body／hash、result `id`／URL／metadata、tool-call invocation、usage／cost、latency 與 retry／rate-limit 狀態；並把 `candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開。這是依官方欄位整理的 draft research translation，不是 Perplexity 宣布的 GEO schema。[^perplexity-agent-web-search]

文件另記載 `web_search` 每 1,000 次 invocation 收費 `$2.50`，模型 token 另計，並受 Agent API tier rate limits 約束。這些是時間化產品與計費資料；本次未執行 live API 或核對帳單，因此不應外推為 xdxd 成本、延遲或 citation outcome。[^perplexity-agent-web-search]

## Pro Search Classifier：query complexity routing 與可觀測成本分層

Perplexity 官方 **Pro Search Classifier** 文件把 `search_type: "auto"` 定義為 query-routing control：系統依子問題／面向數量、比較分析需求、多步推理需求與資訊 synthesis complexity，在 Pro Search 與 Fast Search 之間選擇。文件把 Pro Search 描述為自動使用 `web_search`／`fetch_url_content` 的多步工具模式，把 Fast Search 描述為 single-pass search and synthesis；這是 Perplexity 的第一方介面描述，不是本 KB 的 live request 或公開搜尋排名證據。[^perplexity-pro-search-classifier]

文件列出的 illustrative patterns 將多部分比較、跨多篇研究的 synthesis、以及時間敏感且需多來源核對的分析歸為 Pro Search 情境；單一事實、單一產品資訊、單一主題解釋與基本定義歸為 Fast Search。這些分類模式是官方 guidance，不是跨 query population 的 accuracy estimate。[^perplexity-pro-search-classifier]

`pro`／`fast` 仍可手動覆寫；文件建議一般先使用 `auto`、監看分類模式，在有明確效能／成本需求或要比較兩種模式時再手動指定。文件也提供 response metadata 範例，包含 `search_type_used`、`classification_reason` 與 usage token fields；這些欄位尚未由 xdxd 以 authenticated request 或完整 schema 驗證。[^perplexity-pro-search-classifier]

文件列出的 pricing comparison 是兩種模式相同的 input `$3`／1M tokens、output `$15`／1M tokens；Pro request fee 為 `$14–$22`／1,000 requests，Fast request fee 為 `$6–$14`／1,000 requests，依 context size 區分。這是文件版本的產品／計費描述，不是帳戶 tier、live billing 或成本效果證據。文件另自述 classifier 以數千 query patterns 訓練、在毫秒內完成且對歧義 query 偏向 Pro Search，但沒有提供訓練資料、confusion matrix 或 latency distribution；此部分維持 observational。[^perplexity-pro-search-classifier]

頁首 deprecation notice 表示 Sonar Chat Completions 已轉向 Agent API，並寫明 Sonar 支援至 `2026-09-27`；這是時間化的官方 lifecycle 訊號，不是本 KB 對帳戶 access、endpoint 或 migration 狀態的 live 驗證。[^perplexity-pro-search-classifier]

### 對 xdxd 的 paired protocol 翻譯

若將此 surface 納入 Agent Reader 或自有／明確授權 corpus，應對同一 query panel 配對 `auto`、強制 `pro` 與強制 `fast`，並按單一事實、單一主題、多部分比較、研究 synthesis、時間敏感分析分層。每次 run 應保存 route／endpoint、model、stream flag、query／prompt hash、search type、`search_type_used`、`classification_reason`、tool sequence、result identity、usage／cost、latency、error／retry、SDK／client version 與 source snapshot hash；若比較成本，另保存 account／tier 與 billing receipt。

Outcome 仍須分開記錄 `candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked`。不能以 classifier route、citation 欄位存在或 response metadata 代替公開 Web 的 crawler、index、ranking、citation、referral 或 click evidence。這是依官方文件提出的 draft research translation，不是 Perplexity 宣布的 GEO schema；目前產品判斷仍為：**Known-URL Agent Reader 可先驗證；公開 AI 搜尋加速器仍需端到端 evidence。** 原始文件與不可變 payload 見 [Pro Search Classifier raw capture](/raw/perplexity-pro-search-classifier-2026-08-30.md)。[^perplexity-pro-search-classifier]

## Rate-limit、billing unit 與可重現性控制

Perplexity 的 Rate Limits & Usage Tiers 文件把 Agent API 的限制拆成兩個獨立門檻：API-wide QPS 與 Agent model requests-per-minute（RPM）。文件列出的 Tier 0–5 QPS／RPM 為 `1/50`、`3/150`、`8/500`、`17/1,000`、`33/4,000`、`33/8,000`；這是 Perplexity 文件所述的 tiered product contract，不是本 KB 對任何帳戶或 live endpoint 的驗證。[^perplexity-rate-limits-usage-tiers]

同一份文件把 Search API 與 usage tier 分開：`POST /search` 為每秒 50 query units、burst capacity 50；single-query 消耗一個 unit，multi-query 依陣列中的 query 數消耗 units。文件明確區分 billing 與 rate limiting：一個含五個 query 的成功 request 可算一個可計費 Search API request，但消耗五個 rate-limit units。這使 query count、request count、burst、tier 與 billing unit 成為跨 run 比較時不可省略的控制欄位。[^perplexity-rate-limits-usage-tiers]

文件另描述 Router／rate limiter 的 `429`、`Retry-After`、不計費 rejected request 與 leaky-bucket 行為，並標示 Sonar Chat Completions 支援至 2026-09-27、應轉向 Agent API。若要在 xdxd 的自有／明確授權 corpus 做 Perplexity 觀測，應保存 route、model／preset、tier／帳戶條件、query count、request／billing units、burst、429／retry-after、response hash、usage、latency 與 citation funnel；這些產品限制不能被解讀為 citation quality、ranking 或 GEO 效果。[^perplexity-rate-limits-usage-tiers]

## Router API：deployment routing、failover 與 stream reliability

Perplexity 的 Router API 文件目前標示為 private preview。文件說明同一個 model id 可能由多個 underlying deployment 提供服務；client 只送 model id，routing、health monitoring 與 failover 由平台自動決定，沒有可由請求端設定的 routing parameter 或 per-provider configuration。回應會 echo requested model id，billing 依該 model 的 published rates，不因實際 deployment 改變。因此 requested model id 不能當作 served deployment identity 或 provider-level receipt。[^perplexity-router-routing-reliability]

當一個 model 有多個 deployment，平台依 error rate、capacity 與 latency 等 observed health 持續調整 weighted split；降級 deployment 會減少流量，恢復時逐步取回。Multi-turn conversation 在可能時維持同一 deployment，使相同 conversation prefix 可以繼續受益於 prompt caching。這些隱藏的 deployment、健康度與 cache 狀態都是跨 run 比較的潛在 confound；文件沒有提供每筆 request 的 served-deployment identifier 或 routing weight。[^perplexity-router-routing-reliability]

Provider error、rate limit 或 timeout 可觸發其他 deployment 的 automatic retry，每個 attempt 受 time-to-first-token 與 total-duration limits 約束；invalid request 或 context overflow 等 deterministic client error 立即回傳 `400`，不跨 deployment 重試；全部 deployment 失敗時回傳 `429` 與 `Retry-After`，在尚未產生 output 前失敗的 request 不計費。Streaming 若在首 token 前失敗可被透明 failover，首 token 後失敗則以 in-band error event 結束，未正常終止的 stream 必須視為 incomplete，並按實際 delivered tokens 計費。這是官方 contract 描述，不是 xdxd 已完成的 authenticated live trace、retry／failover 或 failure-rate 驗證。[^perplexity-router-routing-reliability]

若將 Router surface 納入 Agent Reader 或跨引擎 paired run，應保存 requested model id、model-catalog snapshot、Router／Agent／Search route、request／response timestamp、conversation prefix、service tier、SDK／client version、request／response hash、首 token時間、total duration、HTTP status、`Retry-After`、retry／failover observation、stream completion／in-band error、usage／delivered tokens、cost、cache state 與 query／source snapshot。served deployment 若不可得應記為 `unknown`，不可用 requested model id 代替；並持續將 `candidate_exposed`、`retrieved`、`used_in_answer`、`citation_entails`、`cited`、`shown`、`clicked` 分開。[^perplexity-router-routing-reliability]

## Router model catalog：allowlist、pricing 與可重現性 snapshot

Perplexity 的官方 API reference 以 OpenAPI 3.0.3 描述 `GET /router/v1/models`，列出可透過 Router 使用的模型，依 model id 排序；文件並說明每個 model 的 `pricing` 含 USD per 1M tokens 的 base token prices。文件把 response list 定義為 Router allowlist：不在 response 中的 model 不能被 request。這是文件版本的 API contract，不是本 KB 已取得的 live model list。[^perplexity-router-models]

`Model` schema 要求 `id`、`object`、`created`、`owned_by` 與 `pricing`；`id` 是 public model slug，`owned_by` 是 slug 的 provider prefix。`ModelPricing` 可包含 `input`、`output`、`cache_write`、`cache_read` 與 `unit`，其中 `unit` 為 `usd_per_1m_tokens`，input／output／unit 為 required。這些欄位可作為 model-catalog parser 與時間化 pricing snapshot，但 `owned_by` 是 schema 的 provider prefix，不是每筆 request 的 served deployment receipt。[^perplexity-router-models]

若將 catalog 納入 Agent Reader 或自有／明確授權 corpus 的 paired run，應保存 catalog response body／hash、capture time、model id、`created`、`owned_by`、pricing snapshot、帳戶／tier、Router／Agent／Search route、SDK／client version、served deployment（若平台不暴露則記為 `unknown`）、usage／cost、latency、retry／failover 與 query／source snapshot。應把 model catalog membership、candidate exposure、retrieval、used-in-answer、citation entailment、shown 與 click 分開；不得以 requested model id、provider prefix 或 pricing table 取代 live deployment／usage receipt。這是依官方 schema 整理的 draft research translation，不支持公開 AI Search ranking、citation 或 GEO uplift。[^perplexity-router-models]

原始文件與不可變 payload 見 [Perplexity List Models raw capture](/raw/perplexity-router-models-2026-08-30.md)。本次未執行 authenticated `GET`，未驗證特定帳戶的 catalog membership 或 Router private-preview access，也沒有取得 served deployment identity、routing weight、搜尋 coverage、citation correctness、shown／click denominator 或內容介入結果。[^perplexity-router-models]

## Define the run：preset、instructions、loop bound 與 model fallback

Perplexity 官方 **Define the run** 文件把 Agent API run 的設定拆成 preset、system prompt、loop bound 與 model；`preset` 將 model、system prompt、search configuration 與 tools 綁成單一起點，之後可用 individual settings 覆寫。這是 Perplexity 對自身 Agent API 的第一方 interface 描述，不是 xdxd 對公開搜尋品質或 GEO 成效的獨立測量。[^perplexity-agent-define-the-run]

文件將 `instructions` 定義為 agent 的 system prompt，承載每輪適用的 role、tone、citation 與 grounding rules；設定後會取代 preset 的 system prompt，而不是附加。文件也建議保持 system prompt 精簡，因為每一步 tool call 都會重新處理；machine-readable output 或 retrieval constraints 應優先以 request parameters 表達。這些是 configuration semantics，不是 citation correctness 或公開搜尋效果保證。[^perplexity-agent-define-the-run]

`max_steps` 是 agent loop 上限；一個 step 是一次可能包含 tools 的 model turn。達到上限時，agent 仍以目前已收集內容做 final pass；`max_steps: 1` 可能執行 direct tool，但不能回到下一輪推理，且需要 setup turn 的 tool 可能完全不執行。直接指定 `model`／`models` 而沒有 preset 時，文件說省略 `max_steps` 預設為 1。[^perplexity-agent-define-the-run]

文件區分單一 `model` 與最多五個模型的 `models` fallback chain；兩者同時存在時 `models` 優先，並建議需要固定 engine 時使用明確 model 或 models，而非只依賴會隨版本更新的 preset。對 xdxd 的 Agent Reader 或自有／明確授權 corpus paired run，這支持把 preset snapshot、`instructions` hash、`max_steps`、model／fallback chain、tool trace 與 final-pass state 列為控制欄位；仍須將 `candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown` 與 `clicked` 分層。後一句是研究設計翻譯，不是 Perplexity 宣布的 GEO schema。[^perplexity-agent-define-the-run]

這筆來源補強 Agent API runtime configuration 的可重現性，但沒有 authenticated request、usage receipt、served-deployment identity、實際 fallback trace、公開 crawler log、index state、citation entailment、shown／click denominator 或內容介入對照。因此產品判斷不變：**Known-URL Agent Reader 可先驗證；公開 AI 搜尋加速器仍需端到端 evidence。**

## Presets：動態／凍結配置與 run reproducibility

Perplexity 官方 **Presets** 文件把 Agent API preset 定義為 model、search config、reasoning steps、system prompt 與 available tools 的預配置組合，並把 `fast-search`→`fast`、`pro-search`→`low`、`deep-research`→`medium`、`advanced-deep-research`→`high`、`ultra`→`xhigh` 改為 tier-based names；另列出 `wide-research` 的大型 evidence-backed collection 用途。這是 Perplexity 的第一方 runtime／使用情境描述，不是 xdxd 的品質、coverage 或 task-completion 測量。[^perplexity-agent-api-presets]

文件區分 dynamic preset 與 frozen configuration：以 preset name 呼叫 dynamic preset 會採用最新推薦 configuration，underlying model／tools／system prompt／parameters 可隨平台更新；複製 current preset values 並省略 `preset` 則形成文件所稱的 frozen configuration，以固定當下的 request setup。文件也說 dynamic preset 會使用穩定的 `prompt_cache_key` 作為 shared prompt prefix，request-level key 可覆寫預設值。這補上既有 `Define the run` 的 preset snapshot 與 model／fallback controls；「固定」限於保存的 configuration values，不代表 served deployment 或未來服務行為永久不變。[^perplexity-agent-api-presets]

文件明確寫出 preset 沒有 explicit versioning：同一名稱會解析到最新設定，更新目標是維持接近的 cost／latency profile 並改善 quality。因而跨時間、跨 route 或跨 representation 的 paired run 不能只保存 `preset` name；應保存 current-values snapshot／payload hash、model、tools、system prompt／instructions hash、prompt cache key、reasoning、`max_steps`、search budget、request／response hash、usage、latency 與 capture time。這是依官方 contract 提出的 draft research translation，不是 Perplexity 宣布的 GEO schema。[^perplexity-agent-api-presets]

「Current preset values」區段提供各 tier 的 model、prompt cache key、max steps、reasoning effort、max output tokens、tools、search result limit、system prompt 與部分 fetch／search processing：文件示例中的 `fast` 是 `max_steps: 1`、`web_search`、`max_results: 10`；`low` 是 `max_steps: 5`、`web_search`＋`fetch_url`、`max_results: 15`；`medium`／`high` 是更深的 web search／fetch URL；`xhigh` 是 `max_steps: 100`、`web_search`／`finance_search`／`sandbox`。文件另說 request fields 通常覆寫 defaults，但 `tools` 按 tool merge；搜尋深度可用 `web_search.max_tokens` 與 `max_tokens_per_page` 控制。這些是可作 parser fixture 與 route-control snapshot 的文件值，不是本 KB authenticated live request 或 served-deployment receipt。[^perplexity-agent-api-presets]

若把此 surface 納入 Agent Reader 或自有／明確授權 corpus paired run，應對 dynamic preset 與 frozen configuration 配對，固定 query panel、source snapshot、route、model、tool sequence、prompt cache key、instructions／system prompt、reasoning、max steps、search／fetch budget、SDK／client version、request／response hash、usage／cost、latency、retry 與 citation parser；並把 `candidate_exposed`、`retrieved`、`opened`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開。文件的 current values、inline citation instructions 或 dynamic preset recommendation 不能替代 live trace、claim-level entailment、UI shown、click 或公開 GEO outcome。[^perplexity-agent-api-presets]

原始文件與不可變 payload 見 [Perplexity Agent API Presets raw capture](/raw/perplexity-agent-api-presets-2026-08-31.md)。

## Agent API Models：provider、pricing 與 fallback

Perplexity 的 Agent API Models 官方文件把 Agent API 描述為可直接使用多個 provider 的模型，並列出 provider group、model id、input／output／cache-read rate 與部分長上下文 token threshold。文件宣稱價格按月更新、反映 first-party provider pricing 且無 markup，實際費用按 token consumption 計算，response 會帶 exact token counts；這是平台自報的文件與 pricing contract，不是本 KB 的 live usage 或帳單驗證。[^perplexity-agent-api-models]

同一頁列出 Anthropic、OpenAI、Google、xAI、DeepSeek、Z.AI、Moonshot AI、NVIDIA 與 Perplexity 等 provider 分組，並警告不同 third-party model 不一定支援相同的 reasoning 或 tools。這些 model、功能與價格是時間化文件 snapshot；provider documentation 連結未在本輪另行讀取，故不能把其功能相容性或可用性外推到文件之外。[^perplexity-agent-api-models]

文件另描述 GPT-5.6 Luna 的 priority processing 按列示 token price 的 2× 計價，GPT-5.6 Sol Fast mode 使用相同 multiplier；`service_tier: "priority"` 可指定，response 會包含 served processing tier。對跨模型或跨時間比較而言，model id、provider、token threshold、service tier、response model、usage、cost 與 processing tier 都是必要的 route／runtime controls。[^perplexity-agent-api-models]

文件提供多模型 fallback chain：當一個模型 failure 或 unavailable 時，API 會嘗試下一個模型。這可補入既有的 retry／failover 觀測，但文件沒有提供實際 fallback order、retry timing、served deployment 或成功率；頁面內嵌的使用範例與 response 仍是 documentation fixture，不是 live trace。[^perplexity-agent-api-models]

若將這個 surface 納入 Agent Reader 或自有／明確授權 corpus paired run，應保存 Agent API Models page／payload hash、model id、provider group、pricing snapshot、token threshold、`service_tier`、實際 response `model`、usage／cost、request／response hash、fallback chain、每次 attempt 的 status／latency 與 source／citation funnel。模型表或文件示例不能取代 authenticated receipt，也不能支持公開 AI Search crawler、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。[^perplexity-agent-api-models]

原始文件與不可變 payload 見 [Perplexity Agent API Models raw capture](/raw/perplexity-agent-api-models-2026-08-30.md)。本次未執行 authenticated Agent API request，未驗證帳戶 access、live model membership、實際 billing、served deployment、fallback 行為、citation correctness 或 GEO outcome。[^perplexity-agent-api-models]

## Sonar Deep Research：source coverage、citation 與成本欄位

Perplexity 官方 **Sonar Deep Research** 文件把此模型描述為 deep research／reasoning model，可跨數百來源搜尋、綜合 expert-level insights 並產生詳細報告；頁面列出的功能還包括 128K context、academic research、market／competitive analysis 與 due diligence／investigative research。這是 Perplexity 對自身模型與使用情境的第一方產品描述，不是 xdxd 的 coverage、品質、完整性或任務完成度測量。[^perplexity-sonar-deep-research]

頁面提供 `POST https://api.perplexity.ai/v1/sonar`、`model: "sonar-deep-research"` 與 `messages` 的 API sample，並在頁首標示 Sonar Chat Completions 已轉向 Agent API、支援至 `2026-09-27`。此 lifecycle／route 描述可作為時間化的模型與介面控制，但本 KB 沒有因文件 sample 而取得 authenticated access、live response 或 migration receipt。[^perplexity-sonar-deep-research]

同頁列示 input `$2`／1M tokens、output `$8`／1M、citation `$2`／1M、search queries `$5`／1K requests 與 reasoning `$3`／1M 的 pricing 欄位。頁面另嵌入一個 sample response，含 `citation_tokens`、`num_search_queries`、`reasoning_tokens`、`total_cost` 與 citations／search results；這些是 documentation fixture，不是實際 run。因而研究比較必須保存 page／payload hash、capture time、route、model、usage receipt、cost、實際 `citations`／`search_results`、claim support、citation entailment、shown 與 click，而不能用文件列示價格或 sample 數字代替 live receipt。[^perplexity-sonar-deep-research]

這筆來源補強既有 Agent API 的 model／route／source-presentation 分層：`model: "sonar-deep-research"`、Sonar／Agent route、`citation_tokens`、`num_search_queries`、`reasoning_tokens`、token rates 與 sample-versus-live 狀態應成為 paired run 的控制欄位；文件的「數百來源」與 detailed report positioning 不可外推為公開 AI Search crawler、index、ranking、retrieval、citation correctness、referral、click 或 GEO uplift。原始證據見 [Sonar Deep Research raw capture](/raw/perplexity-sonar-deep-research-2026-08-31.md)。

## Sonar Stream Mode：reasoning、source 與 cost 的 chunk 邊界

Perplexity 官方 Stream Mode 文件把 `stream_mode` 定義為控制 streaming response 格式的參數，列出 `full`（預設）與 `concise`；文件將 concise 描述為較少冗餘、較高 reasoning visibility 的格式，並要求 client 自行累積 message content。這是 Perplexity 自有 Sonar interface 的第一方描述，不是本 KB 的 live request 或獨立 bandwidth benchmark。[^perplexity-sonar-stream-mode]

文件的 comparison table 將 full 與 concise 分成不同 parser surface：full 使用單一 `chat.completion.chunk` 與完整 message object，concise 使用不同階段的多種 chunk；文件並描述 full stream 中搜尋結果可能出現多次，而 concise 只在 `done` chunks 提供搜尋結果。這些欄位與事件邊界可供 source-presentation observation 使用，但不等於每次回應的實際事件完整性或 claim support。[^perplexity-sonar-stream-mode]

Concise mode 的四類 chunk 是 `chat.reasoning`、`chat.reasoning.done`、`chat.completion.chunk` 與 `chat.completion.done`。文件將前兩者分別用於 reasoning／search 的即時步驟與 reasoning 結束時的搜尋結果、images、reasoning steps；後兩者分別用於回答內容與最終 search results、usage、cost。官方 best practices 要求依 `object` 路由 handler、只在 done chunks 處理 `search_results`，並從最後的 `chat.completion.done` 讀取 cost；這是可解析的 runtime contract，不是使用者透明度、citation correctness、UI shown 或 click 的證據。[^perplexity-sonar-stream-mode]

若納入 xdxd 的 Agent Reader 或自有／明確授權 corpus paired run，應固定 route、model、`stream_mode`、query／filter parameters、source snapshot、request／response hash、SSE event sequence、event parser version、`search_results` identity、usage／cost receipt，並把 `candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown` 與 `clicked` 分開保存。不得因 concise 的 bandwidth／reasoning visibility guidance 推導公開 AI Search citation 或 GEO uplift。[^perplexity-sonar-stream-mode]

## Output Control：stream、background、structured output 與 link identity

Perplexity 的 Agent API `Output Control` 文件把 streaming、background run 與 structured output 作為不同的 output controls。Streaming 以 `stream=True`／`stream: true` 啟用；文件以 `response.output_text.delta` 讀取增量文字，並以 `response.completed` 讀取完成 response 的 usage，且聲稱所有 Agent API 可用模型都支援 streaming。這是官方 interface／示例描述，不是本 KB 的 authenticated live trace。[^perplexity-agent-api-output-control]

對需要數分鐘的 deep research 或 sandbox run，文件建議 `background: true`，讓 run 在 server-side 持續，再以 response id polling。若 client 斷線，可在 reconnect window 內以 `GET /v1/agent/{id}?stream=true&starting_after=N` 從指定 sequence number 後恢復事件；窗口到期時文件描述回傳 `400`，應改用普通 `GET /v1/agent/{id}` 取得 final snapshot。這是第一方 lifecycle contract，不是本 KB 已執行的 polling、斷線或 reconnect 驗證。[^perplexity-agent-api-output-control]

Structured outputs 使用 `response_format` 的 JSON Schema；文件說明 `required` 陣列決定欄位必須性，未列入的 properties 可為 JSON `null`，且規則適用 streaming／non-streaming request 及 `/v1/agent`／`/v1/responses` alias。新 schema 的第一次 request 通常需 10–30 秒準備，可能產生 timeout；schema 準備後後續 request 不再承受同一準備延遲。這些是產品文件的格式／延遲 guidance，不是 xdxd 的 schema-compliance 或 latency benchmark。[^perplexity-agent-api-output-control]

文件另警告，直接要求模型在 JSON response 內生成 links 可能產生 hallucinated 或 broken URLs；需要有效連結時應優先使用 response 的 `citations` 或 `search_results` 欄位。對 xdxd 的 source-presentation parser，這支持把 model-generated link 與平台回傳的 citation／search-result identity 分開保存；它不支持 citation 已 entail claim、已在終端 UI 顯示或已帶來 click／GEO 效果。[^perplexity-agent-api-output-control]

若納入 Agent Reader 或自有／明確授權 corpus paired run，應保存 `stream`、SSE event type／sequence、`response.completed` usage、`background`、run id、polling／reconnect state、`starting_after`、final snapshot、schema name／hash、required／optional field map、schema-preparation delay／timeout，以及 model-generated link 與 `citations`／`search_results` target identity；並把 `candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開。這是依官方文件提出的 draft research translation，不是 Perplexity 宣布的 GEO schema。[^perplexity-agent-api-output-control]

## Agent API MCP：工具發現、延遲載入與事件可觀測性

Perplexity 官方 MCP 文件把遠端 Model Context Protocol server 接入 Agent API 的流程定義為：request 開始時列出 server tools，模型再像 native tools 一樣呼叫它們。必要欄位包括唯一的 `server_label` 與 HTTPS Streamable HTTP `server_url`；文件另列 `authorization`、headers、`allowed_tools` 與 `defer_loading`。這是 Perplexity 自有 Agent-facing integration contract，不是公開 Web crawler、index 或 ranking evidence。[^perplexity-agent-api-mcp]

文件把 response observability 拆成 `mcp_list_tools`、`mcp_call` 與 deferred catalog 的 `tool_search_output`。被發現的 tool 會帶 server-provided name、description 與未修改的 input JSON Schema；tool call 則帶 arguments、output 與 error。`defer_loading: true` 可讓模型只載入匹配的 schemas，減少 initial context，但文件明確說它不消除 request-start 的 server discovery time 或 discovery failure。這補強既有的 tool／result／citation parser，並把 catalog exposure、schema loading 與 execution 分開。[^perplexity-agent-api-mcp]

Failure boundary 也必須分層：初始 server discovery 失敗時，文件描述 `external_connector_error`／HTTP `424 Failed Dependency` 且 run 不會開始、沒有 `output` array；執行中的 tool-call failure 則留在 `mcp_call.error`，並以 in-band 方式回傳模型，使模型可以恢復或說明。這些是文件 contract，不是 xdxd 已完成的 live fault-injection 或 latency measurement。[^perplexity-agent-api-mcp]

文件同時警告 remote MCP server 是未經 Perplexity 驗證的 third-party service，且 Agent API 尚不支援 MCP approval；每次 MCP tool call 都會自動執行。`allowed_tools`、read-only server mode 與 read-only token 因而是研究與產品安全控制欄位。文件列出的暫時限制還包括忽略 `require_approval`、不支援 approval request／response、hosted connector catalog、connector OAuth、MCP resources、prompts 與 sampling；MCP call 不收 per-invocation fee，但 model token usage 與 remote server 自身成本另計。[^perplexity-agent-api-mcp]

若納入已知 URL Agent Reader 或自有／明確授權 corpus 的 paired run，應保存 MCP server／tool catalog snapshot、schema hash、`server_label`、allowlist、defer state、discovery latency、tool-call sequence、arguments／output hash、error class、model／route、usage／cost 與 final answer，並把 `tool_catalog_exposed`、`tool_schema_loaded`、`tool_invoked`、`tool_completed`、`result_used`、`claim_supported`、`citation_entails`、`shown` 與 `clicked` 分開。這是依官方文件提出的 draft research translation，不是 Perplexity 宣布的 GEO schema；tool schema 被載入或 tool call 成功，不能外推為公開 AI Search crawl、index、retrieval、citation 或 GEO uplift。[^perplexity-agent-api-mcp]

## MCP 與來源呈現邊界

Changelog 記錄 MCP Server 1.0 的 model-backed tools 映射：`perplexity_ask`→`fast`、`perplexity_reason`→`medium`、`perplexity_research`→`high`；tool names 與 response shapes 維持不變，長程 research 可向支援的 client stream progress，取消 MCP request 會取消底層 run。文件另記錄 remote MCP endpoint `https://api.perplexity.ai/mcp`、Streamable HTTP、API-key bearer authentication 與免本地安裝。這些是 Agent／tool integration 的第一方描述，不能被當成公開 Web crawler、index、ranking 或 citation outcome。[^perplexity-changelog]

若將此 entity 納入 xdxd 已知 URL Agent Reader 或自有／明確授權 corpus 的實驗，至少要分開保存：

1. changelog／preset snapshot、model alias／version、reasoning effort、service tier、prompt cache key、MCP／Agent／Search API route 與 client／SDK version；
2. request、tool-call event、source artifact／retrieved result、response body、response hash、inline citation marker、citation target identity 與 parser version；
3. `candidate_exposed`、`retrieved`、`opened`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked`，不可把 `[1]` 或 `[web:1]` 的存在直接當作 support 或 shown；
4. cancellation／stream progress、retry、timeout、rate-limit、cache hit／miss、input／output tokens、latency、cost 與 frozen／dynamic preset state。

這些是依官方 surface 整理的 draft research translation，不是 Perplexity 宣布的 GEO 研究 schema。此 changelog 未執行 live API／MCP request，也沒有固定 query panel、公開 crawler log、index state、citation entailment 或 click denominator。因此目前產品判斷仍是：**Known-URL Agent Reader 可先驗證；公開 AI 搜尋加速器仍需端到端 evidence。**[^perplexity-changelog]

此 entity 可與 [Perplexity Search API：ranked results、filters 與 context budget](/entities/perplexity-search-api.md) 對照 Search API raw results 與 Agent API citation surface，並銜接[跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md)、[AI visibility measurement 的 rank stability、structural sufficiency 與介面感知排名](/methods/ai-visibility-measurement-convergence.md) 及[證據生命週期](/methods/evidence-lifecycle.md)。不可變 raw capture 見 [Perplexity MCP raw capture](/raw/perplexity-agent-api-mcp-2026-08-31.md)、[Perplexity Changelog raw capture](/raw/perplexity-agent-api-changelog-2026-08-28.md)、[Web Search raw capture](/raw/perplexity-agent-api-web-search-2026-08-29.md)、[Pro Search built-in tools raw capture](/raw/perplexity-pro-search-tools-2026-08-29.md)、[Stream Mode raw capture](/raw/perplexity-sonar-stream-mode-2026-08-30.md)、[Rate Limits & Usage Tiers raw capture](/raw/perplexity-rate-limits-usage-tiers-2026-08-29.md)、[migration how-to raw capture](/raw/perplexity-agent-api-migrate-how-to-2026-08-30.md)、[Create Async Chat Completion raw capture](/raw/perplexity-async-sonar-post-2026-08-30.md)、[Get Async Chat Completion raw capture](/raw/perplexity-async-sonar-get-2026-08-30.md) 與 [Router API Routing & Reliability raw capture](/raw/perplexity-router-routing-reliability-2026-08-30.md) 及 [Sonar Prompt Guide raw capture](/raw/perplexity-sonar-prompt-guide-2026-08-30.md)。

[^perplexity-changelog]: Perplexity, “Changelog,” canonical URL: <https://docs.perplexity.ai/docs/resources/changelog>. Immutable raw capture: [metadata](/raw/perplexity-agent-api-changelog-2026-08-28.md), [Markdown snapshot](/raw/perplexity-agent-api-changelog-2026-08-28/snapshot.md.txt), and [HTTP headers](/raw/perplexity-agent-api-changelog-2026-08-28/response-headers.txt).

[^perplexity-agent-web-search]: Perplexity, “Web Search,” canonical URL: <https://docs.perplexity.ai/docs/agent-api/tools/web-search>. Immutable raw capture: [metadata](/raw/perplexity-agent-api-web-search-2026-08-29.md), [Markdown payload](/raw/perplexity-agent-api-web-search-2026-08-29/web-search.md.txt), [HTTP headers](/raw/perplexity-agent-api-web-search-2026-08-29/response-headers.txt), and [SHA-256](/raw/perplexity-agent-api-web-search-2026-08-29/sha256.txt).

[^perplexity-pro-search-tools]: Perplexity, “Built-in Tool Capabilities,” canonical URL: <https://docs.perplexity.ai/docs/sonar/pro-search/tools>. Immutable raw capture: [metadata](/raw/perplexity-pro-search-tools-2026-08-29.md), [Markdown payload](/raw/perplexity-pro-search-tools-2026-08-29/pro-search-tools.md.txt), [HTTP headers](/raw/perplexity-pro-search-tools-2026-08-29/response-headers.txt), [capture metadata](/raw/perplexity-pro-search-tools-2026-08-29/capture-metadata.json), and [SHA-256](/raw/perplexity-pro-search-tools-2026-08-29/sha256.txt).
[^perplexity-rate-limits-usage-tiers]: Perplexity, “Rate Limits & Usage Tiers,” official documentation, page metadata last modified 2026-08-28. Source URL: <https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers>; immutable raw capture: [metadata](/raw/perplexity-rate-limits-usage-tiers-2026-08-29.md), [Markdown payload](/raw/perplexity-rate-limits-usage-tiers-2026-08-29/rate-limits-usage-tiers.md.txt), [HTTP metadata](/raw/perplexity-rate-limits-usage-tiers-2026-08-29/response-headers.txt), [capture metadata](/raw/perplexity-rate-limits-usage-tiers-2026-08-29/capture-metadata.json), and [SHA-256](/raw/perplexity-rate-limits-usage-tiers-2026-08-29/sha256.txt).

[^perplexity-agent-api-migrate-from-sonar]: Perplexity, “Migrate from Sonar to the Agent API,” official documentation, page metadata last modified 2026-08-28. Source URL: <https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/overview>; immutable raw capture: [metadata](/raw/perplexity-agent-api-migrate-from-sonar-2026-08-29.md), [Markdown payload](/raw/perplexity-agent-api-migrate-from-sonar-2026-08-29/migrate-from-sonar.md.txt), [HTTP metadata](/raw/perplexity-agent-api-migrate-from-sonar-2026-08-29/response-headers.txt), [capture metadata](/raw/perplexity-agent-api-migrate-from-sonar-2026-08-29/capture-metadata.json), and [SHA-256](/raw/perplexity-agent-api-migrate-from-sonar-2026-08-29/sha256.txt).

[^perplexity-agent-api-migrate-how-to]: Perplexity, “How to migrate from Sonar,” official documentation, canonical URL: <https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/how-to>. Immutable raw capture: [metadata](/raw/perplexity-agent-api-migrate-how-to-2026-08-30.md), [Markdown payload](/raw/perplexity-agent-api-migrate-how-to-2026-08-30/how-to.md.txt), [HTTP metadata](/raw/perplexity-agent-api-migrate-how-to-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-agent-api-migrate-how-to-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-agent-api-migrate-how-to-2026-08-30/sha256.txt).
[^perplexity-agent-api-benchmarks]: Perplexity, “Agent API vs Sonar benchmarks,” canonical URL: <https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/benchmarks>. Immutable raw capture: [metadata](/raw/perplexity-agent-api-benchmarks-2026-08-30.md), [Markdown payload](/raw/perplexity-agent-api-benchmarks-2026-08-30/benchmarks.md.txt), [HTTP metadata](/raw/perplexity-agent-api-benchmarks-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-agent-api-benchmarks-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-agent-api-benchmarks-2026-08-30/sha256.txt).
[^perplexity-async-sonar-post]: Perplexity, “Create Async Chat Completion,” official API reference, canonical URL: <https://docs.perplexity.ai/api-reference/async-sonar-post>. Immutable raw capture: [metadata](/raw/perplexity-async-sonar-post-2026-08-30.md), [Markdown payload](/raw/perplexity-async-sonar-post-2026-08-30/create-async-chat-completion.md.txt), [HTTP metadata](/raw/perplexity-async-sonar-post-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-async-sonar-post-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-async-sonar-post-2026-08-30/sha256.txt).

[^perplexity-async-sonar-get]: Perplexity, “Get Async Chat Completion,” official API reference, canonical URL: <https://docs.perplexity.ai/api-reference/async-sonar-api-request-get>. Immutable raw capture: [metadata](/raw/perplexity-async-sonar-get-2026-08-30.md), [Markdown payload](/raw/perplexity-async-sonar-get-2026-08-30/get-async-chat-completion.md.txt), [HTTP metadata](/raw/perplexity-async-sonar-get-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-async-sonar-get-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-async-sonar-get-2026-08-30/sha256.txt).
[^perplexity-router-routing-reliability]: Perplexity, “Routing & Reliability,” official Router API documentation, canonical URL: <https://docs.perplexity.ai/docs/router/routing-and-reliability>. Immutable raw capture: [metadata](/raw/perplexity-router-routing-reliability-2026-08-30.md), [Markdown payload](/raw/perplexity-router-routing-reliability-2026-08-30/routing-and-reliability.md.txt), [HTTP metadata](/raw/perplexity-router-routing-reliability-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-router-routing-reliability-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-router-routing-reliability-2026-08-30/sha256.txt).
[^perplexity-agent-define-the-run]: Perplexity, “Define the run,” official Agent API documentation, canonical URL: <https://docs.perplexity.ai/docs/agent-api/building-agents/define-the-run>. Sitemap `lastmod`: `2026-08-25T16:49:01.657Z`. Immutable raw capture: [metadata](/raw/perplexity-agent-api-define-the-run-2026-08-30.md), [Markdown payload](/raw/perplexity-agent-api-define-the-run-2026-08-30/define-the-run.md.txt), [HTTP headers](/raw/perplexity-agent-api-define-the-run-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-agent-api-define-the-run-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-agent-api-define-the-run-2026-08-30/sha256.txt).
[^perplexity-agent-api-output-control]: Perplexity, “Output Control,” official Agent API documentation, canonical URL: <https://docs.perplexity.ai/docs/agent-api/output-control>. Sitemap `lastmod`: `2026-08-22T23:58:23.566Z`. Immutable raw capture: [metadata](/raw/perplexity-agent-api-output-control-2026-08-30.md), [Markdown payload](/raw/perplexity-agent-api-output-control-2026-08-30/output-control.md.txt), [HTTP headers](/raw/perplexity-agent-api-output-control-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-agent-api-output-control-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-agent-api-output-control-2026-08-30/sha256.txt).
[^perplexity-sonar-pro-search-quickstart]: Perplexity, “Quickstart,” official Sonar documentation, canonical URL: <https://docs.perplexity.ai/docs/sonar/pro-search/quickstart>. Sitemap `lastmod`: `2026-08-28T21:05:49.201Z`. Immutable raw capture: [metadata](/raw/perplexity-sonar-pro-search-quickstart-2026-08-30.md), [Markdown payload](/raw/perplexity-sonar-pro-search-quickstart-2026-08-30/quickstart.md.txt), [HTML snapshot](/raw/perplexity-sonar-pro-search-quickstart-2026-08-30/snapshot.html), [HTTP headers](/raw/perplexity-sonar-pro-search-quickstart-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-sonar-pro-search-quickstart-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-sonar-pro-search-quickstart-2026-08-30/sha256.txt).
[^perplexity-sonar-post]: Perplexity, “Create Chat Completion,” official API reference, canonical URL: <https://docs.perplexity.ai/api-reference/sonar-post>, page／sitemap last modified `2026-08-28T21:05:56.582Z`. Immutable raw capture: [wrapper](/raw/perplexity-sonar-chat-completion-2026-08-30.md), [HTML snapshot](/raw/perplexity-sonar-chat-completion-2026-08-30/snapshot.html), [Markdown payload](/raw/perplexity-sonar-chat-completion-2026-08-30/create-chat-completion.md.txt), [HTTP metadata](/raw/perplexity-sonar-chat-completion-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-sonar-chat-completion-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-sonar-chat-completion-2026-08-30/sha256.txt).
[^perplexity-sonar-prompt-guide]: Perplexity, “Prompt Guide,” official Sonar documentation, canonical URL: <https://docs.perplexity.ai/docs/sonar/prompt-guide>, sitemap last modified `2026-08-28T21:05:49.218Z`. Immutable raw capture: [metadata](/raw/perplexity-sonar-prompt-guide-2026-08-30.md), [Markdown payload](/raw/perplexity-sonar-prompt-guide-2026-08-30/prompt-guide.md.txt), [HTML snapshot](/raw/perplexity-sonar-prompt-guide-2026-08-30/snapshot.html), [HTTP metadata](/raw/perplexity-sonar-prompt-guide-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-sonar-prompt-guide-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-sonar-prompt-guide-2026-08-30/sha256.txt).
[^perplexity-sonar-stream-mode]: Perplexity, “Stream Mode: Concise vs Full,” official Sonar documentation, canonical URL: <https://docs.perplexity.ai/docs/sonar/pro-search/stream-mode>, sitemap last modified `2026-08-28T21:05:49.233Z`. Immutable raw capture: [metadata](/raw/perplexity-sonar-stream-mode-2026-08-30.md), [Markdown payload](/raw/perplexity-sonar-stream-mode-2026-08-30/stream-mode.md.txt), [HTML snapshot](/raw/perplexity-sonar-stream-mode-2026-08-30/snapshot.html), [HTTP metadata](/raw/perplexity-sonar-stream-mode-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-sonar-stream-mode-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-sonar-stream-mode-2026-08-30/sha256.txt).

[^perplexity-pro-search-classifier]: Perplexity, “Pro Search Classifier,” official documentation. Source URL: <https://docs.perplexity.ai/docs/sonar/pro-search/classifier>. HTML JSON-LD／sitemap `lastmod`: `2026-08-28T21:05:49.170Z`. Immutable raw capture: [metadata](/raw/perplexity-pro-search-classifier-2026-08-30.md), [Markdown payload](/raw/perplexity-pro-search-classifier-2026-08-30/pro-search-classifier.md.txt), [HTTP headers](/raw/perplexity-pro-search-classifier-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-pro-search-classifier-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-pro-search-classifier-2026-08-30/sha256.txt).
[^perplexity-sonar-deep-research]: Perplexity, “Sonar Deep Research,” official documentation. Source URL: <https://docs.perplexity.ai/docs/sonar/models/sonar-deep-research>. Sitemap `lastmod`: `2026-08-28T21:05:49.466Z`. Immutable raw capture: [metadata](/raw/perplexity-sonar-deep-research-2026-08-31.md), [HTML snapshot](/raw/perplexity-sonar-deep-research-2026-08-31/snapshot.html), [Markdown payload](/raw/perplexity-sonar-deep-research-2026-08-31/sonar-deep-research.md.txt), [HTTP metadata](/raw/perplexity-sonar-deep-research-2026-08-31/response-headers.txt), [capture metadata](/raw/perplexity-sonar-deep-research-2026-08-31/capture-metadata.json), and [SHA-256](/raw/perplexity-sonar-deep-research-2026-08-31/sha256.txt).
[^perplexity-agent-api-presets]: Perplexity, “Presets,” official Agent API documentation. Canonical URL: <https://docs.perplexity.ai/docs/agent-api/presets>. Immutable raw capture: [wrapper](/raw/perplexity-agent-api-presets-2026-08-31.md), [Markdown payload](/raw/perplexity-agent-api-presets-2026-08-31/presets.md.txt), [HTTP metadata](/raw/perplexity-agent-api-presets-2026-08-31/response-headers.txt), [capture metadata](/raw/perplexity-agent-api-presets-2026-08-31/capture-metadata.json), and [SHA-256](/raw/perplexity-agent-api-presets-2026-08-31/sha256.txt). The documentation sitemap reported `lastmod` `2026-08-21T23:47:54.491Z` at capture time.
[^perplexity-agent-api-mcp]: Perplexity, “MCP,” official Agent API documentation. Canonical URL: <https://docs.perplexity.ai/docs/agent-api/tools/mcp>. Immutable raw capture: [wrapper](/raw/perplexity-agent-api-mcp-2026-08-31.md), [Markdown payload](/raw/perplexity-agent-api-mcp-2026-08-31/mcp.md.txt), [HTTP metadata](/raw/perplexity-agent-api-mcp-2026-08-31/response-headers.txt), [capture metadata](/raw/perplexity-agent-api-mcp-2026-08-31/capture-metadata.json), and [SHA-256](/raw/perplexity-agent-api-mcp-2026-08-31/sha256.txt). The documentation sitemap reported `lastmod` `2026-08-23T17:59:26.735Z` at capture time.
