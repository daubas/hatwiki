---
type: Platform Entity
title: Cloudflare Bot Preference Sync：AI bot policy 與 robots.txt 同步
description: Cloudflare 第一方資料描述 Search、Agent、Training AI traffic policy、robots.txt 同步與新網域預設；僅作為平台政策與研究控制變項，不是搜尋成效證據。
resource: https://blog.cloudflare.com/bot-preference-sync/
tags:
  - entity
  - cloudflare
  - ai-crawler
  - robots-txt
  - agent-discoverability
  - ai-search
  - training-control
  - transparency
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T10:10:05Z
sources:
  - id: cloudflare-bot-preference-sync
    resource: /raw/cloudflare-bot-preference-sync-2026-08-25.md
    title: "Cloudflare「Say it once: introducing Bot Preference Sync」官方文章（2026-08-25 raw capture）"
    author: cloudflare/blog
    last_modified: 2026-08-22
  - id: cloudflare-ai-traffic-options
    resource: /raw/cloudflare-ai-traffic-options-2026-08-31.md
    title: "Cloudflare「New options to manage AI traffic」官方 Changelog（2026-08-31 raw capture）"
    author: cloudflare/developers-docs
    last_modified: 2026-07-01
---

# Entity

Cloudflare 在一篇 2026-08-21 發布、2026-08-22 修改的第一方文章中，將 **Bot Preference Sync** 描述為把 zone-level AI bot configuration 對 Search、Agent、Training 的偏好同步反映到 `robots.txt` 的功能；文章也把 discoverability、engagement、training consent 與網站端控制放在同一個政策脈絡中。2026-07-01 的另一則官方 Changelog 再把 AI traffic 分為可獨立控制的 Search、Agent、Training 三種行為，並公告 2026-09-15 起新 onboarding 網域的預設政策。這些是 Cloudflare 的平台產品描述，不是跨引擎公開規格或已驗證的 GEO 成效結論。[^cloudflare-bot-preference-sync][^cloudflare-ai-traffic-options]

## 官方文章記載的政策同步

- 文章說明 Bot Preference Sync 可開啟或關閉，並依既有 AI bot configuration 產生或更新 `robots.txt`；若網站已有 `robots.txt`，同步產生的內容會加在既有內容前方，原有 `Disallow` 指令仍被保留。[^cloudflare-bot-preference-sync]
- 對 Search 與 Agent，文章列出 `Allow`、只封鎖服務廣告頁面、以及全面封鎖三種選項；對 Training，`Disallow` 會在 `robots.txt` 寫入「不供訓練」偏好。這些是文章描述的 Cloudflare 選項，不應直接泛化成所有 crawler 或搜尋引擎的共同語意。[^cloudflare-bot-preference-sync]
- 文章表示，對同時執行 Search 與 Training 的 mixed-use crawler，若其採取額外 transparency 措施並遵守 `robots.txt` 的 no-training 偏好，仍可取得內容作搜尋索引；文章以「cooperating crawlers 的 Search visibility 不受影響」描述其政策目標，但未提供獨立的索引或搜尋成效實驗。[^cloudflare-bot-preference-sync]
- 文章表示 Bot Preference Sync 將依 Cloudflare 追蹤的 bot 清單，週期性更新寫入 `robots.txt` 的 bot 名單；它並說明新客戶的同步會預設開啟、發布者可在 onboarding 時選擇以 Training `Disallow` 為預設，且功能將在各方案陸續提供。這些是公告中的產品狀態與預設描述，需以實際帳戶與後續 changelog 核對。[^cloudflare-bot-preference-sync]

## Transparency 條件（Cloudflare 文章自述）

文章表示，若 bot 同時執行 Search 與 Training，且希望在網站設定 `Disallow Training` 時不被封鎖，需提供額外資訊。文章列出的條件包括：尊重 `robots.txt` 的 no-training 偏好、提供退出 AI summaries 的方式、提供 URL 層級的 training 可用性與 Search／Training metrics、以及公開顯示 `Disallow Training` 不傷害傳統搜尋結果。Cloudflare 說明符合條件的 bot 會在 Cloudflare Radar 的 AI bot transparency 區段公開追蹤；這是 Cloudflare 的治理與驗證框架，不是通用標準或跨平台認證。[^cloudflare-bot-preference-sync]

