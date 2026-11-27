"use client";

import { motion } from "framer-motion";
import { Check, LayoutDashboard, FileText, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/contact";
import SpotlightCard from "./SpotlightCard";

const TIERS = [
  {
    title: "IA aplicada",
    quoteLabel: "IA aplicada",
    desc: "Atenda mais rápido e automatize o que hoje consome tempo da sua equipe.",
    points: ["Assistente de IA no WhatsApp", "Agendamento, qualificação e cobrança", "Fluxo de automação sob medida"],
    featured: true,
  },
  {
    title: "Desenvolvimento",
    quoteLabel: "desenvolvimento",
    desc: "Um site ou sistema construído para o seu processo, pronto para crescer com você.",
    points: ["Site institucional ou landing page", "Painel ou sistema interno", "Suporte pós-entrega"],
  },
  {
    title: "Integração",
    quoteLabel: "integração de sistemas",
    desc: "Pare de copiar dado à mão entre sistemas que já fazem parte do seu dia a dia.",
    points: ["ERP, CRM ou planilhas conectados", "APIs e webhooks", "Sincronização automática de dados"],
  },
];

const SUBSCRIPTIONS = [
  { Icon: LayoutDashboard, label: "Sistema de gestão" },
  { Icon: FileText, label: "Emissor de nota fiscal" },
  { Icon: MessageCircle, label: "Mensagens automáticas no WhatsApp" },
  { Icon: Sparkles, label: "IA para seus sistemas (GPT, Claude e outros)" },
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
            Proposta clara, antes de começar
          </h2>
          <p className="mt-4 text-fg-muted">
            Depois do diagnóstico gratuito, você recebe uma proposta com escopo e valor fechados. Os produtos
            por assinatura têm planos mensais conforme o volume de uso.
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
              className="relative"
            >
              {tier.featured && (
                <span className="mono-label absolute -top-3 left-7 z-10 rounded-full bg-[var(--cta)] px-3 py-1 text-[10px] text-white">
                  mais procurado
                </span>
              )}
              <SpotlightCard
                glow={tier.featured ? "rgba(41,120,237,0.16)" : undefined}
                className={`h-full rounded-[14px] ${tier.featured ? "glass-strong border-[var(--cta)]/50" : "glass"}`}
              >
                <div className="flex h-full flex-col p-7">
                  <span className="mono-label text-[11px] text-fg-dim">Projeto</span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold">{tier.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{tier.desc}</p>

                  <div
                    className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[12px] ${
                      tier.featured
                        ? "border-[var(--cta)]/40 bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-[var(--panel-border-strong)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    }`}
                  >
                    Escopo e valor fechados antes de começar
                  </div>

                  <ul className="mt-6 space-y-2 border-t border-[var(--panel-border)] pt-5">
                    {tier.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-fg-muted">
                        <Check
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]`}
                          strokeWidth={2.5}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <a
                      href={whatsappLink(`Olá! Quero um orçamento para ${tier.quoteLabel}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex w-full items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                        tier.featured ? "bg-[var(--cta)] text-white hover:bg-[var(--cta-deep)]" : "border border-[var(--panel-border-strong)] text-fg"
                      }`}
                    >
                      Solicitar orçamento
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5"
        >
          <SpotlightCard className="glass rounded-[14px]">
            <div className="grid items-center gap-6 p-7 lg:grid-cols-[1fr_auto] lg:gap-10">
              <div>
                <span className="mono-label text-[11px] text-fg-dim">Produtos por assinatura</span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold">
                  Planos mensais conforme o volume, sem fidelidade
                </h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SUBSCRIPTIONS.map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm text-fg-muted">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <span className="text-sm text-fg-muted">Sistema de gestão a partir de</span>
                <span className="-mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--accent)]">
                  R$ 499<span className="text-base font-medium text-fg-muted">/mês</span>
                </span>
                <a
                  href={whatsappLink("Olá! Quero saber os planos de assinatura da EMC (gestão, nota fiscal, WhatsApp ou tokens de IA).")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex items-center gap-2 rounded-md border border-[var(--panel-border-strong)] px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-white/5"
                >
                  Consultar planos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
