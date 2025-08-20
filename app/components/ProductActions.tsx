"use client";

import React from "react";

type Props = {
  productId: string;
  name: string;
  priceCents: number;
  currency: string;
};

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

export default function ProductActions({ productId, name, priceCents, currency }: Props) {
  const [qty, setQty] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const buyNow = async () => {
    try {
      setLoading(true);
      setMessage(null);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: qty }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Checkout failed (${res.status})`);
      }
      const data = (await res.json()) as { url?: string; ok?: boolean };
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setMessage("Payment completed!");
      }
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Price recap */}
      <div className="text-lg font-medium tabular-nums">
        {formatPrice(priceCents, currency)}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <label htmlFor="qty" className="text-sm">Quantity</label>
        <input
          id="qty"
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          className="w-20 rounded  border-black/10 dark:border-white/10 bg-transparent px-2 py-1 text-sm"
        />
      </div>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={buyNow}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black disabled:opacity-60"
          aria-label={`Buy ${name} now`}
        >
          {loading ? "Processing…" : "Buy now"}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => setMessage("Added to wishlist (placeholder)")}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded border border-black/10 dark:border-white/10"
          aria-label={`Add ${name} to wishlist`}
        >
          ❤️ Add to wishlist
        </button>
      </div>

      {message && (
        <p className="text-sm text-black/70 dark:text-white/70">{message}</p>
      )}

      {/* Trust badges / details */}
      <ul className="mt-2 text-sm text-black/70 dark:text-white/70 space-y-1">
        <li>✅ 30-day returns</li>
        <li>🚚 Free shipping over $50</li>
        <li>🔒 Secure checkout</li>
      </ul>
    </div>
  );
}
