"use client";

import Link from "next/link";
import ThemeAwareProfilePicture from "@/components/ThemeAwareProfilePicture";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useState, useEffect } from "react";

interface PageConfig {
  enabled: boolean;
  title: string;
}

interface SiteConfig {
  pages: {
    [key: string]: PageConfig;
  };
}

export default function Home() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(console.error);
  }, []);

  const pages = [
    { key: "memoir", href: "/memoir" },
    { key: "meditations", href: "/meditations" },
    { key: "projects", href: "/projects" },
    { key: "updates", href: "/updates" },
    { key: "media", href: "/media" },
    { key: "shop", href: "/shop" },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        {/* Profile Picture */}
        <div className="mb-8">
          <ThemeAwareProfilePicture
            lightImage="/pp_c16_g1p3_inv.png"
            darkImage="/pp_c16_g1p3.png"
            alt="Profile Picture"
            version="2"
          />
        </div>

        {/* Name */}
        <h1 className="text-4xl font-bold mb-2">lprsrts</h1>
        <p className="text-lg mb-12 text-muted">Stuff made, shared here.</p>

        {/* Navigation Links */}
        <nav className="space-y-3 mb-12">
          {pages.map(({ key, href }) => {
            if (config && !config.pages[key]?.enabled) return null;
            const title = config?.pages[key]?.title || key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <Link key={key} href={href} className="block nav-link">
                {title}
              </Link>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="flex justify-center gap-4 text-sm">
          <a
            href="https://github.com/lprsrts"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://instagram.com/lprsrts"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
          <span>•</span>
          <a href="mailto:alper@saritas.tr" className="hover:underline">
            Email
          </a>
        </div>
      </div>
      <ThemeSwitcher />
    </main>
  );
}
