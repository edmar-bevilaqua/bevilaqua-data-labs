import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language, siteContent } from '@/content/siteContent';
import BeviMark from './BeviMark';

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  const copy = siteContent[language];
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 72,
        behavior: 'smooth',
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
    <footer className="border-t border-white/10 bg-background py-8 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-foreground/55">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <BeviMark size={20} />
          <span>
            © {new Date().getFullYear()} {copy.brand}. {copy.footer.rights}
          </span>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <li>
            <a
              href="#about"
              className="hover:text-sky-400 transition-colors"
              onClick={scrollToSection('about')}
            >
              {copy.nav.about}
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="hover:text-sky-400 transition-colors"
              onClick={scrollToSection('services')}
            >
              {copy.nav.services}
            </a>
          </li>
          <li>
            <a
              href="#solutions"
              className="hover:text-sky-400 transition-colors"
              onClick={scrollToSection('solutions')}
            >
              {copy.nav.solutions}
            </a>
          </li>
          <li>
            <a
              href="#github"
              className="hover:text-sky-400 transition-colors"
              onClick={scrollToSection('github')}
            >
              {copy.nav.github}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-sky-400 transition-colors"
              onClick={scrollToSection('contact')}
            >
              {copy.nav.contact}
            </a>
          </li>
          <li>
            <Link to="/privacy" className="hover:text-sky-400 transition-colors">
              {copy.nav.privacy}
            </Link>
          </li>
          <li>
            <Link to="/support" className="hover:text-sky-400 transition-colors">
              {copy.nav.support}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
