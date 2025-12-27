"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  buildCookiePrefs,
  DEFAULT_COOKIE_PREFS,
  COOKIE_SETTINGS_EVENT,
  readCookiePrefs,
  setCachedCookiePrefs,
  clearCachedCookiePrefs,
  broadcastConsentUpdate,
  consumeCookieSettingsOpenFlag,
  deleteClientCookie,
  subscribeToConsentUpdates,
  type CookiePreferences,
} from "@/lib/cookie-consent";
import { CLIENT_ID_COOKIE, COOKIE_DETAILS } from "@/lib/cookie-details";
import { COOKIE_PREFS_NAME } from "@/lib/cookie-consent-shared";

type CookieBannerProps = {
  initialPrefs: CookiePreferences | null;
  initialPrefsInvalid?: boolean;
  clientIdPresent?: boolean;
};

type ToggleProps = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  hint?: string;
};

function ToggleRow({ id, title, description, checked, disabled, onChange, hint }: ToggleProps) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <label className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-surface/40 p-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <div className="text-sm font-medium text-text">{title}</div>
        <p className="text-xs leading-relaxed text-muted">{description}</p>
      </div>
      <div className={cn("flex items-center gap-2", hint && "flex-col items-end gap-1")}>
        <div className="flex items-center gap-2">
          <input
            id={id}
            type="checkbox"
            role="switch"
            aria-describedby={hintId}
            className="peer sr-only"
            checked={checked}
            disabled={disabled}
            onChange={(event) => onChange?.(event.target.checked)}
          />
          <span
            aria-hidden="true"
            className={cn(
              "relative h-5 w-9 rounded-full border border-border/70 bg-surface/60 transition-colors",
              "peer-checked:border-accent/60 peer-checked:bg-accent/70",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40",
              "after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow",
              "after:content-[''] after:transition-transform peer-checked:after:translate-x-4",
              disabled && "opacity-60"
            )}
          />
        </div>
        {hint ? (
          <span id={hintId} className="text-[11px] leading-none text-muted whitespace-nowrap">
            {hint}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export default function CookieBanner({
  initialPrefs,
  initialPrefsInvalid = false,
  clientIdPresent = false,
}: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(!initialPrefs);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draftPrefs, setDraftPrefs] = useState<CookiePreferences>(
    buildCookiePrefs(initialPrefs ?? DEFAULT_COOKIE_PREFS)
  );
  const [clientIdStatus, setClientIdStatus] = useState<boolean | null>(
    typeof clientIdPresent === "boolean" ? clientIdPresent : null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const purgeOptionalCookies = useCallback((next: CookiePreferences) => {
    for (const cookie of COOKIE_DETAILS) {
      if (cookie.category === "necessary") continue;
      if (!cookie.clientRemovable) continue;
      if (cookie.category === "analytics" && next.analytics) continue;
      if (cookie.category === "functional" && next.functional) continue;
      if (cookie.category === "marketing" && next.marketing) continue;
      deleteClientCookie(cookie.name);
    }
  }, []);

  const refreshClientIdStatus = useCallback(() => {
    void fetch("/api/cookie-consent", { method: "GET", cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { clientIdPresent?: boolean } | null) => {
        if (!data) return;
        if (typeof data.clientIdPresent === "boolean") {
          setClientIdStatus(data.clientIdPresent);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setCachedCookiePrefs(initialPrefs ?? null);
    setDraftPrefs(buildCookiePrefs(initialPrefs ?? DEFAULT_COOKIE_PREFS));
    setShowBanner(!initialPrefs);
  }, [initialPrefs]);

  useEffect(() => {
    setClientIdStatus(typeof clientIdPresent === "boolean" ? clientIdPresent : null);
  }, [clientIdPresent]);

  useEffect(() => {
    if (!initialPrefsInvalid) return;
    clearCachedCookiePrefs();
    void fetch("/api/cookie-consent", { method: "DELETE" });
  }, [initialPrefsInvalid]);

  useEffect(() => {
    const unsubscribe = subscribeToConsentUpdates((prefs) => {
      setCachedCookiePrefs(prefs);
      setDraftPrefs(buildCookiePrefs(prefs));
      setShowBanner(false);
      purgeOptionalCookies(prefs);
    });
    return unsubscribe;
  }, [purgeOptionalCookies]);

  useEffect(() => {
    setSaveError(null);
    function handleOpen() {
      const existing = readCookiePrefs() ?? initialPrefs;
      setDraftPrefs(existing ?? buildCookiePrefs(DEFAULT_COOKIE_PREFS));
      setSettingsOpen(true);
      refreshClientIdStatus();
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpen);
    if (consumeCookieSettingsOpenFlag()) {
      handleOpen();
    }
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpen);
  }, [initialPrefs, refreshClientIdStatus]);

  useEffect(() => {
    function refreshFromServer() {
      if (settingsOpen || document.visibilityState !== "visible") return;
      void fetch("/api/cookie-consent", { method: "GET", cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { prefs?: CookiePreferences | null; clientIdPresent?: boolean } | null) => {
          if (!data) return;
          if (typeof data.clientIdPresent === "boolean") {
            setClientIdStatus(data.clientIdPresent);
          }
          if (data.prefs) {
            setCachedCookiePrefs(data.prefs);
            setDraftPrefs(buildCookiePrefs(data.prefs));
            setShowBanner(false);
            purgeOptionalCookies(data.prefs);
          } else {
            setCachedCookiePrefs(null);
            setDraftPrefs(buildCookiePrefs(DEFAULT_COOKIE_PREFS));
            setShowBanner(true);
          }
        })
        .catch(() => {});
    }

    window.addEventListener("focus", refreshFromServer);
    document.addEventListener("visibilitychange", refreshFromServer);
    return () => {
      window.removeEventListener("focus", refreshFromServer);
      document.removeEventListener("visibilitychange", refreshFromServer);
    };
  }, [purgeOptionalCookies, settingsOpen]);

  useEffect(() => {
    if (!settingsOpen) return;
    setSaveError(null);
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      const lastFocused = lastFocusedRef.current;
      if (lastFocused && typeof lastFocused.focus === "function" && document.contains(lastFocused)) {
        lastFocused.focus();
      }
    };
  }, [settingsOpen]);

  useEffect(() => {
    if (!settingsOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setSettingsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
      if (!focusables.length) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !dialog.contains(active)) {
        first.focus();
        event.preventDefault();
        return;
      }
      if (event.shiftKey && active === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && active === last) {
        first.focus();
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [settingsOpen]);

  const savePrefs = async (next: CookiePreferences) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = (await res.json()) as { prefs?: CookiePreferences };
      const prefs = buildCookiePrefs(data.prefs ?? next);
      setCachedCookiePrefs(prefs);
      setDraftPrefs(prefs);
      setShowBanner(false);
      setSettingsOpen(false);
      purgeOptionalCookies(prefs);
      broadcastConsentUpdate(prefs);
    } catch {
      setSaveError("We could not save your choices. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const acceptAll = () =>
    savePrefs(buildCookiePrefs({ analytics: true, functional: true, marketing: true }));

  const rejectNonEssential = () =>
    savePrefs(buildCookiePrefs({ analytics: false, functional: false, marketing: false }));

  const saveChoices = () =>
    savePrefs(
      buildCookiePrefs({
        analytics: draftPrefs.analytics,
        functional: draftPrefs.functional,
        marketing: draftPrefs.marketing,
      })
    );

  const shouldShowBanner = showBanner && !settingsOpen;
  const consentSet = Boolean(initialPrefs) || Boolean(readCookiePrefs());
  const categoryLabels: Record<string, string> = {
    necessary: "Strictly necessary",
    analytics: "Analytics",
    functional: "Functional",
    marketing: "Marketing",
  };
  const cookieDetails = COOKIE_DETAILS.map((cookie) => {
    let status: string | null = null;
    if (cookie.name === COOKIE_PREFS_NAME) {
      status = consentSet ? "Set" : "Not set yet";
    }
    if (cookie.name === CLIENT_ID_COOKIE) {
      if (clientIdStatus === true) status = "Set";
      if (clientIdStatus === false) status = "Not set yet";
    }
    return { ...cookie, status };
  });

  if (!shouldShowBanner && !settingsOpen) return null;

  return (
    <>
      {shouldShowBanner ? (
        <div className="fixed inset-x-0 bottom-4 z-50 px-4">
          <div className="glass mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl p-5 shadow-glow md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2 text-sm text-muted">
              <div className="text-sm font-semibold text-text">Cookies on Taxat</div>
              <p>
                We use cookies and similar technologies to make our site work. With your permission,
                we also use analytics to understand how the site is used and to improve it, and
                marketing cookies to measure campaigns. You can accept all cookies, reject
                non-essential cookies, or manage your choices.
              </p>
              <a
                className="inline-flex text-xs font-medium text-text underline decoration-border/70 underline-offset-4 hover:text-text"
                href="/cookies"
              >
                Read our Cookie Policy
              </a>
              <noscript>
                <p className="text-xs text-muted">
                  JavaScript is required to save cookie choices. You can still manage cookies in your
                  browser settings.
                </p>
              </noscript>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button intent="primary" size="sm" onClick={acceptAll} disabled={isSaving}>
                Accept all
              </Button>
              <Button intent="secondary" size="sm" onClick={rejectNonEssential} disabled={isSaving}>
                Reject non-essential
              </Button>
              <Button intent="ghost" size="sm" onClick={() => setSettingsOpen(true)} disabled={isSaving}>
                Cookie settings
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {settingsOpen ? (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={() => setSettingsOpen(false)}
            aria-hidden="true"
          />
          <div className="relative mx-auto flex h-full w-full max-w-4xl items-start justify-center px-4 py-10">
            <div
              id="cookie-settings"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-settings-title"
              aria-describedby="cookie-settings-description"
              className="glass w-full max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-border/70 p-6 shadow-glow overscroll-contain"
              ref={dialogRef}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <h2 id="cookie-settings-title" className="text-xl font-semibold text-text">
                    Cookie settings
                  </h2>
                  <p id="cookie-settings-description" className="text-sm text-muted">
                    You can choose which cookies we use. We use strictly necessary cookies to make
                    the site work and to keep it secure. Optional cookies help us improve the site
                    (analytics) and measure marketing (marketing). You can change your choices at
                    any time by clicking &quot;Cookie settings&quot;.
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  className="text-sm font-medium text-muted hover:text-text"
                  onClick={() => setSettingsOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <ToggleRow
                  id="cookie-necessary"
                  title="Strictly necessary cookies (always active)"
                  description="These cookies are required for the site to function and cannot be switched off. They are used for core functionality, security, and to remember your cookie preferences."
                  checked
                  disabled
                  hint="Always on"
                />
                <ToggleRow
                  id="cookie-analytics"
                  title="Analytics cookies"
                  description="These cookies help us understand how visitors use our site (for example, pages visited and errors) so we can improve it. We only use these if you enable them."
                  checked={draftPrefs.analytics}
                  onChange={(next) =>
                    setDraftPrefs((prev) => ({ ...prev, analytics: next }))
                  }
                />
                <ToggleRow
                  id="cookie-functional"
                  title="Functional cookies"
                  description="These cookies remember your choices (for example, preferences) to provide enhanced features. We only use these if you enable them."
                  checked={draftPrefs.functional}
                  onChange={(next) =>
                    setDraftPrefs((prev) => ({ ...prev, functional: next }))
                  }
                />
                <ToggleRow
                  id="cookie-marketing"
                  title="Marketing cookies"
                  description="These cookies help us measure marketing performance and may be used to show relevant content or ads. We only use these if you enable them."
                  checked={draftPrefs.marketing}
                  onChange={(next) =>
                    setDraftPrefs((prev) => ({ ...prev, marketing: next }))
                  }
                />
              </div>

              <details className="mt-6 rounded-2xl border border-border/60 bg-surface/30 p-4">
                <summary className="cursor-pointer text-sm font-medium text-text">
                  Cookie details
                </summary>
                <p className="mt-2 text-xs text-muted">
                  View the cookies we currently set, including their provider, purpose, and expiry.
                </p>
                <div className="mt-4 grid gap-3 text-xs text-muted">
                  {cookieDetails.map((cookie) => (
                    <div
                      key={cookie.name}
                      className="rounded-xl border border-border/60 bg-surface/20 p-3"
                    >
                      <div className="text-sm font-medium text-text">{cookie.name}</div>
                      <div>Provider: {cookie.provider}</div>
                      <div>Category: {categoryLabels[cookie.category] ?? cookie.category}</div>
                      <div>Purpose: {cookie.purpose}</div>
                      <div>Expiry: {cookie.expiry}</div>
                      {cookie.setOn ? <div>Set when: {cookie.setOn}</div> : null}
                      {cookie.status ? <div>Status: {cookie.status}</div> : null}
                    </div>
                  ))}
                </div>
              </details>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button intent="primary" size="sm" onClick={saveChoices} disabled={isSaving}>
                  Save choices
                </Button>
                <Button intent="secondary" size="sm" onClick={acceptAll} disabled={isSaving}>
                  Accept all
                </Button>
                <Button intent="ghost" size="sm" onClick={rejectNonEssential} disabled={isSaving}>
                  Reject non-essential
                </Button>
              </div>
              {saveError ? <p className="mt-3 text-xs text-muted">{saveError}</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
