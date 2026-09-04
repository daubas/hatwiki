---
type: Research Method
title: Agent-ready website 與 web agent reliability 觀測方法
description: 將 agent-ready website 的 interpretability、executability、decision reliability、LandingAgent 的 target brief／reference profile／批判修補、ASIL structured-state／semantic-action interface、WebMCP structured action surface 的 provenance／lifecycle boundary、OpenAI Presence 的 application-side policy／evaluation／approved-action／escalation／production-feedback loop、synthetic web environment 的 scaffold validity、website map／website-specific prior、task-trajectory synthesis，以及 open-web training exposure 與 distinct-site coverage 轉成已知 URL Agent Reader 與 web-agent reliability 對照實驗的可重現觀測欄位。
tags:
  - agent-discoverability
  - web-agents
  - agent-reader
  - structured-content
  - machine-readability
  - actionability
  - decision-reliability
  - synthetic-environments
  - open-web-sourcing
  - website-coverage
  - website-map
  - website-prior
  - task-trajectory-synthesis
  - trajectory-data
  - verification
  - state-grounded
  - structured-state
  - semantic-actions
  - semanticity
  - stable-identifiers
  - deepest-feasible-access
  - adapter-contract
  - agent-operations
  - production-reliability
  - approved-actions
  - escalation
  - production-feedback
  - experiment-design
  - landing-pages
  - reference-profiles
  - target-grounding
  - claim-grounding
  - cta
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-03T09:46:05.221806000Z
sources:
  - id: arxiv-agent-ready-websites
    resource: /raw/arxiv-agent-ready-websites-2026-08-26.md
    title: arXiv《Designing Agent-Ready Websites for AI Web Agents》原始研究 raw capture
    author: human:said-elnaffar
    last_modified: 2026-07-13
  - id: arxiv-trustworthy-worlds
    resource: /raw/arxiv-trustworthy-worlds-2026-08-26.md
    title: "arXiv《Training Needs Trustworthy Worlds: Verified Synthetic Web Environments for Agent Learning》原始研究 raw capture"
    author: human:chenghao-zhang
    last_modified: 2026-08-22
  - id: arxiv-browserforge
    resource: /raw/arxiv-browserforge-2026-08-26.md
    title: "arXiv《BrowserForge: Scaling Web Episode via Parallel Browser Sandboxes》原始研究 raw capture"
    author: human:fei-tang
    last_modified: 2026-08-26
  - id: arxiv-webmcp-phalanx
    resource: /raw/arxiv-webmcp-phalanx-2026-08-26.md
    title: "arXiv《WebMCP-Phalanx: Enforcing and Characterizing Trust Boundaries for Browser-Integrated LLM Agents》原始研究 raw capture"
    author: human:lin-fa-lee-et-al
    last_modified: 2026-08-25
  - id: webmcp-cg-draft-2026-08-28
    resource: /raw/webmcp-2026-08-28.md
    title: WebMCP Community Group draft（2026-08-28 raw capture）
    author: w3c/webmachinelearning
    last_modified: 2026-08-26
  - id: chrome-webmcp-docs-2026-08-30
    resource: /raw/chrome-webmcp-2026-08-30.md
    title: Chrome for Developers「WebMCP」官方文件（2026-08-30 raw capture）
    author: human:alexandra-klepper
    last_modified: 2026-08-07
  - id: w3c-webmcp-tag-review-1238
    resource: /raw/w3c-webmcp-tag-review-2026-09-01.md
    title: "W3C TAG「Incubation: WebMCP」官方設計審查 raw capture（2026-09-01）"
    author: w3c/tag
    last_modified: 2026-08-20
  - id: arxiv-landingagent
    resource: /raw/arxiv-landingagent-2026-08-31.md
    title: "arXiv《LandingAgent: A Reference-Annotated Dataset and Agentic Generation Framework for Landing Pages》原始研究 raw capture"
    author: human:injun-baek-et-al
    last_modified: 2026-08-28
  - id: arxiv-synweaver
    resource: /raw/arxiv-synweaver-website-prior-2026-08-26.md
    title: "arXiv《SynWeaver: Website-Prior Task and Trajectory Co-Synthesis for Web Agents》原始研究（2026-08-26 raw capture）"
    author: human:ruitao-wang-et-al
    last_modified: 2026-08-12
  - id: arxiv-asil
    resource: /raw/arxiv-asil-structured-state-semantic-actions-2026-08-28.md
    title: "arXiv《ASIL: Replacing Screenshot-and-Click with Structured State and Semantic Actions》原始研究（2026-08-28 raw capture）"
    author: human:rui-xie-and-lu-chen
    last_modified: 2026-08-27
  - id: openai-presence-announcement
    resource: /raw/openai-presence-2026-09-01.md
    title: "OpenAI Presence 官方公告（2026-09-01 raw capture）"
    author: openai/product
    last_modified: 2026-08-31
  - id: arxiv-discriminative-world-models
    resource: /raw/arxiv-discriminative-world-models-2026-09-03.md
    title: "arXiv《Discriminative World Models for Web Agents》原始研究 raw capture（2026-09-03）"
    author: human:kelvin-li-et-al
    last_modified: 2026-09-02
  - id: arxiv-monitoring-web-agents
    resource: /raw/arxiv-monitoring-web-agents-2026-09-03.md
    title: "arXiv《Monitoring Web Agents Without Internal Signals》原始研究 raw capture（2026-09-03）"
    author: human:sitong-pan-et-al
    last_modified: 2026-09-02
---

# 方法定位

本頁把一篇 agent-ready website 原始研究轉成 xdxd GEO 可重現的觀測方法。它優先回答「已知 URL 或受控網站表示是否讓 browser agent 更容易讀取、執行與作出有證據的決策」，不把這個問題直接等同於公開 AI Search 的 discovery、retrieval 或 citation。原始研究的結論與本頁整理均維持 `status: draft`，尚未經人工審閱。[^arxiv-agent-ready-websites]

新增的 environment-level 觀點來自另一篇原始研究：web-agent 的失敗可能由 broken links、不一致 backend state 或不可行 task 造成，而不是 policy 本身造成。因此，representation／action A/B 之前應先保存並核對 environment scaffold 的 pages、navigation、records、state-change markers 與 task constraints；這是 synthetic web-agent training 的方法候選，不是公開搜尋平台規格。[^arxiv-trustworthy-worlds]

## Application-side agent operational reliability boundary

OpenAI Presence 的第一方公告可作為 application-side agent operations 的對照：它把明確 workflow、受限 knowledge／system access、policies／guardrails、approved actions、simulations／evaluations、escalation 與 production feedback 放在同一條 deployment lifecycle。公告也描述 production signal 驅動的 change proposal、與 production 版本 replay 及受控 rollout；這些是產品自述，不是 xdxd 對公開 Web 或跨企業部署的驗證。[^openai-presence-announcement]

因此，已知 URL Agent Reader／web-agent 實驗可額外保存 `workflow_id`、access scope、policy／guardrail version、simulation／grader version、tool trace、action postcondition、escalation reason、human handoff、production-session hash、change proposal、replay result、rollout approval 與 `workflow_completed`。`evaluation_passed`、`approved_action`、`human_handoff` 與 `workflow_completed` 屬 application-side operational outcomes，必須和 `representation_parsed`、`agent_actionable`、`claim_supported`、`citation_entails` 以及公開 `crawled`→`indexed`→`retrieved`→`cited`→`shown`→`clicked` 分開記錄。來源自報的 `75%` 無人工 inbound resolution 與 `15` 個百分點 handoff reduction 只能標為 observational，不是 xdxd 效果量。[^openai-presence-announcement]

# 三個觀測維度

