import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// `EXPORT=1 NEXT_PUBLIC_BASE_PATH=/unitedflowers-website npm run build` makes a static site
// (GitHub Pages). Plain `npm run dev` / `npm run build` stay a normal Next app.
const exportMode = process.env.EXPORT === "1";
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images are pre-optimised to WebP in /public, so skip the runtime optimiser.
  images: { unoptimized: true },
  ...(exportMode ? { output: "export", distDir: ".next-export", trailingSlash: true, basePath: base, assetPrefix: base ? `${base}/` : undefined } : {}),
};

export default withNextIntl(nextConfig);