## Behavior-based AI traffic controls

Cloudflare 的 Changelog 將 AI traffic 分成三種可獨立控制的行為：Search、Agent 與 Training。Search 被描述為把內容編入索引、日後用於回答問題；Agent 是代表使用者即時活動的 chat fetch bot 或 browser-use agent；Training 則是取用內容來訓練或微調模型。每一類可設定全站封鎖、只封鎖顯示廣告的頁面，或不封鎖。這是 Cloudflare 自有 bot-management taxonomy 與 policy surface，不應直接當成所有平台的共同分類。[^cloudflare-ai-traffic-options]

頁面另公告 2026-09-15 起新加入 Cloudflare 的網域，對顯示廣告的頁面預設封鎖 Training 與 Agent、允許 Search；同時具 Search 與 Training 行為的 multi-purpose crawler 會受 Training 預設影響，客戶可在該日期前退出新預設。這是公告的排程政策；本 KB 沒有觀測實際 rollout、zone cohort、robots.txt 輸出或 request enforcement。[^cloudflare-ai-traffic-options]

## GEO 研究用途與邊界

這筆來源新增一個可明確記錄的 **policy representation／enforcement alignment** 變項：

1. zone-level AI bot policy 的版本、分類與生效時間。
2. Bot Preference Sync 的開關狀態，以及實際發布的 `robots.txt` 內容與 hash。
3. Cloudflare 端宣告的 bot category、transparency 狀態與 request／block observation。
4. Search、Agent、Training 的 crawler observation，與 retrieval、citation、click 結果分開保存。
5. 2026-09-15 預設排程、new-domain onboarding cohort、頁面是否顯示廣告、multi-purpose crawler 分類與 policy／robots.txt／WAF 輸出 hash。

它可以與 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md) 的 crawler 存取控制、[OpenAI Crawlers](/entities/openai-crawlers.md) 的 Search／Training／user-triggered fetch 角色，以及 [Cloudflare Agent Readiness 與 AEO](/entities/cloudflare-agent-readiness-aeo.md) 的 readiness／visibility 分層互相對照。Cloudflare 的文章沒有證明開放或封鎖某一 AI bot 會提升排名、citation rate、答案位置、流量或整體 agent discoverability；因此本頁維持 `status: draft`，實驗中不可把 `robots.txt` 變更本身當成 outcome。研究保存規則見[證據生命週期](/methods/evidence-lifecycle.md)。

原始來源與不可變證據見 [Cloudflare Bot Preference Sync raw capture](/raw/cloudflare-bot-preference-sync-2026-08-25.md)；HTML snapshot 見 [snapshot](/raw/cloudflare-bot-preference-sync-2026-08-25/snapshot.html)。AI traffic 行為分類與排程政策的不可變證據見 [Cloudflare AI traffic options raw capture](/raw/cloudflare-ai-traffic-options-2026-08-31.md)。

[^cloudflare-bot-preference-sync]: Cloudflare Blog, “Say it once: introducing Bot Preference Sync,” published 2026-08-21 and modified 2026-08-22. Source URL: <https://blog.cloudflare.com/bot-preference-sync/>; immutable raw capture: [metadata](/raw/cloudflare-bot-preference-sync-2026-08-25.md) and [HTML snapshot](/raw/cloudflare-bot-preference-sync-2026-08-25/snapshot.html).
[^cloudflare-ai-traffic-options]: Cloudflare Developers, “New options to manage AI traffic,” published and modified 2026-07-01. Source URL: <https://developers.cloudflare.com/changelog/post/2026-07-01-ai-traffic-options/>; immutable raw capture: [metadata](/raw/cloudflare-ai-traffic-options-2026-08-31.md), [HTML snapshot](/raw/cloudflare-ai-traffic-options-2026-08-31/snapshot.html), [Markdown response](/raw/cloudflare-ai-traffic-options-2026-08-31/markdown-response.txt), and [SHA-256](/raw/cloudflare-ai-traffic-options-2026-08-31/sha256.txt).