| 維度 | 來源中的操作化方向 | xdxd 建議保存的觀測欄位 |
|---|---|---|
| Agent interpretability | machine readability、semantic clarity；HTML／DOM、Schema／JSON-LD、metadata、semantic HTML、清楚 headings 與描述 | DOM／HTML snapshot、可見文字、JSON／JSON-LD、schema fields、`aria-*`、`data-*`、heading hierarchy、entity／attribute／relation extraction completeness |
| Agent executability | agent actionability；明確的 button、link、form、identifier、action path，以及可選的 API／MCP access | action inventory、role／label、form fields、target identifiers、action sequence、錯誤類型、成功／失敗、step count、recovery attempts |
| Agent decision reliability | evidence、來源、reviews／certifications、組織資訊與 temporal validity signals | claim／evidence pair、source metadata、freshness／validity field、constraint completeness、unsupported decision rate、stale observation、citation entailment |

三個維度應分開記錄：representation 通過不等於 action 成功，action 成功也不等於決策正確或答案引用充分。這個分層是對來源框架的研究化整理，不是平台規格。[^arxiv-agent-ready-websites]

# Environment scaffold validity layer

在已知 URL Agent Reader 或 browser-agent A/B 之前，先增加一層 environment validity，避免把 scaffold defect 當成 agent failure：

| 檢查面向 | 最小觀測欄位 | 研究用途 |
|---|---|---|
| Structural | page inventory、navigation graph、link reachability、form／action binding | 確認頁面與互動路徑在結構上存在 |
| Semantic／consistency | rendered value、database record、cross-page entity／attribute、schema binding | 找出畫面、資料與跨頁狀態互相矛盾的情況 |
| Feasibility | task constraints、bounded executable trace、required control、completion predicate | 判斷任務是否至少有一條可執行路徑 |
| State safety | state-change marker、allowed delta、backend invariant、post-action state | 將持久性更新限制在已驗證的 marker 與合法 state delta |
| Repair／audit | defect category、blocking attribution、repair iteration、independent re-check | 區分環境錯誤、agent policy 錯誤與修復後殘留風險 |

來源研究把這些檢查組成 verification／repair pipeline，並以 verified task-progress predicates 產生 state-grounded dense reward；xdxd 應把其轉成可重播的 scaffold manifest、verification report、bounded trace 與 marker log，而不是只保存最終成功率。來源在 500 個 synthetic environments 的結果可作為 protocol 假說與 sanity-check 參考，不能視為 xdxd 或公開 Web 的效果量。[^arxiv-trustworthy-worlds]

## Action-conditioned state representation、counterfactual action ranking 與 web-agent reliability

**Discriminative World Models for Web Agents** 提供一個可接在本頁 interpretability／executability 之後的 action-conditioned representation 層。來源指出，若 world model 只重建固定的文字摘要、HTML 或完整 AXTree，預測可能包含大量沒有改變的頁面結構，卻沒有保留足以區分競爭 action 後果的 state change；其 predicted-state matching 目標改要求 representation 對同一 decision point 的 true next state 與 alternative next state 具有可辨識性。這是 web-agent decision-support 的原始研究，不是公開 AI Search 的 crawler、index、ranking 或 citation 規格。[^arxiv-discriminative-world-models]

### 從線性 trajectory 到 branching state-action graph

來源把 Go-Browse 的線性 WebArena trajectories 中重複出現的 browser states 合併成 state-action graph：節點是以 accessibility tree 表示的 browser state，邊是已執行 action 及其 observed next state。同一個 current state 的多條 outgoing edges 形成 branching decision point，讓研究者可以配對 `queried_action` 的真實後果與另一個 action 的 alternative outcome。來源報告 `7,730` 個 branching decision points、來自 `2,839` 條 trajectories，形成 `30,920` 個 pairwise examples；這個 branching corpus 仍只來自已觀察的 trajectories，沒有枚舉每個 state 的完整 action space。[^arxiv-discriminative-world-models]

### 三段式 representation-to-decision trace

對已知 URL Agent Reader／web-agent 的 paired run，可把來源方法轉成三段可重播 trace：

1. **Prediction**：固定 task、interaction history、current accessibility／structured state 與 queried action，由 world model 產生 `predicted_next_state_representation`；不要把固定格式重建當成唯一合格輸出。
2. **Matching**：將 representation 交給 matching judge，對比 queried action 的 `observed_next_state` 與同一 decision point 的 `alternative_next_state`。judge 不應再取得 instruction、history、current state 或 action，以免把答案從 representation 外部帶入；candidate order、judge model／version 與 judge prompt 必須保存。
3. **Ranking／execution**：在 candidate actions 固定的條件下，比較 action-only ranker、加入 fixed-format state 的 ranker，以及加入 predicted-state-matching representation 的 ranker；再將 selected action 的 post-state、completion predicate 與 downstream task outcome 綁定。trained reward model 與 frozen ranker 應分開。

來源在其 held-out matching protocol 報告作者模型 overall `80.80%`，高於 WebWorld-8B `70.17%`、WebDreamer-7B `74.51%` 與 data-matched full-AXTree baseline `47.77%`；在同一 Qwen2.5-7B trained reward-model setup，平均 Best-of-N 為 direct `55.80%`、WebWorld state `67.63%`、state-matching state `72.70%`。這些是來源指定 WebArena／WebPRMBench、模型、split、judge 與 harness 的 observational evidence，不是 xdxd reproduction，也不是公開搜尋排名。[^arxiv-discriminative-world-models]

### 建議保存的 action-conditioned 欄位

| 層次 | 最小欄位 | 必須分開的 outcome |
|---|---|---|
| Branch | `decision_point_id`、`pre_state_hash`、`candidate_action`、`alternative_action`、`observed_post_state_hash`、action provenance | candidate exposure 不等於 selected 或 executed |
| Representation | `predicted_representation_hash`、representation schema／length、state-change span、`state_changed`、world-model version／prompt | representation parsed 不等於 matching correct |
| Matching | `matching_judge`、candidate order、judge prompt／version、`representation_discriminative`、match verdict | judge verdict 不等於獨立 ground truth |
| Ranking | ranker／PRM version、candidate pool、`action_rank`、Pairwise／Best-of-N、trained／frozen arm | action ranked 不等於 action executed |
| Execution | pre／post state、postcondition、step／token／latency／cost、failure category、task completion | task success 不等於 claim support、citation entailment 或 public visibility |

### WebArena-Lite 結果與 xdxd 接合方式

來源在同一 implementation framework、GPT-4o policy 與 WebArena-Lite evaluation 中比較 ReAct-style、Best-of-5（Bo5）與 Bo5 加入 frozen state-matching world model：task success 分別為 `13.94%`、`21.82%`、`28.48%`。對 xdxd 而言，這只支持「在該受控 benchmark 中，action-conditioned predicted state 可作為候選 action ranking 的額外訊息」這個 protocol-bound observation；不能推論同一表示會讓任意網站更容易被公開搜尋發現、被索引、被引用或帶來 referral／click uplift。[^arxiv-discriminative-world-models]

最小 paired protocol 應固定 site／state／task／candidate-action snapshot、model／provider、world-model／ranker version、prompt、judge、browser runtime、seed、step／token budget 與總成本，並至少比較：

1. fixed-format next-state prediction 與 predicted-state matching；
2. action-only、state-augmented 與 state-matching ranker；
3. trained 與 frozen ranker；
4. 單一候選、Bo5 與 matched candidate-pool；
5. in-domain 與 held-out site／domain。

若 representation 含 HTML／AXTree、JSON／JSON-LD 或 accessibility tree，應另外保存其 source／render／extractor identity 與 pre／post diff；不要把較短 token output、較高 matching accuracy 或 benchmark task success 寫成 structured content 對公開 AI Search 的 ranking／citation 促進。公開 Web 仍要獨立保存 `crawled`→`indexed`→`retrieved`→`used_in_answer`→`claim_supported`→`citation_entails`→`shown`→`clicked`，這條 funnel 不可由 WebArena／web-agent action trace 代替。[^arxiv-discriminative-world-models]

## Observable trajectory monitoring、key-step supervision 與 early-cut intervention

