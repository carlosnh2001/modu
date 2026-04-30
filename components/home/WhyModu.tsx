"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Wrench, Package, Shield } from "lucide-react";

const BLOCKS = [
  {
    Icon: MapPin,
    title: "Fabricado en España",
    desc: "Trabajamos con fabricantes en Fuensanta de Martos, Villa del Río y Yecla, tres de los clústeres más importantes del mueble en España.",
  },
  {
    Icon: Wrench,
    title: "Montaje sin herramientas",
    desc: "El sistema de unión está diseñado para ensamblarse a mano. En menos de 15 minutos tienes el sofá listo.",
  },
  {
    Icon: Package,
    title: "Cabe en el ascensor",
    desc: "Cada módulo llega en su caja de 1,10 × 1,10 m. Sin operarios. Sin esperar en casa todo el día.",
  },
  {
    Icon: Shield,
    title: "Garantía 3 años + prueba 15 días",
    desc: "Tienes 15 días para probarlo en casa. Si no te convence, lo recogemos gratis. Y garantía de 3 años en todo.",
  },
];

export default function WhyModu() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#F2F1EC]">
      <div className="modu-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-lg"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Por qué Modu
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1C]">
            Diseñado para la vida real.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {BLOCKS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="flex gap-5 p-6 rounded-xl border border-[#CEC8BA] bg-[#F2F1EC] hover:shadow-sm transition-shadow"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#7DAF96]/15 flex items-center justify-center mt-0.5">
                <b.Icon size={18} className="text-[#7DAF96]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1E1E1C] mb-2">{b.title}</h3>
                <p className="text-sm text-[#9B9B90] leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
