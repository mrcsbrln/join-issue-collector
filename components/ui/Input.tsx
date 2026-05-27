"use client";

import { InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    const generatedId = useId();
    const inputId = props.id ?? generatedId;
    return (
      <div className="flex flex-col gap-1 w-full">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-semibold text-navy">
            {label}
          </label>
        ) : null}
        <div
          className={[
            "flex items-center gap-2 w-full px-4 py-3 bg-white rounded-[10px]",
            "border transition-all duration-100",
            error ? "border-error" : "border-border focus-within:border-blue",
          ].join(" ")}
        >
          <input
            id={inputId}
            ref={ref}
            className={[
              "flex-1 bg-transparent text-navy placeholder:text-muted",
              "outline-none border-none text-base",
              className,
            ].join(" ")}
            {...props}
          />
          {icon ? (
            <span className="text-muted flex-shrink-0">{icon}</span>
          ) : null}
        </div>
        {error ? <p className="text-error text-sm">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
