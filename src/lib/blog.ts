import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  coverImage?: string;
  draft?: boolean;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingMinutes: number;
};

function listSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readFrontmatter(slug: string): { data: BlogFrontmatter; content: string } {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as BlogFrontmatter, content };
}

export function getAllPostsMeta(): BlogPostMeta[] {
  const posts = listSlugs()
    .map((slug) => {
      const { data, content } = readFrontmatter(slug);
      return {
        ...data,
        slug,
        readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
      };
    })
    .filter((post) => process.env.NODE_ENV === "development" || !post.draft);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return listSlugs();
}

export function getPostMeta(slug: string): BlogPostMeta | null {
  const slugs = listSlugs();
  if (!slugs.includes(slug)) return null;
  const { data, content } = readFrontmatter(slug);
  return {
    ...data,
    slug,
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

export type Heading = { id: string; text: string };

/** H2 headings of a post, with the same ids rehype-slug assigns, for the table of contents. */
export function getPostHeadings(slug: string): Heading[] {
  const { content } = readFrontmatter(slug);
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of content.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    // rehype-slug slugs every heading, so h3+ must advance the slugger too to keep ids in sync.
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    const id = slugger.slug(text);
    if (m[1].length === 2) headings.push({ id, text });
  }
  return headings;
}

/** Posts sharing the most tags with `slug`, newest first among ties. */
export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const all = getAllPostsMeta();
  const current = all.find((p) => p.slug === slug);
  const tags = new Set(current?.tags ?? []);
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: (p.tags ?? []).filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map(({ p }) => p);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPostsMeta().forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
