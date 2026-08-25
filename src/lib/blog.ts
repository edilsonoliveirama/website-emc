import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

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

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPostsMeta().forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
