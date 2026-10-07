"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lock, ShieldCheck, Eye, FileLock2, Clock } from "lucide-react";
import ScaledCanvas from "../ScaledCanvas";
import {
  SCREEN_W,
  SCREEN_H,
  PHONE_W,
  PHONE_H,
  LoginScreen,
  ResumoScreen,
  DocumentosScreen,
  FinanceiroScreen,
  AuditoriaScreen,
  FiliadoPhoneScreen,
} from "./screens";

export function BrowserFrame({ children, address = "Área restrita · conexão segura" }: { children: ReactNode; address?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1220] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(140,170,255,0.08)]">
      <div className="flex items-center gap-3 border-b border-white/5 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-md bg-white/[0.06] px-3 py-1 text-[11px] text-fg-muted">
          <Lock className="h-3 w-3 shrink-0 text-[var(--accent-mint)]" strokeWidth={2.2} />
          <span className="truncate">{address}</span>
        </div>
        <span className="w-[42px]" />
      </div>
      <ScaledCanvas baseWidth={SCREEN_W} baseHeight={SCREEN_H}>
        {children}
      </ScaledCanvas>
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-[2.2rem] border border-white/15 bg-[#05070d] p-[6px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
      <div className="absolute left-1/2 top-[10px] z-10 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
      <div className="overflow-hidden rounded-[1.85rem]">
        <ScaledCanvas baseWidth={PHONE_W} baseHeight={PHONE_H}>
          {children}
        </ScaledCanvas>
      </div>
    </div>
  );
}

function Illustrative({ className = "" }: { className?: string }) {
  return <p className={`mono-label text-[10px] text-fg-dim ${className}`}>Dados ilustrativos</p>;
}

/* ---------------- Hero: browser + phone with mouse tilt ---------------- */

const TOASTS = [
  { who: "Maria S. Oliveira", doc: "Balanço patrimonial 2025", at: "14:32" },
  { who: "João P. Ferreira", doc: "Parecer jurídico", at: "14:27" },
  { who: "Ana L. Costa", doc: "Ata da assembleia", at: "13:58" },
];

export function HeroDevices() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const [toast, setToast] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setToast((v) => (v + 1) % TOASTS.length), 3200);
    return () => clearInterval(t);
  }, []);

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const t = TOASTS[toast];

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }} className="relative [perspective:1400px]">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(180,134,42,0.22),transparent)] blur-2xl" />
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="pr-[14%]">
          <BrowserFrame address="Painel Administrativo · conexão segura">
            <AuditoriaScreen />
          </BrowserFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          style={{ transform: "translateZ(60px)" }}
          className="absolute -bottom-10 right-0 w-[30%] min-w-[130px]"
        >
          <PhoneFrame>
            <FiliadoPhoneScreen />
          </PhoneFrame>
        </motion.div>

        <div style={{ transform: "translateZ(90px)" }} className="absolute -left-4 top-[58%] sm:-left-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={toast}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="glass-strong flex items-center gap-3 rounded-xl px-3.5 py-2.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-mint-soft)] text-[var(--accent-mint)]">
                <Eye className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-fg">Leitura registrada · {t.at}</div>
                <div className="text-[11px] text-fg-muted">{t.who} abriu {t.doc}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <Illustrative className="mt-14 text-right" />
    </div>
  );
}

/* ---------------- Interactive screen showcase ---------------- */

export type ShowcaseItem = { id: string; title: string; text: string; alt: string };

const SCREEN_BY_ID: Record<string, () => ReactNode> = {
  login: () => <LoginScreen />,
  resumo: () => <ResumoScreen />,
  documentos: () => <DocumentosScreen />,
  financeiro: () => <FinanceiroScreen />,
  auditoria: () => <AuditoriaScreen />,
};

const AUTO_MS = 7000;

