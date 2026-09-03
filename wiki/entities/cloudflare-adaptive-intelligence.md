---
type: Platform Entity
title: Cloudflare Adaptive Intelligence：動態 bot detection 與 crawler attribution 邊界
description: Cloudflare 第一方描述的 Adaptive Intelligence bot detection engine、continuous retraining、多訊號 session observation 與 validation；可作為 AI crawler／agent traffic attribution 的控制面，不是公開搜尋或 GEO 成效證據。
resource: https://blog.cloudflare.com/introducing-adaptive-intelligence/
tags:
  - entity
  - cloudflare
  - bot-management
  - bot-detection
  - ai-crawler
  - agent-discoverability
  - observability
  - session-behavior
  - continuous-retraining
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T18:02:21.296566Z
sources:
  - id: cloudflare-adaptive-intelligence-2026-09-01
    resource: /raw/cloudflare-adaptive-intelligence-2026-09-01.md
    title: "Cloudflare Introducing Adaptive Intelligence 官方文章（2026-09-01 raw capture）"
    author: human:chris-pope
    last_modified: 2026-08-31
---

# Entity

Cloudflare 的 **Adaptive Intelligence** 是 Cloudflare Blog 於 2026-08-31 描述的新 bot detection engine。官方文章把它放在既有 bot score 後方，並將本次啟動的第一個組件描述為 continuous machine-learning retraining；這是 Cloudflare 的平台產品敘述，不是 xdxd 的獨立部署或效果驗證。[^cloudflare-adaptive-intelligence-2026-09-01]

## 官方描述的 detection surface

- bot score 可由 machine learning、behavioral validation、JavaScript fingerprinting、heuristics，以及辨識 known、verified bots（文章舉 search crawlers 為例）的 checks 組成。
- Adaptive Intelligence 的初始組件會從 live traffic 與 Cloudflare network signals 學習；文章列出 JA4 TLS fingerprints、request structures、challenge outcomes、session behavior、network reputation、高階 meta signals，以及 Turnstile／Precursor client-side telemetry。
- 文章以 `observe → train → deploy → validate` 描述 loop，並提到多時間窗、shadow mode、逐步 rollout、challenge solve rates、score distributions 與 customer feedback。
- disposable rule generation 與從受保護流量學習被描述為後續組件；本頁不把它們寫成已由本次公告獨立證明的全面 rollout。[^cloudflare-adaptive-intelligence-2026-09-01]

## 對 xdxd GEO／AI crawler 研究的用途

這個 entity 可作為網站端 traffic observation 的一個 **平台控制面**：在有授權的 server-log／WAF 實驗中，除了保存 `user_agent`、request time、IP／network attribution、robots policy 與 response status，也應保存 session window、request sequence、challenge outcome、bot-score／policy decision（若可取得）、capture／policy version，以及 model update 或 shadow／rollout 時間界線。這些欄位是依官方產品描述轉成的研究設計推論，不是 Cloudflare 提供給 xdxd 的通用 schema。[^cloudflare-adaptive-intelligence-2026-09-01]

研究時不可把「被 Cloudflare 判為 automated」等同於「AI Search crawler」，也不可把 known／verified bot category、user-agent 字串或單次 request 當成 request identity proof。應將 `policy_declared`、`request_observed`、`crawler_identity_attributed`、`page_indexed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開保存；Cloudflare bot-management telemetry 不能取代公開搜尋的 index、retrieval、citation 或 click evidence。

## 研究邊界

本來源沒有提供具名 AI crawler identity、robots.txt enforcement、公開搜尋 query panel、index／ranking／retrieval log、citation correctness、source presentation、referral／click denominator 或 GEO intervention estimate。因此，本 entity 維持 `draft`，只能支持 Cloudflare 自有 bot-detection implementation 與 attribution-control 的第一方描述，不支持 Adaptive Intelligence 會提升公開 AI Search ranking、citation、referral、click 或整體 agent discoverability。

它應與 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md)、[Cloudflare Bot Preference Sync](/entities/cloudflare-bot-preference-sync.md)、[Cloudflare Agentic Internet](/entities/cloudflare-agentic-internet.md) 及 [OpenAI Crawlers](/entities/openai-crawlers.md) 並列閱讀：前者偏網站端 AI crawler policy／enforcement，Bot Preference Sync 偏政策表示，Agentic Internet 偏平台框架，而 OpenAI entity 偏具名 crawler／user-triggered fetch。這些 entity 的控制面都不能互相代替公開搜尋 outcome。

原始證據與不可變 payload 見 [Cloudflare Adaptive Intelligence raw capture](/raw/cloudflare-adaptive-intelligence-2026-09-01.md)。研究保存規則見[證據生命週期](/methods/evidence-lifecycle.md)。

[^cloudflare-adaptive-intelligence-2026-09-01]: Cloudflare Blog, “Introducing Adaptive Intelligence: undermining the economics of every bot attack,” published 2026-08-31 and modified 2026-08-31. Source URL: <https://blog.cloudflare.com/introducing-adaptive-intelligence/>; immutable raw capture: [raw wrapper](/raw/cloudflare-adaptive-intelligence-2026-09-01.md), [HTML snapshot](/raw/cloudflare-adaptive-intelligence-2026-09-01/snapshot.html), and [Markdown response](/raw/cloudflare-adaptive-intelligence-2026-09-01/markdown-response.txt).
