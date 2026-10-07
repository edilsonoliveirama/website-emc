import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SINTAF_CASE_ENABLED } from "@/lib/features";
import {
  Users,
  Eye,
  BarChart3,
  FileSpreadsheet,
  Smartphone,
  Mail,
  MessagesSquare,
  Forward,
  HelpCircle,
  ShieldCheck,
  KeyRound,
  UserCog,
  ScrollText,
  Server,
  Upload,
  Send,
  BookOpenCheck,
  ClipboardCheck,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import { HeroDevices, ScreenShowcase, ExpiringLink, type ShowcaseItem } from "@/components/cases/sintaf/visuals";
import { SITE_URL, whatsappLink } from "@/lib/contact";

const PATH = "/cases/sintaf-area-do-filiado";
const PAGE_URL = `${SITE_URL}${PATH}`;
const TITLE = "Área do Filiado para Sindicatos | Case SINTAF-MA | EMC";
const DESCRIPTION =
  "Como a EMC criou para o SINTAF-MA uma área restrita com documentos confidenciais, transparência financeira e auditoria de leituras para mais de mil filiados.";
const CTA_MESSAGE = "Olá! Vi o case do SINTAF-MA e quero uma área do filiado para a minha entidade.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "área do filiado",
    "portal do associado",
    "sistema para sindicato",
    "distribuição de documentos confidenciais",
    "prestação de contas sindicato",
    "auditoria de leitura de documentos",
    "LGPD sindicato",
  ],
  alternates: { canonical: PAGE_URL },
  robots: SINTAF_CASE_ENABLED ? undefined : { index: false, follow: false },
  openGraph: { type: "article", title: TITLE, description: DESCRIPTION, url: PAGE_URL },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const BENEFITS = [
  {
    Icon: Users,
    title: "Cada documento para quem deve ver",
    text: "Publique para todos os filiados, para um grupo (ativos, aposentados ou pensionistas) ou de forma sigilosa para uma única pessoa.",
  },
  {
    Icon: Eye,
    title: "Leitura rastreada",
    text: "Cada abertura registra quem leu, quando e de qual endereço. A diretoria sabe o que foi visto.",
  },
  {
    Icon: BarChart3,
    title: "Transparência financeira",
    text: "Receitas e despesas mês a mês em um gráfico claro. O filiado vê os totais, sem acesso aos lançamentos internos.",
  },
  {
    Icon: FileSpreadsheet,
    title: "Carga inicial sem digitação",
    text: "Importe a base de filiados por planilha. O sistema corrige CPFs, aponta duplicados e mostra o que entrou antes de gravar.",
  },
  {
    Icon: Smartphone,
    title: "Pensado para quem usa",
    text: "Telas sóbrias, textos claros e uso confortável no celular, para filiados e equipe com pouca prática em sistemas.",
  },
];

const SCREENS: ShowcaseItem[] = [
  {
    id: "login",
    title: "Acesso simples e restrito",
    text: "O filiado entra com CPF, matrícula ou número de filiado. Primeiro acesso e recuperação de senha são guiados, sem depender da secretaria.",
    alt: "Tela de entrada da Área do Filiado do SINTAF-MA com campos de CPF e senha.",
  },
  {
    id: "resumo",
    title: "A situação da entidade em uma tela",
    text: "Filiados ativos, divisão por categoria, documentos publicados e aberturas recentes. Atalhos levam direto às tarefas do dia a dia: publicar, gerenciar filiados, importar planilha e ver a auditoria.",
    alt: "Painel de resumo com indicadores de filiados, documentos e aberturas nos últimos 30 dias.",
  },
  {
    id: "documentos",
    title: "Quem pode ver cada documento, definido na publicação",
    text: "A tabela mostra categoria, a quem o documento se destina, data, autor e número de leituras. Um documento pode ser desativado a qualquer momento, sem perder o histórico de quem já o abriu.",
    alt: "Lista de documentos publicados com identificação de visibilidade e número de leituras.",
  },
  {
    id: "financeiro",
    title: "Prestação de contas que o filiado entende",
    text: "Um gráfico anual compara receitas e despesas mês a mês. Os lançamentos são feitos pela diretoria; o filiado acompanha apenas os totais mensais.",
    alt: "Gráfico de barras com receitas e despesas de cada mês do ano.",
  },
  {
    id: "auditoria",
    title: "Quem leu, quando e de onde",
    text: "Cada abertura de documento fica registrada com data, hora, usuário, endereço IP e dispositivo, com filtro por período. É a base para a transparência e para a conformidade com a LGPD.",
    alt: "Tabela de auditoria com data e hora, usuário, documento, IP e dispositivo de cada leitura.",
  },
];

const SECURITY = [
  { Icon: Server, text: "Os arquivos ficam em armazenamento privado. Não existe link público permanente: cada leitura usa um endereço temporário que expira em poucos minutos." },
  { Icon: ShieldCheck, text: "A regra de quem vê o quê é aplicada no servidor. Um documento sem permissão simplesmente não aparece para quem não deve vê-lo." },
  { Icon: KeyRound, text: "Senhas guardadas de forma irreversível, nunca em texto aberto." },
  { Icon: UserCog, text: "Três perfis de acesso (administrador, funcionário e filiado), cada um só com o que precisa." },
  { Icon: ScrollText, text: "Toda leitura de documento é registrada, apoiando a conformidade com a LGPD." },
];

