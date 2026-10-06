import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { brands, getCategory, productsByBrand, tr } from "@/lib/catalog";
import { Pattern, categoryPattern } from "@/components/ui/Pattern";
import { localizeDigits } from "@/lib/digits";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "brandsPage" });
  return { title: t("eyebrow"), description: t("sub") };
}

export default async function BrandsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations("brandsPage");
  const tc = await getTranslations("common");
  const audience = { home: t("forHome"), pro: t("forPro"), both: t("forBoth") };

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

      {/* quick index */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-deep/10 pb-8">
          {brands.map((b) => (
            <a key={b.slug} href={`#${b.slug}`} className="rounded-full border border-deep/15 bg-white px-4 py-2 text-sm font-medium text-deep hover:border-grove hover:text-grove">
              {tr(b.name, locale)}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-5 py-14 lg:px-8">
        {brands.map((b, i) => {
          const items = productsByBrand(b.slug);
          return (
            <Reveal key={b.slug}>
              <article id={b.slug} className="grid scroll-mt-28 overflow-hidden rounded-[28px] border border-deep/10 bg-white md:grid-cols-[.9fr_1.1fr]">
                <div className={`relative aspect-[4/3] bg-husk md:aspect-auto ${i % 2 ? "md:order-2" : ""}`}>
                  <Pattern kind={categoryPattern[items[0]?.category ?? "cooking-oils"]} className="inset-0 text-grove/[.28]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt={tr(b.name, locale)} className="absolute inset-0 h-full w-full object-contain p-6" loading="lazy" />
                </div>
                <div className="flex flex-col p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    {b.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.logo} alt="" className="h-14 w-24 rounded-lg border border-deep/10 bg-white object-contain p-1" loading="lazy" />
                    )}
                    <span className="rounded-full bg-cream px-3 py-1 text-[12px] font-semibold text-grove">{audience[b.audience]}</span>
                  </div>
                  <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.03em] text-deep">{tr(b.name, locale)}</h2>
                  <p className="mt-2 text-lg text-deep/65">{tr(b.line, locale)}</p>
                  <ul className="mt-6 divide-y divide-deep/10 border-y border-deep/10">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/${locale}/products/${p.slug}`} className="group flex items-center justify-between gap-4 py-3.5">
                          <span>
                            <span className="block font-medium text-deep group-hover:text-grove">{tr(p.name, locale)}</span>
                            <span className="text-[13px] text-deep/50">{tr(getCategory(p.category)!.name, locale)}</span>
                          </span>
                          <span className="inline-block text-grove transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/products?brand=${b.slug}`} className="mt-6 self-start text-sm font-semibold text-grove hover:text-deep">
                    {tc("viewAll")} ({localizeDigits(items.length, locale)}) <span className="inline-block rtl:rotate-180">→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
