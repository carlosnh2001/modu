"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, Truck, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { complementos, allFabrics } from "@/data/products";

const UPSELL_IDS = ["modulo-suelto", "chaise-longue", "rincon", "cojin-decorativo"];
const defaultFabric = allFabrics[0];

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, includesRemoval, toggleRemoval, total, addComplemento } = useCart();

  const upsellItems = complementos.filter((c) => UPSELL_IDS.includes(c.id));

  const handleQuickAdd = (compId: string) => {
    const comp = complementos.find((c) => c.id === compId);
    if (!comp) return;
    addComplemento(comp, defaultFabric);
  };

  const isInCart = (compId: string) => items.some((i) => i.complemento?.id === compId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#F2F1EC] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#CEC8BA]">
              <h2 className="text-base font-semibold text-[#1E1E1C]">Tu pedido</h2>
              <button onClick={closeCart} className="text-[#1E1E1C] hover:opacity-60 transition-opacity">
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <p className="text-[#9B9B90] text-sm">Tu carrito está vacío.</p>
                  <Link href="/tienda" onClick={closeCart} className="text-sm font-medium underline text-[#1E1E1C]">
                    Ver modelos →
                  </Link>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-5 border-b border-[#CEC8BA] last:border-0">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#CEC8BA]/30 shrink-0">
                        <Image src={item.image} alt={item.displayName} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-sm text-[#1E1E1C] leading-snug">{item.displayName}</p>
                            <p className="text-xs text-[#9B9B90] mt-0.5">
                              {item.fabric.family} · {item.fabric.name}
                            </p>
                            {item.orientation && (
                              <p className="text-xs font-medium text-[#7DAF96] mt-0.5">
                                V/F {item.orientation.charAt(0).toUpperCase() + item.orientation.slice(1)}
                              </p>
                            )}
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-[#9B9B90] hover:text-[#1E1E1C] transition-colors shrink-0">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border border-[#CEC8BA] rounded-md">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1.5 text-[#1E1E1C] hover:opacity-60">
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1.5 text-[#1E1E1C] hover:opacity-60">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-semibold">{(item.price * item.quantity).toLocaleString("es-ES")} €</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Upsell section */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingBag size={14} className="text-[#9B9B90]" />
                      <p className="text-xs font-semibold text-[#9B9B90] uppercase tracking-wider">¿Añadir algo más?</p>
                    </div>
                    <div className="space-y-2">
                      {upsellItems.map((comp) => {
                        const inCart = isInCart(comp.id);
                        return (
                          <div
                            key={comp.id}
                            className="flex items-center gap-3 p-3 rounded-xl border border-[#CEC8BA] bg-white/50"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#CEC8BA]/20 shrink-0">
                              <Image src={comp.image} alt={comp.name} fill className="object-cover" sizes="48px" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#1E1E1C] leading-tight">{comp.name}</p>
                              <p className="text-xs text-[#9B9B90]">desde {comp.price} €</p>
                            </div>
                            {inCart ? (
                              <span className="text-xs font-medium text-[#7DAF96] shrink-0">✓ Añadido</span>
                            ) : (
                              <button
                                onClick={() => handleQuickAdd(comp.id)}
                                className="shrink-0 flex items-center gap-1 bg-[#1E1E1C] text-[#F2F1EC] text-xs font-semibold px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity"
                              >
                                <Plus size={12} />
                                Añadir
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-[#9B9B90] mt-2 text-center">
                      Tejido Bouclé Arena por defecto · cámbialo en la ficha del producto
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 pb-6 pt-4 border-t border-[#CEC8BA] space-y-4">
                <label className="flex items-center justify-between gap-3 p-3 rounded-lg border border-[#CEC8BA] cursor-pointer hover:border-[#9B9B90] transition-colors">
                  <div className="flex items-center gap-3">
                    <Truck size={16} className="text-[#9B9B90] shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1C]">Recogida de sofá antiguo</p>
                      <p className="text-xs text-[#9B9B90]">+100 €</p>
                    </div>
                  </div>
                  <input type="checkbox" checked={includesRemoval} onChange={toggleRemoval} className="accent-[#1E1E1C] w-4 h-4" />
                </label>

                <p className="text-xs text-[#9B9B90] text-center">Envío gratis · Fabricado bajo pedido · 25-30 días</p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#9B9B90]">Subtotal</span>
                  <span className="font-semibold text-[#1E1E1C]">{total().toLocaleString("es-ES")} €</span>
                </div>

                <button className="w-full bg-[#1E1E1C] text-[#F2F1EC] py-3.5 rounded-md font-semibold text-sm hover:opacity-85 transition-opacity">
                  Finalizar pedido
                </button>
                <p className="text-xs text-[#9B9B90] text-center">Aceptamos Visa, Mastercard, Bizum y transferencia</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
