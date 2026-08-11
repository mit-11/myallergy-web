import { ALLERGENS, allergenById } from "./allergens";
import type { Member } from "./storage";

export type Product = {
  code: string;
  name: string;
  brand: string;
  imageUrl?: string;
  allergensTags: string[]; // raw "en:xxx" tags from Open Food Facts
  traces: string[]; // "may contain" tags
};

// Open Food Facts is a free, open, crowdsourced product database with strong
// UK/EU coverage and structured allergen fields — used here to avoid a paid
// data licensing deal for V1. See V1 Product Spec, Section 5.
const OFF_BASE = "https://world.openfoodfacts.org";

function toProduct(p: any): Product {
  return {
    code: p.code,
    name: p.product_name || p.product_name_en || "Unnamed product",
    brand: p.brands || "Unknown brand",
    imageUrl: p.image_front_small_url || p.image_small_url,
    allergensTags: p.allergens_tags || [],
    traces: p.traces_tags || [],
  };
}

export async function lookupByBarcode(barcode: string): Promise<Product | null> {
  const res = await fetch(`${OFF_BASE}/api/v2/product/${encodeURIComponent(barcode)}.json`);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.status !== 1 || !data.product) return null;
  return toProduct(data.product);
}

export async function searchByName(query: string): Promise<Product[]> {
  const url = `${OFF_BASE}/cgi/search.pl?search_terms=${encodeURIComponent(
    query
  )}&search_simple=1&action=process&json=1&page_size=10&fields=code,product_name,brands,image_front_small_url,image_small_url,allergens_tags,traces_tags`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.products || []).map(toProduct).filter((p: Product) => p.name !== "Unnamed product");
}

export type Verdict = "unsafe" | "caution" | "safe";

export type MemberVerdict = {
  member: Member;
  verdict: Verdict;
  matchedAllergens: string[]; // human-readable labels, confirmed present
  tracesAllergens: string[]; // human-readable labels, "may contain" only
};

export function verdictForMember(product: Product, member: Member): MemberVerdict {
  const matched: string[] = [];
  const traceMatched: string[] = [];

  for (const entry of member.allergies) {
    const allergen = allergenById(entry.id);
    if (!allergen) continue;
    if (product.allergensTags.includes(allergen.offTag)) matched.push(allergen.label);
    else if (product.traces.includes(allergen.offTag)) traceMatched.push(allergen.label);
  }
  for (const entry of member.intolerances) {
    const allergen = allergenById(entry.id);
    if (!allergen) continue;
    if (product.allergensTags.includes(allergen.offTag) && !matched.includes(allergen.label)) {
      matched.push(allergen.label);
    } else if (product.traces.includes(allergen.offTag) && !traceMatched.includes(allergen.label)) {
      traceMatched.push(allergen.label);
    }
  }

  let verdict: Verdict = "safe";
  if (matched.length > 0) verdict = "unsafe";
  else if (traceMatched.length > 0) verdict = "caution";

  return { member, verdict, matchedAllergens: matched, tracesAllergens: traceMatched };
}

export const ALL_ALLERGENS = ALLERGENS;
