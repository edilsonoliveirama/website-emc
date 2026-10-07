"use client";

import { useRef, useState, type HTMLAttributes } from "react";
import { Check, Copy } from "lucide-react";

const LANG_LABEL: Record<string, string> = {
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  javascript: "JavaScript",
  json: "JSON",
  python: "Python",
  py: "Python",
  bash: "Terminal",
  sh: "Terminal",
  sql: "SQL",
  text: "Texto",
  plaintext: "Texto",
};

export default function CodeBlock({ children, className = "", ...props }: HTMLAttributes<HTMLPreElement> & { "data-language"?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const lang = props["data-language"];

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable: leave the code selectable as a fallback.
    }
  }

  return (
    <div className="code-block group/code relative mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0e1a]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          {lang && <span className="mono-label ml-2 text-[10px] text-fg-dim">{LANG_LABEL[lang] ?? lang}</span>}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copiar código"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-fg-dim transition-colors hover:bg-white/5 hover:text-fg"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[var(--accent-mint)]" strokeWidth={2.6} /> : <Copy className="h-3.5 w-3.5" strokeWidth={2} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre
        ref={ref}
        {...props}
        className={`overflow-x-auto p-4 font-[family-name:var(--font-mono)] text-[0.85em] leading-relaxed [&>code]:bg-transparent [&>code]:p-0 ${className}`}
      >
        {children}
      </pre>
    </div>
  );
}
