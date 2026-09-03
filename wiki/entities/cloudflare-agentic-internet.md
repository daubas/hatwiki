---
type: Platform Entity
title: Cloudflare Agentic Internet：readable、discoverable、callable、payable
description: Cloudflare 第一方文章提出的 Agentic Internet 平台框架、agent discoverability 定位，以及 freshness signals／Pay Per Use 的搜尋經濟研究方向；僅作為平台觀點與研究變項，不是效果證據。
resource: https://blog.cloudflare.com/the-agentic-internet/
tags:
  - entity
  - cloudflare
  - agentic-internet
  - agent-discoverability
  - ai-search
  - aeo
  - structured-content
  - webmcp
  - agent-development-lifecycle
  - agent-access
  - oauth
  - authorization
  - mcp
status: draft
generated:
  by: xdxd-geo/gpt-5.6-luna
  at: 2026-08-31T02:18:30Z
sources:
  - id: cloudflare-agentic-internet
    resource: /raw/cloudflare-agentic-internet-2026-08-25.md
    title: Cloudflare「Building an open Agentic Internet」官方文章（2026-08-25 raw capture）
    author: cloudflare/blog
    last_modified: 2026-08-10
  - id: cloudflare-blog-emdash-2026-08-25
    resource: /raw/cloudflare-blog-emdash-2026-08-25.md
    title: Cloudflare「The Cloudflare Blog – Brought to you by EmDash」官方文章（2026-08-25 raw capture）
    author: cloudflare/blog
    last_modified: 2026-08-24
  - id: cloudflare-agents-week-review-2026-08-25
    resource: /raw/cloudflare-agents-week-review-2026-08-25.md
    title: Cloudflare「Everything we launched during Agents Week」官方文章（2026-08-25 raw capture）
    author: cloudflare/blog
    last_modified: 2026-08-11
  - id: cloudflare-agentic-behaviors-2026-08-25
    resource: /raw/cloudflare-agentic-behaviors-2026-08-25.md
    title: Cloudflare「Unveiling good and bad behaviors on the Agentic Internet」官方文章（2026-08-25 raw capture）
    author: cloudflare/blog
    last_modified: 2026-08-10
  - id: cloudflare-task-based-oauth
    resource: /raw/cloudflare-task-based-oauth-2026-08-26.md
    title: Cloudflare「From all-or-nothing to task-based OAuth consent」官方文章（2026-08-26 raw capture）
    author: cloudflare/blog
    last_modified: 2026-08-20
  - id: cloudflare-mcp-optional-oauth-scopes-2026-08-31
    resource: /raw/cloudflare-mcp-optional-oauth-scopes-2026-08-31.md
    title: Cloudflare「Choose OAuth scopes for Wrangler and the Cloudflare API MCP server」官方變更紀錄（2026-08-31 raw capture）
    author: cloudflare/developers
    last_modified: 2026-08-22
  - id: cloudflare-radar-researcher-improvements
    resource: /raw/cloudflare-radar-researcher-improvements-2026-08-27.md
    title: Cloudflare「Radar Researcher adds richer sources and URL Scanner explanations」官方 Changelog（2026-08-27 raw capture）
    author: cloudflare/developers-docs
    last_modified: 2026-08-26
  - id: cloudflare-botbase-for-operators-2026-08-28
    resource: /raw/cloudflare-botbase-for-operators-2026-08-28.md
    title: "Cloudflare「BotBase for Operators: A clearer path to joining Cloudflare's directory of bots and agents」官方文章（2026-08-28 raw capture）"
    author: cloudflare/blog
    last_modified: 2026-08-28
  - id: cloudflare-making-ai-search-smarter-2026-08-29
    resource: /raw/cloudflare-making-ai-search-smarter-2026-08-29.md
    title: "Cloudflare「Making AI search smarter」官方文章（2026-08-29 raw capture）"
    author: cloudflare/blog
    last_modified: 2026-07-15
  - id: cloudflare-radar-researcher-webmcp-2026-08-30
    resource: /raw/cloudflare-radar-researcher-webmcp-2026-08-30.md
    title: "Cloudflare「Radar Researcher beta and WebMCP support now available」官方 Changelog（2026-08-30 raw capture）"
    author: cloudflare/developers-docs
    last_modified: 2026-08-07
