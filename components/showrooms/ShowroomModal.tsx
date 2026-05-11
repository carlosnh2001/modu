"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { showrooms } from "@/data/showrooms";

export default function ShowroomModal({
  city,
  onClose,
}: {
  city: string;
  onClose: () => void;
}) {
  const showroom = showrooms.find((s) => s.city === city);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-[#F2F1EC] rounded-2xl overflow-hidden max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-1.5 transition-colors"
        >
          <X size={18} className="text-[#1E1E1C]" />
        </button>

        {/* City photo */}
        {showroom?.image && (
          <div className="relative w-full aspect-[16/8]">
            <Image
              src={showroom.image}
              alt={`Showroom ${city}`}
              fill
              quality={90}
              className="object-cover"
              sizes="448px"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {/* City name on photo */}
            <div className="absolute bottom-0 left-0 p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#7DAF96]" />
                <span className="text-xs font-semibold text-white/90">
                  {showroom.status === "open" ? "Abierto" : "Próximamente"}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Showroom {city}
              </h3>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {/* Description */}
          {showroom?.description && (
            <p className="text-sm text-[#9B9B90] leading-relaxed mb-5">
              {showroom.description}
            </p>
          )}

          {/* Address if available */}
          {showroom?.address && (
            <p className="text-sm font-medium text-[#1E1E1C] mb-5">
              {showroom.address}
            </p>
          )}

          <div className="border-t border-[#CEC8BA] pt-5">
            <p className="text-xs font-semibold text-[#1E1E1C] mb-4 uppercase tracking-wider">
              Solicitar visita
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              {[
                { label: "Nombre", type: "text", placeholder: "Tu nombre" },
                { label: "Email", type: "email", placeholder: "tu@email.com" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                    {f.label} *
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    className="w-full border border-[#CEC8BA] rounded-md px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1E1E1C] transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                  Mensaje
                </label>
                <textarea
                  rows={3}
                  placeholder="¿Tienes alguna preferencia de horario?"
                  className="w-full border border-[#CEC8BA] rounded-md px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1E1E1C] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E1E1C] text-[#F2F1EC] py-3 rounded-md text-sm font-semibold hover:opacity-85 transition-opacity"
              >
                Solicitar visita
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
