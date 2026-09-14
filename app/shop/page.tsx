"use client";

import { useState } from "react";
import ProductCard from "@/components/commerce/ProductCard";
import { products, collections } from "@/lib/selectors";
import { searchProducts } from "@/lib/selectors";

function chip(active: boolean) {
  return `rounded-full border px-4 py-1.5 text-sm transition-colors ${
    active
      ? "border-teal-deep bg-teal-deep text-offwhite"
      : "border-obsidian/15 text-obsidian/60 hover:border-teal-deep hover:text-teal-deep"
  }`;
}

export default function ShopPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  let list = searchProducts(q);
  if (cat) list = list.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen bg-offwhite px-6 pb-24 pt-28 text-obsidian">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.3em] text-teal-deep">選物 SHOP</p>
        <h1 className="mt-3 font-serif text-4xl">直接選購</h1>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搵下……（物料／品牌／故事）"
          className="mt-8 w-full max-w-md rounded-full border border-obsidian/15 bg-transparent px-5 py-3 text-sm outline-none transition-colors focus:border-teal-deep"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => setCat(null)} className={chip(cat === null)}>
            全部
          </button>
          {collections.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={chip(cat === c.slug)}
            >
              {c.title}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="mt-16 text-center text-obsidian/50">
            搵唔到。可能佢仲等緊被帶到光裡，換個字試下？
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
