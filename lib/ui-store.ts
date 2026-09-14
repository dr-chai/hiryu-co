"use client";

import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
}));
