import type { Metadata } from "next";
import {
  Bot,
  Clock,
  QrCode,
  UserRound,
  Plug,
  BellRing,
  Stethoscope,
  UtensilsCrossed,
  Store,
  Wrench,
} from "lucide-react";
import LandingPage, { type LandingConfig } from "@/components/lp/LandingPage";
import ChatMockup from "@/components/lp/ChatMockup";
import SalesFlow from "@/components/SalesFlow";
import { SITE_URL } from "@/lib/contact";

const PATH = "/lp/atendimento-ia-whatsapp";
const TITLE = "Atendimento com IA no WhatsApp, 24 horas";
const DESCRIPTION =
  "Um assistente de IA que responde seus clientes no WhatsApp na hora, tira dúvidas, envia o Pix e chama sua equipe quando precisa. Diagnóstico gratuito.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Página de tráfego pago: fora do Google para não competir com a home.
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}` },
};

const config: LandingConfig = {
  badge: "Atendimento com IA no WhatsApp",
  BadgeIcon: Bot,
  titleStart: "Seu WhatsApp respondendo, vendendo e cobrando",
  titleHighlight: "24 horas por dia.",
  subtitle:
    "Um assistente de IA que responde na hora, tira dúvidas, informa preço e disponibilidade, envia o Pix e chama sua equipe quando o assunto pede uma pessoa. Configurado para o jeito do seu negócio.",
  ctaLabel: "Quero meu diagnóstico gratuito",
  ctaMessage: "Olá! Vi a página de atendimento com IA no WhatsApp e quero meu diagnóstico gratuito.",
  guarantees: ["Diagnóstico gratuito", "Preço fechado antes de começar", "Sem fidelidade"],
  visual: <ChatMockup />,
  pains: {
    title: "Quantos clientes estão ficando sem resposta no seu WhatsApp?",
    items: [
      "O cliente chama à noite ou no fim de semana e acaba comprando no concorrente que respondeu primeiro.",
      "Sua equipe passa o dia respondendo as mesmas perguntas: preço, horário, endereço, se tem disponível.",
      "Pedido anotado errado, cobrança esquecida e cliente que some depois do orçamento.",
      "Você não sabe quantas conversas viraram venda e quantas ficaram pelo caminho.",
    ],
  },
  features: {
    tag: "O que a IA faz",
    title: "Um atendente que não dorme, não esquece e não perde a paciência",
    subtitle: "Treinado com as informações do seu negócio e ligado aos seus sistemas.",
    items: [
      { Icon: Clock, title: "Responde na hora, 24h", desc: "Nenhuma mensagem fica sem resposta, nem às 23h de domingo." },
      { Icon: QrCode, title: "Vende e cobra com Pix", desc: "Monta o pedido, gera o Pix e confirma quando o pagamento cai." },
      { Icon: UserRound, title: "Chama um humano quando precisa", desc: "Reclamação, negociação ou caso delicado vão direto para sua equipe, com o histórico da conversa." },
      { Icon: Plug, title: "Conectada aos seus sistemas", desc: "Consulta estoque, agenda ou pedidos de verdade, em vez de inventar resposta." },
      { Icon: BellRing, title: "Lembretes e cobranças", desc: "Confirma agendamentos, avisa sobre entregas e lembra pagamentos em atraso." },
      { Icon: Bot, title: "API oficial do WhatsApp", desc: "Funciona pela API oficial da Meta, com o nome e a marca da sua empresa." },
    ],
  },
  demo: <SalesFlow />,
  segments: {
    title: "Funciona para quem atende muito pelo WhatsApp",
    subtitle: "Cada assistente é configurado para o processo do negócio, não é um robô genérico.",
    items: [
      { Icon: Stethoscope, title: "Clínicas e consultórios", desc: "Agenda, confirma e remarca consultas sem a recepção parar." },
      { Icon: UtensilsCrossed, title: "Restaurantes e delivery", desc: "Mostra o cardápio, fecha o pedido e recebe pelo Pix." },
      { Icon: Store, title: "Lojas e varejo", desc: "Informa preço e disponibilidade e fecha a venda pela conversa." },
      { Icon: Wrench, title: "Prestadores de serviço", desc: "Coleta as informações, envia orçamento e agenda a visita." },
    ],
  },
  offer: {
    title: "Valor fechado, sem letra miúda",
    subtitle: "O preço sai no diagnóstico gratuito, depois que entendemos o seu atendimento.",
    items: [
      "Implantação: configuração do assistente com as informações do seu negócio, integrações e testes com você",
      "Mensalidade: hospedagem, monitoramento, ajustes e suporte de quem desenvolveu",
      "Sem fidelidade: se não fizer sentido, você cancela",
    ],
    note: "As mensagens do WhatsApp têm custo cobrado pela Meta conforme o volume. Isso é explicado e estimado no diagnóstico, antes de você decidir.",
  },
  faqs: [
    {
      question: "Preciso trocar o número do WhatsApp da empresa?",
      answer:
        "Na maioria dos casos dá para usar o número que você já tem. A melhor forma de fazer isso no seu caso é avaliada no diagnóstico gratuito.",
    },
    {
      question: "E se a IA não souber responder?",
      answer:
        "Ela responde só com base nas informações do seu negócio. Quando não sabe, ou quando o cliente pede, passa a conversa para alguém da sua equipe com todo o histórico.",
    },
    {
      question: "O cliente vai perceber que é um robô?",
      answer:
        "O atendimento é natural e educado, mas recomendamos ser transparente: o cliente é atendido na hora e sabe que pode falar com uma pessoa quando quiser.",
    },
    {
      question: "Funciona com o sistema que eu já uso?",
      answer:
        "Se o seu sistema tiver uma forma de integração (API ou exportação de dados), conectamos. Se você não tiver sistema, a EMC também oferece gestão e nota fiscal integrados.",
    },
    {
      question: "Em quanto tempo fica pronto?",
      answer:
        "Depende das integrações necessárias. O prazo exato vai por escrito na proposta, junto com o valor.",
    },
  ],
  finalTitle: "Cada mensagem sem resposta é uma venda que foi embora.",
  finalText: "Chame no WhatsApp, conte como é o seu atendimento hoje e receba um diagnóstico gratuito em cerca de 20 minutos.",
};

export default function Page() {
  return <LandingPage c={config} />;
}
