import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getMeditationBySlug } from "@/lib/content";
import { notFound } from "next/navigation";

export default function MeditationPost({ params }: { params: { slug: string } }) {
  const meditation = getMeditationBySlug(params.slug);

  if (!meditation) {
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
        elements.push(<h3 key={index} className="text-2xl font-bold italic mt-8 mb-4 text-center">{trimmed.substring(4)}</h3>);
      } else if (trimmed.startsWith("## ")) {
        elements.push(<h2 key={index} className="text-3xl font-bold italic mt-10 mb-4 text-center">{trimmed.substring(3)}</h2>);
      } else if (trimmed.startsWith("# ")) {
        elements.push(<h1 key={index} className="text-4xl font-bold italic mt-12 mb-6 text-center">{trimmed.substring(2)}</h1>);
      }
      // Lists
      else if (trimmed.startsWith("- ")) {
        elements.push(<li key={index} className="ml-6 mb-2 list-disc">{trimmed.substring(2)}</li>);
      }
      // Paragraphs
      else if (trimmed.length > 0) {
        elements.push(<p key={index} className="mb-4 leading-relaxed text-justify">{line}</p>);
      }
      // Empty lines
      else {
        elements.push(<div key={index} className="h-3"></div>);
      }
    });
    
    return elements;
  };

  return (
    <>
      <Navigation />
      <main className="content-container max-w-2xl">
        <Link 
          href="/meditations" 
          className="inline-block mb-8 text-sm hover:underline text-muted"
        >
          ← Back to Meditations
        </Link>

        <article>
          <header className="mb-10 pb-6 border-b-2 text-center" style={{ borderColor: "var(--color-accent-2)" }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 italic">{meditation.title}</h1>
            <time className="text-muted">{formatDate(meditation.date)}</time>
          </header>

          <div className="prose prose-lg max-w-none" style={{ color: "var(--color-shade-2)" }}>
            {renderMarkdown(meditation.content)}
          </div>
        </article>

        <div className="mt-16 pt-8 border-t-2 text-center" style={{ borderColor: "var(--color-accent-2)" }}>
          <Link href="/meditations" className="text-sm hover:underline text-muted">
            ← Back to Meditations
          </Link>
        </div>
      </main>
    </>
  );
}
