import Reveal from "./Reveal";

// Numbered section header with a hairline, from the Afaq build.
export default function SectionHeader({
  num,
  eyebrow,
  title,
  sub,
  dark = false,
  center = false,
}: {
  num?: string;
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[.22em] ${
          dark ? "text-lime" : "text-grove"
        } ${center ? "justify-center" : ""}`}
      >
        {num && <span className="font-display tabular-nums">{num}</span>}
        {num && <span className={`h-px w-10 ${dark ? "bg-lime/50" : "bg-grove/40"}`} />}
        <span>{eyebrow}</span>
      </div>
      <h2
        className={`font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.03em] ${
          dark ? "text-cream" : "text-deep"
        }`}
      >
        {title}
      </h2>
      {sub && <p className={`mt-5 text-[17px] leading-relaxed ${dark ? "text-cream/70" : "text-deep/65"}`}>{sub}</p>}
    </Reveal>
  );
}
