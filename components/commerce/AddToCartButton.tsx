"use client";

import { useCart } from "@/lib/store";

export default function AddToCartButton({
  id,
  label = "帶到光裡",
}: {
  id: string;
  label?: string;
}) {
  const add = useCart((s) => s.add);
  return (
    <button
      onClick={() => add(id)}
      className="rounded-full bg-obsidian/90 px-6 py-3 text-sm text-offwhite ring-1 ring-teal/60 transition-all hover:bg-obsidian hover:ring-teal hover:shadow-[0_0_24px_-4px_rgba(101,200,194,0.5)]"
    >
      {label}
    </button>
  );
}
