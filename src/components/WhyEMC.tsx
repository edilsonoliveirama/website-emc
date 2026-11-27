"use client";

import { motion } from "framer-motion";
import { FileSignature, LifeBuoy, ShieldCheck, Puzzle } from "lucide-react";

const REASONS = [
  {
    Icon: FileSignature,
    title: "Preço fechado antes de começar",
    desc: "Escopo, prazo e valor por escrito depois do diagnóstico gratuito. Sem hora extra surpresa nem orçamento que cresce no meio do caminho.",
  },
  {
    Icon: LifeBuoy,
    title: "Quem fez é quem atende",
    desc: "Nada de call center ou ticket que some. O suporte é da mesma equipe que desenvolveu, pelo WhatsApp.",
  },
  {
    Icon: ShieldCheck,
    title: "Segurança de grande empresa",
    desc: "Fundador com certificações Microsoft em arquitetura de nuvem e segurança, e anos em projetos de telecom e setor público. Seus dados e os dos seus clientes protegidos.",
  },
  {
    Icon: Puzzle,
    title: "Comece pequeno, cresça junto",
    desc: "Comece por uma solução e conecte as outras quando fizer sentido. As assinaturas não têm fidelidade.",
  },
];

/** Diferenciais: responde "por que contratar a EMC e não outra empresa?". */
export default function WhyEMC() {
  return (
    <section id="por-que-emc" aria-labelledby="por-que-emc-heading" className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">Por que a EMC</span>
          <h2
            id="por-que-emc-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Tecnologia sem dor de cabeça para quem não tem equipe de TI
          </h2>
          <p className="mt-4 text-fg-muted">
            Você conversa com quem entende do assunto, sabe quanto vai pagar e tem a quem recorrer depois.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="glass flex flex-col rounded-[14px] p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] text-[var(--accent)]">
                <r.Icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
