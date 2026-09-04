---
type: Standards Concept
title: W3C Profiles Vocabulary（PROF）與結構化規範描述
description: W3C Dataset Exchange Working Group 的 Profiles Vocabulary 草案，提供以 RDF 描述規範 profile、組成資源、角色與數位 artifact 的機器可讀術語。
resource: https://www.w3.org/TR/2026/WD-dx-prof-1.0-20260820/
tags:
  - structured-content
  - rdf
  - profiles
  - schemas
  - validation
  - agent-discoverability
  - standards
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-25T13:57:07Z
sources:
  - id: w3c-dx-prof-fpwd
    resource: /raw/w3c-profiles-vocabulary-2026-08-25.md
    title: W3C The Profiles Vocabulary 第一公開工作草案（2026-08-25 raw capture）
    author: w3c/dxwg
    last_modified: 2026-08-17
---

# Overview

W3C Profiles Vocabulary（PROF）是 Dataset Exchange Working Group 發布的 First Public Working Draft。它以 RDF 提供一組標準化、結構化、可供人與機器讀取的術語，用來描述 information resource 的 specification profiles。文件同時明確指出這是 work in progress，不代表 W3C 或其會員背書；本頁因此保持 `status: draft`，尚未經人工驗證。[^w3c-dx-prof-fpwd]

## 來源直接支持的結構

- **Profile 與 profile hierarchy**：PROF 可描述 profile，以及 profile 之間的階層或被 profile 的規範關係。[^w3c-dx-prof-fpwd]
- **多資源組成**：一個 profile 可以由 guidelines、validation tools、schemas、term lists 與其他資源組成；來源也描述了用 formats、roles 與 digital artifacts 表達這些 profile resources 的方向。[^w3c-dx-prof-fpwd]
- **RDF 表達**：PROF namespace 是 `http://www.w3.org/ns/dx/prof/`；規範提供 OWL 定義與 RDF Turtle 表達的 vocabulary。[^w3c-dx-prof-fpwd]
- **互通性目標**：規範的 introduction 將 profile 描述為在較一般規範之上加入 constraints、extensions 或 combinations，以服務特定社群的互通性；這是規範對 profile 的定位，不是對 AI 搜尋結果的效果宣稱。[^w3c-dx-prof-fpwd]

## xdxd GEO 研究用途

本來源可作為**結構化內容與資源關係表示的候選標準**：在授權且可公開研究的資源上，研究頁面是否能以機器可讀 metadata 明確連結規範、schema、validator、term list、格式與 artifact，並把這些 representation 變項與 Agent Reader 的解析成功率、claim completeness、citation entailment 或來源定位分開觀測。這是 xdxd 的研究假說與資料建模方向，不是 W3C 對 AI agent、搜尋引擎或 crawler 行為的承諾。

與 [Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md) 一起使用時，應維持「結構化表示」與「搜尋／AI 效果」的證據分層：Google 的生成式搜尋文件並不要求專用 AI schema，而 PROF 草案也沒有聲稱會提高 AI Search appearance、retrieval 或 citation。[^w3c-dx-prof-fpwd]

## 研究控制與下一步

若後續進入實驗，應至少分開保存：

1. profile／schema／validator／artifact 的關係圖與版本。
2. 以 PROF 表示的資源頁與沒有該表示的對照頁。
3. 指定 Agent、入口、prompt、時間、retrieved sources、引用與回答原文。
4. crawl／index／retrieval／citation／click 各層結果，不把任一層當成另一層的代理指標。

在來源仍是 First Public Working Draft 的期間，不應把 PROF vocabulary 當作已穩定的產品依賴或跨引擎標準；正式採用前需重新核對最新版本、實作支援、授權與實驗結果。[^w3c-dx-prof-fpwd]

## Evidence boundary

本頁只從單一 W3C 官方草案整理可定位的標準描述，沒有人工驗證，也沒有實測 AI crawler、搜尋排名、retrieval、citation 或 agent discoverability。不得從「機器可讀」推導「必然被發現」、「必然被引用」或「必然提升 GEO」。原始證據見 [W3C Profiles Vocabulary raw capture](/raw/w3c-profiles-vocabulary-2026-08-25.md)，不可變 body 見 [HTML snapshot](/raw/w3c-profiles-vocabulary-2026-08-25/snapshot.html)。研究流程遵循 [GEO 證據生命週期](/methods/evidence-lifecycle.md)。

[^w3c-dx-prof-fpwd]: W3C Dataset Exchange Working Group, “The Profiles Vocabulary,” First Public Working Draft, 2026-08-20. Source URL: <https://www.w3.org/TR/2026/WD-dx-prof-1.0-20260820/>. Immutable raw capture: [metadata](/raw/w3c-profiles-vocabulary-2026-08-25.md) and [HTML snapshot](/raw/w3c-profiles-vocabulary-2026-08-25/snapshot.html).
