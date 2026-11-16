import type { NextConfig } from "next";

/* STATIC_EXPORT=1 → fully static site for GitHub Pages (served under /<repo>).
   Normal `next dev/build` (Vercel, Node hosting) is unaffected. */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  // Cache Components / PPR need a server runtime — not available in static export.
  ...(staticExport ? {} : { cacheComponents: true, partialPrefetching: true }),
  env: { NEXT_PUBLIC_YEAR: String(new Date().getFullYear()) },
  images: {
    unoptimized: staticExport, // no image server on GitHub Pages (photos are pre-sized 2400px masters)
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
  // Redirects need a server; on static hosting they are skipped.
  ...(staticExport ? {} : { redirects }),
};

async function redirects() {
    // Preserve SEO equity from the old WordPress URLs.
    return [
      { source: "/warranty-claims", destination: "/warranty", permanent: true },
      { source: "/where-to-buy/find-a-dealer", destination: "/where-to-buy", permanent: true },
      { source: "/find-a-dealer", destination: "/where-to-buy", permanent: true },
      { source: "/become-distributor", destination: "/where-to-buy/become-a-dealer", permanent: true },
      { source: "/contact/general-inquiries", destination: "/contact", permanent: true },
    ];
}

export default nextConfig;
