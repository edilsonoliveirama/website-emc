import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";
import { PostCard } from "./blog/BlogExplorer";

export default function BlogTeaser() {
  const posts = getAllPostsMeta().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mono-label text-xs text-[var(--accent)]">Blog</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={{
                slug: post.slug,
                title: post.title,
                description: post.description,
                date: post.date,
                dateLabel: new Date(`${post.date}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
                readingMinutes: post.readingMinutes,
                tags: post.tags ?? [],
                coverImage: post.coverImage,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
