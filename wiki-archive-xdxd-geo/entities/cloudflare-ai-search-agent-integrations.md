---
type: Platform Entity
title: Cloudflare AI Search 的 Agent Framework 與 agent-facing surface 整合
description: Cloudflare 第一方資料描述 AI Search 的 managed indexing／querying pipeline、grounded retrieval、來源回傳、網站索引、sitemapless discover、metadata envelope、Workers plan limits／pricing、公開 search／MCP endpoint 與 bot policy 邊界。
resource: https://developers.cloudflare.com/changelog/post/2026-07-30-ai-search-agent-sdks/
tags:
  - entity
  - cloudflare
  - ai-search
  - agent
  - grounded-retrieval
  - citation-observation
  - mcp
  - crawler-policy
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-30T15:12:35Z
sources:
  - id: cloudflare-ai-search-agent-sdks
    resource: /raw/cloudflare-ai-search-agent-sdks.md
    title: Cloudflare AI Search 與 Agent Frameworks 官方公告（2026-08-25 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-07-30
  - id: cloudflare-ai-search-easier
    resource: /raw/cloudflare-ai-search-2026-08-25.md
    title: Cloudflare AI Search 官方文章（2026-08-25 raw capture）
    author: cloudflare/blog
    last_modified: 2026-08-10
  - id: cloudflare-ai-search-fetch-index
    resource: /raw/cloudflare-ai-search-fetch-index-2026-08-26.md
    title: Cloudflare AI Search「Fetch and index single web pages」官方文件（2026-08-26 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-25
  - id: cloudflare-ai-search-workers-ai-models
    resource: /raw/cloudflare-ai-search-workers-ai-models-2026-08-27.md
    title: Cloudflare AI Search 新增 Workers AI 文字生成模型公告（2026-08-27 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-26
  - id: cloudflare-ai-search-glm-5-3-flash
    resource: /raw/cloudflare-ai-search-glm-5.3-flash-2026-08-29.md
    title: Cloudflare AI Search 支援 GLM-5.3 Flash 公告（2026-08-29 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-30
  - id: cloudflare-ai-search-larger-custom-metadata
    resource: /raw/cloudflare-ai-search-larger-custom-metadata-2026-08-27.md
    title: Cloudflare AI Search「Store larger custom metadata values」官方 Changelog（2026-08-27 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-25
  - id: cloudflare-ai-search-supported-models
    resource: /raw/cloudflare-ai-search-supported-models-2026-08-27.md
    title: Cloudflare AI Search「Supported models」官方文件（2026-08-27 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-26
  - id: cloudflare-ai-search-supported-models-2026-08-29
    resource: /raw/cloudflare-ai-search-supported-models-2026-08-29.md
    title: Cloudflare AI Search「Supported models」官方文件（2026-08-29 新 snapshot）
    author: cloudflare/developers-docs
    last_modified: 2026-08-28
  - id: cloudflare-ai-search-limits-pricing
    resource: /raw/cloudflare-ai-search-limits-pricing-2026-08-28.md
    title: Cloudflare AI Search「Limits & pricing」官方文件（2026-08-28 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-26
  - id: cloudflare-ai-search-agents-sdk-guide
    resource: /raw/cloudflare-ai-search-agents-sdk-2026-08-30.md
    title: Cloudflare AI Search Agents SDK 官方文件（2026-08-30 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-25
  - id: cloudflare-ai-search-how-it-works
    resource: /raw/cloudflare-ai-search-how-it-works-2026-08-30.md
    title: Cloudflare Developers「How AI Search works」官方文件（2026-08-30 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-07-06
---

# Entity

Cloudflare 的第一方資料把 AI Search 描述為可供 agent 使用的資料搜尋層：2026-07-30 Changelog 說明 Agents SDK、Vercel AI SDK 與 LangChain 的 grounded retrieval／source 回傳整合；2026-08-06 Blog 文章則補充網站與資料索引、sitemapless discover、namespace endpoint 與 Cloudflare 自有 agent-facing surface 的產品實例。[^cloudflare-ai-search-agent-sdks][^cloudflare-ai-search-easier]

