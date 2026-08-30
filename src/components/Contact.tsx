"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink, CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("sending");

    try {
      const subject = encodeURIComponent(`Contato via site: ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} · ${email}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contato" aria-labelledby="contato-heading" className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">Contato</span>
          <h2 id="contato-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Conte o que trava seu processo hoje
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-fg-muted">
            Resposta em até 1 dia útil, com um diagnóstico inicial sem
            custo. Chame no WhatsApp para ser mais rápido.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-8 flex justify-center"
        >
          <a
            href={whatsappLink("Olá! Vim pelo site e quero falar sobre um projeto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-[var(--panel-border-strong)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
            </span>
            Chamar no WhatsApp
            <span className="mono-label text-xs text-fg-dim">{WHATSAPP_DISPLAY}</span>
          </a>
        </motion.div>

        <div className="mt-10 flex items-center gap-4 text-xs text-fg-dim">
          <span className="h-px flex-1 bg-[var(--panel-border)]" />
          <span className="mono-label">ou envie os detalhes</span>
          <span className="h-px flex-1 bg-[var(--panel-border)]" />
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass mt-6 grid gap-5 rounded-[2rem] p-8 sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nome" name="name" type="text" placeholder="Seu nome" required />
            <Field label="E-mail" name="email" type="email" placeholder="voce@empresa.com" required />
          </div>
          <Field label="Empresa" name="company" type="text" placeholder="Nome da sua empresa (opcional)" />
          <div>
            <label htmlFor="message" className="mono-label mb-2 block text-xs text-fg-muted">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="O que você precisa integrar, automatizar ou construir?"
              className="w-full resize-none rounded-xl border border-[var(--panel-border)] bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-fg-dim outline-none transition-colors focus:border-[var(--accent)]"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 w-full rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#06080f] transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 sm:w-auto sm:justify-self-start"
          >
            {status === "sending" ? "Abrindo seu e-mail..." : "Enviar mensagem"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-[var(--accent)]">
              Seu cliente de e-mail foi aberto com a mensagem pronta. Se não abriu, escreva direto para {CONTACT_EMAIL}.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mono-label mb-2 block text-xs text-fg-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--panel-border)] bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-fg-dim outline-none transition-colors focus:border-[var(--accent)]"
      />
    </div>
  );
}
