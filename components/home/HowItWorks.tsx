"use client";

import { motion, useInView } from "framer-motion";
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

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#1E1E1C]">
      <div className="modu-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Proceso
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F2F1EC]">
            Cómo funciona
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.18, ease: "easeOut" }}
              className="relative pl-0 md:pr-12 mb-10 md:mb-0"
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-5 left-[calc(100%-3rem)] right-0 h-px bg-[#F2F1EC]/15" />
              )}
              <div className="text-5xl font-bold text-[#F2F1EC]/10 leading-none mb-4">
                {s.num}
              </div>
              <h3 className="text-lg font-semibold text-[#F2F1EC] mb-3 leading-snug">
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
