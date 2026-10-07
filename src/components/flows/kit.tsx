"use client";

import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------ hooks */

export function useInView(ref: RefObject<Element | null>, threshold = 0.35) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

export function clock(offsetSeconds = 0) {
  const d = new Date(Date.now() + offsetSeconds * 1000);
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

/* ------------------------------------------------------------ SVG edges */

// Curved edge between two points in a 0..100 viewBox.
export function curve(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2;
  return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
}

/** Static track + a bright comet that travels the path once per `trigger` change. */
export function Edge({
  d,
  lit,
  trigger,
  delay = 0,
  duration = 0.9,
  color = "#8ba4ff",
}: {
  d: string;
  lit: boolean;
  trigger?: string | number | null;
  delay?: number;
  duration?: number;
  color?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={lit ? "rgba(140,170,255,0.42)" : "rgba(140,170,255,0.13)"}
        strokeWidth={lit ? 1.6 : 1.2}
        vectorEffect="non-scaling-stroke"
        strokeDasharray={lit ? undefined : "3 5"}
        style={{ transition: "stroke 0.5s, stroke-width 0.5s" }}
      />
      {!reduce && trigger !== null && trigger !== undefined && (
        <motion.path
          key={String(trigger)}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          initial={{ pathLength: 0.16, pathOffset: -0.16, opacity: 0 }}
          animate={{ pathOffset: 1, opacity: [0, 1, 1, 0] }}
          transition={{ duration, delay, ease: "easeInOut", opacity: { duration, delay, times: [0, 0.1, 0.85, 1] } }}
        />
      )}
    </g>
  );
}

/* ------------------------------------------------------------ node card */

export function NodeCard({
  Icon,
  iconNode,
  title,
  status,
  statusKey,
  state,
  tone = "accent",
  pulse,
  width = "11rem",
  children,
}: {
  Icon: LucideIcon;
  /** Optional animated replacement for the static icon. */
  iconNode?: ReactNode;
  title: string;
  status?: ReactNode;
  /** Changing this key animates the status line; defaults to the status text. */
  statusKey?: string;
  state: "idle" | "active" | "done" | "dim";
  tone?: "accent" | "mint" | "amber" | "whatsapp";
  pulse?: string | number | null;
  width?: string;
  children?: ReactNode;
}) {
  const toneClass = {
    accent: "text-[var(--accent)] bg-[var(--accent-soft)]",
    mint: "text-[var(--accent-mint)] bg-[var(--accent-mint-soft)]",
    amber: "text-[var(--accent-amber)] bg-[var(--accent-amber-soft)]",
    whatsapp: "text-whatsapp bg-whatsapp/15",
  }[tone];

  return (
    <motion.div
      animate={{
        opacity: state === "dim" ? 0.4 : 1,
        scale: state === "active" ? 1.04 : 1,
      }}
      transition={{ duration: 0.4 }}
      style={{ width }}
      className={`relative rounded-2xl border bg-[#0b1120] p-3 text-left shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow] duration-500 ${
        state === "active"
          ? "border-[var(--panel-border-strong)] shadow-[0_0_0_1px_rgba(91,140,255,0.25),0_12px_36px_-8px_rgba(91,140,255,0.45)]"
          : "border-white/[0.07]"
      }`}
    >
      {/* receive flash */}
      <AnimatePresence>
        {pulse !== null && pulse !== undefined && (
          <motion.span
            key={String(pulse)}
            className="pointer-events-none absolute inset-0 rounded-2xl border border-[var(--accent)]"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2.5">
        <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl ${toneClass}`}>
          {iconNode ?? <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />}
        </span>
        <div className="min-w-0 flex-1 text-[12.5px] font-semibold leading-tight text-fg">{title}</div>
        <AnimatePresence>
          {state === "done" && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-mint)] text-bg"
            >
              <Check className="h-2.5 w-2.5" strokeWidth={4} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {status !== undefined && (
        <div className="mt-2 h-[2.1rem] overflow-hidden text-[11px] leading-snug text-fg-muted">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={statusKey ?? (typeof status === "string" ? status : "status")}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {status}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------ event log */

export type LogLine = { id: string | number; time: string; text: string; tone?: "accent" | "mint" | "amber" | "whatsapp" };

export function EventLog({ lines, title = "Bastidores", max = 4 }: { lines: LogLine[]; title?: string; max?: number }) {
  const dot = { accent: "bg-[var(--accent)]", mint: "bg-[var(--accent-mint)]", amber: "bg-[var(--accent-amber)]", whatsapp: "bg-whatsapp" };
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/30">
      <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-mint)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-mint)]" />
        </span>
        <span className="mono-label text-[10px] text-fg-dim">{title} · ao vivo</span>
      </div>
      <ul className="relative px-4 py-2 font-mono text-[11.5px]" style={{ minHeight: `${max * 1.85}rem` }}>
        <AnimatePresence initial={false}>
          {lines.slice(0, max).map((l) => (
            <motion.li
              key={l.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 py-1"
            >
              <span className="shrink-0 tabular-nums text-fg-dim">{l.time}</span>
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot[l.tone ?? "accent"]}`} />
              <span className="truncate text-fg-muted">{l.text}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------ layout */

/** Centers its child on a point of the 0..100 diagram space. */
export function Positioned({ p, children }: { p: { x: number; y: number }; children: ReactNode }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ section head */

export function FlowHeading({ tag, id, title, children }: { tag: string; id: string; title: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-xl text-center"
    >
      <span className="mono-label text-xs text-[var(--accent)]">{tag}</span>
      <h2 id={id} className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-fg-muted">{children}</p>
    </motion.div>
  );
}
