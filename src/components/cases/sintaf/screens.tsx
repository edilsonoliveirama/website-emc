"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Faithful recreations of the SINTAF-MA system screens, filled with fictitious data.
// IPs use the RFC 5737 documentation ranges so they can never point to a real person.

export const SCREEN_W = 1040;
export const SCREEN_H = 640;

const C = {
  azul: "#143a5f",
  azul2: "#1d4f7e",
  azulClaro: "#e8eff6",
  ouro: "#b4862a",
  texto: "#1c2733",
  texto2: "#51606f",
  borda: "#d5dde5",
  fundo: "#f4f6f9",
  ok: "#1f7a4d",
  okFundo: "#e3f4ea",
  rec: "#0f766e",
  des: "#7c8fa6",
};

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";

function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="#0d2a47" />
      <path d="M32 12l16 6v12c0 10-7 17-16 22-9-5-16-12-16-22V18z" fill="none" stroke="#e0b44c" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M24 31l6 6 11-12" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ children, tone = "azul" }: { children: ReactNode; tone?: "azul" | "sigilo" | "off" | "novo" | "ok" }) {
  const tones = {
    azul: { background: C.azulClaro, color: C.azul },
    sigilo: { background: "#efe7fb", color: "#5b34a0" },
    off: { background: "#e9ecef", color: "#5a6672" },
    novo: { background: C.ouro, color: "#fff" },
    ok: { background: C.okFundo, color: C.ok },
  };
  return (
    <span
      className="inline-block whitespace-nowrap rounded-full px-2 py-px text-[11px] font-bold"
      style={{ ...tones[tone], letterSpacing: tone === "novo" ? "0.04em" : undefined, textTransform: tone === "novo" ? "uppercase" : undefined }}
    >
      {children}
    </span>
  );
}

function Shell({
  area,
  user,
  nav,
  active,
  children,
}: {
  area: string;
  user: string;
  nav?: string[];
  active?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: C.fundo, color: C.texto, fontFamily: FONT, fontSize: 14 }}>
      <div style={{ background: C.azul, borderBottom: `4px solid ${C.ouro}` }}>
        <div className="flex items-center gap-3 px-6 py-2.5 text-white">
          <Logo />
          <div className="leading-tight">
            <div className="font-bold tracking-wide">SINTAF-MA</div>
            <div className="text-[11px] opacity-85">{area}</div>
          </div>
          <div className="ml-auto flex items-center gap-3 text-[13px]">
            <span className="opacity-90">{user}</span>
            <span className="rounded-lg border border-white/60 px-3 py-1.5 font-semibold">Sair</span>
          </div>
        </div>
        {nav && (
          <div className="flex gap-1 px-6" style={{ background: C.azul2 }}>
            {nav.map((n) => (
              <span
                key={n}
                className="px-3.5 py-2.5 text-[13px] text-white"
                style={
                  n === active
                    ? { borderBottom: `3px solid ${C.ouro}`, fontWeight: 600, background: "rgba(255,255,255,0.1)" }
                    : { borderBottom: "3px solid transparent" }
                }
              >
                {n}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden px-6 py-5">{children}</div>
    </div>
  );
}

const ADMIN_NAV = ["Resumo", "Filiados", "Funcionários", "Documentos", "Financeiro", "Auditoria", "Meu perfil"];
const ADMIN_USER = "Helena · Administradora";

function Card({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-lg ${className}`}
      style={{ background: "#fff", border: `1px solid ${C.borda}`, boxShadow: "0 1px 2px rgba(20,40,60,0.06), 0 4px 14px rgba(20,40,60,0.06)", ...style }}
    >
      {children}
    </div>
  );
}

function H1({ children }: { children: ReactNode }) {
  return <div className="mb-3 text-[22px] font-bold" style={{ color: C.azul }}>{children}</div>;
}

function Btn({ children, sec }: { children: ReactNode; sec?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-lg px-3.5 py-2 text-[13px] font-semibold"
      style={sec ? { border: `1px solid ${C.azul}`, color: C.azul, background: "#fff" } : { border: `1px solid ${C.azul}`, background: C.azul, color: "#fff" }}
    >
      {children}
    </span>
  );
}

function Th({ children }: { children: ReactNode }) {
  return (
    <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase" style={{ color: C.texto2, letterSpacing: "0.04em", borderBottom: `2px solid ${C.borda}`, background: "#f8fafc" }}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-3 py-2 align-top text-[13px] ${className}`} style={{ borderBottom: `1px solid ${C.borda}` }}>{children}</td>;
}

/* ---------------- Login ---------------- */

export function LoginScreen() {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: C.fundo, color: C.texto, fontFamily: FONT, fontSize: 14 }}>
      <div className="flex items-center gap-3 px-6 py-2.5 text-white" style={{ background: C.azul, borderBottom: `4px solid ${C.ouro}` }}>
        <Logo />
        <div className="leading-tight">
          <div className="font-bold tracking-wide">SINTAF-MA</div>
          <div className="text-[11px] opacity-85">Área do Filiado</div>
        </div>
      </div>
      <div className="grid flex-1 place-items-center">
        <Card className="w-[400px] p-7">
          <div className="mb-1 text-center text-[22px] font-bold" style={{ color: C.azul }}>Área do Filiado</div>
          <div className="mb-5 text-center text-[13px]" style={{ color: C.texto2 }}>Acesso restrito a filiados e equipe do sindicato</div>
          <div className="mb-1 text-[13px] font-semibold">CPF, matrícula ou nº de filiado</div>
          <div className="mb-4 rounded-lg px-3 py-2.5" style={{ border: "1px solid #9aa9b8", background: "#fff" }}>
            <TypingText text="045.412.338-07" />
          </div>
          <div className="mb-1 text-[13px] font-semibold">Senha</div>
          <div className="mb-5 rounded-lg px-3 py-2.5 tracking-[0.3em]" style={{ border: "1px solid #9aa9b8", background: "#fff" }}>••••••••</div>
          <div className="mb-4 rounded-lg py-2.5 text-center font-semibold text-white" style={{ background: C.azul }}>Entrar</div>
          <div className="flex justify-between text-[13px]" style={{ color: C.azul2 }}>
            <span className="underline">Primeiro acesso</span>
            <span className="underline">Esqueci minha senha</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TypingText({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN((v) => v + 1), 90);
    return () => clearTimeout(t);
  }, [n, text]);
  return (
    <span>
      {text.slice(0, n)}
      <span className="ml-px inline-block h-[15px] w-px translate-y-[2px] animate-pulse" style={{ background: C.texto }} />
    </span>
  );
}

