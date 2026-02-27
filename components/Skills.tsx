'use client';

import { motion } from 'motion/react';
import { Users, LayoutTemplate, PenTool, Wrench, ArrowRight } from 'lucide-react';

const skillCategories = [
  {
    title: 'Human Leadership',
    icon: <Users className="w-8 h-8 text-accent" />,
    skills: [
      'Cross-Team Facilitation',
      'Stakeholder Management',
      'Mentorship & Onboarding',
      'Conflict Resolution',
      'Decision Driving',
      'Team Restructuring',
    ],
  },
  {
    title: 'Methodology',
    icon: <LayoutTemplate className="w-8 h-8 text-accent" />,
    skills: [
      'SAFe (Scaled Agile Framework)',
      'Kanban',
      'Agile/Scrum',
      'Product Backlog Management',
      'Production Support',
      'Risk Management',
    ],
  },
  {
    title: 'Technical Visuals & Analysis',
    icon: <PenTool className="w-8 h-8 text-accent" />,
    skills: [
      'User Stories & Acceptance Criteria',
      'User Flows & Journeys',
      'Empathy Maps',
      'Roadmapping',
      'Data Strategy Consulting',
      'Machine Learning Concepts',
    ],
  },
  {
    title: 'Tools',
    icon: <Wrench className="w-8 h-8 text-accent" />,
    skills: [
      'Azure DevOps (ADO), Jira, Asana',
      'Tableau, Power BI, Excel',
      'Gemini, Copilot, Agentic AI, Antigravity',
      'Figma, Mural, Lucidchart, Miro',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full py-32 px-8 md:px-16 lg:px-24 bg-bg relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            The Toolkit
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              className="group bg-subtitle/5 border border-subtitle/20 rounded-3xl p-8 hover:bg-black hover:border-accent transition-all duration-300 relative overflow-hidden"
            >
              {/* Red bottom highlight on hover */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-deep-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />
              
              {/* Right Red Arrow (Visible on hover) */}
              <div className="absolute top-8 right-8 z-10">
                <ArrowRight className="w-6 h-6 text-deep-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
              </div>

              <div className="mb-8 flex items-center justify-center w-16 h-16 rounded-full bg-deep-accent/20 mx-auto relative z-10">
                {category.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-text mb-8 text-center relative z-10">
                {category.title}
              </h3>
              <ul className="space-y-4 relative z-10">
                {category.skills.map((skill, sIndex) => (
                  <li key={sIndex} className="flex items-center text-subtitle font-sans">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-4 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
