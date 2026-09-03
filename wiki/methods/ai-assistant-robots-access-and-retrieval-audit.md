---
type: Research Method
title: AI assistant inference-time retrieval 與 robots.txt compliance 觀測方法
description: 將受控 robots.txt、server-side access、user-agent attribution 與回答正確性拆成可重現的 AI Search／web-agent audit protocol。
tags:
  - ai-search
  - ai-crawler
  - web-agent
  - robots-txt
  - retrieval
  - observability
  - agent-discoverability
  - measurement
  - reproducibility
status: draft
stale_after: 2026-09-25
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T22:16:26Z
sources:
  - id: arxiv-robots-access
    resource: /raw/arxiv-robots-txt-2026-08-26.md
    title: "arXiv《Do Generative AI Assistants Respect robots.txt? Tracing Web Access Beyond Visible Answers》原始研究（2026-08-26 raw capture）"
    author: human:gabriel-lopez-fonseca
    last_modified: 2026-07-19
  - id: ietf-aipref-vocab
    resource: /raw/ietf-aipref-vocab-2026-09-02.md
    title: "IETF AI Preferences vocabulary v3（2026-09-02 raw capture）"
    author: human:paul-keller
    last_modified: 2026-08-24
---

# 方法定位

本頁將一份 arXiv 原始研究的受控實驗設計整理成 xdxd GEO 可採用的 draft audit protocol：先證明特定 assistant configuration 真的產生可觀測的 inference-time web retrieval，再以允許／禁止與 user-agent-specific 的 robots.txt 條件，將 server access、來源歸屬、答案正確性與後續 access 分開量測。來源研究沒有證明公開 AI Search ranking、citation 或整體 agent discoverability 的因果效果；以下是方法移植與研究設計推論，不是 xdxd 已重現的結果。[^arxiv-robots-access]

## 0. 先固定 preference vocabulary，再判讀 robots／header

IETF AI Preferences vocabulary v3 將 usage preference 表達為每個 category 的 allow、disallow 或 unknown；若某 category 沒有明示 preference，結果是 unknown。其 draft 目前定義的 `Search` 是選擇 asset 並把使用者導向原始位置，要求 direct reference／link 與協助 relevance 判斷的 excerpt，且明確排除以 asset 生成 summary。[^ietf-aipref-vocab]

因此，robots.txt、HTTP header、Content-Signal 或其他 attachment method 的「宣告存在」不能直接記為 compliance，也不能把 `search=yes` 解讀成允許 summary generation。測試資料至少要保存 `preference_source`、`vocab_version`、`category`、`declared_value`、parser result、recipient 是否理解該 method，以及是否真的採納；多份 preference 發生衝突時，draft 的預設處理是 disallow 優先於 allow，否則 unknown。[^ietf-aipref-vocab]

AIPREF draft 同時聲明它不保證 preference 被遵循、不決定法律或技術 enforcement，也不在沒有明確識別時保證 preference 的來源。故本 protocol 將 `preference_declared`、`preference_parsed`、`policy_enforced`、`target_fetched`、`answer_supported`、`cited`、`shown` 與 `clicked` 保持獨立；draft 的 working-document／non-consensus 狀態也必須在報告中保留，不能寫成 finalized IETF standard。[^ietf-aipref-vocab]

## 1. 先驗證「有 live retrieval」，不要只看產品標籤

對每個待測的 `engine_or_assistant`、model、mode、account state、chat state 與 prompt，先用自有或明確授權的 controlled domain 做配置盤點。只有同時滿足以下兩個訊號，才把該 configuration 標記為 `observable_live_retrieval`：

1. server-side log 看見 assistant 取得指定 target page；
2. assistant 回答回傳頁面內唯一、不可由 prompt 推得的 secret code。

若只有其中一個訊號，保留為部分觀測，不把它當成成功 retrieval。這能把 direct live fetch 與 search index／cache／其他中介層的可能路徑分開；答案正確也不能反推一定有 direct page access。[^arxiv-robots-access]

## 2. 四條件 access matrix

對每個已通過配置盤點的 assistant，建立相同內容、不同目錄或 URL path 的四個條件：

| 條件 | general rule | assistant／generic UA rule | 主要判定 |
|---|---|---|---|
| A | allow | — | 正向 access control |
| B | disallow | — | 負向 access control |
| C | — | allow | UA-specific 正向 control |
| D | — | disallow | UA-specific 負向 control |

每一條件至少五次、每次用新的 page version 或不可快取的 target，以形成同一 configuration 下的 paired observations。若有 identifiable user-agent，C／D 以該字串匹配；若只能看見 generic user-agent，必須明確標記 `generic_ua_stratum`，不能假設它屬於某一家供應商。來源研究以十個 assistant、每條件五次、每個 assistant 20 次、總計 200 次示範此設計。[^arxiv-robots-access]

## 3. 必要的 server-side evidence

controlled server 至少保存：

- `run_id`、`assistant`、model／mode、登入／temporary-chat 狀態、prompt hash、run timestamp。
- `robots.txt` policy version、policy hash、request 是否到達 `robots.txt`、status、request timestamp 與 user-agent。
- target request URL、final URL、status、IP／network metadata、user-agent、request count、response bytes、ETag／Last-Modified 與 page-version／body hash。
- assistant response、secret-code correctness、是否呈現 retrieved content、是否提供 citation／source link，以及 response hash。
- active-window 後的 follow-up request、root／sitemap／auxiliary path 與與原始 run 的可歸屬關係。

這些欄位讓 `requested`、`robots_fetched`、`target_fetched`、`answer_supported`、`cited`、`shown` 與 `follow_up_fetched` 不被壓成一個「可見度」數字。[^arxiv-robots-access]

