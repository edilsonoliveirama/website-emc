"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Renders children at a fixed design size and scales them to the container width,
// so a recreated app screen looks like a real screenshot at any viewport.
export default function ScaledCanvas({
  baseWidth,
  baseHeight,
  children,
}: {
  baseWidth: number;
  baseHeight: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / baseWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${baseWidth} / ${baseHeight}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: baseWidth,
          height: baseHeight,
          transform: `scale(${scale ?? 1})`,
          visibility: scale === null ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </div>
  );
}
