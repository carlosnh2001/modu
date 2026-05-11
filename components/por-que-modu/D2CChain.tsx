"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Check, X, ArrowDown } from "lucide-react";

const STEPS = [
  {
    key: "fab",
    label: "Fabricante",
    sublabel: "Producción propia · Trazabilidad total",
    active: true,
    highlight: false,
    delay: 0,
  },
  {
    key: "dis",
    label: "Distribuidor",
    sublabel: null,
    active: false,
    highlight: false,
    delay: 0.4,
  },
  {
    key: "tie",
    label: "Tienda multimarca",
    sublabel: null,
    active: false,
    highlight: false,
    delay: 0.7,
  },
  {
    key: "cli",
    label: "Tú",
    sublabel: "Sin márgenes · Calidad directa",
    active: true,
    highlight: true,
    delay: 1.1,
  },
];

export default function D2CChain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref} className="relative flex flex-col">
      {STEPS.map((step, i) => (
        <div key={step.key} className="relative flex items-stretch gap-4">
          {/* Left axis: dot + line */}
          <div className="flex flex-col items-center w-10 shrink-0">
            {/* Dot */}
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
                step.highlight
                  ? "bg-[#7DAF96]"
                  : step.active
                  ? "bg-[#1E1E1C]"
                  : "bg-[#CEC8BA]/60 border border-[#CEC8BA]"
              }`}
              initial={shouldReduce ? false : { opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: step.delay, duration: 0.55, ease: "easeOut" }}
            >
              {step.active ? (
                <Check size={16} className={step.highlight ? "text-white" : "text-[#7DAF96]"} />
              ) : (
                <X size={14} className="text-[#9B9B90]" />
              )}
            </motion.div>

            {/* Connector line below (except last) */}
            {i < STEPS.length - 1 && (
              <div className="flex-1 w-px bg-[#CEC8BA] my-1 overflow-hidden min-h-[2rem]">
                <motion.div
                  className="w-full h-full bg-[#CEC8BA]"
                  initial={shouldReduce ? false : { scaleY: 0, originY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ delay: step.delay + 0.3, duration: 0.5, ease: "easeOut" }}
                />
              </div>
            )}
          </div>

          {/* Card */}
          <motion.div
            className={`flex-1 mb-3 last:mb-0 rounded-xl px-5 py-4 relative overflow-hidden ${
              step.highlight
                ? "bg-[#7DAF96]"
                : step.active
                ? "bg-[#1E1E1C]"
                : "bg-[#F2F1EC] border border-[#CEC8BA]"
            }`}
            initial={shouldReduce ? false : { opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: step.delay + 0.08, duration: 0.7, ease: "easeOut" }}
          >
            {/* Label row */}
            <div className="flex items-center justify-between gap-3">
              <div className="relative">
                <span
                  className={`text-sm font-semibold ${
                    step.highlight
                      ? "text-white"
                      : step.active
                      ? "text-[#F2F1EC]"
                      : "text-[#9B9B90]"
                  }`}
                >
                  {step.label}
                </span>

                {/* Animated strikethrough for inactive items */}
                {!step.active && (
                  <motion.div
                    className="absolute left-0 top-1/2 h-px bg-[#9B9B90]"
                    style={{ translateY: "-50%" }}
                    initial={{ width: "0%" }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{
                      delay: step.delay + 0.45,
                      duration: 0.55,
                      ease: "easeOut",
                    }}
                  />
                )}
              </div>

              {/* D2C badge on last item */}
              {step.highlight && (
                <motion.span
                  className="text-[10px] font-bold text-white bg-white/20 px-2.5 py-1 rounded-full tracking-wider shrink-0"
                  initial={shouldReduce ? false : { opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: step.delay + 0.5, duration: 0.4 }}
                >
                  D2C
                </motion.span>
              )}

              {/* Origin badge for fabricante */}
              {step.key === "fab" && (
                <motion.span
                  className="text-[10px] font-semibold text-[#7DAF96] bg-[#7DAF96]/10 px-2.5 py-1 rounded-full tracking-wider shrink-0"
                  initial={shouldReduce ? false : { opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Origen
                </motion.span>
              )}
            </div>

            {/* Sublabel */}
            {step.sublabel && (
              <motion.p
                className={`text-xs mt-1 ${
                  step.highlight ? "text-white/80" : "text-[#9B9B90]"
                }`}
                initial={shouldReduce ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: step.delay + 0.45, duration: 0.5 }}
              >
                {step.sublabel}
              </motion.p>
            )}
          </motion.div>
        </div>
      ))}

      {/* Bypass arrow label */}
      <motion.div
        className="absolute -right-2 top-[52px] bottom-[52px] flex flex-col items-center gap-1 pointer-events-none"
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="flex-1 w-px border-l-2 border-dashed border-[#7DAF96]/40" />
        <ArrowDown size={14} className="text-[#7DAF96]/60 shrink-0" />
        <div className="text-[10px] font-bold text-[#7DAF96]/70 tracking-widest uppercase rotate-90 origin-center whitespace-nowrap absolute top-1/2 -translate-y-1/2 -right-8">
          Directo
        </div>
      </motion.div>
    </div>
  );
}
