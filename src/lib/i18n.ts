export type Locale = 'zh-Hant' | 'en';

export const DEFAULT_LOCALE: Locale = 'zh-Hant';
export const LOCALES: readonly Locale[] = [DEFAULT_LOCALE, 'en'];

export interface UiMessages {
  metaDescription: string;
  wiki: string;
  graph: string;
  login: string;
  language: string;
  primaryNavigation: string;
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
  homeBrowseOverline: string;
  homeBrowseTitle: string;
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
  changeSummary: string;
  publishAuthorization: string;
  submitEdit: string;
  signInFirst: string;
  completed: string;
  unableToSubmit: string;
  sources: string;
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
    login: '登入',
    language: '語言',
    primaryNavigation: '主要導覽',
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
    homeBrowseOverline: '瀏覽 Wiki',
    homeBrowseTitle: '從一個節點開始',
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
    changeSummary: '修改說明',
    publishAuthorization: '我確認有權將這份內容公開到 HatWiki。',
    submitEdit: '送出修改',
    signInFirst: '先用 GitHub 登入',
    completed: '已完成',
    unableToSubmit: '無法送出',
    sources: '來源',
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
    login: 'Log in',
    language: 'Language',
    primaryNavigation: 'Primary navigation',
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
    homeBrowseOverline: 'BROWSE THE WIKI',
    homeBrowseTitle: 'Start from one node',
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
    changeSummary: 'Change summary',
    publishAuthorization: 'I confirm that I am authorized to publish this content to HatWiki.',
    submitEdit: 'Submit edit',
    signInFirst: 'Sign in with GitHub first',
    completed: 'Completed',
    unableToSubmit: 'Unable to submit',
    sources: 'Sources',
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
