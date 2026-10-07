"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowUpRight, X } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

export type ExplorerPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
  tags: string[];
  coverImage?: string;
};

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function BlogExplorer({ posts, tags }: { posts: ExplorerPost[]; tags: string[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return posts.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!q || normalize(`${p.title} ${p.description} ${p.tags.join(" ")}`).includes(q)),
    );
  }, [posts, tag, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar por tema" className="flex flex-wrap gap-2">
          {[null, ...tags].map((t) => {
            const on = tag === t;
            return (
              <button
                key={t ?? "todos"}
                type="button"
                aria-pressed={on}
                onClick={() => setTag(t)}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${on ? "text-bg" : "text-fg-muted hover:text-fg"}`}
              >
                {on && (
                  <motion.span
                    layoutId="blog-tag"
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {!on && <span className="absolute inset-0 rounded-full border border-white/10" />}
                <span className="relative capitalize">{t ?? "Todos"}</span>
              </button>
            );
          })}
        </div>

        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Buscar artigos</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-dim" strokeWidth={2} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artigos…"
            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-10 text-sm text-fg placeholder:text-fg-dim outline-none transition-colors focus:border-[var(--accent)]"
          />
          {query && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-fg-dim hover:text-fg"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>
          )}
        </label>
      </div>

      <p className="mt-5 text-xs text-fg-dim" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "artigo" : "artigos"}
      </p>

      {filtered.length === 0 ? (
        <div className="glass mt-4 rounded-2xl px-6 py-16 text-center">
          <p className="text-fg">Nenhum artigo encontrado.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTag(null);
            }}
            className="mt-3 text-sm text-[var(--accent)] hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export function PostCard({ post }: { post: ExplorerPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <SpotlightCard className="glass h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1">
        <div className="flex h-full flex-col">
          {post.coverImage && (
            <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-t-2xl">
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center gap-2 text-[11px] text-fg-dim">
              {post.tags[0] && <span className="mono-label text-[var(--accent)]">{post.tags[0]}</span>}
              <span>·</span>
              <span>{post.readingMinutes} min</span>
            </div>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-[var(--accent)]">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-fg-muted">{post.description}</p>
            <div className="mt-5 flex items-center justify-between text-xs text-fg-dim">
              <time dateTime={post.date}>{post.dateLabel}</time>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
