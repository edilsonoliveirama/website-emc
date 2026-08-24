import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a EMC Soluções coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: `${SITE_URL}/privacidade` },
};

export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade" updatedAt="22 de agosto de 2026">
      <p>
        Esta Política de Privacidade descreve como a <strong>EMC Soluções</strong>{" "}
        {/* TODO: incluir razão social e CNPJ reais */}
        (&ldquo;EMC&rdquo;, &ldquo;nós&rdquo;) coleta, usa, armazena e protege dados
        pessoais de visitantes e clientes deste site, em conformidade com a
        Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </p>

      <div>
        <h2>1. Quais dados coletamos</h2>
        <p>Coletamos dados fornecidos diretamente por você, como:</p>
        <ul>
          <li>Nome, e-mail e empresa, quando enviados pelo formulário de contato;</li>
          <li>Número de telefone e conteúdo da conversa, quando você inicia contato via WhatsApp;</li>
          <li>Dados de navegação (cookies, páginas visitadas, dispositivo), conforme detalhado na seção de cookies abaixo.</li>
        </ul>
      </div>

      <div>
        <h2>2. Para que usamos seus dados</h2>
        <p>Usamos os dados coletados para:</p>
        <ul>
          <li>Responder solicitações de contato e orçamento;</li>
          <li>Prestar os serviços contratados e dar suporte técnico;</li>
          <li>Melhorar a experiência de navegação no site;</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>
      </div>

      <div>
        <h2>3. Base legal</h2>
        <p>
          O tratamento de dados pessoais realizado pela EMC se baseia no
          consentimento do titular, na execução de contrato ou procedimentos
          preliminares a ele, e no legítimo interesse da EMC em responder
          contatos comerciais, conforme os artigos 7º e 10 da LGPD.
        </p>
      </div>

      <div>
        <h2>4. Cookies</h2>
        <p>
          Este site utiliza cookies para funcionamento básico e para entender
          como visitantes usam o site. Você pode aceitar ou recusar cookies
          não essenciais através do aviso exibido na primeira visita.
          Recusar não afeta seu acesso ao conteúdo do site.
        </p>
      </div>

      <div>
        <h2>5. Compartilhamento de dados</h2>
        <p>
          Não vendemos dados pessoais. Podemos compartilhar dados com
          prestadores de serviço que apoiam nossa operação (como provedores
          de hospedagem e ferramentas de comunicação), sempre limitado ao
          necessário para a finalidade contratada, e mediante obrigações
          contratuais de confidencialidade.
        </p>
      </div>

      <div>
        <h2>6. Retenção de dados</h2>
        <p>
          Mantemos seus dados pelo tempo necessário para cumprir as
          finalidades descritas nesta política, ou pelo prazo exigido por
          obrigação legal, o que for maior. Após esse período, os dados são
          excluídos ou anonimizados.
        </p>
      </div>

      <div>
        <h2>7. Seus direitos como titular</h2>
        <p>Conforme o artigo 18 da LGPD, você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento de seus dados;</li>
          <li>Acessar, corrigir ou atualizar seus dados;</li>
          <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Solicitar a portabilidade dos dados;</li>
          <li>Revogar o consentimento a qualquer momento;</li>
          <li>Solicitar informações sobre com quem compartilhamos seus dados.</li>
        </ul>
        <p>
          Para exercer qualquer desses direitos, entre em contato pelo e-mail{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>

      <div>
        <h2>8. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger
          seus dados contra acesso não autorizado, perda, alteração ou
          divulgação indevida.
        </p>
      </div>

      <div>
        <h2>9. Alterações desta política</h2>
        <p>
          Esta política pode ser atualizada periodicamente. A data da última
          atualização está indicada no topo desta página.
        </p>
      </div>

      <div>
        <h2>10. Contato</h2>
        <p>
          Dúvidas sobre esta política ou sobre o tratamento de seus dados
          podem ser enviadas para{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
