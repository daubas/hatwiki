---
type: Platform Entity
title: OpenAI GPT-5.6
description: OpenAI 第一方頁面描述的 GPT-5.6 agentic runtime、Programmatic Tool Calling、multi-agent beta 與 BrowseComp benchmark surface；不等同公開 AI Search 或 GEO 成效證據。
resource: https://openai.com/index/gpt-5-6/
tags:
  - entity
  - openai
  - gpt-5-6
  - agentic-search
  - programmatic-tool-calling
  - multi-agent
  - browsecomp
  - application-side-discoverability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T23:16:13Z
sources:
  - id: openai-gpt-5-6-raw
    resource: /raw/openai-gpt-5-6-2026-09-01.md
    title: OpenAI GPT-5.6 官方頁面 raw wrapper（2026-09-01）
    author: openai/product
    last_modified: 2026-08-31
---

# 定位

OpenAI 官方產品頁描述 GPT-5.6 家族的 Sol、Terra 與 Luna，以及其 browsing、tool use、computer use 與長程工作定位。這是 model／application runtime 的第一方產品描述，不是本 KB 對任何 live deployment、帳戶 access 或公開搜尋成效的獨立驗證。[^openai-gpt-5-6-raw]

## Agentic runtime surface

- **Programmatic Tool Calling**：頁面表示 GPT-5.6 可寫入並執行協調工具的輕量程式，處理中間結果、監測進度並選擇後續動作；OpenAI 將這個能力放在 Responses API 的 Programmatic Tool Calling 介面中。[^openai-gpt-5-6-raw]
- **Multi-agent beta**：頁面說明 GPT-5.6 可在單一 request 中執行並彙整 concurrent subagents 的工作。這可作為 `subagent_started`、`subagent_result_returned`、`intermediate_filtered` 與 `synthesis_completed` 的 application-side trace 設計輸入，但不能替代實際 trace。[^openai-gpt-5-6-raw]
- **BrowseComp surface**：頁面報告 GPT-5.6 Sol 的 BrowseComp 結果為 `92.2%`。這是 OpenAI 自報的 benchmark claim，沒有在本 KB 中重跑，也沒有提供公開 Web citation-support 或 click audit。[^openai-gpt-5-6-raw]

## 與 discoverability 研究的連接

對已知 URL 的 Agent Reader 或受控 agentic-search runtime，這個 entity 可與 [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 連接，將以下變項分開保存：

```text
model_family／effort／plan
→ search_or_tool_request
→ programmatic_intermediate_processing
→ subagent_started／subagent_result_returned
→ candidate_exposed／retrieved
→ evidence_span_extracted／claim_supported
→ citation_entails／shown／clicked
```

前半段是 OpenAI 頁面描述的 model／application capability mapping；後半段必須以固定 source snapshot、tool／response receipt、claim-level audit、UI 或 referral evidence 另行取得。`delegate_model_declared`、benchmark score 或 application availability 不等同實際 served model、公開 crawler、index、ranking、retrieval、citation、source presentation 或 GEO outcome。

## 研究邊界

本 entity 維持 `status: draft`，未加入人工或第二 Agent `verified`。它支持 OpenAI 對 GPT-5.6 runtime、Programmatic Tool Calling、multi-agent beta 與 BrowseComp 自報的第一方描述；不支持模型能力必然提升網站被公開 AI Search 找到、選取、引用、展示、導流或點擊。原始證據、canonical request 的 `403` challenge boundary、Reader `200` representation、selected excerpts、HTTP metadata、sitemap lastmod 與 rights record 見 [GPT-5.6 raw capture](/raw/openai-gpt-5-6-2026-09-01.md)。它應與 [OpenAI GPT-Live](/entities/openai-gpt-live.md) 的 voice／background delegation，以及 [OpenAI Crawlers](/entities/openai-crawlers.md) 的 crawler role 分開閱讀。[^openai-gpt-5-6-raw]

[^openai-gpt-5-6-raw]: [OpenAI GPT-5.6 raw capture](/raw/openai-gpt-5-6-2026-09-01.md)，canonical source 為 <https://openai.com/index/gpt-5-6/>；完整頁面未保存，僅保留 selected excerpts 與 provenance receipts。
