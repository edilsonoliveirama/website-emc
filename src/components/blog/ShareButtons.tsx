"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link2, Check, MessageCircle } from "lucide-react";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.05 3.78-2.05 4.05 0 4.8 2.66 4.8 6.12v5.33h-4v-4.72c0-1.13-.02-2.58-1.57-2.58-1.57 0-1.81 1.23-1.81 2.5v4.8h-4v-11Z" />
    </svg>
  );
}

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable (insecure context); the other share options still work.
    }
  }

  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-fg-muted transition-colors hover:border-[var(--panel-border-strong)] hover:bg-white/5 hover:text-fg";

  return (
    <div className="flex items-center gap-2">
      <span className="mono-label mr-1 text-[10px] text-fg-dim">Compartilhar</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no WhatsApp"
        className={btn}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no LinkedIn"
        className={btn}
      >
        <LinkedinIcon />
      </a>
      <button type="button" onClick={copy} aria-label="Copiar link do artigo" className={`relative ${btn}`}>
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <Check className="h-4 w-4 text-[var(--accent-mint)]" strokeWidth={2.6} />
            </motion.span>
          ) : (
            <motion.span key="link" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <Link2 className="h-4 w-4" strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--bg-elev)] px-2 py-1 text-[11px] text-fg shadow-lg"
            >
              Link copiado
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
