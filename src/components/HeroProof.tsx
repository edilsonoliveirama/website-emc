import Image from "next/image";
import { CLIENTS, COMPANY_STATS } from "@/lib/clients";

/** Prova social logo abaixo do CTA: quem já usa e números da empresa. */
export default function HeroProof() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {CLIENTS.map((c) => (
            <Image
              key={c.name}
              src={c.logo}
              alt={c.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-[10px] border-2 border-[var(--bg)] bg-[var(--bg-elev)] object-cover"
            />
          ))}
        </div>
        <p className="text-[13px] leading-snug text-fg-muted">
          Já usado por empresas como
          <br />
          <span className="font-semibold text-fg">{CLIENTS.map((c) => c.name).join(" e ")}</span>
        </p>
      </div>
      <div className="hidden h-8 w-px bg-[var(--panel-border-strong)] sm:block" />
      <dl className="flex gap-5">
        {COMPANY_STATS.slice(0, 2).map((s) => (
          <div key={s.label} className="leading-tight">
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-[family-name:var(--font-display)] text-lg font-semibold text-fg">{s.value}</dd>
            <dd className="text-[12px] text-fg-dim">{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
