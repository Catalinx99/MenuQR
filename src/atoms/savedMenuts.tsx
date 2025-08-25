import { atom } from "jotai";

export type Allergen =
  | "Gluten"
  | "Crustaceans"
  | "Eggs"
  | "Fish"
  | "Peanuts"
  | "Soybeans"
  | "Milk"
  | "Nuts"
  | "Celery"
  | "Mustard"
  | "Sesame"
  | "Sulphites"
  | "Lupin"
  | "Molluscs";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  kcal: number;
  description: string;
  allergens: Allergen[];
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Menu {
  templateType?: string;
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  categories: Category[];
  imageUrl?: string;
}
export const savedMenusAtom = atom<Menu[]>([]);
