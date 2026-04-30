"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { showrooms } from "@/data/showrooms";
import ShowroomModal from "@/components/showrooms/ShowroomModal";

export default function ShowroomsPage() {
  const [modalCity, setModalCity] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-24">
      <div className="modu-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Showrooms
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] mb-4">
            Pruébalo antes de decidirte.
          </h1>
          <p className="text-[#9B9B90] text-sm leading-relaxed">
            Nuestros showrooms no son tiendas. Son espacios donde puedes
            sentarlo, tocarlo y ver el sistema modular en acción. La compra,
            siempre online.
          </p>
        </motion.div>

        {/* Interactive map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full rounded-2xl overflow-hidden border border-[#CEC8BA] mb-12"
          style={{ height: "640px" }}
        >
          <iframe
            src="/maps/espana.html"
            className="w-full h-full border-0"
            title="Mapa showrooms MODU"
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {showrooms.map((s, i) => (
            <motion.div
              key={s.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="flex flex-col rounded-xl overflow-hidden border border-[#CEC8BA] bg-[#F2F1EC] hover:shadow-sm transition-shadow"
            >
              {/* City photo */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={s.image}
                  alt={`Showroom ${s.city}`}
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-3 p-6 flex-1">
                <div>
                  <h2 className="text-xl font-bold text-[#1E1E1C] mb-1">
                    {s.city}
                  </h2>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#7DAF96]" />
                    <span className="text-xs font-medium text-[#7DAF96]">
                      Abierto
                    </span>
                  </div>
                  <p className="text-xs text-[#9B9B90]">
                    Dirección disponible próximamente
                  </p>
                </div>
                <button
                  onClick={() => setModalCity(s.city)}
                  className="mt-auto border border-[#1E1E1C] text-[#1E1E1C] text-sm font-medium py-2.5 rounded-md hover:bg-[#1E1E1C] hover:text-[#F2F1EC] transition-colors"
                >
                  Solicitar visita →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Samples CTA */}
        <div className="bg-[#CEC8BA]/30 border border-[#CEC8BA] rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-[#1E1E1C] mb-3">
            ¿No tienes showroom cerca?
          </h2>
          <p className="text-[#9B9B90] text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Pide muestras de tejido gratis. Las enviamos a cualquier punto de
            la Península en 2-3 días hábiles.
          </p>
          <Link
            href="/muestras"
            className="inline-flex items-center bg-[#1E1E1C] text-[#F2F1EC] px-8 py-3 rounded-md text-sm font-semibold hover:opacity-85 transition-opacity"
          >
            Solicitar muestras →
          </Link>
        </div>
      </div>

      {modalCity && (
        <ShowroomModal city={modalCity} onClose={() => setModalCity(null)} />
      )}
    </div>
  );
}
