"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data.article);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load article:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="content-container">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-4">Article not found</h1>
        <Link href="/articles" className="nav-link">
          Back to Articles
        </Link>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="content-container">
      <div className="mb-8">
        <Link href="/articles" className="text-sm hover:underline">
          ← Back to Articles
        </Link>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <time className="text-muted">{formatDate(article.date)}</time>
        </header>

        <div
          className="prose prose-lg max-w-none"
          style={{
            color: "var(--color-shade-2)",
          }}
        >
          {article.content.split("\n").map((paragraph, index) => {
            if (paragraph.trim().startsWith("#")) {
              const level = paragraph.match(/^#+/)?.[0].length || 1;
              const text = paragraph.replace(/^#+\s*/, "");
              const Tag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
              return (
                <Tag key={index} className={`text-${4 - level}xl font-bold my-4`}>
                  {text}
                </Tag>
              );
            }
            if (paragraph.trim()) {
              return (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
        </div>
      </article>

      <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--color-accent-2)" }}>
        <Link href="/articles" className="nav-link">
          ← Back to Articles
        </Link>
      </div>
    </main>
  );
}
