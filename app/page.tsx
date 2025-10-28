import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        {/* Profile Picture */}
        <div className="mb-8">
          <div
            className="w-32 h-32 mx-auto rounded-full border-2 overflow-hidden"
            style={{
              borderColor: "var(--color-dark-accent)",
              backgroundColor: "var(--color-light-accent)",
            }}
          >
            {/* Replace with your actual image at public/profile.jpg */}
          </div>
        </div>

        {/* Name */}
        <h1 className="text-4xl font-bold mb-2">lprsrts</h1>
        <p className="text-lg mb-12 text-muted">
          Stuff made, shared here.
        </p>

        {/* Navigation Links */}
        <nav className="space-y-3 mb-12">
          <Link href="/blog" className="block nav-link">
            Blog
          </Link>
          <Link href="/meditations" className="block nav-link">
            Meditations
          </Link>
          <Link href="/projects" className="block nav-link">
            Projects
          </Link>
          <Link href="/updates" className="block nav-link">
            Updates
          </Link>
          <Link href="/media" className="block nav-link">
            Media
          </Link>
          <Link href="/shop" className="block nav-link">
            Shop
          </Link>
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
          <a href="mailto:hello@alpersaritas.com" className="hover:underline">
            Email
          </a>
        </div>
      </div>
    </main>
  );
}
