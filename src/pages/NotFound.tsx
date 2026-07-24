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
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center glass-card p-10 rounded-lg max-w-xl">
          <p className="text-blue-300 mb-4">404</p>
          <h1 className="text-4xl font-bold mb-4">{copy.title}</h1>
          <p className="text-xl text-foreground/70 mb-6">{copy.description}</p>
          <a href="/" className="text-blue-300 hover:text-blue-200 underline">
            {copy.link}
          </a>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default NotFound;
