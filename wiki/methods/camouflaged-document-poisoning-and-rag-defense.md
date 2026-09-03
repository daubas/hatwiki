---
type: Research Method
title: CamoDocs 偽裝文件 poisoning、retrieval defense 與 GEO evidence boundary
description: 從 CamoDocs 原始研究整理 query-independent document poisoning、embedding dispersion、defense utility trade-off 與公開 AI Search funnel 分層的 draft 方法。
tags:
  - generative-search
  - geo
  - poisoning
  - retrieval
  - citation
  - robustness
  - security
  - evidence-boundary
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-09-03T02:33:06.653877000Z
sources:
  - id: arxiv-camodocs
    resource: /raw/arxiv-camodocs-2026-08-31.md
    title: "arXiv《CamoDocs: A Poisoning Attack Against Retrieval-Augmented Language Models Using Camouflaged Documents》原始研究（2026-08-31 raw capture）"
    author: human:jaewon-jung-et-al
    last_modified: 2026-08-28
  - id: arxiv-vertox
    resource: /raw/arxiv-vertox-2026-09-02.md
    title: "arXiv《VerTox: Verifiable Reward-Guided Corpus Poisoning Against Neural Ranking Models》原始研究（2026-09-02 raw capture）"
    author: human:zhiqi-huang-et-al
    last_modified: 2026-09-01
  - id: arxiv-counter-geo-bench
    resource: /raw/arxiv-counter-geo-bench-2026-09-03.md
    title: "arXiv《Counter-GEO-Bench: Evaluating Defenses Against Information-Distorting Generative Engine Optimization》原始研究（2026-09-03 raw capture）"
    author: human:bing-zheng-zongyao-zhao-wenming-yang
    last_modified: 2026-09-02
---

# 方法定位

CamoDocs、VerTox 與 Counter-GEO-Bench 都是與 GEO 研究直接相關、但不等同公開 AI Search 成效的原始研究：CamoDocs 把 RAG knowledge-base poisoning 的問題從「文件是否包含 query」推進到「惡意文件能否在不留下明顯 query-overlap 或 compact-cluster artifact 的情況下被檢索並影響答案」；VerTox 則把排名 exposure 與 factual corruption 綁進可驗證獎勵，測試 rank-aware 的 corpus poisoning；Counter-GEO-Bench 再以 paired information-preserving／information-distorting GEO rewrites 與 defense insertion points，測量流暢但錯誤的內容如何穿過受控 retrieval-to-synthesis harness。[^arxiv-camodocs][^arxiv-vertox][^arxiv-counter-geo-bench] 本頁只把來源中的 threat model、控制變項與 evidence boundary 轉成 xdxd 可重現的 draft protocol；來源未經 xdxd 獨立重跑，沒有新增 `verified`。

## 1. Source-defined threat model

來源假設攻擊者能將 poisoned documents 注入 RAG knowledge base，並把 public、user-editable 或 web-scraped source 視為較可能出現此 admission risk 的環境。這是來源的 threat-model rationale，不是對任何公開網站、搜尋引擎或 xdxd 系統已發生入侵的證明。[^arxiv-camodocs]

對 GEO／AI Search 研究，至少要把以下階段分開保存：

- `candidate_created`：內容或頁面被產生，含 strategy、source identity 與 body hash。
- `admission_attempted`／`admitted`：內容是否進入受測 corpus、feed 或 index；不能以後續 retrieval 反推 admission。
- `candidate_exposed`／`retrieved`：候選是否進入查詢可見集合、retrieval result 或 top-k。
- `defense_passed`／`defense_removed`：防禦是否保留、移除或重排該 evidence。
- `used_in_answer`／`target_answer`：模型是否實際使用 evidence，及輸出是否接近預先定義的 target incorrect answer。
- `citation_present`／`citation_entails`／`shown`／`clicked`：回答引用、主張支持、介面呈現與使用者 click 必須另列，不能把 ASR 代替 citation 或 GEO visibility。

這個分層銜接 [GEO 內容偵測與 citation URL audit](/methods/geo-content-detection-and-citation-audit.md) 的 frozen clean／polluted bundle 與 source-tier／claim-support 分離，也銜接 [生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md) 的 retrieval、evidence utilization、citation entailment 分層。[^arxiv-camodocs]

## 2. Source protocols: CamoDocs 與 VerTox

論文描述的 CamoDocs 先由 synthesizer 產生 benign 與 adversarial drafts，再透過 chunking、選定 token replacement 與 dispersion loss 將 adversarial-document embeddings 分散，並以 coherence filter 控制可讀性劣化。相較 query-inclusion baseline，這個設計要測量的是「檢索強度、embedding camouflage 與 readability 之間的 trade-off」，而不是單純把 query 文字塞進文件。這些是來源的 method description；本頁不提供可直接部署的攻擊程式或參數。[^arxiv-camodocs]

