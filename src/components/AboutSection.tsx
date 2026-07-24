
import { Language, siteContent } from '@/content/siteContent';

interface AboutSectionProps {
  language: Language;
}

const AboutSection = ({ language }: AboutSectionProps) => {
  const copy = siteContent[language].about;

  return (
    <section id="about" className="section-spacing px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading">{copy.title}</h2>
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg text-foreground/80 mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="md:col-span-2 grid gap-4">
            {copy.principles.map((principle) => (
              <div key={principle.title} className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                <p className="text-foreground/70">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
