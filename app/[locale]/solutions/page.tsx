import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/ui/ProductCard";
import Icon, { type IconName } from "@/components/ui/Icon";
import { getProduct, type Product } from "@/lib/catalog";
import { localizeDigits } from "@/lib/digits";
import { asset } from "@/lib/assets";
import { Pattern, type PatternKind } from "@/components/ui/Pattern";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "solutions" });
  return { title: t("eyebrow"), description: t("sub") };
}

// Customer paths, organised by who you are (the AAK / Puratos pattern).
const segments: { key: "bakery" | "horeca" | "retail" | "industry"; icon: IconName; pattern: PatternKind; shots: string[]; picks: string[] }[] = [
  {
    key: "bakery",
    icon: "croissant",
    pattern: "bakery-doodles",
    shots: ["/img/catalogue/unigold-croissant.webp", "/img/catalogue/unigold-liquid-shortening.webp"],
    picks: ["unigold-croissant-margarine-sheets", "unigold-pastry-margarine", "bakers-street-blended-butter", "buttercup-pure-butter"],
  },
  {
    key: "horeca",
    icon: "chef",
    pattern: "palm-leaves",
    shots: ["/img/catalogue/frai-nakhil-range.webp", "/img/catalogue/hanan-ghee.webp"],
    picks: ["frai-nakhil-palm-olein", "khlood-palm-olein", "hanan-vegetable-ghee", "linda-pure-butter-ghee"],
  },
  {
    key: "retail",
    icon: "store",
    pattern: "sunflowers",
    shots: ["/img/catalogue/hanan-corn-1-5l.webp", "/img/catalogue/hanan-sfo-1-5l.webp", "/img/catalogue/hanan-sfo-olive-1-5l.webp"],
    picks: ["hanan-pure-sunflower-oil", "z-light-pure-sunflower-oil", "saba-vegetable-ghee", "ghoson-alsham-extra-virgin-olive-oil"],
  },
  {
    key: "industry",
    icon: "factory",
    pattern: "olive-branches",
    shots: ["/img/catalogue/hanan-sfo-5l.webp", "/img/catalogue/frai-nakhil-5l.webp", "/img/catalogue/unigold-liquid-shortening.webp"],
    picks: ["unigold-liquid-shortening", "ufvo-rbd-sunflower-oil", "hanan-pure-canola-oil", "hanan-butter-blend"],
  },
];

export default async function SolutionsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations("solutions");
  const tc = await getTranslations("common");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} pattern="bakery-doodles">
        <div className="mt-8 flex flex-wrap gap-2">
          {segments.map((s) => (
            <a key={s.key} href={`#${s.key}`} className="inline-flex items-center gap-2 rounded-full border border-deep/15 bg-white py-1.5 pe-4 ps-1.5 text-sm font-medium text-deep hover:border-grove">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              {t(s.key)}
            </a>
          ))}
        </div>
      </PageHero>

      {segments.map((s, i) => (
        <section key={s.key} id={s.key} className={`scroll-mt-20 py-20 lg:py-24 ${i % 2 ? "bg-husk" : ""}`}>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon name={s.icon} className="h-9 w-9" />
                  </span>
                  <span className="font-display text-5xl font-extrabold text-gold">{localizeDigits(`0${i + 1}`, locale)}</span>
                </div>
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1] tracking-[-0.03em] text-deep">{t(s.key)}</h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-deep/70">{t(`${s.key}Body`)}</p>
                <Link href={`/${locale}/contact`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-[15px] font-semibold text-cream hover:bg-grove">
                  {tc("requestQuote")} <span className="inline-block rtl:rotate-180">→</span>
                </Link>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-husk">
                  <Pattern kind={s.pattern} className="inset-0 text-grove/[.3]" />
                  <div className="golden-glow absolute inset-0 opacity-60" />
                  <div className="relative flex h-full items-end justify-center gap-3 px-6 pb-6 pt-10" dir="ltr">
                    {s.shots.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={asset(src)} alt="" className="max-h-[78%] min-w-0 max-w-[46%] flex-1 object-contain" loading="lazy" />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="mt-12">
              <div className="mb-5 text-[12px] font-semibold uppercase tracking-[.2em] text-grove">{t("recommended")}</div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                {s.picks.map((slug) => getProduct(slug)).filter((p): p is Product => Boolean(p)).map((p) => (
                  <ProductCard key={p.slug} product={p} locale={locale} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