**Monitoring Web Agents Without Internal Signals** 提供一個與前段 action-conditioned representation 不同的 runtime monitoring 層：問題不是預測下一個 state 或排序 candidate action，而是只依賴已觀察到的 trajectory prefix，判斷執行是否仍在正軌或正走向失敗。這個層特別適合沒有 token logits、hidden states 或其他 model-internal signals 的 closed-source agent；它仍是受控 web-agent research，不是公開 AI Search crawler、index、ranking 或 citation 規格。[^arxiv-monitoring-web-agents]

### Macro／Micro observable signals

來源把 observable trajectory signal 分成兩組：

- **Macro** 直接從 realized prefix 的 action、environment feedback、execution／grounding error 與 agent decision text 計算累積 count、rate 或 indicator，包含 action repetition／loop 與 action usage；不需要額外 model query。
- **Micro** 在固定 observable context 下重複 black-box query，要求 agent 結構化輸出 `intention`、`executable_action` 與 `anticipated_state_change`，再以語意 clustering 測量多次決策在 intention→action→預期 state change 三層的 consistency。它需額外 sampling，成本必須和 risk gain 分開記錄。

這與本頁既有的 interpretability、executability、decision reliability、DWM predicted-state matching 以及公開搜尋 funnel 是不同層次：trajectory signal parsed 不等於 state prediction correct，risk alarm 也不等於 action selected、task completed、claim supported 或 citation entailed。[^arxiv-monitoring-web-agents]

### Key-step supervision 與 false-cut 分母

不要把 failed trajectory 的最終 label 複製到所有 prefix。來源以第一個「未在觀察到的後續 continuation 中被修正，且與最終失敗相關」的 critical error 作為 key-step boundary；boundary 前的 prefix 保留 `on_track`，從 boundary 起才標為 `tending_toward_failure`。這讓 early-cut simulation 可以區分：在失敗開始前介入、在成功 trajectory 上的 premature false cut，以及任務自然終止後才發現 failure。來源用 Gemini-3.5-Flash 加固定 codebook 做 LLM-as-judge annotation，並以 human／多次 judge comparison 報告 annotation reliability；這不是 xdxd 的人工 verification。[^arxiv-monitoring-web-agents]

在來源的 WebArena-Lite／Online Mind2Web protocol 中，保留 2,183 條 trajectories，observable signals 與 UQ baseline 做 prefix-risk comparison；來源報告 Mind2Web 的 15/15 與 WebArena-Lite 的 9/15 backbone–metric comparisons 相當或優於最佳可用 baseline，Macro 為較穩定的 standalone signal，Micro 的增益具有 benchmark-dependent 性質，且會增加 repeated-query cost。這些是來源指定 benchmark、ReAct framework、五個 backbone、split、calibration、judge 與 threshold 的 observational evidence，不是 xdxd reproduction。[^arxiv-monitoring-web-agents]

### xdxd 的 paired monitoring protocol

在自有或明確授權的網站／corpus 上，固定 site／task／state snapshot、trajectory prefix、model／provider、agent framework、prompt、judge、sampling budget、browser runtime、seed 與 stopping threshold，至少配對比較：

1. terminal-only supervision 與 key-step-aware supervision；
2. Macro-only、Micro-only、Macro&Micro 與可取得的 internal-signal baseline；
3. no intervention 與 fixed false-cut-budget early cut；
4. in-domain 與 held-out website category；
5. no repeated sampling 與不同 Micro sampling budget。

每個 prefix／run 至少保存 `trajectory_prefix_hash`、`environment_feedback_hash`、`observable_macro_features`、`observable_micro_features`、`intention`、`executable_action`、`anticipated_state_change`、`key_step`、`failure_category`、`risk_score`、`cut_decision`、`false_cut`、`recovery_attempt`、`task_completion`、step／token／latency／cost，以及 feature、judge、prompt、model、runtime 版本。成功率、early-cut detection 或跨類別 transfer 不能取代公開 `crawled`→`indexed`→`retrieved`→`used_in_answer`→`claim_supported`→`citation_entails`→`shown`→`clicked` funnel；若要研究 GEO，必須另建 public-Web exposure／citation protocol。[^arxiv-monitoring-web-agents]

來源的 key-step label 依賴完整 failed trajectory 來檢查 recovery，並不宣稱選定 state 對所有可能 continuation 都不可恢復；ReAct-only scope、LLM judge、semantic clustering、部分 supervised control 與 benchmark coverage 都限制外部 generality。因此本頁只把它編譯為可重播的 monitoring／intervention protocol，維持 `draft`，不把 source-reported benchmark gain 寫成公開搜尋 visibility 或 GEO uplift。[^arxiv-monitoring-web-agents]

## Website map、website prior 與 task-trajectory co-synthesis

SynWeaver 提供一個與既有 representation／actionability 層相接、但不等同公開搜尋漏斗的 web-agent data-synthesis 方法。來源先以 DFS crawler 把目標網站表示成 `G=(S,T)`：`S` 是功能上不同的頁面狀態，附帶 screenshot 與 accessibility tree；`T` 是可執行互動及其 action。progressive state comparison 判斷 post-action 是否形成新狀態，duplicate-trigger detection 抑制重複觸發，分支結束後再 backtrack。這種 map 是網站特定的功能拓撲與訓練資料前置，不是 Google、Bing、Perplexity 或 OpenAI 的 crawler／index／ranking evidence。[^arxiv-synweaver]

來源從 map 的 states／transitions 產生五類 UI supervision：page description、page question answering、element description、forward transition description 與 inverse transition description，再以 LoRA 微調 UI-aware model。其用途是讓 task proposal 看見較完整的 website-specific UI prior，而不是只根據局部頁面線索推測可用功能。對 xdxd 而言，這應被記作「網站知識如何進入 Agent Reader／web-agent training」的 representation-to-action 變項，不應寫成 structured content 會提高公開 AI Search visibility 的規則。[^arxiv-synweaver]

在 task-trajectory synthesis 階段，來源先從 map 的 transition triplet `(s, o_p, s')` 做 reverse task synthesis，再由 teacher model 依任務收集 trajectory。當任務缺少必要細節、與目前網站狀態不相容或多次嘗試後停滯時，較強 teacher 同時修正 task specification 與已收集的 execution prefix；heuristic verification 不通過時再做 update／delete／reorder／add-none repair，直到 pair 通過或被過濾。這個 joint refinement 應與「單獨改任務」和「固定任務只改軌跡」分開做消融，並保留每次 repair 的前後 hash。[^arxiv-synweaver]

### 來源研究的初始量測與限制

來源在五個 WebArena websites 保留 `559` states、`794` transitions，從 map 產生 `3,500` UI samples、`822` validated task-trajectory pairs 與 `4,500` action steps。其 Qwen3-VL-8B-Instruct 在經 filter 的 WebVoyager 評估中報告 overall task success rate `27.06%`，比該表列的 SynthAgent baseline 高 `4.64` 個百分點；來源另在同一 task set 比較 decoupled／collaborative refinement，報告 task SR `71.89%`→`74.79%`、trajectory retention `90.59%`→`99.52%` 與估計成本 `$0.091`→`$0.085`。這些都是來源在 WebArena／WebVoyager、特定模型、teacher、filter、verification 與成本估算下的 observational evidence，不是 xdxd 結果或公開搜尋效果量。[^arxiv-synweaver]

來源的自動探索在 CAPTCHA、強 anti-bot、rate limiting 或 dynamic authentication 等環境可能較不可靠；WebArena 的資料產製與 WebVoyager 的 held-out evaluation 也不能代表所有網站、領域、模型或 production agent。若實驗失敗，應先記錄 `environment_invalid`、access block、dynamic-auth、duplicate-trigger、repeated-action、timeout 與 repair exhaustion，而不是把所有失敗歸因於 representation 或 policy。[^arxiv-synweaver]

### xdxd 可重播欄位與 paired protocol

在自有或明確授權網站／corpus 上，新增下列欄位：

