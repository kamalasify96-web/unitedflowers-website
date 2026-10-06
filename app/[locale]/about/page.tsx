import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { asset } from "@/lib/assets";
import { Pattern, type PatternKind } from "@/components/ui/Pattern";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "about" });
  return { title: t("eyebrow"), description: t("sub") };
}

// TODO: replace with the certificates United Flowers actually holds
// (e.g. ISO 9001, ISO 22000 / FSSC, HACCP, SFDA, Halal). Shown as "to confirm".
const certs = ["ISO 9001", "ISO 22000", "HACCP", "SFDA", "Halal"];

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const values = t.raw("values") as { t: string; d: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:pb-28">
        <Reveal>
          <p className="text-[19px] leading-[1.8] text-deep/80">{t("story")}</p>
          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <div className="font-display text-5xl font-extrabold text-grove">{site.founded}</div>
              <div className="mt-1 text-sm text-deep/60">{locale === "ar" ? "سنة التأسيس" : "Founded"}</div>
            </div>
            <div>
              <div className="font-display text-5xl font-extrabold text-grove">{locale === "ar" ? "جدة" : "Jeddah"}</div>
              <div className="mt-1 text-sm text-deep/60">{locale === "ar" ? "المدينة الصناعية" : "Industrial City"}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid grid-cols-2 gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/events/booth-6.webp")} alt="United Flowers team at a trade show" className="col-span-2 aspect-[16/10] w-full rounded-[24px] object-cover" loading="lazy" />
            {[
              ["/img/catalogue/linda-ghee.webp", "olive-branches"],
              ["/img/catalogue/unigold-croissant.webp", "bakery-doodles"],
            ].map(([src, kind]) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-[24px] bg-husk">
                <Pattern kind={kind as PatternKind} className="inset-0 text-grove/[.3]" />
                <div className="golden-glow absolute inset-0 opacity-60" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(src)} alt="" className="relative h-full w-full object-contain p-6" loading="lazy" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-deep py-20 text-cream lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:px-8">
          {[
            [t("missionTitle"), t("mission")],
            [t("visionTitle"), t("vision")],
          ].map(([h, b]) => (
            <Reveal key={h}>
              <div className="h-full rounded-[28px] border border-cream/12 bg-cream/[.04] p-8 lg:p-10">
                <div className="text-[12px] font-semibold uppercase tracking-[.22em] text-lime">{h}</div>
                <p className="mt-4 font-display text-2xl font-semibold leading-snug lg:text-[1.75rem]">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-3xl font-bold">{t("valuesTitle")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Reveal key={v.t}>
                <div className="border-t-2 border-lime pt-5">
                  <h3 className="font-display text-xl font-bold">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex items-center gap-3">
            <Icon name="quality" className="h-12 w-12" />
            <h2 className="font-display text-3xl font-bold text-deep">{t("qualityTitle")}</h2>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-deep/75">{t("quality")}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex items-center gap-3">
            <Icon name="certified" className="h-12 w-12" />
            <h2 className="font-display text-3xl font-bold text-deep">{t("certTitle")}</h2>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {certs.map((c) => (
              <span key={c} className="rounded-xl border border-dashed border-deep/25 bg-white px-4 py-2.5 font-display text-sm font-semibold text-deep/70">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-deep/45">{t("certNote")}</p>
        </Reveal>
      </section>

      <section className="bg-husk">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-14 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-deep">{t("careersTitle")}</h2>
            <p className="mt-2 text-deep/65">{t("careersBody")}</p>
          </div>
          <Link href={`mailto:${site.email}?subject=CV`} className="rounded-full bg-deep px-6 py-3.5 text-[15px] font-semibold text-cream hover:bg-grove">
            {t("careersCta")}
          </Link>
        </div>
      </section>
    </>
  );
}
