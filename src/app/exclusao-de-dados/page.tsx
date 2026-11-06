import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_URL, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Exclusão de Dados",
  description:
    "Como solicitar à EMC Soluções a exclusão dos seus dados pessoais, conforme a LGPD.",
  alternates: { canonical: `${SITE_URL}/exclusao-de-dados` },
};

const EMAIL_SUBJECT = "Solicitação de exclusão de dados pessoais";
const EMAIL_BODY =
  "Olá, solicito a exclusão dos meus dados pessoais.\n\nNome completo:\nE-mail ou telefone usado no contato com a EMC:\nServiço ou sistema em que meus dados estão (se souber):\n";

export default function ExclusaoDeDadosPage() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

  return (
    <LegalPage title="Exclusão de Dados" updatedAt="6 de novembro de 2026">
      <p>
        Você pode pedir a qualquer momento que a <strong>EMC Soluções</strong> exclua os seus dados
        pessoais. Este é um direito garantido pelo artigo 18 da Lei Geral de Proteção de Dados (Lei nº
        13.709/2018, LGPD). Esta página explica como fazer o pedido e o que acontece depois.
      </p>

      <div>
        <h2>1. Como solicitar</h2>
        <p>Use um dos canais abaixo:</p>
        <ul>
          <li>
            <strong>E-mail:</strong> escreva para <a href={mailto}>{CONTACT_EMAIL}</a> com o assunto
            &ldquo;{EMAIL_SUBJECT}&rdquo;.
          </li>
          <li>
            <strong>WhatsApp:</strong>{" "}
            <a
              href={whatsappLink("Olá! Quero solicitar a exclusão dos meus dados pessoais.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {WHATSAPP_DISPLAY}
            </a>
            .
          </li>
        </ul>
        <p>No pedido, informe:</p>
        <ul>
          <li>Seu nome completo;</li>
          <li>O e-mail ou telefone que você usou no contato com a EMC;</li>
          <li>Se souber, o serviço ou sistema em que seus dados estão.</li>
        </ul>
      </div>

      <div>
        <h2>2. Confirmação de identidade</h2>
        <p>
          Para evitar que outra pessoa peça a exclusão dos seus dados, podemos pedir uma confirmação
          simples, como responder a partir do mesmo e-mail ou número de telefone cadastrado. Não pedimos
          senhas.
        </p>
      </div>

      <div>
        <h2>3. Prazo</h2>
        <p>
          Confirmamos o recebimento do pedido em até 1 dia útil e concluímos a exclusão em até 15 dias,
          prazo previsto no artigo 19 da LGPD. Ao final, você recebe uma confirmação pelo mesmo canal que
          usou para pedir.
        </p>
      </div>

      <div>
        <h2>4. O que é excluído</h2>
        <ul>
          <li>Dados enviados pelo formulário de contato do site (nome, e-mail, empresa e mensagem);</li>
          <li>Histórico de conversas com a EMC pelo WhatsApp e por e-mail;</li>
          <li>Dados de cadastro mantidos pela EMC em ferramentas de atendimento e relacionamento.</li>
        </ul>
      </div>

      <div>
        <h2>5. O que pode ser mantido</h2>
        <p>
          A LGPD permite manter alguns dados mesmo após o pedido, quando a lei exige. Nesses casos, os
          dados ficam guardados apenas pelo prazo obrigatório e não são usados para outra finalidade:
        </p>
        <ul>
          <li>Notas fiscais, contratos e registros financeiros exigidos pela legislação fiscal;</li>
          <li>Informações necessárias para defender direitos da EMC em processo judicial ou administrativo.</li>
        </ul>
        <p>Se algum dado precisar ser mantido, informamos qual e por quanto tempo na resposta ao seu pedido.</p>
      </div>

      <div>
        <h2>6. Dados em sistemas de clientes da EMC</h2>
        <p>
          A EMC desenvolve sistemas para outras empresas. Se seus dados estão em um desses sistemas (por
          exemplo, como candidato de uma agência ou filiado de uma entidade), quem decide sobre eles é a
          empresa que usa o sistema. Nesse caso, o pedido deve ser feito diretamente a ela. Se você nos
          procurar, encaminhamos o pedido à empresa responsável e avisamos você.
        </p>
      </div>

      <div>
        <h2>7. Cookies e dados de navegação</h2>
        <p>
          Os cookies de análise do site só são usados com o seu consentimento. Para removê-los, apague os
          cookies deste site nas configurações do seu navegador. Na próxima visita, o aviso de cookies
          aparece de novo e você pode recusar.
        </p>
      </div>

      <div>
        <h2>8. Mais informações</h2>
        <p>
          Para saber como coletamos e usamos seus dados, leia a nossa{" "}
          <Link href="/privacidade">Política de Privacidade</Link>.
        </p>
      </div>
    </LegalPage>
  );
}
