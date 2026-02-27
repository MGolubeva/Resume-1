'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, motion, AnimatePresence } from 'motion/react';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { Download, ArrowRight } from 'lucide-react';

const FRAME_COUNT = 148;

// We assume the images are placed in public/frames/frame_000_delay-0.033s.jpg etc.
// If they are not found, we will draw a fallback animation.
const getImageUrl = (index: number) => `/frames/frame_${index.toString().padStart(3, '0')}_delay-0.033s.jpg`;

export default function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { images, isLoaded, loadedCount } = useImagePreloader(FRAME_COUNT, getImageUrl);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const textY = useTransform(smoothProgress, [0, 1], [0, -250]);
  const textOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    if (!canvasRef.current || !isLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const index = Math.round(frameIndex.get());
      const img = images[index];

      if (img && img.complete) {
        // Set canvas resolution to match image
        if (img.naturalWidth !== 0 && img.naturalHeight !== 0) {
          if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image at full resolution
        try {
          ctx.drawImage(img, 0, 0);
        } catch (e) {
          // Ignore if image is not fully decoded yet
        }
      } else {
        // Fallback drawing if image is missing
        if (canvas.width !== 800 || canvas.height !== 600) {
          canvas.width = 800;
          canvas.height = 600;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a placeholder circle that moves
        ctx.fillStyle = '#840032';
        ctx.beginPath();
        const x = (index / FRAME_COUNT) * canvas.width;
        const y = canvas.height / 2 + Math.sin(index * 0.1) * 50;
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#747572';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Frame ${index + 1} / ${FRAME_COUNT}`, canvas.width / 2, canvas.height / 2 + 100);
        ctx.fillText('Please add images to public/frames/', canvas.width / 2, canvas.height / 2 + 130);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [frameIndex, images, isLoaded]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-bg w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg text-text"
            >
              <div className="w-64 h-2 bg-subtitle/30 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-accent transition-all duration-300" 
                  style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
                />
              </div>
              <p className="font-mono text-sm text-subtitle tracking-widest uppercase">
                Loading Experience {Math.round((loadedCount / FRAME_COUNT) * 100)}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover md:object-contain md:object-right"
          />
          {/* Soft Edge Overlays for seamless blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-l from-bg/40 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] z-10" />
        </div>

        {/* Text Content */}
        <div className="absolute inset-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 pointer-events-none mix-blend-difference text-white">
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1.2, delay: isLoaded ? 0.4 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-tight mb-4 whitespace-nowrap">
              Mariia Golubieva
            </h1>
            <h2 className="font-sans text-xl md:text-2xl lg:text-3xl font-light mb-6 whitespace-nowrap text-accent uppercase tracking-wider">
              Product Manager <span className="text-white/50 mx-2">|</span> Lead Business Analyst
            </h2>
            
            <div className="w-16 h-1 bg-deep-accent mb-6" />
            
            <div className="font-sans text-base md:text-lg max-w-lg leading-relaxed tracking-wide whitespace-normal text-white/80">
              <p className="mb-2">Exploring clarity within complexity.</p>
              <p>I combine precision with human-centric leadership to scale platforms and the people who build them.</p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 pointer-events-auto">
              {/* Download Resume Button */}
              <a
                href="/Mariia_Golubieva_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center rounded-full p-[2px] font-sans font-bold shadow-lg overflow-hidden"
              >
                <span className="absolute inset-0 bg-deep-accent transition-colors duration-300 group-hover:bg-deep-accent/20" />
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_180deg,#840032_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex h-full w-full items-center justify-center space-x-3 rounded-full bg-[#050505] px-8 py-3.5 text-white transition-colors duration-300">
                  <span>Download Resume</span>
                  <Download className="w-4 h-4 text-white" />
                </span>
              </a>

              {/* Contact Me Button */}
              <a
                href="#contact"
                className="group relative flex items-center justify-center rounded-full p-[2px] font-sans font-bold shadow-lg overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 transition-colors duration-300 group-hover:bg-accent/20" />
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_180deg,#CCFCCB_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex h-full w-full items-center justify-center space-x-3 rounded-full bg-[#050505] px-8 py-3.5 text-white transition-colors duration-300">
                  <span>Contact Me</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </div>
            
            <div className="mt-12">
              <div className="w-12 h-[1px] bg-white mb-4" />
              <p className="font-mono text-xs uppercase tracking-widest opacity-90">
                Scroll to explore
              </p>
            </div>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
