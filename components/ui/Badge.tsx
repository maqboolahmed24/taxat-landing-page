import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export default function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success" | "warn";
  className?: string;
}) {
  const toneClass =
    tone === "accent"
      ? "border-accent/30 bg-accent/10 text-text"
      : tone === "success"
        ? "border-success/30 bg-success/10 text-text"
        : tone === "warn"
          ? "border-warn/30 bg-warn/10 text-text"
          : "border-border/70 bg-surface/50 text-muted";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        toneClass,
        className
      )}
    >
      {children}
    </span>
  );
}
