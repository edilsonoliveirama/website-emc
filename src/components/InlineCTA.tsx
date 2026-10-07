"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

export default function InlineCTA({
  text,
  message,
}: {
  text: string;
  message: string;
}) {
  return (
    <div className="relative px-4 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-6xl justify-center"
      >
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="glass group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-[var(--panel-border-strong)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp transition-transform group-hover:scale-110">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
          </span>
          {text}
          <span className="text-fg-dim transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </a>
      </motion.div>
    </div>
  );
}
