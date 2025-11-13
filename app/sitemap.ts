import { MetadataRoute } from 'next';
import { getMeditations, getMemoirPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lprsrts.com';

  // Get all meditations
  const meditations = getMeditations();
  const meditationUrls = meditations.map((meditation) => ({
    url: `${baseUrl}/meditations/${meditation.slug}`,
    lastModified: new Date(meditation.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Get all memoir posts (most important content)
  const memoirPosts = getMemoirPosts();
  const memoirUrls = memoirPosts.map((post) => ({
    url: `${baseUrl}/memoir/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/memoir`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/meditations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...meditationUrls,
    ...memoirUrls,
  ];
}
