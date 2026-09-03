---
type: Research Method
title: Typed provenance、assertion boundedness 與 evidence-release gate 觀測方法
description: 將持久化 Agent 的 stored-versus-supported distinction、provenance root independence、時間／披露範圍、resolver、decision witness、ClaimReceipt 的 claim sufficiency／experiment coverage 與 generate–verify–revise release gate 轉成可重現的 evidence trace protocol，並與公開 AI Search／GEO funnel 分層。
tags:
  - provenance
  - assertion-boundedness
  - evidence-release
  - evidence-gate
  - agent-security
  - persistent-memory
  - source-independence
  - temporal-validity
  - disclosure-scope
  - citation
  - retrieval
  - agent-discoverability
  - structured-content
  - verification
  - experiment-design
  - public-web-boundary
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-03T14:05:22.013200000Z
sources:
  - id: arxiv-stored-not-supported
    resource: /raw/arxiv-stored-not-supported-2026-09-03.md
    title: "arXiv《Stored Is Not Supported: Typed Provenance and Assertion Guardrails for Persistent AI Agents》原始研究（2026-09-03 raw capture）"
    author: human:jun-he-deying-yu
    last_modified: 2026-09-02
  - id: arxiv-claimreceipt
    resource: /raw/arxiv-claimreceipt-2026-09-03.md
    title: "arXiv《ClaimReceipt: Verifying Evidence Sufficiency and Coverage in Agent Evaluations》原始研究（2026-09-03 raw capture）"
    author: human:peiying-zhu-sidi-chang
    last_modified: 2026-09-02
---

# 方法定位

本頁將 **Stored Is Not Supported** 轉成 xdxd 的 Agent-facing evidence-release 觀測候選。來源處理的是持久化 agent 對 autobiographical claim 的程序性支援與披露控制，不是公開搜尋引擎的 crawler、index、ranking 或 citation 演算法；因此本頁所有公開 Web／GEO 含義都維持分層與 `unresolved`，不能由 application-side conformance 結果直接推導。[^arxiv-stored-not-supported]

## 核心模型：可取得不等於可宣稱

研究中最重要的邊界是：reflection、retrieval、consolidation 或 model prior 可讓 material 可取得，但不會自動讓它具有 agent-specific assertion standing。可將可觀測狀態分成：

1. **State admission**：物件是否可從 authoritative state head 到達。
2. **Source authentication**：是否能驗證宣告的來源／bytes custody；這不保證 informant veracity 或 source independence。
3. **Evidential support**：其 provenance／derivation DAG 是否滿足既定 policy。
4. **Agent stance**：它是 observation、attributed report、interpretation、recorded belief、hypothesis 或 model prior。
5. **Temporal validity**：claim／permission 在 emission time 是否仍有效。
6. **Disclosure authority**：特定 principal、purpose、task 是否被允許看見或使用。

外部 semantic truth 不由此機制決定。這個拆分對 GEO 研究的直接意義是：不能把「頁面被抓到／被檢索」、「來源有 URL」、「模型 confidence 高」或「多個摘要看起來一致」直接記成 claim supported 或 citation entailed。[^arxiv-stored-not-supported]

## Provenance root 與 false corroboration

將 evidence／claim 表示成 immutable typed provenance DAG，並保存每個節點的：

- `origin`、`dependency_ids`、`epistemic_role`；
- `valid_from`／`valid_until` 與 evaluated `emission_time`；
- `principal_scope`、`purpose_scope`、`task_scope`；
- `state_head`、policy version 與 derivation／resolver configuration。

來源的 conservative source-independence rule 要求兩個 entity 的 policy-recognized terminal source-root sets 都非空且互斥。相同 upstream document 產生的不同 URL、embedding、snippet、summary 或 paraphrase 不可因數量增加而製造獨立 corroboration。[^arxiv-stored-not-supported]

