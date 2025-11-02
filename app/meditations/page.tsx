"use client";

import Navigation from "@/components/Navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Meditations() {
  const [meditations, setMeditations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/meditations")
      .then((res) => res.json())
      .then((data) => setMeditations(data.meditations || []))
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
        <h1 className="text-4xl font-bold mb-8">Meditations</h1>
        <div className="space-y-8">
          {meditations.map((meditation) => (
            <div
              key={meditation.slug}
              className="border p-6"
              style={{ borderColor: "var(--color-accent-2)" }}
            >
              <Link href={`/meditations/${meditation.slug}`}>
                <h2 className="text-2xl font-bold mb-3 hover:underline">{meditation.title}</h2>
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-sm text-muted">{formatDate(meditation.date)}</p>
                {meditation.language && (
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "var(--color-accent-2)", opacity: 0.6 }}>
                    {meditation.language}
                  </span>
                )}
              </div>
              <p className="mb-4">{meditation.excerpt}</p>
              <Link
                href={`/meditations/${meditation.slug}`}
                className="text-sm hover:underline"
              >
                Read Meditation →
              </Link>
            </div>
          ))}
        </div>

        {meditations.length === 0 && (
          <p className="text-center text-muted py-12">No meditations yet.</p>
        )}
      </main>
    </>
  );
}
