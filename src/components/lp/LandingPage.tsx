import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  XCircle,
  MessagesSquare,
  FileSignature,
  Layers,
  LifeBuoy,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import Footer from "@/components/Footer";
import StickyCta from "./StickyCta";
import { whatsappLink } from "@/lib/contact";
import { FOUNDER, FOUNDER_STATS } from "@/lib/founder";
import BrandLogo from "@/components/BrandLogo";

export type LpItem = { Icon: LucideIcon; title: string; desc: string };

export type LandingConfig = {
  badge: string;
  BadgeIcon: LucideIcon;
  titleStart: string;
  titleHighlight: string;
  subtitle: string;
  ctaLabel: string;
  /** Pre-filled WhatsApp text. Keep it unique per page so the team knows which ad the lead came from. */
  ctaMessage: string;
  guarantees: string[];
  visual: ReactNode;
  pains: { title: string; items: string[] };
  features: { tag: string; title: string; subtitle: string; items: LpItem[] };
  demo?: ReactNode;
  segments?: { title: string; subtitle: string; items: LpItem[] };
  offer: {
    title: string;
    subtitle: string;
    /** Optional price anchor, e.g. { prefix: "A partir de", value: "R$ 499", period: "/mês" }. */
    price?: { prefix: string; value: string; period: string };
    items: string[];
    note: string;
  };
  faqs: { question: string; answer: string }[];
  finalTitle: string;
  finalText: string;
};

const STEPS: LpItem[] = [
  {
    Icon: MessagesSquare,
    title: "Diagnóstico gratuito",
    desc: "Cerca de 20 minutos de conversa pelo WhatsApp para entender como seu negócio funciona hoje.",
  },
  {
    Icon: FileSignature,
    title: "Proposta com preço fechado",
    desc: "Escopo, prazo e valor por escrito antes de qualquer linha de código. Sem surpresa no meio do caminho.",
  },
  {
    Icon: Layers,
    title: "Entrega em etapas",
    desc: "Você testa cada parte antes da próxima. Ajustes acontecem durante o projeto, não depois.",
  },
  {
    Icon: LifeBuoy,
    title: "Suporte de quem fez",
    desc: "Depois de entregue, quem atende é quem desenvolveu. Sem fila de call center.",
  },
];

function SectionHeading({ tag, title, children }: { tag: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="mono-label text-xs text-[var(--accent)]">{tag}</span>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-fg-muted">{children}</p>}
    </div>
  );
}

