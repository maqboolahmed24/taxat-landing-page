import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export default function GradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-[linear-gradient(90deg,hsl(var(--accent)),hsl(var(--accent-2)))] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
