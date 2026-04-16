import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Support both Input and Textarea props depending on multiline
type InputHighlightProps = (
  | (InputHTMLAttributes<HTMLInputElement> & { multiline?: false })
  | (TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true })
) & {
  label: string;
};

export const InputHighlight = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputHighlightProps>(
  ({ label, className, multiline, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseClasses = cn(
      "w-full bg-transparent border-0 border-b border-[var(--color-brand-purple)]/50 px-0 py-2 text-xl outline-none transition-colors",
      "focus:border-transparent text-[var(--color-brand-wine)] font-sans font-light rounded-none",
      multiline && "resize-none min-h-[4rem] sm:min-h-[3rem]", // accommodate 2 lines easily on small screens
      className,
    );

    const handleFocus = (e: any) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <div className="relative w-full mb-8 pt-10 flex flex-col justify-end">
        {multiline ? (
          <textarea
            ref={ref as any}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={baseClasses}
            placeholder=""
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as any}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={baseClasses}
            placeholder=""
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        <label
          className={cn(
            "absolute left-0 text-[var(--color-brand-wine)]/50 font-serif text-2xl md:text-3xl cursor-text transition-all duration-300 pointer-events-none transform tracking-wide w-full pr-4 text-left leading-tight",
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
