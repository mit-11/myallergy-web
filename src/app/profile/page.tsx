"use client";

import { useEffect, useState } from "react";
import { ALLERGENS } from "@/lib/allergens";
import {
  loadHousehold,
  saveHousehold,
  newMemberId,
  AGE_BANDS,
  type Household,
  type Member,
  type AllergenEntry,
} from "@/lib/storage";

const EMPTY: Household = { name: "My household", members: [] };

export default function ProfilePage() {
  const [household, setHousehold] = useState<Household>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = loadHousehold();
    if (existing) setHousehold(existing);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveHousehold(household);
  }, [household, loaded]);

  function addMember() {
    const member: Member = {
      id: newMemberId(),
      name: "",
      ageBand: "18+",
      allergies: [],
      intolerances: [],
    };
    setHousehold((h) => ({ ...h, members: [...h.members, member] }));
  }

  function updateMember(id: string, patch: Partial<Member>) {
    setHousehold((h) => ({
      ...h,
      members: h.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));
  }

  function removeMember(id: string) {
    setHousehold((h) => ({ ...h, members: h.members.filter((m) => m.id !== id) }));
  }

  // Toggle an allergen on/off within an entry list. New entries default to
  // diagnosed: false (self-reported) — the user marks it confirmed separately.
  function toggleEntry(list: AllergenEntry[], id: string): AllergenEntry[] {
    return list.some((e) => e.id === id)
      ? list.filter((e) => e.id !== id)
      : [...list, { id, diagnosed: false }];
  }

  function setDiagnosed(list: AllergenEntry[], id: string, diagnosed: boolean): AllergenEntry[] {
    return list.map((e) => (e.id === id ? { ...e, diagnosed } : e));
  }

  if (!loaded) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-ink">Your household</h1>
        <p className="text-sm text-grey">
          Add everyone whose meals need to be safe — yourself included. Stored on this
          device only for this prototype.
        </p>
      </div>

      <input
        className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        value={household.name}
        onChange={(e) => setHousehold((h) => ({ ...h, name: e.target.value }))}
        placeholder="Household name"
      />

      <div className="space-y-6">
        {household.members.map((m) => (
          <div key={m.id} className="rounded-xl border border-black/10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <input
                className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm"
                value={m.name}
                onChange={(e) => updateMember(m.id, { name: e.target.value })}
                placeholder="Name"
              />
              <select
                className="rounded-lg border border-black/10 px-2 py-2 text-sm"
                value={m.ageBand}
                onChange={(e) => updateMember(m.id, { ageBand: e.target.value as Member["ageBand"] })}
              >
                {AGE_BANDS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeMember(m.id)}
                className="text-xs font-medium text-unsafe hover:underline"
              >
                Remove
              </button>
            </div>

            <p className="mb-1 text-xs font-semibold text-ink">Allergies (hard exclude)</p>
            <div className="mb-3 flex flex-wrap gap-2">
              {ALLERGENS.map((a) => {
                const entry = m.allergies.find((e) => e.id === a.id);
                return (
                  <span key={a.id} className="inline-flex items-center gap-1">
                    <button
                      onClick={() => updateMember(m.id, { allergies: toggleEntry(m.allergies, a.id) })}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        entry
                          ? "border-unsafe bg-unsafe/10 text-unsafe"
                          : "border-black/10 text-grey hover:bg-black/5"
                      }`}
                    >
                      {a.label}
                    </button>
                    {entry && (
                      <label className="flex items-center gap-1 text-[10px] text-grey">
                        <input
                          type="checkbox"
                          checked={entry.diagnosed}
                          onChange={(e) =>
                            updateMember(m.id, {
                              allergies: setDiagnosed(m.allergies, a.id, e.target.checked),
                            })
                          }
                        />
                        diagnosed
                      </label>
                    )}
                  </span>
                );
              })}
            </div>

            <p className="mb-1 text-xs font-semibold text-ink">Intolerances (caution)</p>
            <div className="flex flex-wrap gap-2">
              {ALLERGENS.map((a) => {
                const entry = m.intolerances.find((e) => e.id === a.id);
                return (
                  <span key={a.id} className="inline-flex items-center gap-1">
                    <button
                      onClick={() =>
                        updateMember(m.id, { intolerances: toggleEntry(m.intolerances, a.id) })
                      }
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        entry
                          ? "border-caution bg-caution/10 text-ink"
                          : "border-black/10 text-grey hover:bg-black/5"
                      }`}
                    >
                      {a.label}
                    </button>
                    {entry && (
                      <label className="flex items-center gap-1 text-[10px] text-grey">
                        <input
                          type="checkbox"
                          checked={entry.diagnosed}
                          onChange={(e) =>
                            updateMember(m.id, {
                              intolerances: setDiagnosed(m.intolerances, a.id, e.target.checked),
                            })
                          }
                        />
                        diagnosed
                      </label>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addMember}
        className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink hover:opacity-90"
      >
        + Add household member
      </button>
    </div>
  );
}
