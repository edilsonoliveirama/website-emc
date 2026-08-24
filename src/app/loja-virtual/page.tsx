import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Store,
  Palette,
  CreditCard,
  Truck,
  MessageCircle,
  CheckCircle2,
  ClipboardList,
  Tags,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { whatsappLink, SITE_URL } from "@/lib/contact";

const TITLE = "Loja Virtual Nuvemshop — Criação e Configuração | EMC Soluções";
const DESCRIPTION =
  "A EMC Soluções é parceira oficial Nuvemshop. Criamos sua loja virtual completa e pronta para vender: layout, pagamento, frete e integração com WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/loja-virtual` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/loja-virtual`,
  },
};

const STEPS = [
  {
    Icon: ClipboardList,
    title: "Coleta de dados",
    desc: "Levantamos as informações do seu negócio: produtos, marca, formas de pagamento e como você quer vender.",
  },
  {
    Icon: Palette,
    title: "Identidade da marca",
    desc: "Layout com a cara do seu negócio, aplicado à loja para transmitir confiança desde o primeiro clique.",
  },
  {
    Icon: Tags,
    title: "Categorias de produto",
    desc: "Catálogo organizado por categoria e fichas de produto pensadas para converter visita em compra.",
  },
  {
    Icon: CreditCard,
    title: "Pagamento e sistemas",
    desc: "Pix, cartão e boleto integrados e testados, com frete calculado automaticamente por região.",
  },
];

const BENEFITS = [
  "Loja Nuvemshop configurada do zero até o primeiro pedido — sem enrolação técnica da sua parte",
  "Pix, cartão e boleto funcionando corretamente desde o primeiro dia",
  "Frete calculado automaticamente por região, sem planilha manual",
  "Base pronta para conectar IA de atendimento e vendas pelo WhatsApp",
];

const FAQS = [
  {
    question: "A EMC é parceira oficial da Nuvemshop?",
    answer:
      "Sim. A EMC Soluções é parceira Nuvemshop e configura lojas na plataforma seguindo as melhores práticas de conversão e usabilidade — a mesma tecnologia usada por milhares de lojas no Brasil.",
  },
  {
    question: "Preciso já ter os produtos cadastrados?",
    answer:
      "Não. Organizamos catálogo, categorias e fichas de produto com você durante a configuração da loja, sem exigir que já esteja tudo pronto.",
  },
  {
    question: "A loja pode se integrar com atendimento por WhatsApp?",
    answer:
      "Sim, e essa é a maior vantagem: depois da loja pronta, a EMC também implementa agentes de IA que atendem, mostram produto e vendem direto pelo WhatsApp, conectados à sua Nuvemshop.",
  },
  {
    question: "Quanto tempo leva para a loja ficar pronta?",
    answer:
      "Depende do volume de produtos e das integrações necessárias. O prazo exato sai logo após o diagnóstico inicial, que é gratuito.",
  },
  {
    question: "Quanto custa criar a loja e quanto é a mensalidade?",
    answer:
      "A criação da loja — coleta de dados, identidade da marca, categorias de produto e integração de sistemas e pagamento — custa R$ 899 em pagamento único. A hospedagem na Nuvemshop é à parte, com planos a partir de R$ 119/mês.",
  },
];

