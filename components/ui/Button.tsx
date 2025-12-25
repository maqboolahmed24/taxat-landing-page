import { cn } from "@/lib/cn";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Intent = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  intent?: Intent;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
    href?: never;
    newTab?: never;
  };

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "size"> & {
    href: string;
    newTab?: boolean;
  };

export default function Button(props: ButtonProps | AnchorProps) {
  const { intent = "primary", size = "md", icon, className, children, ...rest } = props;

  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-all duration-200 focus-visible:outline-none";

  const sizes: Record<Size, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  const intents: Record<Intent, string> = {
    primary: cn(
      "text-bg",
      "bg-[linear-gradient(90deg,hsl(var(--accent)),hsl(var(--accent-2)))] bg-[length:200%_200%] animate-shimmer",
      "shadow-glow hover:shadow-glow-lg",
      "active:scale-[0.99]"
    ),
    secondary: cn(
      "text-text",
      "bg-surface/60 hover:bg-surface/80",
      "border border-border/80",
      "shadow-glow",
      "active:scale-[0.99]"
    ),
    ghost: cn(
      "text-text/90 hover:text-text",
      "bg-transparent hover:bg-surface/40",
      "border border-transparent hover:border-border/60"
    ),
  };

  const cls = cn(base, sizes[size], intents[intent], className);

  if ("href" in props && typeof props.href === "string") {
    const { href: _href, newTab, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href?: string;
      newTab?: boolean;
    };
    const isNewTab = props.newTab ?? newTab;

    return (
      <a
        href={props.href}
        className={cls}
        target={isNewTab ? "_blank" : undefined}
        rel={isNewTab ? "noreferrer" : undefined}
        {...anchorProps}
      >
        <span className="relative">
          {children}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute -inset-x-1 -bottom-1 h-px opacity-0 transition-opacity",
              intent === "ghost" &&
                "bg-[linear-gradient(90deg,transparent,hsl(var(--accent)/0.8),transparent)] group-hover:opacity-100"
            )}
          />
        </span>
        {icon ? <span className="opacity-90 transition-opacity group-hover:opacity-100">{icon}</span> : null}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={cls} {...buttonProps}>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-x-1 -bottom-1 h-px opacity-0 transition-opacity",
            intent === "ghost" &&
              "bg-[linear-gradient(90deg,transparent,hsl(var(--accent)/0.8),transparent)] group-hover:opacity-100"
          )}
        />
      </span>
      {icon ? <span className="opacity-90 transition-opacity group-hover:opacity-100">{icon}</span> : null}
    </button>
  );
}
