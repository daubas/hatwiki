---
type: Platform Entity
title: "OpenAI ChatGPT Ads：廣告與回答分離的 application-side discovery surface"
description: "OpenAI 第一方公告描述 ChatGPT Ads 的對話上下文個人化、discovery／consideration／decision workflow 與廣告和 ChatGPT answers 的分離聲明；不等同公開 AI Search 或 GEO 成效。"
resource: https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/
tags:
  - entity
  - openai
  - chatgpt-ads
  - application-discoverability
  - source-presentation
  - recommendation
  - personalization
  - measurement
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T20:54:31Z
sources:
  - id: openai-chatgpt-ads-raw
    resource: /raw/openai-chatgpt-ads-2026-09-01.md
    title: OpenAI「A milestone in expanding access to AI」raw wrapper（2026-09-01）
    author: openai/product
    last_modified: 2026-09-01
  - id: openai-chatgpt-ads-sitemap
    resource: /raw/openai-chatgpt-ads-2026-09-01/sitemap-entry.txt
    title: OpenAI product sitemap entry for ChatGPT Ads announcement
    author: openai/platform
    last_modified: 2026-09-01
  - id: openai-ads-approach-raw
    resource: /raw/openai-chatgpt-ads-approach-2026-09-02.md
    title: OpenAI「Our approach to advertising and expanding access to ChatGPT」raw wrapper（2026-09-02）
    author: openai/product
    last_modified: 2026-08-31
  - id: openai-ads-approach-sitemap
    resource: /raw/openai-chatgpt-ads-approach-2026-09-02/sitemap-entry.txt
    title: OpenAI product sitemap entry for the advertising announcement
    author: openai/platform
    last_modified: 2026-08-31
---

# 定位

OpenAI 官方公告把 ChatGPT Ads 描述為 ChatGPT 內的 application-side advertising／decision surface：使用者可以在同一個 experience 中探索需求、評估選項並接近決策；廣告系統則可使用當前對話上下文，依國家與使用者設定可能使用更廣泛的 ChatGPT experience context。這是 OpenAI 的第一方產品描述，不是 xdxd 對推薦或個人化的獨立驗證。[^openai-chatgpt-ads-raw]

## 廣告與回答的分離聲明

公告聲明 ChatGPT Ads 會清楚標示並與 ChatGPT answers 分離，advertising 不會影響 ChatGPT 提供的 answers，廣告主不會取得私人對話，使用者可以控制廣告體驗的個人化。這些是產品／政策 claim；它們不等同已核對的 UI trace、prompt routing、model output comparison、privacy audit 或跨帳戶一致性。[^openai-chatgpt-ads-raw]

對 xdxd 的研究而言，這裡至少存在兩個不能合併的 application-side surface：

1. **Answer surface**：`answer_generated`、`source_link_present`、`citation_attached`、`citation_entails`、`shown`、`clicked`。
2. **Ad surface**：`ad_eligible`、`ad_personalization_context`、`ad_exposed`、`ad_clicked`、`advertiser_landing_opened`、`conversion`。

OpenAI 的「advertising does not influence answers」是來源聲明，而不是本 KB 的 causal estimate；若要研究此關係，需另行固定 country、plan、surface、account state、personalization setting、policy version 與 observation window。[^openai-chatgpt-ads-raw]

## 新的 planned ad surface 與 answer boundary

OpenAI 另一個 canonical announcement 的 sitemap `lastmod` 為 2026-08-31；可讀 representation 沒有提供頁面明示發布日期。公告新增的產品／政策描述是：廣告尚未推出，但計畫在未來幾週對美國、已登入、成人、Free／Go 使用者測試；初始形式預計在答案底部、當當前對話存在相關 sponsored product 或 service 時呈現，並與 organic answer 清楚分離。這是 planned test scope，不是本 KB 對 live eligibility、ad exposure 或排序的觀測。[^openai-ads-approach-raw][^openai-ads-approach-sitemap]

該公告再次把 answer independence、對話私密性與 personalization control 列為廣告原則，並以未成年人與 health、mental health、politics 等敏感／受規範主題作為不顯示廣告的排除方向。這些是 OpenAI 的 first-party policy claims，不是獨立的 UI、prompt routing、model-serving 或 privacy audit。[^openai-ads-approach-raw]

