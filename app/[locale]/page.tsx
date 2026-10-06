import Link from "next/link";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import VideoHero from "@/components/home/VideoHero";
import StoryThread from "@/components/home/StoryThread";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import BrandMarquee from "@/components/ui/BrandMarquee";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon, { type IconName } from "@/components/ui/Icon";
import { Pattern, categoryPattern } from "@/components/ui/Pattern";
import { brands, categories, products, productsByCategory, tr } from "@/lib/catalog";
import { site } from "@/lib/site";
import { asset } from "@/lib/assets";
import { localizeDigits } from "@/lib/digits";
import CatalogueButton from "@/components/ui/CatalogueButton";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const ts = useTranslations("solutions");
  const tp = useTranslations("privateLabel");
  const te = useTranslations("export");
  const L = (p: string) => `/${locale}${p}`;
  const d = (v: string | number) => localizeDigits(v, locale);
  const process = t.raw("process") as string[];
  const regions = te.raw("regions") as string[];
  const plSteps = tp.raw("steps") as { t: string; d: string }[];

  const chapters = [
    {
      num: d("01"),
      title: t("ch1Title"),
      body: t("ch1Body"),
      visual: (
        <div className="overflow-hidden rounded-[28px] bg-husk">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/scenes/sunflower-oils.webp")} alt="" className="aspect-[4/3] w-full object-cover object-[60%_50%]" loading="lazy" />
        </div>
      ),
    },
    {
      num: d("02"),
      title: t("ch2Title"),
      body: t("ch2Body"),
      visual: (
        <div className="relative overflow-hidden rounded-[28px] bg-deep p-7 text-cream sm:p-9">
          <div className="dot-grid-light absolute inset-0" />
          <div className="relative flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
              <Icon name="factory" className="h-9 w-9" />
            </span>
            <div className="text-sm text-cream/70">{locale === "ar" ? "المدينة الصناعية بجدة · المرحلة الثالثة" : "Jeddah Industrial City · Phase III"}</div>
          </div>
          <ol className="relative mt-8 grid grid-cols-5 gap-2">
            {process.map((s, i) => (
              <li key={s} className="flex min-w-0 flex-col items-center gap-2.5 text-center sm:gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 font-display text-sm font-bold text-gold sm:h-11 sm:w-11">
                  {i + 1}
                </span>
                <span className="w-full whitespace-nowrap text-[9px] font-medium leading-tight tracking-tight text-cream/85 min-[400px]:text-[10px] sm:text-[13px] sm:tracking-normal">{s}</span>
              </li>
            ))}
          </ol>
          <div className="relative mt-6 h-1 rounded-full bg-cream/10">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-lime via-gold to-amber rtl:bg-gradient-to-l" />
          </div>
        </div>
      ),
    },
    {
      num: d("03"),
      title: t("ch3Title"),
      body: t("ch3Body"),
      visual: (
        <div className="relative overflow-hidden rounded-[28px] bg-husk px-4 pb-6 pt-10">
          <div className="golden-glow absolute inset-0 opacity-70" />
          <div className="relative flex items-end justify-center gap-1 sm:gap-3" dir="ltr">
            {[
              ["zlight-sfo-1-5l", "1.5 L", "h-28 sm:h-36"],
              ["lamia-sfo-5l", "5 L", "h-32 sm:h-44"],
              ["khlood-tin-17l", "17 L", "h-36 sm:h-48"],
              ["ufvo-sfo-jerrycan", "20 L", "h-36 sm:h-48"],
              ["unigold-pail", "25 kg", "h-32 sm:h-44"],
            ].map(([img, size, h]) => (
              <figure key={img} className="flex h-44 min-w-0 flex-1 flex-col items-center justify-end gap-2 sm:h-60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(`/img/products/${img}.webp`)} alt="" className={`${h} w-auto max-w-full object-contain`} loading="lazy" />
                <figcaption className="whitespace-nowrap rounded-full bg-cream px-2 py-1 text-[10px] font-semibold text-deep sm:px-2.5 sm:text-[11px]">{size}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ),
    },
    {
      num: d("04"),
      title: t("ch4Title"),
      body: t("ch4Body"),
      visual: (
        <div className="relative overflow-hidden rounded-[28px] bg-grove p-7 text-cream sm:p-9">
          <Pattern kind="palm-leaves" className="inset-0 text-lime/[.22]" />
          <Icon name="export" className="relative h-12 w-12 [&_*]:stroke-cream" />
          <div className="relative mt-6 flex flex-wrap gap-2.5">
            {regions.map((r, i) => (
              <span
                key={r}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  i === 0 ? "border-gold bg-gold text-deep" : "border-cream/25 bg-cream/5"
                }`}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const stats = [
    { value: site.founded, label: t("statFounded"), plain: true },
    { value: brands.length, label: t("statBrands") },
    { value: products.length, label: t("statProducts"), suffix: "+" },
  ];

  const solutions: { key: "bakery" | "horeca" | "retail" | "industry"; icon: IconName }[] = [
    { key: "bakery", icon: "croissant" },
    { key: "horeca", icon: "chef" },
    { key: "retail", icon: "store" },
    { key: "industry", icon: "factory" },
  ];

  const catIcon: Record<string, IconName> = { bottle: "bottle", olive: "olive", tin: "tin", croissant: "croissant" };

  return (
    <>
      <VideoHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        sub={t("heroSub")}
        primary={{ href: L("/products"), label: tc("explore") }}
        secondary={{ href: L("/contact"), label: t("ctaPrimary") }}
        catalogueView={t("catalogueView")}
        catalogueDownload={t("catalogueDownload")}
        scrollLabel={tc("scroll")}
        outroTitle={t("storyIntro")}
        outroSub={t("storyIntroSub")}
        rtl={locale === "ar"}
      />

      <StoryThread chapters={chapters} />

      {/* ── STATS BAND (Al Taimi) ── */}
      <section className="relative overflow-hidden bg-deep text-cream">
        <div className="dot-grid-light absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.22em] text-cream/55">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {t("statsTag")}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-1 py-4 sm:px-6 ${i > 0 ? "lg:border-s lg:border-cream/10" : ""} ${i % 2 === 1 ? "border-s border-cream/10 lg:border-s" : ""}`}>
                <div className="font-display text-5xl font-bold tracking-tight text-gold sm:text-6xl" dir="ltr">
                  {s.plain ? d(s.value) : <CountUp value={s.value} suffix={s.suffix} locale={locale} />}
                </div>
                <div className="mt-2 text-[12px] font-semibold uppercase tracking-[.14em] text-cream/60">{s.label}</div>
              </div>
            ))}
            <div className="border-s border-cream/10 px-1 py-4 sm:px-6">
              <div className="text-left font-display text-3xl font-bold leading-[1.1] text-gold sm:text-[2.6rem] rtl:leading-[1.6]">{t("statRange")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeader num={d("01")} eyebrow={t("catEyebrow")} title={t("catTitle")} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <Link
                href={L(`/products?category=${c.slug}`)}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-deep/10 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(30,51,24,.45)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-husk">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Pattern kind={categoryPattern[c.slug]} className="inset-0 text-grove/[.28]" />
                  <img src={c.image} alt="" className="relative h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream">
                      <Icon name={catIcon[c.icon]} className="h-7 w-7" />
                    </span>
                    <h3 className="font-display text-xl font-bold leading-tight text-deep">{tr(c.name, locale)}</h3>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-deep/65">{tr(c.blurb, locale)}</p>
                  <div className="mt-5 flex items-center justify-between text-sm font-semibold text-grove">
                    <span>
                      {d(productsByCategory(c.slug).length)} {tc("products")}
                    </span>
                    <span className="inline-block transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-dashed border-grove/40 px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-deep">{tc("comingSoon")}</span>
              <span className="font-display text-lg font-semibold text-deep">
                {locale === "ar" ? "الأجبان المطبوخة والصلصات" : "Processed cheese & sauces"}
              </span>
            </div>
            <Link href={L("/contact")} className="text-sm font-semibold text-grove hover:text-deep">
              {tc("enquire")} <span className="inline-block rtl:rotate-180">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── BRANDS (Bafail marquee) ── */}
      <section className="overflow-hidden bg-husk py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader num={d("02")} eyebrow={t("brandsEyebrow")} title={t("brandsTitle")} />
        </div>
        <div className="mt-12">
          <BrandMarquee>
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={L(`/brands#${b.slug}`)}
                draggable={false}
                className="group w-[260px] shrink-0 overflow-hidden rounded-[22px] border border-deep/10 bg-white transition-shadow hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden bg-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt={tr(b.name, locale)} draggable={false} className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-center justify-between gap-3 p-4" dir={locale === "ar" ? "rtl" : "ltr"}>
                  <div>
                    <div className="font-display text-lg font-bold text-deep">{tr(b.name, locale)}</div>
                    <div className="text-[13px] text-deep/60">{tr(b.line, locale)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </BrandMarquee>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-5 lg:px-8">
          <Link href={L("/brands")} className="inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-semibold text-deep hover:text-grove">
            {t("brandsCta")} <span className="inline-block rtl:rotate-180">→</span>
          </Link>
        </div>
      </section>

      {/* ── SOLUTIONS (AAK / Puratos paths, Growxcel glow cards) ── */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeader num={d("03")} eyebrow={t("solEyebrow")} title={t("solTitle")} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.06} className="h-full">
              <Link href={L(`/solutions#${s.key}`)} className="glow-border block h-full">
                <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-white p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <Icon name={s.icon} className="h-9 w-9" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-deep">{ts(s.key)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-deep/65">{ts(`${s.key}Body`)}</p>
                  <span className="mt-6 text-sm font-semibold text-grove">
                    {tc("learnMore")} <span className="inline-block rtl:rotate-180">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRIVATE LABEL (Afaq "how we work") ── */}
      <section className="relative overflow-hidden bg-deep py-24 text-cream lg:py-32">
        <Pattern kind="olive-branches" className="inset-0 text-lime/[.13]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div>
            <SectionHeader num={d("04")} eyebrow={t("plEyebrow")} title={t("plTitle")} sub={t("plBody")} dark />
            <Reveal>
              <Link href={L("/private-label")} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[15px] font-semibold text-deep transition-colors hover:bg-cream">
                {t("plCta")} <span className="inline-block rtl:rotate-180">→</span>
              </Link>
            </Reveal>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {plSteps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <li className="h-full rounded-[22px] border border-cream/12 bg-cream/[.04] p-6">
                  <div className="font-display text-4xl font-extrabold text-gold">{d(`0${i + 1}`)}</div>
                  <h3 className="mt-4 font-display text-lg font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── EVENTS (real booth photos) ── */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <SectionHeader num={d("05")} eyebrow={t("eventsEyebrow")} title={t("eventsTitle")} />
          <Reveal>
            <p className="max-w-md text-[17px] leading-relaxed text-deep/65 lg:ms-auto">{t("eventsBody")}</p>
          </Reveal>
        </div>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {[
            ["booth-4", "col-span-2 row-span-2"],
            ["booth-6", ""],
            ["booth-5", "row-span-2"],
            ["booth-2", ""],
          ].map(([img, cls], i) => (
            <Reveal key={img} delay={i * 0.06} className={cls}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(`/img/events/${img}.webp`)} alt="United Flowers exhibition stand" className="h-full w-full rounded-[22px] object-cover" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-gold">
        <Pattern kind="sunflowers" className="inset-0 text-deep/[.16]" />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center lg:py-28">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.25rem)] font-extrabold leading-[.98] tracking-[-0.035em] text-deep">{t("ctaTitle")}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-deep/75">{t("ctaBody")}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={L("/contact")} className="rounded-full bg-deep px-7 py-4 text-[15px] font-semibold text-cream transition-colors hover:bg-grove">
                {t("ctaPrimary")}
              </Link>
              <CatalogueButton view={t("catalogueView")} download={t("catalogueDownload")} tone="gold" />
              <a href={site.phoneHref} className="rounded-full border-[1.5px] border-deep px-7 py-4 text-[15px] font-semibold text-deep transition-colors hover:bg-deep hover:text-cream">
                {t("ctaSecondary")} · <span dir="ltr">{site.phone}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
