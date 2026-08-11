import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

// Note: uses the system font stack (see globals.css) rather than next/font/google,
// since Google Fonts isn't reachable from this build sandbox. Swap in the real
// MyAllergy typeface here once it's confirmed (see brand asset review).

export const metadata: Metadata = {
  title: "MyAllergy — freedom from food allergies",
  description: "Household allergy profiles and a product safety scanner. Free, ad-free, no brand influence over the verdict.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b border-black/10">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/mark.png" alt="MyAllergy" width={32} height={29} />
              <span className="text-lg font-bold text-brand">myAllergy</span>
            </Link>
            <nav className="flex gap-4 text-sm font-medium text-ink">
              <Link href="/profile">Household</Link>
              <Link href="/scan">Scan</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-3xl px-4 py-8 text-xs text-grey">
          MyAllergy — V1 prototype. Allergen data is provided for guidance only and does not replace reading the product label.
        </footer>
      </body>
    </html>
  );
}
