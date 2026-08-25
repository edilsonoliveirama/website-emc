"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

const LINKS = [
  { href: "/#servicos", label: "Serviços", id: "servicos" },
  { href: "/#sobre", label: "Sobre", id: "sobre" },
  { href: "/blog", label: "Blog", id: "blog" },
  { href: "/#contato", label: "Contato", id: "contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-5 py-3 transition-[box-shadow,border-color,background] duration-300 ${
          scrolled ? "border-[var(--panel-border-strong)] shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)]" : ""
        }`}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_2px_var(--accent)]" />
          EMC <span className="text-fg-muted font-medium">Soluções</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                activeId === l.id ? "text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {activeId === l.id && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.06] ring-1 ring-[var(--panel-border-strong)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[#06080f] transition-transform hover:scale-[1.03] active:scale-[0.98] sm:inline-block"
          >
            Falar com a EMC
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5 md:hidden"
          >
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="h-px w-full origin-center bg-fg"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-px w-full bg-fg"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="h-px w-full origin-center bg-fg"
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-strong absolute left-4 right-4 top-[calc(100%+0.5rem)] flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                  activeId === l.id ? "bg-white/[0.06] text-fg" : "text-fg-muted hover:bg-white/5 hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-medium text-[#06080f]"
            >
              Falar com a EMC
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
