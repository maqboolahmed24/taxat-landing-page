"use client";

import { hasAnalyticsConsent } from "@/lib/cookie-consent";

/**
 * Minimal analytics shim (privacy-friendly by default).
 * Replace `track()` with your provider (PostHog, GA4, Plausible, etc.).
 */
export function track(event: string, props?: Record<string, unknown>) {
  if (!hasAnalyticsConsent()) return;
  // eslint-disable-next-line no-console
  console.log(`[track] ${event}`, props ?? {});
  // Example hooks:
  // (window as any).plausible?.(event, { props });
  // (window as any).posthog?.capture?.(event, props);
}
