
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Language } from '@/content/siteContent';

interface IndexProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Index = ({ language, setLanguage }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar language={language} setLanguage={setLanguage} />
      <main id="main-content">
        <HeroSection language={language} />
        <AboutSection language={language} />
        <SkillsSection language={language} />
        <ProjectsSection language={language} />
        <ContactSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;