因此，後續 application-side 實驗應另外保存 `ad_policy_version`、`ad_eligible`、`ad_personalization_context`、`ad_exposed`、`ad_clicked`、`organic_answer_boundary`、`source_link_present`、`citation_entails`、`shown`、`clicked` 與 `task_completed`；不能用 ad event 代替公開 Web 的 `crawled`、`indexed`、`retrieved`、`used_in_answer` 或 `citation_entails`。[^openai-ads-approach-raw]

## Discovery、consideration 與 decision 的量測邊界

公告把 ChatGPT 的使用情境放在 software、語言學習、裝修、求職與興趣探索等 goal-directed tasks，並將 discovery、consideration、decision-making 描述為同一體驗的一部分。這支持把 application-side `need_explored`、`criteria_formed`、`alternative_evaluated`、`ad_exposed`、`answer_generated`、`outbound_opened` 與 `task_completed` 作為分層候選欄位；公告沒有提供這些事件的公開分母、執行紀錄、轉換定義或獨立 effect estimate。[^openai-chatgpt-ads-raw]

公告另稱 ChatGPT Ads 在推出不到 200 天後達到 10 億美元年化收入 run rate、已有數萬名廣告主，並擴展至印度、歐洲、中東與北非。這些是 OpenAI 的 company-reported observational claims，不能直接推導廣告 adoption、品質、使用者信任、click、conversion 或公開 GEO uplift。[^openai-chatgpt-ads-raw]

## 與既有 OpenAI surface 的關係

本 entity 應與 [OpenAI Crawlers：OAI-SearchBot 等](openai-crawlers.md) 分開：crawler／robots policy 描述公開 Web access control，ChatGPT Ads 描述 application-side paid surface。它也應與 [OpenAI ChatGPT App Directory 與 app submission](openai-chatgpt-app-directory.md) 分開：app directory 是 app discovery／invocation surface，Ads 是廣告呈現／個人化 surface。跨介面研究可沿用[跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](../methods/chinese-generative-search-cross-interface-observation.md)，但不得把廣告事件代替公開 Web 的 `crawled`、`indexed`、`retrieved`、`used_in_answer`、`citation_entails`、`shown` 或 `clicked`。

## 證據邊界

本 entity 不證明：

- ChatGPT Ads 的實際廣告 eligibility、排序、個人化 precision 或轉換率；
- 廣告不影響 answers 的獨立 causal／privacy audit；
- ChatGPT Search 的 crawler、index、ranking、retrieval、citation correctness 或 source-presentation uplift；
- 任何廣告、對話上下文、structured content 或其他介入會提升公開 AI Search 或 GEO 成效。

原始證據見 [OpenAI ChatGPT Ads raw capture](/raw/openai-chatgpt-ads-2026-09-01.md) 與 [OpenAI 新 Ads policy／planned test raw capture](/raw/openai-chatgpt-ads-approach-2026-09-02.md)。本 entity 維持 `status: draft`，沒有人工 `verified`。

[^openai-chatgpt-ads-raw]: [OpenAI ChatGPT Ads raw capture](/raw/openai-chatgpt-ads-2026-09-01.md)，canonical source 為 <https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/>；保存的 selected excerpts、HTTP metadata、sitemap locator、capture metadata 與權利邊界在 [raw capture directory](/raw/openai-chatgpt-ads-2026-09-01/)。
[^openai-ads-approach-raw]: [OpenAI 新 Ads policy／planned test raw capture](/raw/openai-chatgpt-ads-approach-2026-09-02.md)，canonical source 為 <https://openai.com/index/our-approach-to-advertising-and-expanding-access/>；保存的 selected excerpts、sanitized HTTP metadata、sitemap locator、capture metadata 與權利邊界在 [raw capture directory](/raw/openai-chatgpt-ads-approach-2026-09-02/)。
[^openai-ads-approach-sitemap]: OpenAI product sitemap 對 <https://openai.com/index/our-approach-to-advertising-and-expanding-access/> 的 canonical entry，`lastmod: 2026-08-31T13:03:31.184Z`；保存於 [sitemap-entry.txt](/raw/openai-chatgpt-ads-approach-2026-09-02/sitemap-entry.txt)。
