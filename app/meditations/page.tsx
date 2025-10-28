import Navigation from "@/components/Navigation";

// Sample meditations - replace with actual data
const meditations = [
  {
    id: "1",
    content: "The only way to do great work is to love what you do.",
    date: "2024-01-20",
  },
  {
    id: "2",
    content: "Simplicity is the ultimate sophistication.",
    date: "2024-01-18",
  },
  {
    id: "3",
    content: "Focus on being productive instead of busy.",
    date: "2024-01-15",
  },
];

export default function Meditations() {
  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Meditations</h1>
        <p className="mb-12 text-muted">Short thoughts and reflections.</p>
        
        <div className="space-y-12">
          {meditations.map((meditation) => (
            <div key={meditation.id} className="border-l-2 pl-6" style={{ borderColor: "var(--color-accent-3)" }}>
              <p className="text-xl italic mb-4">&ldquo;{meditation.content}&rdquo;</p>
              <p className="text-sm text-muted">{meditation.date}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
