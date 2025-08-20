import Link from "next/link";

export default async function ThankYouPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = (await searchParams) || {};
  const productId = Array.isArray(sp.productId) ? sp.productId[0] : sp.productId;
  const qty = Array.isArray(sp.qty) ? sp.qty[0] : sp.qty;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Thank you!</h1>
      <p className="text-black/70 dark:text-white/70">
        Your order {productId ? (<><span className="font-medium">{productId}</span></>) : null} {qty ? (<span>(x{qty})</span>) : null} has been received.
      </p>
      <div className="flex items-center gap-4">
        <Link href="/products" className="underline">Continue shopping</Link>
        <Link href="/me" className="underline">View account</Link>
      </div>
    </div>
  );
}
