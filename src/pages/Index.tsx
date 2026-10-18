import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TelemetryTicker from '@/components/TelemetryTicker';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import GitHubSection from '@/components/GitHubSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Language } from '@/content/siteContent';
import { useGitHubStats } from '@/hooks/useGitHubStats';

interface IndexProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Index = ({ language, setLanguage }: IndexProps) => {
  const telemetry = useGitHubStats();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar language={language} setLanguage={setLanguage} />
      <main>
        <HeroSection
          language={language}
          publicRepos={telemetry.publicRepos}
          totalContributions={telemetry.calendar.total}
        />
        <TelemetryTicker language={language} repos={telemetry.repos} />
        <AboutSection language={language} />
        <SkillsSection language={language} />
        <ProjectsSection language={language} repos={telemetry.repos} />
        <GitHubSection language={language} telemetry={telemetry} />
        <ContactSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;
