
import React from 'react';
import { Link } from 'react-router-dom';
import { Language, siteContent } from '@/content/siteContent';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import BeviMark from './BeviMark';

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  const copy = siteContent[language];
  const scrollToSection = useScrollToSection();

  return (
    <footer className="py-10 px-6 md:px-12 lg:px-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <BeviMark size={20} />
          <p className="text-foreground/70 text-sm">
            © {new Date().getFullYear()} {copy.brand}. {copy.footer.rights}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <li>
              <a 
                href="#about" 
                className="text-foreground/70 text-sm hover:text-foreground transition-colors" 
                onClick={scrollToSection('about')}
              >
                {copy.nav.about}
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className="text-foreground/70 text-sm hover:text-foreground transition-colors"
                onClick={scrollToSection('services')}
              >
                {copy.nav.services}
              </a>
            </li>
            <li>
              <a 
                href="#solutions" 
                className="text-foreground/70 text-sm hover:text-foreground transition-colors"
                onClick={scrollToSection('solutions')}
              >
                {copy.nav.solutions}
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="text-foreground/70 text-sm hover:text-foreground transition-colors"
                onClick={scrollToSection('contact')}              
              >
                {copy.nav.contact}
              </a>
            </li>
            <li>
              <Link to="/privacy" className="text-foreground/70 text-sm hover:text-foreground transition-colors">
                {copy.nav.privacy}
              </Link>
            </li>
            <li>
              <Link to="/support" className="text-foreground/70 text-sm hover:text-foreground transition-colors">
                {copy.nav.support}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
