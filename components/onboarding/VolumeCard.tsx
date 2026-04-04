"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VolumeCardProps {
  icon: React.ReactNode;
  range: string;
  selected: boolean;
  onSelect: () => void;
}

export default function VolumeCard({
  icon,
  range,
  selected,
  onSelect,
}: VolumeCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.95 }}
      animate={selected ? { scale: 1.03 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 w-full aspect-square rounded-[22px] transition-colors duration-200",
        selected
          ? "bg-brand-500 shadow-[0_6px_28px_rgba(42,168,101,0.35)]"
          : "bg-white border border-[#e2ebe0] shadow-[0_1px_8px_rgba(0,0,0,0.05)]"
      )}
    >
      {/* Icon circle */}
      <div
        className={cn(
          "w-12 h-12 flex items-center justify-center rounded-2xl transition-colors duration-200",
          selected ? "bg-white/25" : "bg-sage-100"
        )}
      >
        <span
          className={cn(
            "transition-colors duration-200",
            selected ? "text-white" : "text-forest-700"
          )}
        >
          {icon}
        </span>
      </div>

      {/* Range + label */}
      <div className="flex flex-col items-center gap-0.5">
        <span
          className={cn(
            "font-bold text-[20px] leading-none transition-colors duration-200",
            selected ? "text-white" : "text-ink-900"
          )}
        >
          {range}
        </span>
        <span
          className={cn(
            "text-[9px] font-bold tracking-[0.18em] uppercase transition-colors duration-200",
            selected ? "text-white/75" : "text-ink-300"
          )}
        >
          Pages
        </span>
      </div>

      {/* Check badge */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/30 flex items-center justify-center"
          >
            <Check size={11} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
