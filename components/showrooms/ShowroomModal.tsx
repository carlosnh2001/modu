"use client";

import { X } from "lucide-react";

export default function ShowroomModal({
  city,
  onClose,
}: {
  city: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-[#F2F1EC] rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9B9B90] hover:text-[#1E1E1C]"
        >
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold text-[#1E1E1C] mb-2">
          Solicitar visita — {city}
        </h3>
        <p className="text-sm text-[#9B9B90] mb-6">
          Escríbenos y concertamos una visita al showroom de {city}.
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
  );
}
