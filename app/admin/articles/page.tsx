"use client";

import { useAuth, getAuthHeaders } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export default function AdminArticles() {
  const { loading, authenticated } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authenticated) {
      loadArticles();
    }
  }, [authenticated]);

  const loadArticles = async () => {
    try {
      const res = await fetch("/api/admin/articles", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingArticle({
      slug: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      content: "",
    });
  };

  const handleEdit = (article: Article) => {
    setIsCreating(false);
    setEditingArticle({ ...article });
  };

  const handleSave = async () => {
    if (!editingArticle) return;

    try {
      const method = isCreating ? "POST" : "PUT";
      const res = await fetch("/api/admin/articles", {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(editingArticle),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage("Article saved successfully!");
      setEditingArticle(null);
      setIsCreating(false);
      loadArticles();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save article");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/admin/articles?slug=${slug}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMessage("Article deleted successfully!");
      loadArticles();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete article");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="text-sm hover:underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Articles</h1>
            {!editingArticle && (
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-1)",
                  color: "var(--color-background)",
                }}
              >
                New Article
              </button>
            )}
          </div>
        </div>

        {message && (
          <div
            className="p-4 mb-6 rounded"
            style={{
              backgroundColor: "var(--color-accent-1)",
              color: "var(--color-background)",
            }}
          >
            {message}
          </div>
        )}

        {editingArticle ? (
          <div
            className="space-y-4 p-6 border rounded"
            style={{ borderColor: "var(--color-accent-2)" }}
          >
            <h2 className="text-2xl font-bold">
              {isCreating ? "New Article" : "Edit Article"}
            </h2>

            <div>
              <label className="block mb-2 font-medium">Slug</label>
              <input
                type="text"
                value={editingArticle.slug}
                onChange={(e) =>
                  setEditingArticle({ ...editingArticle, slug: e.target.value })
                }
                disabled={!isCreating}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                value={editingArticle.title}
                onChange={(e) =>
                  setEditingArticle({ ...editingArticle, title: e.target.value })
                }
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Date</label>
              <input
                type="date"
                value={editingArticle.date}
                onChange={(e) =>
                  setEditingArticle({ ...editingArticle, date: e.target.value })
                }
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Content (Markdown)
              </label>
              <textarea
                value={editingArticle.content}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    content: e.target.value,
                  })
                }
                rows={15}
                className="w-full p-3 border rounded font-mono text-sm"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 p-3 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-1)",
                  color: "var(--color-background)",
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingArticle(null);
                  setIsCreating(false);
                }}
                className="flex-1 p-3 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-2)",
                  color: "var(--color-background)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.slug}
                className="p-4 border rounded flex justify-between items-start"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div>
                  <h3 className="text-xl font-bold">{article.title}</h3>
                  <p className="text-sm text-muted">{article.date}</p>
                  <p className="text-sm mt-2 text-muted">Slug: {article.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="px-4 py-2 rounded font-medium"
                    style={{
                      backgroundColor: "var(--color-accent-1)",
                      color: "var(--color-background)",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.slug)}
                    className="px-4 py-2 rounded font-medium"
                    style={{
                      backgroundColor: "var(--color-accent-2)",
                      color: "var(--color-background)",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
