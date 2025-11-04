"use client";

import { useAuth, getAuthHeaders } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Link from "next/link";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: "image" | "video";
  uploadedAt: string;
}

export default function AdminMedia() {
  const { loading, authenticated } = useAuth();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<MediaItem> | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'url'>('upload');

  useEffect(() => {
    if (authenticated) {
      loadMedia();
    }
  }, [authenticated]);

  const loadMedia = async () => {
    try {
      const res = await fetch("/api/admin/media", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setItems(data.items);
    } catch (error) {
      console.error("Failed to load media:", error);
    }
  };

  const handleCreate = () => {
    setNewItem({
      filename: "",
      url: "",
      type: "image",
    });
    setUploadMode('upload');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'sketches'); // or 'uploads' - you can make this configurable

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      
      // Update the form with the uploaded file info
      setNewItem(prev => ({
        ...prev,
        filename: data.originalName,
        url: data.url,
        type: data.type.startsWith('image/') ? 'image' : 'video',
      }));

      setMessage('File uploaded successfully! Click Save to add to media library.');
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!newItem || !newItem.filename || !newItem.url || !newItem.type) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage("Media item added successfully!");
      setNewItem(null);
      loadMedia();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save media item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMessage("Media item deleted successfully!");
      loadMedia();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete media item");
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
            <h1 className="text-4xl font-bold">Media</h1>
            {!newItem && (
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-1)",
                  color: "var(--color-background)",
                }}
              >
                Add Media
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

        {newItem ? (
          <div className="space-y-4 p-6 border rounded mb-6" style={{ borderColor: "var(--color-accent-2)" }}>
            <h2 className="text-2xl font-bold">Add New Media</h2>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setUploadMode('upload')}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: uploadMode === 'upload' ? "var(--color-accent-1)" : "var(--color-accent-2)",
                  color: "var(--color-background)",
                }}
              >
                Upload File
              </button>
              <button
                onClick={() => setUploadMode('url')}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: uploadMode === 'url' ? "var(--color-accent-1)" : "var(--color-accent-2)",
                  color: "var(--color-background)",
                }}
              >
                Enter URL
              </button>
            </div>

            {uploadMode === 'upload' && (
              <div>
                <label className="block mb-2 font-medium">Select File</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="w-full p-3 border rounded"
                  style={{
                    borderColor: "var(--color-accent-2)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                />
                {uploading && <p className="text-sm mt-2 text-muted">Uploading...</p>}
              </div>
            )}

            <div>
              <label className="block mb-2 font-medium">Filename</label>
              <input
                type="text"
                value={newItem.filename || ""}
                onChange={(e) => setNewItem({ ...newItem, filename: e.target.value })}
                placeholder="my-image.jpg"
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                readOnly={uploadMode === 'upload'}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">URL</label>
              <input
                type="text"
                value={newItem.url || ""}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                placeholder="/images/my-image.jpg or https://..."
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                readOnly={uploadMode === 'upload'}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Type</label>
              <select
                value={newItem.type || "image"}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as "image" | "video" })}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
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
                onClick={() => setNewItem(null)}
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
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded"
              style={{ borderColor: "var(--color-accent-2)" }}
            >
              {item.type === "image" && item.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              {item.type === "video" && (
                <div
                  className="w-full h-48 flex items-center justify-center rounded mb-3"
                  style={{ backgroundColor: "var(--color-accent-2)" }}
                >
                  <span style={{ color: "var(--color-background)" }}>🎥 Video</span>
                </div>
              )}
              <h3 className="font-bold">{item.filename}</h3>
              <p className="text-sm text-muted truncate">{item.url}</p>
              <p className="text-xs text-muted mt-1">
                {new Date(item.uploadedAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-3 w-full px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-2)",
                  color: "var(--color-background)",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {items.length === 0 && !newItem && (
          <div className="text-center py-12 text-muted">
            No media items yet. Click &quot;Add Media&quot; to get started.
          </div>
        )}
      </div>
    </main>
  );
}
