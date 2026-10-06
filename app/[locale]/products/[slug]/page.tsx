import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/layout/WhatsAppButton";
import { getBrand, getCategory, getProduct, products, productsByBrand, productsByCategory, tagLabels, tr } from "@/lib/catalog";
import { locales, site, waLink } from "@/lib/site";
import { Pattern, categoryPattern } from "@/components/ui/Pattern";

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: tr(p.name, params.locale),
    description: tr(p.desc, params.locale),
    openGraph: { images: [p.image] },
  };
}

export default async function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();
  const t = await getTranslations("common");
  const brand = getBrand(product.brand)!;
  const category = getCategory(product.category)!;
  const name = tr(product.name, locale);

  const related = [
    ...productsByBrand(product.brand).filter((p) => p.slug !== slug),
    ...productsByCategory(product.category).filter((p) => p.slug !== slug && p.brand !== product.brand),
  ].slice(0, 4);

  const wa = waLink(
    locale === "ar"
      ? `مرحباً، أرغب في الاستفسار عن ${name}. يرجى مشاركة التفاصيل والسعر.`
      : `Hi, I'd like to enquire about ${name}. Please share details and pricing.`,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name.en,
    description: product.desc.en,
    image: `${site.url}${product.image}`,
    brand: { "@type": "Brand", name: brand.name.en },
    manufacturer: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-deep/55">
          <Link href={`/${locale}/products`} className="hover:text-grove">{t("allProducts")}</Link>
          <span>/</span>
          <Link href={`/${locale}/products?category=${category.slug}`} className="hover:text-grove">{tr(category.name, locale)}</Link>
          <span>/</span>
          <span className="text-deep">{name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-[28px] bg-husk">
              <Pattern kind={categoryPattern[product.category]} className="inset-0 text-grove/[.28]" />
              {product.cutout && <div className="golden-glow absolute inset-0 opacity-80" />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={name} className={`relative h-full w-full object-contain ${product.cutout ? "p-8 sm:p-14" : "p-4 sm:p-6"}`} />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Link href={`/${locale}/brands#${brand.slug}`} className="text-[12px] font-semibold uppercase tracking-[.2em] text-grove hover:text-deep">
              {tr(brand.name, locale)}
            </Link>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.03em] text-deep">{name}</h1>
            {product.tags && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-lime/30 px-3 py-1 text-[12px] font-semibold text-deep">{tr(tagLabels[tag], locale)}</span>
                ))}
              </div>
            )}
            <p className="mt-6 text-[17px] leading-relaxed text-deep/75">{tr(product.desc, locale)}</p>
            {product.uses && (
              <div className="mt-6 rounded-2xl border border-deep/10 bg-white p-5">
                <div className="text-[12px] font-semibold uppercase tracking-[.18em] text-grove">{t("applications")}</div>
                <p className="mt-2 text-[15px] leading-relaxed text-deep/80">{tr(product.uses, locale)}</p>
              </div>
            )}

            <div className="mt-6 overflow-hidden rounded-2xl border border-deep/10 bg-white">
              <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-deep/10 bg-husk/60 px-5 py-3 text-[12px] font-semibold uppercase tracking-[.16em] text-deep/60">
                <span>{t("packaging")}</span>
                <span>{t("shelfLife")}</span>
              </div>
              {product.packs.length ? (
                product.packs.map((p) => (
                  <div key={p.size} className="grid grid-cols-[1fr_auto] gap-4 border-b border-deep/5 px-5 py-3.5 text-[15px] last:border-0">
                    <span dir="ltr" className="font-medium text-deep rtl:text-right">
                      {p.size}
                      {p.note && <span className="ms-2 text-[12px] font-normal text-deep/50">{p.note}</span>}
                    </span>
                    <span className="text-deep/70">{tr(product.shelfLife, locale)}</span>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3.5 text-[15px]">
                  <span className="text-deep/70">{t("onRequest")}</span>
                  <span className="text-deep/70">{tr(product.shelfLife, locale)}</span>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-[#1fb457]">
                  <WhatsAppIcon className="h-5 w-5" /> {t("enquireWa")}
                </a>
              )}
              <Link
                href={`/${locale}/contact?product=${product.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-[15px] font-semibold text-cream hover:bg-grove"
              >
                {t("requestQuote")} <span className="inline-block rtl:rotate-180">→</span>
              </Link>
              <a href={site.phoneHref} className="inline-flex items-center rounded-full border-[1.5px] border-deep px-6 py-3.5 text-[15px] font-semibold text-deep hover:bg-deep hover:text-cream" dir="ltr">
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-husk py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="mb-8 font-display text-3xl font-bold text-deep">
              {t("related")} {tr(brand.name, locale)}
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
