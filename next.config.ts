import type { NextConfig } from "next";

// Static export for GitHub Pages: `next build` writes the site to out/.
// Served from the root of ichiu03.github.io, so no basePath is needed.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
