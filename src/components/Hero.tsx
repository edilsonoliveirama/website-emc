"use client";

import { Fragment, useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import FlowField from "./hero/FlowField";
import ProductShowcase, { PRODUCTS, AUTO_MS } from "./hero/ProductShowcase";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

// Headline words map 1:1 to the showcase tabs (Gestão, Nota fiscal, WhatsApp, IA).
const HEADLINE = [
  { text: "Gestão", sep: ", " },
  { text: "nota fiscal", sep: ", " },
  { text: "WhatsApp", sep: " e " },
  { text: "IA", sep: "." },
];
const GUARANTEES = ["Diagnóstico gratuito", "Resposta em até 1 dia útil", "Sem fidelidade"];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sx = useMotionValue(-1000);
  const sy = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(91,140,255,0.10), transparent 70%)`;

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % PRODUCTS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        sx.set(e.clientX - r.left);
        sy.set(e.clientY - r.top);
      }}
      className="relative isolate overflow-hidden px-4 pb-24 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-28"
    >
      <FlowField targetX={0.74} targetY={0.52} />
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}>
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] text-[#bcd0ff]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            Software e IA para pequenas e médias empresas
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-6 font-[family-name:var(--font-display)] text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[3.4rem] lg:text-[3.8rem]"
          >
            <span onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              {HEADLINE.map((w, i) => {
                const on = i === active;
                return (
                  <Fragment key={w.text}>
                    <span onMouseEnter={() => setActive(i)} className="relative inline-block cursor-default whitespace-nowrap">
                      <span className={`transition-colors duration-500 ${on ? "text-gradient" : "text-fg"}`}>{w.text}</span>
                      {on && (
                        <motion.span
                          layoutId="headline-underline"
                          aria-hidden="true"
                          className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] shadow-[0_0_16px_rgba(91,140,255,0.8)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </span>
                    <span className="text-fg">{w.sep}</span>
                  </Fragment>
                );
              })}
            </span>
            <span className="mt-2 block text-fg-muted">Tudo integrado, em um só parceiro.</span>
          </motion.h1>

          <motion.p variants={fadeUp} transition={{ duration: 0.7 }} className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Sistema de gestão, emissor de nota fiscal, API de WhatsApp e acesso a GPT, Claude, GLM e outros
            modelos de IA. Cada peça conversa com a outra, e o suporte é de quem desenvolveu.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-[15px] font-semibold text-bg shadow-[0_10px_40px_-10px_rgba(91,140,255,0.8)] transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
            >
              Quero meu diagnóstico gratuito
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
            </a>
            <a
              href="#servicos"
              className="inline-flex w-full items-center justify-center rounded-full border border-[var(--panel-border-strong)] px-7 py-3.5 text-[15px] font-medium text-fg transition-colors hover:bg-white/5 sm:w-auto"
            >
              Conhecer as soluções
            </a>
          </motion.div>

          <motion.ul variants={fadeUp} transition={{ duration: 0.6 }} className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-center gap-1.5 text-[13px] text-fg-muted">
                <Check className="h-3.5 w-3.5 text-[var(--accent-mint)]" strokeWidth={3} />
                {g}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <ProductShowcase active={active} onSelect={setActive} paused={paused || !!reduce} />
        </motion.div>
      </div>
    </section>
  );
}
