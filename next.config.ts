import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sanity', '@sanity/ui', '@sanity/icons', 'next-sanity', 'styled-components'],
};

export default nextConfig;
