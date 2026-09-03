---
type: Platform Entity
title: OpenAI GPT-Live
description: OpenAI 第一方頁面描述的全雙工語音互動、背景 web search／reasoning／agentic delegation 與 BrowseComp benchmark surface；不等同公開 AI Search 或 GEO 成效證據。
resource: https://openai.com/index/introducing-gpt-live/
tags:
  - entity
  - openai
  - gpt-live
  - voice-agent
  - agentic-search
  - web-search
  - tool-invocation
  - delegation
  - browsecomp
  - application-side-discoverability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T22:26:54.253809Z
sources:
  - id: openai-gpt-live-raw
    resource: /raw/openai-gpt-live-2026-09-01.md
    title: OpenAI「Introducing GPT-Live」官方頁面 raw wrapper（2026-09-01）
    author: openai/product
    last_modified: 2026-08-31
---

# 定位

OpenAI 官方頁面將 GPT-Live 描述為新一代語音模型與 ChatGPT Voice runtime。它以全雙工方式持續處理輸入與輸出，並把需要搜尋、推理或較複雜 agentic work 的部分委派給背景模型。這是 OpenAI 的 application-side product description，不是本 KB 對 live ChatGPT Voice 的獨立驗證。[^openai-gpt-live-raw]

## 全雙工互動與工具決策

頁面表示 GPT-Live 可在持續互動中決定是否說話、繼續聆聽、暫停、打斷或呼叫工具；這使 voice turn、interruption、tool invocation 與 response-return timing 成為可分開觀測的 runtime event，而不是一個單一的「回答完成」訊號。[^openai-gpt-live-raw]

## 背景搜尋委派

OpenAI 把 GPT-Live 的 continuous interaction 與 deeper work 解耦：當問題需要 web search、reasoning 或更具 agentic 性質的工作時，GPT-Live 可在背景委派給另一個 frontier model，頁面以 launch-time GPT-5.5 作為例子，並稱日後會持續更新所使用的模型。[^openai-gpt-live-raw]

研究上應至少保存 `search_delegate_requested`、`delegate_model_declared`、`background_task_started`、`tool_invocation_requested`、`result_returned`、`answer_surface_updated`、`failure`、`retry` 與 response／trace hash。`delegate_model_declared` 不能取代實際 served model、搜尋 query、retrieval result 或 claim-level evidence。

## BrowseComp 與產品自報邊界

頁面報告 GPT-Live-1 在 BrowseComp 相較 Advanced Voice Mode 有 strong gains，並將 BrowseComp 說明為測試 agentic web search 與尋找難找資訊的能力。這是 OpenAI 自報的 observational benchmark claim；頁面沒有提供完整數值、raw run、外部重現或 citation-support audit。[^openai-gpt-live-raw]

頁面也描述 GPT-Live 支援 search、memory、images 與 file uploads，並將 GPT-Live-1／mini 置於 ChatGPT 使用者 rollout 脈絡。這些產品 surface 不應與 [OpenAI Crawlers](/entities/openai-crawlers.md) 的 `OAI-SearchBot`／`ChatGPT-User`／`GPTBot` 角色混為一談：語音 runtime 的搜尋委派不是 crawler request，也不是公開 Web index inclusion。[^openai-gpt-live-raw]

## 研究分層與證據邊界

在自有或明確授權的測試環境，可把 GPT-Live 轉成 application-side trace：

```text
voice_turn → search_delegate_requested → background_task_started
→ tool_invocation → result_returned → answer_surface_updated
→ claim_supported → citation_entails → shown → clicked
```

前半段是來源可支持的 runtime／product surface abstraction；後半段的 `claim_supported`、`citation_entails`、`shown` 與 `clicked` 需要另行取得 response、citation、UI 或 referral evidence，不能由 OpenAI 的 BrowseComp、rollout、Voice product claim 推導。它可與 [OpenAI Presence](/entities/openai-presence.md) 的 policy／evaluation／production signal lifecycle，以及 [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 的 capability／retrieval 分層互相對照。[^openai-gpt-live-raw]

本 entity 維持 `status: draft`，尚未有人工作確認。它支持 OpenAI 對 GPT-Live 語音、背景搜尋委派與 agentic runtime 的第一方描述，不提供公開 crawler、index、ranking、retrieval、citation、source presentation、referral、click、跨引擎一致性或 GEO uplift 證據。原始來源與權利邊界見 [GPT-Live raw capture](/raw/openai-gpt-live-2026-09-01.md)。[^openai-gpt-live-raw]

[^openai-gpt-live-raw]: [OpenAI GPT-Live raw capture](/raw/openai-gpt-live-2026-09-01.md)，canonical source 為 <https://openai.com/index/introducing-gpt-live/>；完整頁面未保存，僅保留 selected excerpts 與 provenance receipts。
