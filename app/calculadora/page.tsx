"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, AlertCircle, ArrowRight } from "lucide-react";

// ─── Dimensions (cm) ─────────────────────────────────────────────────────────
// Sofá depth (from back wall): 105 cm
// Minimum clearance in front: 60 cm
// So minimum room depth: 105 + 60 = 165 cm

type FitResult = "ideal" | "tight" | "no";

type ConfigResult = {
  name: string;
  id: string;
  price: string;
  sofaWidth: number;
  sofaDepth: number | null; // null = variable
  fit: FitResult;
  note?: string;
};

function getResults(wallWidth: number, roomDepth: number): ConfigResult[] {
  // Helper
  const fits = (sw: number, sd: number): FitResult => {
    const widthOk = wallWidth >= sw;
    const depthOk = roomDepth >= sd + 60; // 60 cm minimum clearance
    const depthTight = roomDepth >= sd + 30; // 30 cm tight but usable
    if (!widthOk) return "no";
    if (!depthTight) return "no";
    if (!depthOk) return "tight";
    return "ideal";
  };

  return [
    {
      name: "Compact",
      id: "compact",
      price: "desde 725 €",
      sofaWidth: 220,
      sofaDepth: 105,
      fit: fits(220, 105),
      note:
        fits(220, 105) === "tight"
          ? "Cabe, pero con muy poco espacio para caminar delante."
          : fits(220, 105) === "ideal"
          ? "Encaja perfectamente. Tienes espacio de sobra para moverte."
          : "La pared es demasiado estrecha o el salón tiene muy poco fondo.",
    },
    {
      name: "Urban",
      id: "urban",
      price: "desde 1.150 €",
      sofaWidth: 310,
      sofaDepth: 105,
      fit: fits(310, 105),
      note:
        fits(310, 105) === "tight"
          ? "Cabe, pero con muy poco espacio para caminar delante."
          : fits(310, 105) === "ideal"
          ? "Encaja perfectamente. Tienes espacio de sobra para moverte."
          : wallWidth < 310
          ? "La pared no tiene suficiente anchura para el Urban (310 cm)."
          : "El salón no tiene suficiente fondo para colocar el Urban cómodamente.",
    },
    {
      name: "Family · Chaise longue",
      id: "family",
      price: "desde 1.600 €",
      sofaWidth: 310,
      sofaDepth: 165,
      fit: fits(310, 165),
      note:
        fits(310, 165) === "tight"
          ? "Cabe, pero el espacio delante de la chaise será reducido."
          : fits(310, 165) === "ideal"
          ? "Encaja perfectamente. Espacio ideal para la chaise longue."
          : wallWidth < 310
          ? "La pared no tiene suficiente anchura para el Family (310 cm)."
          : "El fondo del salón no es suficiente para la chaise longue (necesitas al menos 225 cm de fondo total).",
    },
    {
      name: "Family · Módulo rincón",
      id: "family-rincon",
      price: "desde 1.600 €",
      sofaWidth: 310,
      sofaDepth: 310,
      fit: ((): FitResult => {
        // Rincón needs roughly a square area of 310×310
        const minSide = Math.min(wallWidth, roomDepth);
        const maxSide = Math.max(wallWidth, roomDepth);
        if (maxSide >= 310 && minSide >= 370) return "ideal"; // 310 + 60 clearance
        if (maxSide >= 310 && minSide >= 340) return "tight";
        return "no";
      })(),
      note: (() => {
        const minSide = Math.min(wallWidth, roomDepth);
        const maxSide = Math.max(wallWidth, roomDepth);
        if (maxSide >= 310 && minSide >= 370) return "El espacio en L encaja bien. Gran salón.";
        if (maxSide >= 310 && minSide >= 340) return "Cabe, pero el espacio alrededor será justo.";
        return "El módulo rincón necesita un salón grande (al menos 310 × 370 cm). Considera el Compact o el Urban.";
      })(),
    },
  ];
}

const FIT_LABELS: Record<FitResult, { label: string; color: string; icon: React.ReactNode }> = {
  ideal: {
    label: "Encaja perfectamente",
    color: "text-[#7DAF96]",
    icon: <Check size={16} />,
  },
  tight: {
    label: "Cabe justo",
    color: "text-[#C4A882]",
    icon: <AlertCircle size={16} />,
  },
  no: {
    label: "No encaja",
    color: "text-[#9B9B90]",
    icon: <X size={16} />,
  },
};

