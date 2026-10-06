"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { localizeDigits } from "@/lib/digits";

// Starts counting when scrolled into view (Al Taimi stats bar behaviour).
export default function CountUp({ value, suffix = "", duration = 1.4, locale = "en" }: { value: number; suffix?: string; duration?: number; locale?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setN(Math.round((1 - Math.pow(1 - t, 5)) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {localizeDigits(n, locale)}
      {suffix}
    </span>
  );
}