/* ---------------- Resumo ---------------- */

const INDICADORES = [
  { n: 1087, label: "filiados com cadastro ativo (de 1.124)" },
  { n: 742, label: "servidores ativos" },
  { n: 291, label: "aposentados" },
  { n: 54, label: "pensionistas" },
  { n: 136, label: "documentos publicados" },
  { n: 2418, label: "aberturas de documentos nos últimos 30 dias" },
];

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toLocaleString("pt-BR")}</>;
}

export function ResumoScreen() {
  return (
    <Shell area="Painel Administrativo" user={ADMIN_USER} nav={ADMIN_NAV} active="Resumo">
      <H1>Resumo</H1>
      <div className="mb-5 grid grid-cols-3 gap-3">
        {INDICADORES.map((i) => (
          <Card key={i.label} className="p-4" style={{ borderLeft: `4px solid ${C.ouro}` }}>
            <div className="text-[30px] font-bold leading-tight" style={{ color: C.azul }}>
              <CountUp to={i.n} />
            </div>
            <div className="text-[13px]" style={{ color: C.texto2 }}>{i.label}</div>
          </Card>
        ))}
      </div>
      <Card className="p-4">
        <div className="mb-3 text-[17px] font-bold" style={{ color: C.azul }}>Atalhos</div>
        <div className="flex gap-2">
          <Btn>Publicar documento</Btn>
          <Btn sec>Gerenciar filiados</Btn>
          <Btn sec>Importar planilha</Btn>
          <Btn sec>Ver auditoria</Btn>
        </div>
      </Card>
    </Shell>
  );
}

/* ---------------- Documentos publicados ---------------- */

