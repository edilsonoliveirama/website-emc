import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "O que a EMC Soluções faz?",
    answer:
      "A EMC Soluções desenvolve agentes de IA, cria software sob medida e integra sistemas como ERP, CRM e meios de pagamento para pequenas e médias empresas brasileiras. O objetivo é eliminar processos manuais e fazer diferentes ferramentas conversarem entre si automaticamente.",
  },
  {
    question: "A EMC atende negócios pequenos ou só grandes empresas?",
    answer:
      "A EMC Soluções foca em pequenas e médias empresas. Cada projeto é dimensionado para o porte e orçamento do negócio, sem exigir uma equipe de TI interna grande.",
  },
  {
    question: "Quanto custa um projeto com a EMC Soluções?",
    answer:
      "Os projetos são orçados sob medida. Como referência: automações e agentes de IA partem de R$ 1.500, integrações de sistemas partem de R$ 1.200, e desenvolvimento de sites ou sistemas parte de R$ 2.500. O valor final depende do escopo específico do projeto.",
  },
  {
    question: "É possível automatizar vendas pelo WhatsApp com a EMC?",
    answer:
      "Sim. A EMC constrói agentes de IA que conduzem toda a venda pelo WhatsApp: respondem dúvidas, enviam fotos e valores de produtos, geram cobrança via Pix e confirmam o pagamento, sem intervenção manual.",
  },
  {
    question: "A EMC integra sistemas que já uso, como ERP ou CRM?",
    answer:
      "Sim. A EMC conecta ERP, CRM, planilhas e outras ferramentas via API, sincronizando dados automaticamente e eliminando retrabalho de digitação manual entre sistemas.",
  },
  {
    question: "O que é o API Gateway LLM da EMC?",
    answer:
      "É um endpoint único que dá inteligência artificial a qualquer sistema do cliente, unificando múltiplos provedores de modelo de IA, com billing centralizado e controle de acesso por chave — sem depender de um único fornecedor de IA.",
  },
  {
    question: "Como entro em contato com a EMC Soluções?",
    answer:
      "O canal preferencial é o WhatsApp, com resposta em até 1 dia útil e diagnóstico inicial gratuito. Também é possível enviar uma mensagem pelo formulário de contato no site.",
  },
];

export const faqJsonLd = {
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section id="perguntas-frequentes" aria-labelledby="faq-heading" className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="mono-label text-xs text-[var(--accent)]">Dúvidas</span>
          <h2 id="faq-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-fg-muted">
            Respostas diretas sobre como a EMC trabalha, quanto custa e o que
            entregamos.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((f) => (
            <details
              key={f.question}
              className="glass group rounded-xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-base font-semibold marker:content-none">
                {f.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-fg-dim transition-transform duration-300 group-open:rotate-180"
                  strokeWidth={2}
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
