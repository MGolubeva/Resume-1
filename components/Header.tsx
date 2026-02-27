'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is 200vh tall. We show the header after scrolling past 1.5x the window height.
      if (window.scrollY > window.innerHeight * 1.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-white/5"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-row justify-between items-center gap-4">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-1 xl:gap-6 flex-1 overflow-hidden">
              <h1 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text tracking-wide whitespace-nowrap">
                Mariia Golubieva
              </h1>
              <p className="font-sans text-[10px] sm:text-xs md:text-sm text-subtitle font-medium tracking-wider uppercase truncate w-full">
                Product Manager <span className="text-accent mx-1">|</span> Lead Business Analyst <span className="text-accent mx-1">|</span> Product Owner
              </p>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-deep-accent text-text hover:scale-110 hover:bg-deep-accent/90 transition-all duration-300 shadow-lg shadow-deep-accent/20"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
