"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { byFloor, FLOOR_LABEL } from "@/lib/selectors";
import { formatHKD } from "@/lib/format";
import type { Product, Floor as FloorType } from "@/lib/types";
import ProductVisual from "@/components/ProductVisual";
import ProductHotspot from "./ProductHotspot";
import BringToLightModal from "./BringToLightModal";

const FLOORS: { id: FloorType; level: string; bg: string; note: string }[] = [
  {
    id: "B1",
    level: "地下",
    bg: "bg-obsidian",
    note: "未被發現，不代表冇價值",
  },
  {
    id: "F1",
    level: "一樓",
    bg: "bg-night",
    note: "日常物件，都可以點亮生活",
  },
  {
    id: "F2",
    level: "頂樓",
    bg: "bg-[#2b2b34]",
    note: "被理解、被選中、開始發光",
  },
];

export default function Room() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <div className="relative bg-obsidian">
      {/* 逃生口：直接選購 */}
      <Link
        href="/shop"
        className="fixed right-6 top-24 z-40 text-sm text-offwhite/60 transition-colors hover:text-teal"
      >
        直接選購 →
      </Link>

      <p className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 text-xs tracking-[0.3em] text-offwhite/40">
        SCROLL — 上樓
      </p>

      {FLOORS.map((floor) => {
        const items = byFloor(floor.id).filter((p) => p.type !== "digital");
        return (
          <section
            key={floor.id}
            className={`${floor.bg} obsidian-glow relative flex min-h-screen flex-col items-center justify-center px-6 py-24`}
          >
            <div className="text-center">
              <p className="text-xs tracking-[0.4em] text-teal">{floor.level}</p>
              <h2 className="mt-3 font-serif text-4xl text-offwhite sm:text-5xl">
                {FLOOR_LABEL[floor.id]}
              </h2>
              <p className="mt-3 text-sm text-offwhite/60">{floor.note}</p>
            </div>

            {/* Desktop：hotspot 喺架上 */}
            <div className="relative mt-16 hidden h-80 w-full max-w-3xl rounded-3xl border border-offwhite/10 sm:block">
              {items.map((p) => (
                <ProductHotspot key={p.id} product={p} onSelect={setActive} />
              ))}
            </div>

            {/* Mobile：stacked grid */}
            <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-4 sm:hidden">
              {items.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="text-left"
                >
                  <ProductVisual
                    product={p}
                    decorative
                    className="aspect-square w-full ring-1 ring-teal/30"
                  />
                  <span className="mt-1.5 block text-xs text-offwhite/90">
                    {p.name}
                    <span className="ml-1.5 text-teal">
                      {formatHKD(p.price.amount)}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <AnimatePresence>
        {active && (
          <BringToLightModal product={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