export function ScreenShowcase({
  items,
  screens = SCREEN_BY_ID,
  address = (id) => (id === "login" ? "Área do Filiado · conexão segura" : "Painel Administrativo · conexão segura"),
  autoMs = AUTO_MS,
}: {
  items: ShowcaseItem[];
  screens?: Record<string, () => ReactNode>;
  address?: (id: string) => string;
  autoMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const t = setTimeout(() => setActive((v) => (v + 1) % items.length), autoMs);
    return () => clearTimeout(t);
  }, [active, paused, inView, items.length, autoMs]);

  const item = items[active];

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div role="tablist" aria-label="Telas do sistema" className="flex flex-col gap-2">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden rounded-xl border px-5 py-4 text-left transition-colors ${
                on ? "border-[var(--panel-border-strong)] bg-white/[0.05]" : "border-transparent hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`mono-label text-[11px] ${on ? "text-[var(--accent-amber)]" : "text-fg-dim"}`}>0{i + 1}</span>
                <span className={`font-[family-name:var(--font-display)] text-base font-semibold ${on ? "text-fg" : "text-fg-muted"}`}>{it.title}</span>
              </div>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pl-8 text-sm leading-relaxed text-fg-muted"
                  >
                    <span className="block pt-2">{it.text}</span>
                  </motion.p>
                )}
              </AnimatePresence>
              {on && !paused && inView && (
                <motion.span
                  key={`bar-${active}`}
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--accent-amber)] to-[var(--accent)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: autoMs / 1000, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div>
        <BrowserFrame address={address(item.id)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              role="img"
              aria-label={item.alt}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35 }}
              className="h-full w-full"
            >
              {screens[item.id]()}
            </motion.div>
          </AnimatePresence>
        </BrowserFrame>
        <Illustrative className="mt-3 text-right" />
      </div>
    </div>
  );
}

/* ---------------- Expiring signed link (security) ---------------- */

const LINK_SECONDS = 300;
const CYCLE_MS = 7000;

export function ExpiringLink() {
  const [left, setLeft] = useState(LINK_SECONDS);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const run = CYCLE_MS * 0.75;
      if (elapsed < run) setLeft(Math.ceil(LINK_SECONDS * (1 - elapsed / run)));
      else if (elapsed < CYCLE_MS) setLeft(0);
      else {
        start = now;
        setLeft(LINK_SECONDS);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const expired = left === 0;
  const pct = left / LINK_SECONDS;
  const r = 34;
  const circ = 2 * Math.PI * r;
  const mm = String(Math.floor(left / 60)).padStart(1, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div ref={ref} className="glass-strong relative overflow-hidden rounded-[1.5rem] p-6 sm:p-8">
      <div className="flex items-center gap-2 text-xs text-fg-muted">
        <FileLock2 className="h-4 w-4 text-[var(--accent-amber)]" strokeWidth={1.8} />
        <span className="mono-label">Endereço gerado para esta leitura</span>
      </div>

      <div className={`mt-4 rounded-xl border px-4 py-3 font-mono text-[12px] leading-relaxed transition-colors sm:text-[13px] ${
        expired ? "border-[#ff6b6b]/40 bg-[#ff6b6b]/[0.06] text-fg-dim line-through" : "border-[var(--panel-border)] bg-black/30 text-[#bcd0ff]"
      }`}>
        <span className="break-all">
          /documentos/balanco-2025.pdf?<span className="text-[var(--accent-amber)]">assinatura</span>=8f3a91c7e2…&amp;
          <span className="text-[var(--accent-amber)]">expira</span>=300
        </span>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(140,170,255,0.12)" strokeWidth="5" />
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke={expired ? "#ff6b6b" : pct < 0.25 ? "var(--accent-amber)" : "var(--accent-mint)"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct)}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            {expired ? <Lock className="h-6 w-6 text-[#ff6b6b]" strokeWidth={2} /> : <span className="font-mono text-sm font-semibold text-fg">{mm}:{ss}</span>}
          </div>
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={expired ? "exp" : "ok"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              {expired ? (
                <>
                  <div className="font-semibold text-[#ff8a8a]">Link expirado</div>
                  <div className="text-sm text-fg-muted">Copiado e repassado, ele já não abre nada.</div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 font-semibold text-fg">
                    <Clock className="h-4 w-4 text-[var(--accent-mint)]" strokeWidth={2} />
                    Válido por poucos minutos
                  </div>
                  <div className="text-sm text-fg-muted">Só para quem tem permissão, só nesta leitura.</div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 border-t border-[var(--panel-border)] pt-4 text-xs text-fg-dim">
        <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-mint)]" strokeWidth={2} />
        Animação acelerada para ilustrar o funcionamento.
      </div>
    </div>
  );
}
