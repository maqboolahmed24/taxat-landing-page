import nodemailer from "nodemailer";
import { createHash, randomUUID } from "crypto";
import { isIP } from "net";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { getCookieValue } from "@/lib/cookies";
import { buildCookieHeader, getCookieBaseOptions } from "@/lib/cookie-server";
import { CLIENT_ID_COOKIE } from "@/lib/cookie-details";

export const runtime = "nodejs";

type WaitlistPayload = {
  name?: string;
  email?: string;
  firmSize?: string;
  saVolume?: string;
  stack?: string;
  notes?: string;
  intent?: string;
  website?: string;
  contact_time?: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const CLIENT_ID_TTL_DAYS = 365;
const CLIENT_ID_MAX_LENGTH = 64;
const CLIENT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

declare global {
  // eslint-disable-next-line no-var
  var taxatRateLimit: Map<string, RateLimitEntry> | undefined;
}

const rateLimit = globalThis.taxatRateLimit ?? new Map<string, RateLimitEntry>();
if (!globalThis.taxatRateLimit) {
  globalThis.taxatRateLimit = rateLimit;
}
let cachedTransporter: nodemailer.Transporter | null = null;
let cachedTransportKey = "";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePort(value: string | undefined) {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed > 0) return parsed;
  return 587;
}

function safeHost(value: string | null) {
  if (!value) return null;
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

function isAllowedOrigin(req: Request) {
  const allowedHost = new URL(SITE_URL).host;
  const bareHost = allowedHost.replace(/^www\./, "");
  const originHost = safeHost(req.headers.get("origin"));
  const refererHost = safeHost(req.headers.get("referer"));
  const host = originHost ?? refererHost;
  if (!host) return process.env.NODE_ENV !== "production";
  if (host === allowedHost || host === bareHost || host === `www.${bareHost}`) return true;
  if (process.env.NODE_ENV !== "production" && (host.startsWith("localhost") || host.startsWith("127.0.0.1"))) {
    return true;
  }
  return false;
}

function getClientIp(req: Request) {
  const trustProxy = process.env.TRUST_PROXY !== "false";
  if (trustProxy) {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      const ip = forwarded.split(",")[0]?.trim() ?? "";
      if (isIP(ip)) return ip;
    }
  }
  const direct =
    req.headers.get("x-real-ip") ?? req.headers.get("cf-connecting-ip") ?? req.headers.get("true-client-ip");
  if (direct && isIP(direct)) return direct;
  return null;
}

function isValidClientId(value: string | null): value is string {
  if (!value) return false;
  if (value.length > CLIENT_ID_MAX_LENGTH) return false;
  return CLIENT_ID_PATTERN.test(value);
}

function getFallbackFingerprint(req: Request) {
  const pieces = [
    req.headers.get("user-agent") ?? "",
    req.headers.get("accept-language") ?? "",
    req.headers.get("sec-ch-ua") ?? "",
    req.headers.get("sec-ch-ua-platform") ?? "",
    req.headers.get("sec-ch-ua-mobile") ?? "",
  ];
  const raw = pieces.map((value) => value.trim()).filter(Boolean).join("|");
  if (!raw) return null;
  return createHash("sha256").update(raw).digest("hex").slice(0, 16);
}

function getClientId(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const existing = getCookieValue(cookieHeader, CLIENT_ID_COOKIE);
  if (isValidClientId(existing)) return { id: existing };

  const id = randomUUID();
  const baseOptions = getCookieBaseOptions(req);
  const cookie = buildCookieHeader(CLIENT_ID_COOKIE, id, {
    ...baseOptions,
    httpOnly: true,
    maxAge: CLIENT_ID_TTL_DAYS * 24 * 60 * 60,
  });

  if (baseOptions.domain) {
    const hostCookie = buildCookieHeader(CLIENT_ID_COOKIE, id, {
      ...baseOptions,
      domain: undefined,
      httpOnly: true,
      maxAge: CLIENT_ID_TTL_DAYS * 24 * 60 * 60,
    });
    return { id, setCookie: [cookie, hostCookie] };
  }

  return { id, setCookie: cookie };
}

function getRateLimitKey(req: Request, clientId: string) {
  const ip = getClientIp(req);
  if (ip) return `ip:${ip}`;
  const fingerprint = getFallbackFingerprint(req);
  if (fingerprint) return `fp:${fingerprint}`;
  return `cid:${clientId}`;
}

function cleanupRateLimit(now: number) {
  for (const [key, entry] of rateLimit.entries()) {
    if (entry.resetAt < now) {
      rateLimit.delete(key);
    }
  }
}

function isRateLimitedMemory(key: string) {
  const now = Date.now();
  cleanupRateLimit(now);
  const entry = rateLimit.get(key);
  if (!entry || entry.resetAt < now) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

async function isRateLimitedUpstash(key: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const base = url.replace(/\/$/, "");
  const encodedKey = encodeURIComponent(key);
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const incrRes = await fetch(`${base}/incr/${encodedKey}`, { method: "POST", headers, cache: "no-store" });
    if (!incrRes.ok) {
      throw new Error(`Upstash rate limit failed: ${incrRes.status}`);
    }
    const incrData = (await incrRes.json()) as { result?: number };
    const count = Number(incrData.result ?? 0);
    if (!Number.isFinite(count)) throw new Error("Invalid rate limit response");

    if (count === 1) {
      await fetch(`${base}/pexpire/${encodedKey}/${RATE_LIMIT_WINDOW_MS}`, {
        method: "POST",
        headers,
        cache: "no-store",
      });
    }
    return count > RATE_LIMIT_MAX;
  } catch (err) {
    console.error("Upstash rate limit error", err);
    return null;
  }
}

