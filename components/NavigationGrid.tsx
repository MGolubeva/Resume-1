'use client';

import { motion } from 'motion/react';
import { ArrowRight, Briefcase, Layers, GraduationCap } from 'lucide-react';

const navItems = [
  { id: 'timeline', title: 'The Timeline', desc: 'EVOLUTION OF A LEADER' },
  { id: 'experience', title: 'Experience', desc: 'ROLES & IMPACT' },
  { id: 'skills', title: 'Skills', desc: 'THE TOOLKIT' },
  { id: 'education', title: 'Education', desc: 'ACADEMIC BACKGROUND' },
];

export default function NavigationGrid() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-24 px-8 md:px-16 lg:px-24 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              onClick={() => scrollToSection(item.id)}
              className="group cursor-pointer border border-subtitle/20 p-8 rounded-2xl hover:bg-black hover:border-accent transition-all duration-300 relative overflow-hidden min-h-[16rem] flex flex-col justify-between"
            >
              {/* Red bottom highlight on hover */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-deep-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />
              
              {/* Top Section with Icons */}
              <div className="flex justify-between items-start w-full relative z-10">
                {/* Left Icon */}
                <div className="flex items-center mt-2 text-accent">
                  {item.id === 'timeline' && (
                    <div className="flex items-center">
                      <div className="w-3 h-0.5 bg-accent rounded-full" />
                      <div className="w-3 h-3 rounded-full border-2 border-accent mx-0.5" />
                      <div className="w-3 h-0.5 bg-accent rounded-full" />
                    </div>
                  )}
                  {item.id === 'experience' && <Briefcase className="w-6 h-6" strokeWidth={1.5} />}
                  {item.id === 'skills' && <Layers className="w-6 h-6" strokeWidth={1.5} />}
                  {item.id === 'education' && <GraduationCap className="w-6 h-6" strokeWidth={1.5} />}
                </div>
                
                {/* Right Red Arrow (Visible on hover) */}
                <ArrowRight className="w-6 h-6 text-deep-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
              </div>

              {/* Bottom Section with Text */}
              <div className="relative z-10 mt-auto pt-8">
                <h3 className="font-serif text-3xl font-bold text-text mb-3">{item.title}</h3>
                <p className="font-sans text-sm text-subtitle tracking-wider uppercase">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
