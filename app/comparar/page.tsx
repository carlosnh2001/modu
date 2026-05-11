import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { CONFIGURATIONS } from "@/data/products";

export const metadata: Metadata = { title: "Compara los formatos · Modu" };

const ROWS: { label: string; keys: (keyof typeof CELL_DATA)[0] }[] = [
  { label: "Precio", keys: "precio" },
  { label: "Composición", keys: "composicion" },
  { label: "Módulos", keys: "modulos" },
  { label: "Ancho", keys: "ancho" },
  { label: "Fondo", keys: "fondo" },
  { label: "Altura", keys: "altura" },
  { label: "Para quién", keys: "paraQuien" },
  { label: "Chaise / rincón", keys: "chaiseRincon" },
  { label: "Regalo incluido", keys: "regalo" },
];

const CELL_DATA = {
  compact: {
    precio: "725 €",
    composicion: "2 asientos + 2 brazos",
    modulos: "4 módulos",
    ancho: "220 cm",
    fondo: "105 cm",
    altura: "90 cm",
    paraQuien: "Pisos pequeños, primeros hogares",
    chaiseRincon: false,
    regalo: false,
  },
  urban: {
    precio: "1.150 €",
    composicion: "3 asientos + 2 brazos",
    modulos: "5 módulos",
    ancho: "310 cm",
    fondo: "105 cm",
    altura: "90 cm",
    paraQuien: "El equilibrio perfecto para el piso de hoy",
    chaiseRincon: false,
    regalo: "2 cojines 45×45",
  },
  family: {
    precio: "1.600 €",
    composicion: "3 asientos + módulo + 2 brazos",
    modulos: "6 módulos",
    ancho: "310 cm",
    fondo: "Variable",
    altura: "90 cm",
    paraQuien: "Espacios amplios, familias, máximo confort",
    chaiseRincon: true,
    regalo: false,
  },
};

type ConfigKey = "compact" | "urban" | "family";
const COLS: { key: ConfigKey; badge?: string }[] = [
  { key: "compact" },
  { key: "urban", badge: "Más vendido" },
  { key: "family" },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check size={16} className="text-[#7DAF96] mx-auto" />;
  if (value === false) return <X size={16} className="text-[#CEC8BA] mx-auto" />;
  return <span>{value}</span>;
}

