"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, Minus, AlertCircle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FitResult = "ideal" | "tight" | "no";

type ConfigResult = {
  id: string;
  name: string;
  price: string;
  sofaW: number;
  sofaD: number;
  fit: FitResult;
  note: string;
};

// ─── Fit logic ───────────────────────────────────────────────────────────────

function calcFit(wallW: number, roomD: number, sofaW: number, sofaD: number): FitResult {
  if (wallW < sofaW) return "no";
  if (roomD < sofaD + 30) return "no";
  if (roomD < sofaD + 60) return "tight";
  return "ideal";
}

function getResults(wallW: number, roomD: number): ConfigResult[] {
  return [
    {
      id: "compact",
      name: "Compact",
      price: "725 €",
      sofaW: 220,
      sofaD: 105,
      fit: calcFit(wallW, roomD, 220, 105),
      note:
        calcFit(wallW, roomD, 220, 105) === "ideal"
          ? "Encaja perfectamente, con espacio cómodo para circular."
          : calcFit(wallW, roomD, 220, 105) === "tight"
          ? "Cabe, pero el espacio delante será justo (menos de 60 cm)."
          : wallW < 220
          ? `Tu pared (${wallW} cm) es más estrecha que el Compact (220 cm).`
          : "El salón no tiene suficiente fondo.",
    },
    {
      id: "urban",
      name: "Urban",
      price: "1.150 €",
      sofaW: 310,
      sofaD: 105,
      fit: calcFit(wallW, roomD, 310, 105),
      note:
        calcFit(wallW, roomD, 310, 105) === "ideal"
          ? "Encaja perfectamente, con espacio cómodo para circular."
          : calcFit(wallW, roomD, 310, 105) === "tight"
          ? "Cabe, pero el espacio delante será justo (menos de 60 cm)."
          : wallW < 310
          ? `Tu pared (${wallW} cm) es más estrecha que el Urban (310 cm).`
          : "El salón no tiene suficiente fondo.",
    },
    {
      id: "family-chaise",
      name: "Family · Chaise",
      price: "1.600 €",
      sofaW: 310,
      sofaD: 165,
      fit: calcFit(wallW, roomD, 310, 165),
      note:
        calcFit(wallW, roomD, 310, 165) === "ideal"
          ? "Encaja con espacio cómodo para la chaise longue."
          : calcFit(wallW, roomD, 310, 165) === "tight"
          ? "Cabe, pero el espacio delante de la chaise será justo."
          : wallW < 310
          ? `Tu pared (${wallW} cm) es más estrecha que el Family (310 cm).`
          : "Necesitas al menos 225 cm de fondo total (165 cm sofá + 60 cm paso).",
    },
    {
      id: "family-rincon",
      name: "Family · Rincón",
      price: "1.600 €",
      sofaW: 310,
      sofaD: 310,
      fit: (() => {
        const min = Math.min(wallW, roomD);
        const max = Math.max(wallW, roomD);
        if (max < 310) return "no";
        if (min < 340) return "no";
        if (min < 370) return "tight";
        return "ideal";
      })(),
      note: (() => {
        const min = Math.min(wallW, roomD);
        const max = Math.max(wallW, roomD);
        if (max >= 310 && min >= 370) return "El salón tiene espacio suficiente para el sofá en L.";
        if (max >= 310 && min >= 340) return "Cabe, pero el espacio alrededor del rincón será justo.";
        return "Necesitas un salón de al menos 310 × 370 cm para el módulo rincón.";
      })(),
    },
  ];
}

// ─── Fit UI config ────────────────────────────────────────────────────────────

const FIT_UI: Record<FitResult, { label: string; dotColor: string; cardBg: string; cardBorder: string; textColor: string; icon: React.ReactNode }> = {
  ideal: {
    label: "Encaja",
    dotColor: "bg-[#7DAF96]",
    cardBg: "bg-[#7DAF96]/8",
    cardBorder: "border-[#7DAF96]",
    textColor: "text-[#7DAF96]",
    icon: <Check size={13} />,
  },
  tight: {
    label: "Justo",
    dotColor: "bg-[#C4A882]",
    cardBg: "bg-[#C4A882]/10",
    cardBorder: "border-[#C4A882]",
    textColor: "text-[#C4A882]",
    icon: <AlertCircle size={13} />,
  },
  no: {
    label: "No encaja",
    dotColor: "bg-[#CEC8BA]",
    cardBg: "bg-[#F2F1EC]",
    cardBorder: "border-[#CEC8BA]",
    textColor: "text-[#9B9B90]",
    icon: <Minus size={13} />,
  },
};

