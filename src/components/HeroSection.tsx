
import React from 'react';
import { Button } from '@/components/ui/button';
import { Language, siteContent } from '@/content/siteContent';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useInView, revealClass } from '@/hooks/useInView';
import BeviMark from './BeviMark';

interface HeroSectionProps {
  language: Language;
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const copy = siteContent[language].hero;
  const brand = siteContent[language].brand;
  const scrollToSection = useScrollToSection();
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 pt-24 md:px-12 lg:px-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block"
      >
        <BeviMark size={560} />
      </div>

      <div ref={ref} className={`relative z-10 max-w-3xl ${revealClass(isVisible)}`}>
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {brand}
        </p>
        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {copy.headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-foreground/70 md:text-xl">
          {copy.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground transition-transform hover:bg-accent/90 active:scale-[0.98]"
            onClick={scrollToSection('contact')}
          >
            {copy.primaryCta}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground transition-colors hover:border-foreground hover:bg-accent/10 active:scale-[0.98]"
            onClick={scrollToSection('solutions')}
          >
            {copy.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