這補足既有 [生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md) 對 citation support、source alignment、retrieval utility 的分層：它增加 `root_independence`／`dependency_overlap` 欄位，但不改變公開 `crawled`、`indexed`、`retrieved`、`used_in_answer`、`citation_entails`、`shown`、`clicked` 的分開估計。

## Resolver 與 release gate

對一個結構化 query，先在 authorized projection 上解析主要 evidential status：

- `Supported`：存在符合 policy 的完整 support set；
- `Unknown`：目前沒有足夠支援，不能解讀為 proposition 的否定；
- `Unavailable`：依賴物件被封存、抹除或以 authenticated unavailable marker 取代。

另外保留與主要 status 正交的 `conflicted`、`stale`、`withheld`、`superseded`、`revoked` 與 `decision_witness`。如果 upstream evidence 被撤回，採 forward state reduction：保留歷史版本，重新計算下游 support；只要仍有完整且未撤銷的替代依賴路徑，support 可保留。[^arxiv-stored-not-supported]

候選回應的 mediation path 建議記成：

```text
candidate_response
  → semantic_units_extracted
  → structured_queries_bound
  → resolver_decisions
  → content/status release gate
  → pass | qualify | redact | block | revise
```

Content unit 至少需要 exact claim match、`evidential_status=Supported`、必要 qualification、disclosure authorization 與 emission-head check；status unit 只能由 policy-authorized declassified view render。候選被 revise 時必須重新 extraction／resolution／gate，不能以一次 pre-generation check 代表最終 emitted text。[^arxiv-stored-not-supported]

## ClaimReceipt：sufficiency 與 coverage 的雙重 gate

**ClaimReceipt** 補上「證據夠不夠重算」與「紀錄是否完整覆蓋已承諾的實驗集合」兩個不同的 audit 維度。來源把 sufficiency 定義在 declared claim class：若兩個 admissible executions 的 retained evidence projection 相同卻有不同 claim truth，該 evidence set 就不足；證據缺失時 verifier 應拒絕或回傳 `Inconclusive`，不能用已報告的 scalar 補洞。coverage 則是 set-level property，必須在結果出現前以 experiment manifest 與 ingress commitment 定義 expected assignments，單張 receipt 不能證明完整集合。[^arxiv-claimreceipt]

這使既有的 typed provenance／release gate 可再分成四層：

1. **Transport integrity**：bytes、sequence、chain link 與 signature 是否未被竄改。
2. **Claim-relative semantic sufficiency**：profile、trace、parser、choice、scorer 與其他 `required_field_groups` 是否足以重算指定 claim。
3. **Experiment coverage**：`manifest_hash`、`assignment_id`、`ingress_ticket_id`、expected count 與 terminal reconciliation 是否能使 commit 後的 omission 可見。
4. **External truth boundary**：receipt、hash 或 signature 不證明未抵達 witness 的 interaction、synthetic profile 的外部真實性或公開搜尋中的真實引用效果。

來源的 retrospective protocol 匯入 1,392 筆 records，報告 600 筆 deterministic 與 792 筆 post-generation replay；11/11 frozen semantic faults 回傳預期結果、0/8 benign variations 產生 false positive。prospective CR-3 先 commit 15 profiles 的兩個 condition，共 30 tickets；移除最後一筆 terminal receipt 會回傳 `INCONCLUSIVE_COVERAGE`，只保留 public view 則可保留 coverage／protocol 判斷，但缺少 private opening 的 economic／fidelity claims 需 `Inconclusive`。這些是來源指定 hotel testbed、claim class、frozen specification 與 fault suite 的 observational evidence，不是 xdxd reproduction。[^arxiv-claimreceipt]

ClaimReceipt 與本頁既有的 `state_admitted`→`projection_authorized`→`candidate_extracted`→`evidence_resolved`→`release_qualified`→`emitted` 路徑相容，但增加以下欄位：`claim_id`、`claim_class`、`required_field_groups`、`dependency_matrix_version`、`manifest_hash`、`manifest_signed_at`、`expected_assignment_count`、`terminal_receipt_count`、`coverage_status`、`missing_terminal_ids`、`replay_start`、`replay_end`、`verdict` 與 `inconclusive_reason`。這些是由來源轉譯的 `draft` research-design inference，尚未由 xdxd 執行或驗證。[^arxiv-claimreceipt]

