import Link from "next/link";
import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";

const DIFFERENTIATORS = [
  {
    title: "Built around the UK/EU 14, not the US 9",
    body: "Most allergy apps are built for the US's 9-allergen list. MyAllergy is UK/EU-native from day one, covering all 14 legally-recognised allergens — and designed around Natasha's Law full-ingredient labelling, not bolted on afterwards.",
  },
  {
    title: "One household, every member, one check",
    body: "Add everyone — partner, kids, grandparents, whoever eats in your kitchen — once. Every product you check is verdicted against all of them at the same time, not one profile at a time.",
  },
  {
    title: "The verdict is never for sale",
    body: "No ads, no brand can pay for a better result, and it's free. Trust in the answer is the entire product — that only works if nothing can influence it.",
  },
];

const STEPS = [
  {
    title: "Build your household",
    body: "Add each person and their allergies and intolerances from the UK/EU 14-allergen list.",
  },
  {
    title: "Scan or search any product",
    body: "Barcode or name — checked live against open UK/EU product data.",
  },
  {
    title: "Get a verdict for everyone, at once",
    body: "Safe, caution, or unsafe — for every household member, with the exact allergen named.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 py-8">
      <section className="flex flex-col items-center gap-8 text-center">
        <Image src="/logo.png" alt="MyAllergy" width={200} height={180} />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-ink">Freedom from food allergies.</h1>
          <p className="mx-auto max-w-md text-grey">
            Build a profile for everyone in your household, then check any product
            against all of them at once. Free, ad-free — the verdict is never for sale.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/profile"
            className="rounded-full bg-brand px-6 py-3 font-semibold text-ink shadow-sm hover:opacity-90"
          >
            Set up your household
          </Link>
          <Link
            href="/scan"
            className="rounded-full border border-black/10 px-6 py-3 font-semibold text-ink hover:bg-black/5"
          >
            Try a scan
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-center text-xl font-bold text-ink">Why MyAllergy is different</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title} className="rounded-xl border border-black/10 p-5">
              <h3 className="mb-2 text-sm font-semibold text-ink">{d.title}</h3>
              <p className="text-sm text-grey">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-center text-xl font-bold text-ink">How it works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="text-center">
              <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand">
                {i + 1}
              </div>
              <h3 className="mb-1 text-sm font-semibold text-ink">{s.title}</h3>
              <p className="text-sm text-grey">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-md space-y-4 rounded-2xl border border-black/10 bg-brand-light/40 p-6 text-center">
        <h2 className="text-lg font-bold text-ink">Join the pilot</h2>
        <p className="text-sm text-grey">
          We&apos;re piloting MyAllergy with real UK households before opening it up
          more widely. Add your email and we&apos;ll be in touch about early access.
        </p>
        <WaitlistForm />
      </section>
    </div>
  );
}