// ─── Room diagram SVG ─────────────────────────────────────────────────────────

function RoomDiagram({
  wallWidth,
  roomDepth,
}: {
  wallWidth: number;
  roomDepth: number;
}) {
  const W = 280;
  const H = 180;

  // Scale factors
  const scaleX = W / Math.max(wallWidth, 400);
  const scaleY = H / Math.max(roomDepth, 400);
  const scale = Math.min(scaleX, scaleY, 1);

  const rW = Math.min(wallWidth * scale, W);
  const rH = Math.min(roomDepth * scale, H);
  const ox = (W - rW) / 2;
  const oy = (H - rH) / 2;

  // Sofas to draw
  const sofas = [
    { w: 220, d: 105, color: "#CEC8BA", label: "Compact" },
    { w: 310, d: 105, color: "#7DAF96", label: "Urban" },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: 200 }}>
      {/* Room background */}
      <rect x={ox} y={oy} width={rW} height={rH} fill="#F2F1EC" stroke="#CEC8BA" strokeWidth="1.5" rx="2" />
      {/* Wall label */}
      <text x={ox + rW / 2} y={oy - 6} textAnchor="middle" fontSize="9" fill="#9B9B90">
        {wallWidth} cm
      </text>
      <text
        x={ox - 6}
        y={oy + rH / 2}
        textAnchor="middle"
        fontSize="9"
        fill="#9B9B90"
        transform={`rotate(-90, ${ox - 6}, ${oy + rH / 2})`}
      >
        {roomDepth} cm
      </text>

      {/* Compact sofa */}
      {wallWidth >= 220 && roomDepth >= 135 && (
        <rect
          x={ox + 4}
          y={oy + 4}
          width={Math.min(220 * scale, rW - 8)}
          height={Math.min(105 * scale, rH / 2)}
          fill="#CEC8BA"
          rx="3"
          opacity={0.8}
        />
      )}

      {/* Urban sofa (only if room is wide enough) */}
      {wallWidth >= 310 && roomDepth >= 135 && (
        <rect
          x={ox + 4}
          y={oy + 4}
          width={Math.min(310 * scale, rW - 8)}
          height={Math.min(105 * scale, rH / 2)}
          fill="#7DAF96"
          rx="3"
          opacity={0.7}
        />
      )}
    </svg>
  );
}

