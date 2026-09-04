---
type: Platform Entity
title: Cloudflare AI Crawl Control
description: Cloudflare 官方文件所描述的 AI crawler 存取觀測、政策控制與 robots.txt 遵循監測功能。
resource: https://developers.cloudflare.com/ai-crawl-control/
tags:
  - entity
  - cloudflare
  - ai-crawler
  - robots-txt
  - observability
  - agent-discoverability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T00:26:15.700748Z
sources:
  - id: cloudflare-ai-crawl-control
    resource: /raw/cloudflare-ai-crawl-control.md
    title: Cloudflare AI Crawl Control 官方文件（2026-08-25 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-14
  - id: cloudflare-crawl-content-signals-use-2026-08-31
    resource: /raw/cloudflare-crawl-content-signals-2026-08-31.md
    title: Cloudflare「Crawl endpoint now respects the Content Signals `use` directive」官方 Changelog（2026-08-31 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-31
  - id: cloudflare-browser-run-crawl-2026-09-01
    resource: /raw/cloudflare-browser-run-crawl-2026-09-01.md
    title: Cloudflare Browser Run `/crawl - Crawl web content` 官方文件（2026-09-01 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-31
---

# Entity

Cloudflare AI Crawl Control 是 Cloudflare 官方文件描述的 AI crawler 管理與觀測功能；來源頁面標示於 2026-08-14 更新。[^cloudflare-ai-crawl-control]

## 官方文件記載的能力

- 觀測哪些 AI services 存取網站內容，以及 crawler activity 與 request patterns。
- 針對個別 crawler 設定 allow 或 block 規則。
- 監測 `robots.txt` 遵循狀態，並建立 enforcement rules。
- 提供 Pay Per Crawl 內容存取方案，來源頁面標示為 private beta。
- 文件頁面標示可在所有 Cloudflare plans 使用，並宣稱可零設定部署。[^cloudflare-ai-crawl-control]

## Browser Run `/crawl` 的 Content Signals `use` enforcement

Cloudflare Developers 2026-08-31 的 Changelog 另描述 Browser Run `/crawl` endpoint 現在尊重 Content Signals 的 `use` directive；request 可用新的 `contentUse` 參數宣告 `reference` 或 `full`，預設值為 `full`。若目標網站的 `robots.txt` `use` level 比 request 的 `contentUse` 更嚴格，頁面描述 crawl request 會收到 HTTP `400`。這是 Cloudflare 自有 Browser Run implementation 的第一方產品描述，不是 Content Signals 規格全文，也不是 xdxd 的 live API 驗證。[^cloudflare-crawl-content-signals-use-2026-08-31]

對 xdxd 的研究模型而言，這筆來源補上「內容使用政策宣告」到「crawl enforcement response」的可觀測邊界：應分開保存 `content_use_declaration`、target `robots.txt` snapshot、requested `contentUse`、returned representation、HTTP status／error、policy version 與後續 `indexed`、`retrieved`、`used_in_answer`、`citation_entails`、`shown`、`clicked`。policy 被表達或 crawl 被拒絕，都不能直接推導公開搜尋排名、retrieval、citation 或 GEO uplift。[^cloudflare-crawl-content-signals-use-2026-08-31]

## Browser Run `/crawl` 的 endpoint、discovery 與完整 enforcement 邊界

Cloudflare Browser Run 官方文件把 `/crawl` 描述為從起始 URL 抓取並追蹤網站連結的非同步 REST job；預設 `source: all` 的 discovery 順序是起始 URL、sitemap links、頁面 links，結果可用 HTML、Markdown 或 JSON 格式返回，並以 `completed`、`errored`、`skipped`、`disallowed` 等狀態分層。文件同時記載 job 最長執行七日、完成後結果保存十四日，以及 cursor／limit／status 分頁或篩選。[^cloudflare-browser-run-crawl-2026-09-01]

