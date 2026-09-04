---
type: Platform Entity
title: OpenAI Crawlers：OAI-SearchBot、GPTBot 與 ChatGPT-User
description: OpenAI 官方文件定義的搜尋、訓練與使用者觸發 crawler 角色，以及 robots.txt 控制邊界。
resource: https://developers.openai.com/api/docs/bots
tags:
  - entity
  - openai
  - ai-search
  - ai-crawler
  - robots-txt
  - agent-discoverability
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-30T23:10:29.637494Z
sources:
  - id: openai-crawlers-docs
    resource: /raw/openai-crawlers-2026-08-25.md
    title: OpenAI Crawlers 官方文件（2026-08-25 raw capture）
    author: openai/developers
    last_modified: 2026-08-25
  - id: openai-adsbot-ip-ranges
    resource: /raw/openai-adsbot-ip-ranges-2026-08-29.md
    title: OpenAI OAI-AdsBot published IP ranges（2026-08-29 raw capture）
    author: openai/platform
    last_modified: 2026-08-29
  - id: openai-searchbot-ip-ranges
    resource: /raw/openai-searchbot-ip-ranges-2026-08-30.md
    title: OpenAI OAI-SearchBot published IP ranges（2026-08-30 raw capture）
    author: openai/platform
    last_modified: 2026-08-06
  - id: openai-chatgpt-search
    resource: /raw/openai-chatgpt-search-2026-08-31.md
    title: OpenAI Introducing ChatGPT search 官方產品公告（2026-08-31 raw capture）
    author: openai/product
    last_modified: 2026-08-14
  - id: openai-ai-agent-link-safety
    resource: /raw/openai-ai-agent-link-safety-2026-08-31.md
    title: OpenAI Keeping your data safe when an AI agent clicks a link 官方頁面（2026-08-31 raw capture）
    last_modified: 2026-08-26
---

# Entity

OpenAI 官方文件將其 web crawlers／robots 與不同產品用途分開描述，並指出 `OAI-SearchBot` 與 `GPTBot` 的 robots.txt 設定彼此獨立。[^openai-crawlers-docs] 這使它適合在 xdxd GEO 實驗中作為「搜尋可見性控制」與「模型訓練控制」分離的 platform entity，而不是把所有 AI crawler 流量視為同一訊號。

## 官方文件記載的 crawler 角色

- **`OAI-SearchBot`**：用於 ChatGPT 的 search features，以便把網站呈現在搜尋結果中。官方文件表示，退出 `OAI-SearchBot` 的網站不會出現在 ChatGPT search answers，但仍可能以導覽連結出現；文件建議若要協助網站出現在搜尋結果，允許 `OAI-SearchBot` 並允許其公布的 IP ranges。[^openai-crawlers-docs]
- **`GPTBot`**：用於讓 OpenAI 的生成式 AI foundation models 更有用且安全，並抓取可能用於模型訓練的內容。官方文件表示，禁止 `GPTBot` 代表網站內容不應用於該訓練用途。[^openai-crawlers-docs]
- **`ChatGPT-User`**：用於 ChatGPT 與 Custom GPT 的特定使用者動作；官方文件明確說它不是自動爬網，也不用來決定內容是否出現在 Search，且因為請求由使用者發起，robots.txt 規則可能不適用。管理 Search opt-out 與自動 crawl 應使用 `OAI-SearchBot`。[^openai-crawlers-docs]
- **`OAI-AdsBot`**：用於驗證提交到 ChatGPT 的廣告頁面安全性，僅造訪作為廣告提交的頁面；這與一般 Search 或模型訓練 crawler 的研究問題不同。[^openai-crawlers-docs]

## OAI-AdsBot published IP snapshot

OpenAI 另提供機器可讀的 [OAI-AdsBot published IP ranges](/raw/openai-adsbot-ip-ranges-2026-08-29.md)。本次 2026-08-29T13:51:36Z 擷取的 payload 以 `creationTime: 2026-05-12T03:00:00.000000` 列出 `130.131.229.128/25` 與 `20.168.90.128/25` 兩個 IPv4 prefix。[^openai-adsbot-ip-ranges]

