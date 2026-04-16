import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';

import { RSVPForm } from './components/RSVPForm';
import { BackgroundEffects } from './components/BackgroundEffects';
import { PasscodeInput } from './components/PasscodeInput';

function App() {
  const [isClosed, setIsClosed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check deadline June 15, 2026 (considering end of day)
    const deadline = new Date('2026-06-16T00:00:00Z'); 
    if (new Date() > deadline) {
      setIsClosed(true);
    }
  }, []);

  return (
    <>
      <BackgroundEffects />
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            background: 'var(--color-brand-wine)',
            color: 'white',
            borderColor: 'var(--color-brand-hotpink)'
          }
        }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {isClosed ? (
              <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-wine)] bg-opacity-40">
                <h1 className="font-serif text-4xl md:text-6xl text-white tracking-widest my-10 text-center uppercase">Registration Closed</h1>
              </div>
            ) : !isAuthenticated ? (
              <PasscodeInput onSuccess={() => setIsAuthenticated(true)} />
            ) : (
              <RSVPForm />
            )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
