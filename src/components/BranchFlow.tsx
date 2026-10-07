"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Brain, Bot, Headset, CircleCheck, Loader2 } from "lucide-react";
import { useInView, curve, clock, Edge, NodeCard, EventLog, FlowHeading, Positioned, type LogLine } from "./flows/kit";

type Route = "auto" | "human";

const SCENARIOS: { route: Route; message: string; intent: string; handled: string; outcome: string }[] = [
  {
    route: "auto",
    message: "“Qual o horário de vocês no sábado?”",
    intent: "Dúvida simples · resposta automática",
    handled: "Respondeu em 3s com o horário",
    outcome: "Resolvido sem fila de espera",
  },
  {
    route: "human",
    message: "“Fui cobrado duas vezes no cartão”",
    intent: "Cobrança · caso sensível",
    handled: "Ana assumiu com o histórico completo",
    outcome: "Estorno resolvido pela atendente",
  },
  {
    route: "auto",
    message: "“Meu pedido já saiu para entrega?”",
    intent: "Status de pedido · automático",
    handled: "Enviou o código de rastreio na hora",
    outcome: "Resolvido em 5 segundos",
  },
];

// Node positions in the 0..100 diagram space.
const P = {
  msg: { x: 11, y: 50 },
  ia: { x: 37, y: 50 },
  auto: { x: 64, y: 20 },
  human: { x: 64, y: 80 },
  done: { x: 89, y: 50 },
};

// [ms from cycle start, phase]
const TIMELINE: [number, number][] = [
  [0, 0], // message arrives
  [1000, 1], // comet msg -> IA
  [1900, 2], // IA analysing
  [2900, 3], // IA classified
  [3300, 4], // comet IA -> route
  [4200, 5], // route handling
  [5200, 6], // comet route -> done
  [6100, 7], // done
];
const CYCLE_MS = 8200;

