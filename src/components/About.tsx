"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

const STATS = [
  { value: "4", label: "frentes de atuação", suffix: "" },
  { value: "100", label: "foco em pequenas e médias empresas", suffix: "%" },
  { value: "1", label: "ponto de contato, do diagnóstico à entrega", suffix: "" },
];

export default function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-heading" className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="glass-strong grid gap-10 rounded-[2rem] p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr_0.9fr] lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="mono-label text-xs text-[var(--accent)]">Sobre a EMC</span>
            <h2 id="sobre-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Tecnologia de grande empresa, no ritmo do seu negócio
            </h2>
            <p className="mt-5 leading-relaxed text-fg-muted">
              A EMC Soluções nasceu para tirar pequenos e médios negócios da
              posição de espectadores da transformação digital. Unimos
              inteligência artificial, desenvolvimento e integração de
              sistemas em um único fluxo de trabalho — sem burocracia, sem
              excesso de fornecedores, sem enrolação.
            </p>
            <p className="mt-4 leading-relaxed text-fg-muted">
              Entendemos o processo que você já tem, identificamos onde a
              tecnologia rende mais e entregamos soluções que sua equipe
              realmente usa.
            </p>
          </motion.div>

          {/* TODO: substituir por foto real da equipe/espaço */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="flex min-h-[14rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--panel-border)] bg-white/[0.02] text-fg-dim"
          >
            <Users className="h-8 w-8" strokeWidth={1.4} />
            <span className="mono-label text-[11px]">foto da equipe</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-center gap-6"
          >
            {STATS.map((s) => (
              <div key={s.label} className="border-b border-[var(--panel-border)] pb-5 last:border-0 last:pb-0">
                <div className="font-[family-name:var(--font-display)] text-4xl font-semibold text-gradient">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="mt-1 text-sm text-fg-muted">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
