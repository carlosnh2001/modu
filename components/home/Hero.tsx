"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, type Transition } from "framer-motion";
import { useNavbarColor } from "@/components/layout/NavbarProvider";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { setDark } = useNavbarColor();
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    setDark(true);
    return () => setDark(false);
  }, [setDark]);

  // Parallax — image moves 80px upward over 700px of scroll
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, shouldReduce ? 0 : -80]);

  const fadeUp = (delay = 0) => ({
    initial: shouldReduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" } as Transition,
  });

  return (
    <section className="relative min-h-screen bg-[#1E1E1C] flex items-center overflow-hidden">
      {/* ── FOTO PRINCIPAL — parallax background ── */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/hero-principal.png"
          alt="Sofá MODU en salón"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient from left so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E1C]/90 via-[#1E1E1C]/55 to-[#1E1E1C]/10" />
        {/* Subtle bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1E1E1C]/40 to-transparent" />
      </motion.div>

      {/* ── Content ── */}
      <div className="modu-container relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-2xl">
          <motion.p
            {...fadeUp(0.1)}
            className="text-[#9B9B90] text-xs font-semibold tracking-widest uppercase mb-6"
          >
            Sofás modulares · Fabricados en España
          </motion.p>

          <motion.h1
            {...fadeUp(0.3)}
            className="text-[#F2F1EC] text-5xl md:text-7xl font-bold leading-[1.0] mb-6 tracking-tight"
          >
            El sofá que se adapta a tu vida.
          </motion.h1>

          <motion.p
            {...fadeUp(0.5)}
            className="text-[#F2F1EC]/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
          >
            Configúralo, muévelo, amplíalo. Sin herramientas. En menos de 15 minutos.
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center bg-[#F2F1EC] text-[#1E1E1C] px-8 py-4 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Ver configuraciones →
            </Link>
            <Link
              href="/por-que-modu"
              className="inline-flex items-center justify-center border border-[#F2F1EC]/30 text-[#F2F1EC] px-8 py-4 rounded-md font-medium text-sm hover:border-[#F2F1EC]/60 hover:bg-[#F2F1EC]/5 transition-all"
            >
              Conocer Modu
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#F2F1EC]/40"
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
