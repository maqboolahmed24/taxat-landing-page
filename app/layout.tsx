import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import Providers from "@/components/Providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Taxat · Defence‑ready returns",
    template: "%s · Taxat",
  },
  description:
    "Taxat is the AI‑driven audit defence layer for UK accountants: reconcile client-authorised data across sources, surface mismatches, and link every figure to evidence before filing.",
  openGraph: {
    title: "Taxat · Defence‑ready returns",
    description:
      "Independent risk visibility before you file. Evidence‑linked Defence Graph, Compliance Risk Twin, Defence Score, and Nightly Autopilot.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Taxat" }],
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export const viewport = {
  themeColor: "#05060A",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontSans.variable} ${fontDisplay.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
