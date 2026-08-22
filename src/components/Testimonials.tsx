"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// TODO: substituir por depoimentos e logos reais de clientes
const TESTIMONIALS = [
  {
    name: "Nome do Cliente",
    role: "Cargo, Empresa",
    quote:
      "Depoimento de exemplo — substituir pelo relato real de um cliente sobre o resultado obtido com a EMC.",
  },
  {
    name: "Nome do Cliente",
    role: "Cargo, Empresa",
    quote:
      "Depoimento de exemplo — substituir pelo relato real de um cliente sobre o resultado obtido com a EMC.",
  },
  {
    name: "Nome do Cliente",
    role: "Cargo, Empresa",
    quote:
      "Depoimento de exemplo — substituir pelo relato real de um cliente sobre o resultado obtido com a EMC.",
  },
];

const CLIENT_LOGOS = Array.from({ length: 6 }, (_, i) => `Cliente ${i + 1}`);

export default function Testimonials() {
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-heading" className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">Prova social</span>
          <h2 id="depoimentos-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Quem já automatizou com a gente
          </h2>
          <p className="mt-4 text-fg-muted">
            Resultados reais de negócios que tiraram processos manuais do
            caminho.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass flex flex-col rounded-xl p-7"
            >
              <div className="flex gap-0.5 text-[var(--accent-amber)]">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--panel-border)] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-xs font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-fg-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16"
        >
          <p className="mono-label text-center text-[11px] text-fg-dim">
            Negócios que confiam na EMC
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60">
            {CLIENT_LOGOS.map((label) => (
              <div
                key={label}
                className="flex h-9 w-28 items-center justify-center rounded-lg border border-dashed border-[var(--panel-border)] text-[11px] text-fg-dim"
              >
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
