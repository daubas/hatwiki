---
type: Entity
title: "OpenAI Polimill／QommonsAI：跨自治體知識庫與 application-side agent surface"
description: "OpenAI 官方 customer story 對 QommonsAI 的跨自治體資料標準化、AI metadata、搜尋 foundation、治理 controls 與 Qommons ONE super-agent 規劃之第一方描述；不等同公開 Web AI Search 或 GEO 成效證據。"
resource: https://openai.com/index/polimill/
tags:
  - openai
  - polimill
  - qommonsai
  - public-sector
  - structured-content
  - agent-discoverability
  - application-side
  - search-representation
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T09:06:03.952632000Z
sources:
  - id: openai-polimill-raw
    resource: /raw/openai-polimill-qommonsai-2026-09-01.md
    title: OpenAI Polimill／QommonsAI raw wrapper（2026-09-01）
    author: openai/customer-stories
    last_modified: 2026-08-31
---

# 官方案例定位

OpenAI 的官方 customer story 將 Polimill 描述為以 OpenAI technology 建置 QommonsAI 的日本公共部門案例；頁面稱其涵蓋議會答覆、公共服務、社會福利與法律搜尋，並自述約 1,050 個自治體與約 550,000 名公務員使用。這是 OpenAI 的第一方 application／adoption 描述，數字維持 `observational`，不是 xdxd 的獨立 adoption audit。[^openai-polimill-raw]

# 跨自治體資料與搜尋 representation

案例描述 Polimill 將各地議會紀錄收集與標準化，再以 AI 加入 metadata，建立可跨自治體與時間搜尋的 high-precision search foundation；其後把相同結構擴展至福利、法律及其他行政領域，透過共同介面讓分散行政資訊可被搜尋與日常使用。這支持把下列欄位拆開觀測，而不是把它們壓成單一「agent-ready」分數：[^openai-polimill-raw]

| Layer | Draft observation fields | 不可直接外推 |
|---|---|---|
| Data／identity | `source_scope`、`organization_id`、`document_type`、`standardized`、`metadata_added`、`representation_hash` | 不代表資料已公開、可被外部 crawler 存取或已進入公開搜尋 index |
| Search／evidence | `time_scope`、`query_executed`、`result_returned`、`result_identity`、`evidence_span`、`freshness_checked` | 不代表 high-precision 是獨立量測，也不代表 citation entailment 或 answer adoption |
| Governance | `usage_history_available`、`model_policy_declared`、`policy_applied`、`audit_event_recorded` | 不代表 control 已在 live deployment 中正確執行或改善 reliability |
| Agent／application | `app_registered`、`app_listed`、`agent_invoked`、`tool_result_returned`、`workflow_completed` | 不得把 application-side event 當成公開 Web ranking、referral 或 click |
| Public Web AI Search | `crawled`、`indexed`、`candidate_exposed`、`retrieved`、`used_in_answer`、`citation_entails`、`cited`、`shown`、`clicked` | 本案例沒有提供這些公開 Web evidence |

這些欄位是依第一方案例建立的 xdxd draft translation，不是 OpenAI 宣布的 GEO schema。[^openai-polimill-raw]

# Future super-agent surface

OpenAI 描述 Polimill 計畫在 2026 年秋季完整推出 Qommons ONE：由外部公司提供 municipal applications，並以能串接多個 specialized AI systems 與 private-sector apps 的 super agent 為中心。這是 future plan；本 entity 不把它寫成已完成的 directory exposure、app selection、agent call 或 workflow completion。[^openai-polimill-raw]

# 證據邊界

本 entity 只支持 OpenAI 對 Polimill／QommonsAI 的第一方 customer-story 描述，維持 `status: draft`，尚無人工 `verified`。它不支持 QommonsAI 的 precision／recall、資料品質、adoption denominator、模型品質、可靠性、task completion、ROI、跨平台互通性、公開 AI Search crawler、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。原始 capture 的 canonical `403` challenge、Reader `200` representation、selected excerpts、HTTP metadata、SHA-256 與權利界線見 [Polimill／QommonsAI raw wrapper](/raw/openai-polimill-qommonsai-2026-09-01.md)。[^openai-polimill-raw]

# 與既有研究的關係

- 與 [OpenAI MCPKit：安全資料連接器與 ChatGPT application-side agent surface](/entities/openai-mcpkit.md) 對照：MCPKit 聚焦 connector／access／tool setup；本案例補充跨組織資料標準化、metadata、搜尋 representation 與公共部門治理。
- 與 [Agent-ready website 與 web agent reliability 觀測方法](/methods/agent-ready-websites-and-web-agent-reliability.md) 對接：保留 representation、application operability、invocation、postcondition 與公開 Web funnel 的事件分離。
- 與 [生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md) 對接：把資料 representation、retrieval、evidence span、citation entailment 與 downstream outcome 分開，而不從 application-side search foundation 推論公開 GEO uplift。

[^openai-polimill-raw]: [OpenAI Polimill／QommonsAI raw capture](/raw/openai-polimill-qommonsai-2026-09-01.md)，canonical source 為 <https://openai.com/index/polimill/>。
