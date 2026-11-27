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
      "Depende do escopo. Depois de um diagnóstico gratuito, a EMC envia uma proposta com escopo e valor fechados antes de começar, sem surpresa no meio do projeto. Os produtos por assinatura têm planos mensais conforme o volume de uso; o sistema de gestão começa em R$ 499 por mês, sem fidelidade.",
  },
  {
    question: "Em quanto tempo fica pronto?",
    answer:
      "Depende do que for preciso integrar. O prazo vai por escrito na proposta, junto com o valor, e a entrega acontece em etapas: você começa a usar partes do sistema antes do fim do projeto.",
  },
  {
    question: "E se eu não gostar do resultado?",
    answer:
      "Cada etapa é testada e aprovada por você antes da próxima, então os ajustes acontecem durante o projeto, não no final. Nas assinaturas não há fidelidade: se não fizer sentido, você cancela.",
  },
  {
    question: "Meus dados e os dos meus clientes ficam seguros?",
    answer:
      "Sim. A EMC é fundada por um especialista em segurança e nuvem com certificações Microsoft, e aplica nos projetos de pequenas empresas as mesmas práticas usadas em telecom e no setor público: acesso controlado, registro de atividades e backups.",
  },
  {
    question: "É possível automatizar vendas pelo WhatsApp com a EMC?",
    answer:
      "Sim. A EMC constrói agentes de IA que conduzem toda a venda pelo WhatsApp: respondem dúvidas, fazem as perguntas padrão, agendam, enviam fotos e valores de produtos, geram cobrança via Pix e confirmam o pagamento. A equipe só entra quando o cliente já disse o que precisa, como no case da Festou SLZ.",
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
              className="glass group rounded-[14px] px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
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
