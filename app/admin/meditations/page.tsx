"use client";

import { useAuth, getAuthHeaders } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Meditation {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export default function AdminMeditations() {
  const { loading, authenticated } = useAuth();
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [editingMeditation, setEditingMeditation] = useState<Meditation | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authenticated) {
      loadMeditations();
    }
  }, [authenticated]);

  const loadMeditations = async () => {
    try {
      const res = await fetch("/api/admin/meditations", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setMeditations(data.meditations || []);
    } catch (error) {
      console.error("Failed to load meditations:", error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingMeditation({
      slug: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
    });
  };

  const handleEdit = (meditation: Meditation) => {
    setIsCreating(false);
    setEditingMeditation({ ...meditation });
  };

  const handleSave = async () => {
    if (!editingMeditation) return;

    try {
      const method = isCreating ? "POST" : "PUT";
      const res = await fetch("/api/admin/meditations", {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(editingMeditation),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage("Meditation saved successfully!");
      setEditingMeditation(null);
      setIsCreating(false);
      loadMeditations();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save meditation");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this meditation?")) return;

    try {
      const res = await fetch(`/api/admin/meditations?slug=${slug}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMessage("Meditation deleted successfully!");
      loadMeditations();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete meditation");
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
            <h1 className="text-4xl font-bold italic">Meditations</h1>
            {!editingMeditation && (
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-2)",
                  color: "var(--color-background)",
                }}
              >
                New Meditation
              </button>
            )}
          </div>
        </div>

        {message && (
          <div
            className="p-4 mb-6 rounded"
            style={{
              backgroundColor: "var(--color-accent-2)",
              color: "var(--color-background)",
            }}
          >
            {message}
          </div>
        )}

        {editingMeditation ? (
          <div
            className="space-y-4 p-6 border-2 rounded"
            style={{ borderColor: "var(--color-accent-2)" }}
          >
            <h2 className="text-2xl font-bold">
              {isCreating ? "New Meditation" : "Edit Meditation"}
            </h2>

            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                value={editingMeditation.title}
                onChange={(e) =>
                  setEditingMeditation({ ...editingMeditation, title: e.target.value })
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
                value={editingMeditation.date}
                onChange={(e) =>
                  setEditingMeditation({ ...editingMeditation, date: e.target.value })
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
              <label className="block mb-2 font-medium">Excerpt</label>
              <textarea
                value={editingMeditation.excerpt}
                onChange={(e) =>
                  setEditingMeditation({
                    ...editingMeditation,
                    excerpt: e.target.value,
                  })
                }
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
                value={editingMeditation.slug}
                onChange={(e) =>
                  setEditingMeditation({ ...editingMeditation, slug: e.target.value })
                }
                disabled={!isCreating}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                placeholder="meditation-slug"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Content (Markdown)
              </label>
              <textarea
                value={editingMeditation.content}
                onChange={(e) =>
                  setEditingMeditation({
                    ...editingMeditation,
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
                  backgroundColor: "var(--color-accent-2)",
                  color: "var(--color-background)",
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingMeditation(null);
                  setIsCreating(false);
                }}
                className="flex-1 p-3 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-1)",
                  color: "var(--color-background)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {meditations.map((meditation) => (
              <div
                key={meditation.slug}
                className="p-4 border-2 rounded flex justify-between items-start"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div>
                  <h3 className="text-xl font-bold italic">{meditation.title}</h3>
                  <p className="text-sm text-muted">{meditation.date}</p>
                  <p className="text-sm mt-2 text-muted">Slug: {meditation.slug}</p>
                  <p className="mt-2 italic">&ldquo;{meditation.excerpt}&rdquo;</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(meditation)}
                    className="px-4 py-2 rounded font-medium"
                    style={{
                      backgroundColor: "var(--color-accent-2)",
                      color: "var(--color-background)",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(meditation.slug)}
                    className="px-4 py-2 rounded font-medium"
                    style={{
                      backgroundColor: "var(--color-accent-1)",
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
