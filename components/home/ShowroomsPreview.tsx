"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { showrooms } from "@/data/showrooms";
import ShowroomModal from "@/components/showrooms/ShowroomModal";

export default function ShowroomsPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [modalCity, setModalCity] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#F2F1EC]">
      <div className="modu-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Showrooms
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1C] mb-4">
            Pruébalo antes de comprarlo.
          </h2>
          <p className="text-[#9B9B90] max-w-lg mx-auto text-sm leading-relaxed">
            Tenemos showrooms en Madrid, Barcelona, Sevilla y Valencia. La compra siempre online.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {showrooms.map((s, i) => (
            <motion.button
              key={s.city}
              onClick={() => setModalCity(s.city)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col gap-3 p-5 border border-[#CEC8BA] rounded-xl bg-[#F2F1EC] hover:shadow-sm hover:border-[#9B9B90] transition-all text-left cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="w-8 h-8 rounded-full bg-[#7DAF96]/15 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-[#7DAF96]" />
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7DAF96] shrink-0" />
                  <span className="text-[10px] text-[#9B9B90]">
                    {s.status === "open" ? "Abierto" : "Próximamente"}
                  </span>
                </div>
              </div>

              {/* City */}
              <p className="font-bold text-[#1E1E1C] text-base leading-tight">{s.city}</p>

              {/* Address */}
              <p className="text-xs text-[#9B9B90] leading-snug">{s.address}</p>

              {/* Description */}
              <p className="text-xs text-[#9B9B90] leading-snug">{s.description}</p>

              {/* CTA */}
              <span className="text-xs font-semibold text-[#7DAF96] mt-auto">
                Solicitar visita →
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/showrooms"
            className="inline-flex items-center border border-[#1E1E1C] text-[#1E1E1C] px-8 py-3 rounded-md font-medium text-sm hover:bg-[#1E1E1C] hover:text-[#F2F1EC] transition-colors"
          >
            Ver showrooms →
          </Link>
        </motion.div>
      </div>

      {modalCity && (
        <ShowroomModal city={modalCity} onClose={() => setModalCity(null)} />
      )}
    </section>
  );
}
