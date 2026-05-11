"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Elige tu configuración y tejido en la web",
    desc: "Compact, Urban o Family. Bouclé, Lino o Algodón. Elige tu color y confirma el pedido.",
  },
  {
    num: "02",
    title: "Lo fabricamos en España en 20-25 días",
    desc: "Tu sofá se fabrica bajo pedido en nuestros talleres en Fuensanta de Martos, Villa del Río y Yecla.",
  },
  {
    num: "03",
    title: "Lo recibes en casa y lo montas en 15 minutos",
    desc: "Cada módulo en su caja. Instrucciones ilustradas incluidas. Sin herramientas. Sin instaladores.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#1E1E1C]">
      <div className="modu-container">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Proceso
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F2F1EC]">
            Cómo funciona
          </h2>
        </motion.div>

        {/* Desktop: horizontal steps with animated connector */}
        <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
          {/* Animated progress line (desktop) */}
          <div className="absolute top-[1.25rem] left-0 right-0 h-px bg-[#F2F1EC]/8 overflow-hidden">
            <motion.div
              className="h-full bg-[#7DAF96]/50"
              initial={shouldReduce ? false : { scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 2.0, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={shouldReduce ? false : { opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.35, ease: "easeOut" }}
              className="relative pr-12"
            >
              {/* Step number dot */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full border border-[#7DAF96]/40 flex items-center justify-center shrink-0 bg-[#1E1E1C] z-10 relative">
                  <span className="text-[#7DAF96] text-xs font-bold">{s.num}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#F2F1EC] mb-3 leading-snug">
                {s.title}
              </h3>
              <p className="text-sm text-[#9B9B90] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical steps with animated line */}
        <div className="flex flex-col gap-0 md:hidden relative">
          {/* Vertical animated line */}
          <div className="absolute left-5 top-10 bottom-10 w-px bg-[#F2F1EC]/8 overflow-hidden">
            <motion.div
              className="w-full bg-[#7DAF96]/50"
              initial={shouldReduce ? false : { scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 2.2, delay: 0.3, ease: "easeOut" }}
              style={{ height: "100%" }}
            />
          </div>

          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={shouldReduce ? false : { opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.3 + i * 0.35, ease: "easeOut" }}
              className="relative pl-14 pb-10 last:pb-0"
            >
              {/* Step dot */}
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-[#7DAF96]/40 bg-[#1E1E1C] flex items-center justify-center z-10">
                <span className="text-[#7DAF96] text-xs font-bold">{s.num}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#F2F1EC] mb-2 leading-snug pt-1">
                {s.title}
              </h3>
              <p className="text-sm text-[#9B9B90] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
