"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { loading, authenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded font-medium"
            style={{
              backgroundColor: "var(--color-accent-2)",
              color: "var(--color-background)",
            }}
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/pages"
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            style={{ borderColor: "var(--color-accent-2)" }}
          >
            <h2 className="text-2xl font-bold mb-2">Page Settings</h2>
            <p className="text-muted">Enable or disable pages</p>
          </Link>

          <Link
            href="/admin/blog"
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            style={{ borderColor: "var(--color-accent-2)" }}
          >
            <h2 className="text-2xl font-bold mb-2">Blog Posts</h2>
            <p className="text-muted">Manage scientific & technical writings</p>
          </Link>

          <Link
            href="/admin/meditations"
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            style={{ borderColor: "var(--color-accent-2)" }}
          >
            <h2 className="text-2xl font-bold mb-2">Meditations</h2>
            <p className="text-muted">Manage philosophical reflections</p>
          </Link>

          <Link
            href="/admin/projects"
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            style={{ borderColor: "var(--color-accent-2)" }}
          >
            <h2 className="text-2xl font-bold mb-2">Projects</h2>
            <p className="text-muted">Manage projects</p>
          </Link>

          <Link
            href="/admin/updates"
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            style={{ borderColor: "var(--color-accent-2)" }}
          >
            <h2 className="text-2xl font-bold mb-2">Updates</h2>
            <p className="text-muted">Manage timeline updates</p>
          </Link>

          <Link
            href="/admin/media"
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            style={{ borderColor: "var(--color-accent-2)" }}
          >
            <h2 className="text-2xl font-bold mb-2">Media</h2>
            <p className="text-muted">Manage media files</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