---

# Entity

Cloudflare 在一篇 2026-08-06 發布、2026-08-10 修改的第一方文章中，把 Agentic Internet 描述為面向新型 agent visitor 的開放網路，並以 **readable、discoverable、callable、payable** 四個方向組織平台觀點。這是 Cloudflare 的產品／策略定位，不是任何單一搜尋引擎或 Agent 的公開規格。[^cloudflare-agentic-internet]

## 一個具體的 agent-facing surface 實例

Cloudflare 另一篇 2026-08-24 發布的第一方文章記載，Cloudflare Blog 在遷移至 EmDash 後提供新的 MCP server，列出 `search_posts`、`list_posts`、`get_post`、`list_tags` 四個 agent 工具；文章同時稱 EmDash API 與 Worker 暴露的 AI search endpoints 支援這項整合。這使「callable」與「discoverable」不只停留在平台框架，也有一個可保存與核對的產品實例。[^cloudflare-blog-emdash-2026-08-25]

這個實例仍只能證明 Cloudflare 對自身 Blog 的 agent-facing 介面描述，不能推導 MCP、API catalog 或 AI search endpoint 會提高公開搜尋排名、retrieval、citation 或跨模型 agent discoverability。若要納入 xdxd 實驗，應把工具可發現／可呼叫性、內容檢索結果與 citation outcome 分成不同觀測層，保存 endpoint、工具 schema、query、response、時間與版本。

## 文章記載的四個方向

- **Readable**：文章把 Markdown for Agents 描述為讓 agent 以較少 token 與頻寬讀取網站；這是 Cloudflare 對其 agent-oriented representation 的第一方說明。[^cloudflare-agentic-internet]
- **Discoverable**：文章稱 AI Search 可讓公開網站被 agents 搜尋，並把 Agent Engine Optimization（AEO）描述為量測品牌在相關模型與 agents 中的可見度。這可作為 xdxd 研究中的平台命題與觀測變項，但不等於已證明可提升搜尋排名、回答引用或整體 discoverability。[^cloudflare-agentic-internet]
- **Callable**：文章以 WebMCP 為例，描述網站可在瀏覽器中直接向 agents 暴露動作，而不是讓 agent 猜測人類 UI 的按鈕與 DOM。這支持把 agent action surface 與純內容檢索分開建模。[^cloudflare-agentic-internet]
- **Payable**：文章把 x402 與 Cloudflare 的 Monetization Gateway 放在 agent 付款與內容／API 使用的方向中；這是商業與存取控制命題，不是 citation 或排名訊號。[^cloudflare-agentic-internet]

文章另把 Web Bot Auth、PACT、Markdown for Agents、WebMCP、x402 與 MCP 列為其所依循或建構的開放工具／協定脈絡；本頁不對這些協定的獨立規範內容作超出來源的整理。[^cloudflare-agentic-internet]

## Agents Week 回顧提供的時間化框架

Cloudflare 對 2026-08-03 至 2026-08-07 Agents Week 的官方回顧，把相關工作按五個主題日排列：週一是 agent runtime／infrastructure；週二是 Agent Development Lifecycle（ADLC）與 agent primitives；週三是 Agent Access、Cloudflare OS 與 MCP server controls；週四是 readable／discoverable／callable／payable 的 Agentic Internet、WebMCP、AEO、agent-first browser、MCPv2 與 AI Search；週五是 agent behavior、continuous trust 與 Radar Researcher。這是 Cloudflare 對自身公告與方向的產品框架彙整，不是獨立研究的效果分層。[^cloudflare-agents-week-review-2026-08-25]

對 xdxd 研究而言，這筆回顧可把 Cloudflare 的 agent-facing 主張暫分成三個觀測層：

1. **Representation／discovery**：Markdown、WebMCP、AI Search 與 AEO，關注資源是否可被 agent 取得、理解、發現或選取。
2. **Access／action／transaction**：Agent Access、MCP controls、Wallets 與 payable surface，關注 agent 能否在授權邊界內呼叫動作或完成交易。
3. **Operations／trust／observation**：ADLC、agent run telemetry、continuous trust、bot behavior 與 Radar Researcher，關注 agent 行為與平台治理的觀測。

