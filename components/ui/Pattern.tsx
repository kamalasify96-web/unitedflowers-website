// Line-art patterns extracted from the United Flowers printed catalogue
// (public/patterns/*.png). Each file is a transparent mask, so the colour comes
// from CSS (`text-*` sets the tint) and the artwork stays crisp on any background.

export type PatternKind = "sunflowers" | "bakery-doodles" | "palm-leaves" | "olive-branches";

import type { CategorySlug } from "@/lib/catalog";
import { asset } from "@/lib/assets";

export const categoryPattern: Record<CategorySlug, PatternKind> = {
  "cooking-oils": "sunflowers",
  "olive-oil": "olive-branches",
  ghee: "sunflowers",
  "bakery-fats": "bakery-doodles",
};

export function Pattern({
  kind,
  className = "",
  position = "top",
}: {
  kind: PatternKind;
  /** Size, position and tint, e.g. "inset-0 text-grove/20". */
  className?: string;
  position?: "top" | "bottom" | "center";
}) {
  const url = `url(${asset(`/patterns/${kind}.png`)})`;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-current ${className}`}
      style={{
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "cover",
        maskSize: "cover",
        WebkitMaskPosition: position,
        maskPosition: position,
      }}
    />
  );
}
