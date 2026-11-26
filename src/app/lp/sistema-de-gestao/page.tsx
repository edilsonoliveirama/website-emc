import type { Metadata } from "next";
import {
  LayoutDashboard,
  ShoppingCart,
  Wallet,
  PackageSearch,
  FileText,
  MessageCircle,
  Smartphone,
  Store,
  Truck,
  Sparkles,
  Briefcase,
} from "lucide-react";
import LandingPage, { type LandingConfig } from "@/components/lp/LandingPage";
import LpShowcase from "@/components/lp/LpShowcase";
import IntegrationFlow from "@/components/IntegrationFlow";
import { SITE_URL } from "@/lib/contact";

const PATH = "/lp/sistema-de-gestao";
const TITLE = "Sistema de gestão com nota fiscal para pequenas empresas";
const DESCRIPTION =
  "Vendas, estoque, financeiro e nota fiscal em um só lugar, no computador ou no celular. A partir de R$ 499/mês, sem fidelidade. Diagnóstico gratuito.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Página de tráfego pago: fora do Google para não competir com a home.
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}` },
};

const config: LandingConfig = {
  badge: "Sistema de gestão + nota fiscal",
  BadgeIcon: LayoutDashboard,
  titleStart: "Saia da planilha.",
  titleHighlight: "Vendas, estoque, financeiro e nota fiscal em um só lugar.",
  subtitle:
    "Registre a venda, emita a nota e saiba quanto entrou, quanto falta receber e o que está acabando no estoque. Simples de usar, no computador ou no celular.",
  ctaLabel: "Quero meu diagnóstico gratuito",
  ctaMessage: "Olá! Vi a página do sistema de gestão com nota fiscal e quero meu diagnóstico gratuito.",
  guarantees: ["A partir de R$ 499/mês", "Sem fidelidade", "Diagnóstico gratuito"],
  visual: <LpShowcase panels={[0, 1]} />,
  pains: {
    title: "Sua empresa ainda roda assim?",
    items: [
      "O produto acaba e você só descobre quando o cliente pede.",
      "No fim do mês, ninguém sabe dizer com certeza quanto a empresa lucrou.",
      "A nota fiscal é emitida em outro sistema, digitando tudo de novo.",
      "Conta a receber esquecida e cliente cobrado tarde demais.",
      "A planilha só uma pessoa entende, e quando ela falta, tudo para.",
      "Vários programas que não conversam entre si e muito retrabalho.",
    ],
  },
  features: {
    tag: "O que você recebe",
    title: "Tudo o que a rotina pede, sem complicação",
    subtitle: "Um sistema só, com as peças conversando entre si.",
    items: [
      { Icon: ShoppingCart, title: "Vendas e clientes", desc: "Cada venda registrada com o histórico do cliente, sem caderno nem planilha." },
      { Icon: PackageSearch, title: "Estoque com alerta", desc: "Baixa automática a cada venda e aviso quando um produto chega no estoque mínimo." },
      { Icon: Wallet, title: "Financeiro em dia", desc: "Contas a pagar e a receber, fluxo de caixa e quanto o negócio realmente fatura." },
      { Icon: FileText, title: "Nota fiscal a partir da venda", desc: "Emita a nota sem redigitar nada. XML e DANFE vão para o cliente automaticamente." },
      { Icon: MessageCircle, title: "Avisos pelo WhatsApp", desc: "Confirmação de pedido, cobrança e aviso de entrega saem sozinhos para o cliente." },
      { Icon: Smartphone, title: "No computador ou no celular", desc: "Acompanhe a loja de qualquer lugar, sem instalar nada." },
    ],
  },
  demo: <IntegrationFlow />,
  segments: {
    title: "Feito para pequenas e médias empresas",
    subtitle: "Sem equipe de TI? Sem problema. A EMC configura e acompanha.",
    items: [
      { Icon: Store, title: "Comércio e lojas", desc: "Venda, estoque e nota no mesmo lugar." },
      { Icon: Truck, title: "Distribuidoras", desc: "Pedidos, faturamento e contas a receber sob controle." },
      { Icon: Briefcase, title: "Prestadores de serviço", desc: "Clientes, cobranças e financeiro organizados." },
      { Icon: Sparkles, title: "Quem quer crescer", desc: "Comece pela gestão e adicione WhatsApp e IA quando quiser." },
    ],
  },
  offer: {
    title: "Assinatura mensal, sem fidelidade",
    subtitle: "O plano acompanha o tamanho da sua operação. O valor exato sai no diagnóstico gratuito.",
    price: { prefix: "A partir de", value: "R$ 499", period: "/mês" },
    items: [
      "Configuração inicial feita pela EMC, com você",
      "Mensalidade que inclui atualizações e suporte de quem desenvolveu",
      "Comece pelo que precisa hoje e adicione nota fiscal, WhatsApp ou IA depois",
      "Sem fidelidade: se não fizer sentido, você cancela",
    ],
    note: "O tipo de nota fiscal atendido e o plano ideal para o seu negócio são confirmados no diagnóstico, antes de qualquer cobrança.",
  },
  faqs: [
    {
      question: "Preciso instalar alguma coisa?",
      answer: "Não. O sistema funciona pelo navegador, no computador ou no celular.",
    },
    {
      question: "Consigo trazer o que já tenho na planilha?",
      answer:
        "Os seus dados atuais e a melhor forma de levá-los para o sistema são avaliados no diagnóstico gratuito.",
    },
    {
      question: "Quanto custa?",
      answer:
        "Os planos começam em R$ 499 por mês. O valor final depende do tamanho da operação e do que você precisa (por exemplo, nota fiscal e avisos pelo WhatsApp) e é fechado no diagnóstico gratuito, antes de qualquer cobrança.",
    },
    {
      question: "Tem fidelidade ou multa para cancelar?",
      answer: "Não. A assinatura é mensal e você pode cancelar quando quiser.",
    },
    {
      question: "E se eu precisar de algo específico do meu negócio?",
      answer:
        "A EMC também desenvolve sob medida. Ajustes e integrações específicas entram na proposta com valor fechado.",
    },
    {
      question: "Quem me atende se der problema?",
      answer: "A própria equipe que desenvolveu o sistema, pelo WhatsApp. Sem fila de call center.",
    },
  ],
  finalTitle: "Pare de administrar a empresa no escuro.",
  finalText: "Chame no WhatsApp, conte como você controla vendas e estoque hoje e receba um diagnóstico gratuito em cerca de 20 minutos.",
};

export default function Page() {
  return <LandingPage c={config} />;
}