const DOCS: { titulo: string; cat: string; vis: string; tone: "azul" | "sigilo"; data: string; autor: string; leituras: number; off?: boolean }[] = [
  { titulo: "Balanço patrimonial 2025", cat: "Prestação de contas", vis: "Todos os filiados", tone: "azul", data: "12/03/2026", autor: "Tesouraria", leituras: 812 },
  { titulo: "Ata da assembleia geral extraordinária", cat: "Atas", vis: "Todos os filiados", tone: "azul", data: "28/02/2026", autor: "Secretaria", leituras: 655 },
  { titulo: "Parecer jurídico: revisão de aposentadorias", cat: "Jurídico", vis: "Aposentados", tone: "azul", data: "19/02/2026", autor: "Assessoria jurídica", leituras: 214 },
  { titulo: "Andamento do processo nº 0812/2024", cat: "Processos", vis: "Sigiloso · 1 filiado", tone: "sigilo", data: "10/02/2026", autor: "Assessoria jurídica", leituras: 1 },
  { titulo: "Demonstrativo financeiro de janeiro", cat: "Prestação de contas", vis: "Todos os filiados", tone: "azul", data: "05/02/2026", autor: "Tesouraria", leituras: 497 },
  { titulo: "Convocação: eleição do conselho fiscal", cat: "Comunicados", vis: "Ativos", tone: "azul", data: "14/01/2026", autor: "Secretaria", leituras: 588, off: true },
];