三層不能互相代替：representation 通過不等於被搜尋 retrieval 選取，action surface 存在不等於產生 citation，behavior／trust telemetry 也不等於公開搜尋排名或流量成效。此分層目前只是由單一 Cloudflare 第一方回顧整理出的 draft 研究模型，仍需固定 prompt、跨模型對照、原始 response／citation log 與可重現的 agent observation 才能驗證。[^cloudflare-agents-week-review-2026-08-25]

## Agent Access 的 task-scoped authorization boundary

Cloudflare 2026-08-20 的第一方文章描述 OAuth optional scopes：client owner 可把 scope 標為 required 或 optional；在特定 authorization flow 中，使用者可取消 optional scopes，而 access token 只包含實際授予的 scope。required／optional 判斷以該次 authorization request 為準，而不是 client 的全部設定；未啟用 optional scopes 的既有 client 維持原本 consent 行為。這是 Cloudflare 對產品行為的描述，不是跨平台 OAuth 或 agent discoverability 標準。[^cloudflare-task-based-oauth]

文章以 MCP server 為例，將「agent 理論上可使用的廣泛權限」與「使用者在當前任務願意授予的較窄權限」分開。對 xdxd GEO／Agent discoverability 研究，這補充了 access／action 層的控制邊界：資源可以被 representation／discovery surface 找到，但仍可能在 authorization、invocation 或 completion 階段受到 scope 限制。後一句是研究模型推論，不是 Cloudflare 對搜尋成效的承諾。

後續若做 Agent-facing paired run，應至少分開保存 `configured_scopes`、`requested_scopes`、`optional_scopes`、`selected_scopes`、`granted_scopes`、authorization outcome、agent action outcome 與 fallback／partial-grant handling；不能把「被發現」或「被授權」合併成 citation、ranking 或 overall discoverability 指標。原始證據見 [Cloudflare task-based OAuth raw capture](/raw/cloudflare-task-based-oauth-2026-08-26.md) 與 [HTML snapshot](/raw/cloudflare-task-based-oauth-2026-08-26/snapshot.html)。

## Wrangler 與 Cloudflare API MCP server 的 optional-scope consent

Cloudflare Developers 2026-08-22 的 Changelog 另記載，Wrangler 與 Cloudflare API MCP server 使用 optional OAuth scopes；授權時可編輯要授予的 optional permissions，而不是核准 client 要求的全部 scope。頁面表示 required scopes 仍維持選取，較少授予 optional scopes 會把各 tool 的 access 限制在工作流程所需的 permissions。若 command 或 tool call 需要被拒絕的 scope，使用者需重新授權 client 並授予該 scope。這是 Cloudflare 對自身產品的第一方描述，未由 xdxd 執行互動驗證。[^cloudflare-mcp-optional-oauth-scopes-2026-08-31]

對 xdxd 的 Agent-facing 觀測而言，這把既有的 task-scoped authorization 拆成更具體的 consent／tool-access 變項：`required_scopes`、`optional_scopes`、`selected_scopes`、`granted_scopes`、`declined_scopes`、reauthorization event、tool authorization outcome 與 workflow completion 應分開保存。這些變項描述 access／action 可操作性，不支持 optional scopes、MCP 或 OAuth 會提高公開 AI Search crawl、index、ranking、retrieval、citation、referral、click 或 GEO uplift；也不是 OAuth 或 MCP 規格本身。

## Agent traffic 的行為、信任與觀測邊界

Cloudflare 另一篇 2026-08-07 發布、2026-08-10 修改的第一方文章，把 agentic traffic 的研究問題從「bot 是否存在」轉成行為、Risk 與 Trust：同一個 session 可能在 human 與 agentic 之間切換；Risk 被描述為某個 request／action 造成傷害的可能性，而 Trust 則隨時間與 reputation 建立。這是 Cloudflare 的治理框架，不是公開搜尋引擎的 retrieval 或 citation 規格。[^cloudflare-agentic-behaviors-2026-08-25]

文章同時記載 Cloudflare 對 BotBase、Precursor 與後續 mitigation 的平台描述：Verified bot／agent 的期待包含誠實宣告身分且不濫用信任；Precursor 以持續的 client-side session 行為評估補充 point-in-time checks；Cloudflare 自述在撰文時一個 24 小時期間觀察到 206 million 個 Precursor evaluation events、涵蓋 73,438 個 zones，並指出可疑行為常在 session 中途出現。這些數字與模式是 Cloudflare 自報的產品觀察，不能直接當作整體網際網路 prevalence、獨立抽樣或因果效果證據。[^cloudflare-agentic-behaviors-2026-08-25]