- **Map**：`site_id`、`map_snapshot_hash`、`state_id`、`transition_id`、`functional_state_signature`、screenshot／DOM／accessibility-tree hash、action schema、post-state hash、state-comparison result、duplicate-trigger result、backtrack event 與 state／transition coverage。
- **Prior supervision**：`supervision_type`（page description／page QA／element／forward transition／inverse transition）、teacher model／version、input／output hash、UI model checkpoint、LoRA／training-data version、page／transition provenance 與 task-proposal record。
- **Co-synthesis**：`task_id`、task version、`trajectory_prefix_hash`、refinement mode、trigger reason、repair operation、verification iteration、repair reason、retained／filtered、termination、executability 與 task-trajectory semantic alignment。
- **Exposure and outcomes**：training exposure、known-URL Agent Reader 的 parse／action／decision outcome，以及公開搜尋的 `crawled`、`indexed`、`retrieved`、`used`、`cited`、`shown`、`clicked` 必須分開保存。map coverage 或 web-agent task success 不可代替公開 AI Search funnel。

最小 paired protocol 是固定 site specification、source／map snapshot、task、model／version、prompt、browser runtime、action schema、seed 與總成本，比較：

1. random-walk 與 DFS／map-based exploration；
2. local-page proposer 與 website-prior UI-aware proposer；
3. task-only、trajectory-only 與 joint collaborative refinement；
4. no post-verification、verification 與 verification＋repair；
5. in-domain website 與 held-out website／domain。

每個 run 需保存 raw map、page／transition representation、task specification、trajectory prefix、repair trace、verification report、model／prompt、step／token／latency／cost、task difficulty、environment validity，以及 claim／evidence alignment／citation entailment（若任務含來源證據）。這是依 SynWeaver 方法提出的 xdxd 研究推論；原始研究的 benchmark 結果不能直接外推為公開 AI Search 的 crawl、index、retrieval、citation、source presentation 或 click uplift。[^arxiv-synweaver]

## Open-web training exposure 與 site-coverage layer

BrowserForge 提供一個與公開搜尋漏斗不同的前置層：訓練資料是否來自固定網站清單，或來自經 reachability、site type、content、blacklist 與執行 IP accessibility 清理的 open-web URL population。來源以 Common Crawl 類型 snapshot 取樣，並用平行 browser sandbox、Proposer–Solver synthesis 與 rule／model cleaning 形成 web-agent trajectory corpus；這是 training exposure 與 runtime reliability 的研究變項，不是某個公開搜尋引擎已 crawl 或 index 的證據。[^arxiv-browserforge]

在 representation／Agent Reader 實驗中，應把下列層次分開：

| 層次 | 建議欄位 | 不可直接推導 |
|---|---|---|
| URL population | `source_snapshot_id`、`candidate_url_count`、`reachable_url_count`、`distinct_site_count`、site type、content／blacklist decision、cluster-IP accessibility | 不等於公開 crawler coverage 或 search index inclusion |
| Training exposure | `trajectory_count`、`raw_interaction_steps`、`verified_steps`、`rewritten_steps`、website／domain distribution、screen resolution、user agent、language | 不等於 Agent Reader 對任一已知 URL 的 production reliability |
| Representation | screenshot／HTML／a11y snapshot hash、`representation_stage`（synthesis／inference）、page URL／title、action inventory | synthesis-time a11y signal 或 screenshot-only policy 不等於公開 AI Search 的 structured-content preference |
| Runtime reliability | `task_id`、`run_id`、`state_changed_after_action`、`repeated_action_count`、step budget、access block、completion、error category | 最終 task success 不等於 claim support、citation entailment 或公開 visibility |

來源報告的 `203,238` trajectories／distinct websites、約 `1.8M` raw interaction steps、約 `600K` verified steps 與 `200K` unified-reasoning training steps，可作為資料管線的量測欄位範例；它們是來源作者在特定 open-web sourcing、model、judge、filter 與 training protocol 下的數字，不是 xdxd 的資料量目標或效果保證。[^arxiv-browserforge]

最小 paired protocol 是在自有或明確授權 corpus 中固定 task、model、prompt、browser runtime、source snapshot 與總成本，分別比較：

1. 固定網站清單 vs. 經清理的 open-web-like URL sample；
2. raw trajectory vs. rule-filtered vs. model-judged vs. unified-reasoning corpus；
3. screenshot-only inference vs. HTML／a11y-assisted inference；
4. 小、中、大 distinct-site coverage，並對 Cross-Task、Cross-Website、Cross-Domain 分層；
5. successful completion 與 click loop、back loop、scroll tail、access block、step timeout 等互斥 failure categories。

每個 run 需保存 URL／網站去重規則、source／representation hash、candidate／reachable／distinct-site 分母、trajectory filter decision、judge model／version、prompt、seed、step／token／latency／cost，以及 `crawled`、`indexed`、`retrieved`、`used`、`cited`、`shown`、`clicked`（若有公開搜尋）等不同漏斗層。不能以 open-web training coverage 或 browser-agent benchmark gain 代替公開 AI Search 的 crawl、index、retrieval、citation、source presentation 或 click evidence。[^arxiv-browserforge]

## WebMCP structured action surface、provenance 與 lifecycle boundary

WebMCP 應另視為 agent-facing action surface，而不是 HTML／Markdown／JSON-LD 等唯讀 representation 的同義詞。新增的原始研究把 WebMCP 描述為仍在形成中的 W3C draft proposal：網頁可向 agent 暴露 structured tools；其研究問題集中在 tool provenance、lifecycle、runtime behavior 與 semantic prompt injection，而非公開搜尋 ranking 或 citation。這個範圍與本頁的 known-URL Agent Reader／actionability 層相接，但不取代公開 Web 的 crawler、index、retrieval、citation 與 click 層。[^arxiv-webmcp-phalanx]

WebMCP Community Group draft 的 versioned source 進一步把 action surface 分為 imperative JavaScript functions 與 declarative HTML forms：工具攜帶自然語言描述與 structured input schema，declarative proposal 則把 form controls 編譯成 agent 可呼叫的 schema。這支持把 `tool_registration_mode`、description、input schema、form semantics、response channel 與 implementation claim 納入已知 URL 的 actionability audit；來源仍是 `CG-DRAFT` 與 repository 自述，不能用來宣稱瀏覽器全面支援或公開 AI Search／GEO uplift。[^webmcp-cg-draft-2026-08-28]

Chrome for Developers 的官方 WebMCP 文件（頁面最後更新 2026-08-07）把 WebMCP 描述為讓網站透過 JavaScript 與 HTML form annotations 暴露 structured tools 的 proposed web standard，並列出 Discovery、JSON Schemas 與 State 三個支援面向；文件也說明 imperative／declarative API、Chrome 149 origin trial、local testing flag 與目前仍會變動的 implementation status。這些是 Chrome 對其文件／試驗介面的第一方描述，不能當成 xdxd 已完成的瀏覽器相容性或 task-success 驗證。[^chrome-webmcp-docs-2026-08-30]

該文件特別列出三個與實驗設計直接相關的邊界：headless browsing 不是主要設計目標、複雜介面可能需要額外 JavaScript／state refactor，以及 client／browser 必須先直接造訪網站才知道頁面是否有 callable tools。後者把 WebMCP tool discovery 明確放在 **known-URL action surface**，不等同公開搜尋的 discovery、crawl、index 或 retrieval；因此 xdxd 應新增 `client_direct_visit`、`tool_registration_mode`、`origin_trial_or_runtime_version`、`visible_execution`、`origin_isolation` 與 `permissions_policy` 欄位，並與公開 `crawled`→`indexed`→`retrieved`→`used_in_answer`→`citation_entails`→`cited`→`shown`→`clicked` 漏斗分開。[^chrome-webmcp-docs-2026-08-30]

Chrome 文件把 origin isolation 與 `tools` Permissions Policy 列為 API gate，並描述 inspector extension 可查看註冊工具、手動呼叫、檢查 JSON Schema 與 structured output／error。對 paired run 而言，這補強了既有 registration／enumeration／invocation trace：應保存 permission／origin configuration、工具 schema、pre／post state、returned-content hash、call success／failure 與 human-in-the-loop boundary；文件自述的 reliability／task-completion improvement 仍無獨立 effect estimate，維持 `unresolved`。[^chrome-webmcp-docs-2026-08-30]

