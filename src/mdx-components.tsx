import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

const components: MDXComponents = {
  h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 scroll-mt-28 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-fg"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 scroll-mt-28 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-fg"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 text-[1.0625rem] leading-[1.8] text-fg" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-5 list-disc space-y-2.5 pl-6 text-[1.0625rem] text-fg" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-[1.0625rem] text-fg" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1 leading-[1.8]" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="glass mt-6 rounded-xl border-l-2 border-l-[var(--accent)] px-5 py-4 text-[1.0625rem] leading-[1.8] text-fg-muted italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href) return <a {...props}>{children}</a>;
    if (isExternal(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] underline underline-offset-4 decoration-[var(--panel-border-strong)] transition-colors hover:decoration-[var(--accent)]"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-[var(--accent)] underline underline-offset-4 decoration-[var(--panel-border-strong)] transition-colors hover:decoration-[var(--accent)]"
      >
        {children}
      </Link>
    );
  },
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-[var(--panel-border)]" {...props} />
  ),
  strong: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-fg" {...props}>
      {children}
    </strong>
  ),
  table: ({ children, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--panel-border)]">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-white/[0.04] text-left text-fg" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border-b border-[var(--panel-border)] px-4 py-2.5 font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-[var(--panel-border)] px-4 py-2.5 text-fg-muted" {...props}>
      {children}
    </td>
  ),
  // Inline `code`. Fenced blocks are handled by rehype-pretty-code, which
  // wraps them in <pre><code data-language>, bypassing this component.
  code: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.85em] text-[var(--accent-mint)]"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="glass mt-6 overflow-x-auto rounded-xl border-[var(--panel-border)] p-4 text-[0.85em] leading-relaxed font-[family-name:var(--font-mono)] [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    >
      {children}
    </pre>
  ),
};

export function useMDXComponents(overrides: MDXComponents = {}): MDXComponents {
  return { ...components, ...overrides };
}