## Managed indexing／querying pipeline

Cloudflare Developers 將 AI Search 分成非同步 indexing 與同步 querying 兩個核心流程：前者把連線資料源或上傳檔案轉成可搜尋的向量與 keyword index，後者從 API query 進入可選的 query rewrite、query embedding、vector retrieval、BM25、fusion、reranking、content retrieval 與 response generation。這是 Cloudflare 自有產品的 pipeline 描述，不是公開搜尋引擎的通用 ranking 或 citation 規則。[^cloudflare-ai-search-how-it-works]

- Indexing 的文件化步驟包含 data ingestion、以 Workers AI Markdown Conversion 將支援的資料轉成 structured Markdown、chunking、embedding、可選的 BM25 keyword indexing，以及向量／keyword index／content storage；連線資料源會定期檢查更新，built-in storage 則在檔案上傳時索引。[^cloudflare-ai-search-how-it-works]
- Querying 可由 AI Search 的 Search 或 Chat Completions endpoint 觸發；Search endpoint 在 content retrieval 後回傳內容，Chat Completions endpoint 另外由 text-generation model 產生回答。[^cloudflare-ai-search-how-it-works]
- 同一份 Markdown representation 的本輪 HTTP metadata 顯示 `Content-Signal: ai-train=yes, search=yes, ai-input=yes`，以及 `X-Original-Tokens: 40844`、`X-Markdown-Tokens: 2698`；這些是時間化 representation metadata，不是已被 crawler 使用或公開搜尋採納的證據。[^cloudflare-ai-search-how-it-works]

## Agent framework 與來源回傳

- Vercel AI SDK 整合可對索引內容產生 grounded response，並把擷取到的 chunks 回傳為 `sources`；同一整合也可把 `search()` 暴露為 agent loop 的 tool。[^cloudflare-ai-search-agent-sdks]
- LangChain 整合提供由 Cloudflare AI Search 驅動的 retriever，可單獨使用、包成 search tool，或放入 RAG chain。[^cloudflare-ai-search-agent-sdks]
- Cloudflare Agents SDK 的範例把 AI Search 暴露成 agent tool，讓模型以 query 搜尋 knowledge base。[^cloudflare-ai-search-agent-sdks]

## Agents SDK 的 stateful agent 與 indexing lifecycle

Cloudflare 的 Agents SDK 指南示範在 Workers 上建立 stateful chat agent：agent 在 runtime 建立 AI Search instance、上傳 seed document，並把 `search()` 暴露為模型可呼叫的 `search_knowledge_base` tool；指南把「先搜尋再回答」定位為建議整合模式。[^cloudflare-ai-search-agents-sdk-guide]

- 範例使用 namespace-level `ai_search_namespaces` binding，因為 agent 會在 runtime 呼叫 `create()`；`remote: true` 供本地 Wrangler development proxy 到已部署的 AI Search instance。對話歷史由 `AIChatAgent`／SQLite Durable Object 保存。[^cloudflare-ai-search-agents-sdk-guide]
- `items.upload()` 先將文件置於 queued／running lifecycle，範例輪詢 item status 至可搜尋；同時開啟 vector 與 keyword index method 時，`search()` 走 hybrid retrieval。這些是 Cloudflare 產品範例的 lifecycle／configuration controls，不是公開搜尋引擎的通用規則。[^cloudflare-ai-search-agents-sdk-guide]
- 指南的兩個工具分別負責最多五筆 knowledge-base search 與 resolution upload；tool loop 以 `stepCountIs(5)` 限制步數，同名上傳會覆寫並重新索引。這些欄位可作為受控 Agent Reader／retrieval 實驗的 integration variables。[^cloudflare-ai-search-agents-sdk-guide]
- 測試段落要求使用支援 AIChatAgent protocol 的 chat client 透過 WebSocket 驅動，並以 route、tool execution 與回答使用 seed content／附 citation 作為範例驗收訊號；後者不是本 KB 已完成的 citation entailment、公開 AI Search ranking 或 GEO uplift 測量。[^cloudflare-ai-search-agents-sdk-guide]

