"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

const TIERS = [
  {
    tag: "system.ai",
    title: "IA aplicada",
    from: "R$ 1.500",
    period: "projeto",
    desc: "Agentes e automações para o seu atendimento ou processo interno.",
    points: ["Chatbot ou agente de atendimento", "Fluxo de automação sob medida", "Integração com WhatsApp/e-mail"],
  },
  {
    tag: "system.build",
    title: "Desenvolvimento",
    from: "R$ 2.500",
    period: "projeto",
    desc: "Sites e sistemas construídos para o seu processo específico.",
    points: ["Site institucional ou landing page", "Painel ou sistema interno", "Suporte pós-entrega"],
    featured: true,
  },
  {
    tag: "system.connect",
    title: "Integração",
    from: "R$ 1.200",
    period: "projeto",
    desc: "Conecte ferramentas que hoje não conversam entre si.",
    points: ["ERP, CRM ou planilhas conectados", "APIs e webhooks", "Sincronização automática de dados"],
  },
];

export default function Pricing() {
  return (
    <section id="investimento" aria-labelledby="investimento-heading" className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">Investimento</span>
          <h2 id="investimento-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Faixas de investimento por frente
          </h2>
          <p className="mt-4 text-fg-muted">
            Cada projeto é orçado sob medida: os valores abaixo são o ponto
            de partida mais comum para cada tipo de solução.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-xl p-7 ${
                tier.featured
                  ? "glass-strong border-[var(--accent-amber)]/40"
                  : "glass"
              }`}
            >
              {tier.featured && (
                <span className="mono-label absolute -top-3 left-7 rounded-full bg-[var(--accent-amber)] px-3 py-1 text-[10px] text-[#06080f]">
                  mais procurado
                </span>
              )}
              <span className="mono-label text-[11px] text-fg-dim">{tier.tag}</span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold">
                {tier.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{tier.desc}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="mono-label text-xs text-fg-dim">a partir de</span>
              </div>
              <div
                className={`font-[family-name:var(--font-display)] text-3xl font-semibold ${
                  tier.featured ? "text-[var(--accent-amber)]" : "text-gradient"
                }`}
              >
                {tier.from}
                <span className="ml-1 text-sm font-normal text-fg-muted">/{tier.period}</span>
              </div>

              <ul className="mt-6 space-y-2 border-t border-[var(--panel-border)] pt-5">
                {tier.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-fg-muted">
                    <Check
                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                        tier.featured ? "text-[var(--accent-amber)]" : "text-[var(--accent)]"
                      }`}
                      strokeWidth={2.5}
                    />
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(`Olá! Quero um orçamento para ${tier.title.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                  tier.featured
                    ? "bg-[var(--accent-amber)] text-[#06080f]"
                    : "border border-[var(--panel-border-strong)] text-fg"
                }`}
              >
                Solicitar orçamento
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
