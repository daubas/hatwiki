---
type: Research Claim Set
title: 生成式搜尋 crawlable commons 與來源生態永續性
description: 從生成式搜尋理論與 citation-integrity 原始研究整理 crawlable corpus、來源流量、crawler access、citation／referral、內容品質與長期可發現性之間的 draft 研究框架。
tags:
  - generative-search
  - crawler
  - citation
  - source-presentation
  - agent-discoverability
  - sustainability
  - research-design
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-28T08:19:46Z
sources:
  - id: arxiv-corpus-erosion
    resource: /raw/arxiv-corpus-erosion-2026-08-26.md
    title: "arXiv《When Search Eats the Web: A Model of Corpus Erosion under Generative Extraction》原始研究（2026-08-26 raw capture）"
    author: human:sylvain-peyronnet
    last_modified: 2026-08-18
  - id: arxiv-mechanism-design
    resource: /raw/arxiv-mechanism-design-2026-08-26.md
    title: "arXiv《Mechanism Design for Generative Engines: From Exploitation toward Win-Win Outcomes》原始研究（2026-08-26 raw capture）"
    author: human:chen-xu
    last_modified: 2026-08-11
  - id: arxiv-strategic-publishers
    resource: /raw/arxiv-strategic-publishers-generative-ai-2026-08-27.md
    title: "arXiv《Learning Dynamics of Strategic Publishers in Generative AI Ecosystems》原始研究（2026-08-27 raw capture）"
    author: human:sagie-dekel
    last_modified: 2026-07-29
  - id: arxiv-token-level-advertising
    resource: /raw/arxiv-token-level-advertising-2026-08-28.md
    title: "arXiv《Token-Level Advertising》原始研究（2026-08-28 raw capture）"
    author: human:hanbing-liu-et-al
    last_modified: 2026-08-27
---

# 研究定位

這是一份從三份 arXiv 原始研究整理的 draft claim set。第一份來源把生成式搜尋的 crawlable corpus 視為 renewable common-pool resource，而不是固定不變的輸入；其理論模型同時處理 corpus volume、平均 quality 與 content lifetime，並把 generative extraction 定義為內容價值被回答介面取得、但沒有以造訪返回來源的情況。[^arxiv-corpus-erosion]

本頁可補足 [Google 生成式 AI 搜尋的 GEO 研究基線](/concepts/google-search-generative-ai-optimization.md) 對索引、retrieval、citation 與 traffic 邊界的討論，但不把理論結果升格為 Google、Bing、Perplexity 或其他引擎的實測行為。

## 1. 來源模型支持的核心主張

- 在來源的假設下，較高的 extraction rate 會透過 publisher opt-out、renewal funding 減少與 content depreciation 增加，使 crawlable commons 的 volume、quality 與 lifetime 同時惡化。[^arxiv-corpus-erosion]
- 來源提出單一 erosion threshold：低於 threshold 時模型中的 corpus 仍有正的 steady state；到達或超過 threshold 時，volume 逐步或快速趨近於零。這是模型命題，不是公開網路已觀測到的臨界值。[^arxiv-corpus-erosion]
- 在來源設定的多引擎競爭與 concavity 假設下，對同一 crawlable commons 的對稱均衡 extraction rate 會隨引擎數量增加並趨近 threshold；這描述模型中的共同資源外部性，不等於現實市場的因果估計。[^arxiv-corpus-erosion]
- 來源討論七項 survival mechanisms，包括 referral floor、teaser answer、paid crawling、flow-indexed licensing、attribution-based compensation、collective bargaining 與 enforceable usage signal；其中前兩項直接降低 extraction，補償與協調機制則改變參與、renewal 或 conditional access 條件。[^arxiv-corpus-erosion]

### 1.1 Citation integrity 與 supplier–platform incentive lens

另一份原始研究把生成式搜尋的來源生態問題具體化為 repeated supplier–platform game：內容提供者觀察平台防禦規則後改寫文件，平台則從 before／after pairs 推斷操弄並更新 answer-time defense。這補充了「來源是否持續可供 crawl／referral」之外的另一個風險：citation 作為 attention、attribution 與下游價值分配機制時，供應者可能為追求 visibility 而逐輪適應，造成 unsupported claims 與答案品質下降。這是來源的理論與模擬設定，不是公開搜尋引擎已採用的通用模型。[^arxiv-mechanism-design]

