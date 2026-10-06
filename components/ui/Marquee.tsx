"use client";

import { ReactNode } from "react";

export default function Marquee({ children, durationSeconds = 32 }: { children: ReactNode; durationSeconds?: number }) {
  return (
    <div
      dir="ltr"
      className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div
        className="flex w-max motion-safe:[animation:marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-5 pe-5" aria-hidden={copy === 1 ? "true" : undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
