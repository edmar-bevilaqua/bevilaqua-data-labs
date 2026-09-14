import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Language, siteContent } from '@/content/siteContent';

interface SupportProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Support = ({ language, setLanguage }: SupportProps) => {
  const copy = siteContent[language].support;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar language={language} setLanguage={setLanguage} />
      <main id="main-content" className="px-6 md:px-12 lg:px-24 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            {copy.title}
          </h1>
          <p className="text-lg text-foreground/80 mb-10">{copy.intro}</p>
          <div className="divide-y divide-border border-t border-border">
            {copy.sections.map((section) => (
              <section key={section.title} className="py-6">
                <h2 className="text-xl font-display font-semibold mb-3 text-foreground">{section.title}</h2>
                <p className="text-foreground/75 leading-relaxed max-w-[70ch]">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Support;
