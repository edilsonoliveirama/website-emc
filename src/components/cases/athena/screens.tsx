"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Inbox,
  CalendarDays,
  Wallet,
  FileText,
  BarChart3,
  Check,
  X,
  Loader2,
  TrendingUp,
  AlertTriangle,
  Building2,
  UserCheck,
  DollarSign,
  CreditCard,
  Download,
  MapPin,
  Phone,
  GraduationCap,
  Wrench,
} from "lucide-react";

// Live recreations of the Athena screens, in Athena's own visual language.
// All data is fictitious demo data.

export const ATHENA_W = 1040;
export const ATHENA_H = 640;

const A = {
  bg: "#f4f6fb",
  navy: "#0f2340",
  text: "#33415c",
  muted: "#6b7891",
  border: "#e3e8f0",
  blue: "#1d5bbf",
  blueSoft: "#e8f0fc",
  green: "#16a34a",
  greenSoft: "#e7f6ec",
  red: "#dc2626",
  redSoft: "#fdecec",
  purple: "#7c3aed",
  purpleSoft: "#f1eafd",
  amber: "#e07b0a",
  amberSoft: "#fff4e5",
};
const FONT = "'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const MONO = "var(--font-mono), ui-monospace, monospace";

const NAV = [
  { id: "visao", label: "Visão geral", Icon: LayoutDashboard },
  { id: "vagas", label: "Vagas", Icon: Briefcase },
  { id: "talentos", label: "Talentos", Icon: Users },
  { id: "leads", label: "Leads", Icon: Inbox },
  { id: "agenda", label: "Agenda", Icon: CalendarDays },
  { id: "financeiro", label: "Financeiro", Icon: Wallet },
  { id: "nfse", label: "Notas fiscais", Icon: FileText },
  { id: "indicadores", label: "Indicadores", Icon: BarChart3 },
];

function Owl({ size = 28 }: { size?: number }) {
  // Real Athena logo, cropped from the product's login screen.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/cases/athena/logo.png" alt="" width={size} height={size} style={{ width: size, height: size }} />;
}

export function AthenaShell({ active, title, subtitle, actions, children }: { active: string; title: string; subtitle: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-full w-full" style={{ background: A.bg, color: A.text, fontFamily: FONT, fontSize: 13 }}>
      <aside className="flex w-[188px] shrink-0 flex-col border-r bg-white px-3 py-4" style={{ borderColor: A.border }}>
        <div className="mb-5 flex items-center gap-2 px-2">
          <Owl />
          <span className="text-[16px] font-bold" style={{ color: A.navy }}>Athena</span>
        </div>
        <div className="mb-3 rounded-lg px-2.5 py-2 text-[11px]" style={{ background: A.blueSoft, color: A.blue }}>
          <div className="font-semibold">Talent Hub</div>
          <div className="opacity-75">Agência de recrutamento</div>
        </div>
        <nav className="space-y-0.5">
          {NAV.map((n) => {
            const on = n.id === active;
            return (
              <div
                key={n.id}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px]"
                style={on ? { background: A.blue, color: "#fff", fontWeight: 600 } : { color: A.muted }}
              >
                <n.Icon className="h-4 w-4" strokeWidth={2} />
                {n.label}
              </div>
            );
          })}
        </nav>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden px-6 py-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="text-[20px] font-bold leading-tight" style={{ color: A.navy }}>{title}</div>
            <div className="text-[12px]" style={{ color: A.muted }}>{subtitle}</div>
          </div>
          {actions}
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </main>
    </div>
  );
}

