import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site institucional da EMC Soluções.",
  alternates: { canonical: `${SITE_URL}/termos` },
};

export default function TermosPage() {
  return (
    <LegalPage title="Termos de Uso" updatedAt="22 de agosto de 2026">
      <p>
        Estes Termos de Uso regem o acesso e uso do site institucional da{" "}
        <strong>EMC Soluções</strong>. Ao acessar este site, você concorda com
        os termos descritos abaixo.
      </p>

      <div>
        <h2>1. Sobre este site</h2>
        <p>
          Este site tem finalidade institucional: apresentar os serviços da
          EMC Soluções (IA aplicada, desenvolvimento de software,
          integração de sistemas e API Gateway LLM) e viabilizar contato
          comercial. Não constitui plataforma de venda direta ou prestação
          automatizada de serviço.
        </p>
      </div>

      <div>
        <h2>2. Uso permitido</h2>
        <p>Ao usar este site, você concorda em não:</p>
        <ul>
          <li>Utilizá-lo para fins ilegais ou não autorizados;</li>
          <li>Tentar acessar áreas restritas ou comprometer sua segurança;</li>
          <li>Reproduzir, copiar ou redistribuir o conteúdo sem autorização prévia;</li>
          <li>Utilizar meios automatizados (bots, scraping) que sobrecarreguem ou prejudiquem o funcionamento do site, exceto crawlers de indexação e assistentes de IA operando de forma padrão e não abusiva.</li>
        </ul>
      </div>

      <div>
        <h2>3. Propriedade intelectual</h2>
        <p>
          Textos, layout, identidade visual e demais conteúdos deste site
          pertencem à EMC Soluções, salvo indicação em contrário, e são
          protegidos pela legislação de direitos autorais e propriedade
          intelectual aplicável.
        </p>
      </div>

      <div>
        <h2>4. Orçamentos e propostas</h2>
        <p>
          Valores exibidos no site (como faixas de investimento) são
          referenciais e não constituem proposta comercial vinculante. Todo
          projeto é orçado individualmente após diagnóstico, com valores e
          escopo confirmados por escrito antes do início dos trabalhos.
        </p>
      </div>

      <div>
        <h2>5. Canais de contato</h2>
        <p>
          O contato comercial ocorre por WhatsApp, e-mail ou formulário do
          site. A EMC busca responder em até 1 dia útil, mas não garante
          disponibilidade ininterrupta desses canais.
        </p>
      </div>

      <div>
        <h2>6. Limitação de responsabilidade</h2>
        <p>
          O site é fornecido &ldquo;como está&rdquo;. A EMC envida esforços
          razoáveis para manter as informações atualizadas e o site
          disponível, mas não garante ausência de erros, interrupções ou
          disponibilidade contínua.
        </p>
      </div>

      <div>
        <h2>7. Links externos</h2>
        <p>
          Este site pode conter links para serviços de terceiros (como
          WhatsApp). A EMC não se responsabiliza pelo conteúdo ou práticas
          de privacidade desses serviços externos.
        </p>
      </div>

      <div>
        <h2>8. Alterações destes termos</h2>
        <p>
          Estes termos podem ser atualizados periodicamente. A data da
          última atualização está indicada no topo desta página. O uso
          continuado do site após alterações implica aceite dos novos
          termos.
        </p>
      </div>

      <div>
        <h2>9. Legislação aplicável</h2>
        <p>
          Estes termos são regidos pelas leis da República Federativa do
          Brasil.
        </p>
      </div>

      <div>
        <h2>10. Contato</h2>
        <p>
          Dúvidas sobre estes termos podem ser enviadas para{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
