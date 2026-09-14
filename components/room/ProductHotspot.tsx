"use client";

import type { Product } from "@/lib/types";
import { formatHKD } from "@/lib/format";
import ProductVisual from "@/components/ProductVisual";

export default function ProductHotspot({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (p: Product) => void;
}) {
  return (
    <button
      onClick={() => onSelect(product)}
      style={{
        left: `${product.position.x * 100}%`,
        top: `${product.position.y * 100}%`,
      }}
      className="group absolute w-24 -translate-x-1/2 -translate-y-1/2 sm:w-28"
      aria-label={`${product.name}，${formatHKD(product.price.amount)}`}
    >
      <ProductVisual
        product={product}
        className="aspect-square w-full ring-1 ring-teal/40 transition-all duration-300 group-hover:scale-105 group-hover:specular-ring"
      />
      <span className="mt-1.5 block text-center text-xs text-offwhite/90">
        {product.name}
        <span className="ml-1.5 text-teal">{formatHKD(product.price.amount)}</span>
      </span>
    </button>
  );
}
