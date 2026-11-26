import { CheckCheck, Sparkles } from "lucide-react";

type Msg = { from: "client" | "bot"; text: string; time: string; pix?: boolean };

const MESSAGES: Msg[] = [
  { from: "client", text: "Boa noite! Vocês ainda têm o kit de 12 unidades?", time: "23:14" },
  { from: "bot", text: "Boa noite! Temos sim, 8 kits em estoque por R$ 89,90. Quer que eu separe um para você?", time: "23:14" },
  { from: "client", text: "Quero! Pode mandar o Pix", time: "23:15" },
  { from: "bot", text: "Pronto! Seu pedido #4821 está reservado. É só pagar pelo Pix abaixo:", time: "23:15", pix: true },
  { from: "bot", text: "Pagamento confirmado. A nota fiscal já foi para o seu e-mail.", time: "23:16" },
];

/** Static WhatsApp conversation: the AI answering, selling and charging after hours. */
export default function ChatMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem]">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[22px] bg-[radial-gradient(closest-side,rgba(37,211,102,0.22),transparent)] blur-2xl" />
      <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0b141a] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Sua empresa</p>
            <p className="text-[11px] text-[#8696a0]">online · atendimento com IA</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-3 py-4" aria-label="Exemplo de conversa no WhatsApp">
          {MESSAGES.map((m, i) => (
            <div key={i} className={`flex ${m.from === "client" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-[14px] px-3 py-2 text-[13px] leading-snug text-[#e9edef] ${
                  m.from === "client" ? "rounded-tr-sm bg-[#005c4b]" : "rounded-tl-sm bg-[#1f2c34]"
                }`}
              >
                {m.text}
                {m.pix && (
                  <div className="mt-2 rounded-lg bg-white/95 p-2.5 text-[#111b21]">
                    <p className="mono-label text-[9px] text-[#6b6f7a]">pix copia e cola</p>
                    <p className="mt-1 truncate font-mono text-[10px]">00020126580014br.gov.bcb.pix0136…</p>
                    <p className="mt-1 text-[12px] font-semibold">R$ 89,90</p>
                  </div>
                )}
                <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#8696a0]">
                  {m.time}
                  {m.from === "client" && <CheckCheck className="h-3 w-3 text-[#53bdeb]" strokeWidth={2} />}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mono-label mt-3 text-center text-[10px] text-fg-dim">Simulação de atendimento</p>
    </div>
  );
}
