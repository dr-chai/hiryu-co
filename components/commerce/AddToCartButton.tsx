"use client";

import { useCart } from "@/lib/store";
import type { Product } from "@/lib/types";

export default function AddToCartButton({
  product,
  label = "帶到光裡",
  tone = "dark",
}: {
  product: Product;
  label?: string;
  tone?: "dark" | "light";
}) {
  const add = useCart((s) => s.add);
  const soldOut = product.stock <= 0;

  if (product.type === "digital") {
    return (
      <a
        href={product.file ?? "#"}
        download
        className="inline-flex items-center gap-2 rounded-full bg-obsidian/90 px-6 py-3 text-sm text-offwhite ring-1 ring-teal/60 transition-all hover:bg-obsidian hover:ring-teal hover:shadow-[0_0_24px_-4px_rgba(101,200,194,0.5)]"
      >
        <span aria-hidden>↓</span> 免費下載
      </a>
    );
  }

  if (soldOut) {
    return (
      <span
        className={`inline-block rounded-full border px-6 py-3 text-sm ${
          tone === "light"
            ? "border-cinnabar-deep/40 text-cinnabar-deep"
            : "border-cinnabar/50 text-cinnabar"
        }`}
      >
        已售罄
      </span>
    );
  }

  return (
    <button
      onClick={() => add(product.id)}
      className="rounded-full bg-obsidian/90 px-6 py-3 text-sm text-offwhite ring-1 ring-teal/60 transition-all hover:bg-obsidian hover:ring-teal hover:shadow-[0_0_24px_-4px_rgba(101,200,194,0.5)]"
    >
      {label}
    </button>
  );
}
