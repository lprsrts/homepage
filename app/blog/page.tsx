import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getBlogPosts } from "@/lib/content";

export default function Blog() {
  const posts = getBlogPosts();

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
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-lg text-muted">Technical writings and scientific explorations</p>
        </div>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article 
                className="p-6 border-l-4 hover:bg-opacity-50 transition-all cursor-pointer"
                style={{ 
                  borderColor: "var(--color-accent-1)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-shade-1)";
                  e.currentTarget.style.paddingLeft = "2rem";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.paddingLeft = "1.5rem";
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-sm mb-3 text-muted font-mono">{formatDate(post.date)}</p>
                    <p className="text-muted">{post.excerpt}</p>
                  </div>
                  <div className="text-2xl text-muted">→</div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-muted py-12">No blog posts yet.</p>
        )}
      </main>
    </>
  );
}
