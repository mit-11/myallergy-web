# MyAllergy — V1 prototype (web)

A clickable prototype for the V1 scope described in
`../../02 Product/MyAllergy - V1 Product Spec.docx`.

## What's here

- **Household profiles** (`/profile`) — add household members and pick their
  allergies (hard exclude) and intolerances (caution) from the UK/EU
  14-allergen list. Stored in browser `localStorage` only — this is a
  prototype, not a real backend.
- **Scanner** (`/scan`) — search a product by name or barcode against the
  [Open Food Facts](https://world.openfoodfacts.org) open product database,
  and see a per-household-member safe / caution / unsafe verdict.

Branding (logo, colour `#FAAF40`, typography) is pulled from the real
MyAllergy brand assets in
`../../../MyAllergy Limited (09153340) - Organised/App Rebuild Assets/Logos & Brand Marks`.

## Running it locally

You'll need [Node.js](https://nodejs.org) 20+ installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Important — before any real user touches this

This prototype uses browser `localStorage` for household data, which is fine
for clicking through the concept but is **not** real user data storage:
nothing syncs across devices, and it can be cleared by the browser at any
time. Before inviting real households:

1. Add a real backend + authentication (a Floot-hosted backend, Supabase, or
   similar) and move household data there.
2. Get a legal review of data handling — household allergy data is sensitive
   personal health data under UK GDPR.
3. Decide on a real hosting setup (Floot can build and host this directly;
   alternatively Vercel + a separate database).

See `02 Product/MyAllergy - V1 Product Spec.docx`, Section 5 and 7, for the
full reasoning.

## Notes on the data source

Open Food Facts is free, open, and has strong UK/EU coverage with structured
allergen fields — it avoids a paid licensing deal for V1. It's
crowdsourced, so coverage and accuracy vary by product; the app always shows
a disclaimer that this doesn't replace reading the physical label.