export default function LojaVirtualPage() {
  const ctaMessage = "Olá! Quero criar minha loja virtual na Nuvemshop com a EMC.";

  return (
    <>
      <div className="bg-scene" />
      <header className="relative z-10 px-4 pt-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_2px_var(--accent)]" />
            EMC <span className="text-fg-muted font-medium">Soluções</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="px-4 pt-16 pb-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] text-[#bcd0ff]">
                <Store className="h-3 w-3" strokeWidth={2} />
                Parceiro oficial Nuvemshop
              </span>

              <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                Sua loja virtual{" "}
                <span className="text-gradient">pronta para vender.</span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
                Chega de perder venda por não ter loja online. A EMC é
                parceira oficial Nuvemshop e entrega sua loja completa —
                layout, produtos, pagamento e frete — pronta para vender
                desde o primeiro dia.
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <a
                  href={whatsappLink(ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#06080f] transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
                >
                  Quero minha loja na Nuvemshop
                </a>
                <a
                  href="#como-funciona"
                  className="w-full rounded-full border border-[var(--panel-border-strong)] px-6 py-3 text-sm font-medium text-fg transition-colors hover:bg-white/5 sm:w-auto"
                >
                  Ver como funciona
                </a>
              </div>
            </div>

            <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-[#f4f2ee] sm:aspect-[4/3] lg:aspect-square">
              <Image
                src="/loja-virtual/hero.webp"
                alt="Cliente comprando pelo celular em uma loja virtual Nuvemshop"
                fill
                priority
                className="object-contain p-6"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
          </div>
        </section>

        {/* Steps */}
        <section id="como-funciona" className="section-divider px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-xl text-center">
              <span className="mono-label text-xs text-[var(--accent)]">Como funciona</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                Da configuração ao primeiro pedido
              </h2>
              <p className="mt-4 text-fg-muted">
                Sem curva de aprendizado, sem tutorial no YouTube às 23h.
                A EMC cuida da parte técnica, você foca no seu produto.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <div key={step.title} className="glass flex flex-col rounded-xl p-7">
                  <span className="mono-label text-[11px] text-fg-dim">0{i + 1}</span>
                  <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--panel-border-strong)] bg-[var(--accent-soft)]">
                    <step.Icon className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-divider px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="glass-strong rounded-[2rem] p-8 sm:p-12">
              <span className="mono-label text-xs text-[var(--accent)]">O que entregamos</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
                Tudo que sua loja precisa para ir ao ar
              </h2>

              <ul className="mt-8 space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-mint)]" strokeWidth={2} />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-[var(--panel-border)] bg-white/[0.02] p-4">
                <Truck className="h-5 w-5 shrink-0 text-fg-dim" strokeWidth={1.6} />
                <p className="text-xs leading-relaxed text-fg-dim">
                  Depois da loja pronta, a EMC também integra atendimento via
                  IA no WhatsApp — do primeiro contato ao pagamento
                  confirmado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership */}
        <section className="section-divider px-4 py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative order-2 aspect-square w-full overflow-hidden rounded-[2rem] bg-[#f4f2ee] lg:order-1">
              <Image
                src="/loja-virtual/integracoes.webp"
                alt="Ecossistema de integrações da Nuvemshop: pagamento, frete, avaliações e CRM"
                fill
                className="object-contain p-8"
                sizes="(min-width: 1024px) 35vw, 90vw"
              />
            </div>

            <div className="order-1 lg:order-2">
              <span className="mono-label inline-flex items-center gap-2 text-xs text-[var(--accent)]">
                <ShieldCheck className="h-3 w-3" strokeWidth={2} />
                O que é ser parceiro Nuvemshop
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
                Não é qualquer um que configura, é quem entende da plataforma
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                A EMC é parceira oficial Nuvemshop: implementamos lojas
                seguindo o padrão validado pela própria plataforma, com
                acesso às ferramentas certas de pagamento, frete,
                avaliações e CRM — o mesmo ecossistema usado por milhares
                de lojas no Brasil.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Na prática, isso significa uma loja configurada do jeito
                certo desde o início: sem erro de integração, sem retrabalho
                e sem você precisar aprender a plataforma sozinho.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-divider px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto max-w-xl text-center">
              <span className="mono-label text-xs text-[var(--accent)]">Investimento</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                Preço claro, sem letra miúda
              </h2>
            </div>

            <div className="glass-strong mt-10 rounded-[2rem] p-8 sm:p-12">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <span className="mono-label text-[11px] text-fg-dim">Criação da loja</span>
                  <div className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-gradient">
                    R$ 899
                    <span className="ml-1 text-sm font-normal text-fg-muted">pagamento único</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Coleta de dados, identidade da marca, criação de
                    categorias de produtos e integração de sistemas e
                    pagamento — até o ponto de loja funcional.
                  </p>
                </div>

                <div className="border-t border-[var(--panel-border)] pt-8 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <span className="mono-label text-[11px] text-fg-dim">Hospedagem da loja</span>
                  <div className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--accent-amber)]">
                    a partir de R$ 119
                    <span className="ml-1 text-sm font-normal text-fg-muted">/mês</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Mensalidade da Nuvemshop conforme o plano escolhido,
                    para manter sua loja no ar, segura e recebendo pedidos.
                  </p>
                </div>
              </div>

              <a
                href={whatsappLink(ctaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#06080f] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                Quero criar minha loja
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-divider px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto max-w-xl text-center">
              <span className="mono-label text-xs text-[var(--accent)]">Dúvidas</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                Perguntas frequentes
              </h2>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              {FAQS.map((f) => (
                <details
                  key={f.question}
                  className="glass group rounded-xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] text-base font-semibold marker:content-none">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
              Cada dia sem loja é venda ficando na mesa.
            </h2>
            <p className="mt-3 text-fg-muted">
              Diagnóstico inicial gratuito, resposta em até 1 dia útil.
              Fale agora e comece a vender esta semana.
            </p>
            <a
              href={whatsappLink(ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group mt-6 inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-[var(--panel-border-strong)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
              </span>
              Falar com a EMC no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