## 網站／資料索引與 discover

- Cloudflare Blog 文章描述 AI Search 可索引 agent 使用的 structured 與 unstructured data，來源可從個別檔案到自有網站；文章當時的產品限制是網站必須是 Cloudflare account 中可驗證的 zone，並預告將增加其他 ownership verification 方式。[^cloudflare-ai-search-easier]
- Cloudflare Blog 文章描述網站整合可用 `Discover` parsing option，在沒有 sitemap 時沿著連結發現頁面；文中將此流程連到 Browser Run `/crawl`。這是 Cloudflare AI Search 的產品實作描述，不是公開搜尋引擎對 sitemapless 網站的普遍規則。[^cloudflare-ai-search-easier]
- 文章也描述 hybrid search 將 semantic 與 keyword search 放在同一 query 中，目標同時支援開放式問題與精確名稱／關鍵字查找。這應在研究中記錄為 retrieval configuration，而非通用 AI Search 排名因素。[^cloudflare-ai-search-easier]

## 單頁 rendered HTML 擷取與索引

- Cloudflare Developers 的新指南示範以 Browser Run `/content` 取得單一網頁的 fully rendered HTML，再透過 AI Search Items API 上傳到 instance 的 built-in storage；`uploadAndPoll` 會等待頁面完成索引並可被搜尋。這是 Cloudflare AI Search 的第一方實作指南，不是公開搜尋引擎的 crawling 或 indexing 規格。[^cloudflare-ai-search-fetch-index]
- 指南將此模式定位為單頁或少量手選頁面的按需索引；若要整站持續索引，則應使用 AI Search website data source。這個使用情境區分可轉成研究欄位 `indexing_mode`（`single_on_demand`／`site_continuous`）、`fetch_representation`（rendered HTML／其他 response）、`poll_status`、`source_url`、`item_key` 與 `instance_id`，但欄位化是 xdxd 的研究設計推論，不是 Cloudflare 對公開 GEO 成效的承諾。[^cloudflare-ai-search-fetch-index]
- 範例 Worker 另暴露 `/search?q=`，回傳 indexed chunk 的 key、score 與 text；這可用來觀測受控 instance 內的 retrieval response 與 source representation，但不能把 instance-level search response 當成 Google、Bing、Perplexity、OpenAI 或其他公開 AI Search 的 citation／ranking outcome。[^cloudflare-ai-search-fetch-index]
- 指南使用 Browser Run `networkidle2`、30 秒 timeout、`compatibility_date: 2026-08-25`，並以 remote binding 連接 Browser Run 與 AI Search。這些是範例程式的 execution controls；在 xdxd 的 Agent Reader 對照實驗中，應和 raw HTTP fetch、SSR HTML、client-rendered HTML、索引完成時間與 downstream `retrieved`／`used`／`cited`／`shown`／`clicked` 分開保存。[^cloudflare-ai-search-fetch-index]

## Workers AI 文字生成模型選擇

Cloudflare 2026-08-26 Changelog 公告 AI Search 新增六個 Workers AI 文字生成模型：`@cf/deepseek-ai/deepseek-v4-flash-0731` 與 `@cf/deepseek-ai/deepseek-v4-pro-0813` 各列為 1,048,576-token context window；`@cf/openai/gpt-oss-120b` 與 `@cf/openai/gpt-oss-20b` 各列為 128,000；`@cf/qwen/qwen3.8-27b` 與 `@cf/moonshotai/kimi-k2.7-code` 各列為 262,144。[^cloudflare-ai-search-workers-ai-models]

