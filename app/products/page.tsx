import Link from "next/link";
import db from "@/app/db/client";
import { categories, productCategories, products } from "@/app/db/schema";
import { and, eq, gte, inArray, lte, sql } from "drizzle-orm";

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

function toCents(input?: string | null): number | null {
  if (!input) return null;
  const n = Number(String(input).replace(/[^0-9.\-]/g, ""));
  if (Number.isNaN(n) || !Number.isFinite(n)) return null;
  const cents = Math.round(n * 100);
  return cents < 0 ? 0 : cents;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  // Backward-compatible single category by name (e.g., ?category=Animals)
  const categoryParamRaw = Array.isArray(sp?.category)
    ? sp?.category[0]
    : sp?.category;
  const categoryParam = (categoryParamRaw || "").trim();

  // New multi-select categories by id (e.g., ?categories=animals&categories=fantasy)
  const categoriesParamRaw = sp?.categories;
  const selectedCategoryValues = Array.isArray(categoriesParamRaw)
    ? categoriesParamRaw
    : categoriesParamRaw
    ? [categoriesParamRaw]
    : [];

  // Read price range in dollars
  const minPriceStr = Array.isArray(sp?.minPrice) ? sp?.minPrice[0] : sp?.minPrice;
  const maxPriceStr = Array.isArray(sp?.maxPrice) ? sp?.maxPrice[0] : sp?.maxPrice;
  const minPriceCents = toCents(minPriceStr);
  const maxPriceCents = toCents(maxPriceStr);

  // Fetch categories for sidebar
  const allCategories = (await db
    .select({ id: categories.id, name: categories.name })
    .from(categories))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Resolve selected category IDs
  let selectedCategoryIds: string[] = [];
  let activeCategoryName: string | null = null;

  if (selectedCategoryValues.length > 0) {
    // Treat as IDs directly from the sidebar
    const set = new Set(selectedCategoryValues.map((s) => String(s)));
    selectedCategoryIds = allCategories.filter((c) => set.has(c.id)).map((c) => c.id);
  } else if (categoryParam) {
    // Fallback: category by name
    const lower = categoryParam.toLowerCase();
    const found = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories)
      .where(sql`lower(${categories.name}) = ${lower}`);
    if (found.length) {
      activeCategoryName = found[0].name;
      selectedCategoryIds = [found[0].id];
    }
  }

  // Normalize range if both are present and overlapping
  let normalizedMin = minPriceCents;
  let normalizedMax = maxPriceCents;
  if (normalizedMin !== null && normalizedMax !== null && normalizedMin > normalizedMax) {
    // swap
    const tmp = normalizedMin;
    normalizedMin = normalizedMax;
    normalizedMax = tmp;
  }

  // Build conditions
  const conditions: any[] = [];
  const selectingByCategory = selectedCategoryIds.length > 0;
  if (selectingByCategory) {
    // This will be attached when we join productCategories
    conditions.push(inArray(productCategories.categoryId, selectedCategoryIds));
  }
  if (normalizedMin !== null) conditions.push(gte(products.priceCents, normalizedMin));
  if (normalizedMax !== null) conditions.push(lte(products.priceCents, normalizedMax));

  // Build query
  let query: any = db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      priceCents: products.priceCents,
      currency: products.currency,
      imageUrls: products.imageUrls,
    })
    .from(products);

  if (selectingByCategory) {
    query = query.innerJoin(
      productCategories,
      eq(productCategories.productId, products.id)
    );
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  if (selectingByCategory) {
    // Avoid duplicates when a product is in multiple selected categories
    // Grouping by product id is enough since we don't aggregate any other fields
    query = query.groupBy(products.id);
  }

  const items: { id: string; name: string; description: string | null; priceCents: number; currency: string; imageUrls: string[] | null }[] = await query;

  const anyFilterApplied = selectingByCategory || normalizedMin !== null || normalizedMax !== null;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Products</h1>
          {activeCategoryName ? (
            <p className="text-sm text-black/70 dark:text-white/70">
              Showing category: <span className="font-medium">{activeCategoryName}</span>
              {" "}
              <Link href="/products" className="underline ml-1">Clear</Link>
            </p>
          ) : anyFilterApplied ? (
            <p className="text-sm text-black/70 dark:text-white/70">
              Filters applied
              {" "}
              <Link href="/products" className="underline ml-1">Clear</Link>
            </p>
          ) : (
            <p className="text-sm text-black/70 dark:text-white/70">Browse all plushies</p>
          )}
        </div>
        <Link href="/" className="text-sm hover:underline">Home</Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <form method="get" className="space-y-4 rounded-lg border border-black/10 dark:border-white/10 p-4 bg-white/50 dark:bg-black/20">
            <div>
              <h2 className="text-sm font-medium mb-2">Price</h2>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="minPrice"
                  min={0}
                  step="1"
                  placeholder="Min"
                  defaultValue={minPriceStr ?? ""}
                  className="w-full rounded border border-black/10 dark:border-white/10 bg-transparent px-2 py-1 text-sm"
                />
                <span className="text-sm">-</span>
                <input
                  type="number"
                  name="maxPrice"
                  min={0}
                  step="1"
                  placeholder="Max"
                  defaultValue={maxPriceStr ?? ""}
                  className="w-full rounded border border-black/10 dark:border-white/10 bg-transparent px-2 py-1 text-sm"
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium mb-2">Categories</h2>
              <div className="space-y-2">
                {allCategories.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="categories"
                      value={c.id}
                      defaultChecked={selectedCategoryIds.includes(c.id)}
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="submit" className="text-sm px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black">
                Apply
              </button>
              <Link href="/products" className="text-sm underline">
                Clear
              </Link>
            </div>
          </form>
        </aside>

        {/* Content */}
        <section className="md:col-span-3">
          {items.length === 0 ? (
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-8 text-center text-black/70 dark:text-white/70">
              No products found.
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <div key={p.id} className="rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/20 overflow-hidden flex flex-col">
                  <div className="aspect-square bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden">
                      <Link href={`/products/${p.id}`} className="w-full h-full flex items-center justify-center">
                          {p.imageUrls ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.imageUrls[0]} alt={p.name} className="w-full h-full object-cover transform transition-transform duration-300 ease-out hover:scale-110" />
                          ) : (
                              <div className="text-5xl">🧸</div>
                          )}
                      </Link>
                  </div>
                  <div className="p-4 space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-medium truncate" title={p.name}>{p.name}</h3>
                      <div className="text-sm whitespace-nowrap tabular-nums">
                        {formatPrice(p.priceCents, p.currency)}
                      </div>
                    </div>
                    {p.description && (
                      <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2">{p.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
