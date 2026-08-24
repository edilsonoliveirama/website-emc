import { SITE_URL } from "@/lib/contact";

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
];

export function GET() {
  const lines = [
    "User-Agent: *",
    "Allow: /",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "",
    ...AI_CRAWLERS.flatMap((agent) => [`User-Agent: ${agent}`, "Allow: /", ""]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
