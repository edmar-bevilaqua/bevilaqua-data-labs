import React, { useRef, useState } from 'react';
import {
  BrainCircuit,
  ChartNoAxesCombined,
  CloudCog,
  Database,
  Layers,
  Workflow,
} from 'lucide-react';
import { Language, siteContent } from '@/content/siteContent';
import SkillsGraphCanvas from './SkillsGraphCanvas';
import { SectionNodeStation } from './SectionGraphSpine';

interface SkillsSectionProps {
  language: Language;
  isNodeActive?: boolean;
  isNodeCurrent?: boolean;
}

const serviceIcons = [
  BrainCircuit,
  Database,
  ChartNoAxesCombined,
  Workflow,
  CloudCog,
];

const CHIP_TO_NODE_ID: Record<string, string> = {
  Python: 'python',
  'Scikit-Learn': 'scikit-learn',
  'PyTorch Geometric': 'pyg',
  'Graph Neural Networks': 'gnn',
  'Ensemble Learning': 'ensemble-ml',
  'Time Series Forecasting': 'ts-forecasting',
  Pandas: 'pandas',
  NumPy: 'numpy',
  'SciPy / Stats': 'scipy',
  'SQL Avançado': 'sql',
  'Advanced SQL': 'sql',
  'Apache Airflow': 'airflow',
  Databricks: 'databricks',
  'Spark / PySpark': 'pyspark',
  'ETL / ELT Pipelines': 'etl-pipelines',
  'Data Quality': 'data-cleaning',
  'Modelagem de Dados': 'dim-modeling',
  'Data Modeling': 'dim-modeling',
  AWS: 'aws',
  Azure: 'azure-gcp',
  'Google Cloud (GCP)': 'azure-gcp',
  Docker: 'docker',
  Kubernetes: 'kubernetes',
  'Git & GitHub Actions': 'git',
  'Linux / CLI': 'linux',
  'Power BI': 'power-bi',
  Tableau: 'tableau',
  JupyterLab: 'jupyter',
  'Visualização Estatística': 'eda',
  'Statistical Visualization': 'eda',
  'TypeScript / React': 'react-apps',
  'KPI Design': 'power-bi',
  'Data Storytelling': 'tableau',
};

const SkillsSection = ({
  language,
  isNodeActive = true,
  isNodeCurrent = false,
}: SkillsSectionProps) => {
  const copy = siteContent[language].services;
  const graphWrapperRef = useRef<HTMLDivElement>(null);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [externalFocusSkill, setExternalFocusSkill] = useState<{
    nodeId: string;
    seq: number;
  } | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleChipClick = (chip: string) => {
    const nodeId = CHIP_TO_NODE_ID[chip];
    if (!nodeId) return;

    setActiveChip(chip);
    setExternalFocusSkill((prev) => ({
      nodeId,
      seq: (prev?.seq ?? 0) + 1,
    }));

    if (window.innerWidth >= 768 && graphWrapperRef.current) {
      const rect = graphWrapperRef.current.getBoundingClientRect();
      if (rect.top < 72 || rect.bottom > window.innerHeight) {
        window.scrollTo({
          top: Math.max(0, window.scrollY + rect.top - 88),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section
      id="services"
      className="section-spacing px-4 sm:px-6 md:px-12 lg:px-24 relative border-t border-white/5 bg-secondary/20"
    >
      <SectionNodeStation
        sectionKey="services"
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

          {/* Interactive Skills & Repositories Relationship Graph (Desktop & Tablet >= md) */}
          <div ref={graphWrapperRef} className="hidden md:block">
            <SkillsGraphCanvas
              language={language}
              isSectionActive={isNodeActive}
              externalFocusSkill={externalFocusSkill}
            />
          </div>

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
                    {layer.chips.map((chip) => {
                      const isSelected = activeChip === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className={`rounded-full border px-3 py-1 font-mono text-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                            isSelected
                              ? 'border-sky-400 bg-sky-400/15 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.25)]'
                              : 'border-white/10 bg-background/85 text-foreground/85 hover:border-sky-400 hover:text-sky-300'
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
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
      </SectionNodeStation>
    </section>
  );
};

export default SkillsSection;
