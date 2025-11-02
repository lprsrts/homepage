import Navigation from "@/components/Navigation";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function Projects() {
  const { projects } = getProjects();

  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        {projects.length === 0 ? (
          <p className="text-muted">No projects yet.</p>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border p-6"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  {project.featured && (
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: "var(--color-accent-1)",
                        color: "var(--color-background)",
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
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
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
