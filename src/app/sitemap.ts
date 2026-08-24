import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/contact";

const SECTIONS = [
  "servicos",
  "fluxo-venda",
  "fluxo-pagamento",
  "fluxo-atendimento",
  "fluxo-filiais",
  "depoimentos",
  "investimento",
  "perguntas-frequentes",
  "sobre",
  "contato",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SECTIONS.map((section) => ({
      url: `${SITE_URL}/#${section}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/privacidade`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/termos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
