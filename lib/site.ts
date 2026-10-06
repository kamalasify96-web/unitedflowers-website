import { asset } from "@/lib/assets";

export const site = {
  name: "United Flowers for Vegetable Oils Co. Ltd.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://unitedflowers.biz",
  phone: "+966 12 268 2000",
  phoneHref: "tel:+966122682000",
  fax: "+966 12 637 0081",
  email: "info@unitedflowers.biz",
  // TODO: confirm a WhatsApp business number with United Flowers. The floating
  // button and product WhatsApp links stay hidden until this is set.
  whatsapp: "" as string,
  address: {
    en: "Jeddah Industrial City, Phase III, 5119 Al-Mahjar, Unit 1, Jeddah 22423-7990, Saudi Arabia",
    ar: "المدينة الصناعية بجدة، المرحلة الثالثة، ٥١١٩ المحجر، وحدة ١، جدة ٢٢٤٢٣-٧٩٩٠، المملكة العربية السعودية",
  },
  mapEmbed:
    "https://www.google.com/maps?q=Jeddah+Industrial+City+Phase+3+Al+Mahjar&output=embed",
  founded: 2008,
  catalogueUrl: asset("/catalogue/United-Flowers-Product-Catalogue-2026.pdf"),
};

export const locales = ["en", "ar"] as const;

export function waLink(text: string) {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
