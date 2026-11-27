"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Sparkles,
  Code2,
  Workflow,
  ArrowUpRight,
  Check,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";
import SpotlightCard from "./SpotlightCard";
import { whatsappLink } from "@/lib/contact";

type Service = {
  id: string;
  Icon: typeof LayoutDashboard;
  title: string;
  desc: string;
  points: string[];
  span: string;
  message: string;
  /** Página com mais detalhes (landing page ou case). */
  href?: string;
  hrefLabel?: string;
  price?: string;
  badge?: string;
  visual: ReactNode;
};

/* ---------- small visuals, one per card ---------- */

function BarsVisual() {
  const bars = [38, 52, 46, 64, 58, 72, 68, 84];
  return (
    <div className="flex h-20 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-[var(--accent)]/30 to-[var(--accent)]"
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function NfeVisual() {
  return (
    <div className="flex flex-col gap-1.5 text-[11px]">
      {["Assinada digitalmente", "Transmitida à SEFAZ", "Autorizada"].map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-mint)] text-bg">
            <Check className="h-2.5 w-2.5" strokeWidth={4} />
          </span>
          <span className="text-fg-muted">{s}</span>
        </motion.div>
      ))}
    </div>
  );
}

function WhatsVisual() {
  return (
    <div className="space-y-1.5">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="ml-auto w-fit max-w-[90%] rounded-lg rounded-tr-sm bg-[#005c4b] px-2.5 py-1.5 text-[11px] text-white"
      >
        Seu pedido foi enviado!
        <span className="ml-1.5 inline-flex translate-y-[2px] text-[#53bdeb]">
          <CheckCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="w-fit max-w-[90%] rounded-lg rounded-tl-sm bg-white/[0.07] px-2.5 py-1.5 text-[11px] text-fg"
      >
        Obrigada, chegou rápido!
      </motion.div>
    </div>
  );
}

function ModelsVisual() {
  const models = [
    { n: "GPT", c: "#3ddc97" },
    { n: "Claude", c: "#ffb454" },
    { n: "GLM", c: "#2978ed" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-lg border border-[var(--accent-amber)]/30 bg-[var(--accent-amber-soft)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--accent-amber)]">
        1 chave
      </span>
      <span className="text-fg-dim">→</span>
      {models.map((m, i) => (
        <motion.span
          key={m.n}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-fg"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.c }} />
          {m.n}
        </motion.span>
      ))}
      <span className="rounded-full border border-dashed border-white/15 px-2.5 py-1 text-[11px] text-fg-dim">+ outros</span>
    </div>
  );
}

function CodeVisual() {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-black/30 p-3 font-mono text-[11px] leading-relaxed">
      <div>
        <span className="text-[var(--accent-2)]">const</span> <span className="text-fg">sistema</span> ={" "}
        <span className="text-[var(--accent-amber)]">seuProcesso</span>()
      </div>
      <div className="text-fg-dim">{"// feito do jeito que sua equipe trabalha"}</div>
    </div>
  );
}

