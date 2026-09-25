"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileText, Rocket, LifeBuoy } from "lucide-react";

const STEPS = [
  {
    Icon: MessageCircle,
    step: "01",
    title: "Diagnóstico gratuito",
    desc: "Conversa de 20 minutos no WhatsApp para entender seu processo e onde a tecnologia rende mais.",
  },
  {
    Icon: FileText,
    step: "02",
    title: "Proposta com preço fechado",
    desc: "Escopo claro e valor combinado antes de qualquer linha de código, sem surpresa na fatura.",
  },
  {
    Icon: Rocket,
    step: "03",
    title: "Entrega em etapas",
    desc: "Você acompanha o progresso e testa cada parte funcionando, não só no dia da entrega final.",
  },
  {
    Icon: LifeBuoy,
    step: "04",
    title: "Suporte contínuo",
    desc: "Depois de no ar, seguimos disponíveis para ajuste, dúvida ou o próximo passo do projeto.",
  },
];

const GUARANTEES = [
  "Resposta em até 1 dia útil",
  "Orçamento sem compromisso",
  "Sem contrato de fidelidade",
];

export default function HowWeWork() {
  return (
    <section id="como-trabalhamos" aria-labelledby="como-trabalhamos-heading" className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">Como trabalhamos</span>
          <h2 id="como-trabalhamos-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Do primeiro contato à entrega, sem mistério
          </h2>
          <p className="mt-4 text-fg-muted">
            Um processo simples, pensado para quem nunca contratou tecnologia
            sob medida antes.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass relative flex flex-col rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <s.Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="mono-label text-xs text-fg-dim">{s.step}</span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {GUARANTEES.map((g) => (
            <div key={g} className="flex items-center gap-2 text-sm text-fg-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-mint)]" />
              {g}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
