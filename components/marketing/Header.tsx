"use client";

import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { id: "product", label: "Product" },
  { id: "how", label: "How it works" },
  { id: "security", label: "Security" },
  { id: "faq", label: "FAQ" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const ids = useMemo(() => navItems.map((n) => n.id), []);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        threshold: [0.12, 0.2, 0.35, 0.5],
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (
    <header className="sticky top-0 z-40">
      <div className="glass border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Taxat home">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.9),transparent_55%),radial-gradient(circle_at_80%_70%,hsl(var(--accent-2)/0.85),transparent_60%)] ring-1 ring-border/60 shadow-glow">
              <span className="font-display text-sm font-semibold text-text">T</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold tracking-tight text-text">Taxat</div>
              <div className="text-xs text-muted">Defence‑ready returns</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative text-sm text-muted transition-colors hover:text-text",
                  active === item.id && "text-text"
                )}
                onClick={() => track("nav_click", { target: item.id })}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-2 left-0 h-px w-full bg-[linear-gradient(90deg,transparent,hsl(var(--accent)/0.8),transparent)] opacity-0 transition-opacity",
                    active === item.id && "opacity-100"
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              intent="ghost"
              href="#demo"
              onClick={() => track("cta_secondary_click", { location: "nav" })}
            >
              Book demo
            </Button>
            <Button
              intent="primary"
              href="#beta"
              onClick={() => track("cta_primary_click", { location: "nav" })}
            >
              Request beta
            </Button>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-xl border border-border/70 bg-surface/50 text-text md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={cn("md:hidden", open ? "block" : "hidden")}>
          <div className="mx-auto max-w-6xl px-6 pb-4">
            <div className="rounded-2xl border border-border/70 bg-surface/40 p-4">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface/60 hover:text-text"
                    onClick={() => {
                      track("nav_click", { target: item.id, mobile: true });
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                <Button
                  intent="secondary"
                  href="#demo"
                  onClick={() => {
                    track("cta_secondary_click", { location: "nav_mobile" });
                    setOpen(false);
                  }}
                >
                  Book demo
                </Button>
                <Button
                  intent="primary"
                  href="#beta"
                  onClick={() => {
                    track("cta_primary_click", { location: "nav_mobile" });
                    setOpen(false);
                  }}
                >
                  Request beta
                </Button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Not affiliated with HMRC. Taxat is an independent defence layer that can use authorised HMRC APIs where permitted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
