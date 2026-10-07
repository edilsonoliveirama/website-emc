"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Check,
  CheckCheck,
  Download,
  KeyRound,
  Loader2,
} from "lucide-react";

export const PRODUCTS = [
  { id: "gestao", label: "Gestão", Icon: LayoutDashboard },
  { id: "nfe", label: "Nota fiscal", Icon: FileText },
  { id: "whatsapp", label: "WhatsApp", Icon: MessageCircle },
  { id: "ia", label: "IA", Icon: Sparkles },
] as const;

const PANEL_H = "h-[372px]";

/* ---------------------------------------------------------------- Gestão */

const SERIES = [42, 48, 45, 56, 52, 61, 58, 67, 63, 72, 70, 81];

function GestaoPanel() {
  const max = 90;
  const w = 100;
  const h = 40;
  const pts = SERIES.map((v, i) => [(i / (SERIES.length - 1)) * w, h - (v / max) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { k: "Faturamento", v: "R$ 184,3 mil", d: "+12%" },
          { k: "A receber", v: "R$ 42,1 mil", d: "18 títulos" },
          { k: "Pedidos", v: "1.284", d: "+9%" },
        ].map((m, i) => (
          <motion.div
            key={m.k}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
          >
            <div className="text-[10px] text-fg-dim">{m.k}</div>
            <div className="mt-1 text-[14px] font-semibold tabular-nums text-fg">{m.v}</div>
            <div className="mt-0.5 text-[10px] text-[var(--accent-mint)]">{m.d}</div>
          </motion.div>
        ))}
      </div>

      <div className="relative flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-fg-muted">Vendas · últimos 12 meses</span>
          <span className="flex items-center gap-1 text-[var(--accent-mint)]">
            <TrendingUp className="h-3 w-3" strokeWidth={2.4} /> crescendo
          </span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mt-2 h-[calc(100%-1.5rem)] w-full overflow-visible">
          <defs>
            <linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path d={area} fill="url(#gArea)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} />
          <motion.path
            d={line}
            fill="none"
            stroke="#5b8cff"
            strokeWidth={1.2}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-2.5 rounded-xl border border-[var(--accent-amber)]/25 bg-[var(--accent-amber-soft)] px-3 py-2.5 text-[12px]"
      >
        <AlertTriangle className="h-4 w-4 shrink-0 text-[var(--accent-amber)]" strokeWidth={2.2} />
        <span className="text-fg">3 produtos abaixo do estoque mínimo</span>
        <span className="ml-auto text-[11px] text-[var(--accent-amber)]">Gerar pedido</span>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- NF-e */

const NFE_STEPS = ["Validando dados", "Assinando digitalmente", "Transmitindo à SEFAZ", "Autorizada"];
const CHAVE = "2126 1012 3456 7800 0190 5500 1000 0012 4810 0001 2483";

function NfePanel() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= NFE_STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 850);
    return () => clearTimeout(t);
  }, [step]);
  const authorized = step === NFE_STEPS.length - 1;

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="mono-label text-[10px] text-fg-dim">NF-e · Série 1</div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-fg">Nº 001.248</div>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={authorized ? "ok" : "proc"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                authorized ? "bg-[var(--accent-mint-soft)] text-[var(--accent-mint)]" : "bg-[var(--accent-soft)] text-[var(--accent)]"
              }`}
            >
              {authorized ? "Autorizada" : "Processando"}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
          <span className="text-fg-dim">Destinatário</span>
          <span className="text-fg-dim">Valor total</span>
          <span className="truncate text-fg">Mercado Bom Preço Ltda</span>
          <span className="font-semibold tabular-nums text-fg">R$ 2.487,60</span>
        </div>
        <div className="mt-3 text-[10px] text-fg-dim">Chave de acesso</div>
        <div className="mt-0.5 font-mono text-[10.5px] leading-snug tracking-wide text-[#bcd0ff]">{CHAVE}</div>
      </div>

      <ol className="space-y-2">
        {NFE_STEPS.map((s, i) => {
          const doneStep = i < step || authorized;
          const current = i === step && !authorized;
          return (
            <li key={s} className={`flex items-center gap-2.5 text-[12px] transition-opacity duration-300 ${i <= step ? "opacity-100" : "opacity-30"}`}>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  doneStep ? "bg-[var(--accent-mint)] text-bg" : "border border-[var(--panel-border-strong)] text-[var(--accent)]"
                }`}
              >
                {doneStep ? <Check className="h-3 w-3" strokeWidth={3.5} /> : current ? <Loader2 className="h-3 w-3 animate-spin" strokeWidth={3} /> : null}
              </span>
              <span className={doneStep ? "text-fg" : "text-fg-muted"}>{s}</span>
              {s === "Autorizada" && authorized && <span className="ml-auto font-mono text-[10px] text-fg-dim">Protocolo 1352600048123</span>}
            </li>
          );
        })}
      </ol>

      <div className="mt-auto flex gap-2">
        {["XML", "DANFE (PDF)", "Enviada ao cliente"].map((b, i) => (
          <motion.span
            key={b}
            initial={false}
            animate={{ opacity: authorized ? 1 : 0.25 }}
            transition={{ delay: authorized ? 0.1 * i : 0 }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-fg-muted"
          >
            {i < 2 ? <Download className="h-3 w-3" strokeWidth={2.2} /> : <Check className="h-3 w-3 text-[var(--accent-mint)]" strokeWidth={3} />}
            {b}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- WhatsApp API */

const WA_STATUS = [
  { label: "Enviada", Icon: Check, color: "", bubble: "text-white/60" },
  { label: "Entregue", Icon: CheckCheck, color: "", bubble: "text-white/60" },
  { label: "Lida", Icon: CheckCheck, color: "text-[#53bdeb]", bubble: "text-[#53bdeb]" },
];

function WhatsAppPanel() {
  const [status, setStatus] = useState(-1);
  useEffect(() => {
    if (status >= WA_STATUS.length - 1) return;
    const t = setTimeout(() => setStatus((s) => s + 1), status < 0 ? 900 : 800);
    return () => clearTimeout(t);
  }, [status]);
  const current = status >= 0 ? WA_STATUS[status] : null;

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3.5 font-mono text-[10.5px] leading-[1.65]">
        <div>
          <span className="text-[var(--accent-mint)]">POST</span> <span className="text-fg">/v1/messages</span>
        </div>
        <div className="text-fg-dim">{"{"}</div>
        <div className="pl-3">
          <span className="text-[#bcd0ff]">&quot;to&quot;</span>: <span className="text-[var(--accent-amber)]">&quot;+55 98 9••••-1234&quot;</span>,
        </div>
        <div className="pl-3">
          <span className="text-[#bcd0ff]">&quot;template&quot;</span>: <span className="text-[var(--accent-amber)]">&quot;pedido_enviado&quot;</span>,
        </div>
        <div className="pl-3">
          <span className="text-[#bcd0ff]">&quot;params&quot;</span>: [<span className="text-[var(--accent-amber)]">&quot;Juliana&quot;</span>, <span className="text-[var(--accent-amber)]">&quot;#8412&quot;</span>]
        </div>
        <div className="text-fg-dim">{"}"}</div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-1 text-[var(--accent-mint)]">
          ← 200 OK · id: wamid.HBgM…7Q
        </motion.div>
      </div>

      <div className="flex-1 rounded-xl border border-white/[0.06] bg-[#0b141a] p-3.5">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2.5 text-[11px] text-fg-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp">
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          Sua Loja · conta comercial
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 22 }}
          className="ml-auto mt-3 max-w-[85%] rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-2 text-[12px] leading-snug text-white"
        >
          Olá, Juliana! Seu pedido #8412 foi enviado e chega amanhã. Acompanhe pelo link de rastreio.
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/60">
            14:32
            {current && <current.Icon className={`h-3.5 w-3.5 ${current.bubble}`} strokeWidth={2.4} />}
          </div>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {WA_STATUS.map((s, i) => (
          <span
            key={s.label}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-[11px] transition-all duration-300 ${
              i <= status ? "border-white/10 bg-white/[0.05] text-fg" : "border-white/[0.04] text-fg-dim opacity-40"
            }`}
          >
            <s.Icon className={`h-3.5 w-3.5 ${i <= status ? s.color : ""}`} strokeWidth={2.4} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- AI tokens */

const MODELS = [
  { name: "GPT", color: "#3ddc97" },
  { name: "Claude", color: "#ffb454" },
  { name: "GLM", color: "#5b8cff" },
];

const CALLS = [
  { model: 0, task: "Resumo de contrato", tokens: 3412, cost: "0,048" },
  { model: 1, task: "Resposta ao cliente", tokens: 1284, cost: "0,021" },
  { model: 2, task: "Classificação de ticket", tokens: 412, cost: "0,002" },
  { model: 1, task: "Análise de planilha", tokens: 5120, cost: "0,083" },
  { model: 0, task: "Descrição de produto", tokens: 860, cost: "0,009" },
  { model: 2, task: "Tradução de e-mail", tokens: 930, cost: "0,004" },
];

function IaPanel() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + 1), 1100);
    return () => clearInterval(t);
  }, []);
  const visible = Array.from({ length: Math.min(n, 4) }, (_, i) => {
    const idx = n - 1 - i;
    return { ...CALLS[idx % CALLS.length], key: idx };
  });
  const used = Math.min(0.62 + n * 0.006, 0.78);
  const total = 1_284_350 + n * 1873;

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
        <KeyRound className="h-4 w-4 text-[var(--accent-amber)]" strokeWidth={2.2} />
        <span className="font-mono text-[11.5px] text-fg">emc_live_••••••••8f3a</span>
        <span className="ml-auto text-[10px] text-fg-dim">1 chave · vários modelos</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {MODELS.map((m) => (
          <span key={m.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-fg">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
            {m.name}
          </span>
        ))}
        <span className="rounded-full border border-dashed border-white/15 px-2.5 py-1 text-[11px] text-fg-dim">+ outros modelos</span>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-black/25">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-white/5 px-3 py-2 text-[10px] uppercase tracking-wider text-fg-dim">
          <span>Requisição</span>
          <span>Tokens</span>
          <span>Custo</span>
        </div>
        <div className="relative">
          <AnimatePresence initial={false}>
            {visible.map((c) => {
              const m = MODELS[c.model];
              return (
                <motion.div
                  key={c.key}
                  layout
                  initial={{ opacity: 0, y: -14, backgroundColor: "rgba(91,140,255,0.12)" }}
                  animate={{ opacity: 1, y: 0, backgroundColor: "rgba(91,140,255,0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, backgroundColor: { duration: 1.4 } }}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 border-b border-white/[0.04] px-3 py-2 text-[11.5px]"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: m.color }} />
                    <span className="truncate text-fg">{c.task}</span>
                    <span className="shrink-0 text-[10px] text-fg-dim">{m.name}</span>
                  </span>
                  <span className="text-right font-mono tabular-nums text-fg-muted">{c.tokens.toLocaleString("pt-BR")}</span>
                  <span className="text-right font-mono tabular-nums text-fg-muted">R$ {c.cost}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-fg-muted">
            <span className="font-semibold tabular-nums text-fg">{total.toLocaleString("pt-BR")}</span> tokens no mês
          </span>
          <span className="tabular-nums text-fg-dim">{Math.round(used * 100)}% do limite</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
            animate={{ width: `${used * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Shell */

const PANELS = [GestaoPanel, NfePanel, WhatsAppPanel, IaPanel];
const SUBTITLES = ["Sistema de gestão", "Emissor de NF-e", "API de WhatsApp", "Tokens de IA"];

export const AUTO_MS = 6500;

export default function ProductShowcase({
  active,
  onSelect,
  paused,
}: {
  active: number;
  onSelect: (i: number) => void;
  paused: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 110, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 110, damping: 18 });

  const Panel = PANELS[active];

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
      className="relative [perspective:1200px]"
    >
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(91,140,255,0.26),transparent)] blur-2xl" />

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0f1d]/90 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
      >
        {/* Tabs */}
        <div role="tablist" aria-label="Produtos da EMC" className="relative grid grid-cols-4 border-b border-white/[0.06] p-1.5">
          {PRODUCTS.map((p, i) => {
            const on = i === active;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={on}
                onClick={() => onSelect(i)}
                className={`relative flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition-colors ${
                  on ? "text-fg" : "text-fg-dim hover:text-fg-muted"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="product-tab"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] ring-1 ring-[var(--panel-border-strong)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <p.Icon className={`relative h-4 w-4 ${on ? "text-[var(--accent)]" : ""}`} strokeWidth={2} />
                <span className="relative">{p.label}</span>
                {on && !paused && (
                  <motion.span
                    key={`bar-${active}`}
                    className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full bg-[var(--accent)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 pt-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-mint)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-mint)]" />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.25 }}
              className="text-[13px] font-semibold text-fg"
            >
              {SUBTITLES[active]}
            </motion.span>
          </AnimatePresence>
          <span className="mono-label ml-auto text-[10px] text-fg-dim">Simulação</span>
        </div>

        {/* Body */}
        <div className={`relative ${PANEL_H}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