文章另提出不確定性回應、AI Labyrinth 與 legitimate bot queuing 等 advanced mitigation，並說明接近年底才會推出；在 xdxd 研究中只能先列為待驗證的 policy／traffic-control 變項，不可寫成已部署能力。這筆來源可補強 [Agents Week 的 operations／trust／observation 層](/entities/cloudflare-agentic-internet.md)，但不代表 behavior／trust telemetry 能替代 representation、discovery、retrieval、citation 或 click outcome。

## BotBase for Operators：operator-side identity、內容使用與 review trace

Cloudflare 2026-08-28 的第一方文章宣布 BotBase for Operators，將 bot submission 入口放在 dashboard 的 `Protect & Connect → Application Security → BotBase`，並拆成 Bots directory、Submission form 與 Submission history。文章稱所有客戶均可由 dashboard 進入；這是 Cloudflare 的產品公告，沒有由 xdxd 以帳戶操作獨立查核。[^cloudflare-botbase-for-operators-2026-08-28]

文章描述 history 會保留帳戶提交的 bot 與 `Waiting for review`、`Accepted`、`Rejected` 狀態，拒絕時顯示原因與修正步驟，接受但分類被調整時顯示變更；directory 可篩選 `My bots`，既有 submission 可編輯，待審 submission 可取消。這補充了 BotBase 的 operator-side transparency 與可修正性，但不代表所有帳戶都已實際可用或操作成功。[^cloudflare-botbase-for-operators-2026-08-28]

新 intake form 要求分開描述 bot 做什麼、如何使用讀到的內容、以及由誰運行。文章列出搜尋索引、代表使用者行動、資料收集、模型訓練與 SEO 工具等可多選行為，並以 Content Signals 例子 `search=yes, ai-train=no, use=reference` 表達內容使用；另區分 direct operator 與 intermediary。對 xdxd 而言，這些欄位可作為 agent／crawler identity 與 policy representation 變項，但不應被當成跨平台通用標準。[^cloudflare-botbase-for-operators-2026-08-28]

文章也記載 BotBase review 會自動檢查 duplicate、user-agent specificity 與驗證方法，例示 IP list、reverse DNS 與 Web Bot Auth signature；通過者可被立即追蹤，需要進一步查看者會帶著具體原因轉交團隊。文章另稱 submission 量自 2023 年約增七倍，但未給出可重算的完整分母或時間序列；這些流程與數字均是 Cloudflare 自述，不是 xdxd 的 review latency、acceptance rate、coverage 或 discoverability effect 實驗。[^cloudflare-botbase-for-operators-2026-08-28]

因此，本頁新增的研究欄位應至少分開保存 `bot_behaviors`、`content_use_declaration`、`operator_role`、`identity_proof`、`submission_status`、`directory_presence`、zone／surface 與時間，再與實際 crawler request、retrieval、citation、shown、clicked 結果分層連接。BotBase operator metadata 能補強 governance／observation 層，不能直接推導公開搜尋 ranking、AI citation、referral 或 GEO uplift；本頁維持 `draft`。

## Making AI search smarter：freshness signals、crawl reduction 與 Pay Per Use

Cloudflare Blog 於 2026-07-01 發布、頁面 metadata 顯示 2026-07-15 修改的第一方文章，宣布兩項與 agentic search 經濟相關的研究／產品方向。第一項是以 Cloudflare 網路所見的 freshness、quality、change 與人／bot traffic signals，研究如何讓 answer engines 找到較新、較高品質的內容，並減少對未變更頁面的 unnecessary re-crawl。文章把研究目標拆成「內容是否更容易 surfaced」與「不必要抓取是否下降」兩個問題；它沒有提供結果、公開 dataset 或跨引擎 paired experiment。[^cloudflare-making-ai-search-smarter-2026-08-29]

