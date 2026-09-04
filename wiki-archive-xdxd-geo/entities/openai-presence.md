---
type: Platform Entity
title: OpenAI Presence
description: OpenAI 第一方公告描述的企業 Agent deployment、政策／評估／核准動作、escalation 與 production improvement surface。
resource: https://openai.com/index/introducing-openai-presence/
tags:
  - entity
  - openai
  - agents
  - agent-reliability
  - evaluation
  - escalation
  - approved-actions
  - observability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T21:05:30.150585Z
sources:
  - id: openai-presence-announcement
    resource: /raw/openai-presence-2026-09-01.md
    title: "OpenAI Presence 官方公告（2026-09-01 raw capture）"
    author: openai/product
    last_modified: 2026-08-31
---

# Entity

OpenAI Presence 是 OpenAI 公告描述的企業 Agent deployment product。公告將它定位在 voice／chat 與高風險 workflow 的 production operations：Agent 使用指定的 company knowledge／systems，依企業政策執行 approved actions，必要時 escalation 給人員。這是 OpenAI 的第一方產品自述，不是本 KB 的 live deployment 驗證。[^openai-presence-announcement]

## Application-side reliability surface

公告描述 Presence 將下列元素放在同一 operational surface：

- policies 與 standard operating procedures；
- guardrails、approved actions 與 escalation rules；
- common requests、edge cases 與 higher-risk scenarios 的 simulations／graders；
- production sessions、escalations 與 quality signals；
- Codex-powered change proposal、production-version replay 與 controlled rollout。

這使 Presence 可作為 application-side agent reliability／operability 的研究對照，但不能把 `evaluation_passed`、`approved_action` 或 `workflow_completed` 當成公開 AI Search 的 `retrieved`、`citation_entails` 或 `shown`。[^openai-presence-announcement]

## 研究用法與證據邊界

在自有或明確授權的環境，可把 Presence 的產品描述轉成一條 application-side trace：

```text
policy_set → knowledge_connected → simulation → evaluation → invocation
→ tool／action → postcondition → escalation／handoff → production_signal
→ proposed_change → replay → approval → rollout → completion
```

應保留 policy／guardrail／grader／model／runtime version、access scope、tool trace、postcondition、escalation reason、human handoff、production-session hash、change replay 與 rollout approval。這些變項要與公開 Web 的 `crawled`、`indexed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開記錄。

OpenAI 公告自述其英語電話支援案例達到 `75%` 無人工 inbound resolution，且 `10` 天內 handoff 減少 `15` 個百分點；本 entity 將其標記為來源自報的 observational claim，沒有 raw call logs、完整分母、比較組或獨立重現。公告另稱 Presence 透過 limited general availability 提供給 eligible enterprise customers、尚非 self-serve；本輪沒有驗證帳戶或區域可用性。[^openai-presence-announcement]

原始證據見 [OpenAI Presence raw capture](/raw/openai-presence-2026-09-01.md)。本 entity 不支持 OpenAI Presence 提高公開搜尋 crawler access、index inclusion、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。

[^openai-presence-announcement]: OpenAI, “Introducing OpenAI Presence,” official product announcement, <https://openai.com/index/introducing-openai-presence/>; immutable raw wrapper: [OpenAI Presence raw capture](/raw/openai-presence-2026-09-01.md). The canonical origin returned a Cloudflare challenge, so the wrapper preserves a readable selected excerpt and provenance receipts rather than the full article.
