"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CONSENT_STORAGE_KEY, CONSENT_EVENT } from "@/lib/contact";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  function respond(choice: "accepted" | "rejected") {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl sm:inset-x-auto sm:right-6 sm:bottom-6"
        >
          <div className="flex flex-col gap-4 rounded-[14px] border border-[var(--panel-border-strong)] bg-[var(--bg-elev)] p-5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)] sm:flex-row sm:items-center sm:p-6">
            <p className="text-sm leading-relaxed text-fg-muted">
              Usamos cookies para melhorar sua experiência e entender como o
              site é usado. Ao continuar, você concorda com nossa
              utilização de cookies, conforme a LGPD. Veja nossa{" "}
              <Link href="/privacidade" className="text-[var(--accent)] underline-offset-2 hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => respond("rejected")}
                className="rounded-md border border-[var(--panel-border-strong)] px-4 py-2 text-xs font-medium text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                Recusar
              </button>
              <button
                onClick={() => respond("accepted")}
                className="rounded-md bg-[var(--cta)] hover:bg-[var(--cta-deep)] px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
