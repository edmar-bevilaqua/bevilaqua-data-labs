import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language, siteContent } from "@/content/siteContent";

interface NotFoundProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const NotFound = ({ language, setLanguage }: NotFoundProps) => {
  const location = useLocation();
  const copy = siteContent[language].notFound;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar language={language} setLanguage={setLanguage} />
      <main id="main-content" className="flex min-h-[100dvh] items-center justify-center px-6">
        <div className="max-w-xl rounded-md border border-border p-10 text-center">
          <p className="mb-4 font-mono text-sm text-muted-foreground">404</p>
          <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-foreground">{copy.title}</h1>
          <p className="mb-6 text-xl text-foreground/70">{copy.description}</p>
          <a href="/" className="text-foreground underline hover:text-muted-foreground">
            {copy.link}
          </a>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default NotFound;