- 公告表示這些模型運行於 Workers AI，不需額外 provider key。
- 建立或更新 AI Search instance 時，可在 dashboard 或 API 選擇模型。
- 在 xdxd 研究資料模型中，這筆公告可支持記錄 `generation_model`、`context_window_tokens`、`provider_key_requirement` 與 `selection_surface`；這些是研究欄位化，不是 Cloudflare 對公開 GEO 成效的承諾。
- context window 是產品公告列出的配置欄位，不等於實際可用上下文、retrieval recall、答案品質、citation、latency 或 cost；要比較模型，仍需固定 corpus、query、retrieval configuration、prompt、版本、帳戶／配額與 outcome funnel。

原始證據見 [Cloudflare AI Search Workers AI models raw capture](/raw/cloudflare-ai-search-workers-ai-models-2026-08-27.md) 及其 [不可變 Markdown response](/raw/cloudflare-ai-search-workers-ai-models-2026-08-27/markdown-response.txt)。

## Supported models 新 snapshot（2026-08-28 更新）

Cloudflare Developers 的 `Supported models` 頁面在新 snapshot 標示最後更新為 2026-08-28；相對前一筆 2026-08-27 raw snapshot，頁面修改日期與 JSON-LD `dateModified` 由 `2026-08-26` 改為 `2026-08-28`，production text-generation 清單新增 `@cf/zai-org/glm-5.3-flash`，並列出 1,048,576-token context window。[^cloudflare-ai-search-supported-models-2026-08-29]

- 這筆同一 canonical URL 的新版本是時間化模型目錄證據；它補充 2026-08-30 Changelog 的 AI Search 支援公告，但不把 changelog 或目錄 snapshot 混成永久清單。[^cloudflare-ai-search-supported-models-2026-08-29][^cloudflare-ai-search-glm-5-3-flash]
- 在 xdxd 研究資料模型中，應把 `model_catalog_snapshot_hash`、`page_last_updated`、`generation_model`、`context_window_tokens` 與 `lifecycle_status` 綁定到各自 snapshot；模型出現在清單不等於本輪已測量 runtime context、截斷、延遲、成本、生成品質、retrieval recall、citation 或 click。
- 舊的 2026-08-27 raw snapshot 保留作歷史基線；後續清單或 lifecycle 變更應繼續建立新的 dated snapshot，不覆寫既有 raw。

原始證據見 [Cloudflare AI Search Supported models 新 snapshot raw capture](/raw/cloudflare-ai-search-supported-models-2026-08-29.md) 及其 [不可變 Markdown response](/raw/cloudflare-ai-search-supported-models-2026-08-29/markdown-response.txt)。

## GLM-5.3 Flash 時間化公告（2026-08-30）

Cloudflare Developers 的 Changelog 頁面標示 2026-08-30，公告 AI Search 支援 Workers AI 的 `@cf/zai-org/glm-5.3-flash` 作為文字生成模型，並列出 1,048,576-token context window；公告同時表示該模型在 Workers AI 上執行。[^cloudflare-ai-search-glm-5-3-flash]

- 這筆公告是既有 Workers AI 模型目錄之後的時間化產品變更訊號；它支持記錄模型 identifier、公告列出的 context window 與執行平台，不代表本輪已對 AI Search instance 做可用性、截斷、延遲、成本或生成品質測試。[^cloudflare-ai-search-glm-5-3-flash]
- 公告將 `Supported models` 文件列為 AI Search instance 的設定參考；在 xdxd 研究資料模型中，可把 `generation_model`、`context_window_tokens`、`provider_key_requirement`、`selection_surface` 與 `model_catalog_snapshot_hash` 分開保存。這是研究欄位化，不是 Cloudflare 對公開 AI Search ranking、retrieval、citation、source presentation、click 或 GEO 成效的承諾。
- 後續模型比較仍須固定 corpus、query、retrieval configuration、prompt、版本、帳戶／配額與 outcome funnel；context window 不等於實際可用上下文、retrieval recall、答案品質或 citation outcome。

