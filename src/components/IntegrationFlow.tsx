"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Globe, CreditCard, CircleCheck, PackageCheck } from "lucide-react";
import MobileFlowList from "./MobileFlowList";

const STEPS = [
  {
    id: "site",
    label: "Seu site",
    detail: "Cliente finaliza o pedido",
    Icon: Globe,
  },
  {
    id: "payment",
    label: "Integração de pagamento",
    detail: "Cobrança processada via gateway",
    Icon: CreditCard,
  },
  {
    id: "confirmed",
    label: "Pagamento confirmado",
    detail: "Status sincronizado em tempo real",
    Icon: CircleCheck,
  },
  {
    id: "shipping",
    label: "Expedição do produto",
    detail: "Pedido liberado para envio",
    Icon: PackageCheck,
  },
];

const STEP_DURATION = 1.4;

export default function IntegrationFlow() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

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
      setActive((prev) => (prev + 1) % STEPS.length);
    }, STEP_DURATION * 1000);
    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    controls.start({
      left: `${(active / (STEPS.length - 1)) * 100}%`,
      transition: { duration: STEP_DURATION * 0.7, ease: "easeInOut" },
    });
  }, [active, controls]);

  return (
    <section id="fluxo-pagamento" aria-labelledby="fluxo-pagamento-heading" className="section-divider relative px-4 py-28" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">system.flow</span>
          <h2 id="fluxo-pagamento-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Da venda à expedição, sem intervenção manual
          </h2>
          <p className="mt-4 text-fg-muted">
            Um exemplo real de integração que a EMC entrega: o pedido flui
            entre sistemas sozinho, do clique de compra à separação do
            produto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass mt-14 rounded-[2rem] p-8 sm:p-12"
        >
          <MobileFlowList
            items={STEPS.map((step, i) => ({
              id: step.id,
              label: step.label,
              detail: step.detail,
              Icon: step.Icon,
              active: i <= active,
            }))}
            pulseSegment={active > 0 ? active - 1 : undefined}
            pulseKey={active}
            pulseDuration={STEP_DURATION * 0.85}
          />

          <div className="relative hidden sm:block">
            {/* Track line */}
            <div className="absolute left-0 right-0 top-8 h-px bg-[var(--panel-border-strong)]" />

            {/* Progress fill */}
            <motion.div
              className="absolute top-8 left-0 h-px bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
              animate={{
                width: `${(active / (STEPS.length - 1)) * 100}%`,
              }}
              transition={{ duration: STEP_DURATION * 0.7, ease: "easeInOut" }}
            />

            {/* Traveling pulse */}
            <motion.div
              className="absolute top-8 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_4px_var(--accent)]"
              animate={controls}
              initial={{ left: "0%" }}
            />

            <div className="relative grid grid-cols-4 gap-y-0">
              {STEPS.map((step, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <div key={step.id} className="flex flex-col items-center text-center px-2">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.12 : 1,
                        borderColor: isActive || isPast
                          ? "rgba(140,170,255,0.6)"
                          : "rgba(140,170,255,0.16)",
                        backgroundColor: isActive
                          ? "rgba(91,140,255,0.18)"
                          : isPast
                          ? "rgba(91,140,255,0.08)"
                          : "rgba(255,255,255,0.02)",
                      }}
                      transition={{ duration: 0.35 }}
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border sm:h-16 sm:w-16"
                    >
                      <step.Icon
                        strokeWidth={1.6}
                        className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors duration-300 ${
                          isActive || isPast ? "text-[var(--accent)]" : "text-fg-dim"
                        }`}
                      />
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-2xl border border-[var(--accent)]"
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.4 }}
                          transition={{ duration: STEP_DURATION, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                    </motion.div>

                    <span
                      className={`mono-label mt-4 text-[11px] transition-colors duration-300 ${
                        isActive ? "text-[var(--accent)]" : "text-fg-dim"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-sm font-semibold sm:text-base">
                      {step.label}
                    </h3>
                    <p className="mt-1 hidden text-xs text-fg-muted sm:block">
                      {step.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
