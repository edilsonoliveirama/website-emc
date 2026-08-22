"use client";

import { motion } from "framer-motion";

const BARS = [42, 68, 55, 80, 60, 90];
const SPARKLINE = "M0 20 L8 14 L16 17 L24 8 L32 11 L40 4 L48 9 L56 2";

export default function MiniDashboard({ active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-1.5 p-2">
      <div className="flex items-end gap-[3px] h-7">
        {BARS.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-[1px] bg-[var(--accent)]"
            style={{ opacity: active ? 0.85 : 0.35 }}
            animate={
              active
                ? { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.65}%`, `${h}%`] }
                : { height: `${h * 0.5}%` }
            }
            transition={
              active
                ? { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>
      <svg viewBox="0 0 56 22" className="h-3.5 w-full overflow-visible" preserveAspectRatio="none">
        <motion.path
          d={SPARKLINE}
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={active ? { pathLength: 1, opacity: 0.9 } : { pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: active ? Infinity : 0, repeatType: "reverse" }}
        />
      </svg>
    </div>
  );
}
