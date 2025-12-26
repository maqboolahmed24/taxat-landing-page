import { SITE_URL } from "@/lib/site";
import { normalizeCookieDomain, resolveSameSite, serializeCookie, type CookieOptions } from "@/lib/cookies";

function inferDomainFromHost(host: string | null) {
  if (!host) return undefined;
  const hostname = host.split(":")[0]?.trim().toLowerCase();
  if (!hostname || hostname === "localhost" || !hostname.includes(".")) return undefined;
  const withoutWww = hostname.replace(/^www\./, "");
  return normalizeCookieDomain(withoutWww);
}

function isSecureRequest(req: Request) {
  const forwardedProto = req.headers.get("x-forwarded-proto");
  if (forwardedProto) {
    return forwardedProto.split(",")[0]?.trim() === "https";
  }
  try {
    return new URL(req.url).protocol === "https:";
  } catch {
    return SITE_URL.startsWith("https://");
  }
}

export function getCookieBaseOptions(req: Request): CookieOptions {
  const secure = isSecureRequest(req);
  const domain =
    normalizeCookieDomain(process.env.COOKIE_DOMAIN ?? process.env.NEXT_PUBLIC_COOKIE_DOMAIN) ??
    inferDomainFromHost(req.headers.get("host"));
  const sameSite = resolveSameSite(
    process.env.COOKIE_SAMESITE ?? process.env.NEXT_PUBLIC_COOKIE_SAMESITE,
    secure
  );
  return {
    path: "/",
    secure,
    sameSite,
    domain,
  };
}

export function buildCookieHeader(name: string, value: string, options: CookieOptions) {
  return serializeCookie(name, value, { path: "/", ...options });
}

export function buildCookieClearHeaders(name: string, baseOptions: CookieOptions) {
  const headers = [serializeCookie(name, "", { path: "/", ...baseOptions, maxAge: 0 })];
  if (baseOptions.domain) {
    headers.push(
      serializeCookie(name, "", {
        path: "/",
        ...baseOptions,
        domain: undefined,
        maxAge: 0,
      })
    );
  }
  return headers;
}
