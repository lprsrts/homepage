import { Content } from "./content";

interface GitHubFileResponse {
  sha?: string;
  content?: string;
}

export class GitHubStorage {
  private token: string;
  private owner: string;
  private repo: string;
  private branch: string;

  constructor() {
    this.token = process.env.GITHUB_TOKEN || "";
    this.owner = process.env.GITHUB_OWNER || "";
    this.repo = process.env.GITHUB_REPO || "";
    this.branch = process.env.GITHUB_BRANCH || "main";

    if (!this.token || !this.owner || !this.repo) {
      throw new Error(
        "GitHub credentials not configured. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables."
      );
    }
  }

  private async getFile(path: string): Promise<GitHubFileResponse | null> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${this.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching file from GitHub:", error);
      return null;
    }
  }

  private async searchFileBySlug(
    directory: string,
    slug: string
  ): Promise<string | null> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${directory}?ref=${this.branch}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${this.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!response.ok) {
        return null;
      }

      const files = await response.json();

      // Search through files to find one with matching slug in frontmatter
      for (const file of files) {
        if (file.type === "file" && file.name.endsWith(".md")) {
          const fileContent = await this.getFile(file.path);
          if (fileContent?.content) {
            const decoded = Buffer.from(fileContent.content, "base64").toString(
              "utf8"
            );
            // Quick check if slug is in frontmatter
            if (decoded.includes(`slug: ${slug}`)) {
              return file.path;
            }
          }
        }
      }

      return null;
    } catch (error) {
      console.error("Error searching files in GitHub:", error);
      return null;
    }
  }

  async saveContent(
    directory: string,
    content: Content,
    existingFileName?: string
  ): Promise<void> {
    // Build frontmatter
    const frontMatter: Record<string, string> = {
      title: content.title,
      date: content.date,
      slug: content.slug,
    };

    if (content.excerpt) {
      frontMatter.excerpt = content.excerpt;
    }
    if (content.language) {
      frontMatter.language = content.language;
    }

    // Build markdown content
    const frontMatterLines = Object.entries(frontMatter).map(
      ([key, value]) => `${key}: ${value}`
    );
    const fileContent = `---\n${frontMatterLines.join("\n")}\n---\n\n${content.content}`;

    // Determine file path
    let filePath: string;
    let existingFile: GitHubFileResponse | null = null;

    if (existingFileName) {
      filePath = `${directory}/${existingFileName}`;
      existingFile = await this.getFile(filePath);
    } else {
      // Try to find existing file by slug
      const foundPath = await this.searchFileBySlug(directory, content.slug);
      if (foundPath) {
        filePath = foundPath;
        existingFile = await this.getFile(filePath);
      } else {
        // Create new file
        filePath = `${directory}/${content.slug}.md`;
      }
    }

    // Prepare commit
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${filePath}`;
    const message = existingFile
      ? `Update ${content.slug}`
      : `Create ${content.slug}`;

    const body: any = {
      message,
      content: Buffer.from(fileContent).toString("base64"),
      branch: this.branch,
    };

    if (existingFile?.sha) {
      body.sha = existingFile.sha;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to save to GitHub: ${error}`);
    }
  }

  async deleteContent(directory: string, slug: string): Promise<void> {
    // Find file by slug
    const filePath = await this.searchFileBySlug(directory, slug);

    if (!filePath) {
      throw new Error(`File with slug ${slug} not found`);
    }

    // Get file SHA
    const existingFile = await this.getFile(filePath);
    if (!existingFile?.sha) {
      throw new Error(`Could not get SHA for ${filePath}`);
    }

    // Delete file
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${filePath}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `token ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Delete ${slug}`,
        sha: existingFile.sha,
        branch: this.branch,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delete from GitHub: ${error}`);
    }
  }

  async saveJSON(filePath: string, data: any, message: string): Promise<void> {
    // Get existing file SHA if it exists
    const existingFile = await this.getFile(filePath);

    const jsonContent = JSON.stringify(data, null, 2);
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${filePath}`;

    const body: any = {
      message,
      content: Buffer.from(jsonContent).toString("base64"),
      branch: this.branch,
    };

    if (existingFile?.sha) {
      body.sha = existingFile.sha;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to save JSON to GitHub: ${error}`);
    }
  }
}
