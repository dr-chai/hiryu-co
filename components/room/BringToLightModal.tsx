"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatHKD } from "@/lib/format";
import ProductVisual from "@/components/ProductVisual";
import AddToCartButton from "@/components/commerce/AddToCartButton";

export default function BringToLightModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-6"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        className="glass w-full max-w-lg rounded-3xl p-8 text-offwhite outline-none"
        initial={reduced ? false : { scale: 0.94, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={reduced ? undefined : { scale: 0.94, y: 16, opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ProductVisual product={product} shine className="aspect-[4/3] w-full" />
        <div className="mt-6">
          <p className="text-xs tracking-widest text-teal">{product.brand}</p>
          <h2 className="mt-2 font-serif text-2xl">{product.name}</h2>
          <p className="mt-1 text-sm text-offwhite/60">
            {formatHKD(product.price.amount)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-offwhite/85">
            {product.story}
          </p>
          <p className="mt-3 text-xs text-offwhite/50">
            {product.material.join("、")} · {product.origin}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <AddToCartButton product={product} />
          <button
            onClick={onClose}
            className="text-sm text-offwhite/60 transition-colors hover:text-offwhite"
          >
            先留低睇下
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
