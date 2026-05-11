"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { SofaModel } from "@/data/products";

export default function ProductCard({ model }: { model: SofaModel }) {
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduce ? {} : { y: -6, boxShadow: "0 24px 56px rgba(30,30,28,0.1)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ borderRadius: "0.75rem" }}
    >
      <Link href={`/tienda/${model.slug}`} className="block">
        {/* Image container — overflow hidden for zoom effect */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#CEC8BA]/20 mb-4">
          <motion.div
            className="absolute inset-0"
            animate={shouldReduce ? {} : { scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Image
              src={hovered ? model.images.secondary : model.images.principal}
              alt={model.name}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        </div>

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[#1E1E1C] text-lg">{model.name}</h3>
            <p className="text-sm text-[#9B9B90] mt-0.5">{model.tagline}</p>
          </div>
          <p className="font-semibold text-[#1E1E1C] whitespace-nowrap text-sm mt-0.5">
            desde {model.priceFrom.toLocaleString("es-ES")} €
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
