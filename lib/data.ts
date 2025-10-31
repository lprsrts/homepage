import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export function writeJSON<T>(filename: string, data: T): void {
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