原始證據見 [Cloudflare AI Search 支援 GLM-5.3 Flash raw capture](/raw/cloudflare-ai-search-glm-5.3-flash-2026-08-29.md) 及其 [不可變 Markdown response](/raw/cloudflare-ai-search-glm-5.3-flash-2026-08-29/markdown-response.txt)。

## AI Search 支援模型清單與 lifecycle

Cloudflare Developers 的 `Supported models` 文件（頁面標示最後更新 2026-08-26）把 AI Search 的模型目錄分為 text generation、embedding 與 reranking，並以 `Production models` 與 `Transition models` 表達 lifecycle；該 snapshot 將 production models 描述為目前積極支援、建議、穩定且完整可用，並寫明當時沒有被標示為 end-of-life 的模型。[^cloudflare-ai-search-supported-models]

- Text-generation 表列出 provider、alias 與 context-window；embedding 表列出 provider、alias、vector dimensions、input-token 上限與 metric；reranking 表列出 provider、alias 與 input-token 上限。這補充了前一則六個 Workers AI 模型公告的單次變更，提供較廣的時間點模型目錄，但不同文件 surface 與快照時間不可直接混成一份永久清單。[^cloudflare-ai-search-supported-models][^cloudflare-ai-search-workers-ai-models]
- 在 xdxd 研究資料模型中，可把 `model_family`、`provider`、`alias`、`lifecycle_status`、`context_window_tokens`、`embedding_dimensions`、`embedding_input_tokens`、`similarity_metric` 與 `rerank_input_tokens` 分開記錄；這是研究欄位化，不是 Cloudflare 對公開 GEO 成效的承諾。
- Model alias、context window、embedding dimensions 或 reranking input limit 是設定／目錄欄位，不等於實際可用上下文、retrieval recall、generation quality、ranking、citation、latency、cost 或 click。模型比較仍需固定 corpus、query、retrieval configuration、prompt、版本、帳戶／配額與 outcome funnel，並保存清單 snapshot hash。[^cloudflare-ai-search-supported-models]

原始證據見 [Cloudflare AI Search Supported models raw capture](/raw/cloudflare-ai-search-supported-models-2026-08-27.md) 及其 [不可變 Markdown response](/raw/cloudflare-ai-search-supported-models-2026-08-27/markdown-response.txt)。

## Limits、pricing 與網站 crawl capacity（2026-08-26）

Cloudflare Developers 的 `Limits & pricing` 文件（頁面標示最後更新 2026-08-26）依 Workers Free／Paid plan 列出 AI Search instances、namespaces、files、discover crawl pages、queries、cross-instance requests、每日 crawled pages、custom metadata fields、每 vector metadata 與可篩選 UTF-8 prefix 的限制。Free／Paid 的 instances 為 100／5,000、每月 queries 為 20,000／Unlimited、每日最多 crawled pages 為 500／Unlimited；兩者均列出每 instance 5 個 custom metadata fields、每 vector 10 KiB（含 system overhead）與每個 indexed string 前 64 個 UTF-8 bytes 可篩選。[^cloudflare-ai-search-limits-pricing]

