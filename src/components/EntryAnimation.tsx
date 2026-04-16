import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface EntryAnimationProps {
  onComplete: () => void;
}

export const EntryAnimation = ({ onComplete }: EntryAnimationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, var(--color-brand-bg) 0%, rgba(146, 32, 73, 0.2) 100%)",
        backgroundColor: "var(--color-brand-bg)"
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <svg className="w-64 h-64 md:w-96 md:h-96" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-serif text-8xl md:text-9xl font-bold fill-transparent"
          stroke="url(#gradient)"
          strokeWidth="3"
          initial={{ strokeDasharray: "0 1000", opacity: 0 }}
          animate={{ strokeDasharray: "1000 0", opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          E&S
        </motion.text>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="var(--color-brand-hotpink)" offset="0%" />
            <stop stopColor="var(--color-brand-wine)" offset="100%" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};
