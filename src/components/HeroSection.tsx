import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, siteContent } from '@/content/siteContent';
import DataGraphCanvas from './DataGraphCanvas';

interface HeroSectionProps {
  language: Language;
  publicRepos: number;
  totalContributions: number;
}

const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  locale: string;
}> = ({ value, suffix = '', locale }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const duration = 1350;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value]);

  return (
    <>
      {display.toLocaleString(locale)}
      {suffix}
    </>
  );
};

const HeroSection = ({ language, publicRepos, totalContributions }: HeroSectionProps) => {
  const copy = siteContent[language].hero;
  const locale = language === 'pt' ? 'pt-BR' : 'en-US';
  const [clock, setClock] = useState<string>('--:--');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    });
    const updateClock = () => setClock(formatter.format(new Date()));
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, [locale]);

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 72,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-12 pt-24 md:px-12 lg:px-24"
    >
      {/* Subtle Ambient Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.14),transparent)] z-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Top Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-card/80 px-3.5 py-1.5 text-xs md:text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>{copy.statusLocation}</span>
            <span className="font-mono text-foreground/55">· {clock}</span>
            <span className="hidden sm:inline text-foreground/40">·</span>
            <span className="hidden sm:inline text-emerald-300/90 text-xs">
              {copy.statusAvailable}
            </span>
          </div>

          <a
            href="https://github.com/edmar-bevilaqua"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs md:text-sm text-foreground/60 hover:text-sky-400 transition-colors"
          >
            github.com/edmar-bevilaqua ↗
          </a>
        </div>

        {/* Interactive Data Graph Matrix Canvas */}
        <DataGraphCanvas language={language} initialCount={totalContributions} />

        {/* Split Editorial Hero Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8 pt-2">
          <div className="lg:col-span-7 space-y-2">
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-sky-400">
              {copy.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold leading-[0.98] tracking-tight">
              <span className="block text-foreground">{copy.title}</span>
              <span className="mt-1 block gradient-text">{copy.roleHighlight}</span>
            </h1>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              {copy.subtitle}
            </p>
            <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
              {copy.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                onClick={scrollToSection('solutions')}
                className="h-11 rounded-lg bg-sky-400 px-5 font-semibold text-slate-950 hover:bg-sky-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-sky-500/20"
              >
                {copy.primaryCta}
              </Button>
              <Button
                variant="outline"
                onClick={scrollToSection('contact')}
                className="h-11 rounded-lg border-white/15 bg-card/70 px-5 font-semibold text-foreground hover:border-sky-400/50 hover:bg-secondary/80 transition-all hover:-translate-y-0.5"
              >
                {copy.secondaryCta}
              </Button>
              <a
                href="https://github.com/edmar-bevilaqua"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/10 bg-background/60 px-4 font-mono text-xs font-medium text-foreground/75 hover:border-white/30 hover:text-foreground transition-all hover:-translate-y-0.5"
              >
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Impact KPIs Bar */}
        <div className="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/10 pt-5">
          <div className="space-y-1">
            <b className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-foreground block">
              <AnimatedCounter
                value={copy.stats.domainsValue}
                suffix={copy.stats.domainsSuffix}
                locale={locale}
              />
            </b>
            <span className="text-xs md:text-sm text-foreground/60 block">
              {copy.stats.domainsLabel}
            </span>
          </div>

          <div className="space-y-1">
            <b className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-sky-400 block">
              <AnimatedCounter value={publicRepos} locale={locale} />
            </b>
            <span className="text-xs md:text-sm text-foreground/60 block">
              {copy.stats.reposLabel}
            </span>
          </div>

          <div className="space-y-1">
            <b className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-emerald-400 block">
              <AnimatedCounter value={totalContributions} locale={locale} />
            </b>
            <span className="text-xs md:text-sm text-foreground/60 block">
              {copy.stats.commitsLabel}
            </span>
          </div>

          <div className="space-y-1">
            <b className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-foreground block">
              <AnimatedCounter
                value={copy.stats.pipelineValue}
                suffix={copy.stats.pipelineSuffix}
                locale={locale}
              />
            </b>
            <span className="text-xs md:text-sm text-foreground/60 block">
              {copy.stats.pipelineLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
