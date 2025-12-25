import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Field({
  label,
  hint,
  className,
  ...props
}: {
  label: string;
  hint?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("grid gap-2 text-sm", className)}>
      <span className="text-text/90">{label}</span>
      <input
        {...props}
        className={cn(
          "h-11 rounded-xl border border-border/80 bg-surface/40 px-4 text-text",
          "placeholder:text-muted/60",
          "focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:outline-none"
        )}
      />
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  hint,
  className,
  ...props
}: {
  label: string;
  hint?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={cn("grid gap-2 text-sm", className)}>
      <span className="text-text/90">{label}</span>
      <textarea
        {...props}
        className={cn(
          "min-h-[110px] resize-y rounded-xl border border-border/80 bg-surface/40 px-4 py-3 text-text",
          "placeholder:text-muted/60",
          "focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:outline-none"
        )}
      />
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  );
}
