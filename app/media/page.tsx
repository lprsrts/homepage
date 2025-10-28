import Navigation from "@/components/Navigation";

// Sample media items - replace with actual data
const videos = [
  {
    id: "1",
    title: "Building a Minimal Web App",
    thumbnail: "/thumbnails/video1.jpg",
    url: "https://youtube.com/watch?v=example1",
  },
  {
    id: "2",
    title: "Developer Workflow Tour",
    thumbnail: "/thumbnails/video2.jpg",
    url: "https://youtube.com/watch?v=example2",
  },
];

const photos = [
  {
    id: "1",
    title: "Workspace Setup",
    url: "/photos/photo1.jpg",
  },
  {
    id: "2",
    title: "Mountain View",
    url: "/photos/photo2.jpg",
  },
  {
    id: "3",
    title: "City Architecture",
    url: "/photos/photo3.jpg",
  },
];

export default function Media() {
  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-12">Media</h1>
        
        {/* Videos Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <a 
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border transition-colors p-4 hover:invert"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div className="aspect-video mb-4" style={{ backgroundColor: "var(--color-accent-1)" }}></div>
                <h3 className="font-bold">{video.title}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* Photos Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="border" style={{ borderColor: "var(--color-accent-2)" }}>
                <div className="aspect-square" style={{ backgroundColor: "var(--color-accent-1)" }}></div>
                <p className="text-sm p-2">{photo.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