- 來源提出 **verifiable-content reward（VCR）**：對可疑操弄施加 suspicion penalty，同時對能由舊版文件核對、且在改寫中更醒目呈現的 factual claims、數字或 named citations 給予 credit，再以 combined score 做 soft source re-ranking。來源描述高 suspicion 文件不必然被刪除，若提供唯一必要證據仍可能被引用；這是研究機制，不是 xdxd 或公開平台產品規格。[^arxiv-mechanism-design]
- 來源主實驗以 E-commerce、GEO-Bench、Researchy-GEO 三個 retrieval-augmented benchmark，五個候選文件／query、最多 1,000 queries、三個 answer engines 與五種 GEO attackers 做受控 repeated simulation。作者報告 VCR 在九個 dataset—engine settings 的 Net defense—utility 最大，較最強 baseline 平均高 12.1 percentage points；這些數字不等同 live web、跨引擎 ranking、citation 或 agent discoverability 成效。[^arxiv-mechanism-design]
- 來源將 creator exposure／visibility 與 platform-user utility 分開，並以 `Def.`、`Welf.`、`Net = Def. + Welf.` 定義 outcome；`±5` percentage points 的 creator utility band 是其 empirical equivalence operationalization，不可與 Bing citation、Cloudflare AEO 或 Google Search Console 欄位互換。[^arxiv-mechanism-design]
- 來源的 verification ablation 顯示，以攻擊者新造的 support page 作為 anchor 會形成可遊戲化的 circular evidence channel；以原始 document pair 作為 anchor 則較能避開攻擊者控制。但作者也明確指出 VCR 檢查的是相對舊版的 source support 與 factual salience，不是獨立 truth；LLM claim counting、rule matching、claim duplication／splitting 與 reward cap 仍是誤差來源。[^arxiv-mechanism-design]

### 1.2 Attribution competition 與 publisher learning dynamics

第三份原始研究把 citation／attribution exposure 的供應側激勵形式化為 generative publishers’ game：publishers 選擇向量化文件，平台依使用者問題、context size `k`、retrieval weight `α` 與 posterior `z` 生成 centroid-like response，再以 argmax、softmax 或 linear attribution 分配 exposure。Publisher 的 content drift 相對初始文件有成本；因此這是一個把「來源持續供應」與「爭取被引用」連在一起的 mechanism／welfare lens，不是任一公開平台的已知完整演算法。[^arxiv-strategic-publishers]

- 在來源的理論 game 中，argmax 可能不存在 pure Nash equilibrium；softmax 在 `β>0` 時不是 potential game 且可構造 profitable-deviation cycle；linear attribution 在使用全部文件（`k=n`）時形成 exact potential game，但 `k<n` 不保證同樣性質。這些是模型內的穩定性命題，不是 live AI Search stability measurement。[^arxiv-strategic-publishers]
- 來源模擬固定 `n=5`、`p=2`、`λ=0.5`、seed `36`、`T=1000`、`ε=10^-6` 與每設定 500 次 run；在作者繪製的設定中，argmax 大多數 dynamics 不收斂，而 softmax／linear 收斂，且增加 `k` 對 softmax／linear 的 convergence ratio 有穩定化趨勢。這些是作者的 embedding-space observational results，不是 xdxd 重跑。[^arxiv-strategic-publishers]
- 來源分開定義 publisher welfare、response relevance 與 attribution relevance，並指出 stable mechanism 不必然最大化 social welfare；最佳 attribution mechanism 與 context size 取決於三類 welfare 權重。這可補足 corpus erosion 的資源永續性與 VCR 的 citation-integrity lens，但不等同 user satisfaction、publisher traffic 或 citation quality 的公開因果估計。[^arxiv-strategic-publishers]

### 1.3 Generation-native advertising 與回答形成中的商業影響

第四份原始研究把生成式介面的商業機會從預先存在的 sponsored slot 移到回答生成軌跡本身：產品何時變得相關、哪個 advertiser 被呈現，以及內容如何呈現，可能在 token-level generation 中共同形成。作者提出 **Latent Advertiser Mixture Auction（LAMA）**，讓 advertiser 的 local continuation values 形成 advertiser-specific next-token policies，平台再以 latent mixture 解碼並更新 allocation posterior。這是來源的 mechanism-design model，不是公開 AI Search 平台已知的完整實作。[^arxiv-token-level-advertising]