### W3C TAG design-review 與 standards-stage boundary

W3C TAG 的公開 issue #1238 將 WebMCP 標為 `CG early review`、`in progress`，並列出 API design、Web architecture、Security、Privacy、Accessibility 與 Internationalization 等 pending focus；issue 另標示 `Missing: Multi-stakeholder support`。這些欄位可作為 WebMCP standards-stage／governance snapshot，但不代表完成版標準、正式 TAG resolution、跨瀏覽器相容性或產品品質保證。[^w3c-webmcp-tag-review-1238]

Issue checklist 顯示 explainer 已勾選包含要求資訊與連結 Security/Privacy Questionnaire，但 Web Platform Design Principles 與 user research checklist 尚未勾選。公開 comments 則把 explicit capability layer／agent pathway 與 richer HTML semantics 的取捨列為持續討論，並明確提醒個別 notes 不代表 TAG consensus；因此 paired run 應將 `standards_stage`、`review_progress`、`focus_labels`、`checklist_state`、`consensus_status` 與 `capability_layer_vs_richer_html_semantics` 另存，不把 issue comments 當作正式規格或效果證據。[^w3c-webmcp-tag-review-1238]

Issue feedback 連結 Mozilla／WebKit 的 standards-position material，但本輪沒有另行擷取 linked documents；外部 benchmark、參與者 comments 中的成本／速度／task outcome 數字與 private TAG discussion 均維持 unresolved。這個 governance layer 只補充 WebMCP 的審查成熟度與設計爭議，不改變「known-URL action surface 與公開 AI Search discovery／retrieval／citation 分層」的既有邊界。[^w3c-webmcp-tag-review-1238]

對已知 URL 的 WebMCP／agent-ready paired run，除既有 action inventory 外，應保存一條可重播的 action-surface trace：

```text
tool registration
  → origin／principal provenance
  → lifecycle scope
  → trust／behavior label
  → pre-execution metadata inspection
  → invocation
  → post-execution returned-content inspection
  → page transition／residual invalidation
  → selected／invoked／completed
```

最小欄位包括 `tool_name`、`tool_description`、`input_schema`、`readOnlyHint`、registrant origin／principal、capability／registration state、`lifecycle_scope`（session／navigation）、registration／enumeration／revocation／overwrite event、declared behavior、runtime trace（如 network／DOM side effect）、trust label、quarantine／privileged route、pre／post checkpoint、returned-content hash、page-transition event、semantic residual、name relevance、call-timing gate 與 normal no-attack task utility。工具是否被列出、是否被選中、是否被呼叫、是否成功完成，必須和內容 representation 的 parse／claim／evidence outcome 分開記錄。[^arxiv-webmcp-phalanx]

來源作者在其特定 browser-integrated WebMCP environment 中報告：ownership attack 由 `20/20` 降為 `0/20`；每格 `n=80` 的 description injection 在多 agent content judgment 下為 `0/80`，returned-content injection 尚有 `2/80` residual；清除 navigation-scoped tool 不能自動移除已進入 conversation history 的 semantic residual。來源也報告 white-box adaptive attacker 可把 payload 移到符合任務的 tool name，指出 name-layer 或 call-timing gate 是必要的補強。這些是該 preprint 的 conditional evidence，不是 xdxd 實驗結果。[^arxiv-webmcp-phalanx]

實驗設計至少應比較 full tool list、trust-label-only、content inspection、name-layer gate、call-timing gate、lifecycle residual invalidation 與 no-defense，固定 page／tool set、browser／polyfill version、model／provider、prompt、attack corpus、registry snapshot、page transition、seed、step／latency／token budget 與 no-attack baseline。若研究目的包含安全與效用，攻擊成功、正常 task completion、阻擋／延遲與 false positive 應分開報告；不能用 attacked-baseline 的 task utility 差異單獨推論 defense 成本或 GEO 成效。[^arxiv-webmcp-phalanx]

證據邊界：該研究使用 JavaScript polyfill，部分 API integrity／script provenance 是 emulated 或 architectural assumption；site-declared trust policy 與 out-of-band user confirmation 未獨立實驗，runtime observation 偏向 detection／containment 而非阻止初始 side effect。WebMCP 的 structured tool registration、browser-agent action success 或 injection mitigation 不得改寫成公開 AI Search 的 crawl、index、retrieval、citation、source presentation、click 或 overall agent discoverability uplift。[^arxiv-webmcp-phalanx]

## ASIL：structured state 與 semantic action 的 agent-native interface

ASIL 提供一個與本頁 interpretability／executability 層相接的 agent-native interface 候選：以 typed structured JSON observation 暴露軟體狀態，以 schema-constrained、code-executable semantic action 表達操作，再從下一個 structured observation 直接核對 post-action state。來源將 screenshot 的 visible projection 與 GUI click／keypress 的低語意長序列視為 interface mismatch，並提出 completeness、semanticity、stability、composability 四個設計原則；這是 software-operating agent 的原始研究，不是公開 AI Search 的 crawler、index、ranking 或 citation 規格。[^arxiv-asil]

來源的「deepest feasible access path」把同一 protocol 映射到三種 implementation pattern：file-backed、native scripting、service／API。JSON 是 normalized agent-facing representation，不要求 backend 原生以 JSON 儲存；application 至少要有 open read path 與 semantic-action path，完全 opaque、沒有可解析檔案／腳本／structured command／service surface 的 application 不在其方法範圍。其 adapter contract 為 `observe()`、`execute(action)`、`validate_action(action)`；observation 可包含 metadata、application state、interactive elements、environment context、navigation structure 與 textual summary，action 可包含 `set_value`、`invoke_function`、`modify_file`、`api_call`、`navigate` 與 `batch`。這些欄位可補強本頁既有的 action inventory、schema 與 post-action state，但不能被寫成所有網站或引擎的共通介面。[^arxiv-asil]

### ASIL 的來源 benchmark 與限制

來源建立 300 個 single-application 與 80 個 multi-application tasks，涵蓋 15 個 applications；ASIL 與 GUI 共用 task definition、initial state 與 validator，但來源也明確揭露原始主比較的 ASIL prompt 含 evaluator-derived success hints，而 GUI prompt 沒有，同一 evaluator 亦用於 SFT filtering、RL reward 與 benchmark scoring。正文一組指定 rows 報告 GPT-5.4 的 ASIL `81.6` 對 repaired GUI／50-step `6.6`、sonnet4.6 的 `81.2` 對 `26.6`，並報告平均少於五個 semantic actions；這些是來源在特定 software、model、prompt、runtime、budget 與 validator 下的 observational evidence，不是 xdxd 重現。來源另指出 fully opaque applications、perceptual／aesthetic tasks 與小模型長程 RL 穩定性仍有限。[^arxiv-asil]

對 xdxd 的已知 URL Agent Reader／web-agent paired run，可把 ASIL 的 representation／action contract 轉成以下可稽核欄位：

- **Structured state**：`observation_schema_version`、`observation_source`、`application_state_hash`、`active_document`、`interactive_element_id`、`element_type`、`label`、`value_type`、`editability`、`constraints`、`navigation_graph_hash` 與 `environment_context_hash`。
- **Semantic action**：`action_type`、`target_id`、`params_schema_hash`、`action_description`、`access_path`（file／script／service-api／MCP／DOM）、`action_validated`、`pre_state_hash`、`post_state_hash`、execution status、latency 與 error。
- **Verification／trace**：`adapter_version`、`interface_profile_hash`、`validator_version`、typed checkpoint、`traj.jsonl` hash、`state_delta`、`completion_predicate`、`recovery_attempt` 與 evaluator／independent-check provenance。
- **GEO funnel separation**：`crawled`、`indexed`、`candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked`；ASIL task success、action count 或 post-state validity 不可代替公開搜尋漏斗。