// ─── Mini room diagram per config ─────────────────────────────────────────────

function MiniRoom({
  wallW,
  roomD,
  sofaW,
  sofaD,
  fit,
  label,
}: {
  wallW: number;
  roomD: number;
  sofaW: number;
  sofaD: number;
  fit: FitResult;
  label: string;
}) {
  const W = 88;
  const H = 72;
  const PAD = 6;

  const drawW = W - PAD * 2;
  const drawH = H - PAD * 2;

  // Scale to fit the larger dimension
  const maxDim = Math.max(wallW, roomD, 300);
  const scale = Math.min(drawW / maxDim, drawH / maxDim);

  const rW = Math.min(wallW * scale, drawW);
  const rH = Math.min(roomD * scale, drawH);
  const ox = PAD + (drawW - rW) / 2;
  const oy = PAD + (drawH - rH) / 2;

  // Sofa footprint
  const sw = Math.min(sofaW * scale, rW);
  const sd = Math.min(sofaD * scale, rH);

  // Clearance line (60 cm in scale)
  const clearY = oy + sd + 60 * scale;

  const sofaColor =
    fit === "ideal" ? "#7DAF96" : fit === "tight" ? "#C4A882" : "#CEC8BA";
  const sofaOpacity = fit === "no" ? 0.3 : 0.7;

  const borderColor =
    fit === "ideal" ? "#7DAF96" : fit === "tight" ? "#C4A882" : "#CEC8BA";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Room */}
        <rect x={ox} y={oy} width={rW} height={rH} fill="#F8F7F3" stroke={borderColor} strokeWidth="1.2" rx="2" />
        {/* Sofa */}
        {sw > 0 && sd > 0 && (
          <rect
            x={ox + (rW - sw) / 2}
            y={oy}
            width={sw}
            height={sd}
            fill={sofaColor}
            opacity={sofaOpacity}
            rx="1.5"
          />
        )}
        {/* Clearance line */}
        {fit !== "no" && clearY < oy + rH && (
          <line
            x1={ox + 2}
            x2={ox + rW - 2}
            y1={clearY}
            y2={clearY}
            stroke="#7DAF96"
            strokeWidth="0.8"
            strokeDasharray="3 2"
            opacity={0.6}
          />
        )}
      </svg>
      <p className="text-[10px] font-semibold text-[#9B9B90] text-center leading-tight">{label}</p>
    </div>
  );
}

// ─── Room diagrams panel (3 mini rooms) ──────────────────────────────────────

