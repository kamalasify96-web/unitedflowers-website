"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { Drop } from "@/components/ui/SunflowerMark";

// After the hero's golden pool fills the screen, a golden thread runs down through four chapters with
// the drop riding its tip as you scroll.

export type Chapter = { num: string; title: string; body: string; visual: ReactNode };

export default function StoryThread({ chapters }: { chapters: Chapter[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rail, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const top = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section className="relative bg-cream">
      {/* gold strip continues from the hero's pool, then waves into cream */}
      <div className="relative -mt-px h-20 bg-gold sm:h-24">
        <svg className="absolute -bottom-px left-0 h-16 w-full text-cream" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
          <path fill="currentColor" d="M0 64V30C240 0 480 0 720 22s480 42 720 8v34z" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 lg:px-8">
        <div ref={rail} className="relative">
          {/* rail + golden fill */}
          <div className="absolute bottom-0 top-0 start-[19px] w-[3px] rounded-full bg-deep/10 lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded-full bg-gradient-to-b from-gold to-amber" />
            {/* No CSS filters here: iOS Safari smears them into a streak as the drop moves */}
            <motion.div style={{ top }} className="absolute left-1/2 h-10 w-7 -translate-x-1/2 -translate-y-full">
              <span aria-hidden="true" className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(244,179,52,.4),rgba(244,179,52,0)_70%)]" />
              <Drop className="relative h-full w-full" />
            </motion.div>
          </div>

          <ol className="relative space-y-20 lg:space-y-32">
            {chapters.map((c, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={c.num} className="grid items-center gap-8 ps-14 lg:grid-cols-2 lg:gap-24 lg:ps-0">
                  <Reveal className={flip ? "lg:order-2" : ""}>
                    <div className="mb-3 font-display text-6xl font-extrabold text-gold/90 tabular-nums">{c.num}</div>
                    <h3 className="font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-deep">
                      {c.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[17px] leading-relaxed text-deep/70">{c.body}</p>
                  </Reveal>
                  <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                    {c.visual}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
