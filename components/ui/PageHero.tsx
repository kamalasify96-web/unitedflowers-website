import Reveal from "./Reveal";
import { Pattern, type PatternKind } from "./Pattern";

export default function PageHero({
  eyebrow,
  title,
  sub,
  tone = "cream",
  pattern = "sunflowers",
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  tone?: "cream" | "deep" | "gold";
  pattern?: PatternKind;
  children?: React.ReactNode;
}) {
  const bg = tone === "deep" ? "bg-deep text-cream" : tone === "gold" ? "bg-gold text-deep" : "bg-cream text-deep";
  const eyebrowColor = tone === "deep" ? "text-lime" : "text-grove";
  const subColor = tone === "deep" ? "text-cream/70" : "text-deep/70";
  const markColor = tone === "deep" ? "text-lime/[.14]" : tone === "gold" ? "text-deep/[.12]" : "text-grove/[.2]";

  return (
    <section className={`relative overflow-hidden ${bg}`}>
      <Pattern kind={pattern} className={`inset-0 ${markColor}`} />
      {/* fade the artwork out toward the content below */}
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${tone === "deep" ? "from-deep" : tone === "gold" ? "from-gold" : "from-cream"} to-transparent`} />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 lg:px-8 lg:pb-20 lg:pt-24">
        <Reveal>
          <div className={`mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[.22em] ${eyebrowColor}`}>
            <span className="h-px w-10 bg-current opacity-50" />
            {eyebrow}
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6.5vw,5.25rem)] font-extrabold leading-[.95] tracking-[-0.04em]">{title}</h1>
          {sub && <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${subColor}`}>{sub}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