export default function ComparadorPage() {
  const configs = CONFIGURATIONS;

  return (
    <div className="pt-32 pb-24">
      <div className="modu-container">
        {/* Hero */}
        <div className="max-w-xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Comparador
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] leading-tight mb-4">
            Encuentra tu formato ideal.
          </h1>
          <p className="text-[#9B9B90] text-sm leading-relaxed">
            Tres configuraciones, un mismo sistema. Elige la que mejor encaja en tu espacio y tu vida.
          </p>
        </div>

        {/* Format cards — overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {configs.map((cfg) => (
            <div
              key={cfg.id}
              className={`rounded-2xl border p-6 flex flex-col gap-4 ${
                cfg.badge
                  ? "border-[#1E1E1C] bg-[#1E1E1C] text-[#F2F1EC]"
                  : "border-[#CEC8BA] bg-[#F2F1EC]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${cfg.badge ? "text-[#7DAF96]" : "text-[#9B9B90]"}`}>
                    {cfg.badge ?? "Formato"}
                  </p>
                  <h2 className={`text-2xl font-bold ${cfg.badge ? "text-[#F2F1EC]" : "text-[#1E1E1C]"}`}>
                    {cfg.name}
                  </h2>
                </div>
                <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-[#CEC8BA]/20">
                  <Image src={cfg.image} alt={cfg.name} fill className="object-contain p-1" sizes="80px" />
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${cfg.badge ? "text-[#9B9B90]" : "text-[#9B9B90]"}`}>
                {cfg.tagline}
              </p>
              <div className="mt-auto">
                <p className={`text-3xl font-bold ${cfg.badge ? "text-[#F2F1EC]" : "text-[#1E1E1C]"}`}>
                  {cfg.price.toLocaleString("es-ES")} €
                </p>
                <p className={`text-xs mt-0.5 ${cfg.badge ? "text-[#7DAF96]" : "text-[#9B9B90]"}`}>
                  {cfg.composition}
                </p>
              </div>
              {cfg.gift && (
                <p className="text-xs font-semibold text-[#7DAF96]">🎁 {cfg.gift}</p>
              )}
              <Link
                href={`/tienda`}
                className={`w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85 ${
                  cfg.badge
                    ? "bg-[#7DAF96] text-white"
                    : "bg-[#1E1E1C] text-[#F2F1EC]"
                }`}
              >
                Configurar {cfg.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1E1E1C] mb-8">Comparación detallada</h2>

          {/* Table — desktop */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-[#CEC8BA]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#CEC8BA]">
                  <th className="text-left py-4 px-6 text-[#9B9B90] font-medium w-1/4">Característica</th>
                  {COLS.map(({ key, badge }) => (
                    <th key={key} className="py-4 px-4 text-center font-semibold text-[#1E1E1C]">
                      <div className="flex flex-col items-center gap-1">
                        {badge && (
                          <span className="text-[10px] font-semibold bg-[#7DAF96] text-white px-2 py-0.5 rounded-full">
                            {badge}
                          </span>
                        )}
                        {CONFIGURATIONS.find((c) => c.id === key)?.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-[#CEC8BA] last:border-0 ${i % 2 === 0 ? "bg-[#F2F1EC]" : "bg-[#CEC8BA]/10"}`}
                  >
                    <td className="py-3.5 px-6 text-[#9B9B90] font-medium">{row.label}</td>
                    {COLS.map(({ key }) => (
                      <td key={key} className="py-3.5 px-4 text-center text-[#1E1E1C]">
                        <Cell value={(CELL_DATA[key] as Record<string, string | boolean>)[row.keys]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden flex flex-col gap-4">
            {COLS.map(({ key, badge }) => {
              const cfg = CONFIGURATIONS.find((c) => c.id === key)!;
              const data = CELL_DATA[key];
              return (
                <div key={key} className="border border-[#CEC8BA] rounded-2xl overflow-hidden">
                  <div className="bg-[#1E1E1C] px-5 py-4 flex items-center justify-between">
                    <div>
                      {badge && (
                        <span className="text-[10px] font-semibold bg-[#7DAF96] text-white px-2 py-0.5 rounded-full mr-2">
                          {badge}
                        </span>
                      )}
                      <span className="text-[#F2F1EC] font-semibold">{cfg.name}</span>
                    </div>
                    <span className="text-[#F2F1EC] font-bold">{cfg.price.toLocaleString("es-ES")} €</span>
                  </div>
                  <div className="divide-y divide-[#CEC8BA]">
                    {ROWS.map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-5 py-3">
                        <span className="text-xs text-[#9B9B90] font-medium">{row.label}</span>
                        <span className="text-xs text-[#1E1E1C] font-medium text-right max-w-[55%]">
                          <Cell value={(data as Record<string, string | boolean>)[row.keys]} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Space calculator CTA */}
        <div className="bg-[#CEC8BA]/25 border border-[#CEC8BA] rounded-2xl p-8 md:p-10 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#7DAF96] mb-1">Herramienta</p>
            <h3 className="text-xl font-bold text-[#1E1E1C] mb-2">¿Cabe en tu salón?</h3>
            <p className="text-sm text-[#9B9B90] max-w-md">
              Introduce las medidas de tu habitación y te decimos qué configuraciones se adaptan a tu espacio.
            </p>
          </div>
          <Link
            href="/calculadora"
            className="shrink-0 inline-flex items-center bg-[#1E1E1C] text-[#F2F1EC] px-7 py-3 rounded-md text-sm font-semibold hover:opacity-85 transition-opacity"
          >
            Calcular espacio →
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/tienda"
            className="inline-flex items-center bg-[#1E1E1C] text-[#F2F1EC] px-10 py-4 rounded-md font-semibold hover:opacity-85 transition-opacity"
          >
            Ver todos los modelos →
          </Link>
        </div>
      </div>
    </div>
  );
}