- 在論文定義的模型與假設下，作者聲稱 LAMA 具備 Markov DSIC、IR 與 KL-regularized welfare 的近似最優性，並給出 `β log |𝒩|` 的 additive gap 上界。這是 model-relative theoretical result，不是現實平台的 incentive、品質或生態效果保證。[^arxiv-token-level-advertising]
- 作者以 Qwen3-14B reference model、advertiser-shared LoRA report heads、predicted impression-value model，以及 Webis Generated Native Ads 2024 的 Workout／Vacation／Car commercial-search query splits 做 proof-of-concept；在其 Table 1，LAMA 的平均 platform welfare、revenue、advertiser value 與 user-side quality 分別報告為 `0.5205`、`0.8305`、`0.8568`、`66.5239`，並列為比較方法中的最高值。這些是指定 query split、model、advertiser configuration、baseline 與 GEM-Bench rubric 下的 observational results，不是 xdxd 重跑。[^arxiv-token-level-advertising]
- 這個來源把 publisher／platform incentive 的研究邊界再往前推：商業影響可能不是只發生在 citation exposure 或 referral allocation，而是進入 response formation。對 xdxd 而言，這是研究設計推論，應另記 advertiser exposure／token provenance、organic answer claims、source retrieval／citation、user-quality、publisher welfare 與 click／conversion；不能把作者的 `Welfare`、`Revenue` 或 `Quality` 直接當成 GEO visibility 或 citation entailment。[^arxiv-token-level-advertising]

## 2. xdxd 可觀測化的研究變項

以下是由上述模型轉成 xdxd GEO 研究設計的推論，不是來源已替 xdxd 驗證的指標：

1. **Access／opt-out**：保存來源 URL、引擎或 crawler identity、robots／policy 狀態、HTTP response、是否可取得與是否為 conditional access；可與 [OpenAI Crawlers entity](/entities/openai-crawlers.md)、[Perplexity Crawlers entity](/entities/perplexity-crawlers.md) 及其他 crawler 觀測並列。
2. **Extraction／referral**：將回答中的 source citation、citation prominence、可操作連結、redirect／click、answer 是否保留足以促成造訪的內容，與頁面被讀取或被引用分開記錄。不要把 citation 出現直接當成 source traffic，也不要把沒有 click 當成被抽取的已證實比例。
3. **Corpus volume／quality**：以固定 query、固定時間窗與重複 snapshot 記錄可取得來源數量、來源 tier、第一手／獨立來源構成、引用 URL 可驗證性與被排除的來源；這些是觀測 proxy，不是模型變數的直接量測。
4. **Renewal／lifetime**：對相同來源保存發布、修改與多次擷取時間，估計內容更新週期、失效或不可取得狀態、內容版本差異與 freshness；不要把單篇頁面的日期 metadata 直接解讀成整體 corpus lifetime。
5. **Outcome separation**：沿用 [GEO 內容偵測與 citation URL audit](/methods/geo-content-detection-and-citation-audit.md) 與 [跨介面生成式搜尋 citation 與 source presentation 觀測方法](/methods/chinese-generative-search-cross-interface-observation.md) 的分層，分開 `crawled`、`retrieved`、`used`、`cited`、`shown`、`clicked` 與 `returned-to-source`；每一層都保存時間、介面、query、raw response 與來源 URL。
6. **Publisher incentive／mechanism**：若研究內容改寫或公開 resource page，額外保存初始／衍生版本 hash、content-drift 定義、attribution／citation rule、context size、retrieval weight、source exposure、publisher／user welfare 與 convergence ratio／rate；這些是受控 mechanism 變項，不可當作公開平台 ranking signal 或 GEO uplift。

## 3. 建議的 longitudinal observation

以固定 query panel、固定來源集合與多個 Web／App 或引擎介面建立時間序列：先保存每次回答、citation、source presentation 與 click／redirect observation，再對來源頁面做獨立 HTTP／crawler access snapshot。對任何 access policy 或內容介入，至少保留介入前後的原始 body、headers、URL identity、robots／policy、content hash、發布／修改時間與 response status；流程依 [GEO 證據生命週期](/methods/evidence-lifecycle.md) 執行。

這樣的設計可以檢查「可取得性、來源組成、citation／referral 呈現與 freshness 是否隨時間共同變化」的研究問題，但不能只靠單一時間點或單一平台回答「GEO 是否提升長期 agent discoverability」。若要估計因果效果，仍需固定 query、對照組、跨時間重複、版本化介入與獨立 outcome measurement。

## 4. 證據邊界與待驗證事項