## OAI-SearchBot published IP snapshot

OpenAI 的 [OAI-SearchBot published IP ranges raw capture](/raw/openai-searchbot-ip-ranges-2026-08-30.md) 保存 `https://openai.com/searchbot.json` 在 2026-08-29T20:36:45Z 取得的 JSON response；payload 的 `creationTime` 是 `2026-01-02T11:00:00.000000`，本次含 35 個 `ipv4Prefix` entries。[^openai-searchbot-ip-ranges] 這是 published range metadata 的時間化 snapshot，不是 request-level log，也不應與 `GPTBot`、`ChatGPT-User` 或 `OAI-AdsBot` 混用。

## ChatGPT Search 的 source-presentation surface

OpenAI 的 [Introducing ChatGPT search raw wrapper](/raw/openai-chatgpt-search-2026-08-31.md) 保存另一個與 crawler policy 分開的 first-party product surface：頁面描述 ChatGPT 可依問題自動選擇 Web search，也可由使用者手動觸發；回答提供相關 Web source links，並可透過 Sources button／sidebar 開啟 references。[^openai-chatgpt-search] 這些是產品與介面描述，不是本輪的 live response、coverage 或 citation-support 驗證。

同一公告把 third-party search providers、partner-provided content 與 website／publisher 的 site-side choice 放在 ChatGPT Search 的產品脈絡中。[^openai-chatgpt-search] 研究上應將 `search_trigger_mode`、`provider_or_partner_path`、`source_link_present`、`source_panel_opened` 與 `site_opt_in_policy` 分開記錄，不能把 source link 或 opt-in 直接等同於 `citation_entails`、`shown`、`clicked` 或 GEO uplift。

在得到授權的網站端，這份 OAI-SearchBot snapshot 可作為 server-log attribution、allowlist／denylist 與 robots policy paired observation 的候選輸入；實際 attribution 仍需要請求時間、User-Agent、網站 log、DNS／網路控制與 policy 版本。研究時應保存 endpoint URL、capture time、HTTP `Last-Modified`、ETag、payload hash 與網站端 request log，並將 `OAI-SearchBot` 與 `OAI-AdsBot`、`GPTBot`、`ChatGPT-User` 分開。[^openai-searchbot-ip-ranges]

## Agent fetch 的 exact-URL 公開性 gate

OpenAI 另以 [URL-based data exfiltration 的官方安全說明](/raw/openai-ai-agent-link-safety-2026-08-31.md) 描述 agent 取得 web content 時的另一個控制面：攻擊者可能透過 prompt injection 或網頁內容，誘導 agent 把對話可取得的資料放入 URL query string，再以背景圖片、預覽或連結載入方式傳給第三方。[^openai-ai-agent-link-safety]

該頁面指出 trusted-site allow-list 不是完整解法，因為 redirect 可能把可信起點導向其他目的地，過度嚴格的清單也會造成 false-alarm friction。OpenAI 描述的安全原則是由一個不接觸使用者對話、帳號或個資的獨立 web index 發現並記錄公開 URL，再檢查 agent 即將取得的 **exact URL** 是否已被該 index 觀察：match 時可自動 fetch；未 match 時視為 unverified，可能要求使用者確認、顯示警告或改用其他網站。[^openai-ai-agent-link-safety]

這個 independent web index 在來源頁面沒有被命名為 `OAI-SearchBot` 或其他特定 crawler；因此不得把 `exact_url_match` 直接當成 `OAI-SearchBot` crawl、公開 Search inclusion、ranking、citation entailment、shown、click 或 GEO uplift。研究上應把 `url_publicly_observed`、`public_index_identity`、`redirect_chain`、`auto_fetch_allowed`、`user_confirmation_required`、`warning_shown` 與 `content_trust_checked` 分開記錄；這個 gate 只描述 URL 公開性／自動取得授權，不保證頁面內容可信或沒有 prompt injection。[^openai-ai-agent-link-safety]

## robots.txt 與觀測上的時間邊界

