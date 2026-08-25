import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";

export default function BlogTeaser() {
  const posts = getAllPostsMeta().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="section-divider relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mono-label text-xs text-[var(--accent)]">Blog</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
              Ideias sobre IA e integração de sistemas
            </h2>
          </div>
          <Link
            href="/blog"
            className="mono-label text-xs text-fg-muted transition-colors hover:text-[var(--accent)]"
          >
            Ver todos os artigos →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass group flex flex-col rounded-2xl p-6 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[var(--panel-border-strong)]"
            >
              <span className="mono-label text-[10px] text-fg-dim">
                {post.readingMinutes} min de leitura
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-fg transition-colors group-hover:text-[var(--accent)]">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
