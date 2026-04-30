"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { fabricFamilies, allFabrics } from "@/data/products";
import type { Complemento, Fabric } from "@/data/products";
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
  const [added, setAdded] = useState(false);
  const { addComplemento } = useCart();

  const familyFabrics = allFabrics.filter((f) => f.family === fabricFamilies[familyKey].name);

  const handleAdd = () => {
    addComplemento(comp, fabric);
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
        <p className="text-sm font-medium text-[#1E1E1C]">
          Color: <span className="font-normal text-[#9B9B90]">{fabric.name}</span>
        </p>

        <div className="flex flex-wrap gap-2.5">
          {familyFabrics.map((f) => (
            <FabricSwatch key={f.id} fabric={f} selected={fabric.id === f.id} onClick={() => setFabric(f)} />
          ))}
        </div>
      </div>

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
    </div>
  );
}
