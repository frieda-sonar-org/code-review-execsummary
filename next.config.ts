import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  // basePath for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/v2-public' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/v2-public' : '',
};

export default nextConfig;
