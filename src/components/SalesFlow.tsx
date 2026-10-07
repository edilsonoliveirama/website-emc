"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, CheckCheck, QrCode, Pizza, MessageCircle, Sparkles, CircleCheck, FileText } from "lucide-react";
import { clock, NodeCard, EventLog, type LogLine } from "./flows/kit";

type Backstage = { stage: number; log: string; tone: LogLine["tone"] };

type Bubble = {
  id: string;
  from: "customer" | "ai";
  kind: "text" | "typing" | "image" | "pix" | "system";
  text?: string;
  /** What happens in the back office when this bubble appears. */
  sys?: Backstage;
};

const BACKSTAGE = [
  { Icon: MessageCircle, tone: "whatsapp" as const, title: "API de WhatsApp", detail: "Recebe a mensagem do cliente" },
  { Icon: Sparkles, tone: "accent" as const, title: "IA", detail: "Entende o pedido e consulta o estoque" },
  { Icon: QrCode, tone: "amber" as const, title: "Pagamento", detail: "Gera e envia a cobrança Pix" },
  { Icon: CircleCheck, tone: "mint" as const, title: "Banco", detail: "Confirma o pagamento na hora" },
  { Icon: FileText, tone: "accent" as const, title: "Gestão e nota fiscal", detail: "Baixa o estoque e emite a NF-e" },
];

type PhoneConfig = {
  agentLabel: string;
  script: Bubble[];
  productImage?: string;
};

const AIRPODS_SCRIPT: Bubble[] = [
  { id: "m1", from: "customer", kind: "text", text: "Oi, vocês têm o AirPods Max preto?", sys: { stage: 0, log: "API WhatsApp: nova mensagem recebida", tone: "whatsapp" } },
  { id: "t1", from: "ai", kind: "typing", sys: { stage: 1, log: "IA: consultando catálogo e estoque", tone: "accent" } },
  { id: "m2", from: "ai", kind: "image", text: "Temos! Esse aqui é o mais pedido 👇" },
  { id: "m3", from: "ai", kind: "text", text: "AirPods Max, R$ 179,90, com frete grátis" },
  { id: "m4", from: "customer", kind: "text", text: "Perfeito, quero esse!" },
  { id: "m5", from: "ai", kind: "pix", text: "Segue o Pix para pagamento", sys: { stage: 2, log: "Pagamento: cobrança Pix gerada", tone: "amber" } },
  { id: "m6", from: "ai", kind: "system", text: "Pagamento confirmado", sys: { stage: 3, log: "Banco: pagamento confirmado", tone: "mint" } },
  { id: "m7", from: "ai", kind: "text", text: "Recebemos! Comprovante enviado no WhatsApp e no e-mail ✅" },
  { id: "m8", from: "ai", kind: "system", text: "Pedido liberado: envio ou retirada na loja", sys: { stage: 4, log: "Gestão: estoque baixado e NF-e emitida", tone: "accent" } },
];

const PIZZARIA_SCRIPT: Bubble[] = [
  { id: "p1", from: "customer", kind: "text", text: "Boa noite! Fazem entrega no Bairro Renascença?", sys: { stage: 0, log: "API WhatsApp: nova mensagem recebida", tone: "whatsapp" } },
  { id: "pt1", from: "ai", kind: "typing", sys: { stage: 1, log: "IA: conferindo área de entrega e cardápio", tone: "accent" } },
  { id: "p2", from: "ai", kind: "text", text: "Fazemos sim! 🍕 Qual pizza você quer hoje?" },
  { id: "p3", from: "customer", kind: "text", text: "Uma grande de calabresa, borda recheada" },
  { id: "p4", from: "ai", kind: "text", text: "Grande calabresa c/ borda recheada, R$ 62,00\nEntrega em ~35 min" },
  { id: "p5", from: "customer", kind: "text", text: "Fechado!" },
  { id: "p6", from: "ai", kind: "pix", text: "Segue o Pix para pagamento", sys: { stage: 2, log: "Pagamento: cobrança Pix gerada", tone: "amber" } },
  { id: "p7", from: "ai", kind: "system", text: "Pagamento confirmado", sys: { stage: 3, log: "Banco: pagamento confirmado", tone: "mint" } },
  { id: "p8", from: "ai", kind: "text", text: "Pedido na cozinha! Chega em ~35 min 🛵" },
  { id: "p9", from: "ai", kind: "system", text: "Pedido a caminho", sys: { stage: 4, log: "Gestão: pedido na cozinha e NF-e emitida", tone: "accent" } },
];

