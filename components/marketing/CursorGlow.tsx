"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle cursor-follow glow (premium feel).
 * - Uses a single fixed layer with CSS vars to avoid layout thrash.
 * - Disabled on coarse pointers.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) return; // no cursor on touch

    let raf = 0;
    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.2;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-80 [background:radial-gradient(600px_circle_at_var(--x,50%)_var(--y,10%),hsl(var(--accent)/0.10),transparent_55%),radial-gradient(700px_circle_at_calc(var(--x,50%)+240px)_calc(var(--y,10%)+140px),hsl(var(--accent-2)/0.10),transparent_55%)]"
    />
  );
}