第二項是把 Pay Per Crawl 朝 Pay Per Use 演進。文章稱 Cloudflare 正與 Ceramic.ai、You.com 等夥伴測試 pay-per-query、pay-per-result 與按需取得 premium content 等方向，並描述內容 owner 可能看到 leading queries、特定 webpage／snippet 與平均搜尋排名等 AEO reporting。這些是 Cloudflare 對合作實驗與規劃中的 surface 描述；沒有由 xdxd 以帳戶、API、payment ledger 或 report export 獨立核對，也不等於已有 publisher revenue、citation、referral 或 GEO uplift。[^cloudflare-making-ai-search-smarter-2026-08-29]

對 xdxd 而言，這筆來源把「可被發現」與「內容被使用後如何補償」放進同一個待測但尚未定案的搜尋經濟研究面。後續可將 `freshness_signal`、`change_detection`、`crawl_request`、`re_crawl_avoided`、answer-engine identity、query、retrieved／cited／shown URL、snippet、rank、payment unit、publisher opt-in、report export 與 referral／click 分開保存。不得把 Cloudflare 自報的「超過 20% Web 位於其網路」或「good-bot crawl 中超過 50% 是未變更頁面的重抓」直接外推成整體 Web 統計；本頁仍維持 `draft`，也不把研究計畫或合作試驗寫成已證明的公開 AI Search 成效。

## Radar Researcher 的來源連結與調查 surface

Cloudflare 2026-08-26 Changelog 描述 Radar Researcher beta 新增三項 agent-facing／investigation surface：回答可連結到相關 Radar pages、reports 與 Cloudflare Blog posts；URL Scanner report 可用 **Explain with AI** 交給 Radar Researcher 解釋掃描發現並回答該網站的 follow-up questions；shared conversations 改以 fullscreen 開啟，share URL 在關閉 panel 或開始新 conversation 前仍可使用。這是 Cloudflare 自有產品行為的第一方描述，不是獨立品質、使用量或因果效果證據。[^cloudflare-radar-researcher-improvements]

對 xdxd 的研究模型而言，這筆公告可補強 operations／trust／observation 層，並把 `investigation_surface`、`input_artifact`（例如 URL Scanner report）、`linked_source_type`（Radar page／report／Cloudflare Blog）、`follow_up_available`、`share_session_state` 與 source URL 分開記錄。連結存在不等於公開搜尋 crawler 已發現目標、retrieval 已選取內容、回答已形成 citation，亦不等於 click、轉換或 GEO uplift；後述欄位化是 xdxd 研究設計推論。原始證據見 [Cloudflare Radar Researcher raw capture](/raw/cloudflare-radar-researcher-improvements-2026-08-27.md) 與 [HTML snapshot](/raw/cloudflare-radar-researcher-improvements-2026-08-27/snapshot.html)。[^cloudflare-radar-researcher-improvements]

## Radar Researcher beta 與 WebMCP support

Cloudflare 2026-08-07 的官方 Changelog 另描述 Radar Researcher beta 與 WebMCP support 的同一產品公告：Radar Researcher 可用文字或語音探索 Internet trends／traffic data，並依 Radar API data 回傳 explanations 與 interactive charts；特定 chart 可用 **Explain with AI** 開始基於 underlying data／context 的對話。文章也描述 suggested follow-up questions、可搜尋的 conversation history 與 shareable links。這些是 Cloudflare 對自身產品 surface 的第一方描述，不是 xdxd 對 availability、資料正確性、回答品質或使用量的獨立驗證。[^cloudflare-radar-researcher-webmcp-2026-08-30]

同一公告把 WebMCP 描述為讓 browser-based AI agents 能 navigate Radar、搜尋資料，並使用 URL scanning 與 domain lookup 等工具。這可補充既有 WebMCP 的 action-surface 研究變項：`browser_agent`、`navigation_target`、`tool_name`、`input_schema`、`source_data_context`、`chart_explanation`、`follow_up_available`、`conversation_history` 與 `share_link_state`。這些欄位是由產品描述轉成的研究設計推論，不是跨瀏覽器相容性或完成版 WebMCP 標準的證據。[^cloudflare-radar-researcher-webmcp-2026-08-30]

