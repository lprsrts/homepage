import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b py-4" style={{ borderColor: "var(--color-accent-2)" }}>
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:underline">
          AS
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/meditations" className="hover:underline">Meditations</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/updates" className="hover:underline">Updates</Link>
          <Link href="/media" className="hover:underline">Media</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
        </div>
      </div>
    </nav>
  );
}
