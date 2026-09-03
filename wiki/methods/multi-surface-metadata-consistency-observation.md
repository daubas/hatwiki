---
type: Research Method
title: 多表面機器可讀 metadata 一致性與 Agent discoverability 觀測方法
description: 將多個自描述 surface 的存在性、欄位一致性、referent identity 與 Agent Reader downstream trace 分層，避免把供給側 metadata coherence 誤當成公開 AI Search 成效。
resource: https://arxiv.org/abs/2608.17159v1
tags:
  - agent-discoverability
  - structured-content
  - metadata
  - provenance
  - citation
  - observation
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-26T17:58:50Z
sources:
  - id: arxiv-2608-17159-v1
    resource: https://arxiv.org/abs/2608.17159v1
    title: "A Multi-Surface Consistency Audit of Software Citation Metadata"
    author: human:pengyin-shan
    last_modified: 2026-08-17
---

# 多表面機器可讀 metadata 一致性與 Agent discoverability 觀測方法

## 研究定位

本方法把「同一個 asset 在不同 self-description surfaces 是否描述同一個 referent、同一組 identity fields 與同一個版本」視為 Agent discoverability 的前置資料品質問題。它受到一篇 supply-side research software audit 啟發：該研究在 117 個 GitHub-hosted project 中只對 metadata surfaces 做 inventory、normalization、pairwise comparison 與 hand adjudication，沒有測量公開 AI Search 的 crawl、index、retrieval 或 citation funnel。[^arxiv-2608-17159-v1]

因此，本頁是 xdxd 的 **draft protocol**：可把來源的可重現 surface audit 移植到已知 URL Agent Reader、structured web content 與 citation/source presentation 研究，但不能把來源數字當成 AI Search 成效，也不能由一致性直接推出排名或點擊因果效果。

相關方法：[跨介面生成式搜尋 citation、source presentation 與 session state 觀測](/methods/chinese-generative-search-cross-interface-observation.md)、[Agent capability discoverability 與 retrieve-then-rank 觀測](/methods/agent-capability-discovery-and-retrieval-observation.md)、[Agent-ready website 與 web agent reliability 觀測](/methods/agent-ready-websites-and-web-agent-reliability.md)。原始證據：[A Multi-Surface Consistency Audit raw capture](/raw/arxiv-multi-surface-citation-metadata-2026-08-27.md)。

## 觀測單位與 surface inventory

最小資料單位是：`asset_id × snapshot_id × surface_id × field_id`。每個 snapshot 應保存：

- `asset_id`：被描述的軟體、網站、文件、服務或 entity；另存 `referent_type`（例如 `software`、`paper`、`package`、`webpage`、`organization`）。
- `surface_id`：一個可獨立被人或 agent 讀取的 representation，例如 canonical HTML、JSON-LD、Markdown/API response、README、registry record、citation file、sitemap/feed 或 agent-facing endpoint。不要只記「網站有 schema」；要記可取得的 URI、content type、HTTP metadata 與實際 bytes。
- `snapshot_id`／`captured_at`：每次抓取的時間、入口、locale、登入狀態、user-agent／agent identity、response status、redirect chain、surface hash 與 parser version。
- `field_id`：title、authors／maintainers、version、publication／release date、canonical identifier／URL、license、object type、relationship（software↔paper）及 domain-specific claim fields。欄位缺失要記 `missing`，不可先填入另一個 surface 的值。

來源研究的可移植重點不是特定檔名，而是「同一 asset 的多個 surface 要可分開抓取、保存與比較」；來源也示範 preferred-citation 可能是同一檔案中的 pseudo-surface，故 intra-document extraction 應保留 lineage，而不是把它和 root record 靜默合併。[^arxiv-2608-17159-v1]

## Capture 與 normalization

1. 先固定 surface registry 與 eligibility rule；記錄 asset 為何被納入，以及「至少兩個可比較 surfaces」的 denominator。不要只留下成功解析的 records。
2. 對每個 response 保存 raw body、HTTP headers、canonical／redirect URI、capture timestamp、content hash 與 parser version；更新以新 snapshot 表示，不覆寫舊 evidence。
3. 以明確 mapping 將各 surface 投影到共同 record shape：`title`、`people`、`version`、`date`、`identifier`、`license`、`referent_type`。保留 `raw_value`、`normalized_value`、`normalization_rule` 與 `source_pointer`。
4. DOI、canonical URL、package name 或 paper title 等 identifier 必須附 `discovery_surface` 與 resolver result；由某 surface 發現的 identifier 不應在同一 pair 被誤當成獨立 corroboration。
5. 建立 `referent_link`：例如 `software -> preferred paper` 是合法關係，但不等於兩個 record 是同一物件。這一步用來區分「一致但指向錯的 referent」與「跨 surface 不一致」。

