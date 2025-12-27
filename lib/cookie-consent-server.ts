import { createHmac, timingSafeEqual } from "crypto";
import { COOKIE_PREFS_NAME, type CookiePreferences, isCookiePreferences } from "@/lib/cookie-consent-shared";
import { getCookieValue } from "@/lib/cookies";

const COOKIE_PREFS_VERSION = 1;

export type CookieReadResult = {
  prefs: CookiePreferences | null;
  invalid: boolean;
};

function getConsentSecret() {
  const secret = process.env.COOKIE_CONSENT_SECRET;
  if (secret) return secret;

  const fallback =
    process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "dev-insecure-cookie-secret";
  if (process.env.NODE_ENV === "production") {
    console.warn("COOKIE_CONSENT_SECRET is missing; using a fallback secret.");
  }
  return fallback;
}

function signPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function timingSafeEqualString(a: string, b: string) {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function encodeCookiePrefs(prefs: CookiePreferences) {
  const payload = JSON.stringify({ v: COOKIE_PREFS_VERSION, prefs });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = signPayload(encoded, getConsentSecret());
  return `${encoded}.${signature}`;
}

export function decodeCookiePrefs(value: string | null | undefined): CookieReadResult {
  if (!value) return { prefs: null, invalid: false };
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return { prefs: null, invalid: true };

  const expected = signPayload(encoded, getConsentSecret());
  if (!timingSafeEqualString(expected, signature)) {
    return { prefs: null, invalid: true };
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!payload || payload.v !== COOKIE_PREFS_VERSION || !payload.prefs) {
      return { prefs: null, invalid: true };
    }
    if (!isCookiePreferences(payload.prefs)) {
      return { prefs: null, invalid: true };
    }
    return { prefs: payload.prefs, invalid: false };
  } catch {
    return { prefs: null, invalid: true };
  }
}

export function readCookiePrefsFromRequest(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const raw = getCookieValue(cookieHeader, COOKIE_PREFS_NAME);
  return decodeCookiePrefs(raw);
}