export function DocumentosScreen() {
  return (
    <Shell area="Painel Administrativo" user={ADMIN_USER} nav={ADMIN_NAV} active="Documentos">
      <div className="flex items-center">
        <H1>Documentos publicados</H1>
        <span className="ml-auto mb-3"><Btn>Publicar documento</Btn></span>
      </div>
      <Card className="overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Th>Título</Th>
              <Th>Categoria</Th>
              <Th>Visível para</Th>
              <Th>Data</Th>
              <Th>Autor</Th>
              <Th>Leituras</Th>
            </tr>
          </thead>
          <tbody>
            {DOCS.map((d, i) => (
              <motion.tr
                key={d.titulo}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.35 }}
                style={{ color: d.off ? "#7b8794" : undefined }}
              >
                <Td><span className="font-semibold" style={{ color: d.off ? undefined : C.azul }}>{d.titulo}</span></Td>
                <Td>{d.cat}</Td>
                <Td>{d.off ? <Badge tone="off">Desativado</Badge> : <Badge tone={d.tone}>{d.vis}</Badge>}</Td>
                <Td className="whitespace-nowrap">{d.data}</Td>
                <Td>{d.autor}</Td>
                <Td><span className="font-semibold">{d.leituras.toLocaleString("pt-BR")}</span></Td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Shell>
  );
}

/* ---------------- Financeiro ---------------- */

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const RECEITAS = [182, 176, 191, 185, 198, 189, 194, 201, 187, 0, 0, 0];
const DESPESAS = [141, 158, 149, 166, 152, 171, 160, 155, 163, 0, 0, 0];

export function FinanceiroScreen() {
  const max = 220;
  const chartH = 300;
  const colW = 70;
  return (
    <Shell area="Painel Administrativo" user={ADMIN_USER} nav={ADMIN_NAV} active="Financeiro">
      <Card className="p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[18px] font-bold" style={{ color: C.azul }}>Demonstrativo financeiro</div>
            <div className="text-[13px]" style={{ color: C.texto2 }}>Totais mensais de receitas e despesas, em R$ mil</div>
          </div>
          <div>
            <div className="mb-1 text-[12px] font-semibold">Ano</div>
            <div className="rounded-lg px-3 py-1.5 text-[13px]" style={{ border: "1px solid #9aa9b8" }}>2026 ▾</div>
          </div>
        </div>
        <div className="my-3 flex gap-5 text-[13px]">
          <span className="flex items-center gap-1.5"><i className="inline-block h-3 w-3 rounded-[3px]" style={{ background: C.rec }} />Receitas</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-3 w-3 rounded-[3px]" style={{ background: C.des }} />Despesas</span>
        </div>
        <svg viewBox={`0 0 ${colW * 12 + 40} ${chartH + 30}`} className="w-full">
          {[0, 50, 100, 150, 200].map((v) => {
            const y = chartH - (v / max) * chartH;
            return (
              <g key={v}>
                <line x1={36} x2={colW * 12 + 40} y1={y} y2={y} stroke="#e3e8ee" />
                <text x={30} y={y + 4} textAnchor="end" fontSize={11} fill="#3d4b5a">{v}</text>
              </g>
            );
          })}
          {MESES.map((m, i) => {
            const x = 44 + i * colW;
            const rh = (RECEITAS[i] / max) * chartH;
            const dh = (DESPESAS[i] / max) * chartH;
            return (
              <g key={m}>
                <motion.rect x={x + 8} width={24} rx={3} fill={C.rec} initial={{ height: 0, y: chartH }} animate={{ height: rh, y: chartH - rh }} transition={{ delay: 0.05 * i, duration: 0.6, ease: "easeOut" }} />
                <motion.rect x={x + 34} width={24} rx={3} fill={C.des} initial={{ height: 0, y: chartH }} animate={{ height: dh, y: chartH - dh }} transition={{ delay: 0.05 * i + 0.1, duration: 0.6, ease: "easeOut" }} />
                <text x={x + 33} y={chartH + 20} textAnchor="middle" fontSize={11} fill="#3d4b5a">{m}</text>
              </g>
            );
          })}
        </svg>
      </Card>
    </Shell>
  );
}

/* ---------------- Auditoria ---------------- */

type Leitura = { quando: string; nome: string; num: string; tipo: string; doc: string; cat: string; ip: string; disp: string };

const LEITURAS: Leitura[] = [
  { quando: "06/10/2026 14:32", nome: "Maria S. Oliveira", num: "0412", tipo: "Ativo", doc: "Balanço patrimonial 2025", cat: "Prestação de contas", ip: "203.0.113.24", disp: "Celular · Android" },
  { quando: "06/10/2026 14:27", nome: "João P. Ferreira", num: "0977", tipo: "Aposentado", doc: "Parecer jurídico: revisão de aposentadorias", cat: "Jurídico", ip: "198.51.100.7", disp: "Computador · Windows" },
  { quando: "06/10/2026 13:58", nome: "Ana L. Costa", num: "0233", tipo: "Ativo", doc: "Ata da assembleia geral extraordinária", cat: "Atas", ip: "203.0.113.91", disp: "Tablet · iPadOS" },
  { quando: "06/10/2026 13:41", nome: "Carlos E. Mendes", num: "1058", tipo: "Pensionista", doc: "Demonstrativo financeiro de janeiro", cat: "Prestação de contas", ip: "198.51.100.62", disp: "Celular · iOS" },
  { quando: "06/10/2026 13:12", nome: "Rita M. Araújo", num: "0618", tipo: "Ativo", doc: "Andamento do processo nº 0812/2024", cat: "Processos", ip: "203.0.113.150", disp: "Computador · macOS" },
  { quando: "06/10/2026 12:55", nome: "Paulo R. Lima", num: "0345", tipo: "Ativo", doc: "Balanço patrimonial 2025", cat: "Prestação de contas", ip: "198.51.100.33", disp: "Celular · Android" },
];

const NOVAS: Leitura[] = [
  { quando: "06/10/2026 14:36", nome: "Fernanda C. Rocha", num: "0891", tipo: "Ativo", doc: "Ata da assembleia geral extraordinária", cat: "Atas", ip: "203.0.113.58", disp: "Celular · iOS" },
  { quando: "06/10/2026 14:39", nome: "Antônio B. Sousa", num: "0127", tipo: "Aposentado", doc: "Balanço patrimonial 2025", cat: "Prestação de contas", ip: "198.51.100.114", disp: "Computador · Windows" },
  { quando: "06/10/2026 14:43", nome: "Luciana D. Pires", num: "0764", tipo: "Ativo", doc: "Parecer jurídico: revisão de aposentadorias", cat: "Jurídico", ip: "203.0.113.207", disp: "Celular · Android" },
];

export function AuditoriaScreen({ live = true }: { live?: boolean }) {
  const [rows, setRows] = useState(() => LEITURAS.map((l, i) => ({ ...l, id: `base-${i}` })));
  useEffect(() => {
    if (!live) return;
    let i = 0;
    const t = setInterval(() => {
      const next = NOVAS[i % NOVAS.length];
      i++;
      setRows((r) => [{ ...next, id: `novo-${i}` }, ...r].slice(0, 6));
    }, 2600);
    return () => clearInterval(t);
  }, [live]);

  return (
    <Shell area="Painel Administrativo" user={ADMIN_USER} nav={ADMIN_NAV} active="Auditoria">
      <H1>Auditoria de leituras</H1>
      <div className="-mt-2 mb-3 text-[13px]" style={{ color: C.texto2 }}>
        Registro automático de cada abertura de documento: quem, quando e de qual endereço IP.
      </div>
      <Card className="overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Th>Data/hora</Th>
              <Th>Usuário</Th>
              <Th>Documento</Th>
              <Th>IP</Th>
              <Th>Dispositivo</Th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((l, idx) => (
                <motion.tr
                  key={l.id}
                  layout
                  initial={{ opacity: 0, backgroundColor: "#fbf3df" }}
                  animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, backgroundColor: { duration: 2.2 } }}
                >
                  <Td className="whitespace-nowrap">{l.quando}</Td>
                  <Td>
                    <span className="font-semibold">{l.nome}</span>
                    <div className="text-[12px]" style={{ color: C.texto2 }}>{l.num} · {l.tipo}</div>
                  </Td>
                  <Td>
                    {l.doc}
                    <div className="text-[12px]" style={{ color: C.texto2 }}>{l.cat}</div>
                  </Td>
                  <Td className="whitespace-nowrap font-mono text-[12px]">{l.ip}</Td>
                  <Td>{idx === 0 && live ? <Badge tone="ok">{l.disp}</Badge> : l.disp}</Td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </Card>
    </Shell>
  );
}

/* ---------------- Visão do filiado (celular) ---------------- */

export const PHONE_W = 390;
export const PHONE_H = 780;

const DOCS_FILIADO = [
  { t: "Balanço patrimonial 2025", c: "Prestação de contas", novo: true, meta: "Publicado em 12/03/2026 · 1,8 MB" },
  { t: "Andamento do processo nº 0812/2024", c: "Processos", sigilo: true, meta: "Publicado em 10/02/2026 · 420 KB" },
  { t: "Ata da assembleia geral extraordinária", c: "Atas", meta: "Publicado em 28/02/2026 · 960 KB" },
  { t: "Demonstrativo financeiro de janeiro", c: "Prestação de contas", meta: "Competência: jan/2026 · 310 KB" },
];

export function FiliadoPhoneScreen() {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: C.fundo, color: C.texto, fontFamily: FONT, fontSize: 14 }}>
      <div style={{ background: C.azul, borderBottom: `4px solid ${C.ouro}` }}>
        <div className="flex items-center gap-2.5 px-4 pb-2.5 pt-11 text-white">
          <Logo size={30} />
          <div className="leading-tight">
            <div className="font-bold tracking-wide">SINTAF-MA</div>
            <div className="text-[11px] opacity-85">Área do Filiado</div>
          </div>
        </div>
        <div className="flex gap-1 px-3" style={{ background: C.azul2 }}>
          {["Documentos", "Financeiro", "Meu perfil"].map((n, i) => (
            <span key={n} className="px-2.5 py-2.5 text-[13px] text-white" style={i === 0 ? { borderBottom: `3px solid ${C.ouro}`, fontWeight: 600, background: "rgba(255,255,255,0.1)" } : { borderBottom: "3px solid transparent" }}>
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden p-4">
        <div className="mb-3 text-[20px] font-bold" style={{ color: C.azul }}>Documentos</div>
        <div className="mb-3 flex gap-1.5">
          {["Todas", "Atas", "Jurídico"].map((c, i) => (
            <span key={c} className="rounded-full px-3 py-1 text-[12px]" style={i === 0 ? { background: C.azul, color: "#fff" } : { border: `1px solid ${C.borda}`, background: "#fff" }}>
              {c}
            </span>
          ))}
        </div>
        <div className="grid gap-2.5">
          {DOCS_FILIADO.map((d, i) => (
            <motion.div key={d.t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 * i + 0.2 }}>
              <Card className="flex gap-3 p-3">
                <div className="grid h-12 w-10 flex-none place-items-center rounded-md text-[10px] font-extrabold" style={{ background: C.azulClaro, color: C.azul }}>PDF</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold leading-snug" style={{ color: C.azul }}>
                    {d.t} {d.novo && <Badge tone="novo">Novo</Badge>}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge>{d.c}</Badge>
                    {d.sigilo && <Badge tone="sigilo">Sigiloso, só para você</Badge>}
                  </div>
                  <div className="mt-1 text-[11px]" style={{ color: C.texto2 }}>{d.meta}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
