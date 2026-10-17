import React from 'react';
import { ArrowUpRight, Terminal, ShieldCheck, Cpu, LineChart } from 'lucide-react';
import { Language, siteContent } from '@/content/siteContent';

interface AboutSectionProps {
  language: Language;
}

const principleIcons = [LineChart, ShieldCheck, Cpu];

const AboutSection = ({ language }: AboutSectionProps) => {
  const copy = siteContent[language].about;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="about" className="section-spacing px-6 md:px-12 lg:px-24 relative">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Sticky Left Column: Founder Profile & Telemetry Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div
              onPointerMove={handlePointerMove}
              className="spotlight-card rounded-2xl p-6 md:p-7 space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 mb-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Lead Profile
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {copy.founderCard.name}
                  </h3>
                  <p className="font-mono text-xs text-sky-400 mt-0.5">
                    {copy.founderCard.role}
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 font-mono text-sm font-bold text-sky-300">
                  EB
                </div>
              </div>

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

              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
                <a
                  href="https://www.linkedin.com/in/edmar-bevilaqua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-background/60 px-3 py-2 font-mono text-xs text-foreground/80 hover:border-sky-400/50 hover:text-sky-300 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" />
                </a>
                <a
                  href="https://github.com/edmar-bevilaqua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-background/60 px-3 py-2 font-mono text-xs text-foreground/80 hover:border-sky-400/50 hover:text-sky-300 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" />
                </a>
              </div>
            </div>

            {/* Commit / Telemetry Card */}
            <div className="rounded-xl border border-white/10 bg-background/90 p-3.5 font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between text-foreground/50">
                <span className="inline-flex items-center gap-1.5 text-sky-400 font-medium">
                  <Terminal className="h-3.5 w-3.5" />
                  {copy.telemetryHash}
                </span>
                <span>{copy.telemetryStep}</span>
              </div>
              <div className="text-foreground/85 truncate">
                <span className="text-emerald-400">feat(identity):</span>{' '}
                {copy.telemetryCommit.replace('feat(identity): ', '')}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Engineering Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="section-kicker">
                <span>{copy.kicker}</span>
                <span aria-hidden="true" className="hidden sm:inline-flex items-center gap-1">
                  {[2, 4, 3, 1, 4, 3, 2, 4, 3, 4].map((lvl, i) => (
                    <i
                      key={i}
                      className="inline-block h-2 w-2 rounded-[2px]"
                      style={{
                        backgroundColor:
                          lvl === 4
                            ? '#34d399'
                            : lvl === 3
                            ? '#38bdf8'
                            : lvl === 2
                            ? '#0284c7'
                            : '#0c4a6e',
                      }}
                    />
                  ))}
                </span>
              </div>
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
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-sky-400">
                          {principle.code}
                        </span>
                        <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
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
      </div>
    </section>
  );
};

export default AboutSection;
