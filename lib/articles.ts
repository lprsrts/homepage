import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "data/articles");

export interface ArticleFrontMatter {
  title: string;
  date: string;
  slug?: string;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export function getArticles(): Article[] {
  // Ensure directory exists
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const frontMatter = data as ArticleFrontMatter;

      return {
        slug: frontMatter.slug || slug,
        title: frontMatter.title || slug,
        date: frontMatter.date || new Date().toISOString().split("T")[0],
        content,
      };
    });

  // Sort by date, newest first
  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getArticles();
  return articles.find((article) => article.slug === slug) || null;
}

export function saveArticle(article: Article): void {
  const fileName = `${article.slug}.md`;
  const filePath = path.join(articlesDirectory, fileName);

  const frontMatter = {
    title: article.title,
    date: article.date,
    slug: article.slug,
  };

  const fileContent = matter.stringify(article.content, frontMatter);
  fs.writeFileSync(filePath, fileContent, "utf8");
}

export function deleteArticle(slug: string): void {
  const files = fs.readdirSync(articlesDirectory);
  const file = files.find((f) => f.replace(/\.md$/, "") === slug);

  if (file) {
    const filePath = path.join(articlesDirectory, file);
    fs.unlinkSync(filePath);
  }
}
