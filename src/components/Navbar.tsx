
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language, languages, siteContent } from '@/content/siteContent';

interface NavbarProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Navbar = ({ language, setLanguage }: NavbarProps) => {
  const copy = siteContent[language];
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    
    if (section) {
      window.scrollTo({
        top: section.offsetTop, // Offset to account for fixed navbar
        behavior: 'smooth'
      });
    } else {
      navigate('/');
      window.setTimeout(() => {
        const target = document.getElementById(sectionId);
        target?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="w-full py-4 px-6 md:px-12 lg:px-24 fixed top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold gradient-text">{copy.brand}</Link>
        <div className="hidden md:flex space-x-8 items-center">
          <a 
            href="#about" 
            onClick={scrollToSection('about')} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            {copy.nav.about}
          </a>
          <a 
            href="#services" 
            onClick={scrollToSection('services')} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            {copy.nav.services}
          </a>
          <a 
            href="#solutions" 
            onClick={scrollToSection('solutions')} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            {copy.nav.solutions}
          </a>
          <a 
            href="#contact" 
            onClick={scrollToSection('contact')} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            {copy.nav.contact}
          </a>
          <Link to="/privacy" className="text-foreground/80 hover:text-foreground transition-colors">
            {copy.nav.privacy}
          </Link>
          <Link to="/support" className="text-foreground/80 hover:text-foreground transition-colors">
            {copy.nav.support}
          </Link>
          <button
            type="button"
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="rounded-full border border-white/15 px-3 py-1 text-sm text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
            aria-label="Change language"
          >
            {languages[language]}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
