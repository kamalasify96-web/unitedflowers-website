import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { asset } from "@/lib/assets";
import { localizeDigits } from "@/lib/digits";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "privateLabel" });
  return { title: t("eyebrow"), description: t("sub") };
}

export default async function PrivateLabelPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations("privateLabel");
  const what = t.raw("what") as string[];
  const steps = t.raw("steps") as { t: string; d: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} tone="deep" pattern="olive-branches">
        <Link href={`/${locale}/contact`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[15px] font-semibold text-deep hover:bg-cream">
          {t("cta")} <span className="inline-block rtl:rotate-180">→</span>
        </Link>
      </PageHero>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <Reveal>
          {/* Blank pack that takes "your brand" — the drop story's private label chapter */}
          <div className="relative overflow-hidden rounded-[28px] bg-husk p-10">
            <div className="golden-glow absolute inset-0" />
            <div className="relative mx-auto flex max-w-sm items-end justify-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/products/ufvo-sfo-jerrycan.webp")} alt="" className="h-56 w-auto" />
              <div className="relative h-44 w-28 rounded-t-[36px] rounded-b-xl bg-gradient-to-b from-gold to-amber shadow-2xl">
                <div className="absolute inset-x-2 top-14 rounded-lg border-2 border-dashed border-deep/40 bg-cream/90 px-2 py-4 text-center font-display text-sm font-bold text-deep">
                  {locale === "ar" ? "علامتك هنا" : "Your brand here"}
                </div>
                <div className="absolute -top-5 left-1/2 h-6 w-10 -translate-x-1/2 rounded-md bg-deep" />
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-deep">{t("whatTitle")}</h2>
          <ul className="mt-6 space-y-3">
            {what.map((w) => (
              <li key={w} className="flex items-start gap-3 rounded-2xl border border-deep/10 bg-white p-4 text-[16px] text-deep/80">
                <Icon name="drop" className="h-7 w-7 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-husk py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-deep">{t("stepsTitle")}</h2>
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <li className="relative h-full rounded-[24px] border border-deep/10 bg-white p-7">
                  <div className="font-display text-5xl font-extrabold text-gold">{localizeDigits(`0${i + 1}`, locale)}</div>
                  <h3 className="mt-5 font-display text-xl font-bold text-deep">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-deep/65">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <Link href={`/${locale}/contact`} className="mt-10 inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-[15px] font-semibold text-cream hover:bg-grove">
              {t("cta")} <span className="inline-block rtl:rotate-180">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
