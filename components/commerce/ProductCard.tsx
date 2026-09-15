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
      <div className="relative">
        <ProductVisual
          product={product}
          shine={hover}
          className={`aspect-[4/5] w-full ${hover ? "specular-ring" : ""}`}
        />
        {product.type === "digital" && (
          <span className="absolute left-3 top-3 rounded-full bg-obsidian/70 px-2.5 py-1 text-[10px] tracking-widest text-teal backdrop-blur-sm">
            數碼下載
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-obsidian/50">
            {product.brand}
          </p>
          <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
        </div>
        {product.type === "digital" ? (
          <p className="text-sm text-teal-deep">免費</p>
        ) : product.stock <= 0 ? (
          <p className="text-sm text-cinnabar-deep">已售罄</p>
        ) : (
          <p className="text-sm tabular-nums">{formatHKD(product.price.amount)}</p>
        )}
      </div>
    </Link>
  );
}
