---
type: Platform Entity
title: Perplexity Search API：ranked results、filters 與 context budget
description: Perplexity 官方 Search API 文件定義的 structured ranked results、domain／language／region 控制、domain／TLD／path filter semantics、content extraction budget 與 Agent API citation surface 分界。
resource: https://docs.perplexity.ai/docs/search/quickstart
tags:
  - entity
  - perplexity
  - ai-search
  - search-api
  - retrieval
  - citation
  - source-presentation
  - agent-discoverability
  - people-search
  - entity-resolution
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-30T04:50:52Z
sources:
  - id: perplexity-search-api-docs
    resource: /raw/perplexity-search-api-2026-08-28.md
    title: Perplexity Search API 官方文件（2026-08-28 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-search-domain-filter
    resource: /raw/perplexity-search-domain-filter-2026-08-30.md
    title: Perplexity Search Domain Filter 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-29
  - id: perplexity-search-language-filter
    resource: /raw/perplexity-search-language-filter-2026-08-30.md
    title: Perplexity Search Language Filter 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
  - id: perplexity-people-search
    resource: /raw/perplexity-search-people-search-2026-08-30.md
    title: Perplexity People Search 官方文件（2026-08-30 raw capture）
    author: perplexity/docs
    last_modified: 2026-08-28
---

# Entity

Perplexity 官方文件把 Search API 描述為取得即時、排序後 Web results 的 structured retrieval surface，並將 raw results 的自行處理與 Agent API 的帶 citation 生成回答分開。[^perplexity-search-api-docs] 這使它適合作為 xdxd GEO 研究中的 platform entity：可觀測「候選結果與 retrieval response」的 API 層，但不可把 API 結果直接當成公開 Perplexity answer、citation 或 GEO outcome。

## 官方文件記載的產品表面

- **Structured ranked results**：文件說明 Search API 回傳結果資料，示例包含 `title`、`url`、`snippet`、`date` 與 `last_updated`；這些欄位是平台文件描述的 response surface，不是公開搜尋內部 ranking schema。[^perplexity-search-api-docs]
- **Query 與結果數量**：`max_results` 文件範例接受 1–20，預設為 10；multi-query 最多可放五個 related queries，文件說明各 query 會獨立處理，計費與 rate-limit 計數邊界不同。[^perplexity-search-api-docs]
- **Domain／language／region 控制**：`search_domain_filter` 可用 allowlist 或 `-` 前綴 denylist，不能在同一 request 混用，並可附 site path；文件另描述最多 20 個 domain、最多 10 個 ISO 639-1 language codes，以及 `country` 的 ISO 3166-1 alpha-2 形式。[^perplexity-search-api-docs]
- **內容擷取預算**：`search_context_size` 有 `low`、`medium`、`high` 三種，文件標示 `high` 為 default；也可用 `max_tokens` 與 `max_tokens_per_page` 手動限制總量與每頁量，但不能和 `search_context_size` 同時使用。[^perplexity-search-api-docs]
- **Raw results 與生成回答的 surface 分界**：文件建議需要 raw results 供自行處理時使用 Search API，需要帶 citations 的 LLM-generated answer 時使用 Agent API。這是產品用途分界，不是 Search API 對 Agent API citation 的因果保證。[^perplexity-search-api-docs]

## Search Domain Filter：來源範圍與 matching semantics

新增的 Perplexity 官方文件把 `search_domain_filter` 的來源範圍控制拆成 allowlist 與 denylist：未加 `-` 的值只納入指定 domain，加 `-` 的值排除指定 domain；同一 request 不可混用兩種模式，每次最多 20 個 domain。文件要求值不帶 protocol，並將 domain filter 定位為 Search API 的來源選擇，而非公開搜尋排名或 citation 品質規則。[^perplexity-search-domain-filter]

- **Root domain 與 TLD**：文件說明 root domain 可匹配該 domain 及其 subdomains；`.gov`、`.edu`、`.uk` 等 TLD 或 domain part 也可作為篩選值。這是 Perplexity 文件中的 matching contract，不應外推到 Google、Bing、OpenAI 或其他搜尋產品。[^perplexity-search-domain-filter]
- **Path boundary**：domain 後可附 path，例如 `example.com/docs`；文件將它描述為 path-segment 起始邊界，匹配 `/docs` 與 `/docs/intro`，但不匹配 `/documentation`，且 path-qualified value 可加 `-` 做 denylist。這是 Perplexity 文件中的 matching contract，不應外推到 Google、Bing、OpenAI 或其他搜尋產品。[^perplexity-search-domain-filter]
- **研究控制**：官方 examples／best practices 建議依可信 domain、出版網路、TLD、locale 或 language 縮小搜尋範圍，同時提醒 restrictive filters 可能減少結果。這是條件式使用指南，不是已由 xdxd 重現的 recall、latency、ranking、citation 或 GEO 因果效果。[^perplexity-search-domain-filter]

