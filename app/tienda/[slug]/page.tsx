"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { sofaModels, complementos } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import SofaConfigurator from "@/components/product/SofaConfigurator";
import ComplementoConfigurator from "@/components/product/ComplementoConfigurator";
import Link from "next/link";
import Image from "next/image";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const model = sofaModels.find((m) => m.slug === slug);
  const comp  = complementos.find((c) => c.slug === slug);

  if (!model && !comp) notFound();

  // ── SOFA MODEL PAGE ──
  if (model) {
    const relatedModels = sofaModels.filter((m) => m.id !== model.id).slice(0, 3);

    return (
      <div className="pt-32 pb-24">
        <div className="modu-container">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-12 lg:gap-16 mb-20">
            <ProductGallery
              principal={model.images.principal}
              secondary={model.images.secondary}
              name={model.name}
            />
            <SofaConfigurator model={model} />
          </div>

          {/* Description */}
          <div className="border-t border-[#CEC8BA] pt-12 mb-16">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-3">Sobre el {model.name}</p>
              <p className="text-[#9B9B90] leading-relaxed">{model.description}</p>
              <p className="text-sm text-[#9B9B90] mt-2 italic">Escenario ideal: {model.scenario}</p>
            </div>
          </div>

          {/* Related models */}
          <div className="border-t border-[#CEC8BA] pt-12">
            <h2 className="text-xl font-bold text-[#1E1E1C] mb-8">Otros modelos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedModels.map((m) => (
                <Link key={m.id} href={`/tienda/${m.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#CEC8BA]/20 mb-3">
                    <Image
                      src={m.images.principal}
                      alt={m.name}
                      fill
                      quality={90}
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="33vw"
                    />
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold text-[#1E1E1C]">{m.name}</p>
                      <p className="text-xs text-[#9B9B90] mt-0.5">{m.tagline}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#1E1E1C] whitespace-nowrap">desde {m.priceFrom.toLocaleString("es-ES")} €</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── COMPLEMENTO PAGE ──
  return (
    <div className="pt-32 pb-24">
      <div className="modu-container">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-12 lg:gap-16 mb-20">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#CEC8BA]/20">
              <Image src={comp!.image} alt={comp!.name} fill quality={95} className="object-cover" priority sizes="55vw" />
            </div>
          </div>
          <ComplementoConfigurator comp={comp!} />
        </div>

        {/* Upsell to models */}
        <div className="border-t border-[#CEC8BA] pt-12">
          <h2 className="text-xl font-bold text-[#1E1E1C] mb-8">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {sofaModels.slice(0, 3).map((m) => (
              <Link key={m.id} href={`/tienda/${m.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#CEC8BA]/20 mb-3">
                  <Image
                    src={m.images.principal}
                    alt={m.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="33vw"
                  />
                </div>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-semibold text-[#1E1E1C]">{m.name}</p>
                    <p className="text-xs text-[#9B9B90] mt-0.5">{m.tagline}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#1E1E1C] whitespace-nowrap">desde {m.priceFrom.toLocaleString("es-ES")} €</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