Radar page／chart／URL Scanner 的可探索或可呼叫 surface 仍不能替代公開搜尋 funnel：`crawled`、`indexed`、`retrieved`、`used_in_answer`、`citation_entails`、`shown`、`clicked`。本公告沒有固定 query panel、跨模型比較、原始 citation log 或 GEO intervention，因此不支持 WebMCP 或 Radar Researcher 提升公開 AI Search ranking、retrieval、citation、referral、click 或 GEO visibility。原始證據見 [Cloudflare Radar Researcher／WebMCP raw capture](/raw/cloudflare-radar-researcher-webmcp-2026-08-30.md)、[HTML snapshot](/raw/cloudflare-radar-researcher-webmcp-2026-08-30/snapshot.html) 與 [capture metadata](/raw/cloudflare-radar-researcher-webmcp-2026-08-30/capture-metadata.json)。

## GEO 研究用途與邊界

這筆第一方來源可把 agent discoverability 拆成至少兩個不同問題：

1. **Representation／readability**：agent 是否能以較低 token、較少頻寬或更穩定的介面取得內容。
2. **Discovery／visibility**：目標資源是否能被指定模型、agent 或 AI Search surface 發現與選取。

兩者不可由同一個平台宣稱互相推導。文章沒有提供跨引擎、跨模型、固定 query panel、citation outcome 或獨立 AEO 效果實驗；因此本頁維持 `status: draft`，不產生排名、引用率、流量或因果改善結論。文章所述 bot 重新抓取未變更頁面的觀察也沒有足夠方法資訊可直接重現，應另設 crawl observation 才能使用。

與 [Cloudflare AI Search 的 Agent Framework 整合](/entities/cloudflare-ai-search-agent-integrations.md) 的差異是：本頁記錄 Cloudflare 對 Agentic Internet 與 discoverability／representation 的平台框架，前者記錄 Agents SDK、AI SDK、LangChain 的 grounded retrieval 與 `sources` 回傳整合。與 [Cloudflare AI Crawl Control](/entities/cloudflare-ai-crawl-control.md) 的差異是：本頁偏向 agent-facing 的讀取、發現、呼叫與付費模型，後者偏向網站端 crawler 存取觀測與政策控制；三者都不能直接推導公開搜尋成效。研究保存規則見[證據生命週期](/methods/evidence-lifecycle.md)。

原始來源與不可變證據見 [Cloudflare Agentic Internet raw capture](/raw/cloudflare-agentic-internet-2026-08-25.md)；HTML snapshot 見 [snapshot](/raw/cloudflare-agentic-internet-2026-08-25/snapshot.html)。新增的 Blog／EmDash 證據見 [raw capture](/raw/cloudflare-blog-emdash-2026-08-25.md) 與 [HTML snapshot](/raw/cloudflare-blog-emdash-2026-08-25/snapshot.html)。Agents Week 回顧見 [raw capture](/raw/cloudflare-agents-week-review-2026-08-25.md) 與 [HTML snapshot](/raw/cloudflare-agents-week-review-2026-08-25/snapshot.html)。task-scoped authorization 證據見 [raw capture](/raw/cloudflare-task-based-oauth-2026-08-26.md) 與 [HTML snapshot](/raw/cloudflare-task-based-oauth-2026-08-26/snapshot.html)。

[^cloudflare-agentic-internet]: Cloudflare Blog, “Building an open Agentic Internet: readable, discoverable, callable, and payable,” published 2026-08-06 and modified 2026-08-10. Source URL: <https://blog.cloudflare.com/the-agentic-internet/>; immutable raw capture: [metadata](/raw/cloudflare-agentic-internet-2026-08-25.md) and [HTML snapshot](/raw/cloudflare-agentic-internet-2026-08-25/snapshot.html).
[^cloudflare-blog-emdash-2026-08-25]: Cloudflare Blog, “The Cloudflare Blog – Brought to you by EmDash,” published 2026-08-24 and modified 2026-08-24. Source URL: <https://blog.cloudflare.com/cloudflare-blog-uses-emdash/>; immutable raw capture: [metadata](/raw/cloudflare-blog-emdash-2026-08-25.md) and [HTML snapshot](/raw/cloudflare-blog-emdash-2026-08-25/snapshot.html).
[^cloudflare-agents-week-review-2026-08-25]: Cloudflare Blog, “Everything we launched during Agents Week,” published 2026-08-10 and modified 2026-08-11. Source URL: <https://blog.cloudflare.com/agents-week-review-august-2026/>; immutable raw capture: [metadata](/raw/cloudflare-agents-week-review-2026-08-25.md) and [HTML snapshot](/raw/cloudflare-agents-week-review-2026-08-25/snapshot.html).

