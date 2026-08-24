import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import { faqJsonLd } from "@/components/FAQ";
import { SITE_URL, WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/lib/contact";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const TITLE = "EMC Soluções — IA, Desenvolvimento e Integração de Sistemas";
const DESCRIPTION =
  "A EMC Soluções cria agentes de IA, desenvolve software sob medida e integra ERP, CRM e sistemas de pagamento para pequenas e médias empresas brasileiras. Diagnóstico gratuito via WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — EMC Soluções",
  },
  description: DESCRIPTION,
  keywords: [
    "inteligência artificial para empresas",
    "automação com IA",
    "integração de sistemas",
    "API Gateway LLM",
    "desenvolvimento de software sob medida",
    "integração ERP CRM",
    "chatbot para empresas",
    "consultoria de tecnologia PME",
  ],
  authors: [{ name: "EMC Soluções" }],
  creator: "EMC Soluções",
  publisher: "EMC Soluções",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "EMC Soluções",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EMC Soluções — IA, Desenvolvimento e Integração de Sistemas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "EMC Soluções",
  url: SITE_URL,
  description: DESCRIPTION,
  email: CONTACT_EMAIL,
  areaServed: "BR",
  knowsAbout: [
    "Inteligência artificial aplicada",
    "Desenvolvimento de software",
    "Integração de sistemas",
    "API Gateway para LLMs",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${WHATSAPP_NUMBER}`,
      url: `https://wa.me/${WHATSAPP_NUMBER}`,
      availableLanguage: ["Portuguese"],
    },
  ],
};

const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "EMC Soluções",
  description: DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "pt-BR",
};

const servicesJsonLd = [
  {
    name: "IA aplicada",
    description:
      "Agentes, automações e chatbots que assumem tarefas repetitivas de atendimento e processos, liberando a equipe para o que importa.",
  },
  {
    name: "Desenvolvimento sob medida",
    description:
      "Sites, sistemas internos e painéis construídos para o processo específico do cliente, não o contrário.",
  },
  {
    name: "Integração de sistemas",
    description:
      "Conexão entre ERP, CRM, planilhas e APIs em um só fluxo, eliminando retrabalho manual de dados.",
  },
  {
    name: "API Gateway LLM",
    description:
      "Endpoint único para dar inteligência artificial a qualquer sistema, com múltiplos provedores de modelo, billing e controle de acesso centralizados.",
  },
].map((s) => ({
  "@type": "Service",
  serviceType: s.name,
  name: s.name,
  description: s.description,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "BR",
  audience: {
    "@type": "Audience",
    audienceType: "Pequenas e médias empresas",
  },
}));

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, websiteJsonLd, faqJsonLd, ...servicesJsonLd],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
