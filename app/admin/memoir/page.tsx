"use client";

import { useAuth, getAuthHeaders } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Link from "next/link";

interface MemoirPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: "image" | "video";
  uploadedAt: string;
}

export default function AdminMemoir() {
  const { loading, authenticated } = useAuth();
  const [posts, setPosts] = useState<MemoirPost[]>([]);
  const [editingPost, setEditingPost] = useState<MemoirPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [showMediaBrowser, setShowMediaBrowser] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (authenticated) {
      loadPosts();
    }
  }, [authenticated]);

  const loadPosts = async () => {
    try {
      const res = await fetch("/api/admin/memoir", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  const loadMedia = async () => {
    try {
      const res = await fetch("/api/admin/media", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setMediaItems(data.items);
    } catch (error) {
      console.error("Failed to load media:", error);
    }
  };

  const insertImage = (url: string, filename: string) => {
    if (!editingPost) return;
    const imageMarkdown = `\n![${filename}](${url})\n`;
    setEditingPost({
      ...editingPost,
      content: editingPost.content + imageMarkdown,
    });
    setShowMediaBrowser(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost({
      slug: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
    });
  };

  const handleEdit = (post: MemoirPost) => {
    setIsCreating(false);
    setEditingPost({ ...post });
  };

  const handleSave = async () => {
    if (!editingPost) return;

    try {
      const method = isCreating ? "POST" : "PUT";
      const res = await fetch("/api/admin/memoir", {
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

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/memoir?slug=${slug}`, {
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
            <h1 className="text-4xl font-bold">Memoirs</h1>
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
              <label className="block mb-2 font-medium">Slug</label>
              <input
                type="text"
                value={editingPost.slug}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                disabled={!isCreating}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                placeholder="memoir-post-slug"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Content (Markdown)</label>
                <button
                  onClick={() => {
                    setShowMediaBrowser(true);
                    loadMedia();
                  }}
                  className="px-3 py-1 text-sm rounded font-medium"
                  style={{
                    backgroundColor: "var(--color-accent-2)",
                    color: "var(--color-background)",
                  }}
                >
                  📷 Insert Image
                </button>
              </div>
              <textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
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
                key={post.slug}
                className="p-4 border rounded flex justify-between items-start"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-sm text-muted">{post.date}</p>
                  <p className="text-sm mt-2 text-muted">Slug: {post.slug}</p>
                  <p className="mt-2">{post.excerpt}</p>
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
                    onClick={() => handleDelete(post.slug)}
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

        {/* Media Browser Modal */}
        {showMediaBrowser && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: 50,
            }}
            onClick={() => setShowMediaBrowser(false)}
          >
            <div
              className="max-w-4xl w-full max-h-[80vh] overflow-auto p-6 rounded"
              style={{
                backgroundColor: "var(--color-background)",
                borderColor: "var(--color-accent-2)",
                border: "2px solid",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Select Image</h2>
                <button
                  onClick={() => setShowMediaBrowser(false)}
                  className="px-4 py-2 rounded font-medium"
                  style={{
                    backgroundColor: "var(--color-accent-2)",
                    color: "var(--color-background)",
                  }}
                >
                  Close
                </button>
              </div>

              {mediaItems.length === 0 ? (
                <div className="text-center py-12 text-muted">
                  No images yet. Go to <Link href="/admin/media" className="underline">Media</Link> to upload some.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mediaItems.filter(item => item.type === 'image').map((item) => (
                    <div
                      key={item.id}
                      className="border rounded p-2 cursor-pointer hover:opacity-80"
                      style={{ borderColor: "var(--color-accent-2)" }}
                      onClick={() => insertImage(item.url, item.filename)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.filename}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <p className="text-sm truncate">{item.filename}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
