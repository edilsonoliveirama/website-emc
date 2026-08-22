import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE, WHATSAPP_DISPLAY } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--panel-border)] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-fg-dim sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span>EMC Soluções — IA, Desenvolvimento e Integração</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <span>© {new Date().getFullYear()} EMC Soluções. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
