"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, ZoomIn, X, ArrowLeftRight } from "lucide-react";
import type { Orientation } from "@/hooks/useCart";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { fabricFamilies, allFabrics } from "@/data/products";
import type { SofaModel, Configuration, Fabric } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import FabricSwatch from "./FabricSwatch";

type Step = 1 | 2;
type FamilyKey = "bouce" | "lino" | "algodon";

const FAMILY_KEYS: { key: FamilyKey; label: string }[] = [
  { key: "bouce",   label: "Bouclé" },
  { key: "lino",    label: "Lino" },
  { key: "algodon", label: "Algodón" },
];

export default function SofaConfigurator({ model }: { model: SofaModel }) {
  const [step, setStep] = useState<Step>(1);
  const [selectedConfig, setSelectedConfig] = useState<Configuration>(model.configurations[0]);
  const [familyKey, setFamilyKey] = useState<FamilyKey>("bouce");
  const [fabric, setFabric] = useState<Fabric>(allFabrics[0]);
  const [added, setAdded] = useState(false);
  const [zoomedFabric, setZoomedFabric] = useState<Fabric | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("izquierda");
  const { addSofa } = useCart();

  const needsOrientation = selectedConfig.id === "family";

  const familyFabrics = allFabrics.filter((f) => f.family === fabricFamilies[familyKey].name);

  const handleAddToCart = () => {
    addSofa(model, selectedConfig, fabric, needsOrientation ? orientation : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const activeDimensions = selectedConfig.dimensions;

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#9B9B90]">
        <Link href="/" className="hover:text-[#1E1E1C] transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/tienda" className="hover:text-[#1E1E1C] transition-colors">Tienda</Link>
        <span>/</span>
        <span className="text-[#1E1E1C]">{model.name}</span>
      </nav>

      {/* Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E1C] leading-tight mb-1">{model.name}</h1>
        <p className="text-[#9B9B90] text-sm">{model.tagline}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-semibold text-[#1E1E1C]">
          {selectedConfig.price.toLocaleString("es-ES")} €
        </p>
        <p className="text-sm text-[#9B9B90]">{selectedConfig.name}</p>
      </div>

      <hr className="border-[#CEC8BA]" />

      {/* ── STEP INDICATOR ── */}
      <div className="flex items-center gap-3">
        {[
          { n: 1, label: "Configuración" },
          { n: 2, label: "Tejido y color" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            <button
              onClick={() => setStep(s.n as Step)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                step === s.n ? "text-[#1E1E1C]" : "text-[#9B9B90] hover:text-[#1E1E1C]"
              }`}
            >
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border-2 transition-colors ${
                step === s.n
                  ? "bg-[#1E1E1C] text-[#F2F1EC] border-[#1E1E1C]"
                  : step > s.n
                  ? "bg-[#7DAF96] text-white border-[#7DAF96]"
                  : "border-[#CEC8BA] text-[#9B9B90]"
              }`}>
                {step > s.n ? <Check size={12} /> : s.n}
              </span>
              {s.label}
            </button>
            {i === 0 && <ChevronRight size={14} className="text-[#CEC8BA]" />}
          </div>
        ))}
      </div>

      {/* ── STEP 1: FORMAT ── */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-[#9B9B90] uppercase tracking-wider">
            Elige tu configuración
          </p>
          <div className="flex flex-col gap-3">
            {model.configurations.map((cfg) => (
              <button
                key={cfg.id}
                onClick={() => setSelectedConfig(cfg)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  selectedConfig.id === cfg.id
                    ? "border-[#1E1E1C] bg-[#1E1E1C]/3"
                    : "border-[#CEC8BA] hover:border-[#9B9B90]"
                }`}
              >
                {/* Format diagram */}
                <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-[#CEC8BA]/20">
                  <Image src={cfg.image} alt={cfg.name} fill className="object-contain p-1" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-[#1E1E1C]">{cfg.name}</span>
                    {cfg.badge && (
                      <span className="text-[10px] font-semibold bg-[#7DAF96] text-white px-2 py-0.5 rounded-full">
                        {cfg.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#9B9B90]">{cfg.composition}</p>
                  <p className="text-xs text-[#9B9B90] italic mt-0.5">{cfg.tagline}</p>
                  {cfg.gift && (
                    <p className="text-[10px] font-semibold text-[#7DAF96] mt-1">🎁 {cfg.gift}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-[#1E1E1C]">{cfg.price.toLocaleString("es-ES")} €</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full mt-2 bg-[#1E1E1C] text-[#F2F1EC] py-3.5 rounded-md font-semibold text-sm hover:opacity-85 transition-opacity flex items-center justify-center gap-2"
          >
            Elegir tejido y color
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* ── STEP 2: FABRIC ── */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#9B9B90] uppercase tracking-wider">
              Elige tu tejido y color
            </p>
            <button onClick={() => setStep(1)} className="text-xs text-[#9B9B90] hover:text-[#1E1E1C] underline underline-offset-2">
              ← Cambiar configuración
            </button>
          </div>

          {/* Resumen config seleccionada */}
          <div className="flex items-center gap-3 p-3 bg-[#CEC8BA]/20 rounded-lg border border-[#CEC8BA]">
            <div className="relative w-14 h-10 rounded overflow-hidden bg-[#CEC8BA]/30 shrink-0">
              <Image src={selectedConfig.image} alt={selectedConfig.name} fill className="object-contain p-0.5" sizes="56px" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1E1E1C]">{selectedConfig.name} · {selectedConfig.price.toLocaleString("es-ES")} €</p>
              <p className="text-xs text-[#9B9B90]">{selectedConfig.composition}</p>
              {selectedConfig.gift && (
                <p className="text-[10px] font-semibold text-[#7DAF96] mt-0.5">🎁 {selectedConfig.gift}</p>
              )}
            </div>
          </div>

          {/* Family tabs */}
          <div className="flex gap-2">
            {FAMILY_KEYS.map((fam) => (
              <button
                key={fam.key}
                onClick={() => {
                  setFamilyKey(fam.key);
                  const first = allFabrics.find((f) => f.family === fabricFamilies[fam.key].name);
                  if (first) setFabric(first);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  familyKey === fam.key
                    ? "bg-[#1E1E1C] text-[#F2F1EC] border-[#1E1E1C]"
                    : "border-[#CEC8BA] text-[#1E1E1C] hover:border-[#9B9B90]"
                }`}
              >
                {fam.label}
              </button>
            ))}
          </div>

          {/* Description */}
          <p className="text-xs text-[#9B9B90]">{fabricFamilies[familyKey].description}</p>

          {/* Selected color label + zoom preview */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1E1E1C]">
              Color: <span className="font-normal text-[#9B9B90]">{fabric.name}</span>
            </p>
            <button
              onClick={() => setZoomedFabric(fabric)}
              className="flex items-center gap-1 text-xs text-[#9B9B90] hover:text-[#1E1E1C] transition-colors"
            >
              <ZoomIn size={14} />
              Ver detalle
            </button>
          </div>

          {/* Fabric preview thumbnail (clickable to zoom) */}
          <button
            onClick={() => setZoomedFabric(fabric)}
            className="relative w-full h-28 rounded-xl overflow-hidden border border-[#CEC8BA] group"
          >
            <Image
              src={fabric.image}
              alt={fabric.name}
              fill
              quality={95}
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
              <span className="bg-white/90 rounded-full p-2">
                <ZoomIn size={16} className="text-[#1E1E1C]" />
              </span>
            </div>
          </button>

          {/* Swatches */}
          <div className="flex flex-wrap gap-2.5">
            {familyFabrics.map((f) => (
              <FabricSwatch key={f.id} fabric={f} selected={fabric.id === f.id} onClick={() => setFabric(f)} />
            ))}
          </div>

          {/* Orientation selector — only for Family */}
          {needsOrientation && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <ArrowLeftRight size={14} className="text-[#9B9B90]" />
                <p className="text-xs font-semibold text-[#9B9B90] uppercase tracking-wider">Vista de frente</p>
              </div>
              <div className="flex gap-2">
                {(["izquierda", "derecha"] as Orientation[]).map((side) => (
                  <button
                    key={side}
                    onClick={() => setOrientation(side)}
                    className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                      orientation === side
                        ? "border-[#1E1E1C] bg-[#1E1E1C] text-[#F2F1EC]"
                        : "border-[#CEC8BA] text-[#9B9B90] hover:border-[#9B9B90]"
                    }`}
                  >
                    V/F {side.charAt(0).toUpperCase() + side.slice(1)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#9B9B90]">
                Indica si la chaise longue queda a tu izquierda o derecha cuando miras el sofá de frente.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-md font-semibold text-sm transition-all ${
                added ? "bg-[#7DAF96] text-white" : "bg-[#1E1E1C] text-[#F2F1EC] hover:opacity-85"
              }`}
            >
              {added ? (
                <><Check size={16} /> Añadido al pedido</>
              ) : (
                <>Añadir al carrito · {selectedConfig.price.toLocaleString("es-ES")} €</>
              )}
            </button>
            <Link
              href="/muestras"
              className="w-full flex items-center justify-center py-3 border border-[#1E1E1C] rounded-md text-sm font-medium text-[#1E1E1C] hover:bg-[#CEC8BA]/30 transition-colors"
            >
              Solicitar muestra de tejido gratis →
            </Link>
          </div>
        </div>
      )}

      {/* Trust signals */}
      <div className="space-y-2 pt-1">
        {["Envío gratis a Península", "Entrega en 25-30 días", "15 días de prueba", "Garantía 3 años"].map((t) => (
          <div key={t} className="flex items-center gap-2 text-sm text-[#9B9B90]">
            <Check size={14} className="text-[#7DAF96] shrink-0" />{t}
          </div>
        ))}
      </div>

      {/* Important notice */}
      <div className="bg-[#CEC8BA]/30 border border-[#CEC8BA] rounded-lg p-4 text-xs text-[#9B9B90] leading-relaxed">
        <strong className="text-[#1E1E1C]">Fabricado bajo pedido.</strong> El plazo de entrega estimado es de 25-30 días desde la confirmación del pedido.
      </div>

      {/* Fabric zoom lightbox */}
      {zoomedFabric && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setZoomedFabric(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full">
              <Image
                src={zoomedFabric.image}
                alt={zoomedFabric.name}
                fill
                quality={100}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white font-semibold">{zoomedFabric.name}</p>
              <p className="text-white/70 text-sm">{zoomedFabric.family}</p>
            </div>
            <button
              onClick={() => setZoomedFabric(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            >
              <X size={18} className="text-[#1E1E1C]" />
            </button>
          </div>
        </div>
      )}

      {/* Accordions */}
      <Accordion className="border-t border-[#CEC8BA]">
        <AccordionItem value="dimensiones" className="border-[#CEC8BA]">
          <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 hover:no-underline">
            Dimensiones · {selectedConfig.name}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-[#9B9B90]">
            <table className="w-full text-left">
              <tbody className="divide-y divide-[#CEC8BA]">
                {Object.entries({
                  Ancho: activeDimensions.width,
                  Fondo: activeDimensions.depth,
                  Alto: activeDimensions.height,
                  "Altura de asiento": activeDimensions.seatHeight,
                }).map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-2 pr-4 text-[#9B9B90]">{k}</td>
                    <td className="py-2 font-medium text-[#1E1E1C]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {activeDimensions.note && <p className="mt-3 text-xs italic">{activeDimensions.note}</p>}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materiales" className="border-[#CEC8BA]">
          <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 hover:no-underline">Materiales</AccordionTrigger>
          <AccordionContent className="text-sm text-[#9B9B90] leading-relaxed space-y-1">
            <p>Tapizado en Bouclé, Lino o Algodón según elección.</p>
            <p>Estructura de madera de pino macizo.</p>
            <p>Espuma HR40 de alta resiliencia en asientos.</p>
            <p>Sistema de unión sin herramientas.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fundas" className="border-[#CEC8BA]">
          <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 hover:no-underline">Fundas desenfundables y reversibles</AccordionTrigger>
          <AccordionContent className="text-sm text-[#9B9B90] leading-relaxed space-y-2">
            <p>{selectedConfig.covers}</p>
            <p className="flex items-center gap-2">
              <span className="text-[#7DAF96] font-bold">×2</span>
              vida útil del tapizado gracias al sistema reversible.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="envio" className="border-[#CEC8BA]">
          <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 hover:no-underline">Envío</AccordionTrigger>
          <AccordionContent className="text-sm text-[#9B9B90] leading-relaxed space-y-1">
            <p>Envío gratuito a toda la Península.</p>
            <p>25-30 días desde la confirmación del pedido.</p>
            <p>Cada módulo en su caja de 1,10 × 1,10 m. Entrega directa en domicilio.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="garantia" className="border-[#CEC8BA]">
          <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 hover:no-underline">Garantía y devoluciones</AccordionTrigger>
          <AccordionContent className="text-sm text-[#9B9B90] leading-relaxed space-y-1">
            <p>Garantía legal de 3 años.</p>
            <p>15 días de prueba desde la entrega. Devolución gratuita.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="montaje" className="border-[#CEC8BA]">
          <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 hover:no-underline">Montaje</AccordionTrigger>
          <AccordionContent className="text-sm text-[#9B9B90] leading-relaxed">
            Sin herramientas. Máximo 15 minutos. Instrucciones ilustradas en cada caja.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
