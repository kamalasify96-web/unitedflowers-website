// Arabic pages show Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩); English pages keep 0-9.
export const arDigits = (v: string | number) => String(v).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
export const localizeDigits = (v: string | number, locale: string) => (locale === "ar" ? arDigits(v) : String(v));
