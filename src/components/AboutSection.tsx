import React from 'react';
import { ShieldCheck, Cpu, LineChart } from 'lucide-react';
import { SiGithub, SiGmail, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Language, siteContent } from '@/content/siteContent';
import BeviMark from './BeviMark';
import { SectionNodeStation } from './SectionGraphSpine';

interface AboutSectionProps {
  language: Language;
  isNodeActive?: boolean;
  isNodeCurrent?: boolean;
}

const principleIcons = [LineChart, ShieldCheck, Cpu];

const AboutSection = ({
  language,
  isNodeActive = true,
  isNodeCurrent = false,
}: AboutSectionProps) => {
  const copy = siteContent[language].about;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="about" className="section-spacing px-4 sm:px-6 md:px-12 lg:px-24 relative">
      <SectionNodeStation
        sectionKey="about"
        language={language}
        isActive={isNodeActive}
        isCurrent={isNodeCurrent}
      >
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Sticky Left Column: Founder Profile Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div
              onPointerMove={handlePointerMove}
              className="spotlight-card rounded-2xl p-5 pb-3 sm:p-6 sm:pb-3 md:px-7 md:pt-7 md:pb-3 space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 mb-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    {copy.founderCard.label}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {copy.founderCard.name}
                  </h3>
                  <p className="font-mono text-xs text-sky-400 mt-0.5">
                    {copy.founderCard.role}
                  </p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10">
                  <BeviMark size={24} />
                </div>
              </div>

              <img
                src="/edmar-pixel-art.png"
                alt={
                  language === 'pt'
                    ? 'Retrato de Edmar Bevilaqua em pixel art'
                    : 'Pixel-art portrait of Edmar Bevilaqua'
                }
                className="mx-auto h-64 w-full object-contain object-bottom sm:h-72"
              />

              <p className="text-sm text-foreground/75 leading-relaxed">
                {copy.founderCard.bio}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {copy.founderCard.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/10 bg-background/80 px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 items-center justify-items-center gap-2 border-t border-white/10 py-3">
                <a
                  href="https://www.linkedin.com/in/edmar-bevilaqua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-background/60 text-foreground/80 transition-colors hover:border-sky-400/50 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <SiLinkedin aria-hidden="true" className="h-7 w-7" />
                </a>
                <a
                  href="https://github.com/edmar-bevilaqua"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-background/60 text-foreground/80 transition-colors hover:border-sky-400/50 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <SiGithub aria-hidden="true" className="h-7 w-7" />
                </a>
                <a
                  href="mailto:edmar.bevi@gmail.com"
                  aria-label={language === 'pt' ? 'Enviar e-mail' : 'Send an email'}
                  title="Gmail"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-background/60 text-foreground/80 transition-colors hover:border-sky-400/50 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <SiGmail aria-hidden="true" className="h-7 w-7" />
                </a>
                <a
                  href="https://www.instagram.com/edmar_bevilaqua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-background/60 text-foreground/80 transition-colors hover:border-sky-400/50 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <SiInstagram aria-hidden="true" className="h-7 w-7" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Engineering Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="section-heading">{copy.title}</h2>
            </div>

            <div className="space-y-4">
              {copy.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base md:text-lg text-foreground/75 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 gap-4 pt-2">
              {copy.principles.map((principle, idx) => {
                const Icon = principleIcons[idx] || LineChart;
                return (
                  <div
                    key={principle.title}
                    onPointerMove={handlePointerMove}
                    className="spotlight-card spotlight-lift rounded-xl p-5 md:p-6 flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="shrink-0 whitespace-nowrap font-mono text-xs text-sky-400">
                          {principle.code}
                        </span>
                        <h3 className="min-w-0 font-display text-lg md:text-xl font-bold text-foreground">
                          {principle.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionNodeStation>
    </section>
  );
};

export default AboutSection;
