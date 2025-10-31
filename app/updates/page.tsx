import Navigation from "@/components/Navigation";

// Sample updates - replace with actual data
const updates = [
  {
    id: "1",
    date: "2025-10-31",
    content: "Released version 0.1 of my new homepage with initial design.",
  },
];

export default function Updates() {
  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Updates</h1>
        <p className="mb-12 text-muted">Recent activity and announcements.</p>
        
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="flex gap-6 pb-6 border-b" style={{ borderColor: "var(--color-accent-2)" }}>
              <time className="text-sm min-w-[100px] text-muted">{update.date}</time>
              <p>{update.content}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