最小 paired protocol 是在同一個自有／明確授權網站或 software-like corpus 固定 source／environment snapshot、task、model、prompt、tool schema、seed 與總 budget，比較 screenshot／GUI-event、structured state／semantic action，以及必要的 hybrid perceptual supplement；另做 access-path（file／script／service／MCP）、stable identifier、action composability、hidden-state completeness、validator independence、prompt hint on／off 與 perceptual-task strata。每個 run 應保存 raw observation、action、pre／post state、validator receipt、GUI／DOM rendering（若有）、claim／evidence alignment 與成本；若研究公開 AI Search，仍須另行保存 crawler、index、retrieval、citation、source presentation 與 click evidence。這些移植欄位是依來源提出的 xdxd 研究推論，不是 ASIL 對公開 GEO 的效果承諾。[^arxiv-asil]

## LandingAgent：target brief、reference profile 與 page-quality trace

LandingAgent 提供一個可接在本頁 representation／actionability 之後的 page-authoring 觀測層：來源把 landing-page generation 拆成 **Profiling → reference-guided Wireframing → critique-guided Polishing**，而不是只把自然語言直接轉成 HTML／CSS／JavaScript。`Structured Page Brief` 將 target 的 value proposition、audience、category、tone、conversion goal、required information 與 visual identity hints 正規化，供後續 reference retrieval、wireframe construction 與 critics 共用；這是來源的生成架構，不是公開 AI Search 的 ranking 或 citation 規格。[^arxiv-landingagent]

來源以 abstract reference profile 取代直接餵入完整 HTML／逐字 copy：profile 可包含 page category／target／conversion goal／tone、information density、scroll depth、CTA／asset dependency、section order／role、layout pattern、visual emphasis、palette／typography／imagery descriptors 與 retrieval axes。其 LandingBench 從 Common Crawl candidate 經 hard filter、LLM-based scoring 與兩位 reviewer 的 human verification，636 個 candidates 中接受 438 頁；來源報告 `P_o=0.821`、Cohen’s `κ=0.48`（95% CI `[0.40, 0.56]`），最後資料集含 13 個 section-role labels、平均每頁 8.0 個 annotated sections。這些是來源指定 corpus／annotation protocol，不是 xdxd 的人工簽核。[^arxiv-landingagent]

| 層次 | 來源操作 | xdxd 建議保存 |
|---|---|---|
| Target brief | 由 target specification／assets 產生結構化 brief | `target_specification_hash`、audience、value proposition、tone、conversion goal、required information、visual hints |
| Reference retrieval | 依結構／視覺 axes 選 abstract profile，不直接複製 source page | `reference_profile_id`、retrieval axes、candidate pool、selected profile、profile coverage、source-copy overlap |
| Wireframing | 以 section role、information flow 與 layout 組織全頁結構；critic 可退回重選 | `wireframe_hash`、section sequence、`wireframe_critic_decision`、diagnostic hint、restart count／limit、global alignment |
| Polishing | 以 target-grounded copy、style、assets 與 implementation details 做局部修補 | `polish_round`、aesthetic／message／functional feedback、patch、approval threshold、anchor／navigation／CTA check |
| Outcome | page quality、agent actionability、公開搜尋與 business action 分開 | render／DOM／JSON-LD hash、claim grounding、known-URL task result、`retrieved`／`cited`／`shown`／`clicked`／`conversion` |

來源的 WireframeCritic 以最多 `R_max=3` 次 retrieve–build–critique restart 處理 global structural misalignment；Polisher 由 AestheticCritic、MessageCritic、FunctionalCritic 平行回饋，預設每個 critic 以 4/5 為 approval threshold，最多 `T_max=3` rounds。對 xdxd 而言，應將 `wireframe_restart` 與 `polish_patch` 視為不同 failure／repair 類型，並保存每輪 input／output／feedback hash；不能只保存最終頁面或成功率。[^arxiv-landingagent]

來源的受控評估固定 30 個 target specifications、12 個 industries，產生 540 個 pages，比較 Direct Prompting、One-shot、Direct Prompting + Polisher 與 LandingAgent；指標是 structural diversity、Faithfulness、Conciseness、Readability、Aesthetics，部分以 LLM-as-a-Judge 評分，另有 23 位參與者的 blind pairwise study。來源報告 LandingAgent 在其指定 model／prompt／judge／sample protocol 下優於部分 baseline，但 token counts 未匹配，也沒有真實部署、CTR 或 conversion measurement。這些是 page-generation proxy evidence，不是公開 AI Search outcome。[^arxiv-landingagent]

### LandingAgent 的 paired protocol 轉譯

在自有或明確授權網站／頁面 corpus 上，可固定 target specification、source／reference snapshot、model／provider、prompt、runtime、seed、budget 與評估 rubric，配對比較：

1. direct prompting 與 target profiling；
2. raw-page reference、abstract reference profile 與 no-reference；
3. retrieve–build–critique restart on／off；
4. polishing critics／patch on／off；
5. page-quality proxy、known-URL Agent Reader outcome 與真實 downstream action。

