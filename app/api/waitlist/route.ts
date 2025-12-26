import nodemailer from "nodemailer";
import { createHash } from "crypto";
import { isIP } from "net";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

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
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimit = new Map<string, RateLimitEntry>();
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
  if (!host) return true;
  if (host === allowedHost || host === bareHost || host === `www.${bareHost}`) return true;
  if (process.env.NODE_ENV !== "production" && (host.startsWith("localhost") || host.startsWith("127.0.0.1"))) {
    return true;
  }
  return false;
}

function getClientIp(req: Request) {
  const trustProxy = process.env.TRUST_PROXY === "true";
  if (trustProxy) {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      const ip = forwarded.split(",")[0]?.trim() ?? "";
      if (isIP(ip)) return ip;
    }
  }
  const direct = req.headers.get("x-real-ip") ?? req.headers.get("cf-connecting-ip");
  if (direct && isIP(direct)) return direct;
  return null;
}

function getRateLimitKey(req: Request) {
  const ip = getClientIp(req);
  if (ip) return `ip:${ip}`;
  const ua = req.headers.get("user-agent") ?? "unknown";
  const lang = req.headers.get("accept-language") ?? "unknown";
  const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "unknown";
  const hash = createHash("sha256").update(`${ua}|${lang}|${origin}`).digest("hex").slice(0, 32);
  return `fp:${hash}`;
}

function cleanupRateLimit(now: number) {
  for (const [key, entry] of rateLimit.entries()) {
    if (entry.resetAt < now) {
      rateLimit.delete(key);
    }
  }
}

function isRateLimited(key: string) {
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

  let body: WaitlistPayload;
  try {
    body = (await req.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const intent = normalize(body.intent) === "updates" ? "updates" : "beta";
  const name = normalize(body.name);
  const email = normalize(body.email).toLowerCase();
  const firmSize = normalize(body.firmSize);
  const saVolume = normalize(body.saVolume);
  const stack = normalize(body.stack);
  const notes = normalize(body.notes);
  const website = normalize(body.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }

  if (intent === "beta") {
    if (!name) {
      return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });
    }
    if (!firmSize || !saVolume) {
      return NextResponse.json({ ok: false, error: "Firm size and SA volume required" }, { status: 400 });
    }
  }

  const rateKey = getRateLimitKey(req);
  if (isRateLimited(rateKey)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Try again shortly." }, { status: 429 });
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
    return NextResponse.json({ ok: false, error: "Service unavailable" }, { status: 503 });
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
    return NextResponse.json({ ok: false, error: "Service unavailable" }, { status: 503 });
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

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
