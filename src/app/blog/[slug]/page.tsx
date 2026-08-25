import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllPostsMeta, getPostMeta, getPostSlugs } from "@/lib/blog";
import { SITE_URL, whatsappLink } from "@/lib/contact";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
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
      images: [
        {
          url: post.coverImage ?? "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) notFound();

  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`);

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
    author: {
      "@type": "Organization",
      name: post.author ?? "EMC Soluções",
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: post.coverImage ?? `${SITE_URL}/og-image.png`,
    keywords: post.tags?.join(", "),
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

  const relatedPosts = getAllPostsMeta()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

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

      <main className="relative z-10 flex-1 px-4 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-fg-dim">
            <Link href="/" className="hover:text-fg">Início</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-fg">Blog</Link>
          </nav>

          {post.tags && post.tags.length > 0 && (
            <span className="mono-label text-xs text-[var(--accent)]">{post.tags[0]}</span>
          )}
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-fg-dim">
            <span>{post.author ?? "EMC Soluções"}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingMinutes} min de leitura</span>
          </div>

          {post.coverImage && (
            <div className="glass relative mt-8 aspect-[1200/630] w-full overflow-hidden rounded-2xl">
              <Image
                src={post.coverImage}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <article className="glass mx-auto mt-10 max-w-3xl rounded-[2rem] p-8 sm:p-12">
          <div className="mx-auto max-w-[38rem] text-pretty [&_p]:hyphens-auto [&_pre]:sm:-mx-6 [&_table]:sm:-mx-6">
            <PostContent />
          </div>
        </article>

        <div className="mx-auto max-w-3xl">
          <div className="glass mt-10 flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-fg-muted">
              Quer avaliar isso na sua empresa? Fale com a EMC.
            </p>
            <a
              href={whatsappLink(`Olá! Li o artigo "${post.title}" no blog e quero saber mais.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[#06080f] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Falar com a EMC no WhatsApp
            </a>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="mono-label text-xs text-fg-dim">Continue lendo</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="glass rounded-xl p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[var(--panel-border-strong)]"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-fg">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