官方文件表示，若網站同時允許 `OAI-SearchBot` 與 `GPTBot`，OpenAI 可能只用一次 crawl 的結果支援兩種用途，以避免重複爬取；這不應被解讀為兩個獨立 request stream 必然各自存在。文件另提醒，網站更新 robots.txt 後，Search 結果的系統調整可能需要約 24 小時。[^openai-crawlers-docs]

因此，xdxd 的 OpenAI surface 實驗至少應分開記錄：

1. `robots.txt` 中 `OAI-SearchBot`、`GPTBot`、`ChatGPT-User` 的政策與版本。
2. policy 變更的 UTC 時間、crawler request log 與等待窗口。
3. ChatGPT Search 是否出現頁面、頁面引用與導覽連結等結果訊號；不要把 request 被允許直接當成引用或排名結果。

## GEO 研究邊界

這組一手平台文件支持「OpenAI Search inclusion、training use、user-triggered fetch，以及 ChatGPT Search 的 answer/source-presentation surface 是不同控制面」的 entity 描述，但沒有證明允許 `OAI-SearchBot`、source links、Sources sidebar 或 site-side opt-in 會提升排名、引用率、答案位置、流量或整體 agent discoverability。實際結果需要保存可重現的 query、時間、頁面、crawler observation 與回答／引用 response。

它可與 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md) 一起作為 crawler policy 與 request observation 的環境描述；證據保存規則見[證據生命週期](/methods/evidence-lifecycle.md)，原始來源與不可變 snapshot 見 [OpenAI Crawlers raw capture](/raw/openai-crawlers-2026-08-25.md) 及 [OAI-AdsBot IP ranges raw capture](/raw/openai-adsbot-ip-ranges-2026-08-29.md)。

[^openai-crawlers-docs]: OpenAI Developers, “Overview of OpenAI Crawlers,” canonical URL: <https://developers.openai.com/api/docs/bots>. Immutable raw capture: [metadata](/raw/openai-crawlers-2026-08-25.md) and [Markdown snapshot](/raw/openai-crawlers-2026-08-25/snapshot.txt).

[^openai-adsbot-ip-ranges]: OpenAI, “OAI-AdsBot published IP addresses,” canonical URL: <https://openai.com/adsbot.json>. Immutable raw capture: [metadata](/raw/openai-adsbot-ip-ranges-2026-08-29.md) and [JSON payload](/raw/openai-adsbot-ip-ranges-2026-08-29/adsbot.json).

[^openai-searchbot-ip-ranges]: OpenAI, “OAI-SearchBot published IP addresses,” canonical URL: <https://openai.com/searchbot.json>. Immutable raw capture: [metadata](/raw/openai-searchbot-ip-ranges-2026-08-30.md) and [JSON payload](/raw/openai-searchbot-ip-ranges-2026-08-30/searchbot.json).

[^openai-chatgpt-search]: OpenAI, “Introducing ChatGPT search,” official product announcement. Canonical URL: <https://openai.com/index/introducing-chatgpt-search/>. Immutable wrapper: [raw evidence](/raw/openai-chatgpt-search-2026-08-31.md), [capture metadata](/raw/openai-chatgpt-search-2026-08-31/capture-metadata.json), and [hash receipt](/raw/openai-chatgpt-search-2026-08-31/sha256.txt).

[^openai-ai-agent-link-safety]: OpenAI, “Keeping your data safe when an AI agent clicks a link,” official product/security page. Canonical URL: <https://openai.com/index/ai-agent-link-safety/>. Immutable wrapper: [raw evidence](/raw/openai-ai-agent-link-safety-2026-08-31.md), [capture metadata](/raw/openai-ai-agent-link-safety-2026-08-31/capture-metadata.json), [canonical headers](/raw/openai-ai-agent-link-safety-2026-08-31/response-headers.txt), [Reader headers](/raw/openai-ai-agent-link-safety-2026-08-31/reader-response-headers.txt), and [hash receipt](/raw/openai-ai-agent-link-safety-2026-08-31/sha256.txt).
