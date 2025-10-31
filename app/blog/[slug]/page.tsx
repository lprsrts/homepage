import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

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

  // Simple markdown-to-HTML renderer
  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith("### ")) {
        elements.push(<h3 key={index} className="text-2xl font-bold mt-8 mb-4">{trimmed.substring(4)}</h3>);
      } else if (trimmed.startsWith("## ")) {
        elements.push(<h2 key={index} className="text-3xl font-bold mt-10 mb-4">{trimmed.substring(3)}</h2>);
      } else if (trimmed.startsWith("# ")) {
        elements.push(<h1 key={index} className="text-4xl font-bold mt-12 mb-6">{trimmed.substring(2)}</h1>);
      }
      // Lists
      else if (trimmed.startsWith("- ")) {
        elements.push(<li key={index} className="ml-6 mb-2 list-disc">{trimmed.substring(2)}</li>);
      }
      // Paragraphs
      else if (trimmed.length > 0) {
        elements.push(<p key={index} className="mb-4 leading-relaxed">{line}</p>);
      }
      // Empty lines
      else {
        elements.push(<div key={index} className="h-2"></div>);
      }
    });
    
    return elements;
  };

  return (
    <>
      <Navigation />
      <main className="content-container">
        <Link 
          href="/blog" 
          className="inline-block mb-8 text-sm hover:underline"
        >
          ← Back to Blog
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm mb-8 text-muted">{formatDate(post.date)}</p>

          <div className="prose max-w-none" style={{ color: "var(--color-shade-2)" }}>
            {renderMarkdown(post.content)}
          </div>
        </article>

        <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--color-accent-2)" }}>
          <Link href="/blog" className="text-sm hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    </>
  );
}
