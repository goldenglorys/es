import { useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export const MagneticButton = ({ children, variant = 'primary', className = '', ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = "px-10 py-5 tracking-[0.15em] text-sm sm:text-base uppercase transition-colors duration-500 rounded-full relative overflow-hidden flex items-center justify-center w-full sm:w-auto";
  const variants = {
    primary: "bg-[#922049] text-white hover:bg-[#a62b5a] shadow-[0_4px_15px_rgba(146,32,73,0.3)] font-bold",
    outline: "bg-transparent border border-dashed border-[#922049] text-[#922049] hover:bg-[#922049]/10 font-bold"
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 font-bold font-sans">{children}</span>
    </motion.button>
  );
};
