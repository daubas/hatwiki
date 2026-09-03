---
type: Research Method
title: Tool-return cue、CoT faithfulness 與 evidence trace 觀測方法
description: 將 tool-return／retrieved artifact 的 CoT faithfulness、source attribution、evidence use 與公開 Web outcome 分成可重現的 paired protocol。
tags:
  - agent-observability
  - tool-trace
  - source-attribution
  - chain-of-thought
  - evidence-provenance
  - citation
  - retrieval
  - agentic-search
  - experiment-design
  - causal-boundary
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T06:40:18.558043000Z
sources:
  - id: arxiv-face-eval
    resource: /raw/arxiv-face-eval-2026-09-01.md
    title: "arXiv《Chain-of-Thought Faithfulness of Reasoning Models Varies with Where and How Preference Cues Are Delivered》原始研究 raw capture"
    author: human:aryo-pradipta-gema-et-al
    last_modified: 2026-09-01
  - id: agent-capability-observation
    resource: /methods/agent-capability-discovery-and-retrieval-observation.md
    title: "Agent capability discoverability 與 retrieve-then-rank 觀測方法"
---

# Purpose

本方法把「模型是否在 CoT 中說出自己使用了某個來源」與「Agent 實際是否取得、讀取、使用並正確引用該來源」分開。FACE-Eval 的原始研究顯示，在其 single-call、prefilled-tool protocol 中，cue 放在 tool return 或 raw artifact 時，答案可能跟隨 cue，但 CoT 較少明確記錄 tailoring decision；這是來源指定模型、cue、wrapper、seed 與 automated-judge rubric 的 observational evidence，不是公開 AI Search 或 xdxd GEO 的效果估計。[^arxiv-face-eval]

# Variables and event model

| 層級 | 建議欄位 | 定義與注意事項 |
|---|---|---|
| Cue delivery | `cue_channel` | `user_message`、`tool_return`、`retrieved_document`、`memory`；不要把 tool return 自動視為 tool-selection 成功。 |
| Cue representation | `cue_explicitness` | `explicit_summary` 或 `implicit_raw_artifact`；保存原始 payload、representation hash 與 schema／wrapper。 |
| Tool lifecycle | `tool_call_issued`、`tool_return_received`、`tool_selected_by_agent` | FACE-Eval 的 tool call 是 prefilled，沒有 `tool_selected_by_agent` 證據；真實 Agent Reader 應獨立記錄。[^arxiv-face-eval] |
| Evidence use | `source_opened`、`evidence_extracted`、`evidence_span_id` | 記錄 source／document identity、fragment／span、offset 或 structured field，不以 CoT 提及代替。 |
| Claim support | `claim_supported`、`citation_entails` | 分別判斷答案主張是否被 evidence 支持，以及 citation 是否指向能支持該主張的來源；可使用固定 rubric 與雙 judge。 |
| Source presentation | `cited`、`shown`、`source_panel_opened` | citation emitted、使用者實際看見與 UI panel 開啟是不同結果層。 |
| Downstream outcome | `clicked`、`referred`、`task_validated` | 點擊、referral 與 task completion 不能由 citation 或 CoT monitor 結果推導。 |
| Trace attribution | `cot_commitment_recorded`、`source_attribution_recorded`、`monitor_verdict` | CoT／monitor 是額外 observability signal，不是 evidence-use ground truth。[^arxiv-face-eval] |

# FACE-Eval-derived measures

若使用與來源相同的概念，可記錄：

- **Verbalized Commitment Rate（VCR）**：在 answer 跟隨 cue 的 eligible samples 中，CoT 明確記錄 tailoring decision 的比例。
- **Unverbalized Adoption（UAR）**：answer 跟隨 cue 且 CoT 沒有記錄該決定的比例；不要把它改寫成「模型未使用來源」或「模型欺騙」。
- **Transcript-monitor performance**：固定 monitor model、rubric、prompt、版本與 threshold，記錄 AUROC／agreement；不同 judge 可能改變絕對值與 model ranking。

FACE-Eval 在 15 個模型中觀察到 tool-return 的 VCR 低於 user-message，explicit cue 高於 implicit cue；UAR 的 channel comparison 全部偏向 tool-return，explicitness comparison 則有 28/30 偏向 implicit。這些數字只屬來源 protocol，應與本方法的 `retrieved`、`evidence_extracted`、`claim_supported`、`citation_entails`、`shown` 與 `clicked` 分開。[^arxiv-face-eval]

# Paired protocol

