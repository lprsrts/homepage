import Navigation from "@/components/Navigation";
import Link from "next/link";

// Sample blog posts - replace with actual data
const posts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    date: "2024-01-15",
    excerpt: "A comprehensive guide to building modern web applications with Next.js.",
  },
  {
    id: "2",
    title: "The Power of Minimalism",
    date: "2024-01-10",
    excerpt: "Why less is more in design and development.",
  },
];

export default function Blog() {
  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b border-gray-300 pb-8">
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-bold mb-2 hover:underline">{post.title}</h2>
              </Link>
              <p className="text-sm text-gray-600 mb-4">{post.date}</p>
              <p className="text-gray-800">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
