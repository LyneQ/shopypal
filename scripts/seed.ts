/*
  Development seed script for Shopypal
  - Inserts categories, products, and product-category relations
  - Idempotent: safe to run multiple times

  Run:
    npm run seed
*/

import db from "../app/db/client";
import { categories, productCategories, products } from "../app/db/schema";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function seed() {
  console.log("Seeding database with demo categories and products...\n");

  const demoCategories = [
    { name: "Animals" },
    { name: "Fantasy" },
    { name: "Seasonal" },
  ];

  const demoProducts = [
    {
      name: "Cuddly Faz Bear",
      description: "A soft and huggable brown bear plush, perfect for cozy nights.",
      priceCents: 2499,
      currency: "USD",
      imageUrl: "/products/faz-bear.webp",
      categories: ["Animals"],
    },
    {
      name: "Mystic Unicorn",
      description: "Sparkly white unicorn plush for fantasy lovers.",
      priceCents: 2999,
      currency: "USD",
      imageUrl: "/products/unicorn.webp",
      categories: ["Fantasy"],
    },
    {
      name: "Festive Reindeer",
      description: "Limited edition reindeer plush with cute antler",
      priceCents: 2799,
      currency: "USD",
      imageUrl: "/products/reindeer.webp",
      categories: ["Seasonal", "Animals"],
    },
    {
      name: "Galaxy Dragon",
      description: "A star-speckled dragon plush from the depths of space.",
      priceCents: 3499,
      currency: "USD",
      imageUrl: "/products/galaxy-dragon.webp",
      categories: ["Fantasy"],
    },
    {
      name: "Polar Penguin",
      description: "Chilly but charming penguin plush with a tiny beanie.",
      priceCents: 2199,
      currency: "USD",
      imageUrl: "/products/Polar-penguin.webp",
      categories: ["Animals", "Seasonal"],
    },
  ];

  // 1) Insert categories (idempotent)
  const categoryRows = demoCategories.map((c) => ({
    id: slugify(c.name),
    name: c.name,
  }));

  await db
    .insert(categories)
    .values(categoryRows)
    .onConflictDoNothing();

  console.log(`Ensured ${categoryRows.length} categories.`);

  // 2) Insert products (idempotent) — use slug id from name
  const now = new Date();
  const productRows = demoProducts.map((p) => ({
    id: slugify(p.name),
    name: p.name,
    description: p.description,
    priceCents: p.priceCents,
    currency: p.currency,
    imageUrl: p.imageUrl,
    createdAt: now,
    updatedAt: now,
  }));

  await db
    .insert(products)
    .values(productRows)
    .onConflictDoNothing();

  console.log(`Ensured ${productRows.length} products.`);

  // 3) Insert product-category relations (idempotent without a DB constraint):
  //    We'll query existing pairs and only insert missing ones.
  const allExistingPairs = await db
    .select({ productId: productCategories.productId, categoryId: productCategories.categoryId })
    .from(productCategories);
  const existingSet = new Set(allExistingPairs.map((r) => `${r.productId}|${r.categoryId}`));

  const relationRows: { productId: string; categoryId: string }[] = [];
  for (const p of demoProducts) {
    const pId = slugify(p.name);
    for (const cname of p.categories) {
      const cId = slugify(cname);
      const key = `${pId}|${cId}`;
      if (!existingSet.has(key)) {
        relationRows.push({ productId: pId, categoryId: cId });
        existingSet.add(key);
      }
    }
  }

  if (relationRows.length > 0) {
    await db.insert(productCategories).values(relationRows);
  }

  console.log(`Ensured ${relationRows.length} new product-category relations.\n`);
  console.log("Seed complete. You can now visit http://localhost:3000/products to see items.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