每個 run 應保存 source／profile／brief／wireframe／render／DOM／JSON-LD／metadata hash、candidate pool、reference selection、critic feedback、restart／polish trace、unsupported-claim audit、functional postcondition、model／prompt／seed／cost，以及 `representation_parsed`、`agent_actionable`、`known_url_task_success`、`candidate_exposed`、`retrieved`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked`、`signup`、`purchase`、`conversion`。LandingBench retrieval、LLM judge、human preference 或頁面美學分數都不能代替 crawler、index、公開 retrieval、citation 或 click evidence。[^arxiv-landingagent]

# 受控 A/B 設計

## 變體

建立同一網站／資料集的兩個版本：

- **Baseline**：保留一般人類導向的內容與互動表示。
- **Agent-ready**：只加入預先登記的 representation、action 與 evidence／temporal features。

兩個版本應保持產品／頁面、價格、庫存、任務、prompt、模型參數與 runtime 條件一致；差異必須可列舉並保存 diff。這對應來源研究以相同電子商務 prototype 比較 Website A／B 的設計。[^arxiv-agent-ready-websites]

若變體包含動態頁面或後端資料，先固定相同的 site specification、page template、task constraint 與 state seed，再分別建立 baseline／agent-ready representation；另應保存 environment scaffold hash 與 verification report。驗證不足時，該 run 不應直接進入 representation effect 的分母，應標成 `environment_invalid` 或另作敏感度分析。這是根據 verified synthetic-environment 研究整理的控制規則，尚未由 xdxd 實驗驗證。[^arxiv-trustworthy-worlds]

## 執行與評分

來源研究可作為初始 protocol：使用固定模型 panel，temperature `0`、top-p `1`，每個 session 設定 step／error 上限，重啟 local server 並使用獨立 temporary browser profile；每個 task 在每個 model／variant 重複執行，保存 prompt、interaction history、token usage、errors、execution output 與 run-level response。結果至少分為 `PASS`、`PARTIAL`、`FAIL`，另保存 strict success、functional success、step count、token usage 與錯誤類型。[^arxiv-agent-ready-websites]

若使用人工評分，應保存 annotator protocol、標註者數量、每一 run 的原始 log／JSON output 與 disagreement handling；不能只保存彙總百分比。

# 來源研究提供的初始基準

原始研究在 300 次受控電子商務 prototype run 中，報告 agent-ready 版本的 strict success 為 89.3%（134/150），baseline 為 49.3%（74/150），平均 step count 由 9.31 降至 6.49；作者將其描述為 preliminary evidence，並指出複雜的 extraction、comparison 與 multi-constraint tasks 改善較明顯。這些數字只可作為 protocol／效應量假說的參考，不是 xdxd 的重現結果，也不能外推成公開搜尋排名、citation 或 agent discoverability 成效。[^arxiv-agent-ready-websites]

# 與 GEO 量測的接合

本方法適合放在 xdxd 的已知 URL Agent Reader／representation 層，並與下列層次分開保存：

1. **Crawl／index**：bot request、status、render、index／canonical。
2. **Environment validity**：page／link graph、state consistency、task feasibility、bounded trace、marker safety 與 defect attribution。
3. **Retrieval／source selection**：固定 query、fan-out variants、hit@k、retrieved URL。
4. **Citation／answer**：citation URL、claim support、entailment、答案位置與 click。
5. **Agent interaction**：本頁的 interpretability、executability、decision reliability 與 run-level outcome。

[Cloudflare Markdown for Agents](/entities/cloudflare-markdown-for-agents.md) 已提供同一 canonical URL 的 HTML／Markdown representation 對照變項；[Google 生成式 AI 搜尋研究基線](/concepts/google-search-generative-ai-optimization.md) 則保留可索引性、query fan-out 與平台邊界。這些 representation／interaction 觀測都不能替代公開 AI Search 的 retrieval／citation evidence。[^arxiv-agent-ready-websites]

# 最小資料模型

每個 variant／run 至少保存：

- `site_id`、`variant_id`、canonical／target URL、source／derived content hash、capture time。
- HTML／DOM／accessibility tree、visible text、JSON／JSON-LD、metadata、schema／entity fields。
- action inventory、labels、roles、form／link／button identifiers、API／MCP surface（若有）。
- evidence／source fields、published／modified／freshness signals、constraint set。
- environment scaffold hash、page／navigation graph、state schema、task constraints、verification／repair report、bounded executable trace、state-change marker log。
- model、provider、agent framework、version、temperature、top-p、prompt、task、run id、step／error limits。
- raw response／trace、PASS／PARTIAL／FAIL、strict／functional success、step count、token usage、error category、claim／evidence alignment。

# 證據邊界與限制

- 來源研究是 single controlled proof-of-concept，場景為電子商務 prototype；沒有足夠證據外推到其他領域、真實網站、所有 agent 或公開搜尋平台。[^arxiv-agent-ready-websites]
- verified synthetic-environment 來源同樣是特定 generator、六個 synthetic domains、PPO policy 與 benchmark／transfer 設定；其 `48.6%`、`94.8%`、缺陷率與 human success 只能作為來源報告，不能作為 xdxd 重現或公開 Web prevalence。[^arxiv-trustworthy-worlds]
- BrowserForge 是 open-web training-data 與 browser-agent runtime 的來源研究；其 distinct-site coverage、Common Crawl 取樣、model-based judging、screenshot／a11y synthesis 與 benchmark 結果不能直接外推為公開 AI Search crawler coverage、index inclusion、retrieval、citation 或 agent discoverability 效果。[^arxiv-browserforge]
- SynWeaver 是 website-prior task／trajectory co-synthesis 的單一原始研究；其 website map、UI supervision、822 validated pairs、WebArena／WebVoyager task success、verification／repair 與成本結果只屬來源的網站、teacher、模型、filter 與 benchmark protocol，不能外推為公開 AI Search crawl、index、ranking、retrieval、citation、source presentation 或 click 效果。若要移植，須保存 map snapshot、functional state／transition、task／trajectory revision、repair trace 與 environment-invalid 分層。[^arxiv-synweaver]
- Discriminative World Models 的 branching corpus、matching judge、WebPRMBench action ranking 與 WebArena-Lite task success 都受來源的 WebArena／Go-Browse、model、candidate set、judge、policy 與 implementation framework 限制；其 action-conditioned representation 不能外推為公開 AI Search crawl、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。[^arxiv-discriminative-world-models]
- 來源研究報告的 A/B 差異不能單獨分辨 JSON／JSON-LD、semantic labels、action cues、evidence fields 或 temporal fields 各自的因果貢獻；後續應做 feature ablation。
- OpenAI Presence 是 application-side enterprise agent product 的第一方描述；其 policies、evaluations、approved actions、production signals、`75%` inbound resolution 與 `15` 個百分點 handoff reduction 不支持公開 AI Search visibility、citation、referral、click 或 GEO uplift，也沒有提供可供 xdxd 重播的完整 operational logs。[^openai-presence-announcement]
- 不可把更好的已知 URL browser-agent task success 寫成 Google、Bing、ChatGPT、Perplexity 或其他引擎的 ranking、retrieval、citation、click 或整體 agent discoverability 提升。
- 公開搜尋實驗必須另保存 crawler、index、canonical、retrieval、citation、referral 與時間窗，並僅使用自有或明確授權內容；方法邊界依[證據生命週期](/methods/evidence-lifecycle.md)執行。

原始證據見 [agent-ready websites raw capture](/raw/arxiv-agent-ready-websites-2026-08-26.md)、[trustworthy worlds raw capture](/raw/arxiv-trustworthy-worlds-2026-08-26.md)、[BrowserForge raw capture](/raw/arxiv-browserforge-2026-08-26.md)、[SynWeaver raw capture](/raw/arxiv-synweaver-website-prior-2026-08-26.md) 與 [Discriminative World Models raw capture](/raw/arxiv-discriminative-world-models-2026-09-03.md)；DWM 不可變 body 見 [abstract HTML](/raw/arxiv-discriminative-world-models-2026-09-03/abstract.html)、[experimental HTML](/raw/arxiv-discriminative-world-models-2026-09-03/paper.html)、[PDF](/raw/arxiv-discriminative-world-models-2026-09-03/paper.pdf) 與 [Atom API](/raw/arxiv-discriminative-world-models-2026-09-03/arxiv-api.xml)。其他來源的不可變 body 分別見 [agent-ready paper HTML](/raw/arxiv-agent-ready-websites-2026-08-26/paper.html)、[trustworthy worlds paper HTML](/raw/arxiv-trustworthy-worlds-2026-08-26/paper.html)、[trustworthy worlds PDF](/raw/arxiv-trustworthy-worlds-2026-08-26/paper.pdf)、[trustworthy worlds arXiv API](/raw/arxiv-trustworthy-worlds-2026-08-26/arxiv-api.xml)、[BrowserForge abstract HTML](/raw/arxiv-browserforge-2026-08-26/abstract.html)、[BrowserForge paper HTML](/raw/arxiv-browserforge-2026-08-26/paper.html)、[BrowserForge PDF](/raw/arxiv-browserforge-2026-08-26/paper.pdf)、[BrowserForge arXiv API](/raw/arxiv-browserforge-2026-08-26/arxiv-api.xml)、[SynWeaver abstract HTML](/raw/arxiv-synweaver-website-prior-2026-08-26/abstract.html)、[SynWeaver paper HTML](/raw/arxiv-synweaver-website-prior-2026-08-26/paper.html)、[SynWeaver PDF](/raw/arxiv-synweaver-website-prior-2026-08-26/paper.pdf) 與 [SynWeaver arXiv API](/raw/arxiv-synweaver-website-prior-2026-08-26/arxiv-api.xml)。

[^openai-presence-announcement]: OpenAI, “Introducing OpenAI Presence,” official product announcement, <https://openai.com/index/introducing-openai-presence/>; immutable raw wrapper: [OpenAI Presence raw capture](/raw/openai-presence-2026-09-01.md). The canonical origin returned a Cloudflare challenge, so the wrapper preserves a readable selected excerpt and provenance receipts rather than the full article. The source is application-side product evidence and does not provide public AI Search or GEO effect evidence.

[^arxiv-discriminative-world-models]: Kelvin Li, Dhruv Pendharkar, Anish Pahilajani, Chuyi Shang, Leon Oks, Leonid Karlinsky, Rogerio Feris, Trevor Darrell, and Roei Herzig, “Discriminative World Models for Web Agents,” arXiv:2609.02885v1, submitted 2026-09-02. Source URL: <https://arxiv.org/abs/2609.02885v1>; immutable raw capture: [capture metadata](/raw/arxiv-discriminative-world-models-2026-09-03/capture-metadata.json), [abstract HTML](/raw/arxiv-discriminative-world-models-2026-09-03/abstract.html), [experimental HTML](/raw/arxiv-discriminative-world-models-2026-09-03/paper.html), [paper PDF](/raw/arxiv-discriminative-world-models-2026-09-03/paper.pdf), [Atom API](/raw/arxiv-discriminative-world-models-2026-09-03/arxiv-api.xml), [selected excerpts](/raw/arxiv-discriminative-world-models-2026-09-03/selected-excerpts.txt), [SHA-256 manifest](/raw/arxiv-discriminative-world-models-2026-09-03/sha256.txt), and [rights record](/raw/arxiv-discriminative-world-models-2026-09-03/rights.txt). The experimental HTML displays CC BY 4.0; the source evaluates WebArena／Go-Browse／WebPRMBench web-agent protocols and does not provide public AI Search or GEO effect evidence.
[^arxiv-monitoring-web-agents]: Sitong Pan, Yipeng Shen, Yilin Lu, Caiwen Ding, Lu Cheng, and Qianwen Wang, “Monitoring Web Agents Without Internal Signals: Observable Trajectories and Key-Step Supervision,” arXiv:2609.02057v1, submitted 2026-09-02. Source URL: <https://arxiv.org/abs/2609.02057v1>; immutable raw capture: [capture metadata](/raw/arxiv-monitoring-web-agents-2026-09-03/capture-metadata.json), [abstract HTML](/raw/arxiv-monitoring-web-agents-2026-09-03/abstract.html), [experimental HTML](/raw/arxiv-monitoring-web-agents-2026-09-03/paper.html), [paper PDF](/raw/arxiv-monitoring-web-agents-2026-09-03/paper.pdf), [Atom API](/raw/arxiv-monitoring-web-agents-2026-09-03/arxiv-api.xml), [selected excerpts](/raw/arxiv-monitoring-web-agents-2026-09-03/selected-excerpts.txt), [SHA-256 manifest](/raw/arxiv-monitoring-web-agents-2026-09-03/sha256.txt), and [rights record](/raw/arxiv-monitoring-web-agents-2026-09-03/rights.txt). All four official representations returned HTTP 200 during the 2026-09-03 capture; the experimental HTML displays CC BY 4.0. The source evaluates WebArena-Lite and Online Mind2Web web-agent monitoring protocols and does not provide public AI Search or GEO effect evidence.

[^arxiv-agent-ready-websites]: Said Elnaffar and Farzad Rashidi, “Designing Agent-Ready Websites for AI Web Agents: A Framework for Machine Readability, Actionability, and Decision Reliability,” arXiv:2607.12056v1, submitted 2026-07-13. Source URL: <https://arxiv.org/abs/2607.12056>; immutable raw capture: [metadata](/raw/arxiv-agent-ready-websites-2026-08-26.md) and [official HTML](/raw/arxiv-agent-ready-websites-2026-08-26/paper.html).
[^arxiv-trustworthy-worlds]: Chenghao Zhang, Canran Xiao, SaiSai Hu, and Dan Roth, “Training Needs Trustworthy Worlds: Verified Synthetic Web Environments for Agent Learning,” arXiv:2608.21898v1, submitted 2026-08-22. Source URL: <https://arxiv.org/abs/2608.21898>; immutable raw capture: [metadata](/raw/arxiv-trustworthy-worlds-2026-08-26.md) and [official HTML](/raw/arxiv-trustworthy-worlds-2026-08-26/paper.html).
[^arxiv-browserforge]: Fei Tang, Huawen Shen, Zhiqiong Lu, Zhengxi Lu, Pengyuan Lyu, Chengquan Zhang, Weiming Lu, Jun Xiao, Yueting Zhuang, and Yongliang Shen, “BrowserForge: Scaling Web Episode via Parallel Browser Sandboxes,” arXiv:2608.24848v1, submitted 2026-08-25. Source URL: <https://arxiv.org/abs/2608.24848v1>; immutable raw capture: [metadata](/raw/arxiv-browserforge-2026-08-26.md), [abstract HTML](/raw/arxiv-browserforge-2026-08-26/abstract.html), [paper HTML](/raw/arxiv-browserforge-2026-08-26/paper.html), [paper PDF](/raw/arxiv-browserforge-2026-08-26/paper.pdf), and [arXiv API](/raw/arxiv-browserforge-2026-08-26/arxiv-api.xml).

[^arxiv-webmcp-phalanx]: Lin-Fa Lee, YI-YU Chang, and Kuo-Hui Yeh, “WebMCP-Phalanx: Enforcing and Characterizing Trust Boundaries for Browser-Integrated LLM Agents,” arXiv:2608.24017v1, submitted 2026-08-25. Source URL: <https://arxiv.org/abs/2608.24017v1>; immutable raw capture: [capture metadata](/raw/arxiv-webmcp-phalanx-2026-08-26/capture-metadata.txt), [abstract HTML](/raw/arxiv-webmcp-phalanx-2026-08-26/abstract.html), [experimental HTML](/raw/arxiv-webmcp-phalanx-2026-08-26/paper.html), [API](/raw/arxiv-webmcp-phalanx-2026-08-26/arxiv-api.xml), and [paper PDF](/raw/arxiv-webmcp-phalanx-2026-08-26/paper.pdf).
[^arxiv-synweaver]: Ruitao Wang, Yuwen Hao, and Menglin Yang, “SynWeaver: Website-Prior Task and Trajectory Co-Synthesis for Web Agents,” arXiv:2608.12429v1, submitted 2026-08-12. Source URL: <https://arxiv.org/abs/2608.12429>; immutable raw capture: [metadata](/raw/arxiv-synweaver-website-prior-2026-08-26.md), [abstract HTML](/raw/arxiv-synweaver-website-prior-2026-08-26/abstract.html), [experimental HTML](/raw/arxiv-synweaver-website-prior-2026-08-26/paper.html), [paper PDF](/raw/arxiv-synweaver-website-prior-2026-08-26/paper.pdf) and [arXiv API](/raw/arxiv-synweaver-website-prior-2026-08-26/arxiv-api.xml).
[^chrome-webmcp-docs-2026-08-30]: Alexandra Klepper, “WebMCP,” Chrome for Developers, published 2026-05-18, last updated 2026-08-07, <https://developer.chrome.com/docs/ai/webmcp>; immutable raw capture: [metadata](/raw/chrome-webmcp-2026-08-30.md), [HTML snapshot](/raw/chrome-webmcp-2026-08-30/page.html) and [capture metadata](/raw/chrome-webmcp-2026-08-30/capture-metadata.json). The page is first-party documentation and does not provide independent public AI Search or GEO effect evidence.
[^arxiv-landingagent]: Injun Baek, HyeongSeok Lee, Yearim Kim, Junhoo Lee, and Nojun Kwak, “LandingAgent: A Reference-Annotated Dataset and Agentic Generation Framework for Landing Pages,” arXiv:2608.27902v1, submitted 2026-08-28. Source URL: <https://arxiv.org/abs/2608.27902v1>; immutable raw capture: [capture metadata](/raw/arxiv-landingagent-2026-08-31/capture-metadata.json), [abstract HTML](/raw/arxiv-landingagent-2026-08-31/abstract.html), [experimental HTML](/raw/arxiv-landingagent-2026-08-31/paper.html), [paper PDF](/raw/arxiv-landingagent-2026-08-31/paper.pdf), [Atom API](/raw/arxiv-landingagent-2026-08-31/arxiv-api.xml), and [SHA-256](/raw/arxiv-landingagent-2026-08-31/sha256.txt). The article page declares CC BY 4.0; the source does not measure public AI Search or real conversion outcomes.

[^w3c-webmcp-tag-review-1238]: W3C Technical Architecture Group, “Incubation: WebMCP,” design review issue #1238, created 2026-06-11 and with issue payload updated 2026-08-20. Canonical URL: <https://github.com/w3ctag/design-reviews/issues/1238>; immutable raw capture: [W3C TAG design-review raw capture](/raw/w3c-webmcp-tag-review-2026-09-01.md), [issue JSON](/raw/w3c-webmcp-tag-review-2026-09-01/issue.json), [comments JSON](/raw/w3c-webmcp-tag-review-2026-09-01/comments.json), and [SHA-256](/raw/w3c-webmcp-tag-review-2026-09-01/sha256.txt). The issue remains an open early review; it does not provide public AI Search or GEO effect evidence.
