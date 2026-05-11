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

function calcFitRincon(wallW: number, roomD: number): FitResult {
  const min = Math.min(wallW, roomD);
  const max = Math.max(wallW, roomD);
  if (max < 310) return "no";
  if (min < 340) return "no";
  if (min < 370) return "tight";
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
      fit: calcFitRincon(wallW, roomD),
      note:
        calcFitRincon(wallW, roomD) === "ideal"
          ? "El salón tiene espacio suficiente para el sofá en L."
          : calcFitRincon(wallW, roomD) === "tight"
          ? "Cabe, pero el espacio alrededor del rincón será justo."
          : "Necesitas un salón de al menos 310 × 370 cm para el módulo rincón.",
    },
  ];
}

// ─── Fit UI ──────────────────────────────────────────────────────────────────

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

// Sofa colors (fill)
const SOFA_COLORS: Record<string, string> = {
  compact:       "#CEC8BA",
  urban:         "#9B9B90",
  "family-chaise": "#7DAF96",
  "family-rincon": "#5A9478",
};

// ─── Room diagram ─────────────────────────────────────────────────────────────

function RoomDiagram({
  wallW,
  roomD,
  results,
}: {
  wallW: number;
  roomD: number;
  results: ConfigResult[];
}) {
  const SVG_W = 300;
  const SVG_H = 230;
  const PAD = 30;

  const drawW = SVG_W - PAD * 2;
  const drawH = SVG_H - PAD * 2;

  // Scale: fit the room into the draw area
  const maxDim = Math.max(wallW, roomD, 350);
  const scaleX = drawW / maxDim;
  const scaleY = drawH / maxDim;
  const scale = Math.min(scaleX, scaleY);

  const rW = wallW * scale;
  const rH = roomD * scale;
  const ox = PAD + (drawW - rW) / 2;
  const oy = PAD + (drawH - rH) / 2;

  const fitMap = Object.fromEntries(results.map((r) => [r.id, r.fit]));

  // Sofa pixel sizes
  const compW = 220 * scale;
  const urbW  = 310 * scale;
  const famD  = 165 * scale;
  const sofaD = 105 * scale;   // depth for compact + urban
  const armW  = 105 * scale;   // rincón arm width

  // Center x for each sofa
  const compX = ox + (rW - compW) / 2;
  const urbX  = ox + (rW - urbW) / 2;

  const opacity = (id: string) =>
    fitMap[id] === "ideal" ? 0.8 : fitMap[id] === "tight" ? 0.5 : 0.15;

  // Clearance line at 105cm from back wall
  const clearY = oy + sofaD + 60 * scale;
  const anyFits = results.some((r) => r.fit !== "no");

  // Whether labels are big enough to show (need at least 14px height)
  const labelMinPx = 14;

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto select-none">
      {/* Room */}
      <rect x={ox} y={oy} width={rW} height={rH} fill="#F8F7F3" stroke="#CEC8BA" strokeWidth="1.5" rx="3" />

      {/* ── Compact (220×105) — centered, label at bottom-left ── */}
      {compW <= rW && sofaD <= rH && (
        <g opacity={opacity("compact")}>
          <rect x={compX} y={oy} width={compW} height={sofaD} fill={SOFA_COLORS.compact} rx="2" />
          {sofaD >= labelMinPx && (
            <text x={compX + 5} y={oy + sofaD - 5} fontSize="8" fontWeight="600" fill="#fff">
              Compact
            </text>
          )}
        </g>
      )}

      {/* ── Urban (310×105) — centered, label at bottom-right ── */}
      {urbW <= rW && sofaD <= rH && (
        <g opacity={opacity("urban")}>
          <rect x={urbX} y={oy} width={urbW} height={sofaD} fill={SOFA_COLORS.urban} rx="2" />
          {sofaD >= labelMinPx && (
            <text x={urbX + urbW - 5} y={oy + sofaD - 5} fontSize="8" fontWeight="600" fill="#fff" textAnchor="end">
              Urban
            </text>
          )}
        </g>
      )}

      {/* ── Family Chaise (310×165) — centered, label in middle ── */}
      {urbW <= rW && famD <= rH && (
        <g opacity={opacity("family-chaise")}>
          <rect x={urbX} y={oy} width={urbW} height={famD} fill={SOFA_COLORS["family-chaise"]} rx="2" />
          {famD >= labelMinPx * 2 && (
            <text x={urbX + urbW / 2} y={oy + famD / 2 + 4} fontSize="8" fontWeight="600" fill="#fff" textAnchor="middle">
              Chaise
            </text>
          )}
        </g>
      )}

      {/* ── Family Rincón (L-shape: 310×105 + arm 105×165) — bottom-right corner ── */}
      {urbW <= rW && famD <= rH && (
        <g opacity={opacity("family-rincon")}>
          {/* Main arm along back wall */}
          <rect x={urbX} y={oy} width={urbW} height={sofaD} fill={SOFA_COLORS["family-rincon"]} rx="2" />
          {/* Side arm going deeper (right end) */}
          <rect x={urbX + urbW - armW} y={oy} width={armW} height={famD} fill={SOFA_COLORS["family-rincon"]} rx="2" />
          {armW >= labelMinPx && famD >= labelMinPx * 2 && (
            <text x={urbX + urbW - armW / 2} y={oy + famD - 5} fontSize="7" fontWeight="600" fill="#fff" textAnchor="middle">
              Rincón
            </text>
          )}
        </g>
      )}

      {/* ── Clearance dashed line ── */}
      {anyFits && clearY < oy + rH && (
        <line
          x1={ox + 3} x2={ox + rW - 3}
          y1={clearY} y2={clearY}
          stroke="#7DAF96" strokeWidth="1" strokeDasharray="4 3" opacity={0.6}
        />
      )}

      {/* ── Dimension: width ── */}
      <line x1={ox} x2={ox + rW} y1={oy + rH + 10} y2={oy + rH + 10} stroke="#9B9B90" strokeWidth="0.8" />
      <line x1={ox} x2={ox} y1={oy + rH + 6} y2={oy + rH + 14} stroke="#9B9B90" strokeWidth="0.8" />
      <line x1={ox + rW} x2={ox + rW} y1={oy + rH + 6} y2={oy + rH + 14} stroke="#9B9B90" strokeWidth="0.8" />
      <text x={ox + rW / 2} y={oy + rH + 22} textAnchor="middle" fontSize="9" fill="#9B9B90">
        {wallW} cm
      </text>

      {/* ── Dimension: depth ── */}
      <line x1={ox - 10} x2={ox - 10} y1={oy} y2={oy + rH} stroke="#9B9B90" strokeWidth="0.8" />
      <line x1={ox - 14} x2={ox - 6} y1={oy} y2={oy} stroke="#9B9B90" strokeWidth="0.8" />
      <line x1={ox - 14} x2={ox - 6} y1={oy + rH} y2={oy + rH} stroke="#9B9B90" strokeWidth="0.8" />
      <text
        x={ox - 18}
        y={oy + rH / 2}
        textAnchor="middle" fontSize="9" fill="#9B9B90"
        transform={`rotate(-90, ${ox - 18}, ${oy + rH / 2})`}
      >
        {roomD} cm
      </text>

      {/* ── Legend ── */}
      {[
        { id: "compact",        label: "Compact" },
        { id: "urban",          label: "Urban" },
        { id: "family-chaise",  label: "Chaise" },
        { id: "family-rincon",  label: "Rincón" },
      ].map((l, i) => (
        <g key={l.id} transform={`translate(${ox + i * 62}, ${SVG_H - 9})`}>
          <rect x={0} y={-7} width={10} height={8} fill={SOFA_COLORS[l.id]} rx="1.5"
            opacity={fitMap[l.id] === "no" ? 0.2 : 0.7} />
          <text x={13} y={0} fontSize="7.5" fill={fitMap[l.id] === "no" ? "#CEC8BA" : "#9B9B90"}>
            {l.label}
          </text>
        </g>
      ))}
    </svg>
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
          <p className="text-xs font-semibold text-[#1E1E1C] uppercase tracking-wider">{label}</p>
          <p className="text-[10px] text-[#9B9B90] mt-0.5">{sublabel}</p>
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
          type="range" min={min} max={max} step={5} value={value}
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
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5 items-start">

          {/* Left: sliders + diagram */}
          <div className="space-y-4">
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

            {/* Diagram */}
            <div className="bg-white rounded-2xl border border-[#CEC8BA] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9B9B90] mb-2 px-1">
                Vista de planta · escala aproximada
              </p>
              <RoomDiagram wallW={wallW} roomD={roomD} results={results} />
              <p className="text-[10px] text-[#9B9B90] mt-1 px-1">
                --- línea verde = 60 cm de paso mínimo
              </p>
            </div>
          </div>

          {/* Right: results */}
          <div className="space-y-3">
            {/* Summary */}
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
                  className={`rounded-2xl border p-4 ${ui.cardBg} ${ui.cardBorder} ${r.fit === "no" ? "opacity-50" : ""}`}
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
            <div className="flex items-center gap-5 px-1">
              {(["ideal", "tight", "no"] as FitResult[]).map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${FIT_UI[f].dotColor}`} />
                  <span className="text-[10px] text-[#9B9B90]">{FIT_UI[f].label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
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
