---
type: Platform Entity
title: "OpenAI ChatGPT Atlas：瀏覽器搜尋、記憶與 Agent action surface"
description: "OpenAI 第一方公告描述 ChatGPT Atlas 的搜尋結果入口、browser memories、頁面可見性、agent mode、安全控制，以及 Apps SDK／ARIA 的 discoverability 方向；不等同公開 AI Search 或 GEO 成效證據。"
resource: https://openai.com/index/introducing-chatgpt-atlas/
tags:
  - entity
  - openai
  - chatgpt-atlas
  - generative-search
  - agent-discoverability
  - browser-agent
  - source-presentation
  - agent-ready-websites
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-02T01:02:11.336855Z
sources:
  - id: openai-chatgpt-atlas-raw
    resource: /raw/openai-chatgpt-atlas-2026-09-02.md
    title: OpenAI《Introducing ChatGPT Atlas》官方公告 raw wrapper（2026-09-02）
    author: openai/product
    last_modified: 2026-09-01
  - id: openai-chatgpt-atlas-sitemap
    resource: /raw/openai-chatgpt-atlas-2026-09-02/sitemap-entry.txt
    title: OpenAI product sitemap entry for ChatGPT Atlas
    author: openai/platform
    last_modified: 2026-09-01
---

# 官方定位

OpenAI 將 ChatGPT Atlas 描述為以 ChatGPT 為核心的 web browser，讓搜尋、瀏覽上下文、工作與 agent action 由同一個 application-side experience 串接。新分頁可提問或輸入 URL，並在可用時切換 search links、images、videos 與 news 等結果類型；這是 OpenAI 的第一方產品描述，不是公開 Web Search 的 crawler、index 或 ranking 說明。[^openai-chatgpt-atlas-raw]

## Browser memory 與 page visibility

公告把 browser memories 描述為可選且可由使用者管理；address-bar 的 ChatGPT page visibility 關閉時，ChatGPT 不查看該網站內容，也不由該頁建立 memories。公告另聲稱瀏覽內容預設不作模型訓練，opt in 後才可啟用 `include web browsing`，而 GPTBot opt-out 頁面不會被訓練。這些是 OpenAI 的產品／policy claims，沒有 xdxd 的帳戶、runtime、request 或 training pipeline 獨立驗證。[^openai-chatgpt-atlas-raw]

對已知 URL Agent Reader 的研究，至少應把 `page_visibility`、`browser_memory_enabled`、`logged_out`、`content_seen`、`memory_created` 與 `training_policy_declared` 分開保存；它們不能代替公開 Web `crawled`、`indexed` 或 `retrieved` evidence。這是 xdxd 的 draft protocol inference。

## Agent mode 與 website／app discoverability

Atlas 公告描述 agent mode 可在瀏覽上下文中研究、分析、執行工作、規劃活動或預約；agent 可能在開 tabs／點擊前詢問，且 preview 仍可能在複雜工作出錯。公告列出不能在 browser 執行程式、下載檔案或安裝 extensions、不能存取其他 app／filesystem、敏感網站動作會暫停確認，以及 logged-out mode 等安全控制。這是 application-side capability／safety description，不是 live reliability、task-success 或 conversion 結果。[^openai-chatgpt-atlas-raw]

OpenAI roadmap 表示 Apps SDK developers 可增加 apps 在 Atlas 中的 discoverability，網站擁有者可加入 ARIA tags 以改善 ChatGPT agent 在網站上的運作。這支持將 app／website capability representation、`aria_snapshot`、candidate exposure、action path 與 postcondition validation 納入 known-URL agentability 研究；不證明 ARIA、Apps SDK 或 Atlas 對公開 AI Search citation、ranking、referral 或 GEO 的因果提升。[^openai-chatgpt-atlas-raw]

## 與既有研究的關係

本 entity 應與 [Agent-ready website 與 web agent reliability 觀測方法](/methods/agent-ready-websites-and-web-agent-reliability.md) 的 known-URL action surface 相接，也應與 [OpenAI WebMCP Challenge](/entities/openai-webmcp-challenge.md) 的 structured-tool／client-runtime layer 分開保存。若研究 OpenAI 公開 Web access，則沿用 [OpenAI Crawlers](/entities/openai-crawlers.md) 的 crawler／robots policy 邊界；Atlas 的 browser page visibility、memory 與 agent action 不能被當作 OAI-SearchBot 的公開爬取證據。

候選漏斗應分開保存：

- Atlas application surface：`search_result_type`→`page_opened`→`content_seen`→`action_invoked`→`postcondition_valid`→`task_completed`。
- 公開 Web surface：`crawled`→`indexed`→`candidate_exposed`→`retrieved`→`used_in_answer`→`citation_entails`→`shown`→`clicked`。

## Claim boundary

| Claim | Status | Boundary |
|---|---|---|
| Atlas 是 OpenAI 描述的 ChatGPT-centered browser，含多種 search result type。 | supported | 只支持 OpenAI 官方公告的產品描述；未獨立核對帳戶、地區或 serving。[^openai-chatgpt-atlas-raw] |
| Browser memories 與 page visibility 是可選／可控的 application-side state。 | supported | 來源聲明，不是 xdxd 的 data-flow 或 privacy audit。[^openai-chatgpt-atlas-raw] |
| Agent mode、ARIA tags 或 Apps SDK 會普遍提升 agent reliability、task completion 或 discoverability。 | observational | 公告為 capability／roadmap statement，沒有公開對照、分母或 effect estimate。[^openai-chatgpt-atlas-raw] |
| Atlas 提升公開 AI Search 或 GEO visibility。 | unresolved | 沒有公開 crawl、index、ranking、retrieval、citation、shown、click 或跨引擎 intervention evidence。 |

# 研究狀態

本 entity 維持 `draft`，沒有人工 `verified`。原始 evidence 見 [OpenAI ChatGPT Atlas raw capture](/raw/openai-chatgpt-atlas-2026-09-02.md)。後續若在獲授權的 Atlas、browser 或 website test surface 做研究，需固定 browser／model／account／locale、page visibility、memory、logged-out state、ARIA／app version、prompt、tool／click path、pre／post state 與 outcome receipt；不得把官方 roadmap 寫成已完成的產品效果。

[^openai-chatgpt-atlas-raw]: [OpenAI《Introducing ChatGPT Atlas》官方公告 raw wrapper](/raw/openai-chatgpt-atlas-2026-09-02.md)，canonical source 為 <https://openai.com/index/introducing-chatgpt-atlas/>；selected excerpts、HTTP metadata、sitemap locator、capture metadata 與權利邊界在 [raw capture directory](/raw/openai-chatgpt-atlas-2026-09-02/)。
