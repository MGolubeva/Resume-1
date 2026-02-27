'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const experiences = [
  {
    role: 'Lead Business Analyst',
    company: 'TietoEvry Create/Infopulse Ukraine (Big Four Client)',
    period: '2020 – Present',
    overview: 'Over the course of 10+ global product versions, I have evolved from a Middle BA focused on depth and accuracy of requirements to a Lead BA focused on the breadth of a 15-team ecosystem, ensuring that every release meets the high-consequence standards of a Big Four environment.',
    sections: [
      {
        title: 'Operational Leadership & System Scaling',
        points: [
          { name: 'Decision-Driven Leadership', desc: 'Lead complex cross-team refinements and stakeholder calls, ensuring high engagement and driving groups toward final decisions and defined next steps.' },
          { name: 'Production Resilience', desc: 'Led production support activities, identifying root causes for critical incidents and coordinating with development teams for immediate resolution to meet planned media and financial indicators.' },
          { name: 'Structure Scaling', desc: 'Orchestrated the organizational split of a 70+ person POD into three specialized workstreams, designing the communication strategies and responsibility frameworks required for a seamless transition.' },
          { name: 'Methodology Integration', desc: 'Managed production support via Kanban and development cycles via SAFe and Agile/Scrum methodologies, maintaining a high-quality product backlog for 10 major version releases.' },
        ]
      },
      {
        title: 'Strategic Facilitation & Human-Centric Management',
        points: [
          { name: 'Decisive Facilitation', desc: 'Lead high-intensity cross-team refinements and stakeholder calls, acting as the primary synthesizer of information to drive teams toward final decisions and actionable next steps.' },
          { name: 'Complex Demo Delivery', desc: 'Regularly demonstrate core platform functionality to diverse stakeholder groups, translating technical progress into business value and clarity.' },
          { name: 'Mentorship & Onboarding', desc: 'Personally mentored new Business Analysts and conducted Knowledge Transfer (KT) sessions for technical teams, simplifying complex audit procedures into plain-language requirements.' },
          { name: 'High-Fidelity Documentation', desc: 'Authored thousands of user stories and visual artifacts, including Requirements documents, User flows, User Journeys, Empathy Maps, and Roadmaps, to minimize "requirement debt" and edge-case failures.' },
        ]
      }
    ]
  },
  {
    role: 'Project Manager (Data Science Focus)',
    company: 'Active Wizards',
    period: '2015 – 2018',
    overview: 'Served as an early-adopter Project Manager for a startup specializing in Data Science and Machine Learning. Bridged the gap between high-level client vision and technical execution during the formative years of the ML industry.',
    sections: [
      {
        title: 'Technical Translation & Client Advisory',
        points: [
          { name: 'The "Technical Translator"', desc: 'Translated complex Machine Learning and Data Science concepts into simple, actionable language for global clients (US, Europe, China, Australia), enabling them to understand the ROI of their data.' },
          { name: 'Data Strategy Consulting', desc: 'Advised stakeholders on data gathering requirements and model feasibility, educating clients on the critical relationship between data volume/quality and successful ML outcomes.' },
          { name: 'Pre-Project Discovery', desc: 'Analyzed business cases to determine development feasibility, translating abstract needs into structured functional requirements and technical documentation.' },
        ]
      },
      {
        title: 'Project Execution & Team Leadership',
        points: [
          { name: 'Multi-Project Management', desc: 'Simultaneously managed up to 10 projects of varying complexity, sizes, and directions.' },
          { name: 'Cross-Functional Leadership', desc: 'Led small, agile teams of developers and QAs, monitoring performance and creating custom education plans to upskill engineers in data-centric workflows.' },
          { name: 'Risk & Change Management', desc: 'Proactively identified project risks and managed scope changes in a fast-paced startup environment.' },
        ]
      },
      {
        title: 'Content Strategy & Thought Leadership',
        points: [
          { name: 'Authority Building', desc: 'Spearheaded the company’s content strategy by writing technical blog articles on Data Science tools, emerging discoveries, and practical use cases to attract and educate potential clients.' },
          { name: 'Market Positioning', desc: 'Leveraged a background as a BE developer to ensure all marketing and educational content was technically accurate yet accessible to a non-technical audience.' },
        ]
      }
    ]
  },
  {
    role: 'TV Buyer / Analyst',
    company: 'Dentsu Aegis Network',
    period: '2013 - 2015',
    sections: [
      {
        title: 'Core Responsibilities',
        points: [
          { name: 'Analysis', desc: 'Analyzed TV media advertisements and controlled campaigns to achieve financial indicators.' },
          { name: 'Strategy', desc: 'Developed key recommendations for future TV campaigns based on viewership analysis.' },
          { name: 'Collaboration', desc: 'Collaborated with account managers to optimize media placement.' },
        ]
      }
    ]
  }
];

function ExperienceCard({ exp, index }: { exp: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First one expanded by default

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group border border-subtitle/20 rounded-3xl p-8 md:p-12 bg-bg hover:border-deep-accent transition-colors duration-500 relative overflow-hidden cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-deep-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-deep-accent/10 transition-colors duration-500" />
      
      <div className="relative z-10">
        <div className={`flex flex-col md:flex-row md:items-end justify-between ${isExpanded ? 'mb-8 pb-8 border-b border-subtitle/20' : ''} transition-all duration-300`}>
          <div className="pr-8">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-text mb-2">
              {exp.role}
            </h3>
            <p className="font-sans text-xl text-subtitle">
              {exp.company}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <span className="font-mono text-sm text-accent tracking-widest uppercase bg-accent/10 px-4 py-2 rounded-full">
              {exp.period}
            </span>
            <div className="w-8 h-8 rounded-full bg-subtitle/10 flex items-center justify-center text-subtitle hover:text-accent transition-colors">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                {exp.overview && (
                  <p className="font-sans text-lg text-subtitle leading-relaxed mb-8 italic">
                    {exp.overview}
                  </p>
                )}

                <div className="space-y-12">
                  {exp.sections.map((section: any, sIndex: number) => (
                    <div key={sIndex}>
                      <h4 className="font-serif text-2xl font-semibold text-text mb-6 flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-4" />
                        {section.title}
                      </h4>
                      <div className="flex flex-col gap-6">
                        {section.points.map((point: any, pIndex: number) => (
                          <motion.div 
                            key={pIndex} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: pIndex * 0.1 }}
                            className="relative pl-6 border-l border-subtitle/20 hover:border-accent transition-colors duration-300 py-2"
                          >
                            <div className="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-bg border border-accent" />
                            <h5 className="font-sans font-bold text-text mb-1 tracking-wide text-lg">
                              {point.name}
                            </h5>
                            <p className="font-sans text-subtitle leading-relaxed">
                              {point.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="w-full py-32 px-8 md:px-16 lg:px-24 bg-bg relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Roles & Impact
          </h2>
          <div className="w-24 h-1 bg-accent" />
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
