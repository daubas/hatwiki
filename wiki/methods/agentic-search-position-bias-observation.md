---
type: Research Method
title: Agentic search 的 position bias 與 delegated-choice 觀測方法
description: 將 AI agent 在隨機化結果清單中的 inspection、選擇、工具呼叫、排名位置與 reasoning effort 拆成可重現的 draft 觀測 protocol。
tags:
  - agent-discoverability
  - agentic-search
  - position-bias
  - ranking
  - delegated-choice
  - tool-use
  - measurement
  - evaluation
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T22:26:08Z
sources:
  - id: arxiv-agent-position-bias
    resource: /raw/arxiv-agent-position-bias-2026-08-26.md
    title: "Does Rank Still Matter? Position Bias When AI Agents Shop on Our Behalf"
    author: human:davood-wadi
    last_modified: 2026-08-24
---

# 方法定位

本頁從一份 arXiv 原始研究整理 agentic search 中「結果位置是否影響 agent 會檢視什麼、最後選什麼」的 draft 觀測方法。它補充[跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md)對 source／citation funnel 的描述，但研究對象是受控的 agent delegated-choice environment，不是公開搜尋引擎排名或網站 GEO 成效；原始來源仍未經 xdxd 獨立重現或人工驗證。[^arxiv-agent-position-bias]

## 1. 來源研究可重現的核心設計

1. 建立兩層結果清單：初始頁面只提供每個 item 的可見摘要欄位；agent 只有在呼叫 `inspect` tool 後才取得更詳細的屬性。
2. 對每個 session 完全隨機化 100 個 item 的 presentation order，使 position 與 item quality 在設計上分離。來源使用飯店清單；xdxd 應依研究問題替換 domain，但不能把飯店結果直接外推。
3. 讓 agent 自主決定是否、何時以及檢視哪些 item；保存每一次 tool call 的時間順序、工具名稱、item ID、回傳內容 hash 與終止原因。
4. 讓 agent 在檢視後執行 `submit_choice`、選擇 outside option 或結束 session；將 inspection 與 final choice 視為不同 outcome。
5. 以固定模型／provider／interface／版本、prompt、工具 schema、region／language 與 reasoning effort 建立 strata；對同一 item 做多個隨機排列與多次 replication。

來源主要實驗使用四個模型、每個模型 500 個獨立 session，並另以 reasoning effort 與 prompt wording 做 follow-up 操弄；總 session 數與模型設定應從 raw PDF、API 版本與程式／資料可得性重新核對，不將來源的 5,000 sessions 當作 xdxd 的樣本數。[^arxiv-agent-position-bias]

## 2. Outcome funnel 與必要分層

對每個 `session_id × item_id` 保存下列欄位，不能合併成單一 visibility score：

- `exposed`：item 是否出現在 agent 可讀的 initial listing。
- `inspected`：agent 是否呼叫 `inspect` 取得細節；它只是工具操作 proxy，不等於人類 click，也不等於模型真正使用所有回傳 token。
- `considered`：若能從 tool trace 或結構化 state 明確辨識，記錄 item 是否進入 agent 的候選集合；沒有可重現規則時保留為缺失，不可由答案臆測。
- `selected`：item 是否被 `submit_choice` 選為最終方案。
- `outside_option`：session 是否沒有選擇任何 item。
- `recommended／cited／clicked`：若研究接到公開搜尋或回答介面，另行記錄推薦呈現、citation 與 outbound click；不能把這些欄位與受控 shopping choice 混為一談。

在 session 層級另保存 `inspection_count`、`unique_items_inspected`、`first_inspected_item`、`choice_rank`、`conversion`、`termination_reason`、`tool_trace_hash` 與完整 response snapshot。這樣可區分「位置影響曝光／檢視」與「位置影響最終選擇」。

## 3. Position 與 representation 的研究量測

### 3.1 位置介入

- `position` 以 item 在初始清單中的 1-based index 保存；每個 session 保存 permutation seed 或 permutation hash。
- 以同一 item、同一屬性集合與不同 presentation order 做 paired randomization；若要比較內容表示，另固定 position 分布並做 representation-paired run。
- 除線性 position effect 外，預先檢查非單調形狀與中段低谷；不能預先把人類搜尋的 top-heavy pattern 當成 agent 的必要形狀。

### 3.2 可見屬性與工具深度

保存 initial listing 與 inspect response 中可見的欄位，例如 price、review score、brand／chain、promotion、star rating、amenities、sub-ratings、availability 與 detailed price；每個版本都以 content hash 與 schema version 固定。來源將這些欄位與 position 一起納入模型，但不支持任何單一欄位在公開 Web 上必然提高選擇。[^arxiv-agent-position-bias]