function FlowVisual() {
  const nodes = ["ERP", "CRM", "Planilha", "Loja"];
  return (
    <div className="flex items-center gap-2">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-fg"
          >
            {n}
          </motion.span>
          {i < nodes.length - 1 && (
            <span className="relative h-px w-5 overflow-hidden bg-white/10">
              <span className="absolute inset-y-0 w-2 animate-[flow-dash_1.6s_linear_infinite] bg-[var(--accent)]" style={{ animationDelay: `${i * 0.3}s` }} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const SERVICES: Service[] = [
  {
    id: "atendimento-ia",
    Icon: MessageCircle,
    title: "Atendimento com IA no WhatsApp",
    desc: "Um assistente que responde na hora, 24 horas, faz as perguntas certas, agenda e cobra pelo Pix. Sua equipe só entra quando o cliente já disse o que precisa.",
    points: ["Responde em segundos, inclusive à noite e no fim de semana", "Qualifica e agenda antes de passar para a equipe", "API oficial do WhatsApp, com a marca da sua empresa"],
    span: "lg:col-span-2",
    message: "Olá! Quero saber sobre o atendimento com IA no WhatsApp.",
    href: "/lp/atendimento-ia-whatsapp",
    badge: "Mais procurado",
    visual: <WhatsVisual />,
  },
  {
    id: "gestao",
    Icon: LayoutDashboard,
    title: "Sistema de gestão",
    desc: "Vendas, financeiro, estoque e clientes em um só lugar, com os números do negócio na tela em vez de espalhados em planilhas.",
    points: ["Faturamento e contas a receber em tempo real", "Alerta de estoque mínimo", "Acesso pelo computador ou celular"],
    span: "",
    message: "Olá! Quero conhecer o sistema de gestão da EMC.",
    href: "/lp/sistema-de-gestao",
    price: "A partir de R$ 499/mês",
    visual: <BarsVisual />,
  },
  {
    id: "nfe",
    Icon: FileText,
    title: "Emissor de nota fiscal",
    desc: "A nota sai da própria venda, sem redigitar o pedido. XML e DANFE vão para o cliente automaticamente.",
    points: ["Nota a partir da venda", "Envio automático ao cliente"],
    span: "",
    message: "Olá! Quero conhecer o emissor de nota fiscal da EMC.",
    visual: <NfeVisual />,
  },
  {
    id: "integracao",
    Icon: Workflow,
    title: "Integração de sistemas",
    desc: "ERP, CRM, loja virtual e planilhas trocando dados sozinhos, e avisos de pedido, cobrança e entrega saindo pelo WhatsApp. Fim do copiar e colar.",
    points: ["Dados sincronizados entre os sistemas", "Mensagens automáticas no WhatsApp"],
    span: "lg:col-span-2",
    message: "Olá! Quero integrar os sistemas da minha empresa.",
    visual: <FlowVisual />,
  },
  {
    id: "sob-medida",
    Icon: Code2,
    title: "Desenvolvimento sob medida",
    desc: "Sites, sistemas e áreas restritas construídos para o seu processo, não o contrário.",
    points: ["Do diagnóstico ao suporte"],
    span: "",
    message: "Olá! Quero um sistema sob medida para a minha empresa.",
    href: "/cases/athena",
    hrefLabel: "Ver um case",
    visual: <CodeVisual />,
  },
  {
    id: "ia",
    Icon: Sparkles,
    title: "IA dentro dos seus sistemas",
    desc: "GPT, Claude e outros modelos com uma única chave, para colocar IA em qualquer sistema sem depender de um fornecedor só.",
    points: ["Vários modelos com um só acesso", "Consumo e custo visíveis em um painel", "Limite de gasto por chave"],
    span: "lg:col-span-2",
    message: "Olá! Quero saber sobre o fornecimento de tokens de IA (GPT, Claude, GLM).",
    visual: <ModelsVisual />,
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
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">Soluções</span>
          <h2 id="servicos-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Escolha por onde começar
          </h2>
          <p className="mt-4 text-fg-muted">
            Cada solução funciona sozinha. Comece pela que resolve o problema mais urgente e conecte as outras quando fizer sentido.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className={s.span}
            >
              <SpotlightCard className="glass h-full rounded-[14px] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] text-[var(--accent)]">
                      <s.Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <a
                      href={whatsappLink(s.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Quero conhecer: ${s.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-fg-dim transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--cta)] hover:bg-[var(--cta-deep)] group-hover:text-white"
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                    </a>
                  </div>

                  <h3 className="mt-5 flex flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                    {s.title}
                    {s.badge && (
                      <span className="mono-label rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] text-[var(--accent)]">
                        {s.badge}
                      </span>
                    )}
                  </h3>
                  {s.price && <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{s.price}</p>}
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.desc}</p>

                  <ul className="mt-4 space-y-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13px] text-fg-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-mint)]" strokeWidth={3} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {s.href && (
                    <Link
                      href={s.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                    >
                      {s.hrefLabel ?? "Ver como funciona"}
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </Link>
                  )}

                  <div className="mt-auto pt-6">
                    <div className="rounded-[14px] border border-white/[0.05] bg-black/20 p-4">{s.visual}</div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
