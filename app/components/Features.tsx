import React from "react";

export type Feature = {
  title: string;
  desc: string;
  icon: string | React.ReactNode;
};

export type FeaturesProps = {
  items?: Feature[];
};

export default function Features({
  items = [
    {
      title: "Adorable Quality",
      desc: "Super-soft plush, made to hug and last.",
      icon: "💖",
    },
    {
      title: "Fast Shipping",
      desc: "From our den to your door, quickly.",
      icon: "🚚",
    },
    {
      title: "Secure Checkout",
      desc: "Safe payments with modern security.",
      icon: "🔒",
    },
  ],
}: FeaturesProps) {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((f) => (
        <div
          key={f.title}
          className="rounded-lg border border-black/10 dark:border-white/10 p-5 bg-white/70 dark:bg-black/20"
        >
          <div className="text-2xl">{f.icon}</div>
          <h3 className="mt-2 font-semibold">{f.title}</h3>
          <p className="text-sm text-black/70 dark:text-white/70">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}
