import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "data/blog");
const meditationsDirectory = path.join(process.cwd(), "data/meditations");

export interface ContentFrontMatter {
  title: string;
  date: string;
  slug?: string;
  excerpt?: string;
  language?: string;
}

export interface Content {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  language?: string;
}

function getContentFromDirectory(directory: string): Content[] {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  const contents = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const frontMatter = data as ContentFrontMatter;

      return {
        slug: frontMatter.slug || slug,
        title: frontMatter.title || slug,
        date: frontMatter.date || new Date().toISOString().split("T")[0],
        excerpt: frontMatter.excerpt || content.substring(0, 150).replace(/\n/g, " ") + "...",
        content,
        language: frontMatter.language,
      };
    });

  contents.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return contents;
}

function getContentBySlugFromDirectory(
  directory: string,
  slug: string
): Content | null {
  const contents = getContentFromDirectory(directory);
  return contents.find((content) => content.slug === slug) || null;
}

function saveContentToDirectory(directory: string, content: Content): void {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const fileName = `${content.slug}.md`;
  const filePath = path.join(directory, fileName);

  const frontMatter = {
    title: content.title,
    date: content.date,
    slug: content.slug,
    excerpt: content.excerpt,
    language: content.language,
  };

  const fileContent = matter.stringify(content.content, frontMatter);
  fs.writeFileSync(filePath, fileContent, "utf8");
}

function deleteContentFromDirectory(directory: string, slug: string): void {
  const files = fs.readdirSync(directory);
  const file = files.find((f) => f.replace(/\.md$/, "") === slug);

  if (file) {
    const filePath = path.join(directory, file);
    fs.unlinkSync(filePath);
  }
}

// Blog functions
export function getBlogPosts(): Content[] {
  return getContentFromDirectory(blogDirectory);
}

export function getBlogPostBySlug(slug: string): Content | null {
  return getContentBySlugFromDirectory(blogDirectory, slug);
}

export function saveBlogPost(content: Content): void {
  saveContentToDirectory(blogDirectory, content);
}

export function deleteBlogPost(slug: string): void {
  deleteContentFromDirectory(blogDirectory, slug);
}

// Meditation functions
export function getMeditations(): Content[] {
  return getContentFromDirectory(meditationsDirectory);
}

export function getMeditationBySlug(slug: string): Content | null {
  return getContentBySlugFromDirectory(meditationsDirectory, slug);
}

export function saveMeditation(content: Content): void {
  saveContentToDirectory(meditationsDirectory, content);
}

export function deleteMeditation(slug: string): void {
  deleteContentFromDirectory(meditationsDirectory, slug);
}