function ItemGrid({ items, cols = "lg:grid-cols-3" }: { items: LpItem[]; cols?: string }) {
  return (
    <div className={`mt-12 grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map((it) => (
        <div key={it.title} className="glass flex flex-col rounded-[14px] p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--panel-border-strong)] bg-[var(--accent-soft)]">
            <it.Icon className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.6} />
          </div>
          <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold">{it.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

function PrimaryCta({ href, label, cta }: { href: string; label: string; cta: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={cta}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--cta)] hover:bg-[var(--cta-deep)] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
    </a>
  );
}

/**
 * Landing page for paid traffic (Meta Ads): one offer, one action (WhatsApp),
 * no site navigation to leak the visitor. Pages using it should be noindex.
 */
export default function LandingPage({ c }: { c: LandingConfig }) {
  const href = whatsappLink(c.ctaMessage);

  return (
    <>
      <div className="bg-scene" />
      <header className="relative z-10 px-4 pt-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
          >
            <BrandLogo height={36} priority />
          </Link>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`${c.ctaLabel} (topo)`}
            className="hidden items-center gap-2 rounded-md border border-[var(--panel-border-strong)] px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-white/5 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4 text-whatsapp" strokeWidth={2} />
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <main className="relative z-10 flex-1 pb-20 sm:pb-0">
        {/* Hero */}
        <section className="px-4 pb-20 pt-12 sm:pt-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] text-[var(--accent)]">
                <c.BadgeIcon className="h-3 w-3" strokeWidth={2} />
                {c.badge}
              </span>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[2.3rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                {c.titleStart} <span className="text-gradient">{c.titleHighlight}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">{c.subtitle}</p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <PrimaryCta href={href} label={c.ctaLabel} cta={`${c.ctaLabel} (hero)`} />
                <a
                  href="#como-funciona"
                  className="inline-flex w-full items-center justify-center rounded-md border border-[var(--panel-border-strong)] px-7 py-3.5 text-[15px] font-medium text-fg transition-colors hover:bg-white/5 sm:w-auto"
                >
                  Ver como funciona
                </a>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                {c.guarantees.map((g) => (
                  <li key={g} className="flex items-center gap-1.5 text-sm text-fg-muted">
                    <Check className="h-4 w-4 text-[var(--accent-mint)]" strokeWidth={2.4} />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div>{c.visual}</div>
          </div>
        </section>

        {/* Pains */}
        <section className="section-divider px-4 py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading tag="O problema" title={c.pains.title} />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {c.pains.items.map((p) => (
                <li key={p} className="glass flex items-start gap-3 rounded-[14px] p-5 text-sm leading-relaxed text-fg-muted">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-amber)]" strokeWidth={2} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features */}
        <section id="como-funciona" className="section-divider px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading tag={c.features.tag} title={c.features.title}>
              {c.features.subtitle}
            </SectionHeading>
            <ItemGrid items={c.features.items} />
          </div>
        </section>

        {c.demo}

        {c.segments && (
          <section className="section-divider px-4 py-24">
            <div className="mx-auto max-w-6xl">
              <SectionHeading tag="Para quem é" title={c.segments.title}>
                {c.segments.subtitle}
              </SectionHeading>
              <ItemGrid items={c.segments.items} cols="lg:grid-cols-4" />
            </div>
          </section>
        )}

        {/* How we work */}
        <section className="section-divider px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading tag="Como trabalhamos" title="Do primeiro contato ao sistema funcionando">
              Você sabe exatamente o que vai receber e quanto vai pagar antes de começar.
            </SectionHeading>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <div key={s.title} className="glass flex flex-col rounded-[14px] p-7">
                  <span className="mono-label text-[11px] text-fg-dim">0{i + 1}</span>
                  <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--panel-border-strong)] bg-[var(--accent-soft)]">
                    <s.Icon className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offer */}
        <section className="section-divider px-4 py-24">
          <div className="mx-auto max-w-3xl">
            <div className="glass-strong rounded-[22px] p-8 sm:p-12">
              <span className="mono-label text-xs text-[var(--accent)]">Investimento</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                {c.offer.title}
              </h2>
              <p className="mt-4 text-fg-muted">{c.offer.subtitle}</p>
              {c.offer.price && (
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm text-fg-muted">{c.offer.price.prefix}</span>
                  <span className="font-[family-name:var(--font-display)] text-5xl font-semibold text-gradient">
                    {c.offer.price.value}
                  </span>
                  <span className="text-sm text-fg-muted">{c.offer.price.period}</span>
                </div>
              )}
              <ul className="mt-8 space-y-4">
                {c.offer.items.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-mint)]" strokeWidth={2} />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-fg-dim">{c.offer.note}</p>
              <div className="mt-8">
                <PrimaryCta href={href} label={c.ctaLabel} cta={`${c.ctaLabel} (investimento)`} />
              </div>
            </div>
          </div>
        </section>

        {/* Who builds it */}
        <section className="section-divider px-4 py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="mono-label inline-flex items-center gap-2 text-xs text-[var(--accent)]">
                <ShieldCheck className="h-3 w-3" strokeWidth={2} />
                Quem faz
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
                Experiência de grande empresa, atendimento de perto
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                A EMC Soluções é de São Luís e foi fundada por {FOUNDER.name}, {FOUNDER.headline.charAt(0).toLowerCase() + FOUNDER.headline.slice(1)}.{" "}
                {FOUNDER.bio[1]}
              </p>
              <Link href="/sobre" className="mt-4 inline-block text-sm text-[var(--accent)] underline-offset-2 hover:underline">
                Conheça a EMC →
              </Link>
            </div>
            <div className="glass grid gap-5 rounded-[22px] p-8">
              {FOUNDER_STATS.map((s) => (
                <div key={s.label} className="border-b border-[var(--panel-border)] pb-5 last:border-0 last:pb-0">
                  <div className="font-[family-name:var(--font-display)] text-3xl font-semibold text-gradient">
                    {s.value}
                    {s.suffix}
                  </div>
                  <div className="mt-1 text-sm text-fg-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-divider px-4 py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading tag="Dúvidas" title="Perguntas frequentes" />
            <div className="mt-10 flex flex-col gap-3">
              {c.faqs.map((f) => (
                <details
                  key={f.question}
                  className="glass group rounded-[14px] px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-base font-semibold">
                    {f.question}
                    <span className="text-fg-dim transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-24">
          <div className="glass-strong mx-auto max-w-3xl rounded-[22px] p-8 text-center sm:p-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
              {c.finalTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-fg-muted">{c.finalText}</p>
            <div className="mt-7 flex justify-center">
              <PrimaryCta href={href} label={c.ctaLabel} cta={`${c.ctaLabel} (final)`} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCta href={href} label={c.ctaLabel} />
    </>
  );
}
