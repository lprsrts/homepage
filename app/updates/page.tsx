import Navigation from "@/components/Navigation";
import { getUpdates } from "@/lib/data";

export const dynamic = "force-dynamic";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Updates() {
  const { updates } = getUpdates();
  // Sort by date descending
  const sortedUpdates = updates.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Updates</h1>
        <p className="mb-12 text-muted">Recent activity and announcements.</p>

        {sortedUpdates.length === 0 ? (
          <p className="text-muted">No updates yet.</p>
        ) : (
          <div className="space-y-6">
            {sortedUpdates.map((update) => (
              <div
                key={update.id}
                className="flex gap-6 pb-6 border-b"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div className="flex flex-col items-start min-w-[100px]">
                  <time className="text-sm text-muted">{formatDate(update.date)}</time>
                  {update.category && (
                    <span
                      className="text-xs px-2 py-1 rounded mt-1"
                      style={{
                        backgroundColor: "var(--color-accent-2)",
                        color: "var(--color-background)",
                      }}
                    >
                      {update.category}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="mb-2">{update.content}</p>
                  <span className="text-xs text-muted">{update.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
