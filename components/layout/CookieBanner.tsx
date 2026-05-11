"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "modu_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage not available — don't show banner
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto bg-[#1E1E1C] text-[#F2F1EC] rounded-2xl shadow-2xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-5">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold mb-1">Usamos cookies</p>
          <p className="text-xs text-[#9B9B90] leading-relaxed">
            Utilizamos cookies propias y de terceros para mejorar tu experiencia. Puedes aceptarlas,
            rechazarlas o consultar nuestra{" "}
            <Link
              href="/politica-de-cookies"
              className="text-[#7DAF96] hover:underline"
              onClick={decline}
            >
              Política de Cookies
            </Link>
            .
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-xs text-[#9B9B90] hover:text-[#F2F1EC] transition-colors px-3 py-2"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="text-xs font-semibold bg-[#7DAF96] text-white px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}
