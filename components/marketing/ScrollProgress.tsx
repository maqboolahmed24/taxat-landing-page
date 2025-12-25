"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const p = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
      el.style.transform = `scaleX(${p})`;
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
    <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left bg-[linear-gradient(90deg,hsl(var(--accent)),hsl(var(--accent-2)))] opacity-80"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
