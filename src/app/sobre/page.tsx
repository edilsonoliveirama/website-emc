import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, MessageCircle, MapPin, ArrowUpRight, Cloud, GitBranch, ShieldCheck, Activity, Wallet, Server } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import { SITE_URL, whatsappLink } from "@/lib/contact";
import { FOUNDER, FOUNDER_STATS, EXPERIENCE_INTRO, EXPERIENCE_AREAS, SECTORS, CERTIFICATIONS } from "@/lib/founder";

const AREA_ICONS = {
  cloud: Cloud,
  automation: GitBranch,
  security: ShieldCheck,
  monitoring: Activity,
  costs: Wallet,
  infra: Server,
};

const PATH = "/sobre";
const PAGE_URL = `${SITE_URL}${PATH}`;
const TITLE = `${FOUNDER.name}, fundador da EMC Soluções | Experiência e certificações`;
const DESCRIPTION =
  "Conheça quem está por trás da EMC Soluções: mais de uma década em nuvem, DevSecOps e infraestrutura de grandes empresas, com certificações Microsoft e Oracle.";
const CTA_MESSAGE = "Olá! Vi a experiência do Edilson no site e quero conversar sobre um projeto.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "profile", title: TITLE, description: DESCRIPTION, url: PAGE_URL },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${PAGE_URL}#person` },
    },
    {
      "@type": "Person",
      "@id": `${PAGE_URL}#person`,
      name: FOUNDER.name,
      jobTitle: FOUNDER.headline,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      address: { "@type": "PostalAddress", addressLocality: "São Luís", addressRegion: "MA", addressCountry: "BR" },
      sameAs: [FOUNDER.linkedin],
      knowsAbout: EXPERIENCE_AREAS.map((e) => e.title),
      hasCredential: CERTIFICATIONS.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.name,
        credentialCategory: "certification",
        recognizedBy: { "@type": "Organization", name: c.issuer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Sobre", item: PAGE_URL },
      ],
    },
  ],
};

function SectionHead({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <span className="mono-label text-xs text-[var(--accent)]">{label}</span>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-fg-muted">{text}</p>}
    </Reveal>
  );
}

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-scene" />
      <Header />

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-24 pt-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_50%_at_30%_20%,rgba(41,120,237,0.16),transparent)]" />
          <div className="relative mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-fg-dim">
              <Link href="/" className="hover:text-fg">Início</Link>
              <span>/</span>
              <span className="text-fg-muted">Sobre</span>
            </nav>

            <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <Reveal>
                <span className="mono-label text-xs text-[var(--accent)]">{FOUNDER.role}</span>
                <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
                  {FOUNDER.name}
                </h1>
                <p className="mt-3 text-lg text-fg">{FOUNDER.headline}</p>
                {FOUNDER.bio.map((p) => (
                  <p key={p} className="mt-5 max-w-2xl leading-relaxed text-fg-muted">
                    {p}
                  </p>
                ))}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={whatsappLink(CTA_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--cta)] hover:bg-[var(--cta-deep)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Conversar sobre um projeto
                  </a>
                  <a
                    href={FOUNDER.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-sm text-fg-dim">
                    <MapPin className="h-3.5 w-3.5" />
                    {FOUNDER.location}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="glass-strong flex flex-col gap-5 rounded-[14px] p-7">
                {FOUNDER_STATS.map((s) => (
                  <div key={s.label} className="border-b border-[var(--panel-border)] pb-5 last:border-0 last:pb-0">
                    <div className="font-[family-name:var(--font-display)] text-4xl font-semibold text-gradient">
                      {s.value}
                      {s.suffix}
                    </div>
                    <div className="mt-1 text-sm text-fg-muted">{s.label}</div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* Experiência */}
        <section className="section-divider px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <SectionHead label="Experiência" title="Experiência de grandes operações, aplicada ao seu negócio" />
              <Reveal delay={0.1}>
                {EXPERIENCE_INTRO.map((p) => (
                  <p key={p} className="mb-4 leading-relaxed text-fg-muted last:mb-0">
                    {p}
                  </p>
                ))}
                <ul className="mt-6 flex flex-wrap gap-2">
                  {SECTORS.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-[var(--panel-border)] px-3 py-1 text-xs text-fg-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {EXPERIENCE_AREAS.map((area, i) => {
                const Icon = AREA_ICONS[area.icon];
                return (
                  <Reveal key={area.title} delay={Math.min(i * 0.05, 0.25)} className="glass flex h-full flex-col rounded-[14px] p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold">{area.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{area.summary}</p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {area.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-mint)]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mono-label mt-auto pt-5 text-[0.68rem] leading-relaxed text-fg-dim">{area.tools.join(" · ")}</div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certificações */}
        <section className="section-divider px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              label="Certificações"
              title="Conhecimento validado pelos fabricantes"
              text="Certificações obtidas junto à Microsoft e à Oracle."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CERTIFICATIONS.map((c, i) => (
                <Reveal key={c.name} delay={Math.min(i * 0.05, 0.25)} className="glass flex h-full items-start gap-4 rounded-[14px] p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[var(--accent-mint-soft)] text-[var(--accent-mint)]">
                    <BadgeCheck className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug">{c.name}</h3>
                    <p className="mt-1 text-sm text-fg-muted">
                      {c.issuer}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-28 pt-8">
          <Reveal className="glass-strong mx-auto max-w-4xl rounded-[22px] p-10 text-center sm:p-14">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Leve essa experiência para o seu negócio
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fg-muted">
              O diagnóstico é gratuito e leva 20 minutos no WhatsApp. Você fala direto com quem vai desenhar a solução.
            </p>
            <a
              href={whatsappLink(CTA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--cta)] hover:bg-[var(--cta-deep)] px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </Reveal>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
