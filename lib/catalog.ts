import { asset } from "@/lib/assets";
// Product data taken from the product pages on unitedflowers.biz (Oct 2026).
// Pack sizes and shelf life are as published by United Flowers. Where the old
// site gives no pack size, the product shows "on request" (packs: []).

export type Locale = "en" | "ar";
export type T = { en: string; ar: string };

export type CategorySlug = "cooking-oils" | "olive-oil" | "ghee" | "bakery-fats";
export type BrandSlug =
  | "hanan"
  | "khlood"
  | "frai-nakhil"
  | "lamia"
  | "z-light"
  | "ufvo"
  | "ghoson-alsham"
  | "linda"
  | "saba"
  | "unigold"
  | "bakers-street"
  | "buttercup";
export type Tag = "tff" | "nz" | "omega3" | "rbd" | "evoo" | "amf";

export type Pack = { size: string; note?: string };

export type Product = {
  slug: string;
  brand: BrandSlug;
  category: CategorySlug;
  name: T;
  desc: T;
  uses?: T;
  packs: Pack[];
  shelfLife: T;
  tags?: Tag[];
  image: string;
  cutout?: boolean;
};

const rawCategories: {
  slug: CategorySlug;
  name: T;
  blurb: T;
  icon: "bottle" | "olive" | "tin" | "croissant";
  image: string;
}[] = [
  {
    slug: "cooking-oils",
    name: { en: "Cooking Oils", ar: "زيوت الطبخ" },
    blurb: {
      en: "Sunflower, corn, canola, soybean and palm olein. Refined in Jeddah for frying, cooking and baking.",
      ar: "دوار الشمس والذرة والكانولا وفول الصويا وأولين النخيل. مكررة في جدة للقلي والطبخ والخبز.",
    },
    icon: "bottle",
    image: "/img/catalogue/hanan-sfo-1-5l.webp",
  },
  {
    slug: "olive-oil",
    name: { en: "Olive Oil", ar: "زيت الزيتون" },
    blurb: {
      en: "Extra virgin and virgin olive oil, from 250 ml bottles to 17 L tins.",
      ar: "زيت زيتون بكر وبكر ممتاز، من عبوات ٢٥٠ مل حتى صفائح ١٧ لتر.",
    },
    icon: "olive",
    image: "/img/catalogue/ghoson-tin-10l.webp",
  },
  {
    slug: "ghee",
    name: { en: "Ghee", ar: "السمن" },
    blurb: {
      en: "Pure butter ghee and vegetable ghee with the authentic taste of Arabic cooking.",
      ar: "سمن زبدة نقي وسمن نباتي بالطعم الأصيل للمطبخ العربي.",
    },
    icon: "tin",
    image: "/img/catalogue/linda-ghee.webp",
  },
  {
    slug: "bakery-fats",
    name: { en: "Margarine & Bakery Fats", ar: "المارجرين ودهون المخابز" },
    blurb: {
      en: "Croissant sheets, pastry margarine, butter blends and pure butter for professional bakers.",
      ar: "ألواح الكرواسون ومارجرين المعجنات والزبدة المخلوطة والزبدة النقية للمخابز المحترفة.",
    },
    icon: "croissant",
    image: "/img/catalogue/unigold-croissant.webp",
  },
];