function Card({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-xl bg-white ${className}`} style={{ border: `1px solid ${A.border}`, boxShadow: "0 1px 2px rgba(15,35,64,0.04), 0 6px 18px rgba(15,35,64,0.05)", ...style }}>
      {children}
    </div>
  );
}

function PrimaryBtn({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white" style={{ background: A.blue }}>
      {children}
    </span>
  );
}

function GhostBtn({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[12px] font-semibold" style={{ border: `1px solid ${A.border}`, color: A.navy }}>
      {children}
    </span>
  );
}

function useCount(to: number, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return v;
}

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Kpi({ label, value, money, color, soft, Icon, foot }: { label: string; value: number; money?: boolean; color: string; soft: string; Icon: typeof Users; foot?: ReactNode }) {
  const v = useCount(value);
  return (
    <Card className="relative overflow-hidden p-4">
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: color }} />
      <div className="flex items-start justify-between">
        <span className="text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: A.muted }}>{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: soft, color }}>
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
      <div className="mt-1 text-[24px] font-semibold tabular-nums" style={{ color: A.navy, fontFamily: MONO }}>
        {money ? brl(v) : Math.round(v)}
      </div>
      {foot && <div className="mt-0.5 text-[11px]" style={{ color: A.muted }}>{foot}</div>}
    </Card>
  );
}

const FUNNEL = [
  { label: "Aberta", n: 3, color: "#2b6fd6" },
  { label: "Em andamento", n: 2, color: "#f59e0b" },
  { label: "Em experiência", n: 3, color: "#8b5cf6" },
  { label: "Concluída", n: 3, color: "#22c55e" },
];

function FunnelCard() {
  const total = FUNNEL.reduce((a, b) => a + b.n, 0);
  const active = Math.round(useCount(11));
  return (
    <div className="flex items-center gap-8 rounded-xl px-6 py-5 text-white" style={{ background: "linear-gradient(120deg,#1a4fb0,#2366c9 55%,#2a75d4)" }}>
      <div>
        <div className="text-[10.5px] font-semibold uppercase tracking-wider opacity-80">Vagas ativas agora</div>
        <div className="mt-1 flex items-end gap-2">
          <span className="text-[44px] font-bold leading-none">{active}</span>
          <span className="mb-1 rounded-md bg-white/20 px-1.5 py-0.5 text-[11px] font-semibold">↗ +100%</span>
        </div>
        <div className="mt-1 text-[12px] opacity-85">de 15 vagas no período</div>
      </div>
      <div className="flex-1">
        <div className="text-[10.5px] font-semibold uppercase tracking-wider opacity-80">Funil de contratação</div>
        <div className="mt-3 flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-white/15">
          {FUNNEL.map((f, i) => (
            <motion.span
              key={f.label}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ background: f.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(f.n / total) * 100}%` }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.18, ease: "easeOut" }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px]">
          {FUNNEL.map((f) => (
            <span key={f.label} className="flex items-center gap-1.5">
              <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: f.color }} />
              {f.label} <b>{f.n}</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 1. Visão geral */

export function VisaoGeralScreen() {
  return (
    <AthenaShell active="visao" title="Visão geral" subtitle="Bom dia, Helena. Este é o resumo da operação." actions={<GhostBtn>Outubro de 2026</GhostBtn>}>
      <div className="grid grid-cols-3 gap-3">
        <Kpi label="Candidatos" value={21} color={A.green} soft={A.greenSoft} Icon={Users} foot={<span style={{ color: A.green }}>↗ +100% vs. mês anterior</span>} />
        <Kpi label="Clientes" value={8} color={A.blue} soft={A.blueSoft} Icon={Building2} />
        <Kpi label="Vendedores" value={4} color={A.purple} soft={A.purpleSoft} Icon={UserCheck} />
        <Kpi label="A receber" value={37360} money color={A.green} soft={A.greenSoft} Icon={DollarSign} />
        <Kpi label="A pagar" value={18420} money color={A.red} soft={A.redSoft} Icon={CreditCard} />
        <Kpi label="Em atraso" value={2} color={A.amber} soft={A.amberSoft} Icon={AlertTriangle} />
      </div>
      <div className="mt-3">
        <FunnelCard />
      </div>
    </AthenaShell>
  );
}

/* ------------------------------------------------------------ 2. Funil */

const STAGES = ["Aberta", "Em andamento", "Em experiência", "Concluída"];
const STAGE_COLOR = ["#2b6fd6", "#f59e0b", "#8b5cf6", "#22c55e"];
const VAGAS = [
  { t: "Analista Financeiro Sênior", c: "Finnova Pagamentos S.A.", s: 1 },
  { t: "Operador de CNC", c: "Ferrotec Indústria Metalúrgica", s: 2 },
  { t: "Enfermeiro Intensivista", c: "Clínica Vida Mais", s: 0 },
  { t: "Analista de Logística", c: "Rota Express Logística", s: 3 },
  { t: "Vendedor Externo", c: "Vitrine Moda e Casa", s: 1 },
];

export function FunilScreen() {
  const [stages, setStages] = useState(VAGAS.map((v) => v.s));
  const [moved, setMoved] = useState<number | null>(null);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      const idx = [2, 0, 4, 1][i % 4];
      i++;
      setStages((s) => s.map((v, j) => (j === idx ? (v + 1) % 4 : v)));
      setMoved(idx);
    }, 1700);
    return () => clearInterval(t);
  }, []);

  return (
    <AthenaShell active="vagas" title="Vagas" subtitle="Acompanhe cada vaga pelo funil de contratação" actions={<PrimaryBtn>+ Nova vaga</PrimaryBtn>}>
      <FunnelCard />
      <Card className="mt-3 overflow-hidden">
        {VAGAS.map((v, i) => {
          const s = stages[i];
          return (
            <motion.div
              key={v.t}
              animate={{ backgroundColor: moved === i ? "#f3f7fe" : "#ffffff" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 px-4 py-2.5"
              style={{ borderBottom: i < VAGAS.length - 1 ? `1px solid ${A.border}` : undefined }}
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold" style={{ color: A.navy }}>{v.t}</div>
                <div className="truncate text-[11.5px]" style={{ color: A.muted }}>{v.c}</div>
              </div>
              <div className="flex w-[260px] items-center gap-1">
                {STAGES.map((st, k) => (
                  <motion.span
                    key={st}
                    className="h-1.5 flex-1 rounded-full"
                    animate={{ backgroundColor: k <= s ? STAGE_COLOR[s] : "#e6eaf1" }}
                    transition={{ duration: 0.45, delay: k * 0.06 }}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="w-[112px] rounded-full px-2.5 py-1 text-center text-[11px] font-semibold"
                  style={{ background: `${STAGE_COLOR[s]}1f`, color: STAGE_COLOR[s] }}
                >
                  {STAGES[s]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </Card>
    </AthenaShell>
  );
}

/* ------------------------------------------------------------ 3. Captação de leads */

const LEADS = [
  { n: "Marcos Aurélio", s: "Recrutamento de vendedores", city: "São Paulo" },
  { n: "Patrícia Nogueira", s: "Seleção de enfermeiros", city: "Campinas" },
  { n: "Ricardo Tavares", s: "Recrutamento de operadores", city: "Guarulhos" },
  { n: "Luana Ferraz", s: "Recrutamento administrativo", city: "Santo André" },
];

export function CaptacaoScreen() {
  const [queue, setQueue] = useState<{ id: number; lead: (typeof LEADS)[number]; status: "novo" | "aprovando" | "aprovado" }[]>([
    { id: 0, lead: LEADS[1], status: "aprovado" },
  ]);
  useEffect(() => {
    let n = 1;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    const cycle = () => {
      const id = n++;
      const lead = LEADS[id % LEADS.length];
      setQueue((q) => [{ id, lead, status: "novo" as const }, ...q].slice(0, 4));
      t2 = setTimeout(() => setQueue((q) => q.map((x) => (x.id === id ? { ...x, status: "aprovando" } : x))), 1300);
      t3 = setTimeout(() => setQueue((q) => q.map((x) => (x.id === id ? { ...x, status: "aprovado" } : x))), 2000);
    };
    cycle();
    const t = setInterval(cycle, 3000);
    return () => {
      clearInterval(t);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AthenaShell active="leads" title="Leads de vagas" subtitle="Pedidos que chegam pelo site entram aqui automaticamente" actions={<GhostBtn>Formulário do site · ativo</GhostBtn>}>
      <div className="grid gap-2.5">
        <AnimatePresence initial={false}>
          {queue.map(({ id, lead, status }) => (
            <motion.div key={id} layout initial={{ opacity: 0, y: -18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Card className="flex items-center gap-4 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold" style={{ background: A.blueSoft, color: A.blue }}>
                  {lead.n[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-semibold" style={{ color: A.navy }}>{lead.n}</span>
                    {status === "novo" && <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase" style={{ background: A.amber, color: "#fff" }}>Novo</span>}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[11.5px]" style={{ color: A.muted }}>
                    <span className="rounded-md px-2 py-0.5 font-medium" style={{ background: A.blueSoft, color: A.blue }}>{lead.s}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {lead.city}</span>
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> (11) 9••••-••••</span>
                  </div>
                </div>
                {status === "aprovado" ? (
                  <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11.5px] font-semibold" style={{ background: A.greenSoft, color: A.green }}>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} /> Aprovado
                  </motion.span>
                ) : (
                  <motion.span
                    animate={status === "aprovando" ? { scale: [1, 0.93, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white"
                    style={{ background: A.blue, boxShadow: status === "aprovando" ? "0 0 0 4px rgba(29,91,191,0.18)" : undefined }}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} /> Aprovar
                  </motion.span>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AthenaShell>
  );
}

/* ------------------------------------------------------------ 4. Talentos */

const TALENTS = [
  { n: "Fernanda Lima", role: "Analista Financeira", edu: "Ciências Contábeis · Mackenzie", skills: ["Excel avançado", "SAP", "Conciliação"], exp: "5 anos" },
  { n: "Diego Pinheiro", role: "Desenvolvedor Mobile", edu: "Sistemas de Informação · UNIP", skills: ["Flutter", "Dart", "Firebase"], exp: "3 a 5 anos" },
  { n: "Camila Rocha", role: "Enfermeira Intensivista", edu: "Enfermagem · UNIFESP", skills: ["UTI adulto", "Ventilação mecânica", "Protocolos"], exp: "6 anos" },
];

export function TalentosScreen() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"review" | "approved">("review");
  const [approved, setApproved] = useState(14);
  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase("approved");
      setApproved((a) => a + 1);
    }, 2200);
    const t2 = setTimeout(() => {
      setPhase("review");
      setI((v) => (v + 1) % TALENTS.length);
    }, 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [i]);
  const t = TALENTS[i];

  return (
    <AthenaShell
      active="talentos"
      title="Banco de talentos"
      subtitle="Currículos recebidos aguardando triagem"
      actions={
        <div className="flex gap-2">
          <GhostBtn>Pendentes · {3 - (phase === "approved" ? 1 : 0)}</GhostBtn>
          <GhostBtn>Aprovados · {approved}</GhostBtn>
        </div>
      }
    >
      <div className="grid grid-cols-[1fr_260px] gap-4">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, rotate: -1.5 }} transition={{ duration: 0.4 }}>
            <Card className="overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full text-[16px] font-bold" style={{ background: "#fdf0c8", color: "#b7791f" }}>
                  {t.n[0]}
                </div>
                <div>
                  <div className="text-[15px] font-semibold" style={{ color: A.navy }}>{t.n}</div>
                  <div className="text-[12.5px] font-medium" style={{ color: A.amber }}>{t.role}</div>
                </div>
              </div>
              <div className="space-y-2.5 px-5 py-4 text-[12.5px]">
                <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4" style={{ color: A.muted }} /> {t.edu}</div>
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" style={{ color: A.muted }} /> Experiência: {t.exp}</div>
                <div className="flex items-start gap-2">
                  <Wrench className="mt-0.5 h-4 w-4" style={{ color: A.muted }} />
                  <div className="flex flex-wrap gap-1.5">
                    {t.skills.map((s) => (
                      <span key={s} className="rounded-md px-2 py-0.5 text-[11.5px] font-medium" style={{ background: A.blueSoft, color: A.blue }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 px-5 py-3" style={{ background: "#fafbfd", borderTop: `1px solid ${A.border}` }}>
                <span className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold" style={{ border: "1px solid #f3c2c2", color: A.red, background: "#fff" }}>
                  <X className="h-3.5 w-3.5" strokeWidth={3} /> Rejeitar
                </span>
                <motion.span
                  animate={phase === "approved" ? { scale: [1, 0.92, 1] } : {}}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white"
                  style={{ background: phase === "approved" ? A.green : A.blue }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} /> {phase === "approved" ? "Aprovado" : "Aprovar"}
                </motion.span>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="space-y-2.5">
          <Card className="p-4">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: A.muted }}>Histórico do candidato</div>
            <div className="mt-2 space-y-1.5 text-[12px]">
              <div>✓ Currículo recebido pelo site</div>
              <div>✓ Dados organizados automaticamente</div>
              <div style={{ color: phase === "approved" ? A.green : A.muted }}>{phase === "approved" ? "✓ Salvo no banco de talentos" : "• Aguardando triagem"}</div>
            </div>
          </Card>
          <AnimatePresence>
            {phase === "approved" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Card className="flex items-center gap-2.5 p-3.5" style={{ background: A.greenSoft, borderColor: "#bfe5cb" }}>
                  <Check className="h-4 w-4" style={{ color: A.green }} strokeWidth={3} />
                  <span className="text-[12px] font-medium" style={{ color: "#14532d" }}>Disponível para as próximas vagas</span>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AthenaShell>
  );
}

/* ------------------------------------------------------------ 5. Agenda */

const RECRUITERS = [
  { n: "Administrador", c: "#3b82f6" },
  { n: "Helena Prado", c: "#f59e0b" },
  { n: "Rafael Moura", c: "#8b5cf6" },
];
const EVENTS = [
  { d: 3, t: "Entrevista técnica", r: 1, min: 60 },
  { d: 5, t: "Entrevista com gestor", r: 1, min: 60 },
  { d: 8, t: "Entrevista — Felipe", r: 2, min: 60 },
  { d: 9, t: "Teste prático — Aline", r: 1, min: 60 },
  { d: 9, t: "Reunião de pipeline", r: 0, min: 45 },
  { d: 10, t: "Triagem — Vinícius", r: 1, min: 60 },
  { d: 12, t: "Fechamento de comissões", r: 0, min: 60 },
  { d: 14, t: "Visita comercial", r: 0, min: 90 },
  { d: 16, t: "Entrevista — Bruna", r: 2, min: 45 },
  { d: 21, t: "Teste prático — Caio", r: 1, min: 60 },
  { d: 23, t: "Visita comercial", r: 2, min: 90 },
  { d: 27, t: "Renovar certificado", r: 0, min: 15 },
];

export function AgendaScreen() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShown((s) => (s >= EVENTS.length + 6 ? 0 : s + 1)), 380);
    return () => clearInterval(t);
  }, []);
  // October 2026 starts on a Thursday.
  const cells = Array.from({ length: 35 }, (_, i) => i - 3);

  return (
    <AthenaShell
      active="agenda"
      title="Agenda"
      subtitle="Calendário unificado de compromissos e entrevistas"
      actions={
        <div className="flex items-center gap-3 text-[11px]">
          {RECRUITERS.map((r) => (
            <span key={r.n} className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: r.c }} />{r.n}</span>
          ))}
        </div>
      }
    >
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${A.border}` }}>
          <span className="text-[14px] font-semibold" style={{ color: A.navy }}>outubro de 2026</span>
          <div className="flex gap-1">
            {["Mês", "Semana", "Dia"].map((v, i) => (
              <span key={v} className="rounded-md px-2.5 py-1 text-[11px] font-semibold" style={i === 0 ? { background: A.blue, color: "#fff" } : { color: A.muted }}>{v}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-[10px] font-semibold uppercase" style={{ color: A.muted, borderBottom: `1px solid ${A.border}` }}>
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => <div key={d} className="py-1.5">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const evs = EVENTS.map((e, k) => ({ ...e, k })).filter((e) => e.d === day && e.k < shown);
            return (
              <div key={i} className="h-[84px] px-1.5 py-1" style={{ borderRight: i % 7 < 6 ? `1px solid ${A.border}` : undefined, borderBottom: i < 28 ? `1px solid ${A.border}` : undefined, background: day < 1 || day > 31 ? "#fafbfd" : "#fff" }}>
                <div className="text-right text-[11px] font-medium" style={{ color: day < 1 || day > 31 ? "#c3cad6" : A.navy }}>{day < 1 ? 30 + day : day > 31 ? day - 31 : day}</div>
                <div className="mt-0.5 space-y-0.5">
                  <AnimatePresence>
                    {evs.map((e) => (
                      <motion.div
                        key={e.k}
                        initial={{ opacity: 0, scale: 0.8, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                        className="truncate rounded px-1 py-0.5 text-[9.5px] font-semibold text-white"
                        style={{ background: RECRUITERS[e.r].c }}
                      >
                        {e.t}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </AthenaShell>
  );
}

/* ------------------------------------------------------------ 6. Financeiro */

const RECEIVABLES = [
  { d: "Honorários — Enfermeiro Intensivista", c: "Clínica Vida Mais Ltda", v: 6240, due: "04/10/2026" },
  { d: "Honorários — Operador de CNC", c: "Ferrotec Indústria Metalúrgica", v: 3360, due: "08/10/2026" },
  { d: "Honorários — Analista de Logística", c: "Rota Express Logística", v: 4480, due: "15/10/2026" },
  { d: "Honorários — Analista Financeiro Sênior", c: "Finnova Pagamentos S.A.", v: 7840, due: "22/10/2026" },
  { d: "Honorários — Vendedor Externo", c: "Vitrine Moda e Casa Ltda", v: 2980, due: "29/10/2026" },
];

export function FinanceiroScreen() {
  const [paid, setPaid] = useState(2);
  useEffect(() => {
    const t = setInterval(() => setPaid((p) => (p >= RECEIVABLES.length ? 2 : p + 1)), 1600);
    return () => clearInterval(t);
  }, []);
  const received = RECEIVABLES.slice(0, paid).reduce((a, r) => a + r.v, 0);
  const open = RECEIVABLES.slice(paid).reduce((a, r) => a + r.v, 0);

  return (
    <AthenaShell
      active="financeiro"
      title="Financeiro"
      subtitle="Contas a receber e a pagar ligadas às vagas"
      actions={
        <div className="flex gap-2">
          <GhostBtn><Download className="h-3.5 w-3.5" /> CSV</GhostBtn>
          <GhostBtn><Download className="h-3.5 w-3.5" /> PDF</GhostBtn>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Recebido no mês", v: received, c: A.green, bg: A.greenSoft },
          { l: "A receber", v: open, c: A.blue, bg: A.blueSoft },
          { l: "A pagar", v: 18420, c: A.red, bg: A.redSoft },
        ].map((k) => (
          <div key={k.l} className="rounded-xl px-4 py-3" style={{ background: k.bg, border: `1px solid ${k.c}33` }}>
            <div className="text-[11px] font-medium" style={{ color: k.c }}>{k.l}</div>
            <motion.div key={k.v} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-0.5 text-[20px] font-bold tabular-nums" style={{ color: A.navy }}>
              {brl(k.v)}
            </motion.div>
          </div>
        ))}
      </div>
      <Card className="mt-3 overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_110px_90px] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: A.muted, background: "#f8fafc", borderBottom: `1px solid ${A.border}` }}>
          <span>Descrição</span><span>Valor</span><span>Vencimento</span><span>Status</span>
        </div>
        {RECEIVABLES.map((r, i) => {
          const isPaid = i < paid;
          return (
            <motion.div
              key={r.d}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0, backgroundColor: i === paid - 1 ? "#f0fbf3" : "#ffffff" }}
              transition={{ delay: 0.06 * i, backgroundColor: { duration: 0.8 } }}
              className="grid grid-cols-[1fr_120px_110px_90px] items-center px-4 py-2.5"
              style={{ borderBottom: i < RECEIVABLES.length - 1 ? `1px solid ${A.border}` : undefined }}
            >
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-semibold" style={{ color: A.navy }}>{r.d}</div>
                <div className="truncate text-[11px]" style={{ color: A.muted }}>{r.c}</div>
              </div>
              <span className="text-[12.5px] font-semibold tabular-nums" style={{ color: A.green }}>{brl(r.v)}</span>
              <span className="text-[12px]" style={{ color: A.text }}>{r.due}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={isPaid ? "p" : "o"}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-fit rounded-md px-2 py-0.5 text-[11px] font-semibold"
                  style={isPaid ? { background: A.greenSoft, color: A.green } : { background: A.amberSoft, color: A.amber }}
                >
                  {isPaid ? "• Pago" : "• Aberto"}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </Card>
    </AthenaShell>
  );
}

/* ------------------------------------------------------------ 7. NFS-e */

const NOTES = [
  { c: "Vitrine Moda e Casa Ltda", v: 1680, nf: "2026-0001452" },
  { c: "Ferrotec Indústria Metalúrgica S.A.", v: 3360, nf: "2026-0001103" },
];

export function NfseScreen() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s >= 3 ? 0 : s + 1)), step === 3 ? 2400 : 1100);
    return () => clearTimeout(t);
  }, [step]);
  const value = 8800;
  const iss = value * 0.05;

  const status =
    step === 0 ? { l: "Pendente", bg: "#eef1f5", c: A.muted } : step < 3 ? { l: step === 1 ? "Assinando…" : "Transmitindo…", bg: A.blueSoft, c: A.blue } : { l: "• Emitida", bg: A.greenSoft, c: A.green };

  return (
    <AthenaShell
      active="nfse"
      title="Notas fiscais"
      subtitle="Emissão de NFS-e integrada à Prefeitura de São Paulo"
      actions={<PrimaryBtn>+ Emitir NFS-e</PrimaryBtn>}
    >
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.3fr_1.4fr_110px_70px_120px_110px] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: A.muted, background: "#f8fafc", borderBottom: `1px solid ${A.border}` }}>
          <span>Cliente</span><span>Serviço</span><span className="text-right">Valor</span><span className="text-right">ISS</span><span className="pl-4">NF nº</span><span>Status</span>
        </div>
        <div className="grid grid-cols-[1.3fr_1.4fr_110px_70px_120px_110px] items-center px-4 py-3" style={{ borderBottom: `1px solid ${A.border}`, background: step > 0 && step < 3 ? "#f6f9ff" : "#fff" }}>
          <span className="text-[12.5px] font-semibold" style={{ color: A.navy }}>Nimbus Cloud Tecnologia S.A.</span>
          <span className="text-[12px]">Recrutamento e seleção de pessoal<div className="text-[10.5px]" style={{ color: A.muted }}>Cód. 17.01</div></span>
          <span className="text-right text-[12.5px] font-semibold tabular-nums" style={{ color: A.navy }}>{brl(value)}<div className="text-[10.5px] font-normal" style={{ color: A.muted }}>líq. {brl(value - iss)}</div></span>
          <span className="text-right text-[12px] tabular-nums">5,00%</span>
          <span className="pl-4 font-mono text-[11.5px]" style={{ color: A.navy }}>
            {step === 3 ? (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>2026-0001488</motion.span>
            ) : (
              "—"
            )}
          </span>
          <span className="inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ background: status.bg, color: status.c }}>
            {step > 0 && step < 3 && <Loader2 className="h-3 w-3 animate-spin" strokeWidth={3} />}
            {status.l}
          </span>
        </div>
        {NOTES.map((n) => (
          <div key={n.nf} className="grid grid-cols-[1.3fr_1.4fr_110px_70px_120px_110px] items-center px-4 py-3" style={{ borderBottom: `1px solid ${A.border}` }}>
            <span className="text-[12.5px] font-semibold" style={{ color: A.navy }}>{n.c}</span>
            <span className="text-[12px]">Recrutamento e seleção de pessoal<div className="text-[10.5px]" style={{ color: A.muted }}>Cód. 17.01</div></span>
            <span className="text-right text-[12.5px] font-semibold tabular-nums" style={{ color: A.navy }}>{brl(n.v)}<div className="text-[10.5px] font-normal" style={{ color: A.muted }}>líq. {brl(n.v * 0.95)}</div></span>
            <span className="text-right text-[12px] tabular-nums">5,00%</span>
            <span className="pl-4 font-mono text-[11.5px]" style={{ color: A.navy }}>{n.nf}</span>
            <span className="w-fit rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ background: A.greenSoft, color: A.green }}>• Emitida</span>
          </div>
        ))}
      </Card>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {["Prefeitura de São Paulo", "Cálculo automático de ISS", "Sem limite de emissões"].map((t) => (
          <div key={t} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-[12px] font-medium" style={{ border: `1px solid ${A.border}`, color: A.navy }}>
            <Check className="h-4 w-4" style={{ color: A.green }} strokeWidth={3} /> {t}
          </div>
        ))}
      </div>
    </AthenaShell>
  );
}

/* ------------------------------------------------------------ 8. Indicadores */

const MONTHS = ["Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"];
const REV = [21, 26, 24, 31, 34, 33, 39];
const EXP = [17, 18, 19, 20, 21, 21, 22];

export function IndicadoresScreen() {
  const max = 45;
  const h = 200;
  const colW = 86;
  const linePts = REV.map((r, i) => `${40 + i * colW + 30},${h - ((r - EXP[i]) / max) * h}`).join(" ");
  return (
    <AthenaShell active="indicadores" title="Indicadores financeiros" subtitle="KPIs mensais para decidir com os sócios" actions={<PrimaryBtn><Download className="h-3.5 w-3.5" /> Relatório PDF</PrimaryBtn>}>
      <div className="grid grid-cols-5 gap-3">
        <Kpi label="Faturamento" value={208000} money color={A.green} soft={A.greenSoft} Icon={DollarSign} />
        <Kpi label="Despesas" value={138000} money color={A.red} soft={A.redSoft} Icon={CreditCard} />
        <Kpi label="Resultado" value={70000} money color={A.blue} soft={A.blueSoft} Icon={TrendingUp} />
        <Kpi label="Conversão" value={47} color={A.purple} soft={A.purpleSoft} Icon={BarChart3} foot="% das vagas abertas" />
        <Kpi label="Ticket médio" value={4860} money color={A.amber} soft={A.amberSoft} Icon={Briefcase} foot="por vaga concluída" />
      </div>
      <Card className="mt-3 p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[13px] font-semibold" style={{ color: A.navy }}>Faturamento vs. despesas por mês (R$ mil)</span>
          <span className="flex gap-4 text-[11px]">
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: "#22c55e" }} />Faturamento</span>
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: "#f87171" }} />Despesas</span>
            <span className="flex items-center gap-1.5"><i className="h-0.5 w-3" style={{ background: A.blue }} />Resultado</span>
          </span>
        </div>
        <svg viewBox={`0 0 ${40 + MONTHS.length * colW} ${h + 26}`} className="w-full">
          {[0, 15, 30, 45].map((v) => (
            <g key={v}>
              <line x1={34} x2={40 + MONTHS.length * colW} y1={h - (v / max) * h} y2={h - (v / max) * h} stroke="#edf0f5" />
              <text x={28} y={h - (v / max) * h + 4} textAnchor="end" fontSize={10} fill={A.muted}>{v}</text>
            </g>
          ))}
          {MONTHS.map((m, i) => {
            const x = 40 + i * colW;
            const rh = (REV[i] / max) * h;
            const eh = (EXP[i] / max) * h;
            return (
              <g key={m}>
                <motion.rect x={x + 10} width={20} rx={3} fill="#22c55e" initial={{ height: 0, y: h }} animate={{ height: rh, y: h - rh }} transition={{ delay: 0.08 * i, duration: 0.6 }} />
                <motion.rect x={x + 33} width={20} rx={3} fill="#f87171" initial={{ height: 0, y: h }} animate={{ height: eh, y: h - eh }} transition={{ delay: 0.08 * i + 0.1, duration: 0.6 }} />
                <text x={x + 31} y={h + 18} textAnchor="middle" fontSize={10.5} fill={A.muted}>{m}</text>
              </g>
            );
          })}
          <motion.polyline points={linePts} fill="none" stroke={A.blue} strokeWidth={2.5} strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 1.2 }} />
        </svg>
      </Card>
    </AthenaShell>
  );
}

export const ATHENA_SCREENS: Record<string, () => ReactNode> = {
  visao: () => <VisaoGeralScreen />,
  funil: () => <FunilScreen />,
  captacao: () => <CaptacaoScreen />,
  talentos: () => <TalentosScreen />,
  agenda: () => <AgendaScreen />,
  financeiro: () => <FinanceiroScreen />,
  nfse: () => <NfseScreen />,
  indicadores: () => <IndicadoresScreen />,
};
