export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const COOKIE_PREFS_NAME = "taxat_cookie_prefs";
export const COOKIE_PREFS_MAX_AGE = 60 * 60 * 24 * 365;

export const DEFAULT_COOKIE_PREFS: Pick<
  CookiePreferences,
  "necessary" | "analytics" | "functional" | "marketing"
> = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};

export function parseBoolean(input: unknown) {
  if (typeof input === "boolean") return input;
  if (typeof input === "number") return input === 1;
  if (typeof input === "string") {
    const normalized = input.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return false;
}

export function normalizeCookiePrefs(input: Partial<CookiePreferences>) {
  const updatedAt =
    typeof input.updatedAt === "string" && !Number.isNaN(Date.parse(input.updatedAt))
      ? input.updatedAt
      : new Date().toISOString();

  return {
    necessary: true,
    analytics: parseBoolean(input.analytics),
    functional: parseBoolean(input.functional),
    marketing: parseBoolean(input.marketing),
    updatedAt,
  } satisfies CookiePreferences;
}

export function isCookiePreferences(value: unknown): value is CookiePreferences {
  if (!value || typeof value !== "object") return false;
  const prefs = value as CookiePreferences;
  return (
    prefs.necessary === true &&
    typeof prefs.analytics === "boolean" &&
    typeof prefs.functional === "boolean" &&
    typeof prefs.marketing === "boolean" &&
    typeof prefs.updatedAt === "string" &&
    !Number.isNaN(Date.parse(prefs.updatedAt))
  );
}
