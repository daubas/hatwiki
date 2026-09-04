export type Locale = 'zh-Hant' | 'en';

export const DEFAULT_LOCALE: Locale = 'zh-Hant';
export const LOCALES: readonly Locale[] = [DEFAULT_LOCALE, 'en'];

export interface UiMessages {
  metaDescription: string;
  wiki: string;
  graph: string;
  addSource: string;
  login: string;
  logout: string;
  signedInAs: string;
  language: string;
  primaryNavigation: string;
  breadcrumbs: string;
  home: string;
  tagline: string;
  wikiIndexTitle: string;
  wikiIndexDescription: string;
  wikiIndexBack: string;
  wikiSearchLabel: string;
  wikiSearchPlaceholder: string;
  wikiSearchClear: string;
  wikiSearchHint: string;
  wikiSearchEmpty: string;
  wikiResultCount: string;
  wikiContents: string;
  wikiRelated: string;
  wikiPageId: string;
  homeStatus: string;
  homeOverline: string;
  homeTitle1: string;
  homeTitle2: string;
  homeTitle3: string;
  homeLede: string;
  homeExplore: string;
  homeRead: string;
  homeOpenGraph: string;
  homeMapOverline: string;
  homeMapTitle: string;
  publicPages: string;
  wikiLinks: string;
  homeMapHint: string;
  homeCollaborateOverline: string;
  homeCollaborateTitle: string;
  homeCollaborateBody: string;
  homeCollaborateAction: string;
  homeCollaborateStatus: string;
  homeCollaborateStep1: string;
  homeCollaborateStep2: string;
  homeCollaborateStep3: string;
  homeBrowseOverline: string;
  homeBrowseTitle: string;
  homeBrowseAll: string;
  graphRevision: string;
  graphHeading: string;
  graphDescription: string;
  graphLoom: string;
  graphMap: string;
  graphPages: string;
  graphLinks: string;
  graphScaleHint: string;
  graphReset: string;
  graphAriaLoom: string;
  graphAriaMap: string;
  backlinks: string;
  neighbors: string;
  edit: string;
  editBack: string;
  editReadOnly: string;
  editLoading: string;
  editReady: string;
  editPreview: string;
  editNoChanges: string;
  viewWiki: string;
  viewCommit: string;
  changeAffected: string;
  changeCitations: string;
  changeLinks: string;
  changeUnresolved: string;
  editFormLegend: string;
  editContent: string;
  editContentHint: string;
  changeSummary: string;
  editReasonHint: string;
  editReasonPlaceholder: string;
  publishAuthorization: string;
  submitEdit: string;
  signInFirst: string;
  completed: string;
  unableToSubmit: string;
  editStatusCommitted: string;
  editStatusConflict: string;
  editStatusApproval: string;
  editStatusUnknown: string;
  editErrorAuthentication: string;
  editErrorCrossOrigin: string;
  editErrorAuthorization: string;
  editErrorInvalidInput: string;
  editErrorNotFound: string;
  editErrorSourceNotFound: string;
  editErrorSourceMismatch: string;
  editErrorSourceCitation: string;
  editErrorSourceUsed: string;
  editErrorAppNotConfigured: string;
  editErrorUnknown: string;
  editNetworkError: string;
  sources: string;
  sourceUnavailable: string;
  linkDiagnostics: string;
  linkAmbiguous: string;
  linkUnresolved: string;
  notFound: string;
  authAppNotConfigured: string;
  authInvalidLogin: string;
  authLoginFailed: string;
}

