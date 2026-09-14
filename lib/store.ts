"use client";

import { create } from "zustand";

export interface CartState {
  items: Record<string, number>; // productId -> qty
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: {},
  add: (id) =>
    set((s) => ({ items: { ...s.items, [id]: (s.items[id] ?? 0) + 1 } })),
  remove: (id) =>
    set((s) => {
      const { [id]: _removed, ...rest } = s.items;
      return { items: rest };
    }),
  setQty: (id, qty) =>
    set((s) => {
      if (qty <= 0) {
        const { [id]: _removed, ...rest } = s.items;
        return { items: rest };
      }
      return { items: { ...s.items, [id]: qty } };
    }),
  clear: () => set({ items: {} }),
}));

export const selectCartCount = (items: Record<string, number>) =>
  Object.values(items).reduce((a, b) => a + b, 0);
