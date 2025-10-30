"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function Navigation() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <nav className="border-b py-4" style={{ borderColor: "var(--color-accent-2)" }}>
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:underline">
          lprsrts
        </Link>
        <div className="flex gap-4 text-sm items-center">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/meditations" className="hover:underline">Meditations</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/updates" className="hover:underline">Updates</Link>
          <Link href="/media" className="hover:underline">Media</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
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
        </div>
      </div>
    </nav>
  );
}
