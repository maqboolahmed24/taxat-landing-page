import {
  COOKIE_PREFS_NAME,
  COOKIE_PREFS_MAX_AGE,
  DEFAULT_COOKIE_PREFS,
  type CookiePreferences,
  isCookiePreferences,
  normalizeCookiePrefs,
} from "@/lib/cookie-consent-shared";
import { normalizeCookieDomain, resolveSameSite, serializeCookie } from "@/lib/cookies";

export { COOKIE_PREFS_NAME, COOKIE_PREFS_MAX_AGE, DEFAULT_COOKIE_PREFS };
export type { CookiePreferences };

export const COOKIE_SETTINGS_EVENT = "taxat:cookie-settings";
export const COOKIE_CONSENT_UPDATED_EVENT = "taxat:cookie-consent-updated";

const OPEN_SETTINGS_FLAG = "__taxatOpenCookieSettings";
const CONSENT_CHANNEL_NAME = "taxat-cookie-consent";

let cachedPrefs: CookiePreferences | null = null;
let consentChannel: BroadcastChannel | null = null;

function getConsentChannel() {
  if (typeof window === "undefined") return null;
  if (!("BroadcastChannel" in window)) return null;
  if (!consentChannel) {
    consentChannel = new BroadcastChannel(CONSENT_CHANNEL_NAME);
  }
  return consentChannel;
}

function getClientCookieOptions() {
  const secure = typeof location !== "undefined" && location.protocol === "https:";
  const inferredHost =
    typeof location !== "undefined" ? location.hostname.replace(/^www\./, "") : undefined;
  const domain =
    normalizeCookieDomain(process.env.NEXT_PUBLIC_COOKIE_DOMAIN) ??
    normalizeCookieDomain(inferredHost);
  const sameSite = resolveSameSite(process.env.NEXT_PUBLIC_COOKIE_SAMESITE, secure);
  return { path: "/", secure, sameSite, domain };
}

export function buildCookiePrefs(input: Partial<CookiePreferences>) {
  return normalizeCookiePrefs(input);
}

export function readCookiePrefs() {
  return cachedPrefs;
}

export function setCachedCookiePrefs(prefs: CookiePreferences | null) {
  cachedPrefs = prefs;
}

export function clearCachedCookiePrefs() {
  setCachedCookiePrefs(null);
}

export function broadcastConsentUpdate(prefs: CookiePreferences) {
  const channel = getConsentChannel();
  channel?.postMessage(prefs);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: prefs }));
  }
}

export function subscribeToConsentUpdates(handler: (prefs: CookiePreferences) => void) {
  const channel = getConsentChannel();
  const onMessage = (event: MessageEvent) => {
    if (isCookiePreferences(event.data)) handler(event.data);
  };
  if (channel) channel.addEventListener("message", onMessage);

  const onEvent = (event: Event) => {
    const detail = (event as CustomEvent).detail;
    if (isCookiePreferences(detail)) handler(detail);
  };
  if (typeof window !== "undefined") {
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, onEvent);
  }

  return () => {
    if (channel) channel.removeEventListener("message", onMessage);
    if (typeof window !== "undefined") {
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, onEvent);
    }
  };
}

export function flagCookieSettingsOpen() {
  if (typeof window === "undefined") return;
  (window as typeof window & Record<string, boolean>)[OPEN_SETTINGS_FLAG] = true;
}

export function consumeCookieSettingsOpenFlag() {
  if (typeof window === "undefined") return false;
  const value = (window as typeof window & Record<string, boolean>)[OPEN_SETTINGS_FLAG];
  if (value) {
    (window as typeof window & Record<string, boolean>)[OPEN_SETTINGS_FLAG] = false;
    return true;
  }
  return false;
}

export function deleteClientCookie(name: string) {
  if (typeof document === "undefined") return;
  const options = getClientCookieOptions();
  document.cookie = serializeCookie(name, "", { ...options, maxAge: 0 });
  if (options.domain) {
    document.cookie = serializeCookie(name, "", { ...options, domain: undefined, maxAge: 0 });
  }
}

export function hasAnalyticsConsent() {
  return readCookiePrefs()?.analytics ?? false;
}

export function hasMarketingConsent() {
  return readCookiePrefs()?.marketing ?? false;
}
