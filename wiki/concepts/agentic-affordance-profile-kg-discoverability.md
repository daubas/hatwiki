---
type: Research Claim Set
title: Agentic Affordance Profile（AAP）與 KG Agent discoverability
description: 從原始研究整理以 task-relative affordance、metadata 預判、schema grounding、epistemic closure、PID-resolvable FDO representation 與 semantic Agent Card 描述知識圖譜及 Agent system 可供 Agent 使用程度的 draft framework。
tags:
  - agent-discoverability
  - knowledge-graph
  - structured-content
  - semantic-web
  - provenance
  - epistemic-trust
  - task-grounding
  - research-design
  - agent-card
  - ontology
  - semantic-interoperability
  - reporting-completeness
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T18:38:39.882481000Z
sources:
  - id: arxiv-discoverable-agent-knowledge
    resource: /raw/arxiv-discoverable-agent-knowledge-2026-08-27.md
    title: "arXiv《Discoverable Agent Knowledge — A Formal Framework for Agentic KG Affordances》原始研究（2026-08-27 raw capture）"
    author: human:terry-payne-et-al
    last_modified: 2026-05-25
  - id: arxiv-knowledge-cards
    resource: /raw/arxiv-knowledge-cards-2026-08-29.md
    title: "arXiv《Knowledge Cards: Structured Knowledge for AI Systems》原始研究（2026-08-29 raw capture）"
    author: human:liliana-ferreira
    last_modified: 2026-08-28
  - id: arxiv-fdo-knowledge-graph
    resource: /raw/arxiv-fdo-knowledge-graph-2026-08-30.md
    title: "arXiv《Automated Construction of FAIR Digital Object Knowledge Graphs from Flat Cultural Heritage Records》原始研究（2026-08-30 raw capture）"
    author: human:zeyd-boukhers-et-al
    last_modified: 2026-08-24
  - id: arxiv-agent-o
    resource: /raw/arxiv-agent-o-2026-08-31.md
    title: "arXiv《AGENT-O: A Semantic Agent Card Framework for Interoperable and Governed Healthcare AI Agents》原始研究（2026-08-31 raw capture）"
    author: human:pengze-li-and-cui-tao
    last_modified: 2026-08-28
  - id: arxiv-skillfeed
    resource: /raw/arxiv-skillfeed-2026-08-31.md
    title: "arXiv《Beyond Task-Only Matching: Personalized Skill Routing with Counterfactual Evaluation》原始研究（2026-08-31 raw capture）"
    author: human:tianle-wang-et-al
    last_modified: 2026-08-28
  - id: okf-spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "Open Knowledge Format v0.2 Specification"
  - id: mcp-specification-2026-07-28
    resource: /raw/mcp-specification-2026-09-01.md
    title: "Model Context Protocol Specification 2026-07-28（2026-09-01 snapshot）"
    author: modelcontextprotocol/2026-07-28
    last_modified: 2026-08-31
---

# 研究定位

這是一份從原始研究整理的 draft claim set。論文把 Agent 與異質 knowledge graph（KG）之間的問題描述為「在互動前，如何判斷一個 KG 對特定 task 是否具有可 soundly 使用的 affordance」，而不只是判斷 endpoint 是否存在或資料集包含哪些欄位。它指出 VoID／DCAT 主要描述 KG 的內容與 metadata，SPARQL Service Description 可描述部分 endpoint 能力，但仍沒有完整表達特定 agent 能從 KG retrieve、prove、conclude 什麼，以及空結果依賴哪些 closure assumptions。這是論文的問題定義，不是公開 AI Search 的產品規格。[^arxiv-discoverable-agent-knowledge]

