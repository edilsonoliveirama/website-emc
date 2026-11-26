"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import CountUp from "./CountUp";
import { FOUNDER, FOUNDER_STATS, CERTIFICATIONS } from "@/lib/founder";

export default function Founder() {
  return (
    <section id="fundador" aria-labelledby="fundador-heading" className="section-divider relative scroll-mt-24 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="mono-label text-xs text-[var(--accent)]">Quem está por trás</span>
            <h2 id="fundador-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Experiência de grandes projetos, a serviço do seu negócio
            </h2>

            <div className="mt-8 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-[var(--accent-soft)] font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--accent)] ring-1 ring-[var(--panel-border-strong)]"
              >
                {FOUNDER.initials}
              </span>
              <div>
                <div className="font-[family-name:var(--font-display)] text-lg font-semibold">{FOUNDER.name}</div>
                <div className="text-sm text-fg-muted">
                  {FOUNDER.role} · {FOUNDER.headline}
                </div>
              </div>
            </div>

            {FOUNDER.bio.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-fg-muted">
                {p}
              </p>
            ))}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--cta)] hover:bg-[var(--cta-deep)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Ver experiência completa
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
              >
                Perfil no LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="glass grid grid-cols-3 gap-4 rounded-[14px] p-6">
              {FOUNDER_STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-[family-name:var(--font-display)] text-3xl font-semibold text-gradient sm:text-4xl">
                    <CountUp to={s.value} />
                    {s.suffix}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-fg-muted">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="glass rounded-[14px] p-6">
              <div className="mono-label text-xs text-fg-dim">Certificações</div>
              <ul className="mt-4 flex flex-col gap-3">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name} className="flex items-start gap-3 text-sm">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-mint)]" strokeWidth={1.8} />
                    <span>
                      <span className="text-fg">{c.name}</span>
                      <span className="text-fg-dim">
                        {" "}
                        · {c.issuer}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
