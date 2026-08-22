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
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          {text}
        </a>
      </motion.div>
    </div>
  );
}
