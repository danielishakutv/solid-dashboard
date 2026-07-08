/**
 * Static-export config for GitHub Pages.
 * The site is served from https://<user>.github.io/<repo>/, so in production
 * we prefix routes/assets with `/<repo>`. Dev (`npm run dev`) stays at root.
 * Override the base path with NEXT_PUBLIC_BASE_PATH if the repo name differs.
 */
const repo = process.env.NEXT_PUBLIC_BASE_PATH ?? "/solid-dashboard";
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? repo : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
