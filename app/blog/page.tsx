import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";

export default function Blog() {
  const { posts } = getBlogPosts();
  const publishedPosts = posts.filter(post => post.published);

  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="space-y-8">
          {publishedPosts.map((post) => (
            <article key={post.id} className="border-b pb-8" style={{ borderColor: "var(--color-accent-2)" }}>
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-bold mb-2 hover:underline">{post.title}</h2>
              </Link>
              <p className="text-sm mb-4 text-muted">{post.date}</p>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
