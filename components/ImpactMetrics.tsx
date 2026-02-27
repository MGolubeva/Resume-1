'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useMotionValue, useSpring, useTransform } from 'motion/react';

const topMetrics = [
  { value: 70, suffix: '+', label: 'Team Leadership & Mentorship' },
  { value: 15, suffix: '+', label: 'Multi-Team Dependency Management' },
  { value: 10, suffix: '+', label: 'Global Product Versions Delivered' },
];

const bottomMetrics = [
  { value: 10, suffix: '+', label: 'Years Professional Journey' },
  { value: 1000, suffix: '+', label: 'Precision User Stories & Artifacts' },
];

function CounterCard({ value, suffix, label, delay, isLarge, colorClass }: { value: number, suffix: string, label: string, delay: number, isLarge: boolean, colorClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [count, setCount] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(val) {
          setCount(Math.floor(val));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center text-center p-8 border border-white/5 bg-[#0d0d0d] rounded-2xl transition-all duration-300 h-full group hover:border-deep-accent/50 hover:shadow-[0_0_30px_rgba(132,0,50,0.15)] ${isLarge ? 'md:p-10' : 'md:p-8'}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col items-center justify-center w-full h-full">
        <div className={`font-serif font-bold mb-4 ${colorClass} ${isLarge ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl'}`}>
          {count.toLocaleString()}{suffix}
        </div>
        <div className={`font-sans text-subtitle uppercase tracking-widest leading-relaxed mt-auto ${isLarge ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactMetrics() {
  return (
    <section className="w-full py-24 px-8 md:px-16 lg:px-24 bg-bg relative border-t border-subtitle/10" style={{ perspective: 1000 }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topMetrics.map((metric, index) => (
              <CounterCard 
                key={index} 
                {...metric} 
                delay={index * 0.1} 
                isLarge={true}
                colorClass="text-accent"
              />
            ))}
          </div>
          
          {/* Bottom Row: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {bottomMetrics.map((metric, index) => (
              <CounterCard 
                key={index} 
                {...metric} 
                delay={(topMetrics.length + index) * 0.1} 
                isLarge={false}
                colorClass="text-[#F3E8EE]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
