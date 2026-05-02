"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ZoomIn, X, ArrowLeftRight } from "lucide-react";
import type { Orientation } from "@/hooks/useCart";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { fabricFamilies, allFabrics, sofaModels } from "@/data/products";
import type { Complemento, Fabric, SofaModel } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import FabricSwatch from "./FabricSwatch";

type FamilyKey = "bouce" | "lino" | "algodon";

const FAMILY_KEYS: { key: FamilyKey; label: string }[] = [
  { key: "bouce",   label: "Bouclé" },
  { key: "lino",    label: "Lino" },
  { key: "algodon", label: "Algodón" },
];

export default function ComplementoConfigurator({ comp }: { comp: Complemento }) {
  const [familyKey, setFamilyKey] = useState<FamilyKey>("bouce");
  const [fabric, setFabric] = useState<Fabric>(allFabrics[0]);
  const [selectedModel, setSelectedModel] = useState<SofaModel | null>(null);
  const [added, setAdded] = useState(false);
  const [zoomedFabric, setZoomedFabric] = useState<Fabric | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("izquierda");
  const { addComplemento } = useCart();

  const needsOrientation = comp.id === "chaise-longue";
  const familyFabrics = allFabrics.filter((f) => f.family === fabricFamilies[familyKey].name);

  const handleAdd = () => {
    addComplemento(comp, fabric, needsOrientation ? orientation : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#9B9B90]">
        <Link href="/" className="hover:text-[#1E1E1C] transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/tienda" className="hover:text-[#1E1E1C] transition-colors">Tienda</Link>
        <span>/</span>
        <span className="text-[#1E1E1C]">{comp.name}</span>
      </nav>

      <div>
        <span className="inline-flex text-[10px] font-semibold bg-[#CEC8BA] text-[#1E1E1C] px-2.5 py-1 rounded-full mb-2 tracking-wider uppercase">
          Complemento
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E1C] leading-tight mb-1">{comp.name}</h1>
        <p className="text-[#9B9B90] text-sm">{comp.tagline}</p>
      </div>

      <p className="text-3xl font-semibold text-[#1E1E1C]">{comp.price.toLocaleString("es-ES")} €</p>

      <p className="text-sm text-[#9B9B90] leading-relaxed">{comp.description}</p>

      <hr className="border-[#CEC8BA]" />

      {/* Model selector */}
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-[#9B9B90] uppercase tracking-wider mb-1">
            ¿Qué modelo de Modu tienes?
          </p>
          <p className="text-xs text-[#9B9B90]">
            Selecciona tu modelo para asegurarte la compatibilidad perfecta.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {sofaModels.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(selectedModel?.id === m.id ? null : m)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
                selectedModel?.id === m.id
                  ? "border-[#1E1E1C] bg-[#1E1E1C]/5"
                  : "border-[#CEC8BA] hover:border-[#9B9B90]"
              }`}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#CEC8BA]/20">
                <Image
                  src={m.images.principal}
                  alt={m.name}
                  fill
                  quality={80}
                  className="object-cover"
                  sizes="15vw"
                />
              </div>
              <span className={`text-[10px] font-semibold ${
                selectedModel?.id === m.id ? "text-[#1E1E1C]" : "text-[#9B9B90]"
              }`}>
                {m.name}
              </span>
            </button>
          ))}
        </div>

        {selectedModel && (
          <div className="flex items-center gap-2 p-3 bg-[#7DAF96]/10 border border-[#7DAF96]/30 rounded-lg">
            <Check size={14} className="text-[#7DAF96] shrink-0" />
            <p className="text-xs text-[#1E1E1C]">
              Compatibilidad confirmada con <strong>{selectedModel.name}</strong>. Mismo sistema de unión sin herramientas.
            </p>
          </div>
        )}
      </div>

      <hr className="border-[#CEC8BA]" />

      {/* Fabric */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#9B9B90] uppercase tracking-wider">Tejido y color</p>

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

        <p className="text-xs text-[#9B9B90]">{fabricFamilies[familyKey].description}</p>

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

        {/* Fabric preview */}
        <button
          onClick={() => setZoomedFabric(fabric)}
          className="relative w-full h-24 rounded-xl overflow-hidden border border-[#CEC8BA] group"
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

        <div className="flex flex-wrap gap-2.5">
          {familyFabrics.map((f) => (
            <FabricSwatch key={f.id} fabric={f} selected={fabric.id === f.id} onClick={() => setFabric(f)} />
          ))}
        </div>
      </div>

      {/* Orientation selector — only for Chaise Longue */}
      {needsOrientation && (
        <div className="space-y-2">
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

      {/* CTAs */}
      <div className="space-y-3">
        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-md font-semibold text-sm transition-all ${
            added ? "bg-[#7DAF96] text-white" : "bg-[#1E1E1C] text-[#F2F1EC] hover:opacity-85"
          }`}
        >
          {added ? <><Check size={16} /> Añadido al pedido</> : `Añadir al carrito — ${comp.price.toLocaleString("es-ES")} €`}
        </button>
        <Link
          href="/muestras"
          className="w-full flex items-center justify-center py-3 border border-[#1E1E1C] rounded-md text-sm font-medium text-[#1E1E1C] hover:bg-[#CEC8BA]/30 transition-colors"
        >
          Solicitar muestra de tejido gratis →
        </Link>
      </div>

      {/* Trust */}
      <div className="space-y-2">
        {["Envío gratis a Península", "Entrega en 25-30 días", "15 días de prueba", "Garantía 3 años"].map((t) => (
          <div key={t} className="flex items-center gap-2 text-sm text-[#9B9B90]">
            <Check size={14} className="text-[#7DAF96] shrink-0" />{t}
          </div>
        ))}
      </div>

      {/* Notice */}
      <div className="bg-[#CEC8BA]/30 border border-[#CEC8BA] rounded-lg p-4 text-xs text-[#9B9B90] leading-relaxed">
        <strong className="text-[#1E1E1C]">Fabricado bajo pedido.</strong> 25-30 días desde la confirmación.
      </div>

      <Accordion className="border-t border-[#CEC8BA]">
        <AccordionItem value="compat" className="border-[#CEC8BA]">
          <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 hover:no-underline">Compatibilidad</AccordionTrigger>
          <AccordionContent className="text-sm text-[#9B9B90] leading-relaxed">
            Compatible con todos los modelos y configuraciones Modu. El mismo sistema de unión sin herramientas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="envio" className="border-[#CEC8BA]">
          <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 hover:no-underline">Envío</AccordionTrigger>
          <AccordionContent className="text-sm text-[#9B9B90] leading-relaxed">
            Envío gratuito a toda la Península. 25-30 días. Entrega directa en domicilio.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
    </div>
  );
}
