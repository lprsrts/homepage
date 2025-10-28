import Navigation from "@/components/Navigation";

// Sample projects - replace with actual data
const projects = [
  {
    id: "1",
    title: "Project Alpha",
    description: "A minimal web framework for building fast applications.",
    tech: ["TypeScript", "React", "Next.js"],
    link: "https://github.com/alpersaritas/project-alpha",
  },
  {
    id: "2",
    title: "Project Beta",
    description: "Command-line tool for developer productivity.",
    tech: ["Go", "CLI"],
    link: "https://github.com/alpersaritas/project-beta",
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
            <div key={project.id} className="border p-6" style={{ borderColor: "var(--color-dark-accent)" }}>
              <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
              <p className="mb-4">{project.description}</p>
              <div className="flex gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs border px-2 py-1" style={{ borderColor: "var(--color-dark-accent)" }}>
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
