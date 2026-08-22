"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type MobileFlowItem = {
  id: string;
  label: string;
  detail: string;
  Icon?: LucideIcon;
  active: boolean;
  dimmed?: boolean;
  render?: ReactNode;
};

export default function MobileFlowList({
  items,
  pulseSegment,
  pulseKey,
  pulseDuration = 1.2,
}: {
  items: MobileFlowItem[];
  /** index of the item the traveling pulse departs from; pulse animates to the next non-dimmed item */
  pulseSegment?: number;
  pulseKey?: number | string;
  pulseDuration?: number;
}) {
  const nextIndex = (from: number) => {
    for (let j = from + 1; j < items.length; j++) {
      if (!items[j].dimmed) return j;
    }
    return -1;
  };
  const pulseTarget = pulseSegment !== undefined ? nextIndex(pulseSegment) : -1;
  const rowHeightPct = pulseTarget > (pulseSegment ?? -1) + 1 ? (pulseTarget - (pulseSegment ?? 0)) * 100 : 100;

  return (
    <div className="flex flex-col sm:hidden">
      {items.map((item, i) => (
        <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
          {i < items.length - 1 && (
            <span className="absolute left-[1.375rem] top-11 h-[calc(100%-1.75rem)] w-px bg-[var(--panel-border)]" />
          )}

          {i === pulseSegment && pulseTarget !== -1 && (
            <AnimatePresence mode="wait">
              <motion.span
                key={pulseKey}
                className="absolute left-[1.375rem] z-20 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_3px_var(--accent)]"
                initial={{ top: "2.75rem", opacity: 0 }}
                animate={{ top: `calc(${rowHeightPct}% - 1rem)`, opacity: [0, 1, 1, 0] }}
                transition={{ duration: pulseDuration, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
              />
            </AnimatePresence>
          )}

          <motion.div
            animate={{
              borderColor: item.active ? "rgba(140,170,255,0.6)" : "rgba(140,170,255,0.16)",
              backgroundColor: item.active ? "rgba(91,140,255,0.18)" : "rgba(255,255,255,0.02)",
              opacity: item.dimmed ? 0.45 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border"
          >
            {item.render ?? (item.Icon && (
              <item.Icon
                strokeWidth={1.6}
                className={`h-5 w-5 transition-colors duration-300 ${
                  item.active ? "text-[var(--accent)]" : "text-fg-dim"
                }`}
              />
            ))}
          </motion.div>

          <div className={`pt-1.5 transition-opacity duration-300 ${item.dimmed ? "opacity-45" : "opacity-100"}`}>
            <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold">{item.label}</h3>
            <p className="mt-0.5 text-xs leading-snug text-fg-muted">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
