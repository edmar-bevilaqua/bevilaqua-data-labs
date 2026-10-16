import React from 'react';
import {
  BrainCircuit,
  ChartNoAxesCombined,
  CloudCog,
  Database,
  Layers,
  Terminal,
  Workflow,
} from 'lucide-react';
import { Language, siteContent } from '@/content/siteContent';
import SkillsGraphCanvas from './SkillsGraphCanvas';

interface SkillsSectionProps {
  language: Language;
}

const serviceIcons = [
  BrainCircuit,
  Database,
  ChartNoAxesCombined,
  Workflow,
  CloudCog,
];

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const copy = siteContent[language].services;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="services"
      className="section-spacing px-6 md:px-12 lg:px-24 relative border-t border-white/5 bg-secondary/20"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="section-kicker">
              <span>{copy.kicker}</span>
              <span aria-hidden="true" className="hidden sm:inline-flex items-center gap-1">
                {[3, 4, 2, 4, 3, 4, 1, 3, 4, 2].map((lvl, i) => (
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
            <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
              {copy.intro}
            </p>
          </div>

          {/* Telemetry Badge */}
          <div className="rounded-xl border border-white/10 bg-background/85 px-4 py-3 font-mono text-xs shrink-0 space-y-1">
            <div className="flex items-center justify-between gap-6 text-foreground/50">
              <span className="inline-flex items-center gap-1.5 text-sky-400 font-medium">
                <Terminal className="h-3.5 w-3.5" />
                {copy.telemetryHash}
              </span>
              <span>{copy.telemetryStep}</span>
            </div>
            <div className="text-foreground/85">
              <span className="text-emerald-400">feat(stack):</span>{' '}
              {copy.telemetryCommit.replace('feat(stack): ', '')}
            </div>
          </div>
        </div>

        {/* Interactive Skills & Repositories Relationship Graph */}
        <SkillsGraphCanvas language={language} />

        {/* 4 Architectural Stack Layers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/60">
            <Layers className="h-4 w-4 text-sky-400" />
            <span>{copy.technologiesTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.stackLayers.map((layer) => (
              <div
                key={layer.title}
                onPointerMove={handlePointerMove}
                className="spotlight-card spotlight-lift rounded-2xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-sky-400 block">
                    {layer.layer}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {layer.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {layer.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {layer.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/10 bg-background/85 px-3 py-1 font-mono text-xs text-foreground/85 transition-colors hover:border-sky-400 hover:text-sky-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Complementary Consulting & Engineering Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {copy.items.map((service, index) => {
            const Icon = serviceIcons[index] || BrainCircuit;

            return (
              <div
                key={service.title}
                onPointerMove={handlePointerMove}
                className="spotlight-card spotlight-lift rounded-xl p-5 md:p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-foreground/40">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
