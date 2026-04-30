"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { SofaModel } from "@/data/products";

export default function ProductCard({ model }: { model: SofaModel }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/tienda/${model.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#CEC8BA]/20 mb-4">
          <Image
            src={hovered ? model.images.secondary : model.images.principal}
            alt={model.name}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
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
