import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import ProgressiveForm from "@/components/ui/ProgressiveForm";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "contact" });
  return { title: t("eyebrow"), description: t("sub") };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
        <Suspense>
          <ProgressiveForm locale={locale} />
        </Suspense>

        <Reveal delay={0.08}>
          <div className="space-y-4">
            <div className="rounded-[28px] bg-deep p-7 text-cream">
              <div className="text-[12px] font-semibold uppercase tracking-[.2em] text-lime">{t("visit")}</div>
              <p className="mt-3 leading-relaxed text-cream/85">{locale === "ar" ? site.address.ar : site.address.en}</p>
              <dl className="mt-6 space-y-3 text-[15px]">
                <div className="flex justify-between gap-4 border-t border-cream/10 pt-3">
                  <dt className="text-cream/55">{t("call")}</dt>
                  <dd dir="ltr"><a className="hover:text-gold" href={site.phoneHref}>{site.phone}</a></dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-cream/10 pt-3">
                  <dt className="text-cream/55">{t("email")}</dt>
                  <dd><a className="hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a></dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-cream/10 pt-3">
                  <dt className="text-cream/55">{t("fax")}</dt>
                  <dd dir="ltr">{site.fax}</dd>
                </div>
              </dl>
            </div>
            <iframe
              title="United Flowers factory location"
              src={site.mapEmbed}
              className="h-72 w-full rounded-[28px] border-0 grayscale-[30%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
