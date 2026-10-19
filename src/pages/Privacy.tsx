import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Language, siteContent } from '@/content/siteContent';

interface PrivacyProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Privacy = ({ language, setLanguage }: PrivacyProps) => {
  const copy = siteContent[language].privacy;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="px-6 md:px-12 lg:px-24 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-heading">{copy.title}</h1>
          <p className="text-foreground/60 mb-10">{copy.updated}</p>
          <div className="space-y-6">
            {copy.sections.map((section) => (
              <section key={section.title} className="glass-card p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
                <p className="text-foreground/75 leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Privacy;
