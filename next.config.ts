import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sanity', '@sanity/ui', '@sanity/icons', 'next-sanity', 'styled-components'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Retired pages forward to where their content lives now, so old links and search results still land.
  async redirects() {
    return [
      { source: '/about', destination: '/#story', permanent: true },
      { source: '/follow-us', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