## Search Language Filter：語言條件與觀測分層

Perplexity 另以獨立官方文件描述 `search_language_filter`：參數接受 ISO 639-1 兩字母代碼陣列，每個 request 最多 10 種語言，並將結果限制在指定語言。文件也展示 Python、TypeScript 與 cURL request，且說明此 filter 會與其他 Search API 參數一併套用。這是 Search API 的來源選擇 contract，不是公開 answer surface 的語言、排序或 citation 規則。[^perplexity-search-language-filter]

- 官方文件將 multilingual research、regional／local-language content 與 language-specific application 列為使用情境，並提供語言代碼驗證與策略性選擇的 guidance；沒有提供 xdxd 可直接採用的獨立 recall、precision、latency 或 quality benchmark。[^perplexity-search-language-filter]
- 在 xdxd 的 paired run 中，應把 `search_language_filter` 的原始陣列、正規化代碼、locale／country 與 query 保存為獨立控制變項，並與 unrestricted、single-language、multi-language、language-plus-domain、language-plus-date arms 對照。
- Language filter 的 `retrieved` 結果不可直接充當公開 Perplexity answer 的 `used_in_answer`、`cited`、`citation_entails`、`shown` 或 `clicked` 證據；若要主張任何 GEO 或公開 AI Search effect，仍需端到端結果與明確分母。[^perplexity-search-language-filter]

## People Search：人物 entity 的專用搜尋與 agent tool surface

Perplexity 官方文件說明，Search API 的 `search_type="people"` 會把 request 路由到 People Search backend，針對 professionals、employees 與 public figures 回傳姓名、職稱與公司等 professional information。文件列出的使用情境包括個人職涯背景、公司／職稱員工、特定領域或地點的專業人士，以及 leadership team／組織結構查詢；`max_results`、`max_tokens_per_page` 等其他 Search API 參數仍可套用。[^perplexity-people-search]

- 這是 Perplexity 的**平台專用人物 entity discovery surface**，不是公開 Web 的通用人物索引標準，也不揭露 People Search 的完整 coverage、ranking 或 entity-resolution 演算法。
- 官方 example 展示 `snippet`、`title`、`url`、`date` 與 `last_updated` 等 result fields；這些是文件示例的 response schema，不是本 KB 執行的 live query，也不等於姓名已正確解析、來源已支持主張或結果已進入公開回答。[^perplexity-people-search]
- 文件描述把 People Search 暴露為第三方 agent SDK 的 `people_search` function tool，並要求 description 將用途限制在 individual employee lookup、career history 或工作條件的人員搜尋；複雜請求最多使用五個 query variations。對一般 executives、leadership teams 或 public figures，文件建議偏好 `search_web`，因其回傳較豐富的 curated results。[^perplexity-people-search]
- OpenAI strict tool schema example 要求 `additionalProperties: false` 並將所有 property 放入 `required`，且不接受 `minItems`／`maxItems`；五-query 上限需由 description 與 handler 防禦式實作。這是官方 integration guidance，不是跨平台 agent tool 標準。[^perplexity-people-search]

在 xdxd 的人物 visibility 研究中，應把 `people` route 的 `retrieved` 結果與[個人層級 AI visibility、姓名辨識與 roster denominator 觀測](/methods/individual-ai-visibility-measurement.md) 的 `roster_free_text_detection`、`roster_overlap`、`citation_type` 分開記錄；不能把 People Search result、agent tool invocation 或 profile URL 直接當成公開回答的 `used_in_answer`、`cited`、`citation_entails`、`shown` 或 `clicked` 證據。若做 paired run，至少固定 query、`search_type`、`max_results`、`max_tokens_per_page`、語言／地區、response hash、結果 URL 與姓名解析規則，並另外保存公開 Web funnel。[^perplexity-people-search]

若將 domain filter 納入 xdxd 的跨引擎或 Agent Reader paired run，應保存原始／正規化 filter、allow／deny mode、root／TLD／path boundary、query、locale、source snapshot、result order、response hash、candidate availability、`retrieved`、`used_in_answer`、`citation_entails`、`cited`、`shown` 與 `clicked`。至少對照 unrestricted、root-domain、path-qualified、TLD、denylist 與 language／date interaction arms；不得把文件 examples 或 filter contract 當成公開 crawler、index、ranking、citation、source presentation 或 GEO evidence。[^perplexity-search-domain-filter]

