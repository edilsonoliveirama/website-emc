"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Inbox, Users, UserCheck, ShieldCheck, FileText, Percent, Clock3, Sparkles, Palette } from "lucide-react";
import { BrowserFrame, ScreenShowcase, type ShowcaseItem } from "../sintaf/visuals";
import { VisaoGeralScreen, ATHENA_SCREENS } from "./screens";
import Reveal from "../../Reveal";
import SpotlightCard from "../../SpotlightCard";
import { useInView, curve, clock, Edge, NodeCard, EventLog, Positioned, type LogLine } from "../../flows/kit";

/* ------------------------------------------------------------ Hero */

const TOASTS = [
  { Icon: Inbox, tone: "text-[var(--accent)] bg-[var(--accent-soft)]", title: "Nova vaga captada pelo site", sub: "Recrutamento de vendedores · São Paulo" },
  { Icon: FileText, tone: "text-[var(--accent-mint)] bg-[var(--accent-mint-soft)]", title: "NFS-e 2026-0001488 emitida", sub: "Nimbus Cloud · ISS calculado" },
  { Icon: Percent, tone: "text-[var(--accent-amber)] bg-[var(--accent-amber-soft)]", title: "Comissão de Helena atualizada", sub: "Subiu para a faixa 2 do mês" },
];

