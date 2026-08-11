"use client";

// V1 prototype persistence: browser localStorage only.
// This is intentionally NOT production storage — before real users sign up,
// this must move to a real backend + auth (see V1 Product Spec, Section 5).

// Coarse age band only — not date of birth. A band is enough to tailor meal
// suggestions (portion size, kid-friendly recipes, choking-hazard awareness for
// young children); exact DOB would be more precision than any V1 feature needs.
// See V1 Requirements Update, data model section.
export type AgeBand = "under1" | "1-4" | "5-11" | "12-17" | "18+";

export const AGE_BANDS: { id: AgeBand; label: string }[] = [
  { id: "under1", label: "Under 1" },
  { id: "1-4", label: "1–4" },
  { id: "5-11", label: "5–11" },
  { id: "12-17", label: "12–17" },
  { id: "18+", label: "18+" },
];

// Each allergen entry carries a "diagnosed" flag (medically confirmed vs
// self-reported/suspected) so the app can be precise that it informs rather
// than diagnoses. See V1 Requirements Update, data model section.
export type AllergenEntry = {
  id: string; // id from lib/allergens.ts
  diagnosed: boolean;
};

export type Member = {
  id: string;
  name: string;
  ageBand: AgeBand;
  allergies: AllergenEntry[]; // "severe" — hard exclude
  intolerances: AllergenEntry[]; // softer flag — caution
};

export type Household = {
  name: string;
  members: Member[];
};

const KEY = "myallergy_household_v1";

export function loadHousehold(): Household | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Household;
  } catch {
    return null;
  }
}

export function saveHousehold(h: Household) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(h));
}

export function newMemberId() {
  return Math.random().toString(36).slice(2, 10);
}
