---
type: Entity
title: Anthropic robots.txt 與網站爬取政策 snapshot
description: 2026-08-31 擷取的 www.anthropic.com robots.txt host-level policy；不等同具名 crawler identity 或 AI Search 成效證據。
resource: https://www.anthropic.com/robots.txt
tags:
  - anthropic
  - ai-crawler
  - robots-txt
  - agent-discoverability
  - source-access
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T00:18:39.916353Z
sources:
  - id: anthropic-robots-txt-2026-08-31
    resource: /raw/anthropic-robots-2026-08-31.md
    title: Anthropic robots.txt 2026-08-31 raw capture
    author: anthropic/web
---

# Overview

Anthropic 官方網站 `www.anthropic.com/robots.txt` 的 2026-08-31 snapshot 對 wildcard user agent 宣告 `Allow: /`，並宣告 `https://www.anthropic.com/sitemap.xml`。[^anthropic-robots-txt-2026-08-31] 這是一個 host-scoped 的網站存取政策觀察，可與 [OpenAI Crawlers](/entities/openai-crawlers.md) 與 [Perplexity Crawlers](/entities/perplexity-crawlers.md) 的具名 crawler／使用者觸發 fetch 文件並列，但不應合併成跨平台共通規則。

本 entity 只代表該 URL 的時間化 robots.txt snapshot。payload 沒有列出具名 Anthropic crawler、AI Search crawler、training crawler 或 user-triggered fetch agent 的個別 directive；此「未出現」結論只適用於本次完整 71-byte response，不代表其他 Anthropic host、未公開文件或實際 request identity。

# Observed policy fields

| Field | Observed value | Boundary |
|---|---|---|
| `host` | `www.anthropic.com` | 不外推至 `claude.ai` 或其他 host |
| `user_agent_scope` | `*` | wildcard directive，不是具名 crawler identity |
| `allow_root` | `/` | robots.txt 宣告，不證明實際抓取 |
| `sitemap` | `https://www.anthropic.com/sitemap.xml` | 只表示 payload 宣告的 sitemap URL |
| `last_modified_header` | absent | response 沒有提供可核對的頁面修改日期 |
| `captured_at` | `2026-08-31T00:18:39.916353Z` | 本次擷取時間，不是發布時間 |

# Research use and limits

這筆 entity 可作為跨平台 AI crawler／robots policy audit 的一個時間化控制點：保存 host、policy snapshot、HTTP metadata、payload hash，並在後續 server-log 或搜尋結果研究中把 `policy_declared` 與 `request_observed`、`page_indexed`、`retrieved`、`used_in_answer`、`cited`、`shown`、`clicked` 分開。它不支持「wildcard Allow 會提升 AI Search inclusion、ranking、citation、referral、click 或 GEO」的因果主張，也沒有證明 Anthropic 有或沒有公開 AI Search crawler。

原始 evidence 與權利邊界見 [Anthropic robots.txt raw capture](/raw/anthropic-robots-2026-08-31.md)。後續 robots.txt 內容改變時建立新的 dated snapshot，不覆寫舊 raw evidence。

[^anthropic-robots-txt-2026-08-31]: Anthropic, “robots.txt,” canonical URL: <https://www.anthropic.com/robots.txt>; immutable capture: [raw wrapper](/raw/anthropic-robots-2026-08-31.md) and [snapshot](/raw/anthropic-robots-2026-08-31/snapshot.txt).