export const ui: Record<Locale, UiMessages> = {
  'zh-Hant': {
    metaDescription: '人與 Agent 共同編織的開放知識庫。',
    wiki: 'Wiki',
    graph: '圖譜',
    addSource: '加入資料',
    login: '登入',
    logout: '登出',
    signedInAs: '已登入',
    language: '語言',
    primaryNavigation: '主要導覽',
    breadcrumbs: '麵包屑導覽',
    home: 'HatWiki 首頁',
    tagline: '人與 Agent 共同編織',
    wikiIndexTitle: 'Wiki 索引',
    wikiIndexDescription: '搜尋公開頁面、頁面 ID、描述與標籤，從一個節點開始。',
    wikiIndexBack: '回首頁',
    wikiSearchLabel: '搜尋公開頁面',
    wikiSearchPlaceholder: '輸入標題、頁面 ID、描述或標籤…',
    wikiSearchClear: '清除搜尋',
    wikiSearchHint: '可用標題、頁面 ID、描述或標籤搜尋。',
    wikiSearchEmpty: '找不到符合的頁面。',
    wikiResultCount: '個結果',
    wikiContents: '本頁目錄',
    wikiRelated: '相關頁面',
    wikiPageId: '頁面 ID',
    homeStatus: '公開 Wiki · Git 版本管理',
    homeOverline: 'HATWIKI / 共同知識',
    homeTitle1: '人與 Agent',
    homeTitle2: '共同編織的',
    homeTitle3: '知識地圖',
    homeLede: '把原始資料、人的判斷與 Agent 整理出的脈絡，留成可追查、可修正，也能跨 session 繼續使用的共同記憶。',
    homeExplore: '開始探索 HatWiki',
    homeRead: '開始閱讀',
    homeOpenGraph: '打開完整圖譜',
    homeMapOverline: '即時知識地圖',
    homeMapTitle: '資料進來，關係長出來。',
    publicPages: '公開頁面',
    wikiLinks: 'WikiLinks',
    homeMapHint: '拖曳探索 · 點擊節點閱讀',
    homeCollaborateOverline: '共同編輯',
    homeCollaborateTitle: '從一份資料，開始一起整理。',
    homeCollaborateBody: '先把文字資料私密保存，再由你的 Agent 整理進既有 Wiki 頁面；你可以檢查差異後再發布。',
    homeCollaborateAction: '加入文字資料',
    homeCollaborateStatus: '目前可用流程',
    homeCollaborateStep1: '保存來源',
    homeCollaborateStep2: '整理草稿',
    homeCollaborateStep3: '檢查並發布',
    homeBrowseOverline: '瀏覽 Wiki',
    homeBrowseTitle: '從一個節點開始',
    homeBrowseAll: '查看所有頁面',
    graphRevision: '版本',
    graphHeading: 'Wiki 圖譜',
    graphDescription: '每個節點是一頁 Wiki；連線來自頁面中的 WikiLink 或標準 Markdown 連結。',
    graphLoom: '知識織圖',
    graphMap: 'WikiLink 圖譜',
    graphPages: '頁面',
    graphLinks: '連結',
    graphScaleHint: '節點越大，連線越多',
    graphReset: '回到全圖',
    graphAriaLoom: 'Wiki 頁面的知識關係圖',
    graphAriaMap: 'Wiki 頁面關係圖',
    backlinks: '反向連結',
    neighbors: '相鄰頁面',
    edit: '編輯',
    editBack: '回到頁面',
    editReadOnly: '這一頁尚未同步 Git revision，現在只能閱讀。',
    editLoading: '正在從 GitHub 取得最新版本…',
    editReady: '已取得 GitHub 最新版本，可以開始修改。',
    editPreview: '送出前差異',
    editNoChanges: '目前沒有修改。',
    viewWiki: '開啟 Wiki 頁面',
    viewCommit: '查看 Git commit',
    changeAffected: '更新頁面',
    changeCitations: '引用',
    changeLinks: 'WikiLinks',
    changeUnresolved: '待確認',
    editFormLegend: '編輯 Wiki 頁面',
    editContent: 'Markdown 內容',
    editContentHint: '保留 Markdown 語法；送出前請確認內容可以公開。',
    changeSummary: '修改說明',
    editReasonHint: '簡短說明這次修改，最多 160 字。',
    editReasonPlaceholder: '例如：補充來源與修正連結',
    publishAuthorization: '我確認有權將這份內容公開到 HatWiki。',
    submitEdit: '送出修改',
    signInFirst: '先用 GitHub 登入',
    completed: '已完成',
    unableToSubmit: '無法送出',
    editStatusCommitted: '已提交',
    editStatusConflict: '發生衝突，已保留候選版本',
    editStatusApproval: '已送出，等待審核',
    editStatusUnknown: '已收到回應',
    editErrorAuthentication: '需要先登入',
    editErrorCrossOrigin: '請從 HatWiki 頁面送出',
    editErrorAuthorization: '需要確認發佈權限',
    editErrorInvalidInput: '內容或欄位格式無效',
    editErrorNotFound: '找不到頁面',
    editErrorSourceNotFound: '找不到這筆資料任務，或它不屬於目前帳號',
    editErrorSourceMismatch: '這筆資料指定的是另一個 Wiki 頁面',
    editErrorSourceCitation: '修改內容必須保留這筆資料的引用編號',
    editErrorSourceUsed: '這筆資料已由另一個修改請求處理',
    editErrorAppNotConfigured: 'GitHub App 尚未設定完成',
    editErrorUnknown: '請稍後再試',
    editNetworkError: '網路連線失敗，請稍後再試',
    sources: '來源',
    sourceUnavailable: '原始證據未公開',
    linkDiagnostics: '連結診斷',
    linkAmbiguous: '有多個可能頁面',
    linkUnresolved: '找不到目標頁面',
    notFound: '找不到頁面',
    authAppNotConfigured: 'GitHub App 尚未設定完成',
    authInvalidLogin: '登入請求無效',
    authLoginFailed: 'GitHub 登入失敗',
  },
  en: {
    metaDescription: 'An open knowledge base woven together by humans and agents.',
    wiki: 'Wiki',
    graph: 'Graph',
    addSource: 'Add source',
    login: 'Log in',
    logout: 'Log out',
    signedInAs: 'Signed in',
    language: 'Language',
    primaryNavigation: 'Primary navigation',
    breadcrumbs: 'Breadcrumb',
    home: 'HatWiki homepage',
    tagline: 'Humans and Agents Together',
    wikiIndexTitle: 'Wiki index',
    wikiIndexDescription: 'Search public pages, page IDs, descriptions, and tags. Start from one node.',
    wikiIndexBack: 'Back home',
    wikiSearchLabel: 'Search public pages',
    wikiSearchPlaceholder: 'Search titles, page IDs, descriptions, or tags…',
    wikiSearchClear: 'Clear search',
    wikiSearchHint: 'Search by title, page ID, description, or tag.',
    wikiSearchEmpty: 'No pages match your search.',
    wikiResultCount: 'results',
    wikiContents: 'On this page',
    wikiRelated: 'Related pages',
    wikiPageId: 'Page ID',
    homeStatus: 'Public wiki · Git-backed',
    homeOverline: 'HATWIKI / SHARED KNOWLEDGE',
    homeTitle1: 'Humans + agents',
    homeTitle2: 'weave a shared',
    homeTitle3: 'knowledge map',
    homeLede: 'Turn source material, human judgment, and agent-made connections into shared memory that stays traceable, editable, and useful across sessions.',
    homeExplore: 'Start exploring HatWiki',
    homeRead: 'Start reading',
    homeOpenGraph: 'Open the full graph',
    homeMapOverline: 'LIVE KNOWLEDGE MAP',
    homeMapTitle: 'Add knowledge. Watch connections grow.',
    publicPages: 'public pages',
    wikiLinks: 'WikiLinks',
    homeMapHint: 'Drag to explore · Select a node to read',
    homeCollaborateOverline: 'COLLABORATIVE EDITING',
    homeCollaborateTitle: 'Start together from one source.',
    homeCollaborateBody: 'Store a text source privately, let your Agent organize it into an existing Wiki page, then review the diff before publishing.',
    homeCollaborateAction: 'Add a text source',
    homeCollaborateStatus: 'Available now',
    homeCollaborateStep1: 'Store source',
    homeCollaborateStep2: 'Shape the draft',
    homeCollaborateStep3: 'Review and publish',
    homeBrowseOverline: 'BROWSE THE WIKI',
    homeBrowseTitle: 'Start from one node',
    homeBrowseAll: 'View all pages',
    graphRevision: 'Revision',
    graphHeading: 'Wiki graph',
    graphDescription: 'Each node is a Wiki page. Links come from WikiLinks and standard Markdown links.',
    graphLoom: 'Knowledge Loom',
    graphMap: 'WikiLink Graph',
    graphPages: 'pages',
    graphLinks: 'links',
    graphScaleHint: 'Larger nodes have more connections',
    graphReset: 'Reset view',
    graphAriaLoom: 'Knowledge relationship graph of Wiki pages',
    graphAriaMap: 'Wiki page relationship graph',
    backlinks: 'backlinks',
    neighbors: 'neighboring pages',
    edit: 'Edit',
    editBack: 'Back to page',
    editReadOnly: 'This page has not synced a Git revision yet and is currently read-only.',
    editLoading: 'Loading the latest version from GitHub…',
    editReady: 'The latest GitHub version is ready to edit.',
    editPreview: 'Changes before publishing',
    editNoChanges: 'No changes yet.',
    viewWiki: 'Open Wiki page',
    viewCommit: 'View Git commit',
    changeAffected: 'Affected pages',
    changeCitations: 'Citations',
    changeLinks: 'WikiLinks',
    changeUnresolved: 'Unresolved',
    editFormLegend: 'Edit Wiki page',
    editContent: 'Markdown content',
    editContentHint: 'Keep Markdown syntax; make sure the content is safe to publish.',
    changeSummary: 'Change summary',
    editReasonHint: 'Briefly describe this change, up to 160 characters.',
    editReasonPlaceholder: 'e.g. Add sources and fix links',
    publishAuthorization: 'I confirm that I am authorized to publish this content to HatWiki.',
    submitEdit: 'Submit edit',
    signInFirst: 'Sign in with GitHub first',
    completed: 'Completed',
    unableToSubmit: 'Unable to submit',
    editStatusCommitted: 'Committed',
    editStatusConflict: 'Conflict saved as a candidate version',
    editStatusApproval: 'Submitted for review',
    editStatusUnknown: 'Response received',
    editErrorAuthentication: 'Sign-in required',
    editErrorCrossOrigin: 'Submit from the HatWiki page',
    editErrorAuthorization: 'Publishing authorization is required',
    editErrorInvalidInput: 'Invalid input',
    editErrorNotFound: 'Page not found',
    editErrorSourceNotFound: 'This source task was not found or belongs to another account',
    editErrorSourceMismatch: 'This source task targets another Wiki page',
    editErrorSourceCitation: 'The edit must include this source task’s citation ID',
    editErrorSourceUsed: 'Another edit request already used this source task',
    editErrorAppNotConfigured: 'The GitHub App is not configured',
    editErrorUnknown: 'Please try again later',
    editNetworkError: 'Network error. Please try again later.',
    sources: 'Sources',
    sourceUnavailable: 'Raw evidence is not public',
    linkDiagnostics: 'Link diagnostics',
    linkAmbiguous: 'Multiple possible pages',
    linkUnresolved: 'Target page not found',
    notFound: 'Page not found',
    authAppNotConfigured: 'The GitHub App is not configured',
    authInvalidLogin: 'Invalid login request',
    authLoginFailed: 'GitHub login failed',
  },
};

export type UiKey = keyof UiMessages;

export function getLocale(url: URL): Locale {
  return url.searchParams.get('lang') === 'en' ? 'en' : DEFAULT_LOCALE;
}

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}

export function switchLocaleUrl(url: URL, locale: Locale): string {
  const next = new URL(url);
  if (locale === DEFAULT_LOCALE) next.searchParams.delete('lang');
  else next.searchParams.set('lang', locale);
  return `${next.pathname}${next.search}${next.hash}`;
}

export function withLocale(path: string, locale: Locale): string {
  return switchLocaleUrl(new URL(path, 'https://hatwiki.local'), locale);
}