- 文件指出 `discover` crawl 最多接受 100,000 pages，但 files-per-instance 與每日 crawl 上限同時適用，實際頁數取多項限制的最低值；因此 Workers Free 的每日 500 頁可能是網站 crawl 的 binding limit。這是 Cloudflare 自有 crawl／indexing implementation 的 capacity boundary，不是公開搜尋 crawler 的通用規則。[^cloudflare-ai-search-limits-pricing]
- open beta 在列示 limits 內免費；Workers AI 與 AI Gateway 另行計費，Cloudflare 表示開始計費前至少 30 天通知；storage、vector indexing 與 website crawling 使用的 Browser Run 則包含在 AI Search 內。這些是成本與可重現性控制變項，不等於公開 AI Search ranking、retrieval、citation 或 GEO 成效。[^cloudflare-ai-search-limits-pricing]
- 在 xdxd 研究資料模型中，應把 `workers_plan`、`instance_limit`、`file_limit`、`discover_page_limit`、`query_quota`、`daily_crawl_limit`、`metadata_envelope_bytes`、`filterable_utf8_prefix_bytes`、`billing_mode`、`crawl_budget_consumed` 與 `crawl_completion_status` 分開保存；這是研究欄位化，不是 Cloudflare 對公開 GEO 成效的承諾。
- 這筆文件未提供公開搜尋成效實驗，也未由 xdxd 建立 instance、執行 crawl、核對 invoice 或重現帳戶配額；limits／pricing 對公開 `candidate_exposed`→`retrieved`→`used_in_answer`→`cited`→`shown`→`clicked` funnel 的影響維持 unresolved。

原始證據見 [Cloudflare AI Search Limits & pricing raw capture](/raw/cloudflare-ai-search-limits-pricing-2026-08-28.md) 及其 [不可變 Markdown response](/raw/cloudflare-ai-search-limits-pricing-2026-08-28/markdown-response.txt)。

## Custom metadata value envelope（2026-08-25）

Cloudflare Developers 的 2026-08-25 Changelog 公告表示，AI Search 支援在每個 vector 的共用 10 KiB metadata envelope 內保存較大的 custom metadata values；該 envelope 包含 AI Search system metadata 與 JSON overhead，因此 10 KiB 不是每個欄位各自的上限。公告也表示每個已索引字串的前 64 個 UTF-8 bytes 仍可用於 filtering。[^cloudflare-ai-search-larger-custom-metadata]

- 這筆公告補充既有 Metadata attributes 文件的時間化產品變更訊號，但未說明「較大」相對於哪個舊值、實際 API payload 邊界、既有 instance 的 migration／re-index 行為或相容性保證。
- 在 xdxd 研究資料模型中，可把 `metadata_envelope_bytes`、`system_metadata_bytes`、`json_overhead_bytes`、`custom_metadata_bytes`、`filterable_utf8_prefix_bytes` 與 `metadata_schema_version` 分開記錄；這些是研究欄位化，不是 Cloudflare 對公開 GEO 成效的承諾。
- 這是 Cloudflare 自有 AI Search indexing／retrieval configuration 的第一方公告，不支持推導 Google、Bing、Perplexity、OpenAI 或其他公開搜尋引擎採用相同容量、schema、filtering 或 ranking 行為。

原始證據見 [Cloudflare AI Search larger custom metadata raw capture](/raw/cloudflare-ai-search-larger-custom-metadata-2026-08-27.md) 及其 [不可變 Markdown response](/raw/cloudflare-ai-search-larger-custom-metadata-2026-08-27/markdown-response.txt)。

## Agent-facing endpoint 與 citation observation

- 啟用 namespace 的 public URLs 後，文章描述可取得跨多個 instance／網站的 `/search` 與 `/mcp` endpoint；可加 custom domain，也可在前方加 Cloudflare Access 形成 private search instance。[^cloudflare-ai-search-easier]
- Cloudflare 以自有 Dev Stack MCP 為例，將多個 Cloudflare-owned surface 放入 namespace，透過單一查詢跨 instance fan-out；文章中的 Worker 範例說明回傳 chunks 帶有 citations 與來源 instance 標記。這可作為 agent-facing discoverability、retrieval provenance 與 citation entailment 的觀測設計變項，但不是公開搜尋 citation 成效證據。[^cloudflare-ai-search-easier]
- 文章描述 `Cloudflare-AI-Search` bot identity、遵循 `robots.txt`、以公開且 immutable user agent 識別自己，並尊重網站 bot controls。這可作為 crawler request observation 與 policy／enforcement alignment 的平台控制變項；不等於來源被公開搜尋引擎索引或引用。[^cloudflare-ai-search-easier]

