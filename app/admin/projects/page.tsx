"use client";

import { useAuth, getAuthHeaders } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  featured?: boolean;
}

export default function AdminProjects() {
  const { loading, authenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (authenticated) {
      loadProjects();
    }
  }, [authenticated]);

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingProject({
      id: "",
      title: "",
      description: "",
      tech: [],
      link: "",
      featured: false,
    });
    setTechInput("");
  };

  const handleEdit = (project: Project) => {
    setIsCreating(false);
    setEditingProject({ ...project });
    setTechInput(project.tech.join(", "));
  };

  const handleSave = async () => {
    if (!editingProject) return;

    try {
      const method = isCreating ? "POST" : "PUT";
      const projectData = {
        ...editingProject,
        tech: techInput.split(",").map(t => t.trim()).filter(t => t),
      };

      const res = await fetch("/api/admin/projects", {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage("Project saved successfully!");
      setEditingProject(null);
      setIsCreating(false);
      setTechInput("");
      loadProjects();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMessage("Project deleted successfully!");
      loadProjects();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/admin/dashboard" className="text-sm hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Projects</h1>
            {!editingProject && (
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-1)",
                  color: "var(--color-background)",
                }}
              >
                New Project
              </button>
            )}
          </div>
        </div>

        {message && (
          <div
            className="p-4 mb-6 rounded"
            style={{
              backgroundColor: "var(--color-accent-1)",
              color: "var(--color-background)",
            }}
          >
            {message}
          </div>
        )}

        {editingProject ? (
          <div className="space-y-4 p-6 border rounded" style={{ borderColor: "var(--color-accent-2)" }}>
            <h2 className="text-2xl font-bold">{isCreating ? "New Project" : "Edit Project"}</h2>
            
            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                rows={3}
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Technologies (comma-separated)</label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, TypeScript, Next.js"
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Link</label>
              <input
                type="url"
                value={editingProject.link}
                onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                placeholder="https://github.com/username/repo"
                className="w-full p-3 border rounded"
                style={{
                  borderColor: "var(--color-accent-2)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={editingProject.featured}
                onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="font-medium">Featured Project</label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 p-3 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-1)",
                  color: "var(--color-background)",
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsCreating(false);
                  setTechInput("");
                }}
                className="flex-1 p-3 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-accent-2)",
                  color: "var(--color-background)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 border rounded flex justify-between items-start"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    {project.featured && (
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "var(--color-accent-1)", color: "var(--color-background)" }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-2">{project.description}</p>
                  <div className="flex gap-2 mt-2">
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
                      className="text-sm hover:underline mt-2 inline-block"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-4 py-2 rounded font-medium"
                    style={{
                      backgroundColor: "var(--color-accent-1)",
                      color: "var(--color-background)",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-4 py-2 rounded font-medium"
                    style={{
                      backgroundColor: "var(--color-accent-2)",
                      color: "var(--color-background)",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
