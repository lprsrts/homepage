import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getMemoirPostBySlug, getMemoirPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import type { Metadata } from "next";

export function generateStaticParams() {
  const posts = getMemoirPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getMemoirPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Memoir Not Found",
    };
  }

  const title = post.title;
  const description = post.excerpt || post.content.slice(0, 160);
  const publishedTime = post.date;
  const url = `https://lprsrts.com/memoir/${params.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url,
      authors: ["Alper Saritas"],
    },
  };
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Alper Saritas',
      url: 'https://lprsrts.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Alper Saritas',
    },
    description: post.excerpt || post.content.slice(0, 160),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lprsrts.com/memoir/${params.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
