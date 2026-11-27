"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileLock2, Eye, BarChart3, Briefcase, Wallet, FileText } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "./cases/sintaf/visuals";
import { DocumentosScreen, FiliadoPhoneScreen } from "./cases/sintaf/screens";
import { VisaoGeralScreen } from "./cases/athena/screens";
import { SINTAF_CASE_ENABLED } from "@/lib/features";
import ChatMockup, { type Msg } from "./lp/ChatMockup";
import { whatsappLink } from "@/lib/contact";
import { Clock, ListChecks, CalendarCheck, UserRound } from "lucide-react";

export default function CasesSection() {
  return (
    <section id="cases" aria-labelledby="cases-heading" className="section-divider relative overflow-hidden px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">Cases</span>
          <h2 id="cases-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Quem já trabalha com a EMC
          </h2>
          <p className="mt-4 text-fg-muted">Soluções em produção, usadas todos os dias por empresas reais.</p>
        </motion.div>

        <div className="mt-14 space-y-8">
          <FestouCard />
          <AthenaCard />
          {SINTAF_CASE_ENABLED && <SintafCard />}
        </div>
      </div>
    </section>
  );
}

function Highlights({ items, color }: { items: { Icon: typeof Eye; value: string; label: string }[]; color: string }) {
  return (
    <div className="mt-7 grid gap-3">
      {items.map(({ Icon, value, label }, i) => (
        <motion.div
          key={value}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]" style={{ color }}>
            <Icon className="h-4 w-4" strokeWidth={1.9} />
          </span>
          <span className="text-sm text-fg-muted">
            <strong className="font-semibold text-fg">{value}</strong> {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const ATHENA_HIGHLIGHTS = [
  { Icon: Briefcase, value: "Vagas e candidatos", label: "do lead à contratação" },
  { Icon: Wallet, value: "Financeiro e comissões", label: "ligados a cada vaga" },
  { Icon: FileText, value: "NFS-e", label: "emitida de dentro do sistema" },
];

function AthenaCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const browserY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const stripY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-6, -2, 2]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="group relative overflow-hidden rounded-[22px] border border-[var(--panel-border-strong)] bg-gradient-to-br from-[#10204a] via-[#0b1222] to-[#090d18]"
    >
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(29,91,191,0.35),transparent)]" />
      <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:p-14">
        <div>
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] text-[var(--accent)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            Case · Athena
          </span>
          <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Sistema de gestão para agências de recrutamento e seleção
          </h3>
          <p className="mt-4 leading-relaxed text-fg-muted">Vagas, candidatos, financeiro, comissões e NFS-e numa plataforma só.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["SaaS multiempresa", "Recrutamento", "Financeiro", "NFS-e"].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-fg-muted">
                {t}
              </span>
            ))}
          </div>
          <Highlights items={ATHENA_HIGHLIGHTS} color="var(--accent)" />
          <Link
            href="/cases/athena"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-[var(--cta)] hover:bg-[var(--cta-deep)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Ver o case completo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
          </Link>
        </div>

        <div className="relative pb-16 [perspective:1400px]">
          <motion.div style={{ y: browserY, rotateY: rotate }} className="relative [transform-style:preserve-3d]">
            <BrowserFrame address="athena · talenthub · conexão segura">
              <VisaoGeralScreen />
            </BrowserFrame>
          </motion.div>
          <motion.div
            style={{ y: stripY }}
            className="absolute -bottom-2 left-[8%] right-[-4%] overflow-hidden rounded-[14px] border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
          >
            <Image src="/cases/athena/funil.webp" alt="Tela real do Athena: funil de contratação" width={1030} height={202} sizes="(min-width: 1024px) 40vw, 90vw" className="h-auto w-full" />
          </motion.div>
          <p className="mono-label absolute -bottom-10 left-0 text-[10px] text-fg-dim">Simulação e tela real · dados ilustrativos</p>
        </div>
      </div>
    </motion.div>
  );
}

const SINTAF_HIGHLIGHTS = [
  { Icon: FileLock2, value: "+1.000", label: "filiados com acesso restrito" },
  { Icon: Eye, value: "Cada leitura", label: "registrada com data, hora e IP" },
  { Icon: BarChart3, value: "Contas abertas", label: "em gráfico mensal para o filiado" },
];

function SintafCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const browserY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [90, -70]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-6, -2, 2]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="group relative overflow-hidden rounded-[22px] border border-[var(--accent-amber)]/25 bg-gradient-to-br from-[#10223a] via-[#0b1222] to-[#090d18]"
    >
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(180,134,42,0.22),transparent)]" />
      <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:p-14">
        <div>
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--accent-amber)]/40 bg-[var(--accent-amber-soft)] px-3 py-1 text-[11px] text-[var(--accent-amber)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-amber)]" />
            Case · SINTAF-MA
          </span>
          <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Área do Filiado e Painel Administrativo
          </h3>
          <p className="mt-4 leading-relaxed text-fg-muted">
            Documentos confidenciais para cada filiado, com prestação de contas à vista de todos. A diretoria define quem vê cada
            documento e sabe quem leu o quê.
          </p>
          <Highlights items={SINTAF_HIGHLIGHTS} color="var(--accent-amber)" />
          <Link
            href="/cases/sintaf-area-do-filiado"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-[var(--accent-amber)] px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            Ver o case completo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
          </Link>
        </div>

        <div className="relative pb-10 [perspective:1400px] lg:pb-0">
          <motion.div style={{ y: browserY, rotateY: rotate }} className="relative mr-[12%] [transform-style:preserve-3d]">
            <BrowserFrame address="Painel Administrativo · conexão segura">
              <DocumentosScreen />
            </BrowserFrame>
          </motion.div>
          <motion.div style={{ y: phoneY }} className="absolute -bottom-2 right-0 w-[28%] min-w-[110px] lg:-bottom-16">
            <PhoneFrame>
              <FiliadoPhoneScreen />
            </PhoneFrame>
          </motion.div>
          <p className="mono-label absolute -bottom-6 left-0 text-[10px] text-fg-dim lg:-bottom-20">Dados ilustrativos</p>
        </div>
      </div>
    </motion.div>
  );
}

const FESTOU_CHAT: Msg[] = [
  { from: "client", text: "Oi! Vocês fazem pegue e monte para o dia 14?", time: "22:41" },
  { from: "bot", text: "Oi! Fazemos sim. Para eu adiantar seu atendimento: é festa de quantos anos e qual o tema?", time: "22:41" },
  { from: "client", text: "3 anos, tema Safari. Uns 40 convidados", time: "22:43" },
  { from: "bot", text: "Anotado: dia 14, Safari, 3 anos, 40 convidados. Já deixei a data pré-agendada e nossa equipe continua com você para fechar os detalhes.", time: "22:43" },
];

function FestouCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="glass-strong grid gap-10 overflow-hidden rounded-[22px] p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
    >
      <div>
        <div className="flex items-center gap-4">
          <Image src="/cases/festou/logo.webp" alt="Logo Festou SLZ" width={56} height={56} className="h-14 w-14 rounded-[14px]" />
          <div>
            <span className="mono-label text-[11px] text-[var(--accent)]">Case · Festou SLZ</span>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">Atendimento com IA no WhatsApp</h3>
          </div>
        </div>
        <p className="mt-5 leading-relaxed text-fg-muted">
          A Festou, de pegue e monte e personalizados em São Luís, recebe pedidos de festa pelo WhatsApp a qualquer hora.
          O assistente da EMC atende na hora, coleta o que a equipe precisa saber e agenda o evento. Quando alguém da
          Festou entra na conversa, as principais informações já estão respondidas.
        </p>
        <Highlights
          color="var(--accent)"
          items={[
            { Icon: Clock, value: "24 horas", label: "de atendimento, inclusive fim de semana" },
            { Icon: ListChecks, value: "Perguntas padrão", label: "feitas e organizadas pela IA" },
            { Icon: CalendarCheck, value: "Eventos agendados", label: "direto na conversa" },
            { Icon: UserRound, value: "Equipe entra depois", label: "só para fechar" },
          ]}
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink("Olá! Vi o case da Festou no site e quero um atendimento com IA assim no meu WhatsApp.")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="Case Festou: quero um assim"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-[var(--cta)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--cta-deep)]"
          >
            Quero um assistente assim
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
          </a>
          <Link
            href="/lp/atendimento-ia-whatsapp"
            className="inline-flex items-center justify-center rounded-md border border-[var(--panel-border-strong)] px-6 py-3 text-sm font-medium text-fg transition-colors hover:bg-white/5"
          >
            Como funciona
          </Link>
        </div>
      </div>
      <ChatMockup messages={FESTOU_CHAT} contact="Festou SLZ" />
    </motion.article>
  );
}
