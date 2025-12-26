"use client";

import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { id: "product", label: "Product" },
  { id: "how", label: "How it works" },
  { id: "security", label: "Security" },
  { id: "faq", label: "FAQ" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const mobileMenuId = "mobile-menu";
  const menuRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const intersectionState = useRef(
    new Map<string, { id: string; isIntersecting: boolean; intersectionRatio: number }>()
  );

  const ids = useMemo(() => navItems.map((n) => n.id), []);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    intersectionState.current.clear();
    els.forEach((el) => {
      intersectionState.current.set(el.id, { id: el.id, isIntersecting: false, intersectionRatio: 0 });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectionState.current.set(entry.target.id, {
            id: entry.target.id,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio ?? 0,
          });
        });

        const visible = Array.from(intersectionState.current.values())
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        setActive(visible?.id ?? "");
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

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setOpen(false);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    const legacy = mq as MediaQueryList & {
      addListener?: (cb: () => void) => void;
      removeListener?: (cb: () => void) => void;
    };
    legacy.addListener?.(onChange);
    return () => legacy.removeListener?.(onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () => {
      if (!menuRef.current) return [] as HTMLElement[];
      const items = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      return toggleRef.current ? [...items, toggleRef.current] : items;
    };

    const focusables = getFocusable();
    focusables[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first || !menuRef.current?.contains(document.activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="glass border-b border-border/60">
        <div className="flex w-full items-center justify-between px-3 py-3 md:px-6">
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label="Taxat home"
            onClick={() => setOpen(false)}
          >
            <div className="grid h-9 w-9 place-items-center">
              <img src="/favicon.svg" alt="Taxat logo" width={36} height={36} className="h-9 w-9" />
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
                aria-current={active === item.id ? "location" : undefined}
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

          <button
            ref={toggleRef}
            className="glow-border grid h-11 w-11 place-items-center rounded-xl border border-border/70 bg-surface/50 text-text md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={mobileMenuId}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <nav
          id={mobileMenuId}
          aria-label="Primary"
          className={cn("md:hidden", open ? "block" : "hidden")}
          ref={menuRef}
        >
          <div className="mx-auto max-w-6xl px-6 pb-4">
            <div className="rounded-2xl border border-border/70 bg-surface/40 p-4">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface/60 hover:text-text"
                    aria-current={active === item.id ? "location" : undefined}
                    onClick={() => {
                      track("nav_click", { target: item.id, mobile: true });
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Not affiliated with HMRC. Taxat is an independent defence layer that can use authorised HMRC APIs where permitted.
              </p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
