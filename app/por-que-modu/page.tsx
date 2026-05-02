import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fabricFamilies } from "@/data/products";

export const metadata: Metadata = { title: "Por qué Modu" };

export default function PorQueModu() {
  return (
    <div className="pt-32 pb-24">
      <div className="modu-container">
        {/* Hero */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Nuestra filosofía
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] leading-tight">
            Un sofá pensado para la vida real.
          </h1>
        </div>

        {/* El problema */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1C] mb-5">
              El problema con el sofá tradicional
            </h2>
            <p className="text-[#9B9B90] leading-relaxed text-sm mb-4">
              El sofá tradicional ignora cómo vivimos hoy. Espacios más
              pequeños. Mudanzas más frecuentes. Vidas que no paran. Diseñado
              para quedarse, aunque tú tengas que irte.
            </p>
            <p className="text-[#9B9B90] leading-relaxed text-sm">
              Nosotros lo diseñamos sabiendo todo eso. Un sofá que se mueve
              contigo, que crece cuando tú creces y que no se convierte en un
              problema el día que cambias de piso.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Mudanzas/año en España", value: "3M+" },
              { label: "Sofás al vertedero cada año", value: "700K" },
              { label: "Pisos de menos de 70 m²", value: "62%" },
              { label: "Tiempo de montaje Modu", value: "15 min" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 border border-[#CEC8BA] rounded-xl"
              >
                <p className="text-2xl font-bold text-[#1E1E1C] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-[#9B9B90] leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* La solución modular */}
        <div className="bg-[#1E1E1C] rounded-2xl p-10 md:p-16 mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F2F1EC] mb-5">
            La solución modular
          </h2>
          <p className="text-[#9B9B90] leading-relaxed text-sm max-w-2xl mb-8">
            Un sistema de módulos que se conectan sin herramientas. Puedes
            empezar con el Compact y añadir un módulo cuando cambies de piso. O
            transformarlo en chaise longue cuando tengas más espacio. Sin
            tornillos. Sin confusión.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/tienda"
              className="inline-flex items-center bg-[#F2F1EC] text-[#1E1E1C] px-7 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Ver configuraciones →
            </Link>
            <Link
              href="/como-funciona"
              className="inline-flex items-center border border-[#F2F1EC]/20 text-[#F2F1EC] px-7 py-3 rounded-md text-sm font-medium hover:border-[#F2F1EC]/50 transition-colors"
            >
              Cómo funciona →
            </Link>
          </div>
        </div>

        {/* Fabricado en España */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#7DAF96] mb-2">
              Producción
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1C] mb-5">
              Fabricado en España
            </h2>
            <p className="text-[#9B9B90] leading-relaxed text-sm mb-4">
              Trabajamos con fabricantes en Fuensanta de Martos, Villa del Río y
              Yecla, tres de los clústeres más importantes del sector del mueble
              en España.
            </p>
            <p className="text-[#9B9B90] leading-relaxed text-sm">
              Control de calidad en cada módulo. Trazabilidad completa desde la
              materia prima hasta tu salón.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              "Fuensanta de Martos, Jaén",
              "Villa del Río, Córdoba",
              "Yecla, Murcia",
            ].map((loc) => (
              <div
                key={loc}
                className="flex items-center gap-3 p-4 border border-[#CEC8BA] rounded-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#7DAF96] shrink-0" />
                <span className="text-sm font-medium text-[#1E1E1C]">{loc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Los tejidos */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1C] mb-4">
            Los tejidos
          </h2>
          <p className="text-[#9B9B90] text-sm leading-relaxed mb-10 max-w-lg">
            Tres familias de tejido, distintos colores en cada una. Pide
            muestras gratis si no tienes claro cuál elegir.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: "bouce" as const, img: "/images/fabrics/bora/malibu-04.webp" },
              { key: "lino" as const, img: "/images/fabrics/cora/aruba-04.jpeg" },
              { key: "algodon" as const, img: "/images/fabrics/lena/monterrey-01.webp" },
            ].map((t) => (
              <div key={t.key} className="rounded-xl overflow-hidden border border-[#CEC8BA]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={t.img}
                    alt={fabricFamilies[t.key].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#1E1E1C] mb-1">
                    {fabricFamilies[t.key].name}
                  </h3>
                  <p className="text-xs text-[#9B9B90] leading-relaxed">
                    {fabricFamilies[t.key].description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sin intermediarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#7DAF96] mb-2">
              D2C
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1C] mb-5">
              Sin intermediarios
            </h2>
            <p className="text-[#9B9B90] leading-relaxed text-sm mb-4">
              Vendemos directamente. Sin tiendas multimarca, sin márgenes de
              distribuidor. El precio que ves es el precio que pagas.
            </p>
            <p className="text-[#9B9B90] leading-relaxed text-sm">
              Eso nos permite ofrecer más calidad al mismo precio que la
              competencia, o mejor calidad al mismo coste.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "Fabricante", active: true },
              { label: "Distribuidor", active: false },
              { label: "Tienda multimarca", active: false },
              { label: "Cliente", active: true },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`h-10 flex-1 rounded-md flex items-center px-4 text-sm font-medium ${
                    step.active
                      ? "bg-[#1E1E1C] text-[#F2F1EC]"
                      : "bg-[#CEC8BA]/30 text-[#9B9B90] line-through"
                  }`}
                >
                  {step.label}
                </div>
                {step.active && (
                  <span className="text-[#7DAF96] text-xs font-semibold shrink-0">
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sostenibilidad */}
        <div className="bg-[#CEC8BA]/25 border border-[#CEC8BA] rounded-2xl p-10 mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#7DAF96] mb-2">
            Diseñado para durar
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1C] mb-4">
            Sostenibilidad real, no de marketing.
          </h2>
          <p className="text-[#9B9B90] text-sm leading-relaxed max-w-2xl">
            Si se desgasta una funda, la cambias. Si necesitas un módulo más,
            lo añades. No tiras el sofá entero. Un Modu bien cuidado dura una
            vida, y si cambias de vida, te lo llevas contigo.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/tienda"
            className="inline-flex items-center bg-[#1E1E1C] text-[#F2F1EC] px-10 py-4 rounded-md font-semibold hover:opacity-85 transition-opacity"
          >
            Ver todas las configuraciones →
          </Link>
        </div>
      </div>
    </div>
  );
}
