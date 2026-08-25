import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/contact";
import { getAllPostsMeta } from "@/lib/blog";

const SECTIONS = [
  "servicos",
  "fluxo-venda",
  "fluxo-pagamento",
  "fluxo-atendimento",
  "fluxo-filiais",
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
      url: `${SITE_URL}/loja-virtual`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...getAllPostsMeta().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(`${post.updatedAt ?? post.date}T12:00:00`),
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
