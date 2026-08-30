"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Globe, CreditCard, CircleCheck, PackageCheck, Truck } from "lucide-react";
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

  // Segment the traveling pulse departs from; hidden on the wrap frame (last → first).
  const pulseFrom = active > 0 ? active - 1 : -1;

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
            <div className="absolute left-0 right-0 top-8 z-0 h-px bg-[var(--panel-border-strong)]" />

            {/* Segment fills: each lights up once its step has been reached */}
            {STEPS.slice(0, -1).map((step, i) => (
              <motion.div
                key={step.id}
                className="absolute top-8 z-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
                style={{
                  left: `${(i / (STEPS.length - 1)) * 100}%`,
                  width: `${(1 / (STEPS.length - 1)) * 100}%`,
                }}
                animate={{ scaleX: i < active ? 1 : 0 }}
                transition={{ duration: STEP_DURATION * 0.6, ease: "easeInOut" }}
              />
            ))}

            {/* Traveling pulse: fades in, crosses the active segment, fades out */}
            <AnimatePresence>
              {pulseFrom >= 0 && (
                <motion.div
                  key={active}
                  className="absolute top-8 z-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_4px_var(--accent)]"
                  initial={{
                    left: `${(pulseFrom / (STEPS.length - 1)) * 100}%`,
                    opacity: 0,
                  }}
                  animate={{
                    left: `${(active / (STEPS.length - 1)) * 100}%`,
                    opacity: [0, 1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    left: { duration: STEP_DURATION * 0.75, ease: "easeInOut" },
                    opacity: { duration: STEP_DURATION * 0.75, times: [0, 0.15, 0.8, 1] },
                  }}
                />
              )}
            </AnimatePresence>

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
                          ? "rgba(91,140,255,0.22)"
                          : isPast
                          ? "rgba(91,140,255,0.12)"
                          : "rgba(14,20,36,0.95)",
                        boxShadow: isActive
                          ? "0 0 0 1px rgba(91,140,255,0.25), 0 8px 28px -6px rgba(91,140,255,0.55)"
                          : "0 0 0 0 rgba(91,140,255,0)",
                      }}
                      transition={{ duration: 0.35 }}
                      className="relative z-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-sm sm:h-16 sm:w-16"
                    >
                      {step.id === "payment" && isActive ? (
                        <motion.div
                          key={`payment-${active}`}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <CreditCard strokeWidth={1.6} className="h-6 w-6 text-[var(--accent)] sm:h-7 sm:w-7" />
                          <motion.span
                            className="absolute inset-y-0 left-0 w-full bg-gradient-to-b from-transparent via-white/70 to-transparent"
                            style={{ mixBlendMode: "overlay" }}
                            initial={{ x: "-120%" }}
                            animate={{ x: "120%" }}
                            transition={{ duration: STEP_DURATION * 0.75, ease: "easeInOut" }}
                          />
                        </motion.div>
                      ) : step.id === "confirmed" && isActive ? (
                        <motion.svg
                          key={`confirmed-${active}`}
                          viewBox="0 0 24 24"
                          className="h-6 w-6 text-[var(--accent)] sm:h-7 sm:w-7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <motion.circle
                            cx="12"
                            cy="12"
                            r="10"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: STEP_DURATION * 0.4, ease: "easeOut" }}
                          />
                          <motion.path
                            d="M8 12.5l2.5 2.5L16 9.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: STEP_DURATION * 0.3, delay: STEP_DURATION * 0.35, ease: "easeOut" }}
                          />
                        </motion.svg>
                      ) : step.id === "shipping" && isActive ? (
                        <motion.div
                          key={`shipping-${active}`}
                          initial={{ x: "-140%", opacity: 0 }}
                          animate={{ x: "160%", opacity: [0, 1, 1, 0] }}
                          transition={{ duration: STEP_DURATION * 0.9, ease: "easeIn", times: [0, 0.2, 0.75, 1] }}
                        >
                          <motion.div
                            animate={{ y: [0, -1.5, 0, 1, 0] }}
                            transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Truck strokeWidth={1.6} className="h-6 w-6 text-[var(--accent)] sm:h-7 sm:w-7" />
                          </motion.div>
                        </motion.div>
                      ) : (
                        <step.Icon
                          strokeWidth={1.6}
                          className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors duration-300 ${
                            isActive || isPast ? "text-[var(--accent)]" : "text-fg-dim"
                          }`}
                        />
                      )}
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-2xl border border-[var(--accent)]"
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.4 }}
                          transition={{
                            duration: STEP_DURATION,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i === 0 ? 0 : STEP_DURATION * 0.75,
                          }}
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