export function AthenaHeroDevice() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const [toast, setToast] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setToast((v) => (v + 1) % TOASTS.length), 3000);
    return () => clearInterval(t);
  }, []);
  const t = TOASTS[toast];

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative [perspective:1400px]"
    >
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(29,91,191,0.35),transparent)] blur-2xl" />
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <BrowserFrame address="athena · talenthub · conexão segura">
            <VisaoGeralScreen />
          </BrowserFrame>
        </motion.div>
        <div style={{ transform: "translateZ(80px)" }} className="absolute -bottom-8 -left-4 sm:-left-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={toast}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="glass-strong flex items-center gap-3 rounded-xl px-4 py-3 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.85)]"
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${t.tone}`}>
                <t.Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-fg">{t.title}</div>
                <div className="text-[11.5px] text-fg-muted">{t.sub}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <p className="mono-label mt-12 text-right text-[10px] text-fg-dim">Simulação · dados ilustrativos</p>
    </div>
  );
}

/* ------------------------------------------------------------ Vacancy lifecycle */

const CYCLE = [
  { Icon: Inbox, title: "Captar", work: "Lead da Finnova chegou pelo site", done: "Vaga aberta no funil", log: "Lead captado: Analista Financeiro Sênior", tone: "accent" as const },
  { Icon: Users, title: "Selecionar", work: "IA sugeriu 3 talentos aderentes", done: "Shortlist enviada ao cliente", log: "Triagem: 3 perfis sugeridos pela IA", tone: "accent" as const },
  { Icon: UserCheck, title: "Contratar", work: "Fernanda Lima aprovada", done: "Contratação registrada", log: "Contratação: Fernanda Lima", tone: "mint" as const },
  { Icon: ShieldCheck, title: "Garantir", work: "Garantia de 90 dias iniciada", done: "Prazo de reposição monitorado", log: "Garantia: 90 dias de reposição iniciados", tone: "amber" as const },
  { Icon: FileText, title: "Faturar", work: "NFS-e emitida, honorários lançados", done: "Recebível vinculado à vaga", log: "Faturamento: NFS-e emitida e recebível criado", tone: "mint" as const },
];
const XS = [10, 30, 50, 70, 90];
const STEP_MS = 1500;

export function VacancyCycle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [step, setStep] = useState(-1);
  const [log, setLog] = useState<LogLine[]>([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(
      () => {
        const next = step + 1;
        if (next >= CYCLE.length + 2) {
          setStep(-1);
          setRound((r) => r + 1);
          return;
        }
        setStep(next);
        if (next < CYCLE.length) {
          const c = CYCLE[next];
          setLog((l) => [{ id: `${round}-${next}`, time: clock(), text: c.log, tone: c.tone }, ...l].slice(0, 6));
        }
      },
      step < 0 ? 500 : STEP_MS,
    );
    return () => clearTimeout(t);
  }, [inView, step, round]);

  const state = (i: number) => (i < step ? "done" : i === step ? "active" : "idle");
  const status = (i: number) => (i < step ? CYCLE[i].done : i === step ? CYCLE[i].work : "Aguardando");

  return (
    <div ref={ref}>
      <div className="relative hidden h-36 w-full lg:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          {XS.slice(0, -1).map((x, i) => (
            <Edge key={i} d={curve(x, 50, XS[i + 1], 50)} lit={step > i} trigger={step > i ? `${round}-${i}` : null} />
          ))}
        </svg>
        {CYCLE.map((c, i) => (
          <Positioned key={c.title} p={{ x: XS[i], y: 50 }}>
            <NodeCard width="10.5rem" Icon={c.Icon} tone={c.tone} title={c.title} state={state(i)} status={status(i)} statusKey={`${status(i)}-${round}`} pulse={i === step ? `${round}-${i}` : null} />
          </Positioned>
        ))}
      </div>
      <div className="flex flex-col gap-2.5 lg:hidden">
        {CYCLE.map((c, i) => (
          <NodeCard key={c.title} width="100%" Icon={c.Icon} tone={c.tone} title={c.title} state={state(i)} status={status(i)} statusKey={`${status(i)}-${round}`} />
        ))}
      </div>
      <div className="mt-6 lg:mt-8">
        <EventLog lines={log} title="Vaga · Analista Financeiro Sênior" max={3} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Behind the scenes */

function CommissionVisual() {
  const [sales, setSales] = useState(12);
  useEffect(() => {
    const t = setInterval(() => setSales((s) => (s >= 52 ? 12 : s + 4)), 900);
    return () => clearInterval(t);
  }, []);
  const tier = sales < 20 ? 0 : sales < 40 ? 1 : 2;
  const rates = [5, 7, 10];
  return (
    <div>
      <div className="flex justify-between text-[11px] text-fg-dim">
        <span>Faturamento do mês</span>
        <span className="tabular-nums text-fg">R$ {sales} mil</span>
      </div>
      <div className="relative mt-2 flex h-2.5 gap-1">
        {[20, 20, 20].map((_, i) => (
          <span key={i} className={`h-full flex-1 rounded-full transition-colors duration-500 ${i <= tier ? "bg-[var(--accent-amber)]" : "bg-white/[0.08]"}`} />
        ))}
        <motion.span className="absolute -top-1 h-4.5 w-1 rounded-full bg-white shadow-[0_0_8px_white]" animate={{ left: `${Math.min(sales / 60, 1) * 100}%` }} transition={{ duration: 0.6 }} />
      </div>
      <div className="mt-2 grid grid-cols-3 text-center text-[10.5px]">
        {["até 20 mil", "20 a 40 mil", "acima de 40 mil"].map((l, i) => (
          <span key={l} className={i === tier ? "font-semibold text-[var(--accent-amber)]" : "text-fg-dim"}>
            {l} · {rates[i]}%
          </span>
        ))}
      </div>
    </div>
  );
}

function GuaranteeVisual() {
  const [day, setDay] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDay((d) => (d >= 90 ? 0 : d + 3)), 120);
    return () => clearInterval(t);
  }, []);
  const r = 26;
  const circ = 2 * Math.PI * r;
  const triggered = day >= 63 && day < 72;
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          <circle cx="32" cy="32" r={r} fill="none" stroke={triggered ? "var(--accent-amber)" : "var(--accent-mint)"} strokeWidth="5" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (day / 90)} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[12px] font-semibold tabular-nums text-fg">{90 - day}d</span>
      </div>
      <div className="text-[12px] leading-snug">
        <div className="text-fg">Prazo de reposição</div>
        <AnimatePresence mode="wait">
          <motion.div key={triggered ? "t" : "ok"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={triggered ? "text-[var(--accent-amber)]" : "text-fg-muted"}>
            {triggered ? "Reposição acionada pelo cliente" : "Garantia ativa, sem pendências"}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MatchVisual() {
  const [k, setK] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setK((v) => v + 1), 2600);
    return () => clearInterval(t);
  }, []);
  const people = [
    { n: "Fernanda L.", m: 94 },
    { n: "Rodrigo S.", m: 86 },
    { n: "Aline C.", m: 71 },
  ];
  return (
    <div className="space-y-2">
      {people.map((p, i) => (
        <div key={p.n} className="flex items-center gap-3 text-[11.5px]">
          <span className="w-20 shrink-0 text-fg-muted">{p.n}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              key={`${k}-${i}`}
              className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
              initial={{ width: 0 }}
              animate={{ width: `${p.m}%` }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
            />
          </div>
          <span className="w-9 text-right tabular-nums text-fg">{p.m}%</span>
        </div>
      ))}
    </div>
  );
}

const BRANDS = [
  { n: "Talent Hub", c: "#1d5bbf" },
  { n: "Pessoas & Co.", c: "#0f766e" },
  { n: "Ágil RH", c: "#b4462a" },
];

function BrandVisual() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BRANDS.length), 1800);
    return () => clearInterval(t);
  }, []);
  const b = BRANDS[i];
  return (
    <div className="flex items-center gap-4">
      <motion.div animate={{ borderColor: b.c }} className="w-28 shrink-0 overflow-hidden rounded-md border-2 bg-white">
        <motion.div animate={{ backgroundColor: b.c }} className="flex items-center gap-1 px-2 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
          <AnimatePresence mode="wait">
            <motion.span key={b.n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="truncate text-[8px] font-bold text-white">
              {b.n}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        <div className="space-y-1 p-2">
          {[80, 60, 70, 45].map((w, k) => (
            <span key={k} className="block h-1 rounded bg-slate-200" style={{ width: `${w}%` }} />
          ))}
        </div>
        <motion.div animate={{ backgroundColor: b.c }} className="h-1" />
      </motion.div>
      <div className="text-[12px] leading-snug text-fg-muted">
        Currículo e PDFs com logo, cores e rodapé de <span className="font-semibold text-fg">{b.n}</span>
      </div>
    </div>
  );
}

const BACKSTAGE = [
  { Icon: Percent, title: "Comissões escalonadas automáticas", text: "Faixas por faturamento mensal, por vendedor e supervisor, calculadas sem planilha.", visual: <CommissionVisual /> },
  { Icon: Clock3, title: "Controle de garantia", text: "O sistema acompanha o prazo de reposição de cada contratação e sinaliza quando ela é acionada.", visual: <GuaranteeVisual /> },
  { Icon: Sparkles, title: "Match de candidatos com IA", text: "Sugere os perfis mais aderentes a cada vaga.", visual: <MatchVisual /> },
  { Icon: Palette, title: "Marca da agência", text: "Logo, cores e rodapé personalizados nos currículos e PDFs enviados ao cliente.", visual: <BrandVisual /> },
];

/* ------------------------------------------------------------ Real screenshots */

const REAL_SHOTS = [
  { src: "/cases/athena/visao-geral.webp", w: 1036, h: 267, label: "Visão geral", span: "lg:col-span-2" },
  { src: "/cases/athena/funil.webp", w: 1030, h: 202, label: "Funil de contratação", span: "lg:col-span-2" },
  { src: "/cases/athena/captacao.webp", w: 517, h: 307, label: "Captação de leads", span: "" },
  { src: "/cases/athena/talentos.webp", w: 522, h: 447, label: "Triagem de talentos", span: "" },
  { src: "/cases/athena/agenda.webp", w: 1042, h: 715, label: "Agenda unificada", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/cases/athena/contas-receber.webp", w: 1032, h: 459, label: "Contas a receber", span: "lg:col-span-2" },
];

function RealShot({ src, w, h, label }: { src: string; w: number; h: number; label: string }) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#f4f6fb] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={`Tela real do Athena: ${label}`}
          width={w}
          height={h}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="flex items-center justify-between border-t border-black/5 bg-white px-4 py-2.5 text-[12px] font-medium text-[#0f2340]">
        {label}
        <span className="text-[10px] font-normal text-[#6b7891]">Tela real · dados ilustrativos</span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ Client wrappers used by the server page */

export function AthenaShowcase({ items }: { items: ShowcaseItem[] }) {
  return <ScreenShowcase items={items} screens={ATHENA_SCREENS} address={() => "athena · talenthub · conexão segura"} autoMs={6500} />;
}

export function BackstageGrid() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {BACKSTAGE.map(({ Icon, title, text, visual }, i) => (
        <Reveal key={title} delay={(i % 2) * 0.08}>
          <SpotlightCard className="glass h-full rounded-2xl">
            <div className="flex h-full flex-col p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{text}</p>
              <div className="mt-auto pt-6">
                <div className="rounded-xl border border-white/[0.05] bg-black/20 p-4">{visual}</div>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}

export function RealShotsGrid() {
  return (
    <div className="mt-14 grid gap-5 lg:grid-cols-4">
      {REAL_SHOTS.map((s, i) => (
        <Reveal key={s.src} delay={(i % 3) * 0.06} className={s.span}>
          <RealShot src={s.src} w={s.w} h={s.h} label={s.label} />
        </Reveal>
      ))}
    </div>
  );
}
