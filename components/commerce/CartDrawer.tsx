"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/store";
import { useUI } from "@/lib/ui-store";
import { getProductById } from "@/lib/selectors";
import { formatHKD } from "@/lib/format";
import ProductVisual from "@/components/ProductVisual";

export default function CartDrawer() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const cartOpen = useUI((s) => s.cartOpen);
  const setCartOpen = useUI((s) => s.setCartOpen);

  const lines = Object.entries(items)
    .map(([id, qty]) => ({ product: getProductById(id), qty }))
    .filter((l) => l.product);
  const total = lines.reduce(
    (sum, l) => sum + (l.product?.price.amount ?? 0) * l.qty,
    0,
  );

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-offwhite text-obsidian shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            role="dialog"
            aria-label="購物袋"
          >
            <div className="flex items-center justify-between border-b border-obsidian/10 px-6 py-5">
              <h2 className="font-serif text-lg">購物袋</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-obsidian/50 hover:text-obsidian"
                aria-label="關閉"
              >
                ✕
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-serif text-lg leading-relaxed">
                  個袋仲係空嘅。冇關係——
                  <br />
                  好嘢未出現，只係未上到嚟。
                </p>
                <Link
                  href="/shop"
                  onClick={() => setCartOpen(false)}
                  className="mt-6 text-sm text-teal-deep underline underline-offset-4"
                >
                  上樓行下，揀一件令日常發光嘅嘢
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  {lines.map(({ product, qty }) => (
                    <li
                      key={product!.id}
                      className="flex gap-4 border-b border-obsidian/5 py-4"
                    >
                      <ProductVisual
                        product={product!}
                        className="h-16 w-16 shrink-0"
                      />
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium">{product!.name}</p>
                        <p className="text-xs text-obsidian/50">
                          {product!.brand}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <button
                            onClick={() => setQty(product!.id, qty - 1)}
                            className="h-6 w-6 rounded border border-obsidian/20"
                            aria-label="減一件"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">{qty}</span>
                          <button
                            onClick={() => setQty(product!.id, qty + 1)}
                            className="h-6 w-6 rounded border border-obsidian/20"
                            aria-label="加一件"
                          >
                            +
                          </button>
                          <button
                            onClick={() => remove(product!.id)}
                            className="ml-auto text-xs text-obsidian/40 hover:text-cinnabar-deep"
                          >
                            移除
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">
                        {formatHKD(product!.price.amount * qty)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-obsidian/10 px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span>小計</span>
                    <span className="font-medium">{formatHKD(total)}</span>
                  </div>
                  <p className="mt-2 text-xs text-obsidian/50">
                    仲爭少少就送到你手上，要唔要揀多件？
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-4 w-full rounded-full bg-obsidian py-3 text-sm text-offwhite transition-colors hover:bg-teal-deep"
                  >
                    去結帳
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