[^cloudflare-agentic-behaviors-2026-08-25]: Cloudflare Blog, “Unveiling good and bad behaviors on the Agentic Internet,” published 2026-08-07 and modified 2026-08-10. Source URL: <https://blog.cloudflare.com/good-and-bad-agentic-behaviors/>; immutable raw capture: [metadata](/raw/cloudflare-agentic-behaviors-2026-08-25.md) and [HTML snapshot](/raw/cloudflare-agentic-behaviors-2026-08-25/snapshot.html).

[^cloudflare-task-based-oauth]: Cloudflare Blog, “From all-or-nothing to task-based OAuth consent,” published and modified 2026-08-20. Source URL: <https://blog.cloudflare.com/task-based-oauth-consent/>; immutable raw capture: [metadata](/raw/cloudflare-task-based-oauth-2026-08-26.md), [HTML snapshot](/raw/cloudflare-task-based-oauth-2026-08-26/snapshot.html), and [HTTP headers](/raw/cloudflare-task-based-oauth-2026-08-26/response-headers.txt).

[^cloudflare-radar-researcher-improvements]: Cloudflare Developers Changelog, “Radar Researcher adds richer sources and URL Scanner explanations,” published and modified 2026-08-26. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-26-radar-researcher-improvements/>; immutable raw capture: [metadata](/raw/cloudflare-radar-researcher-improvements-2026-08-27.md), [HTML snapshot](/raw/cloudflare-radar-researcher-improvements-2026-08-27/snapshot.html), [HTTP headers](/raw/cloudflare-radar-researcher-improvements-2026-08-27/response-headers.txt), and [SHA-256](/raw/cloudflare-radar-researcher-improvements-2026-08-27/sha256.txt).

[^cloudflare-botbase-for-operators-2026-08-28]: Cloudflare Blog, “BotBase for Operators: A clearer path to joining Cloudflare's directory of bots and agents,” published and modified 2026-08-28, author Julian Laxman. Source URL: <https://blog.cloudflare.com/botbase-for-operators/>; immutable raw capture: [metadata](/raw/cloudflare-botbase-for-operators-2026-08-28.md) and [HTML snapshot](/raw/cloudflare-botbase-for-operators-2026-08-28/snapshot.html).
[^cloudflare-making-ai-search-smarter-2026-08-29]: Matthew Conroy, Cloudflare Blog, “Making AI search smarter,” published 2026-07-01 and modified 2026-07-15. Source URL: <https://blog.cloudflare.com/making-ai-search-smarter/>; immutable raw capture: [metadata](/raw/cloudflare-making-ai-search-smarter-2026-08-29.md) and [HTML snapshot](/raw/cloudflare-making-ai-search-smarter-2026-08-29/snapshot.html).
[^cloudflare-radar-researcher-webmcp-2026-08-30]: Cloudflare Developers Changelog, “Radar Researcher beta and WebMCP support now available,” published and modified 2026-08-07. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-07-radar-researcher-and-webmcp/>; immutable raw capture: [metadata](/raw/cloudflare-radar-researcher-webmcp-2026-08-30.md), [HTML snapshot](/raw/cloudflare-radar-researcher-webmcp-2026-08-30/snapshot.html), and [capture metadata](/raw/cloudflare-radar-researcher-webmcp-2026-08-30/capture-metadata.json).
[^cloudflare-mcp-optional-oauth-scopes-2026-08-31]: Cloudflare Developers, “Choose OAuth scopes for Wrangler and the Cloudflare API MCP server,” published and modified 2026-08-22. Source URL: <https://developers.cloudflare.com/changelog/post/2026-08-22-wrangler-mcp-optional-oauth-scopes/>; immutable raw capture: [metadata](/raw/cloudflare-mcp-optional-oauth-scopes-2026-08-31.md), [HTML snapshot](/raw/cloudflare-mcp-optional-oauth-scopes-2026-08-31/snapshot.html), [Markdown response](/raw/cloudflare-mcp-optional-oauth-scopes-2026-08-31/markdown-response.txt), and [SHA-256](/raw/cloudflare-mcp-optional-oauth-scopes-2026-08-31/sha256.txt).