export default function BranchFlow() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState(-1);
  const [log, setLog] = useState<LogLine[]>([]);

  const sc = SCENARIOS[cycle % SCENARIOS.length];

  useEffect(() => {
    if (!inView) return;
    const s = SCENARIOS[cycle % SCENARIOS.length];
    const push = (text: string, tone: LogLine["tone"]) =>
      setLog((l) => [{ id: `${cycle}-${text}`, time: clock(), text, tone }, ...l].slice(0, 6));

    const timers = TIMELINE.map(([ms, ph]) =>
      setTimeout(() => {
        setPhase(ph);
        if (ph === 0) push(`WhatsApp: ${s.message.replace(/[“”]/g, "")}`, "whatsapp");
        if (ph === 3) push(`IA classificou: ${s.intent}`, "accent");
        if (ph === 5) push(s.route === "auto" ? "Agente de IA respondeu o cliente" : "Encaminhado para atendente humano", s.route === "auto" ? "accent" : "amber");
        if (ph === 7) push(`Ticket fechado: ${s.outcome}`, "mint");
      }, ms),
    );
    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE_MS));
    return () => timers.forEach(clearTimeout);
  }, [inView, cycle]);

  const other: Route = sc.route === "auto" ? "human" : "auto";
  const st = (from: number, to: number) => (phase >= to ? "done" : phase >= from ? "active" : "idle");

  const nodes = {
    msg: { state: phase >= 1 ? "done" : phase >= 0 ? "active" : "idle", status: sc.message, statusKey: `m${cycle}` },
    ia: {
      state: st(2, 4),
      status:
        phase === 2 ? (
          <span className="inline-flex items-center gap-1.5">
            <Loader2 className="h-3 w-3 animate-spin text-[var(--accent)]" strokeWidth={3} /> Analisando intenção…
          </span>
        ) : phase >= 3 ? (
          sc.intent
        ) : (
          "Aguardando mensagem"
        ),
      statusKey: phase === 2 ? `a${cycle}` : phase >= 3 ? `c${cycle}` : "w",
    },
    route: { state: st(5, 6), status: phase >= 5 ? sc.handled : "Aguardando decisão da IA", statusKey: phase >= 5 ? `h${cycle}` : "w" },
    other: { state: phase >= 3 ? "dim" : "idle", status: other === "human" ? "Atendente disponível" : "Agente de IA disponível", statusKey: `o${other}` },
    done: { state: phase >= 7 ? "done" : "idle", status: phase >= 7 ? sc.outcome : "Em andamento", statusKey: phase >= 7 ? `d${cycle}` : "w" },
  } as const;

  const routeNode = (r: Route) => (r === sc.route ? nodes.route : nodes.other);
  const trig = (minPhase: number, edge: string) => (phase >= minPhase ? `${cycle}-${edge}` : null);

  const autoNode = routeNode("auto");
  const humanNode = routeNode("human");

  return (
    <section id="fluxo-atendimento" aria-labelledby="fluxo-atendimento-heading" ref={ref} className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <FlowHeading tag="system.route" id="fluxo-atendimento-heading" title="A IA decide o caminho certo para cada caso">
          Dúvida simples, a IA resolve na hora. Caso sensível, um atendente assume já com o histórico da conversa.
          O cliente não percebe a costura por trás.
        </FlowHeading>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass mt-14 rounded-[2rem] p-5 sm:p-8"
        >
          {/* Desktop diagram */}
          <div className="relative hidden aspect-[2.3/1] w-full lg:block">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <Edge d={curve(P.msg.x, P.msg.y, P.ia.x, P.ia.y)} lit={phase >= 1} trigger={trig(1, "m-ia")} />
              <Edge d={curve(P.ia.x, P.ia.y, P.auto.x, P.auto.y)} lit={phase >= 4 && sc.route === "auto"} trigger={sc.route === "auto" ? trig(4, "ia-r") : null} />
              <Edge
                d={curve(P.ia.x, P.ia.y, P.human.x, P.human.y)}
                lit={phase >= 4 && sc.route === "human"}
                trigger={sc.route === "human" ? trig(4, "ia-r") : null}
                color="#ffb454"
              />
              <Edge d={curve(P.auto.x, P.auto.y, P.done.x, P.done.y)} lit={phase >= 6 && sc.route === "auto"} trigger={sc.route === "auto" ? trig(6, "r-d") : null} />
              <Edge
                d={curve(P.human.x, P.human.y, P.done.x, P.done.y)}
                lit={phase >= 6 && sc.route === "human"}
                trigger={sc.route === "human" ? trig(6, "r-d") : null}
                color="#ffb454"
              />
            </svg>

            <Positioned p={P.msg}>
              <NodeCard Icon={MessageCircle} tone="whatsapp" title="Mensagem recebida" state={nodes.msg.state} status={nodes.msg.status} statusKey={nodes.msg.statusKey} />
            </Positioned>
            <Positioned p={P.ia}>
              <NodeCard Icon={Brain} title="IA classifica" state={nodes.ia.state} status={nodes.ia.status} statusKey={nodes.ia.statusKey} pulse={phase >= 2 ? `ia${cycle}` : null} />
            </Positioned>
            <Positioned p={P.auto}>
              <NodeCard Icon={Bot} title="Resolve automaticamente" state={autoNode.state} status={autoNode.status} statusKey={autoNode.statusKey} />
            </Positioned>
            <Positioned p={P.human}>
              <NodeCard Icon={Headset} tone="amber" title="Escala para humano" state={humanNode.state} status={humanNode.status} statusKey={humanNode.statusKey} />
            </Positioned>
            <Positioned p={P.done}>
              <NodeCard Icon={CircleCheck} tone="mint" title="Cliente atendido" state={nodes.done.state} status={nodes.done.status} statusKey={nodes.done.statusKey} pulse={phase >= 7 ? `d${cycle}` : null} />
            </Positioned>
          </div>

          {/* Mobile: vertical story */}
          <div className="flex flex-col items-stretch gap-2.5 lg:hidden">
            <NodeCard width="100%" Icon={MessageCircle} tone="whatsapp" title="Mensagem recebida" state={nodes.msg.state} status={nodes.msg.status} statusKey={nodes.msg.statusKey} />
            <NodeCard width="100%" Icon={Brain} title="IA classifica" state={nodes.ia.state} status={nodes.ia.status} statusKey={nodes.ia.statusKey} />
            <NodeCard
              width="100%"
              Icon={sc.route === "auto" ? Bot : Headset}
              tone={sc.route === "auto" ? "accent" : "amber"}
              title={sc.route === "auto" ? "Resolve automaticamente" : "Escala para humano"}
              state={nodes.route.state}
              status={nodes.route.status}
              statusKey={nodes.route.statusKey}
            />
            <NodeCard width="100%" Icon={CircleCheck} tone="mint" title="Cliente atendido" state={nodes.done.state} status={nodes.done.status} statusKey={nodes.done.statusKey} />
          </div>

          <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <EventLog lines={log} />
            <div className="flex items-center gap-2 lg:flex-col lg:items-end">
              <span className="mono-label text-[10px] text-fg-dim">rota ativa</span>
              <span
                className={`mono-label rounded-full border px-3 py-1 text-[11px] transition-colors ${
                  sc.route === "auto"
                    ? "border-[var(--panel-border-strong)] bg-[var(--accent-soft)] text-[#bcd0ff]"
                    : "border-[var(--accent-amber)]/40 bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]"
                }`}
              >
                {sc.route === "auto" ? "resposta automática" : "atendimento humano"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

