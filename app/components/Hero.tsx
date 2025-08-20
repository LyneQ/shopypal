import Link from "next/link";
import React from "react";

export type HeroProps = {
  badgeLeft?: string | React.ReactNode;
  badgeCenter?: string | React.ReactNode;
  badgeRight?: string | React.ReactNode;
  title?: string;
  description?: string;
  cta?: { href: string; label: string };
  showAuthLinks?: boolean;
  galleryEmojis?: string[]; // expects 6 items for the 3x2 grid; fewer will just render fewer
};

export default function Hero({
  badgeLeft = "🧸",
  badgeCenter = "Shopypal",
  badgeRight = "Plushies Store",
  title = "Welcome to Shopypal",
  description =
    "Discover the cuddliest collection of plushies. Perfect for gifts, cozy nights, and collecting your favorite characters.",
  cta = { href: "/products", label: "Shop Plushies" },
  showAuthLinks = false,
  galleryEmojis = ["🦊", "🐼", "🐨", "🐻", "🐧", "🐰"],
}: HeroProps) {
  return (
    <section className="rounded-xl bg-gradient-to-br from-pink-50 to-rose-100 dark:from-rose-950/40 dark:to-pink-900/20 border border-black/5 dark:border-white/10 p-8 sm:p-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-white/70 dark:bg-black/30 border border-black/10 dark:border-white/10">
            <span>{badgeLeft}</span>
            <span className="uppercase tracking-wide">{badgeCenter}</span>
            <span className="opacity-60">{badgeRight}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
          <p className="text-base sm:text-lg text-black/70 dark:text-white/70 max-w-xl mx-auto md:mx-0">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start pt-2">
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center justify-center rounded-md bg-pink-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-pink-700 transition-colors"
              >
                {cta.label}
              </Link>
            )}
            {showAuthLinks && (
              <div className="flex items-center gap-2">
                <Link href="/auth/signin" className="text-sm font-medium hover:underline">
                  Sign in
                </Link>
                <span className="text-black/40 dark:text-white/40">/</span>
                <Link href="/auth/signup" className="text-sm font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-3 text-5xl select-none">
          {galleryEmojis.map((emoji, idx) => (
            <div
              key={`${emoji}-${idx}`}
              className="aspect-square rounded-lg bg-white/70 dark:bg-black/30 border border-black/10 dark:border-white/10 flex items-center justify-center"
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
