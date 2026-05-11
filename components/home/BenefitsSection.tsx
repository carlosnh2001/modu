"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Package, Settings2, RefreshCw } from "lucide-react";

const BENEFITS = [
  {
    Icon: Package,
    title: "Llega en caja, cabe en el ascensor",
    desc: "Cada módulo llega en su propia caja de 1,10 × 1,10 m. Sube solo por las escaleras o el ascensor.",
  },
  {
    Icon: Settings2,
    title: "Se reconfigura en minutos, sin herramientas",
    desc: "Añade un módulo, cámbialo de sitio o desmóntalo entero. El sistema encaja solo.",
  },
  {
    Icon: RefreshCw,
    title: "Crece contigo, módulo a módulo",
    desc: "Empieza con el Compact. Añade cuando cambies de piso. Todos los módulos son compatibles.",
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#F2F1EC]">
      <div className="modu-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={shouldReduce ? false : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.18, ease: "easeOut" }}
              whileHover={shouldReduce ? {} : {
                y: -6,
                boxShadow: "0 20px 48px rgba(30,30,28,0.09)",
              }}
              className="flex flex-col items-start gap-4 p-7 rounded-2xl border border-[#CEC8BA] bg-[#F2F1EC] cursor-default"
              style={{ transition: "box-shadow 0.3s ease" }}
            >
              <div className="w-11 h-11 rounded-full bg-[#7DAF96]/15 flex items-center justify-center">
                <b.Icon size={20} className="text-[#7DAF96]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E1E1C] leading-snug">
                {b.title}
              </h3>
              <p className="text-sm text-[#9B9B90] leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
