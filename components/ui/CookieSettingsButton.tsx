"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { COOKIE_SETTINGS_EVENT, flagCookieSettingsOpen } from "@/lib/cookie-consent";

type CookieSettingsButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function CookieSettingsButton({ className, children }: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-controls="cookie-settings"
      className={cn("text-muted hover:text-text", className)}
      onClick={() => {
        flagCookieSettingsOpen();
        window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
      }}
    >
      {children ?? "Cookie settings"}
    </button>
  );
}