async function isRateLimited(key: string) {
  const upstash = await isRateLimitedUpstash(key);
  if (typeof upstash === "boolean") return upstash;
  return isRateLimitedMemory(key);
}

function jsonResponse(
  body: Record<string, unknown>,
  init: ResponseInit,
  setCookie?: string | string[]
) {
  const res = NextResponse.json(body, init);
  if (setCookie) {
    const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
    for (const cookie of cookies) {
      res.headers.append("Set-Cookie", cookie);
    }
  }
  return res;
}

function getTransporter() {
  const smtpHost = requireEnv("SMTP_HOST");
  const smtpPort = parsePort(process.env.SMTP_PORT);
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpRequireTLS = process.env.SMTP_REQUIRE_TLS === "true";
  const smtpUser = requireEnv("SMTP_USER");
  const smtpPass = requireEnv("SMTP_PASS");

  const key = `${smtpHost}|${smtpPort}|${smtpSecure}|${smtpRequireTLS}|${smtpUser}|${smtpPass}`;
  if (!cachedTransporter || cachedTransportKey !== key) {
    cachedTransporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      requireTLS: smtpRequireTLS,
      auth: { user: smtpUser, pass: smtpPass },
    });
    cachedTransportKey = key;
  }
  if (!cachedTransporter) {
    throw new Error("Transport unavailable");
  }

  const fromAddress = process.env.SMTP_FROM ?? smtpUser;
  const fromName = process.env.SMTP_FROM_NAME ?? "Taxat";
  const from = `${fromName} <${fromAddress}>`;

  return { transporter: cachedTransporter, smtpUser, from };
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { id: clientId, setCookie } = getClientId(req);

  let body: WaitlistPayload;
  try {
    body = (await req.json()) as WaitlistPayload;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request" }, { status: 400 }, setCookie);
  }

  const intent = normalize(body.intent) === "updates" ? "updates" : "beta";
  const name = normalize(body.name);
  const email = normalize(body.email).toLowerCase();
  const firmSize = normalize(body.firmSize);
  const saVolume = normalize(body.saVolume);
  const stack = normalize(body.stack);
  const notes = normalize(body.notes);
  const website = normalize(body.website);
  const contactTime = normalize(body.contact_time);

  if (website || contactTime) {
    return jsonResponse({ ok: true }, { status: 200 }, setCookie);
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return jsonResponse({ ok: false, error: "Valid email required" }, { status: 400 }, setCookie);
  }

  if (intent === "beta") {
    if (!name) {
      return jsonResponse({ ok: false, error: "Name required" }, { status: 400 }, setCookie);
    }
    if (!firmSize || !saVolume) {
      return jsonResponse({ ok: false, error: "Firm size and SA volume required" }, { status: 400 }, setCookie);
    }
  }

  const rateKey = getRateLimitKey(req, clientId);
  if (await isRateLimited(rateKey)) {
    return jsonResponse({ ok: false, error: "Too many requests. Try again shortly." }, { status: 429 }, setCookie);
  }

  const ip = getClientIp(req) ?? "unknown";
  const isUpdates = intent === "updates";
  const submittedAt = new Date().toISOString();
  const userAgent = req.headers.get("user-agent") ?? "unknown";

  let transporter: nodemailer.Transporter;
  let smtpUser: string;
  let from: string;
  try {
    ({ transporter, smtpUser, from } = getTransporter());
  } catch (err) {
    console.error("Waitlist SMTP config error", err);
    return jsonResponse({ ok: false, error: "Service unavailable" }, { status: 503 }, setCookie);
  }

  const adminText = [
    isUpdates ? "New Taxat updates signup" : "New Taxat beta request",
    "",
    `Intent: ${intent}`,
    `Name: ${name || "-"}`,
    `Email: ${email}`,
    `Firm size: ${firmSize || "-"}`,
    `Self Assessment clients/year: ${saVolume || "-"}`,
    `Current stack: ${stack || "-"}`,
    `Notes: ${notes || "-"}`,
    "",
    `Submitted at: ${submittedAt}`,
    `IP: ${ip}`,
    `User-Agent: ${userAgent}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from,
      to: smtpUser,
      replyTo: email,
      subject: isUpdates ? "New Taxat updates signup" : "New Taxat beta request",
      text: adminText,
    });
  } catch (err) {
    console.error("Waitlist admin email failed", err);
    return jsonResponse({ ok: false, error: "Service unavailable" }, { status: 503 }, setCookie);
  }

  const recipientName = name || "there";
  const userText = [
    `Hi ${recipientName},`,
    "",
    isUpdates
      ? "Thanks for joining the Taxat updates list. We'll keep you posted on product drops and availability windows."
      : "Thanks for requesting Taxat beta access. We'll review your details and get back to you shortly.",
    isUpdates
      ? "If you'd like a demo sooner, reply with your preferred times."
      : "If you'd like to add more context, just reply to this email with any notes or screenshots.",
    "",
    "Talk soon,",
    "Taxat",
  ].join("\n");

  try {
    await transporter.sendMail({
      from,
      to: email,
      subject: isUpdates ? "You're on the Taxat updates list" : "Taxat beta request received",
      text: userText,
    });
  } catch (err) {
    console.error("Waitlist user email failed", err);
  }

  return jsonResponse({ ok: true }, { status: 200 }, setCookie);
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
