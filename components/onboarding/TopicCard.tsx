"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  selected: boolean;
  onSelect: () => void;
}

export default function TopicCard({
  icon,
  title,
  selected,
  onSelect,
}: TopicCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.96 }}
      animate={selected ? { scale: 1.02 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cn(
        "relative flex flex-col justify-between w-full p-5 rounded-[22px] aspect-square text-left",
        "transition-colors duration-200",
        selected
          ? "bg-forest-800 shadow-[0_8px_32px_rgba(22,47,25,0.28)]"
          : "bg-white shadow-[0_1px_8px_rgba(0,0,0,0.05)] border border-[#e2ebe0]"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-11 h-11 flex items-center justify-center rounded-2xl shrink-0",
          selected ? "bg-white/15" : "bg-sage-100"
        )}
      >
        <span
          className={cn(
            "transition-colors",
            selected ? "text-white" : "text-forest-700"
          )}
        >
          {icon}
        </span>
      </div>

      {/* Title */}
      <p
        className={cn(
          "font-bold text-[15px] leading-snug transition-colors",
          selected ? "text-white" : "text-ink-900"
        )}
      >
        {title}
      </p>

      {/* Selected checkmark badge */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/25 flex items-center justify-center"
          >
            <Check size={11} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
