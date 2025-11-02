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

  // Check if file with this slug already exists (might have different filename)
  let filePath: string;
  const files = fs.readdirSync(directory);
  const existingFile = files.find((f) => {
    if (!f.endsWith(".md")) return false;
    try {
      const fullPath = path.join(directory, f);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const frontMatter = data as ContentFrontMatter;
      return (frontMatter.slug || f.replace(/\.md$/, "")) === content.slug;
    } catch {
      return false;
    }
  });

  if (existingFile) {
    // Update existing file
    filePath = path.join(directory, existingFile);
  } else {
    // Create new file
    const fileName = `${content.slug}.md`;
    filePath = path.join(directory, fileName);
  }

  // Filter out undefined values to prevent YAML serialization errors
  const frontMatter: Record<string, string> = {
    title: content.title,
    date: content.date,
    slug: content.slug,
  };

  // Only add optional fields if they have values
  if (content.excerpt) {
    frontMatter.excerpt = content.excerpt;
  }
  if (content.language) {
    frontMatter.language = content.language;
  }

  const fileContent = matter.stringify(content.content, frontMatter);
  fs.writeFileSync(filePath, fileContent, "utf8");
}

function deleteContentFromDirectory(directory: string, slug: string): void {
  const files = fs.readdirSync(directory);
  // Find file by checking slug in frontmatter, not just filename
  const file = files.find((f) => {
    if (!f.endsWith(".md")) return false;
    try {
      const fullPath = path.join(directory, f);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const frontMatter = data as ContentFrontMatter;
      return (frontMatter.slug || f.replace(/\.md$/, "")) === slug;
    } catch {
      return false;
    }
  });

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
