"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  /** "vertical" = icon stacked above text (Fiction, Non-fiction)
   *  "horizontal" = icon beside text (Both)               */
  layout?: "vertical" | "horizontal";
}

export default function OptionCard({
  icon,
  title,
  description,
  selected,
  onSelect,
  layout = "vertical",
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "w-full text-left rounded-[20px] bg-white transition-all duration-200 relative overflow-hidden",
        // border
        selected
          ? "border-2 border-brand-500"
          : "border border-[#e2ebe0]",
        // shadow
        selected
          ? "shadow-[0_2px_20px_rgba(42,168,101,0.14)]"
          : "shadow-[0_1px_8px_rgba(0,0,0,0.05)]",
        layout === "vertical" ? "p-5" : "p-4 flex items-center gap-4"
      )}
    >
      {/* ── Icon container ───────────────────────────────────────────── */}
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl shrink-0",
          layout === "vertical"
            ? "w-11 h-11 mb-4"
            : "w-12 h-12",
          selected ? "bg-brand-100" : "bg-[#e8f2e5]"
        )}
      >
        <span
          className={cn(
            "transition-colors",
            selected ? "text-brand-600" : "text-sage-600"
          )}
        >
          {icon}
        </span>
      </div>

      {/* ── Text ─────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-bold leading-tight transition-colors",
            layout === "vertical" ? "text-[17px]" : "text-[16px]",
            selected ? "text-brand-800" : "text-ink-900"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "leading-relaxed mt-1",
            layout === "vertical" ? "text-[13px]" : "text-[12.5px]",
            "text-ink-400"
          )}
        >
          {description}
        </p>
      </div>

      {/* ── Selected checkmark ───────────────────────────────────────── */}
      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center"
        >
          <Check size={11} className="text-white" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}
