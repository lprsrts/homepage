"use client";

import { useEffect, useState } from "react";
import Deck from "@/components/Deck";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  date: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load articles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="deck">
        <div className="site-title">Loading...</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Articles</h1>
          <p className="text-lg mb-8">No articles yet.</p>
          <Link href="/" className="nav-link">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return <Deck articles={articles} title="Articles" />;
}
