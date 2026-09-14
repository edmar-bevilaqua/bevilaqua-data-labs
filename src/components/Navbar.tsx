
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language, languages, siteContent } from '@/content/siteContent';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import BeviMark from './BeviMark';

interface NavbarProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Navbar = ({ language, setLanguage }: NavbarProps) => {
  const copy = siteContent[language];
  const scrollToSection = useScrollToSection();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const anchorLinks = [
    { id: 'about', label: copy.nav.about },
    { id: 'services', label: copy.nav.services },
    { id: 'solutions', label: copy.nav.solutions },
    { id: 'contact', label: copy.nav.contact },
  ];

  const routeLinks = [
    { to: '/privacy', label: copy.nav.privacy },
    { to: '/support', label: copy.nav.support },
  ];

  const linkClasses =
    'text-sm text-foreground/70 hover:text-foreground transition-colors';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
      >
        {language === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>

      <header className="fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <nav className="flex h-16 items-center justify-between px-6 md:px-12 lg:px-24">
          <Link to="/" className="flex items-center gap-3">
            <BeviMark size={30} />
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold tracking-[0.08em] text-foreground">
                BEVILAQUA
              </span>
              <span className="mt-1 font-display text-[10px] font-medium tracking-[0.22em] text-accent">
                DATA LABS
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {anchorLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={scrollToSection(link.id)}
                className={linkClasses}
              >
                {link.label}
              </a>
            ))}
            {routeLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={location.pathname === link.to ? 'page' : undefined}
                className={linkClasses}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="rounded-md border border-border px-3 py-1 font-mono text-xs text-foreground/70 transition-colors hover:border-foreground hover:bg-accent/10 hover:text-foreground"
              aria-label="Change language"
            >
              {languages[language]}
            </button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isMenuOpen ? (language === 'pt' ? 'Fechar menu' : 'Close menu') : (language === 'pt' ? 'Abrir menu' : 'Open menu')}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span
              className={`block h-px w-6 bg-foreground transition-transform ${isMenuOpen ? 'translate-y-[3px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-transform ${isMenuOpen ? '-translate-y-[3px] -rotate-45' : ''}`}
            />
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border bg-background px-6 py-6 lg:hidden"
        >
          <ul className="flex flex-col gap-4">
            {anchorLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={scrollToSection(link.id)}
                  className="block text-base text-foreground/80 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {routeLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block text-base text-foreground/80 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="mt-6 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground/70 hover:border-foreground hover:bg-accent/10 hover:text-foreground"
            aria-label="Change language"
          >
            {languages[language]}
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
