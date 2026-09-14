import productsData from "@/data/products.json";
import collectionsData from "@/data/collections.json";
import makersData from "@/data/makers.json";
import type { Product, Collection, Maker } from "./types";

export const products = productsData as Product[];
export const collections = collectionsData as Collection[];
export const makers = makersData as Maker[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function byFloor(floor: string): Product[] {
  return products.filter((p) => p.floor === floor);
}

export function byCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getMaker(slug: string): Maker | undefined {
  return makers.find((m) => m.slug === slug);
}

export function searchProducts(q: string): Product[] {
  const t = q.trim().toLowerCase();
  if (!t) return products;
  return products.filter((p) =>
    [p.name, p.brand, p.material.join(" "), p.story, p.origin, p.category]
      .join(" ")
      .toLowerCase()
      .includes(t),
  );
}

export const FLOOR_LABEL: Record<string, string> = {
  B1: "未定形",
  F1: "光の棚",
  F2: "輝琉之間",
};
