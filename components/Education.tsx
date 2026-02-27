'use client';

import { motion } from 'motion/react';
import { BookOpen, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const academic = [
  {
    title: "Master's Degree, Probability Theory",
    institution: "Kyiv Taras Shevchenko National University",
  },
  {
    title: "Bachelor's Degree, Mathematics",
    institution: "Kyiv Taras Shevchenko National University",
  },
];

const certifications = [
  {
    title: "SAFe 6.0 Product Owner Product Manager Certified SAFe 6 POPM",
    institution: "Agile Unify",
  },
  {
    title: "IT Product Management",
    institution: "Robot dreams",
  },
  {
    title: "Become a Product Manager | Learn the Skills & Get the Job",
    institution: "Udemy | Cole Mercer, Evan Kimbrell",
  },
  {
    title: "Introduction to AI Agents",
    institution: "Datacamp",
  },
];

export default function Education() {
  return (
    <section id="education" className="w-full py-24 px-8 md:px-16 lg:px-24 bg-bg border-t border-subtitle/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Education & Certifications</h2>
          <div className="w-16 h-1 bg-deep-accent mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academic Background Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl hover:border-accent transition-colors duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <BookOpen className="w-8 h-8 text-accent" strokeWidth={1.5} />
              <h3 className="font-serif text-3xl text-white">Academic Background</h3>
            </div>
            
            <div className="w-full h-[1px] bg-white/10 mb-10" />
            
            <div className="flex flex-col">
              {academic.map((item, i) => {
                const isLast = i === academic.length - 1;
                return (
                  <div key={i} className={`relative pl-10 ${!isLast ? 'pb-12' : ''}`}>
                    {/* Dot */}
                    <div className="absolute left-[3px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent bg-[#0a0a0a] z-10" />
                    {/* Line */}
                    {!isLast && (
                      <div className="absolute left-[9px] top-3 bottom-0 w-[1px] bg-white/10" />
                    )}
                    <h4 className="font-sans text-xl font-medium text-white mb-2 leading-snug">{item.title}</h4>
                    <p className="font-sans text-subtitle text-base">{item.institution}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl hover:border-accent transition-colors duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-8 h-8 text-accent" strokeWidth={1.5} />
              <h3 className="font-serif text-3xl text-white">Courses & Certifications</h3>
            </div>
            
            <div className="w-full h-[1px] bg-white/10 mb-10" />
            
            <div className="flex flex-col">
              {certifications.map((item, i) => (
                <div key={i} className="relative pl-10 pb-12">
                  {/* Dot */}
                  <div className="absolute left-[3px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent bg-[#0a0a0a] z-10" />
                  {/* Line */}
                  <div className="absolute left-[9px] top-3 bottom-0 w-[1px] bg-white/10" />
                  <h4 className="font-sans text-xl font-medium text-white mb-2 leading-snug">{item.title}</h4>
                  <p className="font-sans text-subtitle text-base">{item.institution}</p>
                </div>
              ))}
              
              <div className="relative pl-10 pt-2">
                <div className="absolute left-[3px] top-[14px] w-3.5 h-3.5 rounded-full border-2 border-deep-accent bg-[#0a0a0a] z-10" />
                <Link href="/certifications" className="inline-flex items-center font-mono text-sm text-accent hover:text-deep-accent tracking-widest uppercase transition-colors group">
                  See more
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
