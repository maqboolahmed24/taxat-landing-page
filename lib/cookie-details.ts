import { COOKIE_PREFS_MAX_AGE, COOKIE_PREFS_NAME } from "@/lib/cookie-consent-shared";

export type CookieCategory = "necessary" | "analytics" | "functional" | "marketing";

export type CookieDetail = {
  name: string;
  provider: string;
  category: CookieCategory;
  purpose: string;
  expiry: string;
  setOn?: string;
  clientRemovable?: boolean;
};

export const CLIENT_ID_COOKIE = "taxat_client_id";

const prefsExpiryDays = Math.round(COOKIE_PREFS_MAX_AGE / (60 * 60 * 24));

export const COOKIE_DETAILS: CookieDetail[] = [
  {
    name: COOKIE_PREFS_NAME,
    provider: "taxat.co.uk (first-party)",
    category: "necessary",
    purpose: "Stores your cookie preferences.",
    expiry: `${prefsExpiryDays} days`,
    setOn: "Set when you save your cookie preferences.",
    clientRemovable: false,
  },
  {
    name: CLIENT_ID_COOKIE,
    provider: "taxat.co.uk (first-party)",
    category: "necessary",
    purpose: "Helps prevent abuse and rate-limit waitlist submissions.",
    expiry: "365 days",
    setOn: "Set when you submit the waitlist form.",
    clientRemovable: false,
  },
];
