import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import CertificationsGrid from './CertificationsGrid';

const allCourses = [
  { title: "SAFe 6.0 Product Owner Product Manager Certified SAFe 6 POPM", institution: "Agile Unify", file: "safe-6-popm.pdf" },
  { title: "IT Product Management", institution: "Robot dreams", file: "it-product-management.pdf" },
  { title: "Introduction to AI Agents", institution: "Datacamp", file: "intro-ai-agents.pdf" },
  { title: "Understanding Prompt Engineering", institution: "Datacamp", file: "understanding-prompt-engineering.pdf" },
  { title: "Intro to AI: A Beginner's Guide to Artificial Intelligence", institution: "Udemy | 365 Careers", file: "intro-to-ai.pdf" },
  { title: "Become a Product Manager | Learn the Skills & Get the Job", institution: "Udemy | Cole Mercer, Evan Kimbrell", file: "become-a-product-manager.pdf" },
  { title: "User Experience Design & User Interface Design Fundamentals", institution: "Udemy | Timothy Meixner, Johannes Ruof", file: "ux-ui-fundamentals.pdf" },
  { title: "Leadership: Practical Leadership Skills", institution: "Udemy | Chris Croft", file: "practical-leadership-skills.pdf" },
  { title: "How to Elicit, Write, and Analyze Requirements in the AI Era", institution: "Udemy | Tom and Angela Hathaway", file: "requirements-in-ai-era.pdf" },
  { title: "Business Analysis Modeling Skills & Techniques", institution: "Udemy | The BA Guide | Jeremy Aschenbrenner", file: "ba-modeling-skills.pdf" },
  { title: "Identify & Define the Problem with Business Analysis", institution: "Udemy | The BA Guide | Jeremy Aschenbrenner", file: "identify-define-problem-ba.pdf" },
  { title: "Business Analysis Fundamentals - IIBA endorsed", institution: "Udemy | The BA Guide | Jeremy Aschenbrenner", file: "ba-fundamentals.pdf" },
  { title: "Robust Scrum Product Owner", institution: "Udemy | Michael de la Maza, PhD, CEC", file: "robust-scrum-product-owner.pdf" },
  { title: "Business Analyst: Software Testing Processes & Techniques", institution: "Udemy | The BA Guide | Jeremy Aschenbrenner", file: "ba-software-testing.pdf" },
  { title: "User Story Masterclass: Your Agile Guide to User Stories", institution: "Udemy | The BA Guide | Jeremy Aschenbrenner", file: "user-story-masterclass.pdf" },
];

export default function CertificationsPage() {
  const coursesWithAvailability = allCourses.map(course => {
    const filePath = path.join(process.cwd(), 'public', 'certifications', course.file);
    const isAvailable = fs.existsSync(filePath);
    return { ...course, isAvailable };
  });

  return (
    <main className="min-h-screen w-full bg-bg py-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-subtitle hover:text-accent transition-colors mb-12 group">
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Back to Home</span>
        </Link>

        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Courses & Certifications</h1>
          <div className="w-24 h-1 bg-deep-accent mb-8" />
          <p className="font-sans text-lg text-subtitle max-w-2xl leading-relaxed">
            A comprehensive list of my continuous learning journey, professional certifications, and specialized training.
          </p>
        </div>

        <CertificationsGrid courses={coursesWithAvailability} />
      </div>
    </main>
  );
}