## 來源指定結果與可重現性界線

來源在兩-source fixture 的 24 個 structured cases 中，比較 flat/prior、source-tag、typed mediation 三種 deterministic rules：19 個 unsafe opportunities、5 個 supported controls，跨 6 個 threat tracks。

| release rule | UOR | RC | Coverage | Prevention precision | Prevention recall |
|---|---:|---:|---:|---:|---:|
| Flat/prior | 19/19（100.0%） | 19/24（79.2%） | 5/5（100.0%） | N/A | 0/19（0.0%） |
| Source-tag | 18/19（94.7%） | 18/23（78.3%） | 5/5（100.0%） | 1/1（100.0%） | 1/19（5.3%） |
| Typed mediation | 0/19（0.0%） | 0/7（0.0%） | 5/5（100.0%） | 19/19（100.0%） | 19/19（100.0%） |

來源將此結果限定為 encoded resolver／mediator obligations 的 conformance observation，並明確排除 language-model、natural-language extraction 與 retrieval-system end-to-end evaluation。本 KB 已在作者公開 `openkedge/pci` `v0.2.0`、resolved commit `74841530988f1324bd927da15519486509372917` 實際執行 14-test suite 與 benchmark；結果與表格一致，但仍是 deterministic artifact check，不是 xdxd 的公開 Web reproduction。詳見 [raw evidence](../raw/arxiv-stored-not-supported-2026-09-03.md) 與 [artifact verification record](../raw/arxiv-stored-not-supported-2026-09-03/artifact-verification.txt)。[^arxiv-stored-not-supported]

## xdxd Agent-facing paired protocol

### Evidence state inventory

固定 source／capability snapshot、agent／model、provider／transport、prompt、schema、policy version、recipient、purpose、task、state head 與 evaluation time；每個 evidence／claim object 保存：

- `source_root_id`、`dependency_ids`、`dependency_root_set`、`dependency_digest`；
- `epistemic_role`：`observed_event`、`attributed_report`、`memory_interpretation`、`recorded_belief`、`unverified_retrieval`、`model_prior`、`hypothesis`；
- `valid_from`、`valid_until`、`emission_time`、`supersedes`、`revoked_by`；
- `principal_scope`、`purpose_scope`、`task_scope`、`projection_head`、`emission_head`；
- `evidential_status`、`conflicted`、`stale`、`withheld`、`unavailable`、`decision_witness_digest`；
- `policy_version`、`channel_mediated`、`unmediated_channel_inventory` 與 release disposition。

### Paired treatments

至少配對：

1. flat/prior：model prior／raw retrieved text 可直接成為 answer claim；
2. source-tag：只加 URL／source label，不做 root graph、時間或 scope check；
3. typed mediation：root independence、role、validity、scope、exact support、emission head 與 revision gate 全部啟用；
4. ablation：移除 root-independence、staleness、withholding、supersession、emission-head 或 semantic-unit re-entry，每次只移除一個 gate。

每一 treatment 都要固定 19 類 unsafe opportunities 與 5 類 supported controls，至少包含 unadmitted prior、indirect prompt injection、shared-root duplicates、scope mismatch、erasure／unavailable、expired permission、active conflict、revoked dependency、superseded correction 與 head race；保存 raw candidate、structured extraction、resolver output、witness、released text、revision count 與 latency。

### Measurement and public-Web separation

對 Agent-facing path 分開記錄：

```text
state_admitted
→ projection_authorized
→ candidate_extracted
→ evidence_resolved
→ claim_supported
→ release_qualified
→ emitted
→ task_completed
```

若研究 public Web／AI Search，另行保存：

