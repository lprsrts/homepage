"use client";

import { useAuth, getAuthHeaders } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  published: boolean;
}

export default function AdminBlog() {
  const { loading, authenticated } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authenticated) {
      loadPosts();
    }
  }, [authenticated]);

  const loadPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost({
      id: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
      published: true,
    });
  };

  const handleEdit = (post: BlogPost) => {
    setIsCreating(false);
    setEditingPost({ ...post });
  };

  const handleSave = async () => {
    if (!editingPost) return;

    try {
      const method = isCreating ? "POST" : "PUT";
      const res = await fetch("/api/admin/blog", {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(editingPost),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage("Post saved successfully!");
      setEditingPost(null);
      setIsCreating(false);
      loadPosts();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMessage("Post deleted successfully!");
      loadPosts();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete post");
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
          <Link href="/admin/dashboard" className="text-sm hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Blog Posts</h1>
            {!editingPost && (
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-1)",
                  color: "var(--color-background)",
                }}
              >
                New Post
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

        {editingPost ? (
          <div className="space-y-4 p-6 border rounded" style={{ borderColor: "var(--color-accent-2)" }}>
            <h2 className="text-2xl font-bold">{isCreating ? "New Post" : "Edit Post"}</h2>
            
            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
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
                value={editingPost.date}
                onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Excerpt</label>
              <textarea
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                rows={3}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Content</label>
              <textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                rows={10}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={editingPost.published}
                onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
              />
              <label htmlFor="published">Published</label>
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
                  setEditingPost(null);
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
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 border rounded flex justify-between items-start"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-sm text-muted">{post.date}</p>
                  <p className="mt-2">{post.excerpt}</p>
                  <p className="text-sm mt-2">
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: post.published
                          ? "var(--color-accent-1)"
                          : "var(--color-accent-2)",
                        color: "var(--color-background)",
                      }}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 rounded font-medium"
                    style={{
                      backgroundColor: "var(--color-accent-1)",
                      color: "var(--color-background)",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
