/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  turbopack: {},
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;