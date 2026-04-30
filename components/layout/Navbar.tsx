"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";

const NAV_LINKS = [
  { label: "Tienda", href: "/tienda" },
  { label: "Por qué Modu", href: "/por-que-modu" },
  { label: "Showrooms", href: "/showrooms" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "FAQs", href: "/faqs" },
];

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, itemCount } = useCart();
  const count = itemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = dark && !scrolled;
  const textColor = isDark ? "text-[#F2F1EC]" : "text-[#1E1E1C]";
  const bg = isDark ? "bg-transparent" : "bg-[#F2F1EC]";
  const border = scrolled ? "border-b border-[#CEC8BA]" : "border-b border-transparent";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${bg} ${border}`}>
        <div className="modu-container w-full flex items-center justify-between">
          {/* Logo — 2× bigger than initial */}
          <Link href="/" className="flex items-center">
            <div className="relative h-14 w-52">
              <Image
                src="/images/logo-modu.png"
                alt="MODU"
                fill
                quality={100}
                className={`object-contain object-left transition-all duration-300 ${isDark ? "brightness-0 invert" : "brightness-0"}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:opacity-60 ${textColor}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className={`hidden md:flex p-1 ${textColor} hover:opacity-60 transition-opacity`}>
              <Search size={18} />
            </button>
            <button onClick={() => openCart()} className={`relative p-1 ${textColor} hover:opacity-60 transition-opacity`}>
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-[18px] w-[18px] rounded-full bg-[#1E1E1C] text-[#F2F1EC] text-[10px] font-semibold flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className={`md:hidden p-1 ${textColor}`}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: "easeOut", duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#F2F1EC] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-[#CEC8BA]">
                <div className="relative h-11 w-40">
                  <Image src="/images/logo-modu.png" alt="MODU" fill quality={100} className="object-contain object-left brightness-0" />
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-[#1E1E1C]">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col px-6 py-8 gap-6">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-[#1E1E1C] hover:opacity-60"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
