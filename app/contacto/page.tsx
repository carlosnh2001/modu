"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Check } from "lucide-react";

type FormData = {
  nombre: string;
  email: string;
  telefono?: string;
  motivo: string;
  mensaje: string;
};

const MOTIVOS = [
  "Consulta sobre producto",
  "Pedido existente",
  "Showrooms",
  "Prensa",
  "Otro",
];

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { motivo: MOTIVOS[0] } });

  return (
    <div className="pt-32 pb-24">
      <div className="modu-container">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Contacto
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C]">
            Estamos aquí para lo que necesites.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#7DAF96]/15 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-[#7DAF96]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#9B9B90] mb-1 uppercase tracking-wider">
                  Email
                </p>
                <a
                  href="mailto:carlosnh2001@gmail.com"
                  className="text-[#1E1E1C] text-sm font-medium hover:opacity-60 transition-opacity"
                >
                  carlosnh2001@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#7DAF96]/15 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-[#7DAF96]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#9B9B90] mb-1 uppercase tracking-wider">
                  Teléfono
                </p>
                <a
                  href="tel:+34681367902"
                  className="text-[#1E1E1C] text-sm font-medium hover:opacity-60 transition-opacity"
                >
                  +34 681 36 79 02
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#7DAF96]/15 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-[#7DAF96]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#9B9B90] mb-1 uppercase tracking-wider">
                  Showrooms
                </p>
                <div className="space-y-0.5 text-sm text-[#1E1E1C]">
                  {["Madrid", "Barcelona", "Sevilla", "Valencia"].map((c) => (
                    <p key={c}>{c} — dirección próximamente</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#7DAF96]/15 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-[#7DAF96]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#9B9B90] mb-1 uppercase tracking-wider">
                  Horario de atención
                </p>
                <p className="text-sm text-[#1E1E1C]">
                  Lunes a viernes de 9:00 a 18:00
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-[#7DAF96]/15 flex items-center justify-center">
                <Check size={26} className="text-[#7DAF96]" />
              </div>
              <h2 className="text-xl font-bold text-[#1E1E1C]">
                Mensaje enviado
              </h2>
              <p className="text-[#9B9B90] text-sm">
                Te respondemos en menos de 24 horas.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(() => setSent(true))}
              className="space-y-5"
            >
              {[
                { name: "nombre" as const, label: "Nombre *", type: "text", placeholder: "Tu nombre" },
                { name: "email" as const, label: "Email *", type: "email", placeholder: "tu@email.com" },
                { name: "telefono" as const, label: "Teléfono", type: "tel", placeholder: "+34 600 000 000", optional: true },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                    {f.label}
                  </label>
                  <input
                    {...register(f.name, f.optional ? {} : { required: true })}
                    type={f.type}
                    placeholder={f.placeholder}
                    className={`w-full border rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors ${
                      errors[f.name]
                        ? "border-red-400"
                        : "border-[#CEC8BA] focus:border-[#1E1E1C]"
                    }`}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                  Motivo *
                </label>
                <select
                  {...register("motivo", { required: true })}
                  className="w-full border border-[#CEC8BA] rounded-md px-4 py-3 text-sm bg-[#F2F1EC] focus:outline-none focus:border-[#1E1E1C] transition-colors"
                >
                  {MOTIVOS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                  Mensaje *
                </label>
                <textarea
                  {...register("mensaje", { required: true })}
                  rows={5}
                  className={`w-full border rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors resize-none ${
                    errors.mensaje
                      ? "border-red-400"
                      : "border-[#CEC8BA] focus:border-[#1E1E1C]"
                  }`}
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E1E1C] text-[#F2F1EC] py-4 rounded-md font-semibold text-sm hover:opacity-85 transition-opacity"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