export default function CalculadoraPage() {
  const [wallWidth, setWallWidth] = useState<string>("");
  const [roomDepth, setRoomDepth] = useState<string>("");
  const [calculated, setCalculated] = useState(false);

  const wNum = parseInt(wallWidth, 10) || 0;
  const dNum = parseInt(roomDepth, 10) || 0;
  const results = calculated && wNum > 0 && dNum > 0 ? getResults(wNum, dNum) : null;

  const idealCount = results?.filter((r) => r.fit === "ideal").length ?? 0;
  const tightCount = results?.filter((r) => r.fit === "tight").length ?? 0;

  return (
    <div className="pt-32 pb-24">
      <div className="modu-container">
        {/* Hero */}
        <div className="max-w-xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
            Calculadora
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] leading-tight mb-4">
            ¿Cabe en tu salón?
          </h1>
          <p className="text-[#9B9B90] text-sm leading-relaxed">
            Introduce las medidas de la pared donde irá el sofá y el fondo disponible de la habitación. Te decimos qué configuraciones encajan cómodamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Input panel */}
          <div>
            <div className="bg-[#F2F1EC] border border-[#CEC8BA] rounded-2xl p-8">
              <h2 className="text-lg font-bold text-[#1E1E1C] mb-6">Medidas del salón</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#9B9B90] uppercase tracking-wider mb-2">
                    Ancho de la pared donde irá el sofá (cm)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={1000}
                    value={wallWidth}
                    onChange={(e) => { setWallWidth(e.target.value); setCalculated(false); }}
                    placeholder="Ej: 350"
                    className="w-full px-4 py-3 rounded-xl border border-[#CEC8BA] bg-white text-[#1E1E1C] text-sm focus:outline-none focus:border-[#1E1E1C] transition-colors placeholder:text-[#CEC8BA]"
                  />
                  <p className="text-xs text-[#9B9B90] mt-1.5">
                    Mide la longitud de la pared donde apoyará el respaldo del sofá.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#9B9B90] uppercase tracking-wider mb-2">
                    Profundidad disponible del salón (cm)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={1000}
                    value={roomDepth}
                    onChange={(e) => { setRoomDepth(e.target.value); setCalculated(false); }}
                    placeholder="Ej: 400"
                    className="w-full px-4 py-3 rounded-xl border border-[#CEC8BA] bg-white text-[#1E1E1C] text-sm focus:outline-none focus:border-[#1E1E1C] transition-colors placeholder:text-[#CEC8BA]"
                  />
                  <p className="text-xs text-[#9B9B90] mt-1.5">
                    Mide desde esa pared hasta el lado opuesto de la habitación.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCalculated(true)}
                disabled={!wallWidth || !roomDepth || wNum <= 0 || dNum <= 0}
                className="w-full mt-8 bg-[#1E1E1C] text-[#F2F1EC] py-3.5 rounded-xl font-semibold text-sm hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Ver qué configuraciones caben
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Info box */}
            <div className="mt-4 p-4 rounded-xl bg-[#CEC8BA]/20 border border-[#CEC8BA]">
              <p className="text-xs text-[#9B9B90] leading-relaxed">
                <strong className="text-[#1E1E1C]">Nota:</strong> El cálculo reserva 60 cm mínimos delante del sofá para poder moverse cómodamente. El resultado "Cabe justo" indica solo 30-60 cm de espacio libre delante.
              </p>
            </div>
          </div>

          {/* Results panel */}
          <div>
            {!calculated && (
              <div className="rounded-2xl border border-dashed border-[#CEC8BA] p-10 flex flex-col items-center justify-center text-center gap-3 min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-[#CEC8BA]/30 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9B9B90" strokeWidth="1.5" className="w-6 h-6">
                    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm text-[#9B9B90]">Introduce las medidas para ver los resultados.</p>
              </div>
            )}

            {calculated && results && (
              <div className="space-y-4">
                {/* Summary */}
                <div className="rounded-xl bg-[#1E1E1C] px-6 py-4">
                  <p className="text-[#F2F1EC] font-semibold text-sm">
                    {idealCount > 0
                      ? `${idealCount} ${idealCount === 1 ? "configuración encaja" : "configuraciones encajan"} perfectamente.`
                      : tightCount > 0
                      ? `${tightCount} ${tightCount === 1 ? "configuración cabe" : "configuraciones caben"} con espacio justo.`
                      : "Ninguna configuración encaja en ese espacio."}
                  </p>
                  <p className="text-[#9B9B90] text-xs mt-1">
                    Pared {wNum} cm · Fondo {dNum} cm
                  </p>
                </div>

                {/* Config results */}
                {results.map((r) => {
                  const fit = FIT_LABELS[r.fit];
                  return (
                    <div
                      key={r.id}
                      className={`rounded-2xl border p-5 transition-all ${
                        r.fit === "ideal"
                          ? "border-[#7DAF96] bg-[#7DAF96]/5"
                          : r.fit === "tight"
                          ? "border-[#CEC8BA] bg-[#CEC8BA]/10"
                          : "border-[#CEC8BA] bg-[#F2F1EC] opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold text-[#1E1E1C] text-sm">{r.name}</h3>
                          <p className="text-xs text-[#9B9B90]">{r.price}</p>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium shrink-0 ${fit.color}`}>
                          {fit.icon}
                          {fit.label}
                        </div>
                      </div>
                      {r.note && (
                        <p className="text-xs text-[#9B9B90] leading-relaxed">{r.note}</p>
                      )}
                      {r.fit !== "no" && !r.id.includes("rincon") && (
                        <Link
                          href="/tienda"
                          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#1E1E1C] underline underline-offset-2 hover:opacity-60 transition-opacity"
                        >
                          Configurar {r.name.split(" ·")[0]} →
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* CTA */}
                <div className="pt-2">
                  <Link
                    href="/comparar"
                    className="text-xs text-[#9B9B90] underline underline-offset-2 hover:text-[#1E1E1C] transition-colors"
                  >
                    Ver comparación completa de formatos →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[#9B9B90] mb-4">¿Tienes dudas sobre qué cabe en tu espacio?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/showrooms"
              className="inline-flex items-center justify-center bg-[#1E1E1C] text-[#F2F1EC] px-8 py-3.5 rounded-md font-semibold text-sm hover:opacity-85 transition-opacity"
            >
              Visitar un showroom →
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center border border-[#1E1E1C] text-[#1E1E1C] px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-[#CEC8BA]/20 transition-colors"
            >
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
