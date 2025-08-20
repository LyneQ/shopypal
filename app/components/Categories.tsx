import Link from "next/link";
import React from "react";

export type CategoryItem = {
  name: string;
  emoji: string | React.ReactNode;
  href: string;
};

export type CategoriesProps = {
  title?: string;
  browseAllHref?: string;
  items?: CategoryItem[];
};

export default function Categories({
  title = "Popular categories",
  browseAllHref = "/products",
  items = [
    { name: "Animals", emoji: "🐻", href: "/products?category=animals" },
    { name: "Fantasy", emoji: "🦄", href: "/products?category=fantasy" },
    { name: "Seasonal", emoji: "🎄", href: "/products?category=seasonal" },
  ],
}: CategoriesProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {browseAllHref && (
          <Link href={browseAllHref} className="text-sm hover:underline">
            Browse all →
          </Link>
        )}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((c) => (
          <Link
            key={c.name}
            href={c.href}
            className="group rounded-lg border border-black/10 dark:border-white/10 p-5 bg-white/70 dark:bg-black/20 flex items-center justify-between"
          >
            <div>
              <div className="text-sm text-black/60 dark:text-white/60">Category</div>
              <div className="font-medium">{c.name}</div>
            </div>
            <div className="text-3xl group-hover:scale-110 transition-transform">{c.emoji}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
