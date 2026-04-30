"use client";

import Image from "next/image";
import type { Fabric } from "@/data/products";

type Props = {
  fabric: Fabric;
  selected: boolean;
  onClick: () => void;
};

export default function FabricSwatch({ fabric, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title={`${fabric.family} — ${fabric.name}`}
      className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
        selected
          ? "border-[#1E1E1C] scale-110"
          : "border-transparent hover:border-[#9B9B90]"
      }`}
    >
      <Image
        src={fabric.image}
        alt={fabric.name}
        fill
        className="object-cover"
        sizes="40px"
      />
    </button>
  );
}
