"use client";

import { useState } from "react";

// Waitlist capture for the pilot, using Formspree (formspree.io) — a hosted
// form service, so this works today with no backend. Each submission is
// emailed to whoever owns the Formspree form; swap this for a real Supabase
// table once the backend from the V1 Requirements Update is built.
//
// Setup: create a free form at formspree.io, then set
// NEXT_PUBLIC_FORMSPREE_FORM_ID in .env.local (see .env.local.example).
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

type Status = "idle" | "submitting" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (!FORM_ID) {
    return (
      <p className="rounded-lg border border-dashed border-black/20 bg-black/5 p-4 text-xs text-grey">
        Waitlist form isn&apos;t wired up yet — set NEXT_PUBLIC_FORMSPREE_FORM_ID
        in .env.local (see .env.local.example) to enable signups.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg bg-safe/10 p-4 text-sm font-medium text-safe">
        You&apos;re on the list — we&apos;ll be in touch about joining the pilot.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-full border border-black/10 px-4 py-3 text-sm"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink shadow-sm hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Joining…" : "Join the pilot"}
      </button>
      {status === "error" && (
        <p className="text-xs font-medium text-unsafe sm:basis-full">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
