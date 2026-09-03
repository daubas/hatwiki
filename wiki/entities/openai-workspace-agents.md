---
type: Entity
title: OpenAI Workspace Agents
description: OpenAI 公告中的共享 Workspace Agents、team directory／agent library、工具與 skills、長時間 workflow、治理與 research-preview surface；不等同公開 Web AI Search discoverability。
tags:
  - openai
  - workspace-agents
  - agent-library
  - agent-discoverability
  - application-side-discoverability
  - workflow
  - governance
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-30T17:37:22.374351000Z
sources:
  - id: openai-workspace-agents-raw
    resource: /raw/openai-workspace-agents-2026-08-31.md
    title: OpenAI「Introducing workspace agents in ChatGPT」raw wrapper（2026-08-31）
    author: openai/product
    last_modified: 2026-08-30
---

# 定位

OpenAI 官方公告把 Workspace Agents 描述為可由團隊建立與共享的 agent，處理複雜任務與長時間 workflow；公告並把它放在 ChatGPT 的 Agents entry、team directory／agent library、ChatGPT／Slack 協作與管理員治理脈絡中。這是 OpenAI 自有產品的第一方描述，raw evidence wrapper 與來源邊界見 [官方公告 raw capture](/raw/openai-workspace-agents-2026-08-31.md)。[^openai-workspace-agents-raw]

## Application-side agent discoverability

公告描述的 discoverability 是組織內 agent asset 的 application-side surface：成員可從 Agents sidebar／team directory 找到已分享的 agent，使用者可從 workflow 或檔案開始建立 agent，並由產品流程定義步驟、連接 tools、加入 skills、測試及後續分享。這可作為 [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 的一個產品實例，但不能直接等同公開 Web 的 `crawled`→`indexed`→`retrieved`→`used_in_answer`→`citation_entails`→`cited`→`shown`→`clicked` 漏斗。[^openai-workspace-agents-raw]

可先把兩條 surface 分開：

| Surface | 來源支持的描述 | xdxd 目前可量測的 draft 欄位 |
|---|---|---|
| Agent asset library | 分享、team directory／agent library、ChatGPT／Slack 使用 | `agent_shared`、`directory_exposed`、`directory_opened`、`agent_invoked`、`permission_scope` |
| Workflow runtime | 雲端執行、長時間工作、tools／skills、context／memory、排程 | `agent_version`、`tool_skill_manifest`、`run_schedule`、`approval_requested`、`tool_called`、`workflow_completed` |
| Public Web AI Search | 本來源沒有 crawler、index、ranking、citation 或 click evidence | `candidate_exposed`、`retrieved`、`used_in_answer`、`citation_entails`、`shown`、`clicked`；須另做公開 Web／AI Search paired run |

## Governance and evidence boundary

公告也描述 admin access／sharing controls、analytics 與 Compliance API 等治理或觀測 surface；這些是產品 capability statement，不是 xdxd 對帳戶權限、runtime trace、adoption、reliability、task completion 或 ROI 的驗證。公告中的客戶案例與效率敘述只能保留為 first-party／testimonial observational evidence，沒有獨立樣本、對照組、完整分母或可重現 receipt。[^openai-workspace-agents-raw]

因此本 entity 維持 `status: draft`，目前最小研究翻譯是：在授權 workspace 中固定 agent version、sharing scope、directory state、permission、tool／skill manifest、memory policy、model／runtime 與 analytics denominator，配對觀測 `directory_exposed`→`opened`→`invoked`→`completed`；不得把這條 application-side path 寫成公開 GEO、citation 或排名改善。[^openai-workspace-agents-raw]

[^openai-workspace-agents-raw]: [OpenAI Workspace Agents raw capture](/raw/openai-workspace-agents-2026-08-31.md)，其 canonical source 為 <https://openai.com/index/introducing-workspace-agents-in-chatgpt/>。
