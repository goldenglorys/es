import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Delete } from "lucide-react";

interface PasscodeInputProps {
  onSuccess: () => void;
}

export const PasscodeInput = ({ onSuccess }: PasscodeInputProps) => {
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);

  // The correct passcode
  const REQUIRED_CODE = import.meta.env.VITE_ACCESS_CODE || "06152";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        handleDelete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code]);

  const handleDigit = (digit: string) => {
    if (code.length < 5 && !isError) {
      const newCode = code + digit;
      setCode(newCode);
      setIsError(false);
      
      if (newCode.length === 5) {
        verifyCode(newCode);
      }
    }
  };

  const handleDelete = () => {
    if (!isError) {
      setCode((prev) => prev.slice(0, -1));
    }
  };

  const verifyCode = (fullCode: string) => {
    if (fullCode === REQUIRED_CODE) {
      onSuccess();
    } else {
      setIsError(true);
      setTimeout(() => {
        setCode("");
        setIsError(false);
      }, 600);
    }
  };

  const shakeAnimation = {
    x: [0, -15, 15, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 },
  };

  const codeDots = Array(5).fill("").map((_, i) => (
    <div
      key={i}
      className={`w-3.5 h-3.5 rounded-full border border-[var(--color-brand-wine)] transition-all duration-200 ${
        i < code.length
          ? "bg-[var(--color-brand-wine)] scale-100"
          : "bg-transparent scale-90"
      }`}
    />
  ));

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center relative z-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center max-w-sm w-full"
      >
        <Lock className="text-[var(--color-brand-wine)] w-6 h-6 mb-4" />
        <h2 className="font-sans text-xl md:text-2xl font-light text-[var(--color-brand-wine)] mb-8 tracking-wide">
          Enter Passcode
        </h2>

        <motion.div 
          className="flex justify-center gap-4 mb-16 h-4"
          animate={isError ? shakeAnimation : {}}
        >
          {codeDots}
        </motion.div>

        <div className="grid grid-cols-3 gap-6 sm:gap-x-10 sm:gap-y-6 place-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num.toString())}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-light text-[var(--color-brand-wine)] bg-[var(--color-brand-wine)]/5 hover:bg-[var(--color-brand-wine)]/15 active:bg-[var(--color-brand-wine)]/30 backdrop-blur-md transition-colors"
            >
              {num}
            </button>
          ))}
          
          <div className="w-16 h-16 sm:w-20 sm:h-20" /> {/* Empty spot bottom left */}
          
          <button
            onClick={() => handleDigit("0")}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-light text-[var(--color-brand-wine)] bg-[var(--color-brand-wine)]/5 hover:bg-[var(--color-brand-wine)]/15 active:bg-[var(--color-brand-wine)]/30 backdrop-blur-md transition-colors"
          >
            0
          </button>
          
          <button
            onClick={handleDelete}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-[var(--color-brand-wine)]/80 hover:text-[var(--color-brand-wine)] active:bg-[var(--color-brand-wine)]/10 transition-colors"
          >
            <Delete strokeWidth={1.5} className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
