// The 14 allergens recognised under UK/EU food law (EU FIC / UK FIC regulations),
// mapped to the tag format used by Open Food Facts (https://world.openfoodfacts.org).
export type Allergen = {
  id: string;
  label: string;
  offTag: string; // corresponding "allergens_tags" value on Open Food Facts
};

export const ALLERGENS: Allergen[] = [
  { id: "celery", label: "Celery", offTag: "en:celery" },
  { id: "gluten", label: "Cereals containing gluten", offTag: "en:gluten" },
  { id: "crustaceans", label: "Crustaceans", offTag: "en:crustaceans" },
  { id: "eggs", label: "Eggs", offTag: "en:eggs" },
  { id: "fish", label: "Fish", offTag: "en:fish" },
  { id: "lupin", label: "Lupin", offTag: "en:lupin" },
  { id: "milk", label: "Milk", offTag: "en:milk" },
  { id: "molluscs", label: "Molluscs", offTag: "en:molluscs" },
  { id: "mustard", label: "Mustard", offTag: "en:mustard" },
  { id: "peanuts", label: "Peanuts", offTag: "en:peanuts" },
  { id: "sesame", label: "Sesame seeds", offTag: "en:sesame-seeds" },
  { id: "soybeans", label: "Soybeans", offTag: "en:soybeans" },
  { id: "sulphites", label: "Sulphur dioxide / sulphites", offTag: "en:sulphur-dioxide-and-sulphites" },
  { id: "treenuts", label: "Tree nuts", offTag: "en:nuts" },
];

export function allergenById(id: string): Allergen | undefined {
  return ALLERGENS.find((a) => a.id === id);
}
