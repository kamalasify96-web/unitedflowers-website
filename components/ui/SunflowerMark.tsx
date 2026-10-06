// The "Sunflower Drop" brand graphic from the United Flowers brand book:
// 12 outer petals, 12 inner petals, seed head and the golden drop.
// It is a supporting graphic, never a replacement for the logo.

const PETAL = "M100 62 C112 50 113 26 100 6 C87 26 88 50 100 62Z";
const DROP = "M100 50 C100 50 74 84 74 106 A26 26 0 0 0 126 106 C126 84 100 50 100 50Z";
const SOCKET = "M100 44 C100 44 70 82 70 106 A30 30 0 0 0 130 106 C130 82 100 44 100 44Z";
const ANGLES = Array.from({ length: 12 }, (_, i) => i * 30);

export function DropGradient({ id = "ufDropG" }: { id?: string }) {
  return (
    <radialGradient id={id} cx="38%" cy="62%" r="70%">
      <stop offset="0" stopColor="#FFF6D8" />
      <stop offset=".28" stopColor="#FFD25E" />
      <stop offset=".7" stopColor="#F4B334" />
      <stop offset="1" stopColor="#E08A1E" />
    </radialGradient>
  );
}

export function OuterPetals({ fill = "#B7CF3E" }: { fill?: string }) {
  return (
    <g fill={fill}>
      {ANGLES.map((a) => (
        <path key={a} d={PETAL} transform={`rotate(${a} 100 100)`} />
      ))}
    </g>
  );
}

export function InnerPetals({ fill = "#4E7738" }: { fill?: string }) {
  return (
    <g fill={fill}>
      {ANGLES.map((a) => (
        <path key={a} d={PETAL} transform={`rotate(${a + 15} 100 100) translate(100 100) scale(.78) translate(-100 -100)`} />
      ))}
    </g>
  );
}

export function SeedHead() {
  return <circle cx="100" cy="100" r="40" fill="#4E7738" />;
}

export function DropShape({ withSocket = true }: { withSocket?: boolean }) {
  return (
    <>
      {withSocket && <path d={SOCKET} fill="#FBF7EC" />}
      <path d={DROP} fill="url(#ufDropG)" />
      <ellipse cx="90" cy="111" rx="5" ry="7" fill="#fff" opacity=".85" />
    </>
  );
}

/** A standalone drop, cropped to its own bounds (used for the falling drop). */
export function Drop({ className }: { className?: string }) {
  return (
    <svg viewBox="70 44 60 92" className={className} aria-hidden="true">
      <defs>
        <DropGradient />
      </defs>
      <DropShape />
    </svg>
  );
}

export function SunflowerMark({
  variant = "full",
  className,
}: {
  variant?: "full" | "line";
  className?: string;
}) {
  if (variant === "line") {
    return (
      <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3">
          {ANGLES.map((a) => (
            <path key={a} d={PETAL} transform={`rotate(${a} 100 100)`} />
          ))}
        </g>
        {/* Drop scaled to sit centred inside the petal ring, clear of every petal */}
        <path d={DROP} fill="currentColor" transform="translate(100 100) scale(.55) translate(-100 -91)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <DropGradient />
      </defs>
      <OuterPetals />
      <InnerPetals />
      <SeedHead />
      <DropShape />
    </svg>
  );
}
