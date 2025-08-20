import Link from "next/link";
import db from "@/app/db/client";
import { products } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import Carousel from "@/app/components/Carousel";
import ProductActions from "@/app/components/ProductActions";

function formatPrice(cents: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 2,
    }).format((cents || 0) / 100);
  } catch {
    return `$${((cents || 0) / 100).toFixed(2)}`;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      priceCents: products.priceCents,
      currency: products.currency,
      imageUrls: products.imageUrls,
    })
    .from(products)
    .where(eq(products.id, id));

  const p = rows[0];

  if (!p) {
    return (
      <div className="space-y-4">
        <div className="text-sm"><Link href="/products" className="underline">← Back to products</Link></div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-8 text-center text-black/70 dark:text-white/70">Product not found.</div>
      </div>
    );
  }

  const images = Array.isArray(p.imageUrls) && p.imageUrls.length
    ? p.imageUrls.map((u) => ({ src: u, alt: p.name }))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{p.name}</h1>
          <Link href="/products" className="text-sm hover:underline">← Back to products</Link>
        </div>
        <div className="text-lg font-medium tabular-nums">{formatPrice(p.priceCents, p.currency)}</div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div>
          <Carousel images={images} />
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">About this plushie</h2>
            {p.description ? (
              <p className="text-black/80 dark:text-white/80 mt-1">{p.description}</p>
            ) : (
              <p className="text-black/60 dark:text-white/60 mt-1">No description available.</p>
            )}
          </div>
          <div className="pt-2">
            {/* Purchase / payment actions */}
            <ProductActions productId={p.id} name={p.name} priceCents={p.priceCents} currency={p.currency} />
          </div>
        </div>
      </div>
    </div>
  );
}