- 本頁目前包含四份 arXiv 預印本：corpus-erosion 來源是 crawlable commons 的理論模型，mechanism-design 來源是 citation competition 與 verifiable-content reward 的受控 simulation，strategic-publishers 來源是 attribution-incentivized publisher learning dynamics 與 welfare 的理論／simulation，token-level advertising 來源是 generation-native advertising 的 sequential mechanism 與 commercial-search proof-of-concept。四者都不是公開搜尋平台的 live 行為或 xdxd 的獨立重現，`status: draft` 且沒有 `verified`。
- 來源的 threshold、competition、welfare 與 survival mechanisms 是在其參數、函數形狀與行為假設下的理論結果；需要獨立資料才能檢查是否適用於真實 crawler access、source traffic、citation、click 或內容更新行為。[^arxiv-corpus-erosion]
- 本頁的 `extraction`、`corpus quality`、`lifetime`、source-supported salience、verification anchor 與 outcome separation 是研究操作化建議，不是平台 API 或搜尋引擎公開承諾；不能外推為整體網路 prevalence、跨引擎排名或 agent discoverability 保證。mechanism-design 來源的 VCR 只在其單一 platform／creator population、有限 repeated horizon、local quadratic surrogate 與 LLM-based oracle 設定下報告，不能直接移植成產品規則。
- 來源權利、版本與不可變檔案見 [arXiv corpus erosion raw capture](/raw/arxiv-corpus-erosion-2026-08-26.md) 與 [arXiv mechanism design raw capture](/raw/arxiv-mechanism-design-2026-08-26.md)；頁面或論文更新時應新增 snapshot，不覆寫舊 raw evidence。
- 新增來源的權利、版本與不可變檔案見 [arXiv strategic publishers raw capture](/raw/arxiv-strategic-publishers-generative-ai-2026-08-27.md)；頁面或論文更新時應新增 snapshot，不覆寫舊 raw evidence。
- 新增來源的權利、版本與不可變檔案見 [arXiv Token-Level Advertising raw capture](/raw/arxiv-token-level-advertising-2026-08-28.md)；頁面或論文更新時應新增 snapshot，不覆寫舊 raw evidence。

[^arxiv-corpus-erosion]: Sylvain Peyronnet, “When Search Eats the Web: A Model of Corpus Erosion under Generative Extraction,” arXiv:2608.15896v1, submitted 2026-08-16. Source URL: <https://arxiv.org/abs/2608.15896>. Immutable raw capture: [metadata](/raw/arxiv-corpus-erosion-2026-08-26.md), [abstract HTML](/raw/arxiv-corpus-erosion-2026-08-26/abstract.html), and [paper PDF](/raw/arxiv-corpus-erosion-2026-08-26/paper.pdf).

[^arxiv-mechanism-design]: Chen Xu, Zitian Guo, and Chenyan Xiong, “Mechanism Design for Generative Engines: From Exploitation toward Win-Win Outcomes,” arXiv:2608.11390v1, submitted 2026-08-11. Source URL: <https://arxiv.org/abs/2608.11390>. Immutable raw capture: [metadata](/raw/arxiv-mechanism-design-2026-08-26.md), [abstract HTML](/raw/arxiv-mechanism-design-2026-08-26/abstract.html), [paper HTML](/raw/arxiv-mechanism-design-2026-08-26/paper.html), and [paper PDF](/raw/arxiv-mechanism-design-2026-08-26/paper.pdf).

[^arxiv-strategic-publishers]: Sagie Dekel, Omer Madmon, Moshe Tennenholtz, and Oren Kurland, “Learning Dynamics of Strategic Publishers in Generative AI Ecosystems,” arXiv:2607.25514v1, submitted 2026-07-28. Source URL: <https://arxiv.org/abs/2607.25514>. Immutable raw capture: [metadata](/raw/arxiv-strategic-publishers-generative-ai-2026-08-27/capture-metadata.json), [abstract HTML](/raw/arxiv-strategic-publishers-generative-ai-2026-08-27/abstract.html), [paper HTML](/raw/arxiv-strategic-publishers-generative-ai-2026-08-27/paper.html), and [paper PDF](/raw/arxiv-strategic-publishers-generative-ai-2026-08-27/paper.pdf).

[^arxiv-token-level-advertising]: Hanbing Liu, Bowei Zhang, Changyuan Yu, Yinyu Ye, and Qi Qi, “Token-Level Advertising,” arXiv:2608.27382v1, submitted 2026-08-27. Source URL: <https://arxiv.org/abs/2608.27382v1>; immutable raw capture: [capture metadata](/raw/arxiv-token-level-advertising-2026-08-28/capture-metadata.json), [abstract HTML](/raw/arxiv-token-level-advertising-2026-08-28/abstract.html), [paper HTML](/raw/arxiv-token-level-advertising-2026-08-28/paper.html), and [paper PDF](/raw/arxiv-token-level-advertising-2026-08-28/paper.pdf).