```text
crawled → indexed → retrieved → used_in_answer
→ claim_supported → citation_entails → cited/shown → clicked
```

`retrieved` 不能代替 `claim_supported`；`citation_attached` 不能代替 `citation_entails`；agent memory conformance、artifact pass rate、response correctness 或 structured-content readability 不能代替公開 GEO ranking、referral、click、conversion 或 downstream task completion。這與 [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 的 candidate／opened／checked／selected／invoked 分層相容，但新增 accepted-state、root independence、release mediation 與 side-channel boundary。[^arxiv-stored-not-supported]

## Falsification、unknowns and limits

來源提出的 future falsification conditions 包括：semantic extraction 超過宣告的 error tolerance、mediation overhead 使 valid-query coverage 低於 utility threshold，或更簡單 heuristic 以更低 latency 達到同等 safety／coverage。論文與 artifact 也明確保留以下限制：

- executable artifact 不實作任意自然語言 semantic-unit extraction；
- generalized witness access control、view-equivalence、完整 provenance traversal、task／branch／relationship scope、cryptographic witness／artifact hash 與 target-origin admission 仍是 specification-level obligations；
- contract 依賴 accepted head integrity、policy binding、correct resolver／declassification、complete channel mediation；
- debug log、cached prompt、telemetry、unmediated tool API 等 side channel 不會因主流程通過而自動安全；
- source-root disjointness 是 procedural independence rule，不是外部真實性或來源品質保證。

因此，下列問題維持 `unresolved`，需另做受控公開 Web／跨引擎研究：

- typed provenance representation 是否改變 AI crawler 的 access、index inclusion 或 retrieval candidate exposure；
- release mediation 是否改變 citation entailment、source presentation、referral、click 或 task completion；
- root independence、staleness、scope 與 withholding flags 在 Google／Bing／ChatGPT／Perplexity 等不同 interface／API surface 的行為是否一致。

本頁維持 `draft`，未加入人工 `verified`；來源的 deterministic result 不應寫成公開搜尋或 GEO 因果效果。[^arxiv-stored-not-supported]

[^arxiv-stored-not-supported]: Jun He and Deying Yu, “Stored Is Not Supported: Typed Provenance and Assertion Guardrails for Persistent AI Agents,” arXiv:2609.02127v1, submitted 2026-09-02. Canonical URL: <https://arxiv.org/abs/2609.02127v1>; immutable raw capture: [raw wrapper](../raw/arxiv-stored-not-supported-2026-09-03.md), [capture metadata](../raw/arxiv-stored-not-supported-2026-09-03/capture-metadata.json), [selected excerpts](../raw/arxiv-stored-not-supported-2026-09-03/selected-excerpts.txt), [artifact verification](../raw/arxiv-stored-not-supported-2026-09-03/artifact-verification.txt), and [rights record](../raw/arxiv-stored-not-supported-2026-09-03/rights.txt). All four official representations returned HTTP 200 during the 2026-09-03 capture; the experimental HTML displays CC BY 4.0.

[^arxiv-claimreceipt]: Peiying Zhu and Sidi Chang, “ClaimReceipt: Verifying Evidence Sufficiency and Coverage in Agent Evaluations,” arXiv:2609.01992v1, submitted 2026-09-02. Canonical URL: <https://arxiv.org/abs/2609.01992v1>; immutable raw capture: [raw wrapper](../raw/arxiv-claimreceipt-2026-09-03.md), [capture metadata](../raw/arxiv-claimreceipt-2026-09-03/capture-metadata.json), [selected excerpts](../raw/arxiv-claimreceipt-2026-09-03/selected-excerpts.txt), [paper PDF](../raw/arxiv-claimreceipt-2026-09-03/paper.pdf), and [rights record](../raw/arxiv-claimreceipt-2026-09-03/rights.txt). All four official representations returned HTTP 200 during the 2026-09-03 capture; the experimental HTML displays an arXiv perpetual non-exclusive license.
