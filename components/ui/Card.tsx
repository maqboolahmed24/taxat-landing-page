import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export default function Card({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border/70 bg-surface/40 p-6 shadow-glow",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity",
        "before:bg-[radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,50%),hsl(var(--accent)/0.14),transparent_60%)]",
        hover && "transition-transform duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-glow-lg hover:before:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}
