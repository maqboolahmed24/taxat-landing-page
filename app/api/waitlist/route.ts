import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

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

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = rateLimit.get(key);
  if (!entry || entry.resetAt < now) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WaitlistPayload;
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

    if (!email || !email.includes("@")) {
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

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests. Try again shortly." }, { status: 429 });
    }

    const smtpHost = requireEnv("SMTP_HOST");
    const smtpPort = Number(process.env.SMTP_PORT ?? 587);
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpRequireTLS = process.env.SMTP_REQUIRE_TLS === "true";
    const smtpUser = requireEnv("SMTP_USER");
    const smtpPass = requireEnv("SMTP_PASS");
    const fromAddress = process.env.SMTP_FROM ?? smtpUser;
    const fromName = process.env.SMTP_FROM_NAME ?? "Taxat";
    const from = `${fromName} <${fromAddress}>`;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      requireTLS: smtpRequireTLS,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const isUpdates = intent === "updates";
    const submittedAt = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") ?? "unknown";

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

    await transporter.sendMail({
      from,
      to: smtpUser,
      replyTo: email,
      subject: isUpdates ? "New Taxat updates signup" : "New Taxat beta request",
      text: adminText,
    });

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

    await transporter.sendMail({
      from,
      to: email,
      subject: isUpdates ? "You're on the Taxat updates list" : "Taxat beta request received",
      text: userText,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
