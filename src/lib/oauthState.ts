import { DEFAULT_LOCALE, type Locale } from './i18n.ts';

const NAME = '__Host-hatwiki_oauth_state';

function base64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

export function createOAuthState(locale: Locale) {
  const randomState = base64url(crypto.getRandomValues(new Uint8Array(32)));
  const state = `${locale === 'en' ? 'e' : 'z'}${randomState.slice(1)}`;
  return {
    state,
    cookie: `${NAME}=${state}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
  };
}

export function localeFromOAuthState(state: string | null): Locale {
  return state?.[0] === 'e' ? 'en' : DEFAULT_LOCALE;
}

export function readOAuthState(header: string | null): string | null {
  return header?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${NAME}=`))?.slice(NAME.length + 1) || null;
}

export const clearOAuthStateCookie = `${NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
