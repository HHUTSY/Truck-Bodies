import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF first, WebP fallback — originals in /public/images/photos are 2400px masters.
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 256, 384],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Preserve SEO equity from the old WordPress URLs.
    return [
      { source: "/warranty-claims", destination: "/warranty", permanent: true },
      { source: "/where-to-buy/find-a-dealer", destination: "/where-to-buy", permanent: true },
      { source: "/find-a-dealer", destination: "/where-to-buy", permanent: true },
      { source: "/become-distributor", destination: "/where-to-buy/become-a-dealer", permanent: true },
      { source: "/contact/general-inquiries", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
