"use client";

import Navigation from "@/components/Navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(console.error);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border p-6"
              style={{ borderColor: "var(--color-accent-2)" }}
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold mb-3 hover:underline">{post.title}</h2>
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-sm text-muted">{formatDate(post.date)}</p>
                {post.language && (
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "var(--color-accent-2)", opacity: 0.6 }}>
                    {post.language}
                  </span>
                )}
              </div>
              <p className="mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm hover:underline"
              >
                Read Post →
              </Link>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-muted py-12">No blog posts yet.</p>
        )}
      </main>
    </>
  );
}
