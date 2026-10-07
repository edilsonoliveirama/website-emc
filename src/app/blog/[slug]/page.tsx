import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronDown, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import { PostCard } from "@/components/blog/BlogExplorer";
import { getPostHeadings, getPostMeta, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import { SITE_URL, whatsappLink } from "@/lib/contact";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: [{ url: post.coverImage ?? "/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage ?? "/og-image.png"],
    },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) notFound();

  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`);
  const headings = getPostHeadings(slug);
  const related = getRelatedPosts(slug, 3);
  const author = post.author ?? "EMC Soluções";

  const url = `${SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: author },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : `${SITE_URL}/og-image.png`,
    keywords: post.tags?.join(", "),
    timeRequired: `PT${post.readingMinutes}M`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-scene" />
      <Header />

      <main className="relative z-10 flex-1 px-4 pb-24 pt-32">
        {/* Header */}
        <header className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-fg-dim">
            <Link href="/" className="hover:text-fg">Início</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-fg">Blog</Link>
          </nav>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="mono-label rounded-full border border-[var(--panel-border-strong)] bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] text-[#bcd0ff]">
                  {t}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg-muted text-pretty">{post.description}</p>

          <div className="mt-8 flex flex-col gap-5 border-y border-white/[0.07] py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#0b1120]">
                <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-fg">{author}</div>
                <div className="mt-0.5 text-xs text-fg-dim">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min de leitura
                </div>
              </div>
            </div>
            <ShareButtons url={url} title={post.title} />
          </div>
        </header>

        {post.coverImage && (
          <div className="relative mx-auto mt-10 aspect-[1200/630] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            <Image src={post.coverImage} alt="" fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
        )}

        {/* Body */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          <div className="min-w-0">
            {headings.length > 0 && (
              <details className="glass group mb-6 rounded-2xl px-5 py-4 lg:hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-fg">
                  Neste artigo
                  <ChevronDown className="h-4 w-4 text-fg-dim transition-transform group-open:rotate-180" strokeWidth={2} />
                </summary>
                <ol className="mt-3 space-y-2 border-l border-white/[0.08] pl-4">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-[13px] text-fg-muted hover:text-fg">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <article className="glass rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14">
              <div className="mx-auto max-w-[40rem] text-pretty [&_p]:hyphens-auto [&_.code-block]:sm:-mx-6 [&_table]:sm:-mx-6 [&_h2]:scroll-mt-28">
                <PostContent />
              </div>
            </article>

            {/* Author */}
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#0b1120]">
                <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
              </span>
              <div>
                <div className="text-sm font-semibold text-fg">Escrito por {author}</div>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                  Gestão, nota fiscal, WhatsApp e IA para pequenas e médias empresas, com suporte de quem desenvolveu.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-[var(--panel-border-strong)] bg-gradient-to-br from-[#10204a] via-[#0b1222] to-[#090d18] p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(91,140,255,0.35),transparent)]" />
              <div className="relative">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
                  Quer aplicar isso na sua empresa?
                </h2>
                <p className="mt-2 max-w-xl text-fg-muted">
                  Conte como funciona o seu processo hoje. A gente responde com um diagnóstico gratuito, sem compromisso.
                </p>
                <a
                  href={whatsappLink(`Olá! Li o artigo "${post.title}" no blog e quero saber mais.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
                  Falar com a EMC no WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-24 max-w-6xl">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">Continue lendo</h2>
              <Link href="/blog" className="mono-label text-xs text-fg-muted transition-colors hover:text-[var(--accent)]">
                Todos os artigos →
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard
                  key={p.slug}
                  post={{
                    slug: p.slug,
                    title: p.title,
                    description: p.description,
                    date: p.date,
                    dateLabel: formatDate(p.date),
                    readingMinutes: p.readingMinutes,
                    tags: p.tags ?? [],
                    coverImage: p.coverImage,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
