import Link from "next/link";
import { getBrand, tagLabels, tr, type Product } from "@/lib/catalog";
import { Pattern, categoryPattern } from "@/components/ui/Pattern";

export default function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const brand = getBrand(product.brand);
  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-deep/10 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(30,51,24,.45)]"
    >
      <div className="relative aspect-square overflow-hidden bg-husk">
        <Pattern kind={categoryPattern[product.category]} className="inset-0 text-grove/[.22]" />
        {product.cutout && <div className="golden-glow absolute inset-0 opacity-50" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={tr(product.name, locale)}
          className={`relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03] ${
            product.cutout ? "p-6" : "p-3"
          }`}
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-grove">{brand && tr(brand.name, locale)}</span>
          {product.tags?.includes("tff") && (
            <span className="rounded-full bg-deep px-2 py-0.5 text-[10px] font-semibold text-gold">{tr(tagLabels.tff, locale)}</span>
          )}
        </div>
        <h3 className="mt-1.5 font-display text-[17px] font-bold leading-snug text-deep">{tr(product.name, locale)}</h3>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4" dir="ltr">
          {product.packs.slice(0, 3).map((p) => (
            <span key={p.size} className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-deep/75">
              {p.size}
            </span>
          ))}
          {product.packs.length > 3 && (
            <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-deep/75">+{product.packs.length - 3}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
