import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen, MessagesSquare, Calculator, CalendarClock, HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import type { ShowcaseItem } from "@/components/cases/sintaf/visuals";
import { AthenaHeroDevice, VacancyCycle, AthenaShowcase, BackstageGrid, RealShotsGrid } from "@/components/cases/athena/visuals";
import { SITE_URL, whatsappLink } from "@/lib/contact";

const PATH = "/cases/athena";
const PAGE_URL = `${SITE_URL}${PATH}`;
const TITLE = "Case Athena: Sistema para Agências de Recrutamento | EMC Soluções";
const DESCRIPTION =
  "Conheça o Athena, plataforma desenvolvida pela EMC Soluções que reúne vagas, candidatos, agenda, financeiro, comissões e emissão de NFS-e para agências de recrutamento.";
const CTA_MESSAGE = "Olá! Vi o case do Athena e quero um sistema sob medida para o meu negócio.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "sistema para agência de recrutamento",
    "software de recrutamento e seleção",
    "gestão de vagas e candidatos",
    "comissão de recrutador",
    "emissão de NFS-e",
    "SaaS multiempresa",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", title: TITLE, description: DESCRIPTION, url: PAGE_URL, images: ["/cases/athena/visao-geral.webp"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/cases/athena/visao-geral.webp"] },
};

const TAGS = ["SaaS multiempresa", "Recrutamento", "Financeiro", "NFS-e"];

const PAINS = [
  { Icon: MessagesSquare, text: "Vagas chegando por vários canais" },
  { Icon: FolderOpen, text: "Candidatos espalhados em pastas e conversas" },
  { Icon: Calculator, text: "Comissão calculada à mão no fim do mês" },
  { Icon: CalendarClock, text: "Garantia de reposição vencendo sem ninguém ver" },
  { Icon: HelpCircle, text: "Lucro do mês só quando o contador fecha" },
];

const FEATURES: ShowcaseItem[] = [
  { id: "visao", title: "Visão geral em tempo real", text: "Candidatos, clientes, vendedores, contas a receber, a pagar e em atraso logo na entrada. O gestor abre o sistema e já sabe onde agir.", alt: "Painel com indicadores de candidatos, clientes, vendedores e financeiro." },
  { id: "funil", title: "Funil de contratação", text: "Cada vaga mostra em que etapa está: aberta, em andamento, em experiência ou concluída. Os gargalos aparecem antes de virarem atraso para o cliente.", alt: "Funil de contratação com vagas em cada etapa." },
  { id: "captacao", title: "Captação automática de vagas", text: "Os pedidos que chegam pelo site entram direto como leads, com contato, cidade e serviço. A equipe só revisa e aprova, sem redigitar nada.", alt: "Fila de leads de vagas chegando pelo site e sendo aprovados." },
  { id: "talentos", title: "Banco de talentos com triagem", text: "Currículos recebidos ficam numa fila de aprovação, com formação, habilidades e experiência organizadas. Um clique aprova ou rejeita, e o histórico fica salvo para as próximas vagas.", alt: "Triagem de currículo com botões de aprovar e rejeitar." },
  { id: "agenda", title: "Agenda unificada", text: "Entrevistas, testes práticos, visitas comerciais e reuniões num só calendário, com uma cor por recrutador. Mês, semana ou dia.", alt: "Calendário mensal com eventos coloridos por recrutador." },
  { id: "financeiro", title: "Financeiro ligado às vagas", text: "Cada contratação gera o recebível dos honorários, já vinculado ao cliente e à vaga. O sistema mostra o que entra, o que sai e o que atrasou, e exporta em CSV e PDF.", alt: "Contas a receber de honorários com status de pagamento." },
  { id: "nfse", title: "Emissão de NFS-e integrada", text: "A nota de serviço sai de dentro do sistema, integrada à Prefeitura de São Paulo, com cálculo de ISS e valor líquido. Sem copiar e colar no portal e sem limite de emissões.", alt: "Lista de notas fiscais de serviço sendo emitidas." },
  { id: "indicadores", title: "Indicadores para decidir", text: "Faturamento, despesas, resultado, taxa de conversão e ticket médio por vaga, mês a mês, com relatório em PDF pronto para a reunião com os sócios.", alt: "Indicadores financeiros e gráfico de faturamento versus despesas." },
];

const STACK = ["React", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "IA generativa", "Integração NFS-e"];

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
      name: "Athena",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Sistema de gestão para agências de recrutamento e seleção: vagas, candidatos, agenda, financeiro, comissões e NFS-e numa plataforma só.",
      creator: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Cases", item: `${SITE_URL}/#cases` },
        { "@type": "ListItem", position: 3, name: "Athena", item: PAGE_URL },
      ],
    },
  ],
};

