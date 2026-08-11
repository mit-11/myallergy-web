import Link from "next/link";
import { Users, ScanLine, ChefHat, MessageCircle, Mail, Share2 } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

const FEATURES = [
  {
    icon: Users,
    title: "Household profiles",
    body: "Add everyone once, for good",
  },
  {
    icon: ScanLine,
    title: "Instant answers",
    body: "Scan any product, know now",
  },
  {
    icon: ChefHat,
    title: "AI meal plans",
    body: "A week of meals, already safe",
  },
  {
    icon: MessageCircle,
    title: "Community",
    body: "Real notes from real households",
  },
];

// Full-bleed helper — breaks a section out of the constrained <main> container
// (see layout.tsx, max-w-3xl) to sit edge-to-edge, while its inner content
// stays constrained. See holding-page mock approved in project chat.
const FULL_BLEED = "relative left-1/2 right-1/2 -mx-[50vw] w-screen";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className={`${FULL_BLEED} bg-brand px-4 py-16 text-center sm:py-20`}>
        <h1 className="mx-auto max-w-xl text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
          Freedom from
          <br />
          food allergies
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm italic text-white/90">
          Build your household&apos;s profile once, then know instantly what
          everyone can eat — no more re-checking, no more re-explaining,
          every single time.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            href="/profile"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Set up your household
          </Link>
          <Link
            href="/scan"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Try a scan
          </Link>
        </div>
      </section>

      <section className="bg-[#FAFAF6] px-4 py-14">
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <f.icon className="mx-auto h-6 w-6 text-brand" strokeWidth={1.75} aria-hidden />
              <p className="mt-3 text-xs font-semibold text-ink">{f.title}</p>
              <p className="mt-1 text-[11px] leading-snug text-grey">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-md text-center">
          <h2 className="text-lg font-bold text-ink">Key features</h2>
          <div className="mx-auto mt-3 w-2/3 border-t border-black/10" />
          <ul className="mt-5 space-y-2 text-sm text-ink">
            <li>
              One profile for the <strong>whole household</strong>, built once
            </li>
            <li>
              <strong>AI plans meals</strong> so you&apos;re not starting from
              scratch
            </li>
            <li>
              An <strong>instant answer</strong> for anyone, on any product
            </li>
          </ul>
          <a
            href="#pilot"
            className="mt-6 inline-block rounded-full bg-brand px-7 py-3 text-sm font-semibold text-ink shadow-sm hover:opacity-90"
          >
            Register your interest
          </a>
        </div>
      </section>

      <section className="px-4 py-16 text-center">
        <p className="text-2xl font-bold text-brand">myAllergy</p>
        <blockquote className="mx-auto mt-5 max-w-md text-sm italic leading-relaxed text-ink">
          &ldquo;Every meal used to start with the same anxious checklist. We
          built myAllergy so that thinking happens once, not every single
          time — freeing up the rest of the day to just be a day.&rdquo;
        </blockquote>
        <p className="mt-5 text-sm text-ink">myAllergy .... join us today!</p>
        <a
          href="mailto:hello@myallergy.com"
          className="mt-5 inline-block rounded-full border border-black/15 px-6 py-2.5 text-xs font-semibold text-ink hover:bg-black/5"
        >
          Contact us
        </a>
      </section>

      <section
        id="pilot"
        className="flex flex-col gap-4 border-t border-black/10 px-4 py-6 sm:flex-row sm:gap-6"
      >
        <p className="w-28 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-grey">
          Pilot households
        </p>
        <div>
          <p className="text-sm text-ink">
            We&apos;re testing myAllergy with a small number of real
            households before opening it up more widely.
          </p>
          <a
            href="mailto:hello@myallergy.com"
            className="mt-3 inline-block rounded-lg border border-black/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-black/5"
          >
            Get in touch
          </a>
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-black/10 px-4 py-6 sm:flex-row sm:gap-6">
        <p className="w-28 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-grey">
          Stay in touch
        </p>
        <div className="flex-1">
          <p className="mb-3 text-sm text-ink">
            Be one of the first to join, and help shape it as we build.
          </p>
          <WaitlistForm />
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-black/10 px-4 py-6 sm:flex-row sm:gap-6">
        <p className="w-28 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-grey">
          Tell a friend
        </p>
        <div>
          <p className="mb-3 text-sm text-ink">
            More households than you&apos;d think are dealing with this too.
            Spread the word.
          </p>
          <div className="flex gap-2">
            <a
              href="mailto:?subject=Check out myAllergy&body=Thought this might help your household: https://myallergy.com"
              className="flex items-center gap-1.5 rounded-lg border border-black/15 px-3 py-1.5 text-xs font-medium text-ink hover:bg-black/5"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden /> Email
            </a>
            <a
              href="https://x.com/intent/tweet?text=Freedom%20from%20food%20allergies%20—%20myallergy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-black/15 px-3 py-1.5 text-xs font-medium text-ink hover:bg-black/5"
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden /> Share
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
