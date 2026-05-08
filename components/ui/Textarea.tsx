"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label ? (
          <label className="text-sm font-semibold text-navy">{label}</label>
        ) : null}
        <div
          className={[
            "w-full px-4 py-3 bg-white rounded-[10px] border transition-all duration-100",
            error ? "border-error" : "border-border focus-within:border-blue",
          ].join(" ")}
        >
          <textarea
            ref={ref}
            className={[
              "w-full bg-transparent text-navy placeholder:text-muted",
              "outline-none border-none text-base resize-none",
              className,
            ].join(" ")}
            rows={4}
            {...props}
          />
        </div>
        {error ? <p className="text-error text-sm">{error}</p> : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
