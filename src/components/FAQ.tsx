import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "O que a EMC Soluções faz?",
    answer:
      "A EMC Soluções oferece sistema de gestão, emissor de nota fiscal, API de WhatsApp e acesso a modelos de IA como GPT, Claude e GLM, além de desenvolver software sob medida e integrar sistemas para pequenas e médias empresas brasileiras. O objetivo é eliminar processos manuais e fazer as ferramentas do negócio conversarem entre si.",
  },
  {
    question: "Preciso contratar todas as soluções juntas?",
    answer:
      "Não. Cada solução funciona sozinha. Você pode começar por uma, como o emissor de nota fiscal ou a API de WhatsApp, e conectar as outras depois, quando fizer sentido para o negócio.",
  },
  {
    question: "A EMC atende negócios pequenos ou só grandes empresas?",
    answer:
      "A EMC Soluções foca em pequenas e médias empresas. Cada projeto é dimensionado para o porte e orçamento do negócio, sem exigir uma equipe de TI interna grande.",
  },
  {
    question: "Quanto custa um projeto com a EMC Soluções?",
    answer:
      "Depende do escopo. Depois de um diagnóstico gratuito, a EMC envia uma proposta com escopo e valor fechados antes de começar, sem surpresa no meio do projeto. Sistema de gestão, emissor de nota fiscal, API de WhatsApp e tokens de IA têm planos mensais conforme o volume de uso.",
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
    question: "Como funciona o fornecimento de tokens de IA?",
    answer:
      "Você recebe uma única chave de acesso para usar GPT, Claude, GLM e outros modelos de IA em qualquer sistema, com consumo e custo acompanhados em um painel e controle de acesso por chave. Assim a empresa não depende de um fornecedor só e enxerga quanto gasta com IA.",
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
