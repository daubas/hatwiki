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
  pageVersions: string;
  pageVersionsHint: string;
  pagePrimaryVersion: string;
  pageOtherVersion: string;
  pageSelectedVersion: string;
  pageViewDiff: string;
  pageVariantViews: string;
  pageVariantEndorsements: string;
  pageVariantDisagreements: string;
  wikiPageId: string;
  homeMapOverline: string;
  homeMapTitle: string;
  publicPages: string;
  wikiLinks: string;
  homeMapHint: string;
  homeCatalogTitle: string;
  homeOpenGraph: string;
  homeSearchHint: string;
  groupConcepts: string;
  groupWorkflows: string;
  groupEntities: string;
  groupFacts: string;
  groupComparisons: string;
  groupPrompts: string;
  groupCases: string;
  groupSources: string;
  groupOther: string;
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
  linksOut: string;
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
  editStatusPendingLive: string;
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
  draftWarning: string;
  staleWarning: string;
  draftBadge: string;
  showDrafts: string;
  hideDrafts: string;
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
    pageVersions: '公開版本',
    pageVersionsHint: '這一頁目前保留多個公開版本；你可以比較內容，再選擇想閱讀的版本。',
    pagePrimaryVersion: '目前主版本',
    pageOtherVersion: '其他版本',
    pageSelectedVersion: '目前閱讀',
    pageViewDiff: '查看與主版本的差異',
    pageVariantViews: '查看',
    pageVariantEndorsements: '認同',
    pageVariantDisagreements: '不同意',
    wikiPageId: '頁面 ID',
    homeMapOverline: '即時知識地圖',
    homeMapTitle: '資料進來，關係長出來。',
    publicPages: '公開頁面',
    wikiLinks: 'WikiLinks',
    homeMapHint: '拖曳探索 · 點擊節點閱讀',
    homeCatalogTitle: '目錄',
    homeOpenGraph: '打開完整圖譜',
    homeSearchHint: '在首頁直接搜尋全部頁面',
    groupConcepts: '概念與做法',
    groupWorkflows: '工作流',
    groupEntities: '實體',
    groupFacts: '事實',
    groupComparisons: '比較',
    groupPrompts: '提示詞',
    groupCases: '案例',
    groupSources: '來源摘要',
    groupOther: '其他',
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
    linksOut: '連出的頁面',
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
    editStatusPendingLive: '已提交候選分支，等待納入公開版本',
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
    draftWarning: '草稿：未經覆核，不可當作正式做法。',
    staleWarning: '此頁已過期（stale_after：{date}），內容可能已不適用，請先確認。',
    draftBadge: '草稿',
    showDrafts: '顯示草稿',
    hideDrafts: '隱藏草稿',
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
    pageVersions: 'Public versions',
    pageVersionsHint: 'This page keeps more than one public version. Compare them and choose the one you want to read.',
    pagePrimaryVersion: 'Current primary',
    pageOtherVersion: 'Other version',
    pageSelectedVersion: 'Currently reading',
    pageViewDiff: 'Compare with the primary version',
    pageVariantViews: 'views',
    pageVariantEndorsements: 'endorsements',
    pageVariantDisagreements: 'disagreements',
    wikiPageId: 'Page ID',
    homeMapOverline: 'LIVE KNOWLEDGE MAP',
    homeMapTitle: 'Add knowledge. Watch connections grow.',
    publicPages: 'public pages',
    wikiLinks: 'WikiLinks',
    homeMapHint: 'Drag to explore · Select a node to read',
    homeCatalogTitle: 'Contents',
    homeOpenGraph: 'Open the full graph',
    homeSearchHint: 'Search every page from here',
    groupConcepts: 'Concepts',
    groupWorkflows: 'Workflows',
    groupEntities: 'Entities',
    groupFacts: 'Facts',
    groupComparisons: 'Comparisons',
    groupPrompts: 'Prompts',
    groupCases: 'Cases',
    groupSources: 'Sources',
    groupOther: 'Other',
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
    linksOut: 'outgoing links',
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
    editStatusPendingLive: 'Saved to a contributor branch; awaiting the public version',
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
    draftWarning: 'Draft: not reviewed. Do not treat as an official practice.',
    staleWarning: 'This page is stale (stale_after: {date}). Its content may no longer apply; verify before relying on it.',
    draftBadge: 'Draft',
    showDrafts: 'Show drafts',
    hideDrafts: 'Hide drafts',
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
