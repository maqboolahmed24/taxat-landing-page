"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle cursor-follow glow (premium feel).
 * - Uses a single fixed layer with CSS vars to avoid layout thrash.
 * - Disabled on coarse pointers.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    const evaluate = () => {
      setEnabled(!motionQuery.matches && !pointerQuery.matches);
    };

    evaluate();

    const onChange = () => evaluate();
    const addListener = (mq: MediaQueryList, handler: () => void) => {
      if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
      }
      const legacy = mq as MediaQueryList & {
        addListener?: (cb: () => void) => void;
        removeListener?: (cb: () => void) => void;
      };
      legacy.addListener?.(handler);
      return () => legacy.removeListener?.(handler);
    };

    const removeMotion = addListener(motionQuery, onChange);
    const removePointer = addListener(pointerQuery, onChange);

    return () => {
      removeMotion();
      removePointer();
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

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
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-80 [background:radial-gradient(600px_circle_at_var(--x,50%)_var(--y,10%),hsl(var(--accent)/0.10),transparent_55%),radial-gradient(700px_circle_at_calc(var(--x,50%)+240px)_calc(var(--y,10%)+140px),hsl(var(--accent-3)/0.10),transparent_55%)] motion-reduce:hidden"
    />
  );
}
