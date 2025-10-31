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
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 italic">Meditations</h1>
          <p className="text-lg text-muted">Philosophical reflections and contemplations</p>
        </div>
        
        <div className="space-y-8 max-w-2xl mx-auto">
          {meditations.map((meditation) => (
            <Link key={meditation.slug} href={`/meditations/${meditation.slug}`}>
              <article 
                className="p-6 border-2 rounded hover:shadow-lg transition-all cursor-pointer"
                style={{ 
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-shade-1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-3 italic">{meditation.title}</h2>
                  <p className="text-sm mb-4 text-muted">{formatDate(meditation.date)}</p>
                  <p className="text-muted italic leading-relaxed">&ldquo;{meditation.excerpt}&rdquo;</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {meditations.length === 0 && (
          <p className="text-center text-muted py-12">No meditations yet.</p>
        )}
      </main>
    </>
  );
}
