"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  principal: string;
  secondary: string;
  name: string;
};

export default function ProductGallery({ principal, secondary, name }: Props) {
  const [main, setMain] = useState<"principal" | "secondary">("principal");

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#CEC8BA]/20">
        <Image
          src={main === "principal" ? principal : secondary}
          alt={name}
          fill
          quality={95}
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>

      {/* Thumbnails — only product photos, NO fabric */}
      <div className="flex gap-3">
        {[
          { key: "principal" as const, src: principal },
          { key: "secondary" as const, src: secondary },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setMain(t.key)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
              main === t.key ? "border-[#1E1E1C]" : "border-transparent hover:border-[#9B9B90]"
            }`}
          >
            <Image src={t.src} alt={name} fill quality={90} className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
