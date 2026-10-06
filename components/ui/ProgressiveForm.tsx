"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { getProduct, tr } from "@/lib/catalog";
import { site } from "@/lib/site";
import { localizeDigits } from "@/lib/digits";

// Step-by-step enquiry form, adapted from the Growxcel build:
// chip questions first, contact details last, then a prefilled email.
export default function ProgressiveForm({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  const params = useSearchParams();
  const productSlug = params.get("product");
  const product = productSlug ? getProduct(productSlug) : undefined;

  const questions = [
    { key: "business", label: t("q1Label"), q: t("q1"), options: t.raw("q1Options") as string[] },
    { key: "interest", label: t("q2Label"), q: t("q2"), options: t.raw("q2Options") as string[] },
    { key: "volume", label: t("q3Label"), q: t("q3"), options: t.raw("q3Options") as string[] },
  ];
  const total = questions.length + 1;

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [fields, setFields] = useState({ name: "", company: "", email: "", phone: "" });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (product) setAnswers((a) => ({ ...a, product: tr(product.name, "en") }));
  }, [product]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);
  const canNext = step < questions.length ? Boolean(answers[questions[step].key]) : fields.name.trim() && emailOk;

  const go = (d: number) => {
    setDir(d);
    setStep((s) => s + d);
  };

  const submit = () => {
    const body = [
      `Name: ${fields.name}`,
      fields.company && `Company: ${fields.company}`,
      `Email: ${fields.email}`,
      fields.phone && `Phone: ${fields.phone}`,
      answers.product && `Product: ${answers.product}`,
      `Business: ${answers.business}`,
      `Interest: ${answers.interest}`,
      `Volume: ${answers.volume}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `[Website] Enquiry from ${fields.company || fields.name}`,
    )}&body=${encodeURIComponent(body)}`;
    setTimeout(() => setDone(true), 400);
  };

  if (done) {
    return (
      <div className="rounded-[28px] bg-deep p-10 text-cream">
        <div className="font-display text-4xl font-extrabold text-gold">{t("successTitle")}</div>
        <p className="mt-3 text-cream/75">{t("successBody")}</p>
      </div>
    );
  }

  const input =
    "w-full rounded-2xl border border-deep/15 bg-cream px-4 py-3.5 text-[15px] text-deep outline-none transition focus:border-grove focus:ring-2 focus:ring-lime/40";

  return (
    <div className="rounded-[28px] border border-deep/10 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(30,51,24,.5)] sm:p-9">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-deep/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-lime to-gold rtl:bg-gradient-to-l" animate={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-deep/50">{t("step", { n: localizeDigits(step + 1, locale), total: localizeDigits(total, locale) })}</span>
      </div>

      {product && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-cream p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
          <span className="text-sm font-medium text-deep">{tr(product.name, locale)}</span>
        </div>
      )}

      <div className="relative min-h-[280px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 * dir * (locale === "ar" ? -1 : 1) }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 * dir * (locale === "ar" ? -1 : 1) }}
            transition={{ duration: 0.25 }}
          >
            {step < questions.length ? (
              <>
                <div className="text-[12px] font-semibold uppercase tracking-[.2em] text-grove">{questions[step].label}</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-deep sm:text-3xl">{questions[step].q}</h3>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {questions[step].options.map((o) => {
                    const on = answers[questions[step].key] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setAnswers((a) => ({ ...a, [questions[step].key]: o }))}
                        className={`rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all ${
                          on ? "border-deep bg-deep text-cream" : "border-deep/15 bg-cream text-deep hover:border-deep/40"
                        }`}
                        aria-pressed={on}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="text-[12px] font-semibold uppercase tracking-[.2em] text-grove">{t("q4Label")}</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-deep sm:text-3xl">{t("q4")}</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <input className={input} placeholder={t("name")} value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} autoComplete="name" />
                  <input className={input} placeholder={t("company")} value={fields.company} onChange={(e) => setFields({ ...fields, company: e.target.value })} autoComplete="organization" />
                  <input className={input} type="email" placeholder={t("emailField")} value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} autoComplete="email" />
                  <input className={input} type="tel" dir="ltr" placeholder={t("phone")} value={fields.phone} onChange={(e) => setFields({ ...fields, phone: e.target.value })} autoComplete="tel" />
                </div>
                <p className="mt-4 text-xs text-deep/50">{t("privacy")}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button type="button" onClick={() => go(-1)} className={`text-sm font-semibold text-deep/60 hover:text-deep ${step === 0 ? "invisible" : ""}`}>
          <span className="inline-block rtl:rotate-180">←</span> {t("back")}
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => (step === total - 1 ? submit() : go(1))}
          className="rounded-full bg-deep px-7 py-3.5 text-[15px] font-semibold text-cream transition-colors hover:bg-grove disabled:cursor-not-allowed disabled:opacity-35"
        >
          {step === total - 1 ? t("send") : t("continue")} <span className="inline-block rtl:rotate-180">→</span>
        </button>
      </div>
    </div>
  );
}
