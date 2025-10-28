import Navigation from "@/components/Navigation";

// Sample updates - replace with actual data
const updates = [
  {
    id: "1",
    date: "2024-01-20",
    content: "Released version 2.0 of Project Alpha with improved performance.",
  },
  {
    id: "2",
    date: "2024-01-15",
    content: "Started working on a new CLI tool for developers.",
  },
  {
    id: "3",
    date: "2024-01-10",
    content: "Published new blog post about minimalism in design.",
  },
];

export default function Updates() {
  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Updates</h1>
        <p className="mb-12" style={{ color: "var(--color-muted)" }}>Recent activity and announcements.</p>
        
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="flex gap-6 pb-6 border-b" style={{ borderColor: "var(--color-border)" }}>
              <time className="text-sm min-w-[100px]" style={{ color: "var(--color-muted)" }}>{update.date}</time>
              <p>{update.content}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
