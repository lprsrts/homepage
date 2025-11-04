import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getMemoirPostBySlug, getMemoirPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";

export function generateStaticParams() {
  const posts = getMemoirPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function MemoirPost({ params }: { params: { slug: string } }) {
  const post = getMemoirPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

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
        <Link 
          href="/memoir" 
          className="inline-block mb-8 text-sm hover:underline"
        >
          ← Back to Memoirs
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm mb-8 text-muted">{formatDate(post.date)}</p>

          <div className="prose max-w-none markdown-content" style={{ color: "var(--color-shade-2)" }}>
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--color-accent-2)" }}>
          <Link href="/memoir" className="text-sm hover:underline">
            ← Back to Memoirs
          </Link>
        </div>
      </main>
    </>
  );
}
