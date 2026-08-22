"use client";

import { motion } from "framer-motion";

type Node = { id: string; x: number; y: number; label?: string; size: number };

const NODES: Node[] = [
  { id: "core", x: 50, y: 50, label: "EMC", size: 22 },
  { id: "erp", x: 12, y: 22, label: "ERP", size: 12 },
  { id: "ia", x: 86, y: 16, label: "IA", size: 14 },
  { id: "api", x: 90, y: 58, label: "API", size: 11 },
  { id: "crm", x: 18, y: 78, label: "CRM", size: 12 },
  { id: "app", x: 60, y: 90, label: "APP", size: 11 },
  { id: "db", x: 8, y: 52, label: "DB", size: 9 },
  { id: "chat", x: 78, y: 84, label: "CHAT", size: 10 },
];

const LINKS: [string, string][] = [
  ["core", "erp"],
  ["core", "ia"],
  ["core", "api"],
  ["core", "crm"],
  ["core", "app"],
  ["core", "db"],
  ["core", "chat"],
  ["erp", "db"],
  ["ia", "api"],
  ["crm", "app"],
];

function find(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function NodeMesh() {
  return (
    <div
      className="absolute inset-0 select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full opacity-90"
      >
        <defs>
          <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8ba4ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8ba4ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {LINKS.map(([a, b], i) => {
          const from = find(a);
          const to = find(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#linkGrad)"
              strokeWidth={0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: "easeOut" }}
            />
          );
        })}

        {LINKS.map(([a, b], i) => {
          const from = find(a);
          const to = find(b);
          return (
            <motion.circle
              key={`pulse-${a}-${b}`}
              r={0.6}
              fill="#bcd0ff"
              initial={{ opacity: 0 }}
              animate={{
                cx: [from.x, to.x],
                cy: [from.y, to.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.4,
                delay: 1.6 + i * 0.35,
                repeat: Infinity,
                repeatDelay: LINKS.length * 0.35,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {NODES.map((n, i) => (
          <g key={n.id}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.size / 3.2}
              fill="url(#nodeGlow)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0.5, 0.9, 0.5], scale: 1 }}
              transition={{
                opacity: { duration: 3.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" },
                scale: { duration: 0.6, delay: i * 0.08 },
              }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.id === "core" ? 1.6 : 0.9}
              fill={n.id === "core" ? "#ffffff" : "#bcd0ff"}
              stroke={n.id === "core" ? "#5b8cff" : "rgba(140,170,255,0.5)"}
              strokeWidth={n.id === "core" ? 0.4 : 0.25}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
