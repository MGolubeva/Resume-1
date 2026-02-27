'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const timelineData = [
  {
    year: '2008–2014',
    theme: 'Logic Foundation',
    story: (
      <>
        Master’s in Probability Theory. Training my mind to find <span className="text-white font-medium">clarity in complex, high-stakes data</span>.
      </>
    ),
  },
  {
    year: '2013–2015',
    theme: 'Data Explorer',
    story: (
      <>
        TV Analyst at Dentsu. Discovering the digital world. I loved the analysis, but realized I wanted to be <span className="text-white font-medium">closer to the people building the technology</span>, not just the marketing around it.
      </>
    ),
  },
  {
    year: '2015–2018',
    theme: 'The Great Pivot',
    story: (
      <>
        PM at Active Wizards. I tried my hand as a developer, but discovered my <span className="text-accent font-medium">&quot;superpower&quot;</span> was being the bridge—<span className="text-white font-medium">explaining the what and why</span> to both clients and engineers.
      </>
    ),
  },
  {
    year: '2018–2021',
    theme: 'The Requirements Architect',
    story: (
      <>
        Senior BA at Infopulse Ukraine. Moving into the Big Four ecosystem. My focus was <span className="text-accent font-medium">&quot;Total Precision&quot;</span>—achieving the deepest possible requirement coverage, mastering the huge new platform and Audit domain.
      </>
    ),
  },
  {
    year: '2021–Present',
    theme: 'The Operational Lead',
    story: (
      <>
        Lead BA at Infopulse/TietoEvry Create. <span className="text-white font-medium">Scaling 70-person structures into 3 teams</span>, mentoring a team of BAs, continuing to work in perfecting our area, documentation and communication.
      </>
    ),
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="w-full py-32 px-8 md:px-16 lg:px-24 bg-bg relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Evolution of a Leader
          </h2>
          <div className="w-24 h-1 bg-accent" />
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-subtitle/20 transform md:-translate-x-1/2" />
          
          {/* Animated Line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-accent transform md:-translate-x-1/2 origin-top"
            style={{ scaleY: pathLength }}
          />

          <div className="space-y-24">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] md:left-1/2 top-0 w-3 h-3 rounded-full bg-bg border-2 border-accent transform md:-translate-x-1/2 mt-2 z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                      className="group p-6 rounded-2xl border border-transparent hover:border-deep-accent transition-colors duration-300"
                    >
                      <span className="font-mono text-sm text-accent tracking-widest uppercase mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-text mb-4">
                        {item.theme}
                      </h3>
                      <p className="font-sans text-subtitle leading-relaxed">
                        {item.story}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
