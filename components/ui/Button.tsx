import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-float hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "bg-brand-50 text-brand-600 hover:bg-brand-100 active:bg-brand-200",
  ghost: "text-ink-500 hover:bg-sage-100 active:bg-sage-200",
  danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  outline: "border border-sage-200 text-ink-700 bg-white hover:bg-sage-50 active:bg-sage-100",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 rounded-xl gap-1.5",
  md: "text-sm px-4 py-2.5 rounded-2xl gap-2",
  lg: "text-[15px] px-5 py-3 rounded-2xl gap-2",
  xl: "text-base px-6 py-4 rounded-3xl gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", loading, fullWidth, icon, children, className, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none select-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          icon
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