## 4. 判定規則與常見誤判

### 4.1 Compliance candidate

只有在同一 configuration 同時表現為「允許條件能取得 target、禁止條件避免取得 target」，且 user-agent-specific 條件也呈現相同方向時，才可標記為 `compliance_candidate`。這仍只是特定時間、配置與 controlled domain 下的觀測，不是永久產品能力或法律結論。

### 4.2 Non-access 不等於 compliance

若 assistant 在 A／C 允許條件也完全取不到頁面，B／D 不取頁面的結果只能標記為 `retrieval_failure_or_non-access`，不能標記 compliance。這是避免把壞掉、保守、使用 cache／index 或未啟用 web tool 的 assistant 誤判為遵守 robots.txt 的必要正向控制。[^arxiv-robots-access]

### 4.3 Retrieval 與 answer correctness 的 2×2

把 `target_fetched` 與 `answer_supported` 組成獨立維度：

| server access | secret／claim correctness | 解讀候選 |
|---|---|---|
| 否 | 否 | 未取得、工具失敗、cache／index 路徑或其他未知狀態 |
| 否 | 是 | 可能使用既有 index／cache，或答案來自其他路徑；不能宣稱 direct fetch |
| 是 | 否 | retrieved-but-not-used、解析／生成失敗或答案未呈現 |
| 是 | 是 | 在此 run 中有 direct access 與答案內容對齊的證據 |

這個矩陣只描述可觀測關係，不識別黑箱內部元件，也不把答案品質當成 crawler compliance proxy。[^arxiv-robots-access]

### 4.4 Attribution 與 amplification

將 identifiable／generic／invalid user-agent 分層；對每個 trial 保存 target access count。若 access 次數顯著超過 prompt／trial 數，標記 `request_amplification`，並在 active window 後繼續觀測，以捕捉 crawler、indexing、cache refresh 或 retrieval pipeline 的 delayed access。來源研究以 Grok 的多次重複 access 與其他 assistant 的後續 `robots.txt`／root／page access 示範這個時間層，但這些數字不是 xdxd 結果。[^arxiv-robots-access]

## 5. 與 GEO funnel 的分層

把本 protocol 接到 [縱向 crawl discovery curve 與 coverage／persistence 觀測方法](/methods/longitudinal-crawl-discovery-and-coverage.md) 的 longitudinal 前置層，以及 [GEO 內容偵測與 citation URL audit](/methods/geo-content-detection-and-citation-audit.md) 的來源／citation audit 層。每次 run 應分開保存：

```text
policy_published
  → robots_requested
  → target_fetched
  → content_verified
  → answer_supported
  → source_shown / cited
  → user_clicked / returned_to_source
  → delayed_follow_up_access
```

`robots_requested` 或 `target_fetched` 的改善，不得直接寫成 retrieval、citation、ranking、click 或 agent discoverability 改善；若研究 OpenAI、Perplexity 或其他 crawler role，應再對照 [OpenAI Crawlers](/entities/openai-crawlers.md) 與 [Perplexity Crawlers](/entities/perplexity-crawlers.md) 的官方角色描述。[^arxiv-robots-access]

## 6. 重現與限制

- 使用自有／明確授權 domain、動態 page version、HMAC 或其他不可由 prompt 推定的內容；不要以公開第三方網站做未授權測試。
- 保存 server time、response／policy hash、完整 headers、IP／UA、prompt／assistant configuration 與模型／產品版本；來源更新或產品行為改變時建立新 snapshot，不覆寫舊結果。
- 新 domain、temporary chat、固定 prompt 與不同 page version 可降低 cache、memory、index contamination，但不能消除 provider 端 model update、IP routing、safety filter、user-agent 或 intermediary retrieval 變更。
- 來源研究的十個 assistant、200 次 controlled trials 與一個月以上的 passive monitoring 是一個可移植的設計參考，不是 xdxd 的樣本量規則、平台普遍性證明或正式產品 SLA。[^arxiv-robots-access]

## 7. 研究邊界與下一步

本頁沒有 `verified`，且狀態為 `draft`。下一步只應在合法授權的 test domain 執行 paired matrix，並把 request／retrieval／answer／citation／shown／click／delayed access 分層；若要做跨引擎比較，還要固定 prompt、region、login、mode、time window、page version、robots policy 與 user-agent taxonomy。結果需要第二位 Agent 或人工實際核對 raw logs 後，才可加入 `verified`；不能把本頁或來源研究描述成已證明任何公開搜尋或 agent discoverability uplift。[^arxiv-robots-access]

[^arxiv-robots-access]: Gabriel Lopez-Fonseca, David Rodriguez, Stefan Bechtold, and Jose M. Del Alamo, “Do Generative AI Assistants Respect robots.txt? Tracing Web Access Beyond Visible Answers,” arXiv:2607.14447v2. Immutable raw capture: [metadata](/raw/arxiv-robots-txt-2026-08-26.md), [abstract HTML](/raw/arxiv-robots-txt-2026-08-26/abstract.html), [official HTML](/raw/arxiv-robots-txt-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-robots-txt-2026-08-26/paper.pdf).

[^ietf-aipref-vocab]: IETF AI Preferences Working Group, “A Vocabulary For Expressing AI Usage Preferences,” `draft-ietf-aipref-vocab-latest`, v3. Immutable raw capture: [wrapper](/raw/ietf-aipref-vocab-2026-09-02.md), [draft Markdown](/raw/ietf-aipref-vocab-2026-09-02/draft-ietf-aipref-vocab.md.txt), and [rendered HTML](/raw/ietf-aipref-vocab-2026-09-02/draft-ietf-aipref-vocab.html). The draft states that it is a working document and does not reflect Working Group consensus.
