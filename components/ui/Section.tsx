import { cn } from "@/lib/cn";
import Container from "./Container";
import type { ReactNode } from "react";

export default function Section({
  id,
  className,
  children,
  size = "md",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const pad =
    size === "sm"
      ? "py-14 md:py-20"
      : size === "lg"
        ? "py-24 md:py-32"
        : "py-20 md:py-28";

  return (
    <section id={id} className={cn(pad, className)}>
      <Container>{children}</Container>
    </section>
  );
}
