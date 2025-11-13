/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Enable trailing slash for better static export compatibility
  trailingSlash: false,
  // Generate static pages at build time
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default nextConfig;