const PHONES: PhoneConfig[] = [
  {
    agentLabel: "Atendimento EMC",
    script: AIRPODS_SCRIPT,
    productImage: "/products/airpods-max.png",
  },
  {
    agentLabel: "Pizzaria do Zé",
    script: PIZZARIA_SCRIPT,
  },
];

const STEP_MS = 1400;
const HOLD_MS = 1800;

export default function SalesFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [stage, setStage] = useState(0);
  const [log, setLog] = useState<LogLine[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handleProgress = useCallback((b: Bubble) => {
    if (!b.sys) return;
    const { stage: next, log: text, tone } = b.sys;
    setStage(next);
    setLog((l) => [{ id: `${b.id}-${Date.now()}`, time: clock(), text, tone }, ...l].slice(0, 6));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleComplete = useCallback(() => {
    const next = (activeIndex + 1) % PHONES.length;
    setActiveIndex(next);
    handleProgress(PHONES[next].script[0]);
  }, [activeIndex, handleProgress]);

  return (
    <section id="fluxo-venda" aria-labelledby="fluxo-venda-heading" className="section-divider relative px-4 py-28" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="mono-label text-xs text-[var(--accent)]">system.sale</span>
          <h2 id="fluxo-venda-heading" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Uma venda inteira, sem ninguém digitar
          </h2>
          <p className="mt-4 text-fg-muted">
            O cliente conversa no WhatsApp. Por trás, a IA consulta o estoque, o Pix é gerado, o banco confirma
            e o sistema emite a nota. Tudo sozinho, para qualquer segmento.
          </p>
        </motion.div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="relative flex min-h-[38rem] items-start justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={PHONES[activeIndex].agentLabel}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.96 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <PhoneChat
                  config={PHONES[activeIndex]}
                  inView={inView}
                  onComplete={handleComplete}
                  onProgress={handleProgress}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-[2rem] p-5 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="mono-label text-[11px] text-fg-dim">Por trás da conversa</span>
              <span className="mono-label text-[10px] text-fg-dim">{PHONES[activeIndex].agentLabel}</span>
            </div>
            <ol className="relative mt-4 space-y-2.5">
              {BACKSTAGE.map((b, i) => (
                <li key={b.title}>
                  <NodeCard
                    width="100%"
                    Icon={b.Icon}
                    tone={b.tone}
                    title={b.title}
                    status={b.detail}
                    state={i < stage ? "done" : i === stage ? (stage === BACKSTAGE.length - 1 ? "done" : "active") : "idle"}
                    pulse={i === stage ? `${activeIndex}-${stage}` : null}
                  />
                </li>
              ))}
            </ol>
            <div className="mt-4">
              <EventLog lines={log} title="Sistemas" max={3} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PhoneChat({
  config,
  inView,
  onComplete,
  onProgress,
}: {
  config: PhoneConfig;
  inView: boolean;
  onComplete: () => void;
  onProgress: (b: Bubble) => void;
}) {
  const { agentLabel, script, productImage } = config;
  const [count, setCount] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView) return;
    const isLast = count >= script.length;
    const timer = setTimeout(
      () => {
        if (isLast) {
          onComplete();
        } else {
          setCount(count + 1);
          onProgress(script[count]);
        }
      },
      isLast ? HOLD_MS : STEP_MS
    );
    return () => clearTimeout(timer);
  }, [inView, count, script, onComplete, onProgress]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [count]);

  const visible = script.slice(0, count);

  return (
    <div className="flex justify-center">
      {/* iPhone 17 frame */}
      <div
        className="relative w-[280px] rounded-[3.4rem] p-[3px] sm:w-[300px]"
        style={{
          background: "linear-gradient(155deg, #eae6df 0%, #ccc6bc 16%, #a19c93 38%, #7d7972 55%, #c9c4bb 75%, #f0ece4 100%)",
          boxShadow:
            "0 50px 90px -35px rgba(0,0,0,0.8), 0 10px 30px -10px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.4)",
        }}
      >
        {/* Side buttons */}
        <span className="absolute -left-[3px] top-[108px] h-7 w-[3px] rounded-l-sm bg-gradient-to-b from-[#d8d3ca] to-[#8a857b]" />
        <span className="absolute -left-[3px] top-[150px] h-11 w-[3px] rounded-l-sm bg-gradient-to-b from-[#d8d3ca] to-[#8a857b]" />
        <span className="absolute -left-[3px] top-[196px] h-11 w-[3px] rounded-l-sm bg-gradient-to-b from-[#d8d3ca] to-[#8a857b]" />
        <span className="absolute -right-[3px] top-[140px] h-16 w-[3px] rounded-r-sm bg-gradient-to-b from-[#d8d3ca] to-[#8a857b]" />

        {/* Bezel */}
        <div className="relative overflow-hidden rounded-[3.1rem] bg-black p-2">
          {/* Screen */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#f4f2ee]">
            {/* Specular highlight */}
            <div
              className="pointer-events-none absolute inset-0 z-30 opacity-30"
              style={{
                background:
                  "linear-gradient(105deg, rgba(255,255,255,0.5) 0%, transparent 16%, transparent 84%, rgba(255,255,255,0.3) 100%)",
              }}
            />

            {/* Status bar */}
            <div className="relative z-20 flex items-center justify-between px-8 pt-3.5 pb-1 text-[12px] font-semibold text-[#1b1b1f]">
              <span>9:41</span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden>
                  <path d="M8 2.2c2.1 0 4 .8 5.5 2.2l-1.3 1.4c-1.1-1-2.6-1.7-4.2-1.7s-3.1.6-4.2 1.7L2.5 4.4C4 3 5.9 2.2 8 2.2Z" fill="currentColor" />
                  <path d="M8 5.6c1.1 0 2.1.4 2.9 1.1l-1.3 1.4c-.4-.4-1-.6-1.6-.6s-1.2.2-1.6.6L5.1 6.7c.8-.7 1.8-1.1 2.9-1.1Z" fill="currentColor" />
                  <circle cx="8" cy="9.2" r="1.1" fill="currentColor" />
                </svg>
                <span className="h-2.5 w-4 rounded-[3px] border border-[#1b1b1f] opacity-90" />
              </span>
            </div>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-2.5 z-20 h-[28px] w-[100px] -translate-x-1/2 rounded-full bg-black" />

            {/* Chat header */}
            <div className="relative z-10 flex items-center gap-3 border-b border-black/10 bg-white/60 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-sm font-semibold text-white">
                IA
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1b1b1f]">{agentLabel}</p>
                <p className="text-[11px] text-[#6b6f7a]">online agora</p>
              </div>
            </div>

            {/* Chat body */}
            <div
              ref={scrollRef}
              className="relative z-10 flex h-[26rem] flex-col gap-3 overflow-y-auto px-4 py-5"
              style={{ scrollbarWidth: "none" }}
            >
              <AnimatePresence initial={false}>
                {visible.map((b) => (
                  <ChatBubble key={`${count > 1 ? "" : count}${b.id}`} bubble={b} productImage={productImage} />
                ))}
              </AnimatePresence>
            </div>

            {/* Home indicator */}
            <div className="relative z-20 flex justify-center py-2">
              <span className="h-1 w-28 rounded-full bg-[#1b1b1f] opacity-25" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ bubble, productImage }: { bubble: Bubble; productImage?: string }) {
  const isCustomer = bubble.from === "customer";

  if (bubble.kind === "system") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex items-center gap-1.5 rounded-full border border-black/10 bg-[var(--accent-mint-soft)] px-3 py-1 text-[11px] text-[#1f9d6f]"
      >
        <Check className="h-3 w-3" strokeWidth={2} />
        {bubble.text}
      </motion.div>
    );
  }

  if (bubble.kind === "typing") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-start"
      >
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-black/10 bg-white px-4 py-3 shadow-sm">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#9a9da5]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] whitespace-pre-line rounded-2xl border px-4 py-2.5 text-[13px] leading-snug shadow-sm ${
          isCustomer
            ? "rounded-br-sm border-transparent bg-[var(--accent)] text-white"
            : "rounded-bl-sm border-black/10 bg-white text-[#1b1b1f]"
        }`}
      >
        {bubble.kind === "image" && (
          <div className="relative mb-2 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-[#f4f2ee]">
            {productImage ? (
              <Image
                src={productImage}
                alt="Foto do produto"
                fill
                className="object-contain p-2"
                sizes="220px"
              />
            ) : (
              <Pizza className="h-10 w-10 text-[#9a9da5]" strokeWidth={1.4} />
            )}
          </div>
        )}

        {bubble.kind === "pix" && (
          <div className="mb-2 flex flex-col items-center gap-2 rounded-xl border border-black/10 bg-[#f4f2ee] p-4">
            <QrCode className="h-16 w-16 text-[var(--accent-amber)]" strokeWidth={1.2} />
            <span className="mono-label text-[10px] text-[#6b6f7a]">pix copia e cola</span>
          </div>
        )}

        <p>{bubble.text}</p>

        {!isCustomer && (
          <span className="mt-1 flex justify-end">
            <CheckCheck className="h-3.5 w-3.5 text-[var(--accent-mint)]" strokeWidth={2} />
          </span>
        )}
      </div>
    </motion.div>
  );
}