function SectionHead({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="mono-label text-xs text-[var(--accent)]">{label}</span>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-fg-muted">{text}</p>}
    </Reveal>
  );
}

export default function AthenaCasePage() {
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
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(60%_50%_at_75%_25%,rgba(29,91,191,0.22),transparent)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-fg-dim">
                <Link href="/" className="hover:text-fg">Início</Link>
                <span>/</span>
                <Link href="/#cases" className="hover:text-fg">Cases</Link>
              </nav>
              <Reveal y={12}>
                <span className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] text-[#bcd0ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Case · Athena
                </span>
                <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                  A operação inteira de uma agência de recrutamento{" "}
                  <span className="text-gradient">numa tela só.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
                  Desenvolvemos o Athena para agências que perdiam tempo pulando entre planilhas, WhatsApp, agenda e
                  sistema da prefeitura. Hoje, da captação do lead à nota fiscal emitida, tudo acontece no mesmo lugar.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-fg-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                  <a
                    href={whatsappLink(CTA_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine w-full rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
                  >
                    Quero um sistema assim
                  </a>
                  <a
                    href="#funcionalidades"
                    className="w-full rounded-full border border-[var(--panel-border-strong)] px-6 py-3 text-center text-sm font-medium text-fg transition-colors hover:bg-white/5 sm:w-auto"
                  >
                    Ver funcionando
                  </a>
                </div>
              </Reveal>
            </div>
            <AthenaHeroDevice />
          </div>
        </section>

        {/* Challenge */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              label="O desafio"
              title="Agência de recrutamento vive de volume e de prazo"
              text="E a operação estava espalhada: cada informação num lugar diferente, e o dono só descobria o resultado do mês no fechamento do contador."
            />
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {PAINS.map(({ Icon, text }, i) => (
                <Reveal key={text} delay={i * 0.06}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-[#ff6b6b]/20 bg-[#ff6b6b]/[0.04] p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff6b6b]/10 text-[#ff9b9b]">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="text-sm leading-snug text-fg-muted">{text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Solution: lifecycle */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              label="A solução"
              title="Desenhado em torno do ciclo real de uma vaga"
              text="Uma plataforma em nuvem, multiempresa, que acompanha cada vaga do primeiro contato até a nota fiscal."
            />
            <Reveal delay={0.1} className="glass mt-14 rounded-[2rem] p-5 sm:p-8">
              <VacancyCycle />
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section id="funcionalidades" className="section-divider scroll-mt-24 px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              label="Funcionalidades"
              title="Oito telas, uma operação inteira"
              text="Navegue pelo Athena funcionando. Clique em cada funcionalidade."
            />
            <div className="mt-14">
              <AthenaShowcase items={FEATURES} />
            </div>
            <p className="mono-label mt-4 text-center text-[10px] text-fg-dim">Simulação animada · dados ilustrativos</p>
          </div>
        </section>

        {/* Real screens */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead label="Telas reais" title="Em produção, não em apresentação" text="Capturas do sistema rodando, com dados de demonstração e dados pessoais ocultos." />
            <RealShotsGrid />
          </div>
        </section>

        {/* Behind the scenes */}
        <section className="section-divider px-4 py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHead label="Bastidores" title="O que não aparece numa tela, mas faz diferença" />
            <BackstageGrid />
          </div>
        </section>

        {/* Result */}
        <section className="section-divider px-4 py-28">
          <Reveal className="mx-auto max-w-4xl text-center">
            <span className="mono-label text-xs text-[var(--accent)]">Resultado</span>
            <p className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Menos operação, <span className="text-gradient">mais recrutamento.</span>
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              A equipe para de alimentar planilhas e volta a fazer o que gera receita: encontrar e colocar pessoas.
            </p>
            <div className="mt-12">
              <p className="mono-label text-[10px] text-fg-dim">Construído com</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {STACK.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-fg-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="px-4 pb-28 pt-4">
          <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--panel-border-strong)] bg-gradient-to-br from-[#10204a] via-[#0b1222] to-[#090d18] px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(91,140,255,0.4),transparent)]" />
            <h2 className="relative font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Sua operação também está espalhada em planilhas?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-fg-muted">
              A gente constrói o sistema sob medida para o seu negócio, como fez com o Athena.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(CTA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
                Fale com a EMC Soluções
              </a>
              <Link
                href="/#servicos"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-fg transition-colors hover:bg-white/5 sm:w-auto"
              >
                Ver todas as soluções
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
