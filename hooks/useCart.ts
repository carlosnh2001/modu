"use client";

import { create } from "zustand";
import type { SofaModel, Complemento, Configuration, Fabric } from "@/data/products";

export type Orientation = "izquierda" | "derecha";
export type FamilyModule = "chaise" | "rincon";

export type CartItem = {
  id: string;
  model?: SofaModel;
  config?: Configuration;
  complemento?: Complemento;
  fabric: Fabric;
  quantity: number;
  displayName: string;
  price: number;
  image: string;
  orientation?: Orientation;
  familyModule?: FamilyModule;
  cojinSize?: string;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  includesRemoval: boolean;
  addSofa: (model: SofaModel, config: Configuration, fabric: Fabric, orientation?: Orientation, familyModule?: FamilyModule) => void;
  addComplemento: (comp: Complemento, fabric: Fabric, orientation?: Orientation, cojinSize?: string, cojinPrice?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleRemoval: () => void;
  total: () => number;
  itemCount: () => number;
};

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  includesRemoval: false,

  addSofa: (model, config, fabric, orientation, familyModule) => {
    const id = `${model.id}-${config.id}-${fabric.id}${orientation ? `-${orientation}` : ""}${familyModule ? `-${familyModule}` : ""}`;
    const existing = get().items.find((i) => i.id === id);
    if (existing) {
      set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) }));
    } else {
      const moduleLabel = familyModule === "chaise" ? " · Chaise Longue" : familyModule === "rincon" ? " · Módulo Rincón" : "";
      const orientLabel = orientation ? ` · V/F ${orientation.charAt(0).toUpperCase() + orientation.slice(1)}` : "";
      const item: CartItem = {
        id, model, config, fabric, orientation, familyModule,
        quantity: 1,
        displayName: `${model.name} · ${config.name}${moduleLabel}${orientLabel}`,
        price: config.price,
        image: model.images.principal,
      };
      set((s) => ({ items: [...s.items, item] }));
    }
    set({ isOpen: true });
  },

  addComplemento: (comp, fabric, orientation, cojinSize, cojinPrice) => {
    const id = `${comp.id}-${fabric.id}${orientation ? `-${orientation}` : ""}${cojinSize ? `-${cojinSize}` : ""}`;
    const existing = get().items.find((i) => i.id === id);
    if (existing) {
      set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) }));
    } else {
      const orientLabel = orientation ? ` · V/F ${orientation.charAt(0).toUpperCase() + orientation.slice(1)}` : "";
      const sizeLabel = cojinSize ? ` · ${cojinSize}` : "";
      const item: CartItem = {
        id, complemento: comp, fabric, orientation, cojinSize,
        quantity: 1,
        displayName: `${comp.name}${sizeLabel}${orientLabel}`,
        price: cojinPrice ?? comp.price,
        image: comp.image,
      };
      set((s) => ({ items: [...s.items, item] }));
    }
    set({ isOpen: true });
  },

  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) => {
    if (quantity < 1) { get().removeItem(id); return; }
    set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, quantity } : i) }));
  },

  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleRemoval: () => set((s) => ({ includesRemoval: !s.includesRemoval })),

  total: () => {
    const base = get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return base + (get().includesRemoval ? 100 : 0);
  },
  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