const rawBrands: {
  slug: BrandSlug;
  name: T;
  line: T;
  logo?: string;
  image: string;
  audience: "home" | "pro" | "both";
}[] = [
  { slug: "unigold", name: { en: "UniGold", ar: "يوني جولد" }, line: { en: "Croissant sheets & pastry margarine", ar: "ألواح الكرواسون ومارجرين المعجنات" }, logo: "/img/brands/logo-unigold-brand.jpg", image: "/img/catalogue/unigold-croissant.webp", audience: "pro" },
  { slug: "bakers-street", name: { en: "Baker's Street", ar: "بيكرز ستريت" }, line: { en: "Blended butter for bakeries", ar: "زبدة مخلوطة للمخابز" }, logo: "/img/brands/logo-bakersstreet-band.jpg", image: "/img/catalogue/bakers-street.webp", audience: "pro" },
  { slug: "buttercup", name: { en: "ButterCup", ar: "باتركب" }, line: { en: "Pure New Zealand butter", ar: "زبدة نيوزيلندية نقية" }, logo: "/img/brands/logo-buttercup-brand.jpg", image: "/img/catalogue/buttercup-block.webp", audience: "pro" },
  { slug: "linda", name: { en: "Linda", ar: "ليندا" }, line: { en: "Pure butter ghee", ar: "سمن زبدة نقي" }, logo: "/img/brands/logo-linda-brand.jpg", image: "/img/catalogue/linda-ghee.webp", audience: "both" },
  { slug: "saba", name: { en: "Saba", ar: "سبا" }, line: { en: "Vegetable ghee & margarine", ar: "سمن نباتي ومارجرين" }, logo: "/img/brands/logo-saba-brand.jpg", image: "/img/catalogue/saba-vegetable-ghee.webp", audience: "both" },
  { slug: "hanan", name: { en: "Hanan", ar: "حنان" }, line: { en: "Cooking oils, ghee & butter blend", ar: "زيوت طبخ وسمن وزبدة مخلوطة" }, logo: "/img/brands/logo-hanan.jpg", image: "/img/catalogue/hanan-sfo-1-5l.webp", audience: "both" },
  { slug: "lamia", name: { en: "Lamia", ar: "لميا" }, line: { en: "Sunflower, corn & olive oils", ar: "زيوت دوار الشمس والذرة والزيتون" }, image: "/img/products/lamia-sfo-1-5l.webp", audience: "home" },
  { slug: "z-light", name: { en: "Z-Light", ar: "زي لايت" }, line: { en: "Light sunflower & corn oils", ar: "زيوت دوار الشمس والذرة الخفيفة" }, image: "/img/products/zlight-sfo-1-5l.webp", audience: "home" },
  { slug: "khlood", name: { en: "Khlood", ar: "خلود" }, line: { en: "Palm olein for frying", ar: "أولين النخيل للقلي" }, image: "/img/products/khlood-tin-17l.webp", audience: "pro" },
  { slug: "ghoson-alsham", name: { en: "Ghoson Alsham", ar: "غصن الشام" }, line: { en: "Extra virgin olive oil", ar: "زيت زيتون بكر ممتاز" }, logo: "/img/brands/logo-olive.jpg", image: "/img/catalogue/ghoson-tin-10l.webp", audience: "both" },
  { slug: "frai-nakhil", name: { en: "Frai Nakhil", ar: "فراي النخيل" }, line: { en: "Palm olein for frying", ar: "أولين النخيل للقلي" }, image: "/img/catalogue/frai-nakhil-range.webp", audience: "both" },
  { slug: "ufvo", name: { en: "UFVO", ar: "يو إف في أو" }, line: { en: "RBD oils in bulk", ar: "زيوت مكررة بالجملة" }, image: "/img/products/ufvo-sfo-jerrycan.webp", audience: "pro" },
];

const TWO_YEARS = { en: "2 years", ar: "سنتان" };
const EIGHTEEN = { en: "18 months", ar: "١٨ شهراً" };

