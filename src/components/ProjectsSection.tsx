import React, { useState } from 'react';
import {
  ArrowUpRight,
  GitBranch,
  Layers,
  Star,
} from 'lucide-react';
import dataScienceImg from '@/assets/projects/data_science_image.avif';
import timeSeriesImg from '@/assets/projects/time_series_forecasting.avif';
import graphNeuralNetworkImg from '@/assets/projects/graph_neural_network.avif';
import { Language, siteContent } from '@/content/siteContent';
import { GitHubRepo } from '@/hooks/useGitHubStats';
import { SectionNodeStation } from './SectionGraphSpine';

interface ProjectsSectionProps {
  language: Language;
  repos?: GitHubRepo[];
  isNodeActive?: boolean;
  isNodeCurrent?: boolean;
}

const projectImages: Record<string, string> = {
  'aml-gnn': graphNeuralNetworkImg,
  'demand-forecast': timeSeriesImg,
  'ds-lab': dataScienceImg,
};

const ProjectsSection = ({
  language,
  repos = [],
  isNodeActive = true,
  isNodeCurrent = false,
}: ProjectsSectionProps) => {
  const copy = siteContent[language].solutions;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeProject = copy.items[selectedIndex] || copy.items[0];

  const matchedRepo = repos.find(
    (r) => r.name.toLowerCase() === activeProject.repoName.toLowerCase()
  );

  const formatRepoDate = (iso: string | null | undefined) => {
    if (!iso) return null;
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = copy.items.length;
    let delta = 0;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') delta = 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') delta = -1;
    if (delta !== 0) {
      e.preventDefault();
      const next = (index + delta + total) % total;
      setSelectedIndex(next);
      const btn = document.getElementById(`lab-tab-${next}`);
      btn?.focus();
    }
  };

  const updatedDate = formatRepoDate(matchedRepo?.pushed);

  return (
    <section id="solutions" className="section-spacing px-4 sm:px-6 md:px-12 lg:px-24 relative">
      <SectionNodeStation
        sectionKey="solutions"
        language={language}
        isActive={isNodeActive}
        isCurrent={isNodeCurrent}
      >
        <div className="space-y-8 md:space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl">
            <h2 className="section-heading">{copy.title}</h2>
            <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
              {copy.intro}
            </p>
          </div>

          {/* Master-Detail Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            {/* Compact Mobile/Tablet Selector Strip (< lg) — keeps Detail Panel immediately visible below */}
            <div
              role="tablist"
              aria-label={copy.title}
              className="grid grid-cols-3 gap-2 lg:hidden"
            >
              {copy.items.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="lab-detail-panel"
                    onClick={() => setSelectedIndex(idx)}
                    className={`rounded-xl border p-2.5 sm:p-3 text-left transition-all ${
                      isSelected
                        ? 'border-sky-400/80 bg-secondary/95 shadow-md shadow-sky-950/30'
                        : 'border-white/10 bg-card/60 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={`font-mono text-[10px] font-semibold ${
                          isSelected ? 'text-sky-400' : 'text-foreground/50'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isSelected ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-white/15'
                        }`}
                      />
                    </div>
                    <p className="font-display text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-tight">
                      {item.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Left Tablist (Desktop Master >= lg) */}
            <div
              role="tablist"
              aria-label={copy.title}
              className="hidden lg:grid lg:col-span-4 grid-cols-1 gap-3"
            >
              {copy.items.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    id={`lab-tab-${idx}`}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    aria-controls="lab-detail-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPointerMove={handlePointerMove}
                    className={`spotlight-card text-left rounded-xl p-4 md:p-5 transition-all duration-300 ${
                      isSelected
                        ? 'border-sky-400/75 bg-secondary/90 lg:translate-x-1.5 shadow-lg shadow-sky-950/30'
                        : 'opacity-70 hover:opacity-100 hover:translate-x-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] text-sky-400 truncate">
                        {item.domain}
                      </span>
                      <span className="font-mono text-[11px] text-foreground/40 shrink-0">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-background/70 px-2 py-0.5 font-mono text-[10.5px] text-foreground/65"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Panel (Detail) */}
            <div
              id="lab-detail-panel"
              role="tabpanel"
              aria-labelledby={`lab-tab-${selectedIndex}`}
              key={activeProject.id}
              onPointerMove={handlePointerMove}
              className="lg:col-span-8 spotlight-card rounded-2xl p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 animate-fade-in"
            >
              {/* Top Status & Live GitHub Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 font-mono text-xs text-sky-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {activeProject.domain}
                </span>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-foreground/60">
                  {matchedRepo?.lang && (
                    <span className="rounded-md border border-white/10 bg-background/70 px-2.5 py-1 text-foreground/80">
                      {matchedRepo.lang}
                    </span>
                  )}
                  {matchedRepo && matchedRepo.stars > 0 && (
                    <span className="inline-flex items-center gap-1 text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-amber-300" />
                      {matchedRepo.stars}
                    </span>
                  )}
                  {updatedDate && (
                    <span>
                      {copy.updatedPrefix} {updatedDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Title, Thumbnail Banner & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-8 space-y-2.5">
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>
                <div className="md:col-span-4 overflow-hidden rounded-xl border border-white/10 bg-background/60 h-32 md:h-36">
                  <img
                    src={projectImages[activeProject.id] || dataScienceImg}
                    alt={activeProject.title}
                    className="h-full w-full object-cover opacity-85 transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* 3 Technical Specification Cards */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 mb-2.5">
                  {copy.metricsLabel}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-white/10 bg-background/70 p-3.5"
                    >
                      <span className="font-mono text-[11px] text-foreground/50 block">
                        {metric.label}
                      </span>
                      <strong className="font-mono text-xs md:text-sm text-sky-300 mt-0.5 block">
                        {metric.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* End-to-End Pipeline Architecture Flow */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 mb-2.5 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-sky-400" />
                  {copy.pipelineLabel}
                </p>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  {activeProject.pipeline.map((step, i) => (
                    <React.Fragment key={step}>
                      <span className="rounded-lg border border-white/10 bg-background/90 px-3 py-1.5 text-foreground/90">
                        {step}
                      </span>
                      {i < activeProject.pipeline.length - 1 && (
                        <span className="text-sky-400 font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 mb-2.5">
                  {copy.highlightsLabel}
                </p>
                <ul className="space-y-2">
                  {activeProject.highlights.map((hl) => (
                    <li
                      key={hl}
                      className="flex items-start gap-2.5 text-sm md:text-[15px] text-foreground/75 leading-relaxed"
                    >
                      <span className="font-mono text-sky-400 shrink-0 mt-0.5">—</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer: Tech Chips & Repository CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-background/80 px-3 py-1 font-mono text-xs text-foreground/80 transition-colors hover:border-sky-400 hover:text-sky-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={activeProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-400 px-4 py-2.5 font-sans text-sm font-semibold text-slate-950 transition-all hover:bg-sky-300 hover:-translate-y-0.5 shrink-0"
                >
                  <GitBranch className="h-4 w-4" />
                  <span>{copy.repositoryLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionNodeStation>
    </section>
  );
};

export default ProjectsSection;
