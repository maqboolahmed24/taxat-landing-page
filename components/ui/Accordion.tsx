"use client";

import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type FAQItem = {
  q: string;
  a: string;
};

export default function Accordion({
  items,
  className,
}: {
  items: FAQItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-border/60 rounded-2xl border border-border/70 bg-surface/30", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="p-5 md:p-6">
            <button
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => {
                const next = isOpen ? null : i;
                setOpen(next);
                track("faq_open", { index: i, open: !isOpen, question: item.q });
              }}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-text">{item.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 text-sm leading-relaxed text-muted">{item.a}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
