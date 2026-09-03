---
type: Entity
title: OpenAI ChatGPT App Directory 與 app submission
description: OpenAI 官方資料描述的 ChatGPT app directory、app search／browse、plugin recommendation ranking、deep links、MCP connectivity 與 application-side app discoverability；不等同公開 Web AI Search discoverability。
tags:
  - openai
  - chatgpt-apps
  - app-directory
  - app-discoverability
  - agent-discoverability
  - application-side-discoverability
  - mcp
  - governance
  - recommendation-ranking
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T21:50:41.381987Z
sources:
  - id: openai-chatgpt-app-directory-raw
    resource: /raw/openai-chatgpt-app-directory-2026-09-01.md
    title: OpenAI「Developers can now submit apps to ChatGPT」raw wrapper（2026-09-01）
    author: openai/product
    last_modified: 2026-08-31
  - id: openai-plugin-discovery-raw
    resource: /raw/openai-plugin-discovery-2026-09-01.md
    title: OpenAI「Improved plugin discovery on web and mobile」raw wrapper（2026-09-01）
    author: openai/help
---

# 定位

OpenAI 官方公告把 ChatGPT app directory 描述為 application-side 的 app discovery／distribution surface：使用者可以瀏覽 featured apps、搜尋已發布 app，並從 tools menu 或 `chatgpt.com/apps` 進入；開發者也可以用 deep link 導向 app page。這是 OpenAI 自有產品的第一方描述，raw evidence wrapper 與來源邊界見 [官方公告 raw capture](/raw/openai-chatgpt-app-directory-2026-09-01.md)。[^openai-chatgpt-app-directory-raw]

## App discovery 與 interaction

公告描述已連接 app 可在對話中由 `@` 名稱提及或從 tools menu 選取而觸發；OpenAI 也在實驗依 conversational context、app usage patterns 與 user preferences 直接呈現相關 app。這支持把 app directory、deep link、tools menu、app mention 與 conversational recommendation 視為不同 application-side event，不支持把它們合併成一個公開搜尋排名指標。[^openai-chatgpt-app-directory-raw]

## Plugin recommendation ranking

OpenAI 2026-08-21 的官方 release note 另描述：ChatGPT web／mobile 的 plugin recommendations 會優先考慮安裝後仍持續使用的 plugins，以協助相關工具出現；plugin availability 受 plan、region 與 workspace settings 影響，desktop 不在本次更新範圍。這是 declared application-side ranking behavior，不是 xdxd 的 live ranking trace、retention measurement 或 causal uplift。[^openai-plugin-discovery-raw]

研究上應把 `recommendation_exposed`、`rank_position`、`plugin_installed`、`repeat_use_window`、`repeat_use`、`plugin_invoked` 與 `workflow_completed` 分開保存，並固定 web／mobile surface、plan、region、workspace、plugin version 與 observation window；不能把安裝後持續使用這個未定義的 signal 直接解讀成 discovery、採用或 task outcome 的改善。[^openai-plugin-discovery-raw]

## Submission 與 metadata

公告將 Apps SDK 描述為 beta，並表示開發者可提交 app 審查、追蹤 approval status；submission 包括 MCP connectivity details、testing guidelines、directory metadata 與 country availability settings。公告另稱符合 quality／safety standards 的 app 有資格發布，受使用者歡迎的 app 未來可能在 directory 中更突出或由 ChatGPT 推薦。這些是 first-party product／process statements；本輪沒有執行 Developer Platform submission、live MCP connection、approval trace 或推薦結果驗證。[^openai-chatgpt-app-directory-raw]

## 研究分層與證據邊界

對 xdxd GEO 研究，可在 application-side app-discovery protocol 中固定 `app_version`、directory metadata、country availability、MCP connectivity、review／approval state、account／surface 與 user context，分開記錄：

| Layer | Draft observation fields | 不可外推的結論 |
|---|---|---|
| Submission／governance | `submitted`、`review_started`、`approved`、`country_availability`、`quality_safety_gate` | 不能由可提交或符合資格推論一定被列出、被推薦或被採用 |
| Directory discovery | `directory_listed`、`directory_searchable`、`directory_featured`、`deep_link_opened` | 不能由列出或搜尋到推論使用者完成 task 或產生 conversion |
| In-conversation invocation | `app_connected`、`app_mentioned`、`app_invoked`、`workflow_completed` | 不能由 app invoked 推論公開 Web AI Search 的 crawler、index、retrieval、citation 或 GEO uplift |
| Recommendation experiment | `context_condition`、`app_usage_history`、`user_preference_state`、`recommendation_exposed`、`recommendation_opened`、feedback | 公告只支持「正在實驗」；沒有曝光分母、排序規則或 effect estimate |
| Public Web AI Search | `crawled`、`indexed`、`candidate_exposed`、`retrieved`、`used_in_answer`、`citation_entails`、`cited`、`shown`、`clicked` | 必須另做公開 Web／跨引擎 paired run，不能用 app directory event 代替 |

與 [OpenAI Workspace Agents](/entities/openai-workspace-agents.md) 的 team directory／agent library、[OpenAI WebMCP Challenge](/entities/openai-webmcp-challenge.md) 的 structured-tool client-runtime surface 比較時，應保留 application boundary、入口、權限、版本與區域差異。[^openai-chatgpt-app-directory-raw]

本 entity 維持 `status: draft`，尚未有人工作確認。它描述 OpenAI 公告的產品與流程邊界，不提供 app directory 的 live coverage、推薦品質、採用率、task completion、reliability、MCP connectivity、click／conversion 或公開 AI Search／GEO 效果。[^openai-chatgpt-app-directory-raw]

[^openai-chatgpt-app-directory-raw]: [OpenAI ChatGPT App Directory raw capture](/raw/openai-chatgpt-app-directory-2026-09-01.md)，canonical source 為 <https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/>。
[^openai-plugin-discovery-raw]: [OpenAI plugin discovery raw capture](/raw/openai-plugin-discovery-2026-09-01.md)，canonical source 為 <https://help.openai.com/en/articles/6825453-chatgpt-release-notes#improved-plugin-discovery-on-web-and-mobile>。
