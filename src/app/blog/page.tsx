import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import BlogExplorer, { type ExplorerPost } from "@/components/blog/BlogExplorer";
import { getAllPostsMeta, getAllTags } from "@/lib/blog";
import { SITE_URL, whatsappLink } from "@/lib/contact";

const TITLE = "Blog";
const DESCRIPTION =
  "Artigos da EMC Soluções sobre gestão, nota fiscal, WhatsApp, inteligência artificial e integração de sistemas para pequenas e médias empresas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    title: `${TITLE} | EMC Soluções`,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
  },
};

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const tags = getAllTags();
  const [featured, ...rest] = posts;

  const toExplorer = (p: (typeof posts)[number]): ExplorerPost => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    dateLabel: formatDate(p.date),
    readingMinutes: p.readingMinutes,
    tags: p.tags ?? [],
    coverImage: p.coverImage,
  });

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Blog EMC Soluções",
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updatedAt ?? post.date,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <div className="bg-scene" />
      <Header />

      <main className="relative z-10 flex-1 px-4 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          <Reveal y={12} className="max-w-2xl">
            <span className="mono-label text-xs text-[var(--accent)]">Blog</span>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
              Tecnologia que <span className="text-gradient">faz a empresa render</span>
            </h1>
            <p className="mt-4 text-fg-muted">{DESCRIPTION}</p>
            <p className="mono-label mt-5 text-[11px] text-fg-dim">
              {posts.length} artigos · {tags.length} temas
            </p>
          </Reveal>

          {featured ? (
            <>
              <Reveal delay={0.1} className="mt-12">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="glass group grid overflow-hidden rounded-[2rem] transition-[border-color] duration-300 hover:border-[var(--panel-border-strong)] lg:grid-cols-[1.25fr_1fr]"
                >
                  {featured.coverImage && (
                    <div className="relative aspect-[1200/630] w-full overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
                      <Image
                        src={featured.coverImage}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080f]/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#06080f]/40" />
                    </div>
                  )}
                  <div className="flex flex-col justify-center p-8 sm:p-10">
                    <span className="mono-label inline-flex w-fit items-center gap-2 rounded-full border border-[var(--accent-amber)]/40 bg-[var(--accent-amber-soft)] px-3 py-1 text-[10px] text-[var(--accent-amber)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-amber)]" />
                      Mais recente
                    </span>
                    <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight tracking-tight text-fg transition-colors group-hover:text-[var(--accent)] sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-fg-muted">{featured.description}</p>
                    <div className="mt-6 flex items-center gap-3 text-xs text-fg-dim">
                      <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                      <span>·</span>
                      <span>{featured.readingMinutes} min de leitura</span>
                    </div>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                      Ler artigo
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                    </span>
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.15} className="mt-16">
                <BlogExplorer
                  posts={rest.map(toExplorer)}
                  tags={Array.from(new Set(rest.flatMap((p) => p.tags ?? []))).sort()}
                />
              </Reveal>
            </>
          ) : (
            <p className="mt-16 text-fg-dim">Nenhum artigo publicado ainda.</p>
          )}

          <Reveal className="mt-20">
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--panel-border-strong)] bg-gradient-to-br from-[#10204a] via-[#0b1222] to-[#090d18] px-8 py-12 sm:px-12">
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(91,140,255,0.35),transparent)]" />
              <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
                    Quer aplicar isso na sua empresa?
                  </h2>
                  <p className="mt-2 text-fg-muted">Conte o seu cenário e receba um diagnóstico gratuito.</p>
                </div>
                <a
                  href={whatsappLink("Olá! Vim pelo blog da EMC e quero um diagnóstico gratuito.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