xdxd 若在自有或明確授權 corpus 做安全研究，應保存 clean／poisoned pair 的：

- corpus snapshot、document／chunk ID、source identity、body hash、生成策略與 disclosure／authorization boundary；
- query、正確答案、target incorrect answer、retriever、embedding／reranker、index build、top-k 與 defense configuration；
- injection count／poisoning ratio、candidate rank、document removal／retention、answer snapshot／hash、judge prompt／version、human-label protocol；
- representation quality（readability、semantic similarity、query overlap、embedding dispersion）與所有失敗／拒答／解析缺失原因。

每個 intervention 都應保留原始 clean snapshot，不覆寫來源或把 local rewrite 稱為 live web poisoning。

VerTox 提供另一種 rank-aware 對照：generator 以 local dense retriever proxy 的 ranking-distortion reward、NLI-based factual-corruption reward 與 query-repetition penalty 共同訓練，另加 length regularizer；其設計目標是提高 retrieval exposure、維持 topical relevance，同時改變 query-relevant facts。這些是來源的 controlled attack protocol，不是 xdxd 可直接部署的攻擊 recipe。[^arxiv-vertox]

## 3. VerTox source-reported evaluation observations

VerTox 從 3,000 個 MS MARCO query–passage pairs 做 LoRA／GRPO 訓練，使用 Qwen3-0.6B、Llama 3.2-1B-Instruct 與 Gemma 2-2B-it；SimLM-base 是 white-box proxy，BGE-base、Cohere、SPLADE、RepLLaMA 與 RankLLaMA 是 black-box targets。評測涵蓋 TREC DL 2019／2020 與六個 BEIR benchmark，並以 ASR、Top@1／Top@10、perplexity、Dale–Chall readability 與 downstream RAG answer accuracy 分層。[^arxiv-vertox]

來源 white-box table 的 VerTox generator rows 約為 ASR `0.98–1.00`、Top@1 `0.69–0.84`；black-box table 顯示其可轉移到 dense、learned-sparse、cross-encoder 與 commercial embedding targets。這些是來源指定 benchmark、ranker、proxy、candidate corpus 與 run protocol 的 observational evidence，不是 xdxd replication，也不能外推為公開 AI Search ranking 或 GEO uplift。[^arxiv-vertox]

在 100 個 FlashRAG queries 的 downstream simulation 中，來源用 Wikipedia dump、BGE-base、`k∈{1,3,5,7,10}` contexts、Qwen3-8B／GPT-OSS-20B 與 GPT-5 judge；原始 contexts 的 accuracy 可達 `0.70`，poisoned contexts 在各 `k` 近 `0.30`。這是來源指定 closed simulation 與 LLM judge 的結果，不是 live citation、source presentation、referral 或 click evidence。[^arxiv-vertox]

## 4. CamoDocs source-reported evaluation observations

來源在 HotpotQA、Natural Questions 與 MS-MARCO 上，使用每個 dataset 1,000 個隨機且不重疊的 target queries，對每個 query 注入 `β=10` 個 adversarial documents，並比較七種 defenses、三個 open-weight victim LLM 與兩個 proprietary victim LLM。來源以 `gpt-4.1-mini` 作為 LLM judge，結果是每個 dataset 10 trials 的 protocol-bound observation。[^arxiv-camodocs]

在來源設定下，query-inclusion attacks 對 query detection 的 ASR 低於 12%；CamoDocs 在 GPT-5.4-mini 與 Claude-Haiku-4.5 的平均 ASR 分別為 61.80% 與 55.09%。跨 victim retriever 的 transfer test 報告平均 ASR 60.81%、51.24% 與 41.04%。這些數字只屬論文的 dataset、retriever、model、prompt、judge、injection budget 與 runtime，不是 xdxd replication，也不能外推到公開搜尋排名或 citation selection。[^arxiv-camodocs]

來源以 NeoQA 的 fictionalized content 觀察 retrieval-dependent utility：TrustRAG 在無攻擊條件移除 91.48% retrieved documents，clean accuracy 從 29.13% 降到 5.79%；在 HotpotQA 移除 12.78%，clean accuracy 從 49.10% 降到 43.70%。在 CamoDocs attack 下，TrustRAG 仍留下 NeoQA 23.25%、HotpotQA 29.10% 的 ASR。此結果適合轉成「robustness 與 evidence utility 的 paired outcome」，不能被寫成某個公開 AI Search defense 已失效。[^arxiv-camodocs]

