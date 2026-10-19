import React, { useCallback, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import GitHubSection from '@/components/GitHubSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { SectionGraphSpine } from '@/components/SectionGraphSpine';
import { Language } from '@/content/siteContent';
import { useGitHubStats } from '@/hooks/useGitHubStats';

interface IndexProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Index = ({ language, setLanguage }: IndexProps) => {
  const telemetry = useGitHubStats();
  const mainRef = useRef<HTMLElement>(null);

  // Node 00 (Hero) starts active; Nodes 01..05 turn ON when the light passes them and turn OFF when scrolling back up above them
  const [activeNodes, setActiveNodes] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [currentNodeIdx, setCurrentNodeIdx] = useState<number>(0);

  const handleReachNode = useCallback((reachedIdx: number) => {
    setActiveNodes((prev) => {
      let changed = false;
      const next = prev.map((val, idx) => {
        const shouldBeActive = idx <= reachedIdx;
        if (shouldBeActive !== val) changed = true;
        return shouldBeActive;
      });
      return changed ? next : prev;
    });
    setCurrentNodeIdx(reachedIdx);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar language={language} setLanguage={setLanguage} />
      <main ref={mainRef} className="relative">
        <SectionGraphSpine
          mainRef={mainRef}
          onReachNode={handleReachNode}
        />

        <HeroSection
          language={language}
          publicRepos={telemetry.publicRepos}
          totalContributions={telemetry.calendar?.total ?? null}
          isNodeActive={activeNodes[0]}
          isNodeCurrent={currentNodeIdx === 0}
        />
        <AboutSection
          language={language}
          isNodeActive={activeNodes[1]}
          isNodeCurrent={currentNodeIdx === 1}
        />
        <SkillsSection
          language={language}
          isNodeActive={activeNodes[2]}
          isNodeCurrent={currentNodeIdx === 2}
        />
        <ProjectsSection
          language={language}
          repos={telemetry.repos}
          isNodeActive={activeNodes[3]}
          isNodeCurrent={currentNodeIdx === 3}
        />
        <GitHubSection
          language={language}
          telemetry={telemetry}
          isNodeActive={activeNodes[4]}
          isNodeCurrent={currentNodeIdx === 4}
        />
        <ContactSection
          language={language}
          isNodeActive={activeNodes[5]}
          isNodeCurrent={currentNodeIdx === 5}
        />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;
