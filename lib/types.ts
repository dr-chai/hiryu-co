export type Floor = "B1" | "F1" | "F2";

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: { currency: "HKD"; amount: number };
  stock: number;
  material: string[];
  story: string;
  category: string; // collection slug
  floor: Floor;
  origin: string;
  colors: string[];
  images: { raw: string; shine: string };
  position: { x: number; y: number; z: number };
}

export interface Collection {
  slug: string;
  title: string;
  en: string;
  description: string;
  accent: "teal" | "amber";
}

export interface Maker {
  slug: string;
  name: string;
  origin: string;
  line: string;
  productIds: string[];
}