## Verdict 與 core metrics

對每個 surface pair × field 產生四級 verdict：

- `exact`：normalized values 相同。
- `minor`：同一 referent 的表面差異，例如欄位順序、版本 `v` prefix 或明確可接受的名稱順序差異；每一條 minor rule 要預先註冊。
- `conflict`：兩側都有值且實質不同，或指向不同 referent。
- `missing`：至少一側缺值；不把 missing 當成 agreement，也不把它補值後再計算原始 audit。

建議至少報告：

- `surface_availability`：各 surface 的存在率與 parser success／failure，附 eligible population。
- `comparable_pair_count`：每個 field 的 exact、minor、conflict、missing 分母。
- `field_agreement`：`(exact + minor) / (exact + minor + conflict)`；明確標示只對 comparable pairs 計算。
- `asset_conflict_rate`：在暴露至少兩個可比較 surfaces 的 assets 中，至少一個 core-field conflict 的比例。
- `referent_conflict_rate`：software、paper、package、webpage 等 object identity 混用的比例；與單純 title mismatch 分開。
- `surface_lineage`：同一檔案內 pseudo-surface、registry mirror、DOI record 與 source surface 的 lineage，避免把衍生資料重複計權。

來源研究的 83.9% conflict rate 與 .436 title agreement 顯示為何分子、分母、missingness 與 referent 必須同時報告；它們是該研究的 sample-specific descriptive numbers，不是本方法的預期值。[^arxiv-2608-17159-v1]

## Agent Reader paired protocol（待實作）

供給側 audit 完成後，才能進行 demand-side 對照：

1. 建立 **coherent** 與 **incoherent** 兩個 representation variant；兩者保留相同 asset、內容量、可存取性與發佈時間，只改變跨 surface 的 identity／referent consistency。
2. 固定 task、prompt paraphrase set、入口、locale、登入狀態、模型／agent 版本與 run budget；每個 variant 做重複 run，保存完整 request／response／tool trace。
3. 將 funnel 分層，不用一個「被 AI 看見」欄位取代：`candidate_exposed` → `retrieved` → `opened` → `used_in_answer` → `cited` → `shown` → `clicked`。另外記 `selected_surface`、`selected_referent`、`citation_entails` 與 `claim_supported`。
4. 主要比較先做 representation-level paired delta；若要聲稱因果效果，必須另外處理 crawl／index latency、candidate availability、query fan-out、personalization、answer churn、parser missingness 與 interference。source-side consistency audit 本身不能提供這些證據。
5. 若 agent 讀到 preferred paper 而非 software asset，標記為 referent routing outcome，不直接當作 citation failure；是否符合任務要由 task contract 判定。

## 品質與邊界檢查

- **Temporal**：至少兩個 snapshot window；把 archive staleness、release lag 與現行 surface divergence 分開。
- **Population**：報告 GitHub／registry／domain／language／asset-type strata；不把「有兩個 surfaces」的條件化結果外推到所有 assets。
- **Parser**：對 normalization 與 extraction 做 golden cases、盲抽 hand adjudication、threshold sensitivity；validator precision 是 instrument property，不是 downstream truth。
- **Authority**：指定 authoritative record 或 `unknown`；「所有 surfaces 一致」仍可能只是共同複製 paper、package name 或舊版本。[^arxiv-2608-17159-v1]
- **Evidence**：raw snapshot、HTTP metadata、payload SHA-256、normalized manifest、verdict log 與每個 conflict 的 source pointer 必須可回放。
- **Scope**：本頁不支持公開 AI crawler 是否抓到頁面、不支持搜尋排名、不支持 citation rate／answer position／click uplift，也不支持長期 referral 或 revenue effect；這些需要獨立的跨介面方法與實驗。

## 下一步

1. 在 xdxd 自有或明確授權 corpus 選定 2–3 種 representation（canonical HTML、JSON-LD、Markdown／agent endpoint）與一個有明確 referent 的 asset family。
2. 先完成 surface availability、field normalization、referent map 與 immutable snapshot manifest，再做 coherent／incoherent paired Agent Reader run。
3. 把 surface conflict、retrieved、cited、shown、clicked 分成不同 outcome，並與[證據生命週期](/methods/evidence-lifecycle.md)的 raw→compile→verify 規則對齊。

[^arxiv-2608-17159-v1]: Pengyin Shan, “A Multi-Surface Consistency Audit of Software Citation Metadata,” arXiv:2608.17159v1, submitted 2026-08-17; canonical source <https://arxiv.org/abs/2608.17159v1>. 本 source 的不可變 payload 與 claim boundary 見 [/raw/arxiv-multi-surface-citation-metadata-2026-08-27.md](/raw/arxiv-multi-surface-citation-metadata-2026-08-27.md)。
