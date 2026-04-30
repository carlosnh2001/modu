import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Cómo funciona" };

const STEPS = [
  {
    num: "01",
    title: "Elige tu configuración en la web",
    desc: "Compact, Urban, Family o cualquier combinación. Empieza por el que encaje en tu espacio.",
  },
  {
    num: "02",
    title: "Selecciona tu tejido y color",
    desc: "Bouclé, Lino o Algodón. Múltiples colores en cada familia. Pide muestras gratis si no tienes claro.",
  },
  {
    num: "03",
    title: "Lo fabricamos en España en 20-25 días",
    desc: "Cada sofá se fabrica bajo pedido en Fuensanta de Martos, Villa del Río y Yecla.",
  },
  {
    num: "04",
    title: "Cada módulo llega en su propia caja",
    desc: "Cajas de 1,10 × 1,10 m con el logo Modu. Entrega directa en tu domicilio.",
  },
  {
    num: "05",
    title: "Lo subes por el ascensor o las escaleras",
    desc: "Sin operarios, sin esperar. Las cajas están diseñadas para que puedas subirlas tú solo.",
  },
  {
    num: "06",
    title: "Lo montas sin herramientas en 15 minutos",
    desc: "Los módulos encajan a mano. Instrucciones ilustradas en cada caja.",
  },
];

const MODULES = [
  { name: "Módulo de asiento", desc: "Base del sistema. 90 cm de ancho." },
  { name: "Brazo", desc: "Se acopla a cualquier extremo." },
  { name: "Chaise longue", desc: "Transforma el sofá. 160 cm." },
  { name: "Esquina", desc: "Configura en L sin restricciones." },
];

export default function ComoFuncionaPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="modu-container">
        {/* Hero */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            El proceso
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] mb-4">
            Cómo funciona Modu
          </h1>
          <p className="text-[#9B9B90] text-sm leading-relaxed">
            Desde que eleges hasta que te sientas: transparente, sin
            sorpresas y en tu ritmo.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="flex flex-col gap-3 p-6 border border-[#CEC8BA] rounded-xl"
            >
              <span className="text-4xl font-bold text-[#1E1E1C]/10 leading-none">
                {s.num}
              </span>
              <h2 className="text-base font-semibold text-[#1E1E1C]">
                {s.title}
              </h2>
              <p className="text-sm text-[#9B9B90] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Modular system */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1C] mb-3">
            El sistema modular
          </h2>
          <p className="text-[#9B9B90] text-sm mb-8 max-w-lg">
            Cuatro tipos de módulos que encajan entre sí. Configura, combina y
            reconfigura cuando quieras.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MODULES.map((m) => (
              <div
                key={m.name}
                className="p-5 bg-[#CEC8BA]/20 border border-[#CEC8BA] rounded-xl"
              >
                <div className="w-10 h-10 bg-[#1E1E1C] rounded-lg mb-4" />
                <p className="font-semibold text-[#1E1E1C] text-sm mb-1">
                  {m.name}
                </p>
                <p className="text-xs text-[#9B9B90]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Relocation block */}
        <div className="bg-[#1E1E1C] rounded-2xl p-10 md:p-14 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F2F1EC] mb-4">
            ¿Y si cambio de piso?
          </h2>
          <p className="text-[#9B9B90] text-sm leading-relaxed max-w-lg">
            Desmóntalo en 10 minutos, mételo en las cajas y vuelve a montarlo en
            el nuevo sitio. O añade un módulo si el salón es más grande. El Modu
            se adapta a ti, no al revés.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/tienda"
            className="inline-flex items-center bg-[#1E1E1C] text-[#F2F1EC] px-10 py-4 rounded-md font-semibold hover:opacity-85 transition-opacity"
          >
            Ver configuraciones →
          </Link>
        </div>
      </div>
    </div>
  );
}
