import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const productId = String(body?.productId || "").trim();
    const quantityRaw = Number(body?.quantity ?? 1);
    const quantity = Number.isFinite(quantityRaw) && quantityRaw > 0 ? Math.floor(quantityRaw) : 1;

    if (!productId) {
      return new NextResponse("Missing productId", { status: 400 });
    }

    // In a real implementation, you'd verify product, price, and create a payment session.
    // For now we simulate success and redirect to a simple Thank You page with details.
    const url = new URL(`/thank-you?productId=${encodeURIComponent(productId)}&qty=${quantity}`, req.url);
    return NextResponse.json({ ok: true, url: url.toString() });
  } catch (err: any) {
    return new NextResponse("Checkout error", { status: 500 });
  }
}
