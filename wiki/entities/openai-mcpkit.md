---
type: Entity
title: OpenAI MCPKit：安全資料連接器與 ChatGPT application-side agent surface
description: OpenAI 官方 blueprint 對 MCP server、資料來源 structure／index、權限、tool actions、錯誤處理、MCP Inspector 與 ChatGPT Dev Mode 的描述；不等同公開 Web AI Search 或 GEO 成效證據。
resource: https://openai.com/solutions/blueprints/mcpkit/
tags:
  - openai
  - mcpkit
  - mcp
  - agent-discoverability
  - structured-content
  - data-connectors
  - application-side
  - app-registration
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T08:02:38.466617Z
sources:
  - id: openai-mcpkit-raw
    resource: /raw/openai-mcpkit-2026-09-01.md
    title: OpenAI MCPKit blueprint raw wrapper（2026-09-01）
    author: openai/product
    last_modified: 2026-08-31
---

# 官方定位

OpenAI 的 MCPKit blueprint 把 MCPKit 描述為一個 sample repository，讓團隊以安全且一致的方式把資料連接到 ChatGPT 或其他 MCP clients；頁面並以依官方 MCP specification 對齊的 reference implementation、custom authentication 與 access control 作為建置定位。這是 OpenAI 的第一方 application／developer surface 描述，不是 xdxd 對 repository、authorization flow 或 live interoperability 的獨立驗證。[^openai-mcpkit-raw]

# 資料準備與工具配置

Blueprint 的 setup path 把幾個 readiness 面向分開：對 vector stores、files、databases、S3 或 APIs 做 structure and index，定義 query access rules；在 MCP server 端加入 entitlements，更新 tool actions 與 error handling。研究上可把這些欄位化為資料表示／索引、權限、工具 schema／action 與 failure handling，而不是一個籠統的「agent-ready」分數。[^openai-mcpkit-raw]

頁面另指示先以 MCP Inspector 做本機測試，再透過 ChatGPT Dev Mode 註冊 app；並稱 MCPKit 已針對 ChatGPT custom apps 與 developer mode 使用。這描述的是設定與部署路徑，不代表特定帳戶或區域已能註冊、列出、被推薦、被呼叫或完成工作流。[^openai-mcpkit-raw]

# Agent-facing 觀測分層

若在自有或明確授權的 application surface 做 paired run，應至少把下列事件分開保存：

| Layer | Draft observation fields | 不可直接外推 |
|---|---|---|
| Data／representation | `data_source_prepared`、`schema_or_index_configured`、`structured_representation_hash`、`query_access_rule_declared` | 不能由資料已 structure／index 推論公開 AI Search 已 crawl 或 index |
| Access／tool | `mcp_server_authenticated`、`entitlement_checked`、`tool_listed`、`tool_invoked`、`structured_response_returned`、`error_class` | 不能由 tool 可呼叫推論 citation、source presentation、task success 或可靠性改善 |
| App lifecycle | `app_registered`、`review_state`、`directory_available`、`app_selected`、`app_connected`、`workflow_completed` | 不能把 application-side app event 當成公開 Web ranking、referral 或 click |
| Public Web AI Search | `crawled`、`indexed`、`candidate_exposed`、`retrieved`、`used_in_answer`、`citation_entails`、`cited`、`shown`、`clicked` | 必須另做公開 Web／跨引擎 paired observation；MCPKit 不提供這些證據 |

這些是依官方 blueprint 建立的 xdxd draft translation，不是 OpenAI 宣布的 GEO schema 或效果量測。[^openai-mcpkit-raw]

# 與既有 surface 的關係

- 與 [OpenAI ChatGPT App Directory 與 app submission](/entities/openai-chatgpt-app-directory.md) 串接：MCPKit 描述 server／data connector 的建置與註冊前準備；app directory 頁面描述 submission metadata、列出、deep link 與 application-side recommendation 邊界。
- 與 [OpenAI WebMCP Challenge](/entities/openai-webmcp-challenge.md) 對照：MCPKit 偏向資料 connector、authorization、tool action 與 ChatGPT Dev Mode；WebMCP 偏向 website-to-agent structured-tool、client runtime、origin／permission 與 known-URL actionability。
- 與 [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 對接：保留 capability exposure、tool invocation、structured result、postcondition 與公開 Web funnel 的事件分離。

# 證據邊界

本 entity 只支持 OpenAI MCPKit blueprint 的第一方描述，維持 `status: draft`，尚無人工 `verified`。它不支持 MCPKit repository 的實作品質、authorization correctness、live app availability、directory coverage、推薦品質、tool reliability、task completion、公開 AI Search crawler、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。原始 capture 的 canonical `403` challenge、Reader `200` representation、比例摘錄、HTTP metadata、sitemap `lastmod`、SHA-256 與權利界線見 [MCPKit raw wrapper](/raw/openai-mcpkit-2026-09-01.md)。[^openai-mcpkit-raw]

[^openai-mcpkit-raw]: [OpenAI MCPKit raw capture](/raw/openai-mcpkit-2026-09-01.md)，canonical source 為 <https://openai.com/solutions/blueprints/mcpkit/>。
