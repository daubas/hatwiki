---
type: Research Method
title: GEO 證據生命週期
description: 規定 xdxd GEO 研究從擷取、保存、編譯、驗證到過期的最小流程。
tags:
  - provenance
  - verification
  - freshness
  - lifecycle
status: stable
generated:
  by: codex/gpt-5.6-sol
  at: 2026-08-28T07:03:04Z
sources:
  - id: okf-spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: Open Knowledge Format v0.2 Specification
  - id: geo-wiki-research
    resource: https://github.com/castle-studio-work/xdxd.im/blob/main/docs/GEO_LLM_WIKI_RESEARCH_2026.md
    title: GEO LLM Wiki／自建知識庫研究（2026）
---

# GEO 證據生命週期

## 1. Capture

將官方文件、論文、頁面內容、搜尋回答、引用與 crawl observation 保存成帶時間的 raw evidence。raw 檔案不覆寫；同一來源發生變化時建立新的 snapshot。[^geo-wiki-research]

第三方來源若本身是 Markdown，原始 payload 必須保存成 `.md.txt` 或封裝檔，並保留原始檔名、URL、bytes 與 SHA-256；只有由本 KB 編寫、具合法 OKF frontmatter 的 wrapper 或 concept 才使用 `.md`。不得為通過 validator 而把 OKF frontmatter 插入不可變的第三方原文。

## 2. Compile

Agent 從 raw evidence 整理 concept、entity、experiment 或 comparison。每個整理頁記錄：

- `sources`：實際使用的來源。
- `generated`：本次內容由誰、何時產生。
- `status`：`draft`、`stable` 或 `deprecated`。
- `stale_after`：只有能合理預估失效時間時才填寫。

單一來源沒有支持的推論，必須在正文標示為推論，不得偽裝成來源原文。[^okf-spec]

## 3. Verify

第二個 Agent 或人工核對原始證據後，才能加入 `verified`。`verified` 是可檢查的確認紀錄，不是密碼學證明，也不保證結論永遠正確。

## 4. Consume

讀取者先從 `index.md` 找到相關概念，再按需打開正文與 raw evidence。遇到以下情況應重新查證：

- `status: draft` 或 `deprecated`
- `stale_after` 已到期
- 沒有 `verified`
- 來源已失效或無法定位
- 結論依賴可能改版的搜尋引擎、模型或產品介面

## 5. Update

研究結論改變時更新 compiled concept 的內容與 `generated`，並在 `log.md` 留下紀錄。不要修改舊 raw snapshot，也不要無聲刪除被推翻的結論；改用 `deprecated` 或新增替代頁面。

## 最小品質門檻

- 所有非保留 Markdown 檔都有合法 frontmatter 與非空 `type`。
- 主張能定位到來源；重要主張用 footnote 對應 `sources[].id`。
- 實驗結果保存引擎／入口、時間、prompt、目標頁面與原始 response。
- Agent 產生與人工確認分別記錄。
- validator 的 hard errors 必須為零。

[^okf-spec]: Open Knowledge Format v0.2 Specification。
[^geo-wiki-research]: GEO LLM Wiki／自建知識庫研究（2026）。
