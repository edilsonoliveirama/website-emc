import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllPostsMeta } from "@/lib/blog";
import { SITE_URL } from "@/lib/contact";

const TITLE = "Blog";
const DESCRIPTION =
  "Artigos da EMC Soluções sobre IA aplicada, integração de sistemas e desenvolvimento de software para pequenas e médias empresas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    title: `${TITLE} — EMC Soluções`,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
  },
};

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

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

      <main className="relative z-10 flex-1 px-4 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <span className="mono-label text-xs text-[var(--accent)]">Blog</span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Ideias sobre IA, integração e software sob medida
          </h1>
          <p className="mt-4 max-w-2xl text-fg-muted">{DESCRIPTION}</p>

          {posts.length === 0 ? (
            <p className="mt-16 text-fg-dim">Nenhum artigo publicado ainda.</p>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="glass group flex flex-col overflow-hidden rounded-2xl transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[var(--panel-border-strong)]"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[1200/630] w-full overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-fg-dim">
                      <time dateTime={post.date} className="mono-label">
                        {formatDate(post.date)}
                      </time>
                      <span>·</span>
                      <span>{post.readingMinutes} min de leitura</span>
                    </div>
                    <h2 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-[var(--accent)]">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                      {post.description}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="mono-label rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] text-fg-dim"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
