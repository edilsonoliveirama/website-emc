import { MessageCircle } from "lucide-react";

/** Fixed bottom CTA on phones (most Meta Ads traffic), replacing the floating WhatsApp bubble. */
export default function StickyCta({ href, label }: { href: string; label: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--panel-border)] bg-[var(--bg)]/90 p-3 backdrop-blur-md sm:hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={`${label} (barra fixa)`}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-5 py-3.5 text-[15px] font-semibold text-[#06210f]"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
        {label}
      </a>
    </div>
  );
}
