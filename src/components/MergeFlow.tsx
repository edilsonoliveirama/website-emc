"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Store, Network, LayoutDashboard, RefreshCw } from "lucide-react";
import { useInView, curve, clock, Edge, NodeCard, EventLog, FlowHeading, Positioned, type LogLine } from "./flows/kit";

const STORES = [
  { id: "A", name: "Loja Centro", p: { x: 12, y: 18 } },
  { id: "B", name: "Loja Shopping", p: { x: 12, y: 50 } },
  { id: "C", name: "Loja Bairro", p: { x: 12, y: 82 } },
];
const HUB = { x: 47, y: 50 };
const DASH = { x: 84, y: 50 };

const INCREMENTS = [3, 1, 2, 4, 2, 3, 1, 2];
const TICK_MS = 2000;
const TO_HUB_MS = 800;
const TO_DASH_MS = 650;

export default function MergeFlow() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [tick, setTick] = useState(-1);
  const [counts, setCounts] = useState([48, 36, 52]);
  const [synced, setSynced] = useState([48, 36, 52]);
  const [stage, setStage] = useState<"send" | "hub" | "dash">("dash");
  const [log, setLog] = useState<LogLine[]>([]);

  const active = tick >= 0 ? tick % STORES.length : -1;

  // Start of each sync: the store registers the sale and starts sending.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(
      () => {
        const next = tick + 1;
        const i = next % STORES.length;
        const inc = INCREMENTS[next % INCREMENTS.length];
        setTick(next);
        setStage("send");
        setCounts((c) => c.map((v, j) => (j === i ? v + inc : v)));
      },
      tick < 0 ? 400 : TICK_MS,
    );
    return () => clearTimeout(t);
  }, [inView, tick]);

  // Packet reaches the hub, then the dashboard.
  useEffect(() => {
    if (tick < 0) return;
    const i = tick % STORES.length;
    const inc = INCREMENTS[tick % INCREMENTS.length];
    const t1 = setTimeout(() => setStage("hub"), TO_HUB_MS);
    const t2 = setTimeout(() => {
      setStage("dash");
      setSynced((c) => c.map((v, j) => (j === i ? v + inc : v)));
      setLog((l) =>
        [{ id: tick, time: clock(), text: `${STORES[i].name} sincronizou +${inc} ${inc === 1 ? "venda" : "vendas"}`, tone: "mint" as const }, ...l].slice(0, 6),
      );
    }, TO_HUB_MS + TO_DASH_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [tick]);

  const total = synced.reduce((a, b) => a + b, 0);
  const max = Math.max(...synced);

  const dashboard = <Dashboard total={total} synced={synced} max={max} flash={stage === "dash" && tick >= 0 ? tick : null} />;

  return (
    <section id="fluxo-filiais" aria-labelledby="fluxo-filiais-heading" ref={ref} className="section-divider relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <FlowHeading tag="system.merge" id="fluxo-filiais-heading" title="Várias filiais, uma única fonte de verdade">
          Cada loja envia suas vendas para a central assim que acontecem. Sem planilha no fim do mês: o
          painel consolidado já mostra a empresa inteira, agora.
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
              {STORES.map((s, i) => (
                <Edge
                  key={s.id}
                  d={curve(s.p.x, s.p.y, HUB.x, HUB.y)}
                  lit={i === active}
                  trigger={i === active ? `s${tick}` : null}
                  duration={TO_HUB_MS / 1000}
                />
              ))}
              <Edge
                d={curve(HUB.x, HUB.y, DASH.x, DASH.y)}
                lit
                trigger={tick >= 0 && stage !== "send" ? `h${tick}` : null}
                duration={TO_DASH_MS / 1000}
                color="#3ddc97"
              />
            </svg>

            {STORES.map((s, i) => (
              <Positioned key={s.id} p={s.p}>
                <NodeCard
                  Icon={Store}
                  title={s.name}
                  width="10.5rem"
                  state={i === active && stage === "send" ? "active" : "idle"}
                  status={
                    <span className="flex items-center justify-between gap-2">
                      <span>
                        <span className="font-semibold tabular-nums text-fg">{counts[i]}</span> vendas hoje
                      </span>
                      {i === active && stage === "send" && <RefreshCw className="h-3 w-3 animate-spin text-[var(--accent)]" strokeWidth={2.5} />}
                    </span>
                  }
                  statusKey={`${s.id}`}
                />
              </Positioned>
            ))}

            <Positioned p={HUB}>
              <NodeCard
                Icon={Network}
                title="Central EMC"
                width="10.5rem"
                state={stage === "hub" ? "active" : "idle"}
                pulse={stage === "hub" ? `hub${tick}` : null}
                status={stage === "hub" && active >= 0 ? `Recebendo da ${STORES[active].name}` : "Consolidando em tempo real"}
              />
            </Positioned>

            <Positioned p={DASH}>{dashboard}</Positioned>
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-2.5 lg:hidden">
            <div className="grid grid-cols-3 gap-2">
              {STORES.map((s, i) => (
                <div
                  key={s.id}
                  className={`rounded-xl border bg-[#0b1120] p-2.5 text-center transition-colors duration-500 ${
                    i === active && stage === "send" ? "border-[var(--panel-border-strong)]" : "border-white/[0.07]"
                  }`}
                >
                  <Store className="mx-auto h-4 w-4 text-[var(--accent)]" strokeWidth={1.9} />
                  <div className="mt-1 truncate text-[10.5px] text-fg-muted">{s.name}</div>
                  <div className="text-sm font-semibold tabular-nums text-fg">{counts[i]}</div>
                </div>
              ))}
            </div>
            <NodeCard
              width="100%"
              Icon={Network}
              title="Central EMC"
              state={stage === "hub" ? "active" : "idle"}
              status={stage === "hub" && active >= 0 ? `Recebendo da ${STORES[active].name}` : "Consolidando em tempo real"}
            />
            <div className="[&>div]:!w-full">{dashboard}</div>
          </div>

          <div className="mt-6 lg:mt-8">
            <EventLog lines={log} title="Sincronização" max={3} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Dashboard({ total, synced, max, flash }: { total: number; synced: number[]; max: number; flash: number | null }) {
  return (
    <div className="relative w-[15rem] rounded-2xl border border-[var(--accent-mint)]/30 bg-[#0b1120] p-4 shadow-[0_0_0_1px_rgba(61,220,151,0.1),0_20px_50px_-20px_rgba(61,220,151,0.35)]">
      <AnimatePresence>
        {flash !== null && (
          <motion.span
            key={flash}
            className="pointer-events-none absolute inset-0 rounded-2xl border border-[var(--accent-mint)]"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-mint-soft)] text-[var(--accent-mint)]">
          <LayoutDashboard className="h-4 w-4" strokeWidth={1.9} />
        </span>
        <div className="leading-tight">
          <div className="text-[12.5px] font-semibold text-fg">Painel consolidado</div>
          <div className="text-[10px] text-fg-dim">todas as lojas</div>
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={total}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="font-[family-name:var(--font-display)] text-3xl font-semibold tabular-nums text-fg"
          >
            {total}
          </motion.span>
        </AnimatePresence>
        <span className="text-[11px] text-fg-muted">vendas hoje</span>
      </div>

      <div className="mt-3 space-y-2">
        {STORES.map((s, i) => (
          <div key={s.id}>
            <div className="flex justify-between text-[10.5px]">
              <span className="text-fg-muted">{s.name}</span>
              <span className="tabular-nums text-fg">{synced[i]}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-mint)]"
                animate={{ width: `${(synced[i] / max) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-fg-dim">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-mint)]" />
        Atualizado agora
      </div>
    </div>
  );
}