### 3.3 Reasoning effort 與 prompt wording

把 reasoning effort、sampling／default setting、prompt wording 與 tool budget 視為獨立的 intervention strata。至少比較：

- 相同 model、相同清單、不同 reasoning effort；
- 相同 model、相同清單、原始與去除「請推薦／請預訂」語句的 prompt；
- 相同 presentation permutation、不同 tool availability 或 inspect budget。

所有 paired run 都必須保存 model／API version、設定 hash、prompt hash、清單 hash、tool schema 與 run time；不要把較高 reasoning effort 的結果描述成永久的模型能力差異。

## 4. 建議的指標與判讀

1. **Search depth**：每 session 的 inspection count、median、distribution、單一 inspection 比例與 unique item count。
2. **Inspection position effect**：以 session-clustered inference 或其他預先註冊方法估計 position 與 inspected 的關係；同時報告線性、分段或非線性 specification。
3. **Choice-stage position effect**：估計 chosen item 的 position、choice rank 相對於 position-neutral baseline 的偏離，以及 reasoning／model strata 的異質性。
4. **Delegated-choice separation**：同時報告 conversion／outside-option 與 inspection；若沒有 outside option，必須標記 prompt 或任務設計可能強迫 agent 選擇。
5. **Selection concentration**：報告 item-level choice share、modal item share、top-k choice concentration 與跨 model／replication overlap；同一 undominated item 的集中不等於公開搜尋 citation authority。
6. **Representation sensitivity**：對可見屬性、工具回傳深度、欄位順序、文字格式與 structured payload 做 paired ablation；把 content effect、position effect、tool-use effect 分開。

來源在其飯店任務中報告 AI agent 的檢視深度高於人類 benchmark、position 對 inspection 的效果較弱且可能呈中段低谷，而 final booking 對 position 的效果較不一致；這些數字只屬來源設定下的 draft evidence，不是 xdxd 的效果量。[^arxiv-agent-position-bias]

## 5. 與 GEO／AI Search 研究的銜接

若將本 protocol 接到公開 AI Search，需在受控 agent choice funnel 之外另保存：

- `crawler_access`、`indexed`、`retrieved`、`used`、`cited`、`shown`、`clicked` 與 `returned_to_source`；
- query、subquery／request state、source URL、citation position、interface、model、region、language、rollout 與 time window；
- 結果清單或 candidate panel 的原始 snapshot、排列／呈現 hash、來源 body hash 與 HTTP metadata。

agent 的 `inspected` 不等於公開搜尋的 `retrieved`，`selected` 不等於 `cited`，`booked` 也不等於 click 或 downstream value。這些層級應依[證據生命週期](/methods/evidence-lifecycle.md)分開保存；跨介面比較可參照[AI visibility measurement 的 rank stability 與 structural sufficiency](/methods/ai-visibility-measurement-convergence.md)與[Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md)。

## 6. 證據邊界與待驗證事項

- 本頁只有一個 arXiv v1 預印本來源，沒有 `verified`，不能描述為已由 xdxd 或人工核准。
- 來源固定單一飯店搜尋任務與 destination；不能直接外推到新聞、一般 Web、中文生成式搜尋、B2B research、MCP／skill registry 或其他 Agent-facing surfaces。
- 來源觀察到與 lost-in-the-middle 一致的非單調 position pattern，但未以 attention-level access 識別機制；xdxd 實驗不能把該 pattern 直接命名為已證明的機制。
- 模型與 API 會變動；每次重跑須保存版本、預設設定、工具 trace、prompt、清單與所有 response hash。來源結果不支持「排名不再重要」、「把內容放在清單底部更好」或「增加 reasoning effort 必然消除所有位置效果」等產品命題。
- 原始檔案、HTTP metadata、授權與 SHA-256 見[raw capture](/raw/arxiv-agent-position-bias-2026-08-26.md)；來源更新時建立新 snapshot，不覆寫舊 evidence。

[^arxiv-agent-position-bias]: Davood Wadi and Yu Ma, “Does Rank Still Matter? Position Bias When AI Agents Shop on Our Behalf,” arXiv:2608.22697v1, submitted 2026-08-24. Source URL: <https://arxiv.org/abs/2608.22697>. Immutable raw capture: [metadata](/raw/arxiv-agent-position-bias-2026-08-26.md), [abstract HTML](/raw/arxiv-agent-position-bias-2026-08-26/abstract.html), and [paper PDF](/raw/arxiv-agent-position-bias-2026-08-26/paper.pdf).