## GEO 研究用途與邊界

Cloudflare 第一方資料支持把以下欄位納入 Agent Reader 或受控 retrieval 實驗：framework、query、instance／namespace、parse mode、sitemap presence、hybrid／semantic／keyword 設定、retrieved chunks、source metadata、metadata envelope／custom metadata bytes、citation／entailment、endpoint、bot policy、crawler request 與時間。它們不證明網站會因此被 Google、Bing、ChatGPT、Perplexity 或其他公開搜尋引擎發現、排名提升、獲得更多 AI answer citations，或整體 agent discoverability 改善；這些效果仍需獨立的跨引擎、跨時間觀測與對照實驗。

與 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md) 的差異是：本 entity 描述 agent 端的檢索／endpoint／來源回傳與 Cloudflare 自有 crawler policy 自述，後者描述網站端 AI crawler 的存取觀測與政策控制；兩者不可互相推導成搜尋成效。原始證據與不可變 snapshot 見 [Cloudflare AI Search frameworks raw capture](/raw/cloudflare-ai-search-agent-sdks.md) 與 [Cloudflare AI Search product raw capture](/raw/cloudflare-ai-search-2026-08-25.md)。研究保存規則見[證據生命週期](/methods/evidence-lifecycle.md)。

[^cloudflare-ai-search-how-it-works]: Cloudflare Developers, “How AI Search works,” page marked last updated 2026-07-06. Source URL: <https://developers.cloudflare.com/ai-search/concepts/how-ai-search-works/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-how-it-works-2026-08-30.md), [HTML snapshot](/raw/cloudflare-ai-search-how-it-works-2026-08-30/page.html), [Markdown response](/raw/cloudflare-ai-search-how-it-works-2026-08-30/page.md.txt), [capture metadata](/raw/cloudflare-ai-search-how-it-works-2026-08-30/capture-metadata.json), and [SHA-256](/raw/cloudflare-ai-search-how-it-works-2026-08-30/sha256.txt).
[^cloudflare-ai-search-agent-sdks]: Cloudflare Developers, “Use AI Search with the Agents SDK, AI SDK, and LangChain,” 2026-07-30. Source URL: <https://developers.cloudflare.com/changelog/post/2026-07-30-ai-search-agent-sdks/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-agent-sdks.md).
[^cloudflare-ai-search-agents-sdk-guide]: Cloudflare Developers, “Agents SDK,” page marked last updated 2026-08-25. Source URL: <https://developers.cloudflare.com/ai-search/agent-sdks/agents-sdk/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-agents-sdk-2026-08-30.md), [HTML snapshot](/raw/cloudflare-ai-search-agents-sdk-2026-08-30/snapshot.html), [HTTP headers](/raw/cloudflare-ai-search-agents-sdk-2026-08-30/response-headers.txt), and [SHA-256](/raw/cloudflare-ai-search-agents-sdk-2026-08-30/sha256.txt).
[^cloudflare-ai-search-easier]: Cloudflare Blog, “Cloudflare AI Search: give your agents a search engine for your data,” 2026-08-06, modified 2026-08-10. Source URL: <https://blog.cloudflare.com/ai-search-easier/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-2026-08-25.md) and [HTML snapshot](/raw/cloudflare-ai-search-2026-08-25/snapshot.html).
[^cloudflare-ai-search-fetch-index]: Cloudflare Developers, “Fetch and index single web pages,” page marked last updated 2026-08-25. Source URL: <https://developers.cloudflare.com/ai-search/how-to/fetch-and-index-web-pages/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-fetch-index-2026-08-26.md), [HTML snapshot](/raw/cloudflare-ai-search-fetch-index-2026-08-26/snapshot.html), and [SHA-256](/raw/cloudflare-ai-search-fetch-index-2026-08-26/sha256.txt).
[^cloudflare-ai-search-workers-ai-models]: Cloudflare Developers, “New Workers AI text generation models in AI Search,” 2026-08-26. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-26-new-workers-ai-models/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-workers-ai-models-2026-08-27.md), [Markdown response](/raw/cloudflare-ai-search-workers-ai-models-2026-08-27/markdown-response.txt), [HTML snapshot](/raw/cloudflare-ai-search-workers-ai-models-2026-08-27/snapshot.html), and [SHA-256](/raw/cloudflare-ai-search-workers-ai-models-2026-08-27/sha256.txt).
[^cloudflare-ai-search-larger-custom-metadata]: Cloudflare Developers, “Store larger custom metadata values in AI Search,” published and modified 2026-08-25. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-25-larger-custom-metadata-values/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-larger-custom-metadata-2026-08-27.md), [Markdown response](/raw/cloudflare-ai-search-larger-custom-metadata-2026-08-27/markdown-response.txt), [HTML snapshot](/raw/cloudflare-ai-search-larger-custom-metadata-2026-08-27/snapshot.html), and [SHA-256](/raw/cloudflare-ai-search-larger-custom-metadata-2026-08-27/sha256.txt).

