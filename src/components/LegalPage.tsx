import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="bg-scene" />
      <header className="relative z-10 px-4 pt-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_2px_var(--accent)]" />
            EMC <span className="text-fg-muted font-medium">Soluções</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-4 py-16">
        <div className="glass mx-auto max-w-3xl rounded-[2rem] p-8 sm:p-12">
          <span className="mono-label text-xs text-[var(--accent)]">Legal</span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-fg-dim">Última atualização: {updatedAt}</p>

          <div className="legal-prose mt-10 space-y-8 text-sm leading-relaxed text-fg-muted">
            {children}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
