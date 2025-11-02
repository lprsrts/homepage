"use client";

import { useAuth, getAuthHeaders } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Update {
  id: string;
  name?: string;
  date: string;
  content: string;
  category?: string;
}

const CATEGORIES = [
  { value: "", label: "None" },
  { value: "release", label: "Release" },
  { value: "update", label: "Update" },
  { value: "announcement", label: "Announcement" },
  { value: "news", label: "News" },
];

export default function AdminUpdates() {
  const { loading, authenticated } = useAuth();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authenticated) {
      loadUpdates();
    }
  }, [authenticated]);

  const loadUpdates = async () => {
    try {
      const res = await fetch("/api/admin/updates", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setUpdates(data.updates || []);
    } catch (error) {
      console.error("Failed to load updates:", error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingUpdate({
      id: "",
      name: "",
      date: new Date().toISOString().split("T")[0],
      content: "",
      category: "",
    });
  };

  const handleEdit = (update: Update) => {
    setIsCreating(false);
    setEditingUpdate({ ...update });
  };

  const handleSave = async () => {
    if (!editingUpdate) return;

    try {
      const method = isCreating ? "POST" : "PUT";
      const res = await fetch("/api/admin/updates", {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(editingUpdate),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage("Update saved successfully!");
      setEditingUpdate(null);
      setIsCreating(false);
      loadUpdates();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this update?")) return;

    try {
      const res = await fetch(`/api/admin/updates?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMessage("Update deleted successfully!");
      loadUpdates();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete update");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
            <h1 className="text-4xl font-bold">Updates</h1>
            {!editingUpdate && (
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-1)",
                  color: "var(--color-background)",
                }}
              >
                New Update
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

        {editingUpdate ? (
          <div className="space-y-4 p-6 border rounded" style={{ borderColor: "var(--color-accent-2)" }}>
            <h2 className="text-2xl font-bold">{isCreating ? "New Update" : "Edit Update"}</h2>
            
            <div>
              <label className="block mb-2 font-medium">Name (optional)</label>
              <input
                type="text"
                value={editingUpdate.name || ""}
                onChange={(e) => setEditingUpdate({ ...editingUpdate, name: e.target.value || undefined })}
                placeholder="e.g., Homepage v1.3.0"
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
                value={editingUpdate.date}
                onChange={(e) => setEditingUpdate({ ...editingUpdate, date: e.target.value })}
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
                value={editingUpdate.content}
                onChange={(e) => setEditingUpdate({ ...editingUpdate, content: e.target.value })}
                rows={4}
                placeholder="What's new?"
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Category (optional)</label>
              <select
                value={editingUpdate.category || ""}
                onChange={(e) => setEditingUpdate({ ...editingUpdate, category: e.target.value || undefined })}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
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
                  setEditingUpdate(null);
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
            {updates.length === 0 ? (
              <p className="text-muted">No updates yet.</p>
            ) : (
              updates.map((update) => (
                <div
                  key={update.id}
                  className="p-4 border rounded flex gap-6 items-start"
                  style={{ borderColor: "var(--color-accent-2)" }}
                >
                  <div className="flex-1">
                    {update.name && (
                      <h3 className="font-semibold mb-1">{update.name}</h3>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <time className="text-sm text-muted min-w-[100px]">
                        {formatDate(update.date)}
                      </time>
                      {update.category && (
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: "var(--color-accent-2)",
                            color: "var(--color-background)",
                          }}
                        >
                          {update.category}
                        </span>
                      )}
                    </div>
                    <p>{update.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(update)}
                      className="px-4 py-2 rounded font-medium"
                      style={{
                        backgroundColor: "var(--color-accent-1)",
                        color: "var(--color-background)",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(update.id)}
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
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