## xdxd 研究與觀測邊界

若將此 API 納入自有或明確授權 corpus 的研究，至少要保存：

1. `query`／multi-query 陣列、query order、`max_results`、domain／path allowlist 或 denylist、language／country、`search_context_size` 或 explicit token budgets。
2. API／SDK／CLI route、request／response time、response snapshot 與 hash、result order、normalized URL、title、snippet、source date／last-updated、HTTP metadata、client／package version 與錯誤／rate-limit 狀態。
3. 將 API 回傳的 `retrieved`／candidate exposure 與 Agent API answer 的 `used_in_answer`、`cited`、`shown`、`supported`、`clicked` 分欄；不得用 Search API 的 result rank 代替 answer citation，也不得用 citation 代替 claim-level support。
4. 將 filter 與 context budget 視為明確介入因素，做同一 query／source snapshot 的 paired runs；若要研究公開 AI Search，另行保存 crawler、index、public-surface 與 referral evidence。

這些欄位是 xdxd 根據官方 API surface 推導的觀測設計，不是 Perplexity 宣布的研究 schema，也未證明 filter、snippet、content budget 或 Agent API 會提升公開 AI Search visibility、citation、click 或 GEO 成效。產品判斷維持：**Known-URL Agent Reader 可先驗證；公開 AI 搜尋加速器仍需授權 corpus 與端到端 evidence。**

此 entity 可與 [Perplexity Crawlers](/entities/perplexity-crawlers.md) 對照 crawler／robots policy，並銜接[跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md) 的 response／citation 分層、[AI visibility measurement 的 rank stability 與 structural sufficiency](/methods/ai-visibility-measurement-convergence.md) 的重複與排名穩定性要求，以及[證據生命週期](/methods/evidence-lifecycle.md) 的 raw snapshot 規則。原始文件與不可變 payload 見 [Perplexity Search API raw capture](/raw/perplexity-search-api-2026-08-28.md)、[Search Domain Filter raw capture](/raw/perplexity-search-domain-filter-2026-08-30.md) 與 [Search Language Filter raw capture](/raw/perplexity-search-language-filter-2026-08-30.md)。

[^perplexity-search-api-docs]: Perplexity, “Perplexity Search API,” canonical URL: <https://docs.perplexity.ai/docs/search/quickstart>. Immutable raw capture: [metadata](/raw/perplexity-search-api-2026-08-28.md), [Markdown snapshot](/raw/perplexity-search-api-2026-08-28/snapshot.md.txt), and [HTTP headers](/raw/perplexity-search-api-2026-08-28/response-headers.txt).
[^perplexity-search-domain-filter]: Perplexity, “Search Domain Filter,” official Search API documentation, canonical URL: <https://docs.perplexity.ai/docs/search/filters/domain-filter>. Immutable raw capture: [metadata](/raw/perplexity-search-domain-filter-2026-08-30.md), [Markdown payload](/raw/perplexity-search-domain-filter-2026-08-30/search-domain-filter.md.txt), [HTTP metadata](/raw/perplexity-search-domain-filter-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-search-domain-filter-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-search-domain-filter-2026-08-30/sha256.txt).
[^perplexity-search-language-filter]: Perplexity, “Search Language Filter,” official Search API documentation, canonical URL: <https://docs.perplexity.ai/docs/search/filters/language-filter>. Immutable raw capture: [metadata](/raw/perplexity-search-language-filter-2026-08-30.md), [HTML snapshot](/raw/perplexity-search-language-filter-2026-08-30/snapshot.html), [HTTP headers](/raw/perplexity-search-language-filter-2026-08-30/response-headers.txt), [capture metadata](/raw/perplexity-search-language-filter-2026-08-30/capture-metadata.json), and [SHA-256](/raw/perplexity-search-language-filter-2026-08-30/sha256.txt).
[^perplexity-people-search]: Perplexity, “People Search,” official Search API documentation, page `dateModified` `2026-08-28T21:05:49.145Z`. Source URL: <https://docs.perplexity.ai/docs/search/filters/people-search>. Immutable raw capture: [wrapper](/raw/perplexity-search-people-search-2026-08-30.md), [HTML snapshot](/raw/perplexity-search-people-search-2026-08-30/snapshot.html), [Markdown payload](/raw/perplexity-search-people-search-2026-08-30/people-search.md.txt), [HTTP metadata](/raw/perplexity-search-people-search-2026-08-30/response-headers.txt), and [SHA-256](/raw/perplexity-search-people-search-2026-08-30/sha256.txt).
