---
type: Research Method
title: Evaluation-first rubric、evidence gate 與 criterion-level revision
description: 將 evaluation-first rubric induction、文獻／資料 grounding、evidence artifact、逐 criterion verification 與 targeted revision 轉成 Agent Reader 與公開 Web evidence funnel 的 draft 觀測方法。
tags:
  - evaluation-first
  - rubric
  - evidence-verifiability
  - criterion-verification
  - targeted-revision
  - agentic-search
  - research-agents
  - provenance
  - structured-content
  - agent-reader
  - claim-support
  - reproducibility
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-01T13:10:44Z
sources:
  - id: arxiv-auto-scirub
    resource: https://arxiv.org/abs/2608.31076v1
    title: "Learning to Evaluate Before Improving: Automatic Rubric Induction for Automatic Research Agents"
    author: human:xuehai-wang-et-al
    last_modified: 2026-09-01
---

# Scope

本方法頁從一篇 arXiv original research 整理 evaluation-first 的研究流程候選：先把高層次 instruction 轉成可執行 rubric，再以 rubric 指導執行、逐 criterion 查核與針對性修正。它是 xdxd GEO 的 draft method，不是已部署的 Agent Reader、公開 AI Search 或跨引擎量測結果。來源原始 snapshot 見 [AutoSciRub raw evidence](/raw/arxiv-auto-scirub-2026-09-01.md)。[^arxiv-auto-scirub]

# Source-backed method pattern

AutoSciRub 將 rubric induction 分成四個互補階段：

1. **Rubric Skeleton Induction**：從 instruction 建構可追溯、低重疊的 atomic scientific goals；此階段只定義應處理的目標，不先臆造特定方法、metrics、baselines 或結果。
2. **Scientific Literature Grounding**：以 goal 的 concepts、methods、metrics 與 protocols 尋找相關文獻；來源把 retrieved literature 用作研究設計知識，而不是當作當前 task 的實驗 evidence。
3. **Task-Data Exploration**：盤點可見檔案／資料的格式、dimensions、欄位、units、labels、conditions、cross-source relations 與 constraints，排除不可執行的文獻建議。
4. **Criterion Synthesis**：將 goal、literature knowledge 與 data profile 合成 criterion；每項 criterion 應能指向資料來源、實驗／分析、metrics／comparisons、預期 artifact 與 satisfaction condition。[^arxiv-auto-scirub]

執行後，verifier 逐 criterion 檢查 current artifact 是否具備必要 experiment、result、figure／table、conclusion 及 mechanism／analysis，將缺口轉為可操作 feedback，再進行 targeted revision；通過 verifier 時可提前停止。來源也用 rubric-free holistic self-refinement 作對照，但兩條路徑的 call structure、workspace 與 budget 並非嚴格等價。[^arxiv-auto-scirub]

# Draft transfer to xdxd GEO observation

以下是依來源 schema 所做的研究移植，不是來源已測試的公開搜尋命題：

## A. Rubric object

對每個 Agent Reader 或跨引擎 research task，先保存一份 immutable rubric snapshot：

| 欄位 | 用途 |
|---|---|
| `goal_id` | 一個可獨立檢查的 task goal。 |
| `source_scope` | goal 依賴的 source snapshot、URL、日期與 rights boundary。 |
| `candidate_representation` | raw／HTML／Markdown／JSON-LD／structured claim 等待比較的內容表示。 |
| `required_evidence` | 必須保存的 source span、metadata、result、citation 或 postcondition。 |
| `satisfaction_condition` | 可重播、可判定的 pass／fail／unresolved 條件。 |
| `boundary` | 不得從該 criterion 推導的更高層主張，例如 ranking、causality 或 GEO uplift。 |

## B. Evidence-gated funnel

將「有內容」與「內容支持主張」拆開記錄：

`task_defined` → `source_snapshot_selected` → `candidate_exposed` → `retrieved` → `opened` → `evidence_span_extracted` → `claim_supported` → `citation_entails` → `shown` → `clicked`

對 application-side Agent Reader，可另加：

`rubric_induced` → `artifact_generated` → `criterion_checked` → `gap_reported` → `revision_applied` → `postcondition_verified`

`shown`、`clicked`、`referral` 只代表公開介面 downstream observation；不可用 Agent Reader 的 `postcondition_verified` 代替公開 Web 的 source presentation 或 click evidence。這個 separation 是 xdxd 的 draft inference。[^arxiv-auto-scirub]

## C. Paired controls

最低限度比較：

- rubric-free vs. rubric-guided revision；
- skeleton-only vs. literature／data-grounded rubric；
- raw representation vs. structured claim＋verbatim span；
- same source snapshot、same task、same model／harness、same evaluator 的 fixed-budget 與 adaptive-stopping arms；
- claim-support judge、citation-entailment judge 與 deterministic receipt 分開保存。

若無法 compute-match，必須記錄 token、tool calls、wall-clock、cost、revision rounds、stopping rule 與 workspace difference，不能把 score difference 單獨解讀為 representation 或 rubric 的 causal effect。

# Evidence and limitations

來源在 ResearchClawBench 的 40 tasks／十個 domains 與 AstaBench 固定 20-task subset 報告跨 model／harness 的 score improvement；這些是作者指定 evaluator、一次 task execution、三次 judge scoring、seed 與 benchmark protocol 的 observational results。來源自己的 analysis 也顯示 executable rubric 的 specificity、actionability 與 evidence verifiability 提升，scientific core coverage 可能下降，因此「更可執行」不能直接等於「研究方向正確」。[^arxiv-auto-scirub]

對 xdxd 而言，這筆 evidence 最可靠的轉移點是**把 evidence requirement 與 satisfaction condition 寫成可檢查對象**，不是把來源 benchmark 分數當成公開 AI Search 或 GEO 的效果量。公開 crawler、index、ranking、retrieval、citation、source presentation、referral 與 click 仍需各自保存原始 response／receipt；來源沒有測量這些層。[^arxiv-auto-scirub]

# Related paths

- [GEO 證據生命週期](/methods/evidence-lifecycle.md) — raw、compile、verify 與 draft boundary。
- [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) — capability、retrieval、tool trace 與公開 Web funnel。
- [生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md) — retrieval、evidence utilization、citation 與 context budget。

[^arxiv-auto-scirub]: Xuehai Wang, Haowei Qin, Tongxin Liu, Junkai Li, Buqiang Xu, Jintian Zhang, Yijun Chen, Zirui Xue, and Shumin Deng, “Learning to Evaluate Before Improving: Automatic Rubric Induction for Automatic Research Agents,” arXiv:2608.31076v1, submitted 2026-08-31. Source URL: <https://arxiv.org/abs/2608.31076v1>; immutable capture: [raw wrapper](/raw/arxiv-auto-scirub-2026-09-01.md), [experimental HTML](/raw/arxiv-auto-scirub-2026-09-01/paper.html), [PDF](/raw/arxiv-auto-scirub-2026-09-01/paper.pdf), [hash manifest](/raw/arxiv-auto-scirub-2026-09-01/sha256.txt).
