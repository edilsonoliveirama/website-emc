"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Heading } from "@/lib/blog";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Neste artigo">
      <p className="mono-label text-[10px] text-fg-dim">Neste artigo</p>
      <ol className="relative mt-4 space-y-1 border-l border-white/[0.08]">
        {headings.map((h) => {
          const on = h.id === active;
          return (
            <li key={h.id} className="relative">
              {on && (
                <motion.span
                  layoutId="toc-active"
                  className="absolute -left-px top-0 h-full w-[2px] rounded-full bg-[var(--accent)] shadow-[0_0_10px_rgba(91,140,255,0.8)]"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <a
                href={`#${h.id}`}
                className={`block py-1.5 pl-4 text-[13px] leading-snug transition-colors ${on ? "text-fg" : "text-fg-dim hover:text-fg-muted"}`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
