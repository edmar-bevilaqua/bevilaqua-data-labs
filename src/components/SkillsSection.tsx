
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, ChartNoAxesCombined, CloudCog, Database, Workflow } from 'lucide-react';
import { Language, siteContent } from '@/content/siteContent';

interface SkillsSectionProps {
  language: Language;
}

const tools = [
  "Python", "Jupyter", "Azure", "Git", "Docker", "AWS", "GCP", 
  "Databricks", "Power BI", "Tableau", "Airflow", "Kubernetes"
];

const icons = [BrainCircuit, Database, ChartNoAxesCombined, Workflow, CloudCog];

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const copy = siteContent[language].services;

  return (
    <section id="services" className="section-spacing px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">{copy.title}</h2>
        <p className="text-lg text-foreground/80 max-w-3xl mb-12">{copy.intro}</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {copy.items.map((service, index) => {
            const Icon = icons[index] || BrainCircuit;

            return (
              <div key={service.title} className="glass-card p-6 rounded-lg">
                <Icon className="w-8 h-8 text-blue-300 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-foreground/70">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-4">{copy.technologiesTitle}</h3>
          <p className="text-foreground/70 max-w-3xl mb-6">{copy.technologiesIntro}</p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <Badge 
                key={index} 
                className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white/90 border border-white/10 px-4 py-2 hover:brightness-125 transition-all"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
