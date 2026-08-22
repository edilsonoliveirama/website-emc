"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Brain, Bot, Headset, CircleCheck } from "lucide-react";
import MobileFlowList from "./MobileFlowList";

type NodeDef = {
  id: string;
  x: number;
  y: number;
  label: string;
  detail: string;
  Icon: typeof Brain;
};

const NODES: Record<string, NodeDef> = {
  message: { id: "message", x: 8, y: 50, label: "Mensagem recebida", detail: "Cliente escreve no WhatsApp, chat ou e-mail", Icon: MessageCircle },
  triage: { id: "triage", x: 34, y: 50, label: "IA classifica", detail: "Gateway LLM analisa intenção e complexidade", Icon: Brain },
  auto: { id: "auto", x: 66, y: 22, label: "Resolve automaticamente", detail: "Dúvida simples, resposta imediata", Icon: Bot },
  human: { id: "human", x: 66, y: 78, label: "Escala para humano", detail: "Caso complexo, atendente assume com contexto pronto", Icon: Headset },
  done: { id: "done", x: 92, y: 50, label: "Cliente atendido", detail: "Ticket resolvido e registrado", Icon: CircleCheck },
};

const EDGES: [string, string][] = [
  ["message", "triage"],
  ["triage", "auto"],
  ["triage", "human"],
  ["auto", "done"],
  ["human", "done"],
];

