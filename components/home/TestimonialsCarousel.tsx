"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Laura G.",
    city: "Madrid",
    rating: 5,
    text: "Llevaba meses buscando un sofá para mi piso de 60 m² que no pareciera que me lo había llevado un camión. El Urban cabe perfecto y queda como en las fotos. El montaje fue literalmente 12 minutos.",
  },
  {
    name: "Marcos F.",
    city: "Barcelona",
    rating: 5,
    text: "Me mudé tres veces en dos años. Con el Modu lo desmonto en 10 minutos, lo subo en cajas y listo. Imposible con un sofá normal. Ya le he regalado uno a mi hermano.",
  },
  {
    name: "Sofía T.",
    city: "Valencia",
    rating: 5,
    text: "Pedí las muestras primero y me alegro. El bouclé arena es precioso en persona. El sofá llegó en plazo, bien embalado y el servicio de atención fue impecable cuando tuve una duda.",
  },
  {
    name: "Javier R.",
    city: "Sevilla",
    rating: 5,
    text: "Compré el Family hace seis meses y acabo de añadir un módulo suelto. Perfecto, encaja exactamente igual que el día uno. No habría tenido esa flexibilidad con otro sofá.",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="py-20 md:py-28 bg-[#CEC8BA]/25">
      <div className="modu-container">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Clientes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1C]">
            Lo que dicen de Modu
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#F2F1EC] border border-[#CEC8BA] rounded-xl p-8 md:p-10"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#7DAF96] text-[#7DAF96]" />
                ))}
              </div>
              <p className="text-[#1E1E1C] text-lg leading-relaxed mb-6 font-light">
                &ldquo;{TESTIMONIALS[current].text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#CEC8BA] flex items-center justify-center text-sm font-semibold text-[#1E1E1C]">
                  {TESTIMONIALS[current].name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E1E1C]">
                    {TESTIMONIALS[current].name}
                  </p>
                  <p className="text-xs text-[#9B9B90]">{TESTIMONIALS[current].city}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#CEC8BA] flex items-center justify-center text-[#1E1E1C] hover:bg-[#CEC8BA]/40 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-[#1E1E1C]" : "bg-[#CEC8BA]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#CEC8BA] flex items-center justify-center text-[#1E1E1C] hover:bg-[#CEC8BA]/40 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
