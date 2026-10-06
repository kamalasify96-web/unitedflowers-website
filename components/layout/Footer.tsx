import { asset } from "@/lib/assets";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { navItems } from "@/lib/nav";
import { categories, tr } from "@/lib/catalog";
import { site } from "@/lib/site";
import { localizeDigits } from "@/lib/digits";
import { Pattern } from "@/components/ui/Pattern";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-deep text-cream">
      <Pattern kind="sunflowers" className="inset-0 text-lime/[.09]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div>
          <span className="inline-block rounded-2xl bg-cream px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/logo.png")} alt="United Flowers" className="h-12 w-auto" />
          </span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">{t("tagline")}</p>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-lime">{t("explore")}</h3>
          <ul className="space-y-2.5 text-sm text-cream/75">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link className="hover:text-gold" href={`/${locale}/products?category=${c.slug}`}>
                  {tr(c.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-lime">{t("company")}</h3>
          <ul className="space-y-2.5 text-sm text-cream/75">
            {navItems.slice(1).map((n) => (
              <li key={n.key}>
                <Link className="hover:text-gold" href={`/${locale}${n.href}`}>
                  {tn(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-lime">{t("reach")}</h3>
          <address className="space-y-2.5 text-sm not-italic text-cream/75">
            <p className="leading-relaxed">{locale === "ar" ? site.address.ar : site.address.en}</p>
            <p dir="ltr" className="rtl:text-right">
              <a className="hover:text-gold" href={site.phoneHref}>{site.phone}</a>
            </p>
            <p>
              <a className="hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </address>
        </div>
      </div>
      <div className="relative border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-5 py-6 text-xs text-cream/45 lg:px-8">
          <span>
            © {localizeDigits(year, locale)} {site.name}. {t("rights")}
          </span>
          <span>{t("madeBy")}</span>
        </div>
      </div>
    </footer>
  );
}
