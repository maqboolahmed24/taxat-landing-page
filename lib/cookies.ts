export type SameSiteValue = "Lax" | "Strict" | "None";

export type CookieOptions = {
  domain?: string;
  path?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: SameSiteValue;
};

export function parseCookieHeader(header: string) {
  const result: Record<string, string> = {};
  if (!header) return result;
  const parts = header.split(";");
  for (const part of parts) {
    const [rawName, ...rawValueParts] = part.split("=");
    if (!rawName) continue;
    const name = rawName.trim();
    if (!name) continue;
    const value = rawValueParts.join("=").trim();
    result[name] = value;
  }
  return result;
}

export function getCookieValue(header: string, name: string) {
  const raw = parseCookieHeader(header)[name];
  if (raw === undefined) return null;
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
}

export function serializeCookie(name: string, value: string, options: CookieOptions = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  const path = options.path ?? "/";
  if (path) parts.push(`Path=${path}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (typeof options.maxAge === "number") {
    const maxAge = Math.floor(options.maxAge);
    parts.push(`Max-Age=${maxAge}`);
    if (maxAge <= 0) {
      parts.push("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    }
  }
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.secure) parts.push("Secure");
  if (options.httpOnly) parts.push("HttpOnly");
  return parts.join("; ");
}

export function normalizeCookieDomain(raw?: string) {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  const withoutDot = trimmed.startsWith(".") ? trimmed.slice(1) : trimmed;
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(withoutDot)) return undefined;
  if (!withoutDot || withoutDot === "localhost" || !withoutDot.includes(".")) return undefined;
  if (withoutDot.endsWith(".localhost")) return undefined;
  return trimmed.startsWith(".") ? trimmed : `.${trimmed}`;
}

export function resolveSameSite(raw: string | undefined, secure: boolean): SameSiteValue {
  const normalized = raw?.trim().toLowerCase();
  if (normalized === "strict") return "Strict";
  if (normalized === "lax") return "Lax";
  if (normalized === "none") return secure ? "None" : "Lax";
  return secure ? "None" : "Lax";
}