論文另以三位 annotators 對 100 個 HotpotQA test queries 做 majority-vote check，報告 LLM judge 與人類 ASR labels 平均 agreement 93.29%、平均 Phi correlation 0.84。這是來源自身 judge validation，不是 xdxd 的人工驗證；因此本頁仍保持 `draft`。[^arxiv-camodocs]

### 4.1 Counter-GEO-Bench：paired GEO misinformation 與 defense-stage protocol

Counter-GEO-Bench 將攻擊單位明確放在「資訊扭曲但表面自然的 GEO 文件」：從 GEO-Bench test split 的 1,000 個 query／source pairs，以五個 cleaned HTML sources、Claude Sonnet 4.6 rewriter、information-preserving（IP）／information-distorting（ID）paired rewrite 與四項 quality sub-score 建立 gate；`Q≥0.65` 的 250 組再經來源人工檢查移除三組，得到 `N=247`。這個 paired construction 可把 legitimate publisher optimization 與 targeted false claim 的差異分開，但仍只是來源的 benchmark corpus，不是公開搜尋的實際 admission 或 ranking log。[^arxiv-counter-geo-bench]

來源 harness 使用 512-token／128-token overlap chunk、BM25＋BGE-large-en-v1.5 的 `0.3/0.7` hybrid retrieval、最多 50 candidates、BGE cross-encoder rerank 至 top-12，並由 vLLM-served victim LLM 在 temperature zero 生成 citation-mandatory answer。Granite Guardian、Llama Guard 3、C-GEO Guard 在 retrieved chunks 上作 filter；NeMo Self-Check Fact-Checking 在 answer 生成後作 output rail。研究因此把 `defense_stage`、`chunk_blocked`、`answer_refused`、`asr`、`fpr`、`answer_accuracy` 與獨立的 `answer_quality` 分開保存，不能以低 ASR 或 refusal 單獨宣稱防禦有效。[^arxiv-counter-geo-bench]

在來源指定 protocol 中，undefended ID condition 的平均 ASR 為 `55.7%`；Granite Guardian 降低 1.7 個百分點（paired-bootstrap `p=0.096`），Llama Guard 3 降低 3.2 個百分點，而 NeMo 的 Llama-4 cell 有 `98.4%` clean block/refusal artifact。C-GEO Guard 報告平均 ASR 相對降低 `47.6%`（26.5 個百分點）、answer quality `4.48` 對 `4.49`；以 GPT 5.5 rewriter／Qwen-3.5 victim 的 cross-rewriter arm 報告 `60.4%` relative reduction，但 IP accuracy 由 `86.8%` 變為 `82.6%`。這些數字都是來源指定 model、rewriter、judge、quality gate、retriever 與 controlled harness 的 observational evidence，不是 xdxd reproduction 或 commercial-product result。[^arxiv-counter-geo-bench]

若在自有或明確授權 corpus 做防禦研究，應新增 `ip_id_condition`、`rewrite_class`、`quality_gate_score`、`quality_gate_passed`、`human_verification_scope`、`defense_stage`、`block_rate`、`answer_quality`、`judge_model`、`human_agreement`、`rewriter_identity` 與 `template_version`；並以同一 query／source／snapshot 配對 clean、IP、ID、detector control、cross-rewriter 與 open-set holdout。`product_level_claim_allowed` 預設為 `false`，除非另有公開或獲授權的 crawler、admission、retrieval、answer、citation 與 downstream outcome receipts。[^arxiv-counter-geo-bench]

## 5. xdxd 可重現的安全研究設計

1. **Admission control**：先建立明確授權的 frozen corpus 與 admission gate；以 `admission_attempted`、`admitted`、`rejected_reason`、ingestion timestamp 與 index-build hash 證明是否進入受測環境。
2. **Paired interventions**：同一 query／answer／corpus 固定 retriever、LLM、prompt、top-k、seed／replication、judge 與 budget，只比較 clean、query-inclusion、query-independent camouflage、benign AI-polish 與其他 pre-registered controls。
3. **Retrieval trace**：保存每個候選的 pre-defense rank、score、embedding／document hash、post-defense rank、removed／retained verdict 與 context position；不能只報最終 ASR。
4. **Answer and citation trace**：把 `used_in_answer`、target-answer match、answer correctness、citation present、citation URL identity、claim-level entailment、source shown 與 click／referral 分開。若沒有公開 UI 或 server logs，對應欄位必須標為 unavailable／unresolved。
5. **Utility guardrail**：在 retrieval-dependent 與可能依賴 parametric memory 的 benchmark 分開估計 clean accuracy、evidence recall、answer correctness、latency、cost、removed-evidence fraction 與 abstention；防禦的 ASR 降低不能單獨算成功。
6. **Human and judge audit**：預先固定 judge rubric、抽樣框、annotator 數量、majority rule、agreement、Phi／其他 agreement measure 與 disagreements；不可把 LLM judge 結果描述成人工 sign-off。
7. **Safety and rights**：對自有／明確授權資料做 attack simulation，限制輸出與測試環境的外部 effect；只保存必要的 research artifact，外部模型、資料集、API 與 code repository 的授權另行核對。

