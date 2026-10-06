import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Icon, { type IconName } from "@/components/ui/Icon";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "export" });
  return { title: t("eyebrow"), description: t("sub") };
}

const whyIcons: IconName[] = ["pallet", "truck", "clock", "tag"];

export default async function ExportPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations("export");
  const regions = t.raw("regions") as string[];
  const why = t.raw("why") as { t: string; d: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} tone="gold" pattern="palm-leaves" />

      <section className="relative overflow-hidden bg-deep py-20 text-cream lg:py-28">
        <div className="dot-grid-light absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          {/* Ripple map: Jeddah at the centre, regions spreading outward */}
          <div className="relative mx-auto aspect-square max-w-[560px]">
            {[1, 0.78, 0.56, 0.34].map((s, i) => (
              <div key={s} className="absolute inset-0 m-auto rounded-full border border-gold/30" style={{ width: `${s * 100}%`, height: `${s * 100}%`, opacity: 0.4 + i * 0.15 }} />
            ))}
            <div className="absolute inset-0 m-auto flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gold text-center text-deep shadow-[0_0_80px_rgba(244,179,52,.5)]">
              <Icon name="factory" className="h-9 w-9" />
              <span className="mt-1 text-xs font-bold">{locale === "ar" ? "جدة" : "Jeddah"}</span>
            </div>
            {regions.map((r, i) => {
              const angle = (i / regions.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 30 + (i % 2) * 14;
              return (
                <Reveal key={r} delay={i * 0.08} className="absolute inset-0" y={8}>
                  <span
                    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-cream/25 bg-deep px-4 py-2 text-sm font-medium"
                    style={{ left: `${50 + Math.cos(angle) * radius}%`, top: `${50 + Math.sin(angle) * radius}%` }}
                  >
                    {r}
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-deep">{t("whyTitle")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06}>
              <div className="h-full rounded-[24px] border border-deep/10 bg-white p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                  <Icon name={whyIcons[i]} className="h-9 w-9" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-deep">{w.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-deep/65">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href={`/${locale}/contact`} className="mt-10 inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-[15px] font-semibold text-cream hover:bg-grove">
            {t("cta")} <span className="inline-block rtl:rotate-180">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
