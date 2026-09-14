
import { Language, siteContent } from '@/content/siteContent';
import SectionHeading from './SectionHeading';
import { useInView, revealClass } from '@/hooks/useInView';

interface SkillsSectionProps {
  language: Language;
}

const tools = [
  'Python', 'Jupyter', 'Azure', 'Git', 'Docker', 'AWS', 'GCP',
  'Databricks', 'Power BI', 'Tableau', 'Airflow', 'Kubernetes'
];

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const copy = siteContent[language].services;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="services" className="section-spacing px-6 md:px-12 lg:px-24">
      <div ref={ref} className={`mx-auto max-w-6xl ${revealClass(isVisible)}`}>
        <SectionHeading title={copy.title} className="mb-4" />
        <p className="mb-14 max-w-[65ch] text-lg text-foreground/80 md:mb-16">{copy.intro}</p>

        <ol className="relative ml-4 border-l border-border">
          {copy.items.map((service, index) => (
            <li key={service.title} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute left-0 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-foreground bg-accent font-mono text-xs text-accent-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="max-w-[60ch] text-foreground/70">{service.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-4 border-t border-border pt-10 md:mt-6">
          <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
            {copy.technologiesTitle}
          </h3>
          <p className="mb-6 max-w-[65ch] text-foreground/70">{copy.technologiesIntro}</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded border border-border px-2.5 py-1 font-mono text-xs text-foreground/70 transition-colors hover:border-foreground hover:bg-accent/10 hover:text-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