## 6. 證據邊界與待查證事項

- CamoDocs 是 arXiv v1、已標示 accepted to EMNLP 2026 的原始研究；所有來源數字仍是作者指定 protocol 的 `observational` evidence，不是 xdxd 重現。[^arxiv-camodocs]
- 來源沒有公開 AI Search crawler request、index admission log、live ranking、cross-engine retrieval、answer citation presentation、referral 或 click evidence；因此不能由 CamoDocs ASR 推出公開 GEO prevalence、網站可見度、citation uplift 或流量效果。
- CamoDocs 的 transfer、query-independent camouflage 與 TrustRAG utility trade-off 尚待在明確授權 corpus、固定 snapshot、可 replay index、公開 code／data 與一致 judge／human protocol 下由 xdxd 重現；其外部 artifact 與 API 仍受各自條款限制。[^arxiv-camodocs]
- 若未能取得原始 admission／retrieval receipt，`crawled`、`indexed`、`retrieved`、`used_in_answer`、`cited`、`shown`、`clicked` 之間的缺口必須保持 `unresolved`，不能用新下載的頁面或單次答案冒充既有事件。

本頁應與 [GEO 內容偵測與 citation URL audit](/methods/geo-content-detection-and-citation-audit.md)、[生成式搜尋的證據利用與上下文預算配置](/methods/generative-search-evidence-utilization.md)、[AI assistant retrieval 與 robots.txt compliance 觀測方法](/methods/ai-assistant-robots-access-and-retrieval-audit.md) 一起讀取；它們共同維持 poisoning、retrieval、citation、source presentation 與 downstream outcome 的邊界。

[^arxiv-camodocs]: Jaewon Jung, Haizhong Zheng, Hongsun Jang, Jaeyong Song, Beidi Chen, and Jinho Lee, “CamoDocs: A Poisoning Attack Against Retrieval-Augmented Language Models Using Camouflaged Documents,” arXiv:2608.28389v1, submitted 2026-08-28, accepted to EMNLP 2026. Source URL: <https://arxiv.org/abs/2608.28389>. Immutable raw capture: [metadata](/raw/arxiv-camodocs-2026-08-31/capture-metadata.json), [abstract HTML](/raw/arxiv-camodocs-2026-08-31/abstract.html), [experimental HTML](/raw/arxiv-camodocs-2026-08-31/paper.html), [paper PDF](/raw/arxiv-camodocs-2026-08-31/paper.pdf), and [Atom API](/raw/arxiv-camodocs-2026-08-31/arxiv-api.xml).

[^arxiv-vertox]: Zhiqi Huang, Vivek Datla, Zhichao Xu, Puxuan Yu, Vivek Srikumar, and Alfy Samuel, “VerTox: Verifiable Reward-Guided Corpus Poisoning Against Neural Ranking Models,” arXiv:2609.01325v1, submitted 2026-09-01. Source URL: <https://arxiv.org/abs/2609.01325v1>. Immutable raw capture: [metadata](/raw/arxiv-vertox-2026-09-02/capture-metadata.json), [abstract HTML](/raw/arxiv-vertox-2026-09-02/abstract.html), [experimental HTML](/raw/arxiv-vertox-2026-09-02/paper.html), [paper PDF](/raw/arxiv-vertox-2026-09-02/paper.pdf), and [Atom API](/raw/arxiv-vertox-2026-09-02/arxiv-api.xml).

[^arxiv-counter-geo-bench]: Bing Zheng, Zongyao Zhao, and Wenming Yang, “Counter-GEO-Bench: Evaluating Defenses Against Information-Distorting Generative Engine Optimization,” arXiv:2609.02316v1, submitted 2026-09-02, accepted to EMNLP 2026 Main Conference. Source URL: <https://arxiv.org/abs/2609.02316v1>. Immutable raw capture: [metadata](/raw/arxiv-counter-geo-bench-2026-09-03/capture-metadata.json), [abstract HTML](/raw/arxiv-counter-geo-bench-2026-09-03/abstract.html), [experimental HTML](/raw/arxiv-counter-geo-bench-2026-09-03/paper.html), [paper PDF](/raw/arxiv-counter-geo-bench-2026-09-03/paper.pdf), and [Atom API](/raw/arxiv-counter-geo-bench-2026-09-03/arxiv-api.xml).
