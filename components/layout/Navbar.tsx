"use client";

import { asset } from "@/lib/assets";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/lib/nav";
import { site } from "@/lib/site";

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const otherLocale = locale === "en" ? "ar" : "en";
  const rest = pathname.replace(/^\/(en|ar)/, "") || "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => rest.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-cream/90 backdrop-blur-md border-b border-deep/10" : "bg-cream border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <Link href={`/${locale}`} className="shrink-0" aria-label="United Flowers home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/logo.png")} alt="United Flowers" className="h-10 w-auto sm:h-11" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  isActive(item.href) ? "bg-deep/[.06] text-deep" : "text-deep/70 hover:text-deep"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/${otherLocale}${rest}`}
              className={`rounded-full px-3 py-2 text-deep/80 transition-colors hover:text-grove ${
                otherLocale === "ar" ? "font-body-ar text-[15px] font-semibold" : "text-[13px] font-semibold tracking-wider"
              }`}
              hrefLang={otherLocale}
            >
              {t("switch")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="hidden rounded-full bg-grove px-5 py-2.5 text-[14px] font-semibold text-cream transition-colors hover:bg-deep sm:inline-flex"
            >
              {t("partner")}
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-deep/15 text-deep lg:hidden"
              aria-label={t("menu")}
            >
              <span className="flex w-5 flex-col gap-[5px]">
                <span className="h-[1.5px] w-full bg-current" />
                <span className="h-[1.5px] w-3 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu (from the Bafail build) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-deep text-cream"
          >
            <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
              <span className="rounded-xl bg-cream px-3 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset("/logo.png")} alt="United Flowers" className="h-8 w-auto" />
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-cream hover:text-gold">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="mx-auto max-w-3xl px-5 py-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-cream/10"
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    className="group flex items-center justify-between py-5 font-display text-3xl font-semibold hover:text-gold"
                  >
                    {t(item.key)}
                    <span className="inline-block text-gold opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180">→</span>
                  </Link>
                </motion.div>
              ))}
              <div className="mt-10 text-sm text-cream/50" dir="ltr">
                {site.phone} · {site.email}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
