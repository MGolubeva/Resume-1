import HeroScrollytelling from '@/components/HeroScrollytelling';
import AboutMe from '@/components/AboutMe';
import ImpactMetrics from '@/components/ImpactMetrics';
import NavigationGrid from '@/components/NavigationGrid';
import Timeline from '@/components/Timeline';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-bg overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <HeroScrollytelling />
      <AboutMe />
      <ImpactMetrics />
      <NavigationGrid />
      <Timeline />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
