import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Disable Turbopack due to Google Fonts build error
  experimental: {},
  images: {
    remotePatterns: [
      // Sanity images
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },

      // Shopify images
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "shopify-assets.shopifycdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shopifycdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "files.shopifycdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;




