import { Suspense } from "react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import ProductBrowser from "@/components/ui/ProductBrowser";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "categories" });
  return { title: t("title"), description: t("sub") };
}

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("categories");
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <Suspense>
          <ProductBrowser locale={locale} />
        </Suspense>
      </section>
    </>
  );
}
