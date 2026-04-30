"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Envío gratis a Península",
  "Fabricado bajo pedido",
  "Entrega en 25-30 días",
  "Garantía 3 años",
  "15 días de prueba",
  "Fabricado en España",
];

// Duplicate items so the loop is seamless
const TRACK = [...ITEMS, ...ITEMS];

export default function TrustBanner() {
  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-[#CEC8BA] overflow-hidden py-2.5">
      <motion.div
        className="flex w-max"
        animate={{ x: "-50%" }}
        initial={{ x: "0%" }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {TRACK.map((item, i) => (
          <span
            key={i}
            className="text-[#1E1E1C] text-xs font-medium tracking-wide whitespace-nowrap px-8 flex items-center gap-2"
          >
            <span className="text-[#7DAF96]">✦</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