const rawProducts: Product[] = [
  // ── HANAN ──
  {
    slug: "hanan-pure-sunflower-oil", brand: "hanan", category: "cooking-oils",
    name: { en: "Hanan Pure Sunflower Oil", ar: "حنان زيت دوار الشمس النقي" },
    desc: {
      en: "A smart blend of healthy oils with sunflower oil. Its high monounsaturated content keeps it stable at high cooking temperatures, and it helps keep LDL cholesterol in check.",
      ar: "مزيج ذكي من الزيوت الصحية مع زيت دوار الشمس. محتواه العالي من الدهون الأحادية غير المشبعة يجعله ثابتاً في درجات الطبخ العالية، ويساعد على ضبط الكوليسترول الضار.",
    },
    packs: [{ size: "1.5 L × 6", note: "Item 1001 · 90 / pallet" }, { size: "5 L × 4", note: "Item 1003 · 48 / pallet" }], shelfLife: TWO_YEARS, image: "/img/catalogue/hanan-sfo-1-5l.webp", cutout: true,
  },
  {
    slug: "hanan-sunflower-olive-oil", brand: "hanan", category: "cooking-oils",
    name: { en: "Hanan Sunflower + Olive Oil", ar: "حنان زيت دوار الشمس مع زيت الزيتون" },
    desc: {
      en: "Light sunflower oil blended with olive oil, for everyday cooking with a gentle olive note.",
      ar: "زيت دوار الشمس الخفيف ممزوج بزيت الزيتون، للطبخ اليومي بلمسة زيتون لطيفة.",
    },
    packs: [{ size: "1.5 L × 6", note: "Item 1002 · 90 / pallet" }, { size: "5 L × 4", note: "Item 1004 · 48 / pallet" }], shelfLife: TWO_YEARS, image: "/img/catalogue/hanan-sfo-olive-1-5l.webp", cutout: true,
  },
  {
    slug: "hanan-pure-canola-oil", brand: "hanan", category: "cooking-oils",
    name: { en: "Hanan Pure Canola Oil", ar: "حنان زيت الكانولا النقي" },
    desc: {
      en: "The lowest saturated fat and highest monounsaturated fat of the range, plus omega-3 fatty acids the body can't make on its own.",
      ar: "أقل نسبة من الدهون المشبعة وأعلى نسبة من الدهون الأحادية غير المشبعة، مع أحماض أوميغا ٣ التي لا يصنعها الجسم بنفسه.",
    },
    packs: [{ size: "17 L tin", note: "Item 1005 · 60 / pallet" }], shelfLife: TWO_YEARS, tags: ["omega3"], image: "/img/catalogue/hanan-canola-1-5l.webp", cutout: true,
  },
  {
    slug: "hanan-pure-corn-oil", brand: "hanan", category: "cooking-oils",
    name: { en: "Hanan Pure Corn Oil", ar: "حنان زيت الذرة النقي" },
    desc: {
      en: "A corn oil blend with higher oleic acid, suited to all cooking and frying.",
      ar: "مزيج زيت الذرة بنسبة أعلى من حمض الأوليك، مناسب لجميع أنواع الطبخ والقلي.",
    },
    packs: [], shelfLife: TWO_YEARS, image: "/img/catalogue/hanan-corn-1-5l.webp", cutout: true,
  },
  {
    slug: "hanan-vegetable-ghee", brand: "hanan", category: "ghee",
    name: { en: "Hanan Vegetable Ghee, Butter Flavour", ar: "حنان سمن نباتي بنكهة الزبدة" },
    desc: {
      en: "Vegetable ghee made from palm and soybean oils, with a rich butter flavour. Dairy-free.",
      ar: "سمن نباتي مصنوع من زيت النخيل وفول الصويا بنكهة زبدة غنية. خالٍ من الألبان.",
    },
    packs: [{ size: "14 kg tin", note: "Item 1027" }, { size: "12 × 900 g", note: "Item 1028" }], shelfLife: EIGHTEEN, image: "/img/catalogue/hanan-ghee.webp", cutout: true,
  },
  {
    slug: "hanan-butter-blend", brand: "hanan", category: "bakery-fats",
    name: { en: "Hanan Butter Blend", ar: "حنان زبدة مخلوطة" },
    desc: {
      en: "Vegetable fats blended with milk fat (AMF) for a creamy, silky mouthfeel and the result of pure butter, at a lower cost. Trans-fat free.",
      ar: "دهون نباتية ممزوجة بدهن الحليب لملمس كريمي حريري ونتيجة الزبدة النقية بتكلفة أقل. خالية من الدهون المتحولة.",
    },
    uses: {
      en: "Butter confectionery, cookies and biscuits, muffins, cakes and white bread dough. Also for cooking in place of butter. Available with 1%, 3%, 5%, 8% AMF and above.",
      ar: "حلويات الزبدة والكوكيز والبسكويت والمافن والكيك وعجينة الخبز الأبيض، وللطبخ بدلاً من الزبدة. متوفرة بنسب دهن حليب ١٪ و٣٪ و٥٪ و٨٪ وأكثر.",
    },
    packs: [{ size: "25 kg" }], shelfLife: EIGHTEEN, tags: ["tff", "amf"], image: "/img/catalogue/hanan-butter-blend.webp", cutout: true,
  },
  // ── KHLOOD ──
  {
    slug: "khlood-palm-olein", brand: "khlood", category: "cooking-oils",
    name: { en: "Khlood Pure Palm Olein", ar: "خلود أولين النخيل النقي" },
    desc: {
      en: "Refined, bleached and deodorised (RBD) palm olein with a light texture and neutral taste. Clear and stable at high heat, so it's ideal for frying, baking and food processing. From retail bottles to 20 L jerry cans.",
      ar: "أولين نخيل مكرر ومبيض ومنزوع الرائحة بقوام خفيف وطعم محايد. صافٍ وثابت في درجات الحرارة العالية، مثالي للقلي والخبز وتصنيع الأغذية. من العبوات الصغيرة حتى جالونات ٢٠ لتر.",
    },
    packs: [
      { size: "1.5 L × 6", note: "90 / pallet" },
      { size: "17 L tin", note: "90 / pallet" },
      { size: "17 L bag-in-box", note: "48 / pallet" },
      { size: "20 L jerry can", note: "48 / pallet" },
    ],
    shelfLife: TWO_YEARS, tags: ["rbd"], image: "/img/products/khlood-tin-17l.webp", cutout: true,
  },
  // ── LAMIA ──
  {
    slug: "lamia-pure-sunflower-oil", brand: "lamia", category: "cooking-oils",
    name: { en: "Lamia Pure Sunflower Oil", ar: "لميا زيت دوار الشمس النقي" },
    desc: {
      en: "Sunflower oil blend that stays stable under high heat and keeps food tasting light.",
      ar: "مزيج زيت دوار الشمس يبقى ثابتاً تحت الحرارة العالية ويحافظ على خفة طعم الطعام.",
    },
    packs: [{ size: "1.5 L × 6" }], shelfLife: TWO_YEARS, image: "/img/products/lamia-sfo-1-5l.webp", cutout: true,
  },
  {
    slug: "lamia-pure-corn-oil", brand: "lamia", category: "cooking-oils",
    name: { en: "Lamia Pure Corn Oil", ar: "لميا زيت الذرة النقي" },
    desc: {
      en: "Corn oil with higher oleic acid for all cooking and frying. Health and taste together.",
      ar: "زيت ذرة بنسبة أعلى من حمض الأوليك لجميع أنواع الطبخ والقلي. الصحة والطعم معاً.",
    },
    packs: [{ size: "1.5 L × 6" }], shelfLife: TWO_YEARS, image: "/img/products/lamia-sfo-1-5l.webp", cutout: true,
  },
  {
    slug: "lamia-blended-corn-oil", brand: "lamia", category: "cooking-oils",
    name: { en: "Lamia Blended Corn Cooking Oil", ar: "لميا زيت ذرة مخلوط للطبخ" },
    desc: {
      en: "Corn oil blended with other vegetable oils for better flavour, a higher smoke point and better value.",
      ar: "زيت ذرة ممزوج بزيوت نباتية أخرى لنكهة أفضل ونقطة دخان أعلى وقيمة أفضل.",
    },
    packs: [{ size: "1.5 L × 6" }], shelfLife: TWO_YEARS, image: "/img/products/lamia-sfo-5l.webp", cutout: true,
  },
  // ── Z-LIGHT ──
  {
    slug: "z-light-pure-sunflower-oil", brand: "z-light", category: "cooking-oils",
    name: { en: "Z-Light Pure Sunflower Oil", ar: "زي لايت زيت دوار الشمس النقي" },
    desc: {
      en: "Light-tasting sunflower oil, rich in vitamin E and low in saturated fat.",
      ar: "زيت دوار الشمس بطعم خفيف، غني بفيتامين E وقليل الدهون المشبعة.",
    },
    packs: [{ size: "1.5 L × 6", note: "Item 1008 · 90 / pallet" }], shelfLife: TWO_YEARS, image: "/img/products/zlight-sfo-1-5l.webp", cutout: true,
  },
  {
    slug: "z-light-pure-corn-oil", brand: "z-light", category: "cooking-oils",
    name: { en: "Z-Light Pure Corn Oil", ar: "زي لايت زيت الذرة النقي" },
    desc: {
      en: "Pressed from the germ of corn kernels. High smoke point, neutral taste, rich in vitamin E and phytosterols.",
      ar: "مستخلص من جنين حبوب الذرة. نقطة دخان عالية وطعم محايد، غني بفيتامين E والستيرولات النباتية.",
    },
    packs: [{ size: "17 L tin", note: "Item 1009 · 60 / pallet" }], shelfLife: TWO_YEARS, image: "/img/products/zlight-sfo-1-5l.webp", cutout: true,
  },
  // ── UFVO ──
  {
    slug: "ufvo-rbd-sunflower-oil", brand: "ufvo", category: "cooking-oils",
    name: { en: "UFVO Pure RBD Sunflower Oil", ar: "زيت دوار الشمس المكرر النقي UFVO" },
    desc: {
      en: "Refined, bleached and deodorised sunflower oil with a high smoke point and neutral taste. For frying, baking and dressings.",
      ar: "زيت دوار الشمس مكرر ومبيض ومنزوع الرائحة بنقطة دخان عالية وطعم محايد. للقلي والخبز والصلصات.",
    },
    packs: [], shelfLife: TWO_YEARS, tags: ["rbd"], image: "/img/products/ufvo-sfo-jerrycan.webp", cutout: true,
  },
  {
    slug: "ufvo-rbd-soybean-oil", brand: "ufvo", category: "cooking-oils",
    name: { en: "UFVO Pure RBD Soybean Oil", ar: "زيت فول الصويا المكرر النقي UFVO" },
    desc: {
      en: "Highly refined soybean oil. Neutral, versatile, rich in polyunsaturated fats and vitamin E.",
      ar: "زيت فول صويا عالي التكرير. محايد ومتعدد الاستخدامات، غني بالدهون المتعددة غير المشبعة وفيتامين E.",
    },
    packs: [], shelfLife: TWO_YEARS, tags: ["rbd"], image: "/img/products/ufvo-sfo-jerrycan.webp", cutout: true,
  },
  // ── OLIVE ──
  {
    slug: "ghoson-alsham-extra-virgin-olive-oil", brand: "ghoson-alsham", category: "olive-oil",
    name: { en: "Ghoson Alsham Extra Virgin Olive Oil", ar: "غصن الشام زيت زيتون بكر ممتاز" },
    desc: {
      en: "Cold-pressed without heat or chemicals, so it keeps the olive's full flavour, aroma and antioxidants. For salads, dipping and finishing dishes.",
      ar: "معصور على البارد دون حرارة أو مواد كيميائية، فيحتفظ بكامل نكهة الزيتون ورائحته ومضادات الأكسدة. للسلطات والغمس وتزيين الأطباق.",
    },
    packs: [{ size: "250 ml × 24", note: "Item 1017 · 48 / pallet" }, { size: "500 ml × 12", note: "Item 1016 · 48 / pallet" }, { size: "4 L × 5", note: "Item 1014 · 48 / pallet" }, { size: "10 L tin", note: "Item 1013 · 100 / pallet" }, { size: "12 L × 1", note: "Item 1015 · 60 / pallet" }],
    shelfLife: TWO_YEARS, tags: ["evoo"], image: "/img/catalogue/ghoson-tin-10l.webp", cutout: true,
  },
  {
    slug: "lamia-virgin-olive-oil", brand: "lamia", category: "olive-oil",
    name: { en: "Lamia Virgin Olive Oil", ar: "لميا زيت زيتون بكر" },
    desc: {
      en: "Mechanically extracted without chemicals or excess heat. Fruity and aromatic, for dressings and low-heat cooking.",
      ar: "مستخلص ميكانيكياً دون مواد كيميائية أو حرارة زائدة. بنكهة فاكهية عطرة، للصلصات والطبخ على حرارة منخفضة.",
    },
    packs: [{ size: "17 L tin" }, { size: "10 L tin" }], shelfLife: TWO_YEARS, image: "/img/products/ufvo-olive-tin.webp", cutout: true,
  },
  // ── GHEE ──
  {
    slug: "linda-pure-butter-ghee", brand: "linda", category: "ghee",
    name: { en: "Linda Pure Butter Ghee", ar: "ليندا سمن زبدة نقي" },
    desc: {
      en: "Made from 99.9% New Zealand cow's milk. A creamy texture and the rich aroma of pure ghee, with no preservatives.",
      ar: "مصنوع من حليب بقر نيوزيلندي بنسبة ٩٩٫٩٪. قوام كريمي ورائحة السمن النقي الغنية، دون مواد حافظة.",
    },
    uses: {
      en: "Arabic and Asian sweets, all baking and all cooking.",
      ar: "الحلويات العربية والآسيوية وجميع أنواع الخبز والطبخ.",
    },
    packs: [{ size: "15 L tin", note: "Item 1024" }, { size: "12 × 800 g tin", note: "Item 1025" }, { size: "24 × 400 g tin", note: "Item 1026" }], shelfLife: EIGHTEEN, tags: ["nz"], image: "/img/catalogue/linda-ghee.webp", cutout: true,
  },
  {
    slug: "saba-vegetable-ghee", brand: "saba", category: "ghee",
    name: { en: "Saba Vegetable Ghee", ar: "سبا سمن نباتي" },
    desc: {
      en: "Trans-fat free vegetable ghee from palm blends, with the authentic, slightly smoky taste of traditional Saba ghee. Gives food a bright colour and a creamy texture.",
      ar: "سمن نباتي خالٍ من الدهون المتحولة من خلطات النخيل، بطعم سمن سبا التقليدي الأصيل المدخن قليلاً. يمنح الطعام لوناً زاهياً وقواماً كريمياً.",
    },
    packs: [{ size: "14 kg tin", note: "Item 1033" }, { size: "6 kg tin", note: "Item 1034" }, { size: "12 × 900 g", note: "Item 1035" }, { size: "24 × 450 g", note: "Item 1036" }], shelfLife: EIGHTEEN, tags: ["tff"], image: "/img/catalogue/saba-vegetable-ghee.webp", cutout: true,
  },
  {
    slug: "saba-vegetable-ghee-fenugreek", brand: "saba", category: "ghee",
    name: { en: "Saba Vegetable Ghee with Fenugreek", ar: "سبا سمن نباتي بالحلبة" },
    desc: {
      en: "Vegetable ghee with fenugreek for a nutty, aromatic flavour. A plant-based take on traditional ghee.",
      ar: "سمن نباتي بالحلبة لنكهة عطرية تشبه المكسرات. بديل نباتي للسمن التقليدي.",
    },
    packs: [{ size: "14 kg tin", note: "Item 1037" }, { size: "6 kg tin", note: "Item 1038" }, { size: "12 × 900 g", note: "Item 1039" }, { size: "24 × 450 g", note: "Item 1040" }], shelfLife: EIGHTEEN, image: "/img/catalogue/saba-fenugreek.webp", cutout: true,
  },
  // ── BAKERY ──
  {
    slug: "unigold-croissant-margarine-sheets", brand: "unigold", category: "bakery-fats",
    name: { en: "UniGold Croissant Margarine Sheets", ar: "يوني جولد ألواح مارجرين الكرواسون" },
    desc: {
      en: "2 kg sheets made for lamination: pliable, easy to handle and they don't crack. Perfect, crisp layers with a buttery smell and a golden, flaky finish. Trans-fat free.",
      ar: "ألواح ٢ كغ مصممة للتطبيق: مرنة وسهلة الاستخدام ولا تتشقق. طبقات مقرمشة مثالية برائحة الزبدة ولون ذهبي هش. خالية من الدهون المتحولة.",
    },
    uses: { en: "Croissants, premium puff pastry and sweets.", ar: "الكرواسون والمعجنات المورقة الفاخرة والحلويات." },
    packs: [{ size: "2 kg × 5 = 10 kg", note: "Item 1020" }], shelfLife: EIGHTEEN, tags: ["tff"], image: "/img/catalogue/unigold-croissant.webp", cutout: true,
  },
  {
    slug: "unigold-pastry-margarine", brand: "unigold", category: "bakery-fats",
    name: { en: "UniGold Pastry Margarine", ar: "يوني جولد مارجرين المعجنات" },
    desc: {
      en: "Pastry margarine in easy-to-handle blocks. Good plasticity, no cracking, and excellent puff with a perfect layered structure. Trans-fat free.",
      ar: "مارجرين معجنات في قوالب سهلة الاستخدام. ليونة جيدة دون تشقق، وانتفاخ ممتاز بطبقات مثالية. خالٍ من الدهون المتحولة.",
    },
    uses: { en: "All pastries and confectionery, pies and sausage rolls.", ar: "جميع المعجنات والحلويات والفطائر." },
    packs: [{ size: "2.5 kg × 10 = 25 kg", note: "Item 1021" }], shelfLife: EIGHTEEN, tags: ["tff"], image: "/img/catalogue/unigold-pastry.webp", cutout: true,
  },
  {
    slug: "bakers-street-blended-butter", brand: "bakers-street", category: "bakery-fats",
    name: { en: "Baker's Street Blended Butter", ar: "بيكرز ستريت زبدة مخلوطة" },
    desc: {
      en: "Vegetable fats blended with milk fat for a creamy, buttery taste and aroma close to pure butter. Trans-fat free and cost-efficient.",
      ar: "دهون نباتية ممزوجة بدهن الحليب لطعم ورائحة زبدة كريمية قريبة من الزبدة النقية. خالية من الدهون المتحولة واقتصادية.",
    },
    uses: { en: "Butter confectionery, cookies, muffins, cakes and bread dough.", ar: "حلويات الزبدة والكوكيز والمافن والكيك وعجينة الخبز." },
    packs: [{ size: "2.5 kg × 10 = 25 kg", note: "Item 1022" }], shelfLife: EIGHTEEN, tags: ["tff", "amf"], image: "/img/catalogue/bakers-street.webp", cutout: true,
  },
  {
    slug: "buttercup-pure-butter", brand: "buttercup", category: "bakery-fats",
    name: { en: "ButterCup Unsalted Pure Butter", ar: "باتركب زبدة نقية غير مملحة" },
    desc: {
      en: "Unsalted pure butter, 99.9% milk fat from New Zealand cow's milk. Real buttery taste for baking and cooking.",
      ar: "زبدة نقية غير مملحة بنسبة ٩٩٫٩٪ دهن حليب من حليب البقر النيوزيلندي. طعم زبدة حقيقي للخبز والطبخ.",
    },
    uses: { en: "Croissants, all confectionery and puff pastry.", ar: "الكرواسون وجميع الحلويات والمعجنات المورقة." },
    packs: [{ size: "Sheet 2 kg × 5 = 10 kg", note: "Item 1018" }, { size: "Block 2.5 kg × 10 = 25 kg", note: "Item 1019" }], shelfLife: EIGHTEEN, tags: ["nz"], image: "/img/catalogue/buttercup-block.webp", cutout: true,
  },
  {
    slug: "saba-margarine", brand: "saba", category: "bakery-fats",
    name: { en: "Saba Margarine", ar: "سبا مارجرين" },
    desc: {
      en: "Plant-based margarine from vegetable oils, for cooking, baking and spreading.",
      ar: "مارجرين نباتي من الزيوت النباتية، للطبخ والخبز والدهن.",
    },
    packs: [{ size: "14 kg tin", note: "Item 1029" }, { size: "6 kg tin", note: "Item 1030" }, { size: "12 × 900 g", note: "Item 1031" }, { size: "24 × 450 g", note: "Item 1032" }], shelfLife: EIGHTEEN, image: "/img/catalogue/saba-margarine.webp", cutout: true,
  },
  // ── ADDED FROM THE 2026 PRINTED CATALOGUE ──
  {
    slug: "frai-nakhil-palm-olein", brand: "frai-nakhil", category: "cooking-oils",
    name: { en: "Frai Nakhil Palm Olein", ar: "فراي النخيل أولين النخيل" },
    desc: {
      en: "Palm olein for frying. A light, stable cooking oil made for everyday frying at home and in the kitchen, from 1.5 L bottles to 20 L tins.",
      ar: "أولين النخيل للقلي. زيت طبخ خفيف وثابت للقلي اليومي في البيت والمطبخ، من عبوات ١٫٥ لتر حتى صفائح ٢٠ لتراً.",
    },
    packs: [{ size: "1.5 L × 6", note: "Item 1010 · 90 / pallet" }, { size: "5 L tin", note: "Item 1011 · 48 / pallet" }, { size: "20 L tin", note: "Item 1012 · 54 / 64 per pallet" }],
    shelfLife: TWO_YEARS, image: "/img/catalogue/frai-nakhil-range.webp", cutout: true,
  },
  {
    slug: "unigold-liquid-shortening", brand: "unigold", category: "bakery-fats",
    name: { en: "UniGold Liquid Shortening", ar: "يوني جولد شورتنج سائل" },
    desc: {
      en: "Clear, non-hydrogenated liquid shortening for deep frying. Zero trans fat, a healthier alternative to other fats and oils.",
      ar: "شورتنج سائل صافٍ غير مهدرج للقلي العميق. خالٍ من الدهون المتحولة، بديل أكثر صحة للدهون والزيوت الأخرى.",
    },
    uses: { en: "Deep frying in bakeries, restaurants and food production.", ar: "القلي العميق في المخابز والمطاعم وإنتاج الأغذية." },
    packs: [{ size: "17 L", note: "Item 1023" }], shelfLife: EIGHTEEN, tags: ["tff"], image: "/img/catalogue/unigold-liquid-shortening.webp", cutout: true,
  },
  {
    slug: "hanan-creamy-vegetable-ghee", brand: "hanan", category: "ghee",
    name: { en: "Hanan Creamy Vegetable Ghee", ar: "حنان سمن نباتي كريمي" },
    desc: {
      en: "Creamy vegetable ghee in a 15 kg box for kitchens and a 12 × 900 g carton for retail.",
      ar: "سمن نباتي كريمي في كرتون ١٥ كغ للمطابخ وعبوة ١٢ × ٩٠٠ غ للتجزئة.",
    },
    packs: [{ size: "15 kg box", note: "Item 1006 · 60 / pallet" }, { size: "12 × 900 g", note: "Item 1007 · 64 / pallet" }],
    shelfLife: TWO_YEARS, image: "/img/catalogue/hanan-ghee.webp", cutout: true,
  },
];

export const tagLabels: Record<Tag, T> = {
  tff: { en: "Trans-fat free", ar: "خالٍ من الدهون المتحولة" },
  nz: { en: "New Zealand milk", ar: "حليب نيوزيلندي" },
  omega3: { en: "Omega-3", ar: "أوميغا ٣" },
  rbd: { en: "Refined (RBD)", ar: "مكرر" },
  evoo: { en: "Cold-pressed", ar: "معصور على البارد" },
  amf: { en: "With milk fat", ar: "بدهن الحليب" },
};

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsByBrand = (slug: string) => products.filter((p) => p.brand === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const tr = (t: T, locale: string) => (locale === "ar" ? t.ar : t.en);

// Prefix file URLs for sub-path hosting (see lib/assets.ts).
export const categories = rawCategories.map((c) => ({ ...c, image: asset(c.image) }));
export const brands = rawBrands.map((b) => ({ ...b, image: asset(b.image), logo: b.logo ? asset(b.logo) : undefined }));
export const products: Product[] = rawProducts.map((p) => ({ ...p, image: asset(p.image) }));