function RoomDiagrams({ wallW, roomD, results }: { wallW: number; roomD: number; results: ConfigResult[] }) {
  // Show compact, urban, family-chaise (3 key ones — rincón is a corner layout, harder to diagram as rect)
  const toShow = results.filter((r) => r.id !== "family-rincon");

  return (
    <div className="bg-white rounded-2xl border border-[#CEC8BA] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9B9B90] mb-4 px-1">
        Vista de planta · escala aproximada
      </p>
      <div className="grid grid-cols-3 gap-3">
        {toShow.map((r) => (
          <MiniRoom
            key={r.id}
            wallW={wallW}
            roomD={roomD}
            sofaW={r.sofaW}
            sofaD={r.sofaD}
            fit={r.fit}
            label={r.name}
          />
        ))}
      </div>
      {/* Dim labels below */}
      <div className="flex items-center justify-between mt-3 px-1">
        <p className="text-[10px] text-[#9B9B90]">
          Sala: <span className="font-medium text-[#1E1E1C]">{wallW} × {roomD} cm</span>
        </p>
        <div className="flex items-center gap-1">
          <div className="w-4 border-t border-dashed border-[#7DAF96]" />
          <p className="text-[10px] text-[#9B9B90]">60 cm paso</p>
        </div>
      </div>
    </div>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────

function DimSlider({
  label,
  sublabel,
  value,
  onChange,
  min = 150,
  max = 600,
}: {
  label: string;
  sublabel: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#1E1E1C] uppercase tracking-wider truncate">{label}</p>
          <p className="text-[10px] text-[#9B9B90] mt-0.5 truncate">{sublabel}</p>
        </div>
        <div className="flex items-baseline gap-1 shrink-0">
          <span className="text-2xl font-bold text-[#1E1E1C] tabular-nums">{value}</span>
          <span className="text-xs text-[#9B9B90]">cm</span>
        </div>
      </div>
      <div className="relative h-1.5 rounded-full bg-[#CEC8BA]/50">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-[#1E1E1C] transition-all duration-75"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1E1E1C] border-2 border-[#F2F1EC] shadow pointer-events-none transition-all duration-75"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#CEC8BA]">
        <span>{min} cm</span>
        <span>{max} cm</span>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CalculadoraPage() {
  const [wallW, setWallW] = useState(350);
  const [roomD, setRoomD] = useState(400);

  const results = useMemo(() => getResults(wallW, roomD), [wallW, roomD]);
  const idealCount = results.filter((r) => r.fit === "ideal").length;
  const tightCount = results.filter((r) => r.fit === "tight").length;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F2F1EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-1">Calculadora</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E1C]">¿Cabe en tu salón?</h1>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 items-start">

          {/* Left: sliders + mini diagrams */}
          <div className="space-y-4">
            {/* Sliders */}
            <div className="bg-white rounded-2xl border border-[#CEC8BA] p-5 space-y-5">
              <DimSlider
                label="Ancho de la pared"
                sublabel="Donde apoyará el respaldo"
                value={wallW}
                onChange={setWallW}
              />
              <div className="h-px bg-[#CEC8BA]/50" />
              <DimSlider
                label="Fondo del salón"
                sublabel="Desde esa pared hasta enfrente"
                value={roomD}
                onChange={setRoomD}
              />
            </div>

            {/* Mini room diagrams */}
            <RoomDiagrams wallW={wallW} roomD={roomD} results={results} />
          </div>

          {/* Right: results */}
          <div className="space-y-3">
            {/* Summary pill */}
            <div className="rounded-xl bg-[#1E1E1C] px-5 py-3.5 flex items-center justify-between gap-4">
              <p className="text-[#F2F1EC] text-sm font-medium">
                {idealCount > 0
                  ? `${idealCount} ${idealCount === 1 ? "formato encaja" : "formatos encajan"} perfectamente`
                  : tightCount > 0
                  ? `${tightCount} ${tightCount === 1 ? "formato cabe" : "formatos caben"} con espacio justo`
                  : "Ningún formato encaja en ese espacio"}
              </p>
              <div className="flex items-center gap-1.5 shrink-0">
                {(["ideal", "tight", "no"] as FitResult[]).map((f) => (
                  <div key={f} className={`w-2.5 h-2.5 rounded-full ${FIT_UI[f].dotColor}`} />
                ))}
              </div>
            </div>

            {/* Config cards */}
            {results.map((r) => {
              const ui = FIT_UI[r.fit];
              return (
                <div
                  key={r.id}
                  className={`rounded-2xl border p-4 transition-all ${ui.cardBg} ${ui.cardBorder} ${r.fit === "no" ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <p className="font-semibold text-[#1E1E1C] text-sm">{r.name}</p>
                      <p className="text-xs text-[#9B9B90]">{r.price}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold shrink-0 ${ui.textColor}`}>
                      {ui.icon}
                      {ui.label}
                    </div>
                  </div>
                  <p className="text-xs text-[#9B9B90] leading-relaxed">{r.note}</p>
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <span className="text-[10px] font-medium bg-[#1E1E1C]/6 text-[#1E1E1C] px-2 py-0.5 rounded-full">
                      {r.sofaW} cm ancho
                    </span>
                    <span className="text-[10px] font-medium bg-[#1E1E1C]/6 text-[#1E1E1C] px-2 py-0.5 rounded-full">
                      {r.sofaD} cm fondo
                    </span>
                    {r.fit !== "no" && (
                      <Link
                        href="/tienda"
                        className="ml-auto text-[10px] font-semibold text-[#1E1E1C] underline underline-offset-2 hover:opacity-60 transition-opacity"
                      >
                        Configurar →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Legend */}
            <div className="flex items-center gap-5 px-1 pt-1">
              {(["ideal", "tight", "no"] as FitResult[]).map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${FIT_UI[f].dotColor}`} />
                  <span className="text-[10px] text-[#9B9B90]">{FIT_UI[f].label}</span>
                </div>
              ))}
            </div>

            {/* Bottom CTAs */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Link
                href="/comparar"
                className="flex-1 text-center py-2.5 rounded-lg border border-[#CEC8BA] text-xs font-semibold text-[#1E1E1C] hover:border-[#1E1E1C] transition-colors"
              >
                Comparar formatos →
              </Link>
              <Link
                href="/showrooms"
                className="flex-1 text-center py-2.5 rounded-lg bg-[#1E1E1C] text-xs font-semibold text-[#F2F1EC] hover:opacity-85 transition-opacity"
              >
                Visitar un showroom →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
