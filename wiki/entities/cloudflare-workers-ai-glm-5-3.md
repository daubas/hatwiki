---
type: Platform Entity
title: Cloudflare Workers AI：Z.ai GLM-5.3
description: Cloudflare 第一方 Changelog 所描述的 Workers AI GLM-5.3 模型可用性、agentic coding／tool-driven positioning、access path 與 pricing；不等同 AI Search 或 GEO 成效證據。
resource: https://developers.cloudflare.com/workers-ai/models/glm-5.3/
tags:
  - entity
  - cloudflare
  - workers-ai
  - glm-5.3
  - agentic-coding
  - tool-use
  - model-selection
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-29T19:48:16Z
sources:
  - id: cloudflare-workers-ai-glm-5-3
    resource: /raw/cloudflare-glm-5.3-workers-ai-2026-08-30.md
    title: Cloudflare Workers AI：Z.ai GLM-5.3 公告（2026-08-30 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-28
---

# Entity

Cloudflare Developers 的 2026-08-28 Changelog 將 `@cf/zai-org/glm-5.3` 描述為可在 Workers AI 使用的 Z.ai agentic coding model，面向長時間、工具驅動的開發工作流，而不是單輪聊天。頁面 metadata 同時描述 1M-token context window、reasoning 與 function calling。這些是 Cloudflare 對模型的第一方產品描述，不是 xdxd 對模型的 runtime 重現。[^cloudflare-workers-ai-glm-5-3]

## 可用性、介面與費用

- 公告列出的 access paths 包括 Workers AI binding（`env.AI.run()`）、REST API、OpenAI-compatible endpoint 與 AI Gateway。
- 公告表示使用 GLM-5.3 需要 Workers Paid plan 或預付 AI Gateway credits。
- 頁面列出 input、cached-input 與 output 的 token pricing，並稱其與 GLM-5.2 相同；本 KB 未以 live request、invoice 或區域價格核對。

上述內容支持把 `model_identifier`、`model_release_date`、`model_context_claim`、`tool_use_claim`、`access_path`、`billing_mode` 與 `price_snapshot` 作為 Agent Reader／retrieval 實驗的模型與成本控制欄位；欄位化是 xdxd 研究設計，不是 Cloudflare 對公開 GEO 的承諾。[^cloudflare-workers-ai-glm-5-3]

## Benchmark 邊界

公告引述 Z.ai Code Bench、Terminal Bench 2.1／3.0、DeepSWE、FrontierSWE、SWE-Marathon、CyberGym 與 AutomationBench 的分數或改善幅度。這些應記錄為 Cloudflare 引述的 `observational` benchmark claims：本輪未另行讀取 Z.ai 的連結報告，也未由 xdxd 以固定 corpus、prompt、seed、hardware、runtime 與 receipt 重跑，因此不能當作獨立性能驗證，不能外推至公開 AI Search quality 或 GEO uplift。[^cloudflare-workers-ai-glm-5-3]

## 與 AI Search／GEO 的關係

本來源是 Workers AI 模型公告，不是 Cloudflare AI Search-specific 支援公告。它不能證明 `@cf/zai-org/glm-5.3` 已出現在 AI Search 的模型目錄，也不能與既有 `@cf/zai-org/glm-5.3-flash` snapshot 混為同一模型；可對照 [Cloudflare AI Search 的 Agent Framework 與 agent-facing surface 整合](/entities/cloudflare-ai-search-agent-integrations.md) 中的 AI Search-specific model-selection evidence。

若將 GLM-5.3 納入 Agent Reader 或 retrieval comparison，應固定 source／corpus snapshot、query、representation、retrieval configuration、prompt、model version、account／quota、latency／cost receipt，並把 `retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown` 與 `clicked` 分層。模型可用性、context claim 或 agentic positioning 本身不支持公開 crawler、index、ranking、citation、referral、click 或 GEO 因果效果。[^cloudflare-workers-ai-glm-5-3]

[^cloudflare-workers-ai-glm-5-3]: Cloudflare Developers, “Z.ai GLM-5.3 now available on Workers AI,” 2026-08-28. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-28-glm-5.3-workers-ai/>; immutable raw capture: [metadata](/raw/cloudflare-glm-5.3-workers-ai-2026-08-30.md), [Markdown response](/raw/cloudflare-glm-5.3-workers-ai-2026-08-30/markdown-response.txt), [HTML snapshot](/raw/cloudflare-glm-5.3-workers-ai-2026-08-30/snapshot.html), and [SHA-256](/raw/cloudflare-glm-5.3-workers-ai-2026-08-30/sha256.txt).
