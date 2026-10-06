import type { MetadataRoute } from "next";
import { site, locales } from "@/lib/site";
import { BASE_PATH } from "@/lib/assets";

export const dynamic = "force-static";
import { products } from "@/lib/catalog";

const pages = ["", "/products", "/brands", "/solutions", "/private-label", "/export", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap((l) => [
    ...pages.map((p) => ({ url: `${site.url}${BASE_PATH}/${l}${p}`, lastModified, priority: p === "" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${site.url}${BASE_PATH}/${l}/products/${p.slug}`, lastModified, priority: 0.7 })),
  ]);
}
