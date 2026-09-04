---
type: Platform Entity
title: Cloudflare／xAI：Grok 4.20 Multi-Agent
description: Cloudflare Developers 官方模型頁所描述的 xAI Grok 4.20 Multi-Agent、2M context、multi-agent／web search／structured output／reasoning 介面；不等同 AI Search 或 GEO 成效證據。
resource: https://developers.cloudflare.com/ai/models/xai/grok-4.20-multi-agent-0309/
tags:
  - entity
  - cloudflare
  - xai
  - grok-4.20
  - multi-agent
  - web-search
  - structured-output
  - reasoning
  - agent-facing
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T09:34:10Z
sources:
  - id: cloudflare-grok-4-20-multi-agent
    resource: /raw/cloudflare-grok-4-20-multi-agent-2026-08-31.md
    title: Cloudflare Developers「Grok 4.20 Multi-Agent」官方模型頁（2026-08-31 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-28
---

# Entity

Cloudflare Developers 的官方模型頁將 `xai/grok-4.20-multi-agent-0309` 描述為 xAI 的 **Text Generation**、**Third-party** 模型，並列出 2,000,000-token context window 與 `Zero data retention: Yes`。頁面稱多個 agents 可平行協作執行 deep research tasks，並列出 function calling、structured outputs 與 reasoning capabilities；這是 Cloudflare 的第一方產品描述，不是 xdxd 對模型的 runtime 重現。[^cloudflare-grok-4-20-multi-agent]

## Agent-facing 介面與可觀測欄位

官方 Markdown representation 展示 Responses request format、`input`、`instructions`、`max_output_tokens`、`max_turns`、`parallel_tool_calls`、`previous_response_id`、`prompt_cache_key`、`reasoning`、`search_parameters`、`store`、`stream`、`text`、`tool_choice`、`tools`、`top_logprobs`、`top_p`、`user` 與 `context_management` 等欄位。頁面示例也包含 `env.AI.run()`、Cloudflare Responses endpoint、typed multi-turn input、`reasoning: { effort: 'medium' }` 與 `tools: [{ type: 'web_search' }]`。這些內容支持將模型與 request schema 作為 Agent Reader／runtime paired run 的控制欄位，但沒有證明每項功能在 xdxd 帳戶可用、實際 served deployment、工具結果或 live billing。[^cloudflare-grok-4-20-multi-agent]

對 xdxd 而言，候選控制欄位包括：`model_id`、provider、third-party status、declared context window、zero-retention flag、endpoint、input／instructions hash、tools／search parameters、reasoning effort、typed multi-turn state、structured-output schema、response status、usage／cost receipt 與 request／response hash。`View as Markdown`、Documentation Index 與 Agent setup 連結可作為 representation exposure 的觀測材料，但頁面本身沒有 agent access log、discovery、retrieval、invocation 或 completion receipt。[^cloudflare-grok-4-20-multi-agent]

## 文件 fixture 與研究邊界

頁面內嵌 thermodynamics、月球視覺錯覺、Tokyo food planning、xAI news 與兩列火車等 sample outputs，以及含 `usage`、`reasoning`、`model`、`output`、`tools` 與 `status` 的 response objects。它們是官方文件 fixture，不應被當成目前服務的 live quality、搜尋 freshness、成本、citation correctness 或 benchmark。這筆 entity 不加入任何由 sample output 推導的效果主張。[^cloudflare-grok-4-20-multi-agent]

這是一般 Cloudflare AI model page，不是 Cloudflare AI Search 的 supported-models 目錄；不得把 `xai/grok-4.20-multi-agent-0309` 與 [Cloudflare AI Search 的 Agent Framework 與 agent-facing surface 整合](/entities/cloudflare-ai-search-agent-integrations.md) 中的 AI Search-specific model evidence 混為一談。模型頁也不支持公開 AI Search crawler、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。[^cloudflare-grok-4-20-multi-agent]

若要實測，應在自有或明確授權 corpus 固定模型識別、served deployment、endpoint、account／quota、prompt、tools、search parameters、source snapshot、representation、response hash、usage／cost、latency 與 judge protocol，並分開記錄 `candidate_exposed`、`retrieved`、`opened`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked`、`invoked` 與 `completed`。模型 capability declaration 或 documentation exposure 不能代替公開搜尋的端到端 evidence。[^cloudflare-grok-4-20-multi-agent]

[^cloudflare-grok-4-20-multi-agent]: Cloudflare Developers, “Grok 4.20 Multi-Agent,” canonical URL: <https://developers.cloudflare.com/ai/models/xai/grok-4.20-multi-agent-0309/>; immutable raw capture: [wrapper](/raw/cloudflare-grok-4-20-multi-agent-2026-08-31.md), [Markdown payload](/raw/cloudflare-grok-4-20-multi-agent-2026-08-31/markdown-response.txt), [capture metadata](/raw/cloudflare-grok-4-20-multi-agent-2026-08-31/capture-metadata.json), [SHA-256](/raw/cloudflare-grok-4-20-multi-agent-2026-08-31/sha256.txt), and [rights boundary](/raw/cloudflare-grok-4-20-multi-agent-2026-08-31/rights.txt). The captured page exposed no separate publication or modification date; the Cloudflare Developers sitemap reported a 2026-08-28 `lastmod` signal.
