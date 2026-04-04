"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContinueButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function ContinueButton({
  onClick,
  label = "Continue",
  disabled = false,
  loading = false,
}: ContinueButtonProps) {
  return (
    /* Fixed bottom strip — sits above device safe area */
    <div className="fixed bottom-0 inset-x-0 flex justify-center pb-10 pt-4 pointer-events-none z-50">
      {/* Subtle upward fade so content below button stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(245,242,235,0.92) 0%, transparent 100%)",
        }}
      />

      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        whileTap={disabled ? {} : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className={cn(
          "relative pointer-events-auto flex items-center gap-2 px-9 py-[17px] rounded-full",
          "text-[15px] font-semibold text-white",
          "transition-all duration-250 shadow-lg",
          disabled
            ? "bg-sage-300 cursor-not-allowed opacity-70"
            : "bg-forest-900 hover:bg-forest-800 active:bg-forest-950 shadow-[0_4px_24px_rgba(15,35,18,0.30)]"
        )}
      >
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        ) : (
          <>
            {label}
            <ChevronRight size={18} strokeWidth={2.5} />
          </>
        )}
      </motion.button>
    </div>
  );
}
