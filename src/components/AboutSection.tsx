
import { Language, siteContent } from '@/content/siteContent';
import SectionHeading from './SectionHeading';
import { useInView, revealClass } from '@/hooks/useInView';

interface AboutSectionProps {
  language: Language;
}

const AboutSection = ({ language }: AboutSectionProps) => {
  const copy = siteContent[language].about;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="section-spacing px-6 md:px-12 lg:px-24">
      <div ref={ref} className={`mx-auto max-w-6xl ${revealClass(isVisible)}`}>
        <SectionHeading title={copy.title} className="mb-10 md:mb-14" />
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-6 max-w-[65ch] text-lg text-foreground/80">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="md:col-span-5 md:border-l md:border-border md:pl-10">
            <ul className="divide-y divide-border">
              {copy.principles.map((principle) => (
                <li key={principle.title} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="text-foreground/70">{principle.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
