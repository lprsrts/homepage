"use client";

import { useAuth, getAuthHeaders } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Link from "next/link";

interface PageConfig {
  enabled: boolean;
  title: string;
}

interface SiteConfig {
  pages: {
    [key: string]: PageConfig;
  };
}

export default function AdminPages() {
  const { loading, authenticated } = useAuth();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authenticated) {
      loadConfig();
    }
  }, [authenticated]);

  const loadConfig = async () => {
    try {
      const res = await fetch("/api/admin/config", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setConfig(data);
    } catch (error) {
      console.error("Failed to load config:", error);
    }
  };

  const handleToggle = (page: string) => {
    if (!config) return;
    
    setConfig({
      ...config,
      pages: {
        ...config.pages,
        [page]: {
          ...config.pages[page],
          enabled: !config.pages[page].enabled,
        },
      },
    });
  };

  const handleSave = async () => {
    if (!config) return;
    
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(config),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save settings");
    } finally {
      setSaving(false);
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
          <h1 className="text-4xl font-bold">Page Settings</h1>
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

        {config && (
          <div className="space-y-4">
            {Object.entries(config.pages).map(([key, page]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 border rounded"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div>
                  <h3 className="text-xl font-bold">{page.title}</h3>
                  <p className="text-sm text-muted">/{key}</p>
                </div>
                <button
                  onClick={() => handleToggle(key)}
                  className="px-4 py-2 rounded font-medium"
                  style={{
                    backgroundColor: page.enabled
                      ? "var(--color-accent-1)"
                      : "var(--color-accent-2)",
                    color: "var(--color-background)",
                  }}
                >
                  {page.enabled ? "Enabled" : "Disabled"}
                </button>
              </div>
            ))}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full p-4 rounded font-medium"
              style={{
                backgroundColor: "var(--color-accent-1)",
                color: "var(--color-background)",
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