文件指出 `/crawl` 尊重 `robots.txt` 與 `crawl-delay`，沒有指定 delay 時同一網域間使用預設 0.5 秒間隔；Browser Run 不繞過 CAPTCHA、Turnstile 或其他 bot protection，且 `/crawl` 使用不可自訂的 `CloudflareBrowserRenderingCrawler/1.0` User-Agent。`render: true` 預設執行 JavaScript，`render: false` 則做快速初始 HTML fetch。[^cloudflare-browser-run-crawl-2026-09-01]

相較於 2026-08-31 Changelog 的簡短公告，這份 endpoint 文件進一步描述 Content Signals 的兩層 enforcement：`crawlPurposes` 預設宣告 `search`、`ai-input`、`ai-train`，purpose 被目標 `robots.txt` 設為 `no` 時可在 initiation 以 HTTP `400` 拒絕；`contentUse` 只接受 `reference`／`full`，預設為 `full`，不接受 `immediate`，且 request 比站點 `use` 更寬鬆時會被拒絕。這些是 Cloudflare 自有 `/crawl` contract，不是所有 AI crawler 的共通規則。[^cloudflare-browser-run-crawl-2026-09-01]

對 xdxd GEO 研究而言，應把 `source` discovery、`robots.txt`／Content-Signal snapshot、宣告的 purpose／use、request／response status、returned representation、crawl result status 與後續 `indexed`、`retrieved`、`used_in_answer`、`citation_entails`、`shown`、`clicked` 分開保存；Cloudflare endpoint 的 policy enforcement 或 crawl 可讀性不等於公開 AI Search ranking、citation 或 GEO uplift。

## GEO 研究邊界

這份一手文件支持「AI crawler 存取可被觀測與控制」的 entity 描述，但沒有證明啟用該功能會改善搜尋排名、AI 回答引用率、被某一引擎納入回答，或 agent discoverability。這些效果必須另行以跨引擎、跨時間的實驗觀測，不能從產品能力描述直接推導。

對 xdxd GEO 研究而言，本 entity 可作為網站觀測的環境與控制變項：記錄測試期間的 crawler policy、robots.txt 遵循狀態與可觀測 request pattern；不要把 Cloudflare 的流量／政策訊號當成搜尋引擎的 citation 或 ranking 結果。

相關的證據保存規則見[證據生命週期](/methods/evidence-lifecycle.md)；原始來源與不可變 snapshot 見 [Cloudflare raw capture](/raw/cloudflare-ai-crawl-control.md)。

[^cloudflare-ai-crawl-control]: Cloudflare Developers, “AI Crawl Control — Overview,” page updated 2026-08-14. Source URL: <https://developers.cloudflare.com/ai-crawl-control/>; immutable raw capture: [metadata](/raw/cloudflare-ai-crawl-control.md) and [HTML snapshot](/raw/cloudflare-ai-crawl-control-2026-08-25/snapshot.html).

[^cloudflare-crawl-content-signals-use-2026-08-31]: Cloudflare Developers Changelog, “Crawl endpoint now respects the Content Signals `use` directive,” published and modified 2026-08-31. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-31-crawl-content-use/>; immutable raw capture: [metadata](/raw/cloudflare-crawl-content-signals-2026-08-31.md), [HTML snapshot](/raw/cloudflare-crawl-content-signals-2026-08-31/snapshot.html), [Markdown response](/raw/cloudflare-crawl-content-signals-2026-08-31/markdown-response.txt), and [SHA-256](/raw/cloudflare-crawl-content-signals-2026-08-31/sha256.txt).

[^cloudflare-browser-run-crawl-2026-09-01]: Cloudflare Developers, “/crawl - Crawl web content,” page last updated 2026-08-31. Source URL: <https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/>; immutable raw capture: [metadata](/raw/cloudflare-browser-run-crawl-2026-09-01.md), [HTML snapshot](/raw/cloudflare-browser-run-crawl-2026-09-01/snapshot.html), [Markdown response](/raw/cloudflare-browser-run-crawl-2026-09-01/markdown-response.txt), [sitemap entry](/raw/cloudflare-browser-run-crawl-2026-09-01/sitemap-entry.txt), and [SHA-256](/raw/cloudflare-browser-run-crawl-2026-09-01/sha256.txt).
