"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GenrePillProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function GenrePill({ label, selected, onSelect }: GenrePillProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className={cn(
        "px-4 py-[9px] rounded-full text-[13px] font-medium transition-colors duration-200",
        selected
          ? "bg-forest-800 text-white shadow-sm"
          : "bg-white text-ink-700 border border-sage-200 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
      )}
    >
      {label}
    </motion.button>
  );
}
