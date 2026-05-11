"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Check } from "lucide-react";

type FormData = {
  nombre: string;
  email: string;
  telefono?: string;
  calle: string;
  ciudad: string;
  cp: string;
  lino: boolean;
  algodon: boolean;
  bouce: boolean;
  mensaje?: string;
};

export default function MuestrasPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const sanitize = (v: string) => v.replace(/<[^>]*>/g, "").trim();

  const onSubmit = () => {
    setSent(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="modu-container max-w-2xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
          Muestras de tejido
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] mb-4">
          ¿No estás seguro del tejido?
          <br />
          Pídelo y tócalo.
        </h1>
        <p className="text-[#9B9B90] text-sm leading-relaxed mb-12">
          Enviamos muestras de los tres tejidos gratis a cualquier punto de la
          Península. Las recibes en 2-3 días hábiles.
        </p>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-[#7DAF96]/15 flex items-center justify-center">
              <Check size={26} className="text-[#7DAF96]" />
            </div>
            <h2 className="text-xl font-bold text-[#1E1E1C]">
              ¡Solicitud enviada!
            </h2>
            <p className="text-[#9B9B90] text-sm">
              Recibirás tus muestras en 2-3 días hábiles.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                Nombre completo *
              </label>
              <input
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                  setValueAs: sanitize,
                })}
                autoComplete="name"
                className={`w-full border rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors ${
                  errors.nombre ? "border-red-400" : "border-[#CEC8BA] focus:border-[#1E1E1C]"
                }`}
                placeholder="Tu nombre"
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                Email *
              </label>
              <input
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email no válido" },
                  maxLength: { value: 254, message: "Email demasiado largo" },
                })}
                type="email"
                autoComplete="email"
                className={`w-full border rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors ${
                  errors.email ? "border-red-400" : "border-[#CEC8BA] focus:border-[#1E1E1C]"
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                Teléfono
              </label>
              <input
                {...register("telefono", {
                  pattern: { value: /^[+\d\s\-()]{7,20}$/, message: "Teléfono no válido" },
                })}
                type="tel"
                autoComplete="tel"
                className={`w-full border border-[#CEC8BA] rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-[#1E1E1C] transition-colors ${
                  errors.telefono ? "border-red-400" : "border-[#CEC8BA] focus:border-[#1E1E1C]"
                }`}
                placeholder="+34 600 000 000"
              />
              {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                Dirección completa *
              </label>
              <input
                {...register("calle", {
                  required: "La dirección es obligatoria",
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  setValueAs: sanitize,
                })}
                autoComplete="street-address"
                className={`w-full border rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors mb-2 ${
                  errors.calle ? "border-red-400" : "border-[#CEC8BA] focus:border-[#1E1E1C]"
                }`}
                placeholder="Calle, número, piso"
              />
              {errors.calle && <p className="text-red-500 text-xs mt-1 mb-1">{errors.calle.message}</p>}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    {...register("ciudad", {
                      required: "La ciudad es obligatoria",
                      maxLength: { value: 100, message: "Máximo 100 caracteres" },
                      setValueAs: sanitize,
                    })}
                    autoComplete="address-level2"
                    className={`w-full border rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors ${
                      errors.ciudad ? "border-red-400" : "border-[#CEC8BA] focus:border-[#1E1E1C]"
                    }`}
                    placeholder="Ciudad"
                  />
                  {errors.ciudad && <p className="text-red-500 text-xs mt-1">{errors.ciudad.message}</p>}
                </div>
                <div>
                  <input
                    {...register("cp", {
                      required: "El código postal es obligatorio",
                      pattern: { value: /^\d{5}$/, message: "CP de 5 dígitos" },
                    })}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    maxLength={5}
                    className={`w-full border rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors ${
                      errors.cp ? "border-red-400" : "border-[#CEC8BA] focus:border-[#1E1E1C]"
                    }`}
                    placeholder="Código postal"
                  />
                  {errors.cp && <p className="text-red-500 text-xs mt-1">{errors.cp.message}</p>}
                </div>
              </div>
            </div>

            {/* Tejidos */}
            <div>
              <label className="block text-xs font-semibold text-[#1E1E1C] mb-3">
                Tejidos que quieres recibir *
              </label>
              <div className="flex flex-col gap-3">
                {[
                  { field: "bouce" as const, label: "Bouclé" },
                  { field: "lino" as const, label: "Lino" },
                  { field: "algodon" as const, label: "Algodón" },
                ].map((t) => (
                  <label
                    key={t.field}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      {...register(t.field)}
                      className="w-4 h-4 accent-[#1E1E1C]"
                    />
                    <span className="text-sm text-[#1E1E1C]">{t.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-xs font-semibold text-[#1E1E1C] mb-1.5">
                Mensaje (opcional)
              </label>
              <textarea
                {...register("mensaje", {
                  maxLength: { value: 1000, message: "Máximo 1000 caracteres" },
                  setValueAs: sanitize,
                })}
                rows={3}
                className={`w-full border rounded-md px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-[#1E1E1C] transition-colors resize-none ${
                  errors.mensaje ? "border-red-400" : "border-[#CEC8BA]"
                }`}
                placeholder="¿Tienes alguna pregunta?"
              />
              {errors.mensaje && <p className="text-red-500 text-xs mt-1">{errors.mensaje.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E1E1C] text-[#F2F1EC] py-4 rounded-md font-semibold text-sm hover:opacity-85 transition-opacity"
            >
              Solicitar muestras gratis
            </button>

            <p className="text-xs text-[#9B9B90] text-center leading-relaxed">
              Solo enviamos a Península. Muestras gratuitas, sin compromiso de compra.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
