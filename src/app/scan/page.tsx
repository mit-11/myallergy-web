"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loadHousehold, type Household } from "@/lib/storage";
import { lookupByBarcode, searchByName, verdictForMember, type Product, type MemberVerdict } from "@/lib/products";

const VERDICT_STYLE: Record<string, string> = {
  unsafe: "bg-unsafe/10 text-unsafe border-unsafe",
  caution: "bg-caution/10 text-ink border-caution",
  safe: "bg-safe/10 text-safe border-safe",
};
const VERDICT_LABEL: Record<string, string> = {
  unsafe: "Unsafe",
  caution: "Caution — may contain",
  safe: "Safe",
};

export default function ScanPage() {
  const [household, setHousehold] = useState<Household | null>(null);
  const [query, setQuery] = useState("");
  const [barcode, setBarcode] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    setHousehold(loadHousehold());
  }, []);

  async function doSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setSelected(null);
    const products = await searchByName(query.trim());
    setResults(products);
    setLoading(false);
  }

  async function doBarcodeLookup() {
    if (!barcode.trim()) return;
    setLoading(true);
    setResults([]);
    const product = await lookupByBarcode(barcode.trim());
    setSelected(product);
    setLoading(false);
  }

  const verdicts: MemberVerdict[] = selected && household
    ? household.members.map((m) => verdictForMember(selected, m))
    : [];

  const noMembers = household && household.members.length === 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-ink">Scan a product</h1>
        <p className="text-sm text-grey">
          Search by name or enter a barcode. Data comes from Open Food Facts — an
          open, crowdsourced product database.
        </p>
      </div>

      {noMembers && (
        <div className="rounded-lg border border-caution bg-caution/10 p-3 text-sm text-ink">
          No household members yet — verdicts need at least one profile.{" "}
          <Link href="/profile" className="font-semibold underline">
            Set up your household
          </Link>
          .
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 gap-2">
          <input
            className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm"
            placeholder="Search product name, e.g. hummus"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
          />
          <button onClick={doSearch} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-ink">
            Search
          </button>
        </div>
        <div className="flex flex-1 gap-2">
          <input
            className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm"
            placeholder="Or enter a barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doBarcodeLookup()}
          />
          <button onClick={doBarcodeLookup} className="rounded-lg border border-black/10 px-4 py-2 text-sm font-semibold text-ink">
            Look up
          </button>
        </div>
      </div>

      {loading && <p className="text-sm text-grey">Checking Open Food Facts…</p>}

      {!selected && results.length > 0 && (
        <div className="space-y-2">
          {results.map((p) => (
            <button
              key={p.code}
              onClick={() => {
                setSelected(p);
                setResults([]);
              }}
              className="flex w-full items-center gap-3 rounded-lg border border-black/10 p-3 text-left hover:bg-black/5"
            >
              {p.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt="" className="h-10 w-10 rounded object-cover" />
              )}
              <div>
                <p className="text-sm font-medium text-ink">{p.name}</p>
                <p className="text-xs text-grey">{p.brand}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-black/10 p-4">
            {selected.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selected.imageUrl} alt="" className="h-14 w-14 rounded object-cover" />
            )}
            <div>
              <p className="font-semibold text-ink">{selected.name}</p>
              <p className="text-sm text-grey">{selected.brand}</p>
            </div>
          </div>

          {household && household.members.length > 0 && (
            <div className="space-y-2">
              {verdicts.map((v) => (
                <div key={v.member.id} className={`rounded-lg border p-3 ${VERDICT_STYLE[v.verdict]}`}>
                  <p className="text-sm font-semibold">
                    {v.member.name || "Unnamed member"} — {VERDICT_LABEL[v.verdict]}
                  </p>
                  {v.matchedAllergens.length > 0 && (
                    <p className="text-xs">Contains: {v.matchedAllergens.join(", ")}</p>
                  )}
                  {v.tracesAllergens.length > 0 && (
                    <p className="text-xs">May contain: {v.tracesAllergens.join(", ")}</p>
                  )}
                  {v.verdict === "safe" && (
                    <p className="text-xs">No flagged allergens found in the listed ingredients.</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <p className="mb-1 text-xs font-semibold text-ink">Leave a community safety note (optional)</p>
            <textarea
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
              rows={2}
              placeholder="e.g. Packaging changed in 2026, now made in a facility with tree nuts."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <p className="mt-1 text-xs text-grey">
              Not yet saved anywhere — community notes are a V1.1 feature once there is a shared backend.
            </p>
          </div>

          <p className="text-xs text-grey">
            Allergen data is provided for guidance only from crowdsourced ingredient
            listings — it does not replace reading the physical label.
          </p>
        </div>
      )}
    </div>
  );
}