const STEPS = [
  { Icon: Upload, title: "Cadastro da base", text: "Importação por planilha ou cadastro individual." },
  { Icon: Send, title: "Publicação", text: "A equipe envia o PDF, escolhe a categoria e define quem pode ver." },
  { Icon: BookOpenCheck, title: "Consulta", text: "O filiado acessa pelo celular ou computador e lê direto no navegador." },
  { Icon: ClipboardCheck, title: "Acompanhamento", text: "A diretoria confere as leituras e o demonstrativo financeiro." },
];

const AUDIENCE = ["Sindicatos", "Associações de servidores", "Conselhos de classe", "Entidades de classe"];

const FAQS = [
  { q: "O filiado precisa instalar algum aplicativo?", a: "Não. O acesso é pelo navegador, no computador, tablet ou celular." },
  { q: "Todos os filiados enxergam todos os documentos?", a: "Não. A entidade escolhe, a cada publicação, se o documento é para todos, para uma categoria ou para uma pessoa específica." },
  { q: "Dá para saber se o filiado leu um documento?", a: "Sim. Cada abertura é registrada com data, hora, usuário e endereço IP, e a diretoria consulta isso na tela de auditoria." },
  { q: "Como entra a base de filiados que já temos?", a: "Por planilha (Excel ou CSV). O sistema higieniza os CPFs, aponta duplicados e permite simular a importação antes de gravar." },
  { q: "O filiado vê as contas detalhadas da entidade?", a: "Ele vê o gráfico com os totais mensais de receitas e despesas. Os lançamentos individuais ficam restritos à diretoria." },
  { q: "O sistema é adaptável à nossa entidade?", a: "Sim. Cada projeto é construído sobre as necessidades da entidade. Fale com a EMC para entender o escopo." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${PAGE_URL}#software` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${PAGE_URL}#software`,
      name: "Área do Filiado e Painel Administrativo SINTAF-MA",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Plataforma web com distribuição de documentos confidenciais por perfil, transparência financeira e auditoria de leituras para filiados de sindicato.",
      creator: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Cases", item: `${SITE_URL}/#cases` },
        { "@type": "ListItem", position: 3, name: "SINTAF-MA", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

function SectionHead({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="mono-label text-xs text-[var(--accent-amber)]">{label}</span>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-fg-muted">{text}</p>}
    </Reveal>
  );
}

export default function SintafCasePage() {
  if (!SINTAF_CASE_ENABLED) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-scene" />
      <Header />

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-28 pt-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_50%_at_70%_20%,rgba(180,134,42,0.16),transparent)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-fg-dim">
                <Link href="/" className="hover:text-fg">Início</Link>
                <span>/</span>
                <Link href="/#cases" className="hover:text-fg">Cases</Link>
              </nav>

              <Reveal y={12}>
                <span className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--accent-amber)]/40 bg-[var(--accent-amber-soft)] px-3 py-1 text-[11px] text-[var(--accent-amber)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-amber)]" />
                  Case SINTAF-MA
                </span>
                <h1 className="mt-6 font-[family-name:var(--font-display)] font-semibold tracking-tight">
                  <span className="block text-sm font-medium text-fg-muted sm:text-base">
                    Área do Filiado e Painel Administrativo: o case SINTAF-MA
                  </span>
                  <span className="mt-3 block text-4xl leading-[1.08] sm:text-5xl">
                    Documentos confidenciais para cada filiado,{" "}
                    <span className="text-gradient">com prestação de contas à vista de todos.</span>
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
                  Desenvolvemos para o SINTAF-MA uma plataforma própria onde mais de mil filiados consultam
                  balanços, atas e pareceres com segurança, e a diretoria sabe quem leu o quê.
                </p>
                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                  <a
                    href={whatsappLink(CTA_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine w-full rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
                  >
                    Quero uma área assim para a minha entidade
                  </a>
                  <a
                    href="#telas"
                    className="w-full rounded-full border border-[var(--panel-border-strong)] px-6 py-3 text-center text-sm font-medium text-fg transition-colors hover:bg-white/5 sm:w-auto"
                  >
                    Ver as telas
                  </a>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-fg-dim">
                  Case SINTAF-MA · Sindicato do Grupo Tributação, Arrecadação e Fiscalização da Fazenda Estadual do Maranhão
                </p>
              </Reveal>
            </div>

            <HeroDevices />
          </div>
        </section>

        {/* Challenge vs solution */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead label="O desafio" title="Documento sensível não pode circular solto" />
            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              <Reveal className="glass relative overflow-hidden rounded-[1.5rem] p-8">
                <span className="mono-label text-[11px] text-[#ff8a8a]">Antes</span>
                <p className="mt-4 leading-relaxed text-fg-muted">
                  Sindicatos e associações lidam com documentos que não podem circular soltos: balanços, atas,
                  pareceres jurídicos e até andamento de processos individuais. Mandar tudo por e-mail ou grupo de
                  mensagens expõe a entidade, e a diretoria nunca sabe se o filiado chegou a abrir o documento.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    { Icon: Mail, t: "Anexo no e-mail" },
                    { Icon: MessagesSquare, t: "PDF no grupo" },
                    { Icon: Forward, t: "Encaminhado para fora" },
                    { Icon: HelpCircle, t: "Quem leu? Ninguém sabe" },
                  ].map(({ Icon, t }, i) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full border border-[#ff6b6b]/25 bg-[#ff6b6b]/[0.06] px-3 py-1.5 text-xs text-[#ffb3b3]"
                      style={{ transform: `rotate(${[-2, 1.5, -1, 2][i]}deg)` }}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1} className="glass-strong relative overflow-hidden rounded-[1.5rem] border-[var(--accent-amber)]/30 p-8">
                <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[radial-gradient(closest-side,rgba(180,134,42,0.18),transparent)]" />
                <span className="mono-label text-[11px] text-[var(--accent-mint)]">A solução</span>
                <p className="mt-4 leading-relaxed text-fg-muted">
                  O SINTAF-MA precisava de um ambiente restrito, simples para quem tem pouca familiaridade com
                  tecnologia e auditável para a prestação de contas.
                </p>
                <p className="mt-4 leading-relaxed text-fg">
                  Construímos uma plataforma web exclusiva, com base de usuários própria, que reúne em um só lugar
                  a gestão de filiados, a equipe do sindicato, a publicação de documentos, a transparência
                  financeira e a auditoria de leituras. Funciona no computador, no tablet e no celular.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead label="Benefícios" title="Controle para a diretoria, simplicidade para o filiado" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map(({ Icon, title, text }, i) => (
                <Reveal
                  key={title}
                  delay={i * 0.06}
                  className={`glass group relative overflow-hidden rounded-xl p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--panel-border-strong)] ${
                    i === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--accent-amber)]/30 bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Screens */}
        <section id="telas" className="section-divider scroll-mt-24 px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              label="As telas"
              title="Por dentro do sistema"
              text="Recriamos as telas reais do Painel Administrativo para você navegar. Clique em cada uma."
            />
            <div className="mt-14">
              <ScreenShowcase items={SCREENS} />
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <span className="mono-label text-xs text-[var(--accent-amber)]">Segurança e privacidade</span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                  Confidencial por construção
                </h2>
              </Reveal>
              <div className="mt-8 space-y-4">
                {SECURITY.map(({ Icon, text }, i) => (
                  <Reveal key={text} delay={i * 0.06} className="flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-mint-soft)] text-[var(--accent-mint)]">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="text-sm leading-relaxed text-fg-muted sm:text-base">{text}</span>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={0.15}>
              <ExpiringLink />
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead label="Como funciona" title="Quatro passos, da planilha à prestação de contas" />
            <div className="relative mt-16">
              <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-[var(--accent-amber)]/0 via-[var(--accent-amber)]/50 to-[var(--accent-amber)]/0 lg:block" />
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map(({ Icon, title, text }, i) => (
                  <Reveal key={title} delay={i * 0.1} className="relative text-center">
                    <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--accent-amber)]/40 bg-[#0e1424] text-[var(--accent-amber)] shadow-[0_0_30px_-8px_rgba(180,134,42,0.6)]">
                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <span className="mono-label mt-4 block text-[11px] text-fg-dim">0{i + 1}</span>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">{title}</h3>
                    <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-fg-muted">{text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="section-divider px-4 py-28">
          <Reveal className="mx-auto max-w-4xl text-center">
            <span className="mono-label text-xs text-[var(--accent-amber)]">Para quem é</span>
            <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              Para entidades que precisam distribuir documentos sensíveis a uma base de centenas ou milhares de
              associados, <span className="text-gradient">com controle de acesso e prova de leitura.</span>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {AUDIENCE.map((a) => (
                <span key={a} className="rounded-full border border-[var(--panel-border-strong)] bg-white/[0.03] px-4 py-2 text-sm text-fg-muted">
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto max-w-3xl">
            <SectionHead label="Dúvidas" title="Perguntas frequentes" />
            <div className="mt-12 flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.04}>
                  <details className="glass group rounded-xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-base font-semibold">
                      {f.q}
                      <span className="text-xl font-light text-[var(--accent-amber)] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-28 pt-8">
          <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--accent-amber)]/30 bg-gradient-to-br from-[#143a5f] via-[#0e1a33] to-[#0b0f1c] px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(180,134,42,0.35),transparent)]" />
            <h2 className="relative font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Vamos conversar sobre a área restrita da sua entidade
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-fg-muted">
              Conte como a sua entidade distribui documentos hoje. Voltamos com uma proposta objetiva.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(CTA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent-amber)] px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
                Fale com um especialista da EMC
              </a>
              <a
                href={whatsappLink("Olá! Quero uma demonstração da área do filiado que a EMC fez para o SINTAF-MA.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-fg transition-colors hover:bg-white/5 sm:w-auto"
              >
                Peça uma demonstração
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
