import { NextResponse } from "next/server";
import {
  COOKIE_PREFS_MAX_AGE,
  COOKIE_PREFS_NAME,
  normalizeCookiePrefs,
} from "@/lib/cookie-consent-shared";
import { encodeCookiePrefs, readCookiePrefsFromRequest } from "@/lib/cookie-consent-server";
import { buildCookieClearHeaders, buildCookieHeader, getCookieBaseOptions } from "@/lib/cookie-server";
import { SITE_URL } from "@/lib/site";
import { getCookieValue } from "@/lib/cookies";
import { CLIENT_ID_COOKIE } from "@/lib/cookie-details";

export const runtime = "nodejs";

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  const res = NextResponse.json(body, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function safeHost(value: string | null) {
  if (!value) return null;
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

function normalizeHost(value: string | null) {
  if (!value) return null;
  const host = value.trim().toLowerCase();
  if (!host) return null;
  return host.split(":")[0]?.trim() ?? null;
}

function stripWww(host: string) {
  return host.replace(/^www\./, "");
}

function isAllowedOrigin(req: Request) {
  const allowedHost = normalizeHost(safeHost(SITE_URL));
  const originHost = normalizeHost(safeHost(req.headers.get("origin")));
  const refererHost = normalizeHost(safeHost(req.headers.get("referer")));
  const requestHost = normalizeHost(req.headers.get("host"));
  const vercelHost = normalizeHost(process.env.VERCEL_URL ?? null);
  const candidate = originHost ?? refererHost;

  if (!candidate) return process.env.NODE_ENV !== "production";

  const normalizedCandidate = stripWww(candidate);
  const allowedHosts = [allowedHost, requestHost, vercelHost]
    .filter(Boolean)
    .map((host) => stripWww(host as string));

  if (allowedHosts.includes(normalizedCandidate)) return true;

  if (
    process.env.NODE_ENV !== "production" &&
    (candidate.startsWith("localhost") || candidate.startsWith("127.0.0.1"))
  ) {
    return true;
  }

  return false;
}

export async function GET(req: Request) {
  if (!isAllowedOrigin(req)) {
    return jsonResponse({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  const { prefs, invalid } = readCookiePrefsFromRequest(req);
  const cookieHeader = req.headers.get("cookie") ?? "";
  const clientIdPresent = Boolean(getCookieValue(cookieHeader, CLIENT_ID_COOKIE));
  const res = jsonResponse({ ok: true, prefs, clientIdPresent });
  if (invalid) {
    const baseOptions = { ...getCookieBaseOptions(req), httpOnly: true };
    for (const header of buildCookieClearHeaders(COOKIE_PREFS_NAME, baseOptions)) {
      res.headers.append("Set-Cookie", header);
    }
  }
  return res;
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return jsonResponse({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const prefs = normalizeCookiePrefs({
    analytics: payload.analytics,
    functional: payload.functional,
    marketing: payload.marketing,
  });

  const value = encodeCookiePrefs(prefs);
  const baseOptions = getCookieBaseOptions(req);
  const cookieHeader = buildCookieHeader(COOKIE_PREFS_NAME, value, {
    ...baseOptions,
    httpOnly: true,
    maxAge: COOKIE_PREFS_MAX_AGE,
  });

  const res = jsonResponse({ ok: true, prefs });
  res.headers.append("Set-Cookie", cookieHeader);

  if (baseOptions.domain) {
    const legacyHeader = buildCookieHeader(COOKIE_PREFS_NAME, value, {
      ...baseOptions,
      domain: undefined,
      httpOnly: true,
      maxAge: COOKIE_PREFS_MAX_AGE,
    });
    res.headers.append("Set-Cookie", legacyHeader);
  }

  return res;
}

export async function DELETE(req: Request) {
  if (!isAllowedOrigin(req)) {
    return jsonResponse({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  const res = jsonResponse({ ok: true });
  const baseOptions = { ...getCookieBaseOptions(req), httpOnly: true };
  for (const header of buildCookieClearHeaders(COOKIE_PREFS_NAME, baseOptions)) {
    res.headers.append("Set-Cookie", header);
  }
  return res;
}
