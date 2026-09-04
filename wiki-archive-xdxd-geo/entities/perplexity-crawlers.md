---
type: Platform Entity
title: Perplexity Crawlers：PerplexityBot 與 Perplexity-User
description: Perplexity 官方文件定義的搜尋 crawler、使用者觸發 fetch、robots.txt 與 WAF／IP 控制邊界。
resource: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
tags:
  - entity
  - perplexity
  - ai-search
  - ai-crawler
  - robots-txt
  - agent-discoverability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T14:14:55Z
sources:
  - id: perplexity-crawlers-docs
    resource: /raw/perplexity-crawlers-2026-08-25.md
    title: Perplexity Crawlers 官方文件（2026-08-25 raw capture）
    author: perplexity/docs
---

# Entity

Perplexity 官方文件將其 web crawlers 與 user agents 的產品用途分開描述，並把各項 robots.txt 設定視為獨立控制面。[^perplexity-crawlers-docs] 這使它適合在 xdxd GEO 實驗中作為「搜尋可見性控制」與「使用者觸發 fetch」分離的 platform entity，而不是把所有 AI crawler 流量視為同一訊號。

## 官方文件記載的 crawler 角色

- **`PerplexityBot`**：用於在 Perplexity 搜尋結果中呈現並連結網站；官方文件明確說它不會用來爬取內容供 AI foundation models 使用。文件建議若希望網站出現在 Perplexity 搜尋結果中，允許 `PerplexityBot`，並允許其公布 IP ranges。[^perplexity-crawlers-docs]
- **`Perplexity-User`**：支援 Perplexity 內的使用者動作；當使用者提問時，可能造訪網頁以協助產生回答，並在回答中包含頁面連結。官方文件說它不是 web crawling，也不收集內容供 AI foundation model training；由於 fetch 是使用者請求觸發，文件表示這個 fetch 一般會忽略 robots.txt 規則。[^perplexity-crawlers-docs]

## 官方文件記載的控制與操作邊界

- Perplexity 文件把 crawler／user agent 的設定分開處理，並表示各項設定可能需要最多 24 小時反映到系統。這可作為 policy 變更後的等待窗口，但不是效果量測結果。[^perplexity-crawlers-docs]
- 官方文件建議 WAF 同時比對 User-Agent 字串與 Perplexity 公布的 IP ranges；PerplexityBot 與 Perplexity-User 的 IP endpoints 會定期更新，文件建議自動定期取得最新範圍，以維持 WAF 規則。這是 request access／識別的操作指引，不等於允許後一定能被搜尋、retrieval 或引用。
- 對 xdxd 研究而言，至少要保存 `robots.txt` policy version、WAF／allowlist version、crawler request log、policy 變更 UTC 時間與等待窗口；再把 Search appearance、retrieved URL、citation、click 分別觀測。

## GEO 研究邊界

這份一手平台文件支持「Perplexity 搜尋 crawler、使用者觸發 fetch 與 training use 可分開記錄」的 entity 描述，但沒有證明允許 `PerplexityBot` 會提升排名、索引率、引用率、答案位置、流量或整體 agent discoverability。實際結果需要保存可重現的 query、時間、頁面、crawler observation 與回答／引用 response；不能把 crawler allow 或 WAF allowlist 當成 outcome。

它可與 [OpenAI Crawlers](/entities/openai-crawlers.md) 及 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md) 一起作為 crawler policy 與 request observation 的環境描述；證據保存規則見[證據生命週期](/methods/evidence-lifecycle.md)，原始來源與不可變 snapshot 見 [Perplexity raw capture](/raw/perplexity-crawlers-2026-08-25.md)。

[^perplexity-crawlers-docs]: Perplexity, “Perplexity Crawlers,” canonical URL: <https://docs.perplexity.ai/docs/resources/perplexity-crawlers>. Immutable raw capture: [metadata](/raw/perplexity-crawlers-2026-08-25.md), [HTML snapshot](/raw/perplexity-crawlers-2026-08-25/snapshot.html), and [HTTP headers](/raw/perplexity-crawlers-2026-08-25/response-headers.txt).
