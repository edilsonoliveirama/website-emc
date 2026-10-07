import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import MotionProvider from "@/components/MotionProvider";
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

const TITLE = "EMC Soluções: Gestão, Nota Fiscal, WhatsApp e IA para PMEs";
const DESCRIPTION =
  "Sistema de gestão, emissor de nota fiscal, API de WhatsApp e tokens de IA (GPT, Claude, GLM), integrados e com suporte de quem desenvolveu. Software sob medida para pequenas e médias empresas. Diagnóstico gratuito.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | EMC Soluções",
  },
  description: DESCRIPTION,
  keywords: [
    "sistema de gestão para pequenas empresas",
    "emissor de nota fiscal",
    "API de WhatsApp para empresas",
    "tokens de IA GPT Claude GLM",
    "API de inteligência artificial",
    "integração de sistemas",
    "desenvolvimento de software sob medida",
    "automação com IA",
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
        alt: TITLE,
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
    "Sistemas de gestão empresarial",
    "Emissão de nota fiscal eletrônica",
    "API de WhatsApp",
    "Modelos de linguagem (LLM)",
    "Desenvolvimento de software",
    "Integração de sistemas",
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
    name: "Sistema de gestão",
    description:
      "Vendas, financeiro, estoque e clientes em um só lugar, com indicadores do negócio em tempo real.",
  },
  {
    name: "Emissor de nota fiscal",
    description:
      "Emissão de nota fiscal integrada às vendas, com envio automático de XML e DANFE ao cliente.",
  },
  {
    name: "API de WhatsApp",
    description:
      "Envio de mensagens pelo WhatsApp a partir dos sistemas da empresa, como confirmação de pedido, cobrança e aviso de entrega.",
  },
  {
    name: "Tokens de IA",
    description:
      "Acesso a GPT, Claude, GLM e outros modelos de IA com uma única chave, consumo e custo centralizados.",
  },
  {
    name: "Integração de sistemas",
    description:
      "Conexão entre ERP, CRM, loja virtual, planilhas e APIs em um só fluxo, eliminando retrabalho manual de dados.",
  },
  {
    name: "Desenvolvimento sob medida",
    description:
      "Sites, sistemas internos e áreas restritas construídos para o processo específico do cliente.",
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
        <MotionProvider>
          {children}
          <CookieConsent />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
