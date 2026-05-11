"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { sofaModels, complementos } from "@/data/products";

function ModelCard({ model, index }: { model: typeof sofaModels[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, ease: "easeOut" }}
    >
      <Link href={`/tienda/${model.slug}`} className="group block">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#CEC8BA]/20 mb-4">
          <Image
            src={model.images.principal}
            alt={model.name}
            fill
            quality={90}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay with secondary image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Image
              src={model.images.secondary}
              alt={model.name}
              fill
              quality={90}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[#1E1E1C] text-lg">{model.name}</h3>
            <p className="text-sm text-[#9B9B90] mt-0.5">{model.tagline}</p>
          </div>
          <p className="font-semibold text-[#1E1E1C] whitespace-nowrap text-sm mt-0.5">
            desde {model.priceFrom.toLocaleString("es-ES")} €
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function ComplementoCard({ comp, index }: { comp: typeof complementos[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/tienda/${comp.slug}`} className="group block">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-[#CEC8BA]/20 mb-4">
          <Image
            src={comp.image}
            alt={comp.name}
            fill
            quality={90}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[#1E1E1C]">{comp.name}</h3>
            <p className="text-xs text-[#9B9B90] mt-0.5">{comp.tagline}</p>
          </div>
          <p className="font-semibold text-[#1E1E1C] whitespace-nowrap text-sm">{comp.price.toLocaleString("es-ES")} €</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TiendaPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="modu-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">Colección</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] mb-4">Elige tu Modu</h1>
          <p className="text-[#9B9B90] text-sm leading-relaxed max-w-lg">
            Cinco modelos con el mismo sistema modular. Elige el que encaja con tu espacio y configura el tamaño y tejido a tu medida.
          </p>
        </motion.div>

        {/* Models grid */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-8">Modelos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {sofaModels.map((model, i) => (
              <ModelCard key={model.id} model={model} index={i} />
            ))}
          </div>
        </div>

        {/* Price note */}
        <div className="flex items-start gap-3 my-10 p-5 bg-[#CEC8BA]/20 rounded-xl border border-[#CEC8BA]">
          <span className="text-[#7DAF96] text-lg leading-none">✦</span>
          <p className="text-sm text-[#9B9B90] leading-relaxed">
            Todos los modelos están disponibles en tres configuraciones: <strong className="text-[#1E1E1C]">Compact</strong> (desde 725 €),{" "}
            <strong className="text-[#1E1E1C]">Urban</strong> (desde 1.150 €) y <strong className="text-[#1E1E1C]">Family</strong> (desde 1.600 €).
            Elige el tejido y el color dentro de cada modelo.
          </p>
        </div>

        {/* Tools strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
          <Link
            href="/comparar"
            className="flex items-center justify-between p-5 rounded-xl border border-[#CEC8BA] hover:border-[#1E1E1C] transition-colors group"
          >
            <div>
              <p className="text-xs font-semibold text-[#9B9B90] uppercase tracking-wider mb-0.5">Comparador</p>
              <p className="text-sm font-semibold text-[#1E1E1C]">Compara los tres formatos →</p>
            </div>
            <span className="text-[#CEC8BA] group-hover:text-[#1E1E1C] transition-colors text-xl">⇄</span>
          </Link>
          <Link
            href="/calculadora"
            className="flex items-center justify-between p-5 rounded-xl border border-[#CEC8BA] hover:border-[#1E1E1C] transition-colors group"
          >
            <div>
              <p className="text-xs font-semibold text-[#9B9B90] uppercase tracking-wider mb-0.5">Calculadora</p>
              <p className="text-sm font-semibold text-[#1E1E1C]">¿Cabe en tu salón? →</p>
            </div>
            <span className="text-[#CEC8BA] group-hover:text-[#1E1E1C] transition-colors text-xl">⬚</span>
          </Link>
        </div>

        {/* Complementos */}
        <div className="mt-20 pt-16 border-t border-[#CEC8BA]">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">Complementos</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1C] mb-3">¿Ya tienes un Modu?</h2>
            <p className="text-[#9B9B90] text-sm leading-relaxed max-w-lg">
              Amplíalo o transfórmalo. Todos los complementos son 100% compatibles con cualquier modelo y configuración.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
            {complementos.map((comp, i) => (
              <ComplementoCard key={comp.id} comp={comp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
