'use client';

import { motion } from 'motion/react';
import { Award, FileText, AlertCircle } from 'lucide-react';

type Course = {
  title: string;
  institution: string;
  file: string;
  isAvailable: boolean;
};

export default function CertificationsGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="group bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-accent transition-all duration-300 relative overflow-hidden flex flex-col h-full"
        >
          <div className="absolute bottom-0 left-0 w-full h-1 bg-deep-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />
          
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-deep-accent/20 flex items-center justify-center text-accent">
              <Award className="w-5 h-5" />
            </div>
            
            {course.isAvailable ? (
              <a 
                href={`/certifications/${course.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtitle hover:text-accent transition-colors"
                title="View Certificate"
              >
                <FileText className="w-5 h-5" />
              </a>
            ) : (
              <div className="relative group/tooltip">
                <div className="text-subtitle/50 cursor-help">
                  <FileText className="w-5 h-5" />
                </div>
                {/* Tooltip */}
                <div className="absolute right-0 top-8 w-48 bg-[#1a1a1a] border border-white/10 text-xs text-text p-2 rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 flex items-start gap-2 shadow-xl">
                  <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Certificate available upon request.</span>
                </div>
              </div>
            )}
          </div>

          <div className="relative z-10 flex-grow flex flex-col">
            <h3 className="font-serif text-xl font-bold text-text mb-3 leading-snug">
              {course.title}
            </h3>
            <p className="font-sans text-sm text-subtitle mt-auto">
              {course.institution}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
