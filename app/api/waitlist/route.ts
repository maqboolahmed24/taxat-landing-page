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
};

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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WaitlistPayload;
    const name = normalize(body.name);
    const email = normalize(body.email).toLowerCase();
    const firmSize = normalize(body.firmSize);
    const saVolume = normalize(body.saVolume);
    const stack = normalize(body.stack);
    const notes = normalize(body.notes);

    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
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

    const submittedAt = new Date().toISOString();
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      req.headers.get("cf-connecting-ip") ??
      "unknown";
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    const adminText = [
      "New Taxat beta request",
      "",
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
      subject: "New Taxat beta request",
      text: adminText,
    });

    const recipientName = name || "there";
    const userText = [
      `Hi ${recipientName},`,
      "",
      "Thanks for requesting Taxat beta access. We'll review your details and get back to you shortly.",
      "If you'd like to add more context, just reply to this email with any notes or screenshots.",
      "",
      "Talk soon,",
      "Taxat",
    ].join("\n");

    await transporter.sendMail({
      from,
      to: email,
      subject: "Taxat beta request received",
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
