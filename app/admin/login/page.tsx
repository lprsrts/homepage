"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }

      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded" style={{ backgroundColor: "var(--color-accent-2)", color: "var(--color-background)" }}>
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="block mb-2 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border rounded"
              style={{ 
                borderColor: "var(--color-accent-2)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)"
              }}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded"
              style={{ 
                borderColor: "var(--color-accent-2)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)"
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded font-medium"
            style={{ 
              backgroundColor: "var(--color-accent-1)",
              color: "var(--color-background)"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
