import { type InputHTMLAttributes, forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputHighlightProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputHighlight = forwardRef<HTMLInputElement, InputHighlightProps>(
  ({ label, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="relative w-full mb-8 pt-10">
        <input
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "w-full bg-transparent border-0 border-b border-[var(--color-brand-purple)]/50 px-0 py-2 text-xl outline-none transition-colors",
            "focus:border-transparent text-[var(--color-brand-wine)] font-sans font-light rounded-none",
            className,
          )}
          placeholder=""
          {...props}
        />
        <label
          className={cn(
            "absolute left-0 text-[var(--color-brand-wine)]/50 font-serif text-xl md:text-2xl cursor-text transition-all duration-300 pointer-events-none transform tracking-wide w-full pr-4 text-left leading-tight",
            isFocused || props.value
              ? "-top-5 md:-top-6 scale-[0.80] md:scale-75 origin-top-left text-[var(--color-brand-hotpink)]"
              : "top-10",
          )}
        >
          {label}
        </label>

        {/* Glow effect */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              layoutId={`glow-${props.name || label}`}
              className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-brand-hotpink)] shadow-[0_0_8px_rgba(255,70,137,0.8)]"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  },
);

InputHighlight.displayName = "InputHighlight";
