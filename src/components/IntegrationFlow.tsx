"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Globe, CreditCard, CircleCheck, Truck } from "lucide-react";
import { useInView, curve, clock, Edge, NodeCard, EventLog, FlowHeading, Positioned, type LogLine } from "./flows/kit";

const Y = 50;
const X = [12, 37.3, 62.7, 88];

// [ms from cycle start, phase]: even phases = a node working, odd = packet travelling.
const TIMELINE: [number, number][] = [
  [0, 0],
  [1100, 1],
  [1900, 2],
  [3000, 3],
  [3800, 4],
  [4900, 5],
  [5700, 6],
];
const CYCLE_MS = 8400;

function PaymentIcon({ run }: { run: boolean }) {
  return (
    <>
      <CreditCard className="h-[18px] w-[18px]" strokeWidth={1.9} />
      {run && (
        <motion.span
          className="absolute inset-y-0 w-3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ x: "-150%" }}
          animate={{ x: "350%" }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.3, ease: "easeInOut" }}
        />
      )}
    </>
  );
}

function ConfirmIcon({ run, cycle }: { run: boolean; cycle: number }) {
  if (!run) return <CircleCheck className="h-[18px] w-[18px]" strokeWidth={1.9} />;
  return (
    <svg key={cycle} viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
      <motion.path d="M8 12.5l2.5 2.5L16 9.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.45 }} />
    </svg>
  );
}

function TruckIcon({ run }: { run: boolean }) {
  if (!run) return <Truck className="h-[18px] w-[18px]" strokeWidth={1.9} />;
  return (
    <motion.span
      initial={{ x: -16, opacity: 0 }}
      animate={{ x: [-16, 0, 0, 18], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.2, times: [0, 0.25, 0.75, 1], repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.span className="block" animate={{ y: [0, -1.2, 0, 0.8, 0] }} transition={{ duration: 0.3, repeat: Infinity }}>
        <Truck className="h-[18px] w-[18px]" strokeWidth={1.9} />
      </motion.span>
    </motion.span>
  );
}

export default function IntegrationFlow() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState(-1);
  const [log, setLog] = useState<LogLine[]>([]);

  const order = 8412 + cycle;

  useEffect(() => {
    if (!inView) return;
    const n = 8412 + cycle;
    const push = (text: string, tone: LogLine["tone"]) =>
      setLog((l) => [{ id: `${cycle}-${text}`, time: clock(), text, tone }, ...l].slice(0, 6));
    const timers = TIMELINE.map(([ms, ph]) =>
      setTimeout(() => {
        setPhase(ph);
        if (ph === 0) push(`Site: novo pedido #${n}`, "accent");
        if (ph === 2) push(`Gateway: cobrança Pix gerada para #${n}`, "amber");
        if (ph === 4) push(`Webhook: pagamento de #${n} confirmado`, "mint");
        if (ph === 6) push(`Expedição: etiqueta de #${n} gerada`, "accent");
      }, ms),
    );
    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE_MS));
    return () => timers.forEach(clearTimeout);
  }, [inView, cycle]);

  const state = (node: number) => (phase > node * 2 ? "done" : phase === node * 2 ? "active" : "idle");

  const steps = [
    { Icon: Globe, title: "Seu site", work: `Pedido #${order} criado`, done: `Pedido #${order} enviado`, wait: "Aguardando pedido" },
    { Icon: CreditCard, title: "Pagamento", work: "Gerando cobrança no gateway…", done: "Cobrança Pix enviada", wait: "Aguardando pedido", icon: <PaymentIcon run={phase === 2} />, tone: "amber" as const },
    { Icon: CircleCheck, title: "Confirmação", work: "Pago, status sincronizado", done: "Pagamento confirmado", wait: "Aguardando pagamento", icon: <ConfirmIcon run={phase >= 4} cycle={cycle} />, tone: "mint" as const },
    { Icon: Truck, title: "Expedição", work: "Etiqueta gerada, coleta agendada", done: "Pedido liberado", wait: "Aguardando confirmação", icon: <TruckIcon run={phase >= 6} /> },
  ];

  const card = (i: number, width?: string) => {
    const s = steps[i];
    const st = state(i);
    const status = st === "active" || (i === 3 && phase >= 6) ? s.work : st === "done" ? s.done : s.wait;
    return (
      <NodeCard
        width={width}
        Icon={s.Icon}
        iconNode={s.icon}
        tone={s.tone}
        title={s.title}
        state={i === 3 && phase >= 6 ? "active" : st}
        status={status}
        statusKey={`${status}-${cycle}`}
        pulse={st === "active" ? `${i}-${cycle}` : null}
      />
    );
  };

  return (
    <section id="fluxo-pagamento" aria-labelledby="fluxo-pagamento-heading" ref={ref} className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <FlowHeading tag="system.flow" id="fluxo-pagamento-heading" title="Da venda à expedição, sem intervenção manual">
          O pedido passa sozinho pelo site, pelo pagamento e pela expedição. Cada sistema avisa o próximo, e
          ninguém precisa conferir nada à mão.
        </FlowHeading>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass mt-14 rounded-[2rem] p-5 sm:p-8"
        >
          <div className="relative hidden h-36 w-full lg:block">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              {[0, 1, 2].map((i) => (
                <Edge
                  key={i}
                  d={curve(X[i], Y, X[i + 1], Y)}
                  lit={phase >= i * 2 + 1}
                  trigger={phase >= i * 2 + 1 ? `${cycle}-${i}` : null}
                  color={i === 1 ? "#3ddc97" : "#8ba4ff"}
                />
              ))}
            </svg>
            {X.map((x, i) => (
              <Positioned key={i} p={{ x, y: Y }}>
                {card(i, "11.5rem")}
              </Positioned>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 lg:hidden">{steps.map((_, i) => <div key={i}>{card(i, "100%")}</div>)}</div>

          <div className="mt-6 lg:mt-8">
            <EventLog lines={log} title="Integrações" max={4} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