[^cloudflare-ai-search-supported-models]: Cloudflare Developers, “Supported models,” page marked last updated 2026-08-26. Source URL: <https://developers.cloudflare.com/ai-search/configuration/models/supported-models/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-supported-models-2026-08-27.md), [HTML snapshot](/raw/cloudflare-ai-search-supported-models-2026-08-27/snapshot.html), [Markdown response](/raw/cloudflare-ai-search-supported-models-2026-08-27/markdown-response.txt), and [SHA-256](/raw/cloudflare-ai-search-supported-models-2026-08-27/sha256.txt).
[^cloudflare-ai-search-supported-models-2026-08-29]: Cloudflare Developers, “Supported models,” page marked last updated 2026-08-28. Source URL: <https://developers.cloudflare.com/ai-search/configuration/models/supported-models/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-supported-models-2026-08-29.md), [HTML snapshot](/raw/cloudflare-ai-search-supported-models-2026-08-29/snapshot.html), [Markdown response](/raw/cloudflare-ai-search-supported-models-2026-08-29/markdown-response.txt), [HTTP metadata](/raw/cloudflare-ai-search-supported-models-2026-08-29/response-headers.txt), and [SHA-256](/raw/cloudflare-ai-search-supported-models-2026-08-29/sha256.txt).
[^cloudflare-ai-search-glm-5-3-flash]: Cloudflare Developers, “AI Search now supports GLM-5.3 Flash,” 2026-08-30. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-30-glm-5.3-flash/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-glm-5.3-flash-2026-08-29.md), [Markdown response](/raw/cloudflare-ai-search-glm-5.3-flash-2026-08-29/markdown-response.txt), [HTML snapshot](/raw/cloudflare-ai-search-glm-5.3-flash-2026-08-29/snapshot.html), and [SHA-256](/raw/cloudflare-ai-search-glm-5.3-flash-2026-08-29/sha256.txt).

[^cloudflare-ai-search-limits-pricing]: Cloudflare Developers, “Limits & pricing,” page marked last updated 2026-08-26. Source URL: <https://developers.cloudflare.com/ai-search/platform/limits-pricing/>; immutable raw capture: [metadata](/raw/cloudflare-ai-search-limits-pricing-2026-08-28.md), [HTML snapshot](/raw/cloudflare-ai-search-limits-pricing-2026-08-28/snapshot.html), [Markdown response](/raw/cloudflare-ai-search-limits-pricing-2026-08-28/markdown-response.txt), and [SHA-256](/raw/cloudflare-ai-search-limits-pricing-2026-08-28/sha256.txt).
