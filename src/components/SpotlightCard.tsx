"use client";

import type { ReactNode, PointerEvent } from "react";

// Card whose border and surface light up under the cursor. Mouse position is
// written straight to CSS variables, so moving the pointer never re-renders React.
export default function SpotlightCard({
  children,
  className = "",
  glow = "rgba(91,140,255,0.16)",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div onPointerMove={onMove} className={`spotlight-card group relative overflow-hidden ${className}`} style={{ ["--glow" as string]: glow }}>
      <div aria-hidden="true" className="spotlight-card__surface pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div aria-hidden="true" className="spotlight-card__border pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