function edgePath(a: NodeDef, b: NodeDef) {
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

const CYCLE_DURATION = 3.2;
const PULSE_DURATION = CYCLE_DURATION * 0.85;

export default function BranchFlow() {
  const [branch, setBranch] = useState<"auto" | "human">("auto");
  const [pulseKey, setPulseKey] = useState(0);
  const [mobileStep, setMobileStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [pulsePos, setPulsePos] = useState<{ x: number; y: number; opacity: number }>({ x: NODES.message.x, y: NODES.message.y, opacity: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const seg1Ref = useRef<SVGPathElement>(null);
  const seg2Ref = useRef<SVGPathElement>(null);
  const seg3Ref = useRef<SVGPathElement>(null);

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
      setBranch((prev) => (prev === "auto" ? "human" : "auto"));
      setPulseKey((k) => k + 1);
      setMobileStep(0);
    }, CYCLE_DURATION * 1000);
    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const stepDuration = (CYCLE_DURATION * 1000) / 3;
    const timers = [1, 2].map((step) =>
      setTimeout(() => setMobileStep(step), step * stepDuration)
    );
    return () => timers.forEach(clearTimeout);
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
      const seg3 = seg3Ref.current;
      if (!seg1 || !seg2 || !seg3) return;

      const len1 = seg1.getTotalLength();
      const len2 = seg2.getTotalLength();
      const len3 = seg3.getTotalLength();
      const totalLen = len1 + len2 + len3;
      const dist = t * totalLen;

      let point: DOMPoint;
      if (dist <= len1) {
        point = seg1.getPointAtLength(dist);
      } else if (dist <= len1 + len2) {
        point = seg2.getPointAtLength(dist - len1);
      } else {
        point = seg3.getPointAtLength(Math.min(dist - len1 - len2, len3));
      }

      const opacity = t < 0.06 ? t / 0.06 : t > 0.92 ? (1 - t) / 0.08 : 1;
      setPulsePos({ x: point.x, y: point.y, opacity: Math.max(0, Math.min(1, opacity)) });

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pulseKey, inView, branch]);

  const activePath = [NODES.message.id, NODES.triage.id, branch, NODES.done.id];
  const isEdgeActive = (a: string, b: string) => {
    const ia = activePath.indexOf(a);
    const ib = activePath.indexOf(b);
    return ia !== -1 && ib === ia + 1;
  };
  const isNodeActive = (id: string) => activePath.includes(id);

  const branchNode = branch === "auto" ? NODES.auto : NODES.human;

  return (
    <section id="fluxo-atendimento" aria-labelledby="fluxo-atendimento-heading" className="section-divider relative px-4 py-28" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">system.route</span>
          <h2 id="fluxo-atendimento-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            A IA decide o caminho certo para cada caso
          </h2>
          <p className="mt-4 text-fg-muted">
            Outro exemplo comum: atendimento que se divide sozinho entre
            resposta automática e um humano, sem o cliente perceber a
            costura por trás.
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
              NODES.message,
              NODES.triage,
              NODES.auto,
              NODES.human,
              NODES.done,
            ].map((n) => {
              const isBranchOption = n.id === "auto" || n.id === "human";
              const onActivePath = isNodeActive(n.id);
              return {
                id: n.id,
                label: n.label,
                detail: n.detail,
                Icon: n.Icon,
                active: onActivePath,
                dimmed: isBranchOption && !onActivePath,
              };
            })}
            pulseSegment={mobileStep < 2 ? mobileStep : branch === "auto" ? 2 : 3}
            pulseKey={`${pulseKey}-${mobileStep}`}
            pulseDuration={(CYCLE_DURATION * 1000) / 3 / 1000 * 0.85}
          />

          <div className="relative hidden aspect-[16/10] w-full sm:block sm:aspect-[2/1]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="branchLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {EDGES.map(([a, b]) => (
                <path
                  key={`${a}-${b}`}
                  d={edgePath(NODES[a], NODES[b])}
                  fill="none"
                  stroke={isEdgeActive(a, b) ? "url(#branchLine)" : "var(--panel-border)"}
                  strokeWidth={isEdgeActive(a, b) ? 0.5 : 0.35}
                  vectorEffect="non-scaling-stroke"
                  className="transition-[stroke,stroke-width] duration-500"
                />
              ))}

              {/* Hidden reference paths for the active route, used to sample exact curve points */}
              <path ref={seg1Ref} d={edgePath(NODES.message, NODES.triage)} fill="none" stroke="none" />
              <path ref={seg2Ref} d={edgePath(NODES.triage, branchNode)} fill="none" stroke="none" />
              <path ref={seg3Ref} d={edgePath(branchNode, NODES.done)} fill="none" stroke="none" />
            </svg>

            <div
              className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_4px_var(--accent)]"
              style={{
                left: `${pulsePos.x}%`,
                top: `${pulsePos.y}%`,
                opacity: pulsePos.opacity,
              }}
            />

            {Object.values(NODES).map((n) => {
              const active = isNodeActive(n.id);
              const isBranchLabel = n.id === "auto" || n.id === "human";
              const dimmed = isBranchLabel && !active;
              return (
                <div
                  key={n.id}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                  style={{ left: `${n.x}%`, top: `${n.y}%`, width: "9.5rem" }}
                >
                  <motion.div
                    animate={{
                      borderColor: active ? "rgba(140,170,255,0.6)" : "rgba(140,170,255,0.16)",
                      backgroundColor: active ? "rgba(91,140,255,0.18)" : "rgba(255,255,255,0.02)",
                      opacity: dimmed ? 0.45 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl border sm:h-14 sm:w-14"
                  >
                    <n.Icon
                      strokeWidth={1.6}
                      className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 ${
                        active ? "text-[var(--accent)]" : "text-fg-dim"
                      }`}
                    />
                  </motion.div>
                  <h3
                    className={`mt-3 font-[family-name:var(--font-display)] text-xs font-semibold transition-opacity duration-300 sm:text-sm ${
                      dimmed ? "opacity-45" : "opacity-100"
                    }`}
                  >
                    {n.label}
                  </h3>
                  <p
                    className={`mt-1 hidden text-[11px] leading-snug text-fg-muted transition-opacity duration-300 sm:block ${
                      dimmed ? "opacity-45" : "opacity-100"
                    }`}
                  >
                    {n.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-4">
            <span className="mono-label text-[11px] text-fg-dim">rota ativa</span>
            <span className="mono-label rounded-full border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] text-[#bcd0ff]">
              {branch === "auto" ? "resposta automática" : "atendimento humano"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
