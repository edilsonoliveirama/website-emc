"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Store, Network, LayoutDashboard } from "lucide-react";
import MiniDashboard from "./MiniDashboard";
import MobileFlowList from "./MobileFlowList";

type NodeDef = {
  id: string;
  x: number;
  y: number;
  label: string;
  detail: string;
  Icon: typeof Store;
};

const BRANCHES: NodeDef[] = [
  { id: "loja-a", x: 8, y: 18, label: "Loja A", detail: "Vendas e estoque locais", Icon: Store },
  { id: "loja-b", x: 8, y: 50, label: "Loja B", detail: "Vendas e estoque locais", Icon: Store },
  { id: "loja-c", x: 8, y: 82, label: "Loja C", detail: "Vendas e estoque locais", Icon: Store },
];

const HUB: NodeDef = { id: "hub", x: 50, y: 50, label: "Central EMC", detail: "Dados consolidados em tempo real", Icon: Network };
const DASHBOARD: NodeDef = { id: "dashboard", x: 92, y: 50, label: "Dashboard unificado", detail: "Visão gerencial de todas as filiais", Icon: LayoutDashboard };

function edgePath(a: NodeDef, b: NodeDef) {
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

const CYCLE_DURATION = 1.6;
const PULSE_DURATION = CYCLE_DURATION * 0.85;

export default function MergeFlow() {
  const [activeBranch, setActiveBranch] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [mobileStep, setMobileStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [pulsePos, setPulsePos] = useState<{ x: number; y: number; opacity: number }>({
    x: BRANCHES[0].x,
    y: BRANCHES[0].y,
    opacity: 0,
  });
  const ref = useRef<HTMLDivElement>(null);
  const seg1Ref = useRef<SVGPathElement>(null);
  const seg2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveBranch((prev) => (prev + 1) % BRANCHES.length);
      setPulseKey((k) => k + 1);
      setMobileStep(0);
    }, CYCLE_DURATION * 1000);
    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const stepDuration = (CYCLE_DURATION * 1000) / 2;
    const timer = setTimeout(() => setMobileStep(1), stepDuration);
    return () => clearTimeout(timer);
  }, [inView, pulseKey]);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = Math.min(elapsed / PULSE_DURATION, 1);

      const seg1 = seg1Ref.current;
      const seg2 = seg2Ref.current;
      if (!seg1 || !seg2) return;

      const len1 = seg1.getTotalLength();
      const len2 = seg2.getTotalLength();
      const totalLen = len1 + len2;
      const dist = t * totalLen;

      let point: DOMPoint;
      if (dist <= len1) {
        point = seg1.getPointAtLength(dist);
      } else {
        point = seg2.getPointAtLength(Math.min(dist - len1, len2));
      }

      const opacity = t < 0.06 ? t / 0.06 : t > 0.92 ? (1 - t) / 0.08 : 1;
      setPulsePos({ x: point.x, y: point.y, opacity: Math.max(0, Math.min(1, opacity)) });

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pulseKey, inView, activeBranch]);

  const currentBranch = BRANCHES[activeBranch];
  const allNodes = [...BRANCHES, HUB, DASHBOARD];

  return (
    <section id="fluxo-filiais" aria-labelledby="fluxo-filiais-heading" className="section-divider relative px-4 py-28" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">system.merge</span>
          <h2 id="fluxo-filiais-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Várias filiais, uma única fonte de verdade
          </h2>
          <p className="mt-4 text-fg-muted">
            Empresas com múltiplas unidades param de fechar planilhas no
            fim do mês: cada filial alimenta a central automaticamente, em
            tempo real.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass mt-14 overflow-hidden rounded-[2rem] p-6 sm:p-10"
        >
          <MobileFlowList
            items={[
              ...BRANCHES.map((b) => ({
                id: b.id,
                label: b.label,
                detail: b.detail,
                Icon: b.Icon,
                active: b.id === currentBranch.id,
                dimmed: b.id !== currentBranch.id,
              })),
              { id: HUB.id, label: HUB.label, detail: HUB.detail, Icon: HUB.Icon, active: true },
              {
                id: DASHBOARD.id,
                label: DASHBOARD.label,
                detail: DASHBOARD.detail,
                active: true,
                render: <MiniDashboard active={inView} />,
              },
            ]}
            pulseSegment={mobileStep === 0 ? activeBranch : 3}
            pulseKey={`${pulseKey}-${mobileStep}`}
            pulseDuration={(CYCLE_DURATION * 1000) / 2 / 1000 * 0.85}
          />

          <div className="relative hidden aspect-[16/12] w-full sm:block sm:aspect-[2/1]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="mergeLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="mergeLineFinal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3ddc97" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {BRANCHES.map((b) => {
                const active = b.id === currentBranch.id;
                return (
                  <path
                    key={b.id}
                    d={edgePath(b, HUB)}
                    fill="none"
                    stroke={active ? "url(#mergeLine)" : "var(--panel-border)"}
                    strokeWidth={active ? 0.5 : 0.35}
                    vectorEffect="non-scaling-stroke"
                    className="transition-[stroke,stroke-width] duration-500"
                  />
                );
              })}

              <path
                d={edgePath(HUB, DASHBOARD)}
                fill="none"
                stroke="url(#mergeLineFinal)"
                strokeWidth={0.5}
                vectorEffect="non-scaling-stroke"
              />

              {/* Hidden reference paths for the active route, used to sample exact curve points */}
              <path ref={seg1Ref} d={edgePath(currentBranch, HUB)} fill="none" stroke="none" />
              <path ref={seg2Ref} d={edgePath(HUB, DASHBOARD)} fill="none" stroke="none" />
            </svg>

            <div
              className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_4px_var(--accent)]"
              style={{
                left: `${pulsePos.x}%`,
                top: `${pulsePos.y}%`,
                opacity: pulsePos.opacity,
              }}
            />

            {allNodes.map((n) => {
              const isBranch = BRANCHES.some((b) => b.id === n.id);
              const active = !isBranch || n.id === currentBranch.id;
              const isHub = n.id === HUB.id;
              const isDashboard = n.id === DASHBOARD.id;
              return (
                <div
                  key={n.id}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                  style={{ left: `${n.x}%`, top: `${n.y}%`, width: isDashboard ? "9rem" : isHub ? "10rem" : "8rem" }}
                >
                  {isDashboard ? (
                    <motion.div
                      animate={{ borderColor: "rgba(61,220,151,0.5)", backgroundColor: "rgba(61,220,151,0.08)" }}
                      className="h-16 w-full overflow-hidden rounded-2xl border sm:h-[4.5rem]"
                    >
                      <MiniDashboard active={inView} />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{
                        borderColor: active ? "rgba(140,170,255,0.6)" : "rgba(140,170,255,0.16)",
                        backgroundColor: active ? "rgba(91,140,255,0.18)" : "rgba(255,255,255,0.02)",
                        opacity: isBranch && !active ? 0.45 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`relative flex items-center justify-center rounded-2xl border ${
                        isHub ? "h-14 w-14 sm:h-16 sm:w-16" : "h-11 w-11 sm:h-12 sm:w-12"
                      }`}
                    >
                      <n.Icon
                        strokeWidth={1.6}
                        className={`transition-colors duration-300 ${isHub ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5"} ${
                          active ? "text-[var(--accent)]" : "text-fg-dim"
                        }`}
                      />
                      {isHub && (
                        <motion.span
                          className="absolute inset-0 rounded-2xl border border-[var(--accent)]"
                          initial={{ opacity: 0.5, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.35 }}
                          transition={{ duration: CYCLE_DURATION, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                    </motion.div>
                  )}
                  <h3
                    className={`mt-2 font-[family-name:var(--font-display)] text-xs font-semibold transition-opacity duration-300 sm:text-sm ${
                      isBranch && !active ? "opacity-45" : "opacity-100"
                    }`}
                  >
                    {n.label}
                  </h3>
                  <p
                    className={`mt-0.5 hidden text-[11px] leading-snug text-fg-muted transition-opacity duration-300 sm:block ${
                      isBranch && !active ? "opacity-45" : "opacity-100"
                    }`}
                  >
                    {n.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
