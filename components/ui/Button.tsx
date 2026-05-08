"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-navy text-white border-0 hover:bg-blue hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:bg-[#091931] active:shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
  secondary:
    "bg-white text-navy border-2 border-navy hover:border-blue hover:text-blue hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:border-[#091931] active:text-[#091931]",
  danger: "bg-error text-white border-0 hover:opacity-90 active:opacity-90",
  ghost: "bg-transparent text-navy border-0 hover:bg-bg-app active:bg-bg-app",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-[15px] text-base",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2 font-semibold rounded-[10px]",
          "transition-all duration-100 cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(" ")}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