這個方向可補充 [Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md) 對可抓取、可索引與 source presentation 的討論，也可和 [生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md) 的 evidence／citation 分層及 [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 的 registry 觀測並列；但 AAP 本身尚未被 xdxd 採用，也不取代公開 Web 的 `crawled`→`indexed`→`retrieved`→`used`→`cited`→`shown`→`clicked` funnel。

## 1. AAP 與四個維度

論文提出 **Agentic Affordance Profile（AAP）**，作為 VoID／DCAT 之上的 semantic layer。AAP 針對一個 KG 與一組 agent task types，描述下列四個維度：[^arxiv-discoverable-agent-knowledge]

| 符號 | 維度 | 來源中的問題 | xdxd 可先列為的 draft 觀測變項 |
|---|---|---|---|
| `ℰ` | Semantic Expressivity | governing ontology 的 DL／expressivity 與 KG content conformity 是否足以支援所需推理 | `ontology_dl_fragment`、schema／content conformity、declared entailment regime |
| `𝒟` | Agentic Discoverability | agent 在互動前，能否只靠 metadata 評估 KG fitness；若不能，探索成本是多少 | metadata completeness、profile coverage、exploratory-query cost、planning-time decision |
| `𝒢` | Task-Relative Grounding | task signature 的 concepts 是否在 KG resident signature 的 closure 中被明確提供或可由 TBox 定義 | `task_signature`、shared task ontology、TBox／ABox、signature closure、implicit definability |
| `ℛ` | Epistemic Trust Scope | 在何種 consistency、entailment 與 completeness／closure 範圍內，query result 可作為 actionable inference | OWA／CWA／LCWA、predicate completeness、closed shape、consistency status、negative-inference safety |

其中 `𝒟` 是 meta-dimension：它不是「資料內容好不好」的分數，而是描述 agent 在承諾使用 KG 之前要付出的 epistemic assessment cost。論文把能力描述由 raw SPARQL endpoint、結構／能力 metadata、自然語言文件一路推向 full AAP profile；越多 task-relevant fitness 可由 `M(KG)` metadata assertions 在互動前判定，越接近其 Agentic Discoverability 的上界。這是來源提出的 formalization，不能直接當作公開搜尋引擎的 discoverability rate。[^arxiv-discoverable-agent-knowledge]

## 2. Grounding、closure 與 planning gate

論文把 `𝒢` 定義為 task signature 的 schema-level coverage：概念可以直接出現在 resident signature，也可以由 TBox axioms 在 signature closure 中隱含定義。這使 grounding 不等於 lexical name matching，也不等於「KG 裡恰好有多少相關 instance」；來源明確將 `𝒢` 定位為 schema-level metric，instance-level relevance 只被 VoID entity statistics 部分觸及。[^arxiv-discoverable-agent-knowledge]

來源的 task fitness 聯合條件可概括為：

```text
𝒢(KG, task) = 1  且  ℛ(KG) ⪰ ℛ_task^min
```

`ℰ` 間接界定 grounding check 的 computability 與可表達的 entailment regime；`𝒟` 則決定上述條件能否在 planning time 只靠 metadata 判斷，或必須先做 exploratory query。論文另以 `𝒬_D(KG)` 表示 metadata 足以預判 fitness 的 task 集合：若所有 task 的 fitness 都可由 metadata entail，分數為 1；若 metadata 對所有 task 都沉默，分數為 0。這些是研究模型中的條件，不是 xdxd 的產品 gate 或已驗證計算。[^arxiv-discoverable-agent-knowledge]

`ℛ` 特別要求把「查不到」與「可安全判定不存在」分開：在 open-world assumption（OWA）下，空結果通常只代表沒有被記錄，不能直接支持 sound negative inference；在 closed-world 或指定 predicate／SHACL closed shape 的局部範圍，才可能在該聲明範圍內支持負向讀法。這是論文的 formal／illustrative account，不能外推所有 endpoint、資料集或 SHACL 部署具有相同語意。[^arxiv-discoverable-agent-knowledge]

## 3. Worked scholarly-search example

論文用一個 scholarly-search 案例說明維度缺口如何變成 planner verdict，而不是提供 live KG benchmark。任務是找近期在 knowledge engineering 發表、且從未被邀請為大型會議 speaker 的 researchers；task signature 包含 `Researcher`、`Paper`、`authorOf`、`Invited_speaker`、`Conference` 與 `givenAt`，並需要對 `Invited_speaker` 做 sound negative inference。[^arxiv-discoverable-agent-knowledge]

- **KG1**：legacy SPARQL endpoint，只有 minimal RDFS schema、ABox triples 與 triple counts；三個概念缺少必要 TBox grounding，示例為 `𝒢=0.5`，屬 `𝒢`-failure。
- **KG2**：OWL 2 EL endpoint，有 VoID／DCAT 但沒有 completeness declaration；task vocabulary 可 grounding，但 OWA 不能支持「空結果即從未被邀請」，屬 `ℛ`-failure。
- **KG3**：OWL 2 DL extension，具有 full AAP profile，並以 SHACL Closed Shape 對 `Invited_speaker` 做局部閉合聲明；案例表中各維度條件滿足，因此被選取。

來源將 remediation 對應到缺口：`𝒢`-failure 需要 vocabulary mediation 或 knowledge-producing service；`ℛ`-failure 應重新選擇具有足夠 epistemic commitment 的 KG，而不是把內容錯誤當成 repair；`ℰ`-failure 才指向 schema／content repair。這個 mapping 可作為 Agent Reader／capability registry 的 draft failure taxonomy，但案例數字與 planner verdict 不是 xdxd 實測。[^arxiv-discoverable-agent-knowledge]

## 4. 五項未完成研究議程

論文沒有宣稱 AAP 已是部署標準，而是列出使 affordance matching 可部署的五項工作：[^arxiv-discoverable-agent-knowledge]

1. **AAP ontology formalisation**：以 OWL 定義 AAP vocabulary，並建立可對照的 shared task ontology；VoID、DCAT、SPARQL-SD 只能部分限制 `ℰ`／`𝒟`，不足以表達 `𝒢`／`ℛ`。
2. **Tractability of task-relative grounding**：在 OWL-QL／OBDA rewriting、OWL-EL module extraction 等 tractable route 之外，研究更具表達力 DL 的 sound approximation 與 fail-safe coverage estimate。
3. **Compositional affordance semantics**：多 KG 聯邦的 signature-closure union 不一定足夠；共享名稱的衝突 axiom、異質 entailment regime 與 LCWA scope 可能使組合不 coherent，需研究 mediator preservation。
4. **Knowledge service specification**：PSM／mediator 若要成為 planning object，需聲明 epistemic preconditions、產生或 bridge 的 concepts；論文指出現有 MCP tool description 與 LLM tool schema 並未完整聲明這些內容。
5. **Engineering integration and adoption**：需要計算 AAP 維度的 publisher tooling、可嵌入既有 agent planning 的 protocol，以及把 dimension failure 轉成 KG maintainer repair guidance 的 feedback loop。

## 5. xdxd 的研究邊界與下一步

這份來源可把下列欄位加入 Agent-facing structured representation 的候選 schema：`task_signature`、`metadata_assertions`、`schema_dl_fragment`、`resident_signature`、`signature_closure`、`implicit_definability`、`entailment_regime`、`completeness_scope`、`consistency_status`、`planning_time_assessable`、`exploratory_query_cost`、`affordance_gap` 與 `dimension_to_remedy`。在自有／明確授權 corpus 上，可將 raw／structured／AAP-like profile 做 paired run，並將 profile parsing、task grounding、negative-inference safety、evidence support、citation entailment 與公開 Web funnel 分開觀測。

這個方向與 [跨介面生成式搜尋 citation、source presentation 與 session state 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md) 的關係是：AAP 描述 agent 在接觸 KG 前如何判斷「能否可靠使用」，而跨引擎方法描述內容進入公開搜尋後的 `retrieved`、`used`、`cited`、`shown` 與 `clicked` 結果；兩者不應合併成單一 discoverability 指標。任何 AAP-like profile 的效果主張，都需要固定 task ontology、KG snapshot、metadata version、agent／model、query／tool budget、evidence source 與判定分母，且先區分 parser／representation success 和 downstream answer／citation outcome。

## 6. Knowledge Cards：bounded concept 的結構化知識層

新增的原始研究 **Knowledge Cards: Structured Knowledge for AI Systems** 提出與 AAP 互補的另一種 representation：不是只描述某個 system 或把文件分段供 retrieval，而是為單一 bounded concept 保存 entities、relationships、reasoning patterns、適用邊界與 claim provenance；作者主張它以 formal domain ontology grounding，並在 domain expert review／sign-off 後才可視為 authoritative。論文也明確說明 schema 是 public draft，initial prototype cards 建於 energy 與 pharmaceutical domains；這些都是來源自述，不是 xdxd 的獨立 benchmark 或人工核對。[^arxiv-knowledge-cards]

作者列出的五項 defining properties 為：[^arxiv-knowledge-cards]

| 來源 property | 對 Agent-facing representation 的含義 | xdxd draft 觀測候選 |
|---|---|---|
| ontology-grounded | entity／relationship 使用 formal ontology term，而非未定義的 free-text label | `ontology_version`、term resolution、schema conformity |
| provenance-linked | claim 能回到 source、standard、record、validator 與 ontology version | `claim_id`、source／span／version lineage |
| boundary-explicit | 把 reasoning 不適用的條件作為一等欄位 | `boundary_condition`、scope、stale／conflict state |
| expert-validated | automated draft 與 expert authoritative sign-off 分開 | `authority_state`、sign-off identity／time、未 sign-off fallback |
| versioned | 新版取代舊版但保留歷史決策依據 | `knowledge_version`、supersedes、decision snapshot |

## 6.1 Schema、reasoning 與安全邊界

論文把 Knowledge Card 表示為 `KC(C,S)=⟨M,C,E,R,P,B,L⟩`：metadata／provenance／lifecycle／validation、concept anchor、typed entity register、relationship topology、reasoning pattern set、boundary condition set，以及 consuming-system link。其 experimental HTML 展示 JSON Schema 2020-12 加 JSON-LD context 的方向，主要欄位包括 `kc:meta`、`kc:concept`、`kc:entities`、`kc:relationships`、`kc:reasoning`、`kc:boundaries` 與 `kc:systemLink`。這是來源 schema proposal；本輪未保存或獨立驗證其 GitHub repository。[^arxiv-knowledge-cards]

來源的 wind-farm worked example 將 reasoning 分成 narrative、structured pattern、formal rule，並在有 calibration data 時才增加 probabilistic layer；`card-invalid` boundary 會撤回 card 對 positive conclusion 的 authority，`requires-human-review` 則要求轉交人工。這些設計把「沒有足夠證據」和「此 card 不適用」分開，但論文未提供 deployment safety validation，不能把它讀成已證明的安全保證。[^arxiv-knowledge-cards]

## 6.2 與 OKF、AAP 及公開搜尋漏斗的關係

論文的 Table 1 將 GraphRAG／property graph、TrustGraph、OKF 與 Knowledge Card 以 formal grounding、supports reasoning、scope declared、expert validation 比較；作者對 OKF 的標註是 `no`、`via LLM only`、`no`、`no`。這是作者針對 Knowledge Card design goals 的 comparative framing，不是 OKF 規格或 xdxd 的獨立評估。[^arxiv-knowledge-cards]

依 OKF v0.2 canonical spec，OKF 有意維持最小、可移植且不預設 domain schema 的 markdown＋YAML content model，並以 `sources`、`generated`、`verified`、`status` 等欄位讓 provenance、trust 與 lifecycle 可被消費者判讀；它不自動要求 ontology、formal inference、scope boundary 或 human sign-off。[^okf-spec] 因此 Knowledge Card 的 ontology／reasoning／boundary／expert-validation 可作為 OKF concept 或 Agent Reader 的外部 structured representation 候選，但不應把兩者合併成單一 trust 或 discoverability 分數。

AAP 的 `𝒟`／`𝒢`／`ℛ` 關注 agent 在 planning 前能否判斷 KG 的 task fitness、schema grounding 與 closure；Knowledge Card 則補上 bounded concept 的 typed entities、reasoning representation、authority boundary 與 versioned validation。兩者可以在同一 paired protocol 中並列，但都不能取代公開 Web 的 `crawled`→`indexed`→`retrieved`→`used_in_answer`→`citation_entails`→`cited`→`shown`→`clicked` 漏斗。[^arxiv-knowledge-cards]

## 6.3 對 xdxd 的研究翻譯

本來源可把下列 treatment／outcome 加入 Agent Reader 的 draft protocol：

1. 固定同一 `source_snapshot_hash` 與 bounded task，配對 raw document、OKF concept、Knowledge Card-like structured record 與 prose rewrite。
2. 將 `ontology_grounded`、`provenance_complete`、`boundary_checked`、`version_resolved`、`authority_state` 與 `system_link_resolved` 作為 representation／governance outcomes；不可用作者的 expert-validation design 冒充 xdxd 的 `verified: human:*`。
3. 將 `candidate_exposed`、`retrieved`、`opened`、`structured_parsed`、`reasoned`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 分開保存，並把 card-invalid／human-review escalation 作為 outcome。
4. 另做 missing provenance、invalid boundary、conflicting signal、stale version、no sign-off 與 ontology-term mismatch controls；固定 agent／model、prompt、retrieval configuration、tool budget、evaluator 與 corpus rights。

這些是依來源提出的 research translation，不是來源已證明 structured knowledge、Knowledge Card、OKF 或 AAP 會提升公開 AI Search 的 crawl、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。[^arxiv-knowledge-cards]

## 6.4 FDO、PID 與可機器 traversed 的 KG representation

新增的原始研究 **Automated Construction of FAIR Digital Object Knowledge Graphs from Flat Cultural Heritage Records**，提供與 AAP／Knowledge Cards 互補的 representation-level evidence：它把可重用 entity 的 metadata value 轉成 PID reference，把 terminal leaf 保留為 literal，並以 FDO type、profile、Metadata FDO、CIDOC-CRM typed relations 與可解析的 operation FDO 組成 self-describing graph。這描述的是論文採用的 machine-actionability architecture，不是公開 AI Search 的產品規格。[^arxiv-fdo-knowledge-graph]

論文的四階段 pipeline 依序處理 metadata-slot projection、PID／literal boundary classification、controlled-vocabulary entity resolution 與 FDO graph construction；來源評估使用 637 筆 archaeological records、12,720 個 content-bearing slots，並明確分開 Europeana 既有 URI、pipeline 判定與未 enrichment value 的不同 denominator。摘要的 86% overall link 與 58.5% 未 enrichment value resolution，以及正文 classifier-resolvable denominator 的 89.6% 不可互換。[^arxiv-fdo-knowledge-graph]

這筆來源也補強一項方法限制：在其 corpus 中，entity resolution 將 32 個 components 降至 20 個，但把所有 content values 納入時 byte-identical string matching 可得到 8 個 components，因此 connectivity 不是穩健的 machine-actionability discriminator；更有資訊的是 node 是否 typed、PID-resolvable、可跨語言／surface form 合併並可被 downstream agent traversed。33 個 surface-form merges 的人工檢視為 17 個正確、16 個錯誤，且論文沒有 human-annotated gold；這些是來源指定 archaeology／Europeana／LLM／vocabulary protocol 的 observational evidence，不是 xdxd 重現。[^arxiv-fdo-knowledge-graph]

對 AAP 的 draft translation，可加入 `pid_literal_boundary`、`pid_resolvable`、`fdo_type`、`fdo_profile`、`metadata_fdo`、`operation_pid`、`typed_relation`、`terminal_literal`、`controlled_vocabulary`、`entity_resolution_route`、`surface_form_merge`、`cross_provider_bridge` 與 `resolver_audit`。在自有／明確授權 corpus 上，應配對 raw／OKF／Knowledge Card-like／FDO-like representation，固定 source snapshot、task／ontology、field projection、model、vocabulary endpoint、fallback、schema／ontology version 與 denominator，並把 schema parse、entity resolution、downstream traversal、evidence support、citation entailment 及公開 `crawled`→`indexed`→`retrieved`→`used_in_answer`→`cited`→`shown`→`clicked` funnel 分開觀測。這些候選變項不支持 FDO、PID、ontology 或 graph connectivity 已提高公開 AI Search 的 crawl、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。[^arxiv-fdo-knowledge-graph]

## 6.5 AGENT-O：semantic Agent Card、system boundaries 與 reporting completeness

原始研究 **AGENT-O** 提供與 AAP／Knowledge Cards／FDO representation 互補的 system-level schema：以 OWL 2／RDF ontology 建立 semantic Agent Card，描述 health-oriented AI agent system 的 identity、runtime architecture、model roles、versioned specifications、runtime deployments、workflow、planning／reasoning、memory、tools、execution context、outputs／proposed actions、evaluation、provenance、governance、clinical use 與 assessment records。這是來源對 healthcare agent reporting framework 的描述，不是公開 AI Search 平台規格或 xdxd 已採用的產品 schema。[^arxiv-agent-o]

AGENT-O 將 Agent Card 與被描述的 `AgentSystem` 分開，並保留三組不應混淆的邊界：model component 的 functional role versus model specification versus runtime deployment；model intended use versus system-level clinical use versus manuscript statement；以及 ontology 中的 assessment record versus 建立 assessment 的外部 workflow。來源以六個主要領域組織概念：core runtime／model representation、evaluation、documentation／provenance、governance／safety、clinical context／health-data interoperability，以及 reporting／assessment。[^arxiv-agent-o]

來源的技術驗證包含 ontology inventory、OWL-RL reasoning、三個 SHACL application-profile suites、12 個 SPARQL competency queries 與三個 case；作者報告 evaluated release 有 1,962 個 RDF triples、1,922 個 Protégé axioms、252 個 active classes、198 個 active object properties、51 個 datatype properties、25 個 Turtle files 與 183 個 external mappings。SHACL conformance 限於對應 example graphs，SPARQL pass 也限於預先指定的 bindings，不應解讀成 global ontology completeness 或跨系統 interoperability 已被證明。[^arxiv-agent-o]

來源另用兩份 review-associated literature inventories 加一個預先指定 AgentArena case 建立 279 筆 corpus，並以 runtime／architecture、evaluation、provenance／reproducibility、governance／safety、benchmark-process alignment 五維度評估 publication-level reporting completeness。來源報告 applicable papers 的 incomplete rates 為 runtime／architecture `84.6%`、governance／safety `82.8%`、provenance／reproducibility `78.1%`、evaluation `25.8%` 與 benchmark-process alignment `29.8%`；該 corpus 非獨立 bibliographic-database search，label-blinded GPT-5.1 workflow 亦沒有多位 human reviewers 的 adjudicated reference standard。這些是來源指定 corpus／rubric／model-assisted workflow 的 observational results，不是 agent quality、clinical safety、deployment readiness 或 xdxd 重現。[^arxiv-agent-o]

### 對 AAP／Agent Reader 的 draft translation

AGENT-O 可把 AAP 的 schema／task grounding 觀測補上一個「system report 是否可查詢、可重現、可治理」層，但不應把 reporting completeness 當成 discoverability、quality 或 trust 的單一分數：

- **Representation**：配對 prose、JSON／JSON-LD、OKF concept、AAP-like profile 與 Agent Card-like report，保存 `agent_system_id`、`agent_card_id`、ontology／profile version、schema hash、model role／specification／deployment identity、workflow／tool／clinical-use scope 與 representation parse receipt。
- **Boundary**：明確保存 `intended_use`、`system_clinical_use`、`manuscript_statement`、`assessment_record`、`assessment_workflow`、governance／human-review／fallback scope 與 `not_applicable` reason；不可用「欄位存在」取代內容正確性或安全性。
- **Provenance／reproducibility**：為每項 claim 綁定 source、source span、version、license、execution configuration、artifact、evidence location、assessor identity／time 與 confidence；`verified` 仍須由獨立核對產生，不可由 ontology validation 或模型分數自動升級。
- **Outcome separation**：分開 `schema_parsed`、`entity_boundary_resolved`、`task_grounded`、`provenance_complete`、`governance_scope_declared`、`candidate_exposed`、`retrieved`、`opened`、`used_in_answer`、`claim_supported`、`citation_entails`、`cited`、`shown`、`clicked` 與 application-side `invoked`／`completed`；Agent Card 的 reporting completeness 不替代公開 Web funnel。

這筆來源可與 [AAP 與 KG Agent discoverability](/concepts/agentic-affordance-profile-kg-discoverability.md) 的 `𝒟`／`𝒢`／`ℛ` 並列：AAP 關注 task-relative fitness、schema grounding 與 epistemic closure；AGENT-O 補上 system report 的 runtime、deployment、provenance、governance 與 assessment boundary。兩者仍是 structured representation／planning 的 draft research variables，不支持 semantic Agent Card、OWL／RDF、JSON／JSON-LD 或 reporting completeness 會提高公開 AI Search 的 crawl、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。[^arxiv-agent-o]

## 6.6 SkillFeed：profile-conditioned skill discovery 與 body-level evidence

原始研究 **Beyond Task-Only Matching: Personalized Skill Routing with Counterfactual Evaluation** 把 reusable skill repository 的 routing 另分成 task relevance 與 profile suitability：同一個 task 在 region、language、平台、付款、expertise、預算或 regulatory constraint 改變時，適合的 skill 可能改變。這補充 AAP 的 `𝒟`：Agent 不只要知道有沒有語意相近的 capability，還要在 planning 或 routing 前判斷 capability 是否適合目前使用者與執行條件；這是來源對 skill registry 的問題定義，不是公開 AI Search 的 ranking 規則。[^arxiv-skillfeed]

來源建立 SkillFeed-Bench，從 public sources 彙整、去重與格式正規化 228,432 個 skills，評估 329 個 queries；其中 162 個是 profile-sensitive、77 個是 profile-counterfactual augmentation，另有 167 個 profile-insensitive queries。原始與 counterfactual pair 固定 task、改變 profile，只有 reference skill 同時改變時才保留；來源描述每筆保留案例由至少兩位具 agent、software-tool 或 programming 評估經驗的 annotators 檢視，分歧由 expert reviewer 仲裁。這些是論文 annotation protocol 的 observational evidence，不等同本 KB 的人工 `verified`。[^arxiv-skillfeed]

SkillFeed 是兩階段 retrieve-and-rerank：先以 task alignment 維持 broad candidate recall，再以 profile-conditioned supervision 做細粒度 discrimination；skill body 依 Markdown section 切成 chunks，保留 section path 與 content，把支援平台、輸入、格式、例外與 dependencies 變成可定位的 body-level evidence。profile dense、task dense 與 BM25 的 ranked lists 以 weighted reciprocal rank fusion 組合，再由 reranker 判斷 task、profile 與完整 skill 的相容性。這可作為 `𝒟` 的 candidate-to-affordance representation 候選，但 body chunk 可取回不等於已被 Agent 使用、已通過 capability execution 或已進入公開搜尋結果。[^arxiv-skillfeed]

來源在其 SkillFeed-Bench、model、candidate-pool protocol 下報告完整 SkillFeed Hit@1 `0.751`、MRR@20 `0.803`，相對 pretrained routing baseline 的 top-1 差異為 `23.1` 個百分點；profile-counterfactual subset 的正文比較另報告 profile-conditioned reranking `0.026`→`0.377`（`35.1` 個百分點），而 Phase 2 retriever 是 `0.052`→`0.286` 的不同 stage comparison。這些是來源指定 benchmark 的作者結果，不是 xdxd 重現或公開 GEO uplift。[^arxiv-skillfeed]

### 對 AAP 與 Agent Reader 的 draft translation

SkillFeed 可把 AAP 的 metadata、task fitness gate 延伸成 profile-aware routing 觀測，但不應把 routing score 當成 discoverability 或 trust 的單一分數：

- **Candidate 與 profile**：保存 `skill_repository_snapshot_hash`、`skill_id`、`skill_name`、`profile_hash`、`task_hash`、`profile_constraint`、`candidate_exposed`、`retrieved`、`retrieval_rank` 與 `candidate_pool_hash`。
- **Body-level evidence**：保存 `section_path`、`body_chunk_hash`、`profile_constraint_span`、`profile_conflict_detected`、`body_chunk_opened`、`evidence_verifier_version` 與 `reranker_input_hash`；不要只保存 skill description 或模型改寫後摘要。
- **Routing outcome**：分開 `task_aligned`、`profile_compatible`、`reranked`、`selected`、`invocation_started`、`postcondition_verified`、`used_in_answer`、`claim_supported`、`citation_entails`、`shown` 與 `clicked`。
- **Counterfactual control**：固定 `task_id`，只變更 profile，保存 `counterfactual_profile_hash`、reference-skill annotation version、hard-negative set、human-review、expert-arbitration metadata 與 ambiguity exclusion；不能以 task-only Hit@1 推回 profile-sensitive suitability。

最小 paired protocol 是在自有或明確授權的 skill 或 capability corpus 上，固定 task、source snapshot、candidate pool、model、prompt、tool schema、profile parser、seed 與總 budget，比較 task-only、profile-conditioned、body-chunk retrieval 與 full profile-aware reranking；另以 profile-insensitive、profile-sensitive、profile-conflicting hard negative 與 task-preserving counterfactual 分層。結果需分開估計 candidate recall、profile compatibility、body evidence exactness、selection、callability、postcondition verification、answer claim support、citation entailment，以及公開 Web 的 `crawled`→`indexed`→`retrieved`→`used`→`cited`→`shown`→`clicked` funnel。[^arxiv-skillfeed]

SkillFeed 的 skill repository 與 Agent-facing capability routing 可與 AAP 的 `𝒟`、AGENT-O 的 system-report boundary 及 [Agent capability discoverability 與 retrieve-then-rank 觀測方法](/methods/agent-capability-discovery-and-retrieval-observation.md) 並列；三者都不能證明 structured skill body、profile metadata 或 routing improvement 會提高 Google、Bing、OpenAI、Perplexity 或其他公開 AI Search 的 crawl、index、ranking、retrieval、citation、source presentation、referral、click 或 GEO uplift。[^arxiv-skillfeed]

## 6.7 MCP protocol discovery 與 structured capability representation

Model Context Protocol 2026-07-28 官方規範提供另一種 Agent-facing structured representation：MCP 是連接 LLM application 與外部 data／tools 的開放協定，使用 JSON-RPC 2.0，並以 per-request metadata、capability 宣告與可解析 schema 描述 protocol surface。這是規範與 schema 的描述，不是 xdxd 已部署的 MCP server 或公開 AI Search 產品規格。[^mcp-specification-2026-07-28]

規範把 tools 的 user interaction model 定位為 **model-controlled**：language model 可依上下文與 prompt 自動 discover／invoke tools；server 必須宣告 `tools` capability，client 透過 `tools/list` 發現工具，且該 operation 支援 pagination／caching。每個 tool 的 `inputSchema` 必須是有效 JSON Schema object，`outputSchema` 可選；若有 `structuredContent`，server 必須提供符合 output schema 的 structured result，client 應驗證。這些欄位可補充 AAP 的 metadata-only fitness 與 schema-grounding 觀測，但 schema presence 不等於 tool 被選取、被呼叫或 postcondition 成功。[^mcp-specification-2026-07-28]

Resources 的 user interaction model 則是 **application-driven**：server 以 URI 暴露 context／data，host application 決定使用者選取、搜尋／篩選或 heuristic／model-based context inclusion；`resources/list` 與 resource templates 支援 pagination／caching。`server/discover` 必須提供 protocol versions、capabilities 與 identity discovery，response 可包含自然語言 `instructions`；modern revision 以每 request `_meta` 與 HTTP `MCP-Protocol-Version` 協商，遇到不支援版本時由 client 選擇 mutually supported version。這使 protocol-level discovery、schema readability、resource identity 與 version compatibility 成為可分開記錄的 representation outcomes。[^mcp-specification-2026-07-28]

### 對 AAP 與 Agent Reader 的 draft translation

MCP 可把下列變項加入 Agent Reader／capability registry 的 draft schema：`protocol_version`、`server_discover_response`、`server_identity`、`capability_metadata`、`tool_list_cursor`、`tool_list_ttl`、`tool_order_hash`、`resource_uri`、`resource_list_cursor`、`input_schema_hash`、`output_schema_hash`、`structured_content_valid`、`client_schema_validated`、`tools_list_changed` 與 `unsupported_version_retry`。paired run 應固定 server snapshot、client／model、request metadata、tool／resource catalog、cursor／TTL、schema version、authorization context 與總 budget，並分開估計 discovery、schema parse、candidate selection、invocation、postcondition、evidence／claim support 與 application outcome。

這個 protocol surface 必須和公開 Web 的 `crawled`→`indexed`→`retrieved`→`used_in_answer`→`citation_entails`→`cited`→`shown`→`clicked` 漏斗分開。MCP 規範沒有提供 Google、Bing、OpenAI、Perplexity 或其他公開 AI Search 的 crawler、index、ranking、retrieval、citation、referral、click 或 GEO uplift evidence；因此不能把 MCP server 可 discover、tool schema 可 parse 或 structured result 可 validate 寫成公開搜尋可見性改善。[^mcp-specification-2026-07-28]

## 7. 證據邊界

- 本頁是來源 framework 的 draft 整理，未加入人工 `verified`；來源的 AAP、四維度、公式、OWA／CWA／SHACL 說明與 worked example 都不是 xdxd 的實驗結果。
- 本頁不支持 AAP 或 structured KG metadata 已成為 W3C、MCP、Google、Bing、OpenAI、Perplexity 或其他搜尋平台的正式標準／產品 schema。
- 本頁不支持 metadata-only discoverability、schema grounding 或 planner verdict 會提高公開 AI Search 的 crawler、index、ranking、retrieval、citation、source presentation、click 或 GEO uplift。
- 本頁不把來源的 scholarly-search 假想 KG 案例，或其 five-point research agenda，當成公開 Web 的跨引擎 causal evidence；若要驗證，必須在自有／明確授權 corpus 建立可重播 paired experiment。
- 不修改 xdxd 正式產品資料；AAP 的 canonical raw provenance、HTTP metadata、權利與 body SHA-256 見 [AAP raw capture](/raw/arxiv-discoverable-agent-knowledge-2026-08-27.md)；Knowledge Card 的同類保存資料見 [Knowledge Cards raw capture](/raw/arxiv-knowledge-cards-2026-08-29.md)；FDO graph 的同類保存資料見 [FDO knowledge graph raw capture](/raw/arxiv-fdo-knowledge-graph-2026-08-30.md)；AGENT-O 的同類保存資料見 [AGENT-O raw capture](/raw/arxiv-agent-o-2026-08-31.md)。
- MCP 規範的不可變 payload、HTTP metadata、版本化 commit、schema 與權利邊界見 [MCP Specification raw capture](/raw/mcp-specification-2026-09-01.md)；這是 official standard evidence，不是 xdxd live implementation conformance 或公開 AI Search outcome。

[^mcp-specification-2026-07-28]: Model Context Protocol project, “Specification 2026-07-28,” canonical page <https://modelcontextprotocol.io/specification/2026-07-28>, pinned repository snapshot <https://github.com/modelcontextprotocol/modelcontextprotocol/tree/3ff697dcbea0804f3f397b864cfbbaaa10cba71a>; immutable payloads, HTTP metadata, commit metadata, schema source and license are in [MCP Specification raw capture](/raw/mcp-specification-2026-09-01.md).
[^arxiv-agent-o]: Pengze Li and Cui Tao, “AGENT-O: A Semantic Agent Card Framework for Interoperable and Governed Healthcare AI Agents,” arXiv:2608.28345v1, submitted 2026-08-28. Source URL: <https://arxiv.org/abs/2608.28345v1>. Immutable raw capture: [capture metadata](/raw/arxiv-agent-o-2026-08-31/capture-metadata.json), [abstract HTML](/raw/arxiv-agent-o-2026-08-31/abstract.html), [paper PDF](/raw/arxiv-agent-o-2026-08-31/paper.pdf), [Atom API](/raw/arxiv-agent-o-2026-08-31/arxiv-api.xml), and [SHA-256](/raw/arxiv-agent-o-2026-08-31/sha256.txt). The arXiv abstract page links to the perpetual non-exclusive distribution license; experimental HTML returned HTTP 404 in this capture.

[^arxiv-skillfeed]: Tianle Wang, Yanghe Zou, Xiang Liu, Ziyao Huang, Chenchen Fu, and Weiwei Wu, “Beyond Task-Only Matching: Personalized Skill Routing with Counterfactual Evaluation,” arXiv:2608.28241v1, submitted 2026-08-28. Source URL: <https://arxiv.org/abs/2608.28241v1>. Immutable raw capture: [capture metadata](/raw/arxiv-skillfeed-2026-08-31/capture-metadata.json), [abstract HTML](/raw/arxiv-skillfeed-2026-08-31/abstract.html), [experimental HTML](/raw/arxiv-skillfeed-2026-08-31/paper.html), [paper PDF](/raw/arxiv-skillfeed-2026-08-31/paper.pdf), [Atom API](/raw/arxiv-skillfeed-2026-08-31/arxiv-api.xml), [SHA-256](/raw/arxiv-skillfeed-2026-08-31/sha256.txt), and [rights record](/raw/arxiv-skillfeed-2026-08-31/rights.txt). The article-rights link on the arXiv abstract page points to the arXiv perpetual non-exclusive distribution license.

[^arxiv-discoverable-agent-knowledge]: Terry R. Payne, Valentina Tamma, and Enrico Daga, “Discoverable Agent Knowledge — A Formal Framework for Agentic KG Affordances (Extended Version),” arXiv:2605.19186v2, submitted 2026-05-18 and revised 2026-05-25. Source URL: <https://arxiv.org/abs/2605.19186v2>. Immutable raw capture: [metadata](/raw/arxiv-discoverable-agent-knowledge-2026-08-27.md), [abstract HTML](/raw/arxiv-discoverable-agent-knowledge-2026-08-27/abstract.html), [paper HTML](/raw/arxiv-discoverable-agent-knowledge-2026-08-27/paper.html), and [paper PDF](/raw/arxiv-discoverable-agent-knowledge-2026-08-27/paper.pdf).

[^arxiv-knowledge-cards]: Liliana Ferreira, “Knowledge Cards: Structured Knowledge for AI Systems,” arXiv:2608.26176v1, submitted 2026-07-31. Source URL: <https://arxiv.org/abs/2608.26176v1>. Immutable raw capture: [metadata](/raw/arxiv-knowledge-cards-2026-08-29/capture-metadata.json), [abstract HTML](/raw/arxiv-knowledge-cards-2026-08-29/abstract.html), [paper HTML](/raw/arxiv-knowledge-cards-2026-08-29/paper.html), [paper PDF](/raw/arxiv-knowledge-cards-2026-08-29/paper.pdf), [Atom API](/raw/arxiv-knowledge-cards-2026-08-29/arxiv-api.xml), and [SHA-256](/raw/arxiv-knowledge-cards-2026-08-29/sha256.txt).

[^arxiv-fdo-knowledge-graph]: Zeyd Boukhers, Lingxiao Kong, Xenophon Zabulis, and Georgios Toubekis, “Automated Construction of FAIR Digital Object Knowledge Graphs from Flat Cultural Heritage Records,” arXiv:2608.23263v1, submitted 2026-08-24; DOI: <https://doi.org/10.1145/3799682.3840068>. Source URL: <https://arxiv.org/abs/2608.23263v1>. Immutable raw capture: [metadata](/raw/arxiv-fdo-knowledge-graph-2026-08-30/capture-metadata.json), [abstract HTML](/raw/arxiv-fdo-knowledge-graph-2026-08-30/abstract.html), [paper HTML](/raw/arxiv-fdo-knowledge-graph-2026-08-30/paper.html), [paper PDF](/raw/arxiv-fdo-knowledge-graph-2026-08-30/paper.pdf), [Atom API](/raw/arxiv-fdo-knowledge-graph-2026-08-30/arxiv-api.xml), and [SHA-256](/raw/arxiv-fdo-knowledge-graph-2026-08-30/sha256.txt).
