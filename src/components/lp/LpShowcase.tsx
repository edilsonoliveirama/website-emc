"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import ProductShowcase, { AUTO_MS } from "@/components/hero/ProductShowcase";

/** The home hero showcase, rotating only through the panels a landing page is about. */
export default function LpShowcase({ panels }: { panels: number[] }) {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState(0);
  const [active, setActive] = useState(panels[0]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || panels.length < 2) return;
    const t = setTimeout(() => {
      const next = (pos + 1) % panels.length;
      setPos(next);
      setActive(panels[next]);
    }, AUTO_MS);
    return () => clearTimeout(t);
  }, [pos, paused, reduce, panels]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ProductShowcase
        active={active}
        paused={paused}
        onSelect={(i) => {
          setActive(i);
          setPaused(true);
        }}
      />
    </div>
  );
}
