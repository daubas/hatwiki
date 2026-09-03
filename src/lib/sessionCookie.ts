import type { EditActor } from './editContracts.ts';

const COOKIE_NAME = '__Host-hatwiki_session';
const MAX_AGE = 24 * 60 * 60;

function base64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function decode(value: string): Uint8Array {
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  return Uint8Array.from(atob(normalized), (character) => character.charCodeAt(0));
}

async function signature(secret: string, payload: string): Promise<string> {
  if (secret.length < 32) throw new Error('invalid_secret');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))));
}

function same(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

export async function createSessionCookie(secret: string, actor: EditActor, now = new Date()): Promise<string> {
  const payload = base64url(new TextEncoder().encode(JSON.stringify({ userId: actor.userId, login: actor.login, exp: Math.floor(now.getTime() / 1000) + MAX_AGE })));
  return `${COOKIE_NAME}=${payload}.${await signature(secret, payload)}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
}

export async function readSessionCookie(secret: string, header: string | null, now = new Date()): Promise<EditActor | null> {
  try {
    const value = header?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
    if (!value) return null;
    const [payload, supplied, extra] = value.split('.');
    if (!payload || !supplied || extra || !same(await signature(secret, payload), supplied)) return null;
    const parsed = JSON.parse(new TextDecoder().decode(decode(payload))) as { userId?: unknown; login?: unknown; exp?: unknown };
    if (!Number.isSafeInteger(parsed.userId) || Number(parsed.userId) <= 0 || typeof parsed.login !== 'string' || !parsed.login || typeof parsed.exp !== 'number' || parsed.exp < now.getTime() / 1000) return null;
    return { userId: Number(parsed.userId), login: parsed.login };
  } catch {
    return null;
  }
}
