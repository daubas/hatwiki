---
type: Research Finding
title: Agent2UCB：以雙 UCB 選擇 GEO 改寫工具
description: 從 Agent2UCB 原始研究整理逐內容項目的 GEO tool selection、LLM prior、visibility reward、dual-UCB、GEO-Bench 與 SEO readiness trade-off；不等同公開 AI Search 或 GEO 因果效果。
tags:
  - generative-engine-optimization
  - generative-search
  - ai-search
  - agentic-optimization
  - bandit
  - tool-selection
  - seo-readiness
  - geo-bench
  - citation
  - evidence-boundary
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T04:42:12.935252Z
sources:
  - id: arxiv-agent2ucb
    resource: /raw/arxiv-agent2ucb-2026-09-01.md
    title: "arXiv《Agent2UCB: Agentic System for Generative Engine Optimization》原始研究（2026-09-01 raw capture）"
    author: human:sheldon-yu-et-al
    last_modified: 2026-09-01
---

# 核心觀察

Agent2UCB 是一個把 GEO 改寫工具選擇做成逐內容項目 agentic optimization 的原始研究系統。來源描述的輸入是 query 與多個網站 URL；系統抽取頁面文字，讓 LLM evaluator 以候選頁面回答 query，並以頁面被引用的頻率與位置形成來源自有的 GEO score，再對目標頁面執行 EEAT-R（Experience、Expertise、Authoritativeness、Trustworthiness、Readability）分析與改寫。[^arxiv-agent2ucb]

來源文字稱每個 content item 評估九種 GEO strategies，並將工具視為 bandit arms。Agent2UCB 的 dual-UCB controller 把 tool-selection agent 的 LLM prior 與線上 visibility reward 結合，用於在探索與利用之間選擇下一個改寫工具。正文列出 authoritative rewriting、evidence injection、quote and citation、readability tuning 與 SEO-friendly structuring；圖 2 還出現 `credible_sources`、`fluent_quotes`、`technical_terms`、`authoritative`、`simple_language`、`original_stats`、`unique_words`、`seo_optimize` 等標籤。來源快照沒有把「九種」與所有可見名稱整理成完整 mapping，因此工具總表維持部分支持／部分 unresolved。[^arxiv-agent2ucb]

## 來源報告的 benchmark／simulation 結果

Figure 2 的 rendered chart 標示平均 GEO score：category `23.0`、naive prompting `22.4`、agentic `32.3`、Agent2UCB `35.1`；圖中另有相對 baseline 的百分比註記。論文文字稱 dual-UCB 約在 15 iterations 內收斂，約比 exhaustive search 少 10 倍 LLM calls，同時達到 comparable or higher score。這些數值是來源指定 GEO-Bench／demo protocol 的 observational evidence，沒有 xdxd reproduction，也沒有公開引擎 live trace、完整 candidate pool、分母與不確定性資料。[^arxiv-agent2ucb]

Table I 的 text-only SEO readiness comparison 如下；這是來源自有 analyzer 的結果，不是 Search ranking 或 citation correctness：

| Metric | Original | Category | Agent2UCB |
|---|---:|---:|---:|
| Overall SEO Score | 65.55 | 70.01 | 70.94 |
| Readability | 0.810 | 0.762 | 0.718 |
| Topical Coverage | 0.551 | 0.800 | 0.653 |
| EEAT Credibility | 0.426 | 0.396 | 0.773 |
| Avg. Word Count | 762.0 | 192.1 | 813.0 |
| Avg. Sentences | 42.3 | 11.7 | 57.9 |

來源把結果解讀為 Agent2UCB 在該設定下提高整體 SEO score 與 EEAT credibility，但 readability 相對下降，topical coverage 高於 original 而低於 category baseline；這個解讀仍受來源的模型、prompt、資料、評分器與 benchmark protocol 限制。[^arxiv-agent2ucb]

## xdxd 的 draft 研究用途

這份研究可補上[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)中「intervention selector」的候選設計：固定 query／candidate URLs／content snapshot 後，將每個改寫工具視為 arm，保存 LLM prior、每次 action、reward、tool output、content hash、GEO evaluator version 與 SEO side-effect vector，並以 unedited、category baseline、exhaustive-search、placebo／frozen arms 比較。若要測量公開 Web，還需把 `crawled`、`indexed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`source_page_opened`、`referral` 與 `clicked` 分開保存。以上是依來源建立的 draft protocol inference，不是來源或平台正式規格。[^arxiv-agent2ucb]

## Evidence boundary

本頁是 `arXiv:2608.29063v1` 的 draft compiled finding。來源的 GEO evaluator 是以 LLM 在候選頁面上模擬回答與頁面 citation／visibility measurement，並非公開 Google AI Overviews、Perplexity、ChatGPT 或其他 AI Search 的內部 crawler、index、retrieval、ranking、citation entailment、source presentation、UI shown、referral 或 click measurement。來源的 GEO-Bench 數值、約 15 iterations、約 10× calls、SEO table 與「可部署」語言都不能直接轉成 xdxd 的公開 GEO uplift、流量、轉換、可靠性或安全性承諾。[^arxiv-agent2ucb]

完整來源 metadata 與不可變原始 payload 見 [Agent2UCB raw capture](/raw/arxiv-agent2ucb-2026-09-01.md)。與整體 evidence layer 分工可參考[Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md)及[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)。

[^arxiv-agent2ucb]: Sheldon Yu, Rui Wang, Tong Yu, Sungchul Kim, Doga Dogan, Junda Wu, and Julian McAuley, “Agent2UCB: Agentic System for Generative Engine Optimization,” arXiv:2608.29063v1, submitted 2026-08-29; [raw capture](/raw/arxiv-agent2ucb-2026-09-01.md).
