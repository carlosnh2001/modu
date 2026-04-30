"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { sofaModels } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function ProductsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const preview = sofaModels.slice(0, 3);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#CEC8BA]/25">
      <div className="modu-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">Modelos</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1C]">Elige tu Modu</h2>
          </div>
          <Link
            href="/tienda"
            className="text-sm font-medium text-[#1E1E1C] underline underline-offset-4 hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            Ver todos los modelos →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {preview.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            >
              <ProductCard model={m} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
