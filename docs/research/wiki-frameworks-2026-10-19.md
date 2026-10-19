# HatWiki：百科閱讀、知識圖譜與協作編輯參考

查證日期：2026-10-19。範圍是設計研究，沒有修改 HatWiki 程式或部署。以下使用官方文件與專案原始碼；「未確認」代表本輪沒有足夠證據，不能解讀成產品絕對沒有此功能。

## 需求理解與設計方向

使用者希望以 Wikipedia 的文章閱讀方式整理 HatWiki，同時保留 Obsidian 類型的 graph，讓人看得懂內容及其狀態，也讓 agent 能可靠地編輯。這包含三個獨立問題：文章排版、知識連結探索、編輯與驗證流程；不能只換皮膚就認為三者都已完成。

**設計推論：優先保留 HatWiki 既有 Astro、D3、Git、R2、D1、WebMCP 路徑，借用成熟 Wiki 的資訊架構與互動。** 現階段沒有證據顯示必須遷移框架。既有能力與部署狀態仍應在正式實作前逐項核對。

## Wikipedia／MediaWiki 與 Obsidian 可借用的做法

- **閱讀版型**：Vector 2022 將文章目錄放在側邊，讓使用者進頁即可理解章節結構，並限制正文寬度。HatWiki 可借用「持續可見的章節導覽＋穩定正文寬度」，不必直接套用官方的 960px 數值。[Vector 2022 design documentation](https://www.mediawiki.org/wiki/Skin:Vector/2022/Design_documentation)
- **維護提示與資訊框**：MediaWiki 的 templates 能重用內容與格式，可用於維護提示、infobox 等。這種顯示模板不是天然的機器可讀驗證狀態；HatWiki 應由 metadata 產生提示。[Help:Templates](https://www.mediawiki.org/wiki/Help:Templates)
- **審核版本**：FlaggedRevs 是擴充功能，可區分最新修訂與經審核的 stable revision；不可稱為所有 MediaWiki 安裝都內建的流程。[FlaggedRevs](https://www.mediawiki.org/wiki/Extension:FlaggedRevs)
- **編輯 API**：MediaWiki API:Edit 支援編輯摘要、指定 section、bot 標記，以及 `baserevid` 等衝突檢查參數；這是可供 agent 串接的 HTTP API，不能直接稱為原生 WebMCP。[API:Edit](https://www.mediawiki.org/wiki/API:Edit)
- **graph 分工**：Obsidian 區分 global graph 與目前筆記的 local graph；local graph 可調整 depth，也有 filter、groups 等操作。HatWiki 的文章頁適合先顯示局部圖，另提供獨立全局圖入口。[Obsidian Graph view 官方文件原文](https://raw.githubusercontent.com/obsidianmd/obsidian-help/master/en/Plugins/Graph%20view.md)

## 開源框架比較

| 框架 | graph／backlinks | 內容與儲存 | Agent 編輯入口 | 狀態與協作 | 本輪最值得借用 |
|---|---|---|---|---|---|
| Quartz | Quartz 5 的 community plugins 提供 local/global graph、backlinks | Markdown 檔案、Git 同步、靜態建站 | 修改檔案及 Git 流程；本輪未確認原生寫入 API／WebMCP | 可利用 frontmatter；不是多人審核系統 | 局部圖、全局圖、反向連結與正文並存 |
| Wiki.js | 本輪未確認 Obsidian 型關聯圖 | 資料庫＋Git storage module；支援 Markdown editor | 官方 GraphQL API | 頁面歷史；Git 同步不等同審核工作流 | 寫入 API、編輯器與儲存模組分離 |
| BookStack | 核心以書架／書本／章節／頁面組織；本輪未確認關聯圖 | 資料庫，正文主要 HTML；Markdown 原稿另存欄位 | 官方 REST API | revisions、roles、permissions；tag 可有值 | 清楚導覽、可讀標籤與一致模板 |
| XWiki | Interactive Link Visualizer 擴充提供 wiki 頁面 network graph | 平台文件模型；不應視為 Markdown/Git 原生 CMS | 官方 REST API | Publication Workflow 擴充有草稿、moderation、validation、published | 狀態轉移與角色權責清楚分開 |
| DokuWiki | 核心 remote API 有 backlinks；圖像可另用外掛，不能把 Graphviz 圖表當作自動知識圖譜 | 檔案型 Wiki，原生語法不是 CommonMark | 核心 remote API；需啟用並設定權限 | API 有 history、lock、save | 簡單內容模型及可程式化修改 |
| TiddlyWiki | TiddlyMap 為第三方視覺化外掛 | 單檔版或 Node.js 多檔 tiddlers；不是 Markdown/Git 原生 CMS | Node.js WebServer API | 核心欄位含 draft、modified 等；完整審核流程需另設計 | 小單位內容＋顯式欄位 |

### Quartz：最貼近「可閱讀 Wiki＋Obsidian graph」的展示參考

官方站目前是 **Quartz 5**。它將 Markdown 轉成靜態網站，內容放在 `content/`，提供 `quartz sync` 的 Git 同步路徑。這適合讓 agent 編輯檔案並經 Git 審閱，但不能因此推論它具備即時多人編輯或內建內容寫入 API。[Quartz 首頁](https://quartz.jzhao.xyz/)、[Authoring Content](https://quartz.jzhao.xyz/getting-started/authoring-content)

Graph View 已移為 `quartz-community/graph`：local graph 顯示目前檔案的一跳入／出連結，global graph 顯示整個圖，可配置拖曳、縮放、depth、標籤等。Backlinks 也是 community plugin，支援連結預覽。這些是 Quartz 生態的明確能力，但不要沿用 Quartz 4 的「內建元件」描述。[Graph View](https://quartz.jzhao.xyz/features/graph-view)、[Backlinks](https://quartz.jzhao.xyz/features/backlinks)

Quartz 主專案授權為 MIT；若複用插件程式碼，仍須各別確認插件授權。[Quartz LICENSE](https://github.com/jackyzha0/quartz/blob/v5/LICENSE.txt)

### Wiki.js：參考 API 與 Git 同步邊界

官方 GraphQL API 位於 `/graphql`，可讀取及修改 Wiki 資源，使用 Bearer token。這能作為 agent 的工具底層，不能直接當成原生 agent protocol。[GraphQL API](https://docs.requarks.io/dev/api)

Git module 支援雙向同步，要求專用 repository，文件明示不能只用子資料夾或 submodule；同步是定期進行，也能手動觸發。資料庫內容可輸出到 Git，因此不能將其說成純 Git 檔案就是唯一即時來源。[Git storage](https://docs.requarks.io/s/en/storage/git)

官方有 Markdown 等編輯器與 page history。尚未查證到符合本案所需的核心 global/local graph 或多階審核流程；這些不可預設已有。[Editors](https://docs.requarks.io/s/editors)、[Pages](https://docs.requarks.io/en/guide/pages)

Wiki.js 官方說明為 AGPL 授權。[About](https://js.wiki/about)

### BookStack：適合參考清楚導覽與人類編輯體驗

BookStack 主要是資料庫系統，正文主要保存為 HTML；使用 Markdown editor 時，原稿另保存在 `pages.markdown`。官方 REST API 提供核心內容與原始資料存取，適合透過程式建立／修改；這不是 Git 原生儲存。[Content Storage Format](https://www.bookstackapp.com/docs/admin/content-storage/)

官方功能包含頁面修訂、Markdown/WYSIWYG 編輯與角色權限。Tags 支援分類及值，適合借用為人類可讀 metadata，但 tag 本身不會強制執行審核狀態轉移。[BookStack 官網](https://www.bookstackapp.com/)、[Content Tags 文件入口](https://www.bookstackapp.com/docs/user/)

API token 的權限跟隨產生 token 的使用者；實例提供 `/api/docs`。授權為 MIT。[API 原始發布說明](https://www.bookstackapp.com/blog/beta-release-v0-28-0/)、[官方專案](https://github.com/BookStackApp/BookStack)

### XWiki：完整審核流程的參考

XWiki 提供 REST API，支援頁面與其他資源操作及身分驗證。其核心 API 可供 agent 串接，與專用 MCP／WebMCP 工具仍是兩回事。[REST API](https://www.xwiki.org/xwiki/bin/view/Documentation/UserGuide/Features/XWikiRESTfulAPI)

Publication Workflow 是擴充：草稿與已發布文件分開，contributors、moderators、publishers 依序處理，支援退回；不能將這套可選流程說成核心預設。這很適合用來思考 HatWiki「誰可改草稿、誰可發布、發布的是哪個 revision」。[Publication Workflow Application](https://extensions.xwiki.org/xwiki/bin/view/Extension/XWiki%20Publication%20Workflow%20Application)

Interactive Link Visualizer 也是擴充，可將 Wiki 頁面呈現為 network graph，支援 Solr facets 篩選；此來源證實全站視覺化，未在本輪確認 Obsidian 式逐頁 local graph 與 depth 操作。[官方發布說明](https://www.xwiki.org/xwiki/bin/view/Blog/Interactive%20Link%20Visualizer%20Application%201.4%20Released/)

平台程式為 LGPL 2.1；預設 XAR 文件另為 CC-BY。不要把程式授權與文件授權混成一項。[License](https://www.xwiki.org/xwiki/bin/view/Main/License)

### DokuWiki 與 TiddlyWiki：輕量模型的補充參考

DokuWiki 的官方核心原始碼以檔案讀寫 Wiki 內容；remote API 明列 getPage、getPageHistory、getPageBackLinks、lockPages、savePage 等方法，另檢查 remote 啟用與使用者權限。Graphviz 是外掛，將描述轉為圖，不能據此宣稱內建 Obsidian 型知識圖。官方網站本輪回應 402，這部分以官方原始碼交叉確認。主專案標示 GPL-2.0。[檔案 IO](https://raw.githubusercontent.com/dokuwiki/dokuwiki/master/inc/io.php)、[ApiCore](https://raw.githubusercontent.com/dokuwiki/dokuwiki/master/inc/Remote/ApiCore.php)、[API 權限](https://raw.githubusercontent.com/dokuwiki/dokuwiki/master/inc/Remote/Api.php)、[Graphviz 外掛](https://github.com/splitbrain/dokuwiki-plugin-graphviz)、[專案授權](https://github.com/dokuwiki/dokuwiki)

TiddlyWiki Node.js 版將 tiddlers 存為個別檔案；官方提醒執行中直接改檔不會即時生效，建議用 HTTP／JavaScript API。WebServer API 包含讀、寫、刪 tiddler；核心欄位包含 tags、modified、draft.of 等，可作為狀態 UI 的資料底層。TiddlyMap 為第三方圖譜外掛，不能視為核心；主專案為 BSD 3-Clause。[Node.js](https://tiddlywiki.com/static/TiddlyWiki%2520on%2520Node.js.html)、[WebServer API](https://tiddlywiki.com/static/WebServer%2520API.html)、[TiddlerFields](https://tiddlywiki.com/static/TiddlerFields.html)、[TiddlyMap](https://github.com/felixhayashi/TW5-TiddlyMap)、[License](https://tiddlywiki.com/static/License.html)

## 另列：Outline 是 source-available 參考

Outline 有文件 API，可作為人類編輯與程式編輯共用資料路徑的參考。但官方自架授權文件列 BSL 限制，不能與上述開源框架不加區別地統稱為開源選項。本輪不建議因 UI 類似就遷移。[Developers](https://www.getoutline.com/developers)、[License restrictions](https://docs.getoutline.com/s/hosting/doc/license-restrictions-f9aq6uEL3H)

## 給 HatWiki 的具體設計推論

1. **文章閱讀**：中央正文、側邊章節目錄、標題與短摘要、來源／引用、修訂歷史；局部圖放在輔助欄，完整全局圖保留獨立入口。
2. **狀態資料**：生命週期（draft／active／deprecated 等）、證據驗證、`stale_after` 時效、編輯／發布回執分開呈現。`active` 僅能說明生命週期，不能翻成「已查證」。具體欄位名與允許值須沿用／核對現有 OKF schema。
3. **人機同一份資料**：頁面 badge、列表篩選、graph 篩選及 API 回應從相同 metadata 派生，避免 UI 顯示的狀態與 agent 讀到的狀態不一致。
4. **可靠編輯**：agent 取得原稿、metadata 與 base revision 後提交變更，提供摘要、diff、衝突回應及可追查回執；人類也能透過同一修訂資料審閱。這是 API 設計目標，不能因有 API 就宣稱已達成。
5. **不急著遷移**：先借 MediaWiki 的閱讀與維護提示、Quartz 的 graph/backlinks、XWiki 的狀態責任分工；只有正式盤點發現現有引擎有無法合理補足的需求，才比較遷移成本。

## 查證限制

本輪未安裝或實跑任何框架，也未測試 HatWiki。未全面審計第三方 MCP／AI 插件，沒有把第三方工具等同官方核心。網站文件會更新，尤其 Quartz 5 的插件邊界及不同 Wiki.js 版本，正式採用前應固定版本再核對。授權資訊僅記錄官方標示，不構成個案法律判斷。
