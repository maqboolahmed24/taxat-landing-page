"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { BOOK_DEMO_URL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ArrowRight, CalendarDays } from "lucide-react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const threshold = window.innerHeight * 0.6;
      setVisible(window.scrollY > threshold);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-4 transition-all duration-200 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <div className="pointer-events-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-2xl border border-border/60 bg-surface/70 px-4 py-3 shadow-glow backdrop-blur">
        <div className="hidden text-sm text-muted sm:block">Ready to see Taxat in action?</div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            intent="secondary"
            size="sm"
            href={BOOK_DEMO_URL}
            newTab
            icon={<CalendarDays className="h-4 w-4" />}
            onClick={() => track("cta_secondary_click", { location: "sticky" })}
          >
            Book demo
          </Button>
          <Button
            intent="primary"
            size="sm"
            href="#beta"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => track("cta_primary_click", { location: "sticky" })}
          >
            Request beta
          </Button>
        </div>
      </div>
    </div>
  );
}
