"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatHKD } from "@/lib/format";
import ProductVisual from "@/components/ProductVisual";

export default function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/shop/${product.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block"
    >
      <ProductVisual
        product={product}
        shine={hover}
        className={`aspect-[4/5] w-full ${hover ? "specular-ring" : ""}`}
      />
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-obsidian/50">
            {product.brand}
          </p>
          <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
        </div>
        {product.stock <= 0 ? (
          <p className="text-sm text-cinnabar-deep">已售罄</p>
        ) : (
          <p className="text-sm tabular-nums">{formatHKD(product.price.amount)}</p>
        )}
      </div>
    </Link>
  );
}
