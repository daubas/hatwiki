---
type: Entity
title: OpenAI WebMCP Challenge
description: OpenAI 官方 WebMCP Challenge 與 ChatGPT／Chrome agent-facing structured-tool 測試 surface；不等同公開 AI Search 或 GEO 成效證據。
resource: https://openai.com/webmcp-challenge/
tags:
  - openai
  - webmcp
  - agent-discoverability
  - structured-action
  - agent-ready-websites
  - known-url-agent-reader
  - application-side
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-30T18:13:23.576918Z
sources:
  - id: openai-webmcp-challenge
    resource: /raw/openai-webmcp-challenge-2026-08-31.md
    title: OpenAI「WebMCP Challenge」官方頁面 raw wrapper
    author: openai/product
    last_modified: 2026-08-30
---

# 官方定位

OpenAI 的 WebMCP Challenge 頁面把 WebMCP 描述為一個讓網站直接暴露 structured tools 給 agent 使用的 experimental open standard，並以「不必讓 agent 猜測 UI」說明 agent-facing action surface 的定位。這是 OpenAI 的第一方產品／活動描述；WebMCP repository、標準程序與跨瀏覽器 implementation status 未在本頁之外另行核對。[^openai-webmcp-challenge]

頁面 FAQ 表示 WebMCP app 可在 ChatGPT 的 in-app browser 測試，Chrome 則可透過 experimental flag 或 origin trial 啟用；活動提供 agent-native app examples，並要求投稿具備可運作 live app、code repository 與 demo video。這組資訊可作為 known-URL agent actionability 與 client-runtime 研究的時間化 first-party surface。[^openai-webmcp-challenge]

# 與既有研究的關係

本 entity 應與 [Agent-ready website 與 web agent reliability 觀測方法](/methods/agent-ready-websites-and-web-agent-reliability.md) 的 WebMCP／structured-state 層相接：

- `client_direct_visit`、`client_runtime`、`origin_trial_or_flag`、`tool_registration_mode`、`tool_schema`、`action_inventory`、`pre_state_hash`、`post_state_hash` 與 `returned_content_hash` 屬已知 URL 的 action-surface 變項。
- `tool_listed`、`tool_selected`、`tool_invoked`、`tool_completed`、`postcondition_valid`、`decision_correct`、`claim_supported` 與 `citation_entails` 必須分開保存。
- WebMCP availability、Challenge submission 或已知 URL task completion 不得直接寫成公開 AI Search 的 crawler、index、ranking、retrieval、citation、shown、referral、click 或 GEO uplift。[^openai-webmcp-challenge]

# Claim boundary

| Claim | Status | Boundary |
|---|---|---|
| OpenAI 將 WebMCP 定位為 website-to-agent structured-tool surface。 | supported | 只支持 OpenAI 官方頁面的第一方描述；未獨立確認標準或跨瀏覽器狀態。[^openai-webmcp-challenge] |
| ChatGPT in-app browser 與 Chrome experimental flag／origin trial 是頁面列出的 WebMCP 測試入口。 | supported | 未執行帳戶、瀏覽器版本、origin 或 live tool call 驗證。[^openai-webmcp-challenge] |
| WebMCP 普遍改善速度、準確性、可靠性或 task completion。 | observational | 活動頁沒有獨立 benchmark、對照、分母或 effect estimate。[^openai-webmcp-challenge] |
| WebMCP Challenge 提升公開 AI Search 或 GEO visibility。 | unresolved | 沒有公開 crawl／index／retrieval／citation／shown／click evidence；須另行做公開 Web paired experiment。 |

# 研究狀態

活動頁的日期、獎項與投稿要求是版本化活動資訊，不是 WebMCP 的品質保證。2026-08-25 開放報名／投稿，2026-09-03 13:00 PT 截止，得獎公告暫定 2026-09-23；後續研究應將 `challenge_surface` 與 `public_search_surface` 分開保存，並為 app、runtime、tool schema、origin／permission、task、model、prompt、run、postcondition 與公開搜尋漏斗建立可重播 receipt。[^openai-webmcp-challenge]

原始 evidence 見 [OpenAI WebMCP Challenge raw wrapper](/raw/openai-webmcp-challenge-2026-08-31.md)。

[^openai-webmcp-challenge]: OpenAI, “The WebMCP Challenge,” official product/event page. Source URL: <https://openai.com/webmcp-challenge/>; immutable wrapper: [raw evidence](/raw/openai-webmcp-challenge-2026-08-31.md), [capture metadata](/raw/openai-webmcp-challenge-2026-08-31/capture-metadata.json), and [hash receipt](/raw/openai-webmcp-challenge-2026-08-31/sha256.txt).
