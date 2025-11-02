import fs from 'fs';
import path from 'path';
import { GitHubStorage } from './github-storage';

const dataDir = path.join(process.cwd(), 'data');

// Check if we're running on Vercel
const isVercel = process.env.VERCEL === '1';
let githubStorage: GitHubStorage | null = null;

if (isVercel) {
  try {
    githubStorage = new GitHubStorage();
  } catch (error) {
    console.error('Failed to initialize GitHub storage:', error);
  }
}

export function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function writeJSON<T>(filename: string, data: T): Promise<void> {
  // Use GitHub storage on Vercel
  if (isVercel && githubStorage) {
    await githubStorage.saveJSON(`data/${filename}`, data, `Update ${filename}`);
    return;
  }

  // Use filesystem locally
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export interface AdminCredentials {
  username: string;
  passwordHash: string;
}

export interface PageConfig {
  enabled: boolean;
  title: string;
}

export interface SiteConfig {
  pages: {
    [key: string]: PageConfig;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  published: boolean;
}

export interface BlogData {
  posts: BlogPost[];
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video';
  uploadedAt: string;
}

export interface MediaData {
  items: MediaItem[];
}

export const getAdminCredentials = (): AdminCredentials => {
  // Try environment variables first (for production/Vercel)
  if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH) {
    return {
      username: process.env.ADMIN_USERNAME,
      passwordHash: process.env.ADMIN_PASSWORD_HASH,
    };
  }
  
  // Fall back to admin.json file (for local development)
  try {
    return readJSON<AdminCredentials>('admin.json');
  } catch (error) {
    throw new Error('Admin credentials not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH environment variables.');
  }
};
export const getSiteConfig = () => readJSON<SiteConfig>('siteConfig.json');
export const getBlogPosts = () => readJSON<BlogData>('blogPosts.json');
export const getMedia = () => readJSON<MediaData>('media.json');

export const saveSiteConfig = (data: SiteConfig) => writeJSON('siteConfig.json', data);
export const saveBlogPosts = (data: BlogData) => writeJSON('blogPosts.json', data);
export const saveMedia = (data: MediaData) => writeJSON('media.json', data);

// Projects types and functions
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  featured?: boolean;
}

export interface ProjectsData {
  projects: Project[];
}

export const getProjects = () => {
  try {
    return readJSON<ProjectsData>('projects.json');
  } catch (error) {
    return { projects: [] };
  }
};

export const saveProjects = (data: ProjectsData) => writeJSON('projects.json', data);

// Updates types and functions
export interface Update {
  id: string
  name?: string;
  date: string;
  content: string;
  category?: string;
}

export interface UpdatesData {
  updates: Update[];
}

export const getUpdates = () => {
  try {
    return readJSON<UpdatesData>('updates.json');
  } catch (error) {
    return { updates: [] };
  }
};

export const saveUpdates = (data: UpdatesData) => writeJSON('updates.json', data);
