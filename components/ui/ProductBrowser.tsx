"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { brands, categories, products, tr, type CategorySlug } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import { localizeDigits } from "@/lib/digits";

export default function ProductBrowser({ locale }: { locale: string }) {
  const t = useTranslations("categories");
  const params = useSearchParams();
  const [cat, setCat] = useState<CategorySlug | "all">("all");
  const [brand, setBrand] = useState<string>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const c = params.get("category");
    if (c && categories.some((x) => x.slug === c)) setCat(c as CategorySlug);
    const b = params.get("brand");
    if (b && brands.some((x) => x.slug === b)) setBrand(b);
  }, [params]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    // Show brands in the brand-book order (bakery and ghee first) so the
    // grid opens with a varied mix rather than one brand's oils.
    const order = brands.map((b) => b.slug);
    return [...products].sort((a, b) => order.indexOf(a.brand) - order.indexOf(b.brand)).filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (brand === "all" || p.brand === brand) &&
        (!needle || `${p.name.en} ${p.name.ar} ${p.desc.en}`.toLowerCase().includes(needle)),
    );
  }, [cat, brand, q]);

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? "bg-deep text-cream" : "bg-white text-deep/75 border border-deep/10 hover:border-deep/30"
    }`;

  return (
    <div>
      <div className="sticky top-[76px] z-30 -mx-5 border-b border-deep/10 bg-cream/90 px-5 py-4 backdrop-blur-md lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <button className={chip(cat === "all")} onClick={() => setCat("all")}>
            {t("all")}
          </button>
          {categories.map((c) => (
            <button key={c.slug} className={chip(cat === c.slug)} onClick={() => setCat(c.slug)}>
              {tr(c.name, locale)}
            </button>
          ))}
          <div className="ms-auto flex w-full gap-2 sm:w-auto">
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="rounded-full border border-deep/15 bg-white px-4 py-2 text-sm text-deep"
              aria-label="Brand"
            >
              <option value="all">{locale === "ar" ? "كل العلامات" : "All brands"}</option>
              {brands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {tr(b.name, locale)}
                </option>
              ))}
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search")}
              className="min-w-0 flex-1 rounded-full border border-deep/15 bg-white px-4 py-2 text-sm text-deep placeholder:text-deep/40 sm:w-56"
            />
          </div>
        </div>
      </div>

      <p className="mb-6 mt-8 text-sm text-deep/55">{t("count", { n: localizeDigits(list.length, locale) })}</p>
      {list.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-deep/20 p-10 text-center text-deep/60">{t("empty")}</p>
      )}
    </div>
  );
}
