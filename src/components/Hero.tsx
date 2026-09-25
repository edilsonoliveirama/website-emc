"use client";

import { motion } from "framer-motion";
import NodeMesh from "./NodeMesh";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pt-36 pb-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] text-[#bcd0ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            IA · Desenvolvimento · Integração
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.4rem]">
            Menos trabalho manual.{" "}
            <span className="text-gradient">Mais negócio rodando sozinho.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
            A EMC Soluções aplica IA, desenvolve software sob medida e integra
            as ferramentas que sua empresa já usa, para que pequenos e médios
            negócios operem com a eficiência de uma grande, sem contratar uma
            equipe de tecnologia inteira.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#06080f] transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
            >
              Solicitar diagnóstico gratuito
            </a>
            <a
              href="#servicos"
              className="w-full rounded-full border border-[var(--panel-border-strong)] px-6 py-3 text-sm font-medium text-fg transition-colors hover:bg-white/5 sm:w-auto"
            >
              Ver soluções
            </a>
          </div>

          <p className="mt-4 text-xs text-fg-dim">
            Conversa de 20 minutos no WhatsApp, sem compromisso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="glass relative aspect-square w-full overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-square"
        >
          <NodeMesh />
        </motion.div>
      </div>
    </section>
  );
}
