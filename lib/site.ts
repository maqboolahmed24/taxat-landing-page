const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.taxat.co.uk";
const normalizedSiteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;
export const SITE_URL = normalizedSiteUrl.replace(/\/$/, "");

export const BOOK_DEMO_URL =
  process.env.NEXT_PUBLIC_BOOK_DEMO_URL ??
  "mailto:admin@taxat.co.uk?subject=Taxat%20Demo%20Request";
