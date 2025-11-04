"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
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

export default function Navigation() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
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
    <nav className="border-b py-4" style={{ borderColor: "var(--color-accent-2)" }}>
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:underline">
          lprsrts
        </Link>
        <div className="flex gap-4 text-sm items-center">
          {pages.map(({ key, href }) => {
            if (config && !config.pages[key]?.enabled) return null;
            const title = config?.pages[key]?.title || key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <Link key={key} href={href} className="hover:underline">
                {title}
              </Link>
            );
          })}
          {config?.pages.shop?.enabled !== false && (
            <Link href="/cart" className="hover:underline relative">
              Cart
              {itemCount > 0 && (
                <span 
                  className="absolute -top-2 -right-3 text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: "var(--color-accent-2)",
                    color: "var(--color-background)"
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