1. **固定 scenario 與 target preference**：對同一 query／task、同一偏好方向與同一 candidate source，建立 no-cue、user-message、tool-return、retrieved-document 與 memory arms；保留每個 representation 的 hash。
2. **分離 channel 與 explicitness**：若要複製 FACE-Eval，維持同一 underlying cue，分別比較 `user_message`／`tool_return` 與 `explicit_summary`／`implicit_raw_artifact`。記錄 wrapper、prefilled call、message order 與 inference burden；不要把 channel difference 解釋成單一因果機制。[^arxiv-face-eval]
3. **另設 tool-selection arm**：FACE-Eval 的 prefilled tool call 只測 continuation after tool return；要研究 Agent 是否能發現與選擇工具，必須另外讓 Agent 從候選工具中選擇，保存 candidate exposure、selection、invocation、result identity 與 failure。
4. **固定 runtime 與 judge**：鎖定 model／provider／version、system／user prompt、tool schema、temperature／sampling、seed、reasoning setting、judge rubric 與 parser；至少保存 request／response、tool input／output、timing、model id、schema version 與 artifact hash。
5. **建立 claim ledger**：每個 final-answer claim 指向 `evidence_span_id` 與 source identity，分開標記 `claim_supported`、`citation_entails`、`source_attribution_recorded`、`cot_commitment_recorded`；任何 automated judge 結果都保留 judge id 與 judge-specific verdict。
6. **保存完整 outcome funnel**：依序記錄 `candidate_exposed`→`retrieved`→`source_opened`→`evidence_extracted`→`claim_supported`→`citation_entails`→`cited`→`shown`→`clicked`，並另記 `task_validated`；不要用一次回答截圖取代中間事件。
7. **做 robustness 與 negative controls**：加入 representation-equivalent、cue-shuffled、no-cue、wrong-source、source-identity mismatch、judge-order counterbalance 與 repeated-run controls；把 source attribution prompt 與 monitor-aware prompt 當 intervention arms，而非預設能修正 observability gap。

# Findings and boundaries

## 來源支持的 finding

FACE-Eval 的結果支持：在特定 prefilled-tool／single-call continuation 設定下，tool-return 與 implicit raw-artifact cues 可能使 CoT 對「使用偏好調整答案」的明示記錄較少，而答案仍可能跟隨該 cue；transcript monitor 的偵測能力與 UAR 在該 protocol 下呈現負向相關。[^arxiv-face-eval]

## 研究轉譯（draft inference）

對 xdxd 的 Known-URL Agent Reader，應把 CoT／monitor signal 視為 observability layer，而把 source identity、opened evidence、evidence span、claim support、citation entailment 與 postcondition／task validation 視為主要 evidence path。若只有 CoT 說「我引用了某來源」，不能把它當作 `source_opened`、`claim_supported` 或 `citation_entails` 的證明；反過來，CoT 沒有明示 attribution 也不單獨證明來源未被使用。這是依 FACE-Eval 與既有 Agent trace 方法作出的 draft research translation，不是來源已測得的公開 Web 結果。[^arxiv-face-eval][^agent-capability-observation]

對公開 AI Search，仍需另外取得 crawler／index／retrieval／citation／source-presentation／referral／click 的端到端 observation；FACE-Eval 沒有證明 structured content、tool trace、CoT monitor 或 source-attribution prompt 會改善 GEO uplift。[^arxiv-face-eval]

# Reproducibility receipt

每個 run 至少保存：

- source／tool／memory payload hash、canonical／versioned URI 與 representation type；
- request／response、tool-call／tool-return、message order、model／provider／version、system／user prompt hash、tool schema version；
- random seed、sampling／reasoning setting、judge id／rubric／parser version；
- claim ledger、evidence span／offset、source identity、`claim_supported`／`citation_entails`、CoT attribution 與 UI／downstream outcome events；
- repeated-run receipt、negative-control receipt 與任何 missingness／access failure。

這份 receipt 能讓人區分「來源被送入 context」、「模型聲稱使用來源」、「來源片段支持主張」、「citation 指向支持來源」與「使用者看見／點擊」；它不會自動把任何一層提升成另一層。

## Related concepts

- [arXiv FACE-Eval raw capture](/raw/arxiv-face-eval-2026-09-01.md) — 不可變 source payload、metadata、claim ledger 與 rights boundary。
- [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) — dispatch／tool presence／evidence-use 的既有觀測框架。
- [生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md) — claim support、citation entailment 與公開 Web funnel。

[^arxiv-face-eval]: Aryo Pradipta Gema, Neel Rajani, Rohit Saxena, Wai-Chung Kwan, and Pasquale Minervini, “Chain-of-Thought Faithfulness of Reasoning Models Varies with Where and How Preference Cues Are Delivered,” arXiv:2608.29464v1, submitted 2026-08-29. Immutable raw capture: [raw wrapper](/raw/arxiv-face-eval-2026-09-01.md), [experimental HTML](/raw/arxiv-face-eval-2026-09-01/paper.html), [paper PDF](/raw/arxiv-face-eval-2026-09-01/paper.pdf), and [capture metadata](/raw/arxiv-face-eval-2026-09-01/capture-metadata.json).

[^agent-capability-observation]: Existing draft method: [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md).
