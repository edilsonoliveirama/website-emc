"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    tag: "system.ai",
    title: "IA aplicada",
    desc: "Agentes, automações e chatbots que assumem tarefas repetitivas e liberam sua equipe para o que realmente importa.",
    points: ["Atendimento automatizado", "Automação de processos", "Análise e geração de conteúdo"],
  },
  {
    tag: "system.build",
    title: "Desenvolvimento sob medida",
    desc: "Sites, sistemas e aplicações construídos para o seu processo — não o contrário.",
    points: ["Sites e sistemas web", "Aplicações internas", "Painéis e dashboards"],
  },
  {
    tag: "system.connect",
    title: "Integração de sistemas",
    desc: "ERP, CRM, planilhas e APIs conversando em um só fluxo, sem retrabalho manual.",
    points: ["Conexão entre ERP/CRM", "APIs e webhooks", "Sincronização de dados"],
  },
  {
    tag: "system.gateway",
    title: "API Gateway LLM",
    desc: "Um único endpoint para dar inteligência artificial a qualquer sistema seu — sem depender de um provedor só.",
    points: ["Múltiplos modelos e provedores unificados", "Billing e custo centralizado", "Segurança e controle de acesso por chave"],
  },
];

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-heading" className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="mono-label text-xs text-[var(--accent)]">Soluções</span>
          <h2 id="servicos-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Quatro frentes, um único fluxo
          </h2>
          <p className="mt-4 text-fg-muted">
            Cada serviço resolve uma dor específica — juntos, eliminam o
            atrito entre pessoas, dados e ferramentas.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass group relative flex flex-col rounded-xl p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--panel-border-strong)]"
            >
              <span className="mono-label text-[11px] text-fg-dim">{s.tag}</span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{s.desc}</p>

              <ul className="mt-6 space-y-2 border-t border-[var(--panel-border)] pt-5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-fg-muted">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
                background: "radial-gradient(400px circle at 50% 0%, rgba(91,140,255,0.10), transparent 60%)"
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
