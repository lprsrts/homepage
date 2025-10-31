import Navigation from "@/components/Navigation";

// Sample projects - replace with actual data
const projects = [
  {
    id: "1",
    title: "difiplotter",
    description:
      "A C++ study project for visualizing directional fields of differential equations using SFML.",
    tech: ["C++", "CMake", "SFML"],
    link: "https://github.com/lprsrts/difiplotter",
  },
  {
    id: "2",
    title: "game-of-life",
    description: "Conway's Game of Life with simple GUI.",
    tech: ["C++", "CMake", "SFML"],
    link: "https://github.com/lprsrts/game-of-life",
  },
];

export default function Projects() {
  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border p-6"
              style={{ borderColor: "var(--color-accent-2)" }}
            >
              <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
              <p className="mb-4">{project.description}</p>
              <div className="flex gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs border px-2 py-1"
                    style={{ borderColor: "var(--color-accent-2)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
