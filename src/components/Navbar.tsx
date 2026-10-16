import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Language, siteContent } from '@/content/siteContent';

interface NavbarProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const SECTION_IDS = ['about', 'services', 'solutions', 'github', 'contact'] as const;

const Navbar = ({ language, setLanguage }: NavbarProps) => {
  const copy = siteContent[language];
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0);

      if (location.pathname !== '/') {
        setActiveSection('');
        return;
      }

      let current = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);

    if (section && location.pathname === '/') {
      window.scrollTo({
        top: section.offsetTop - 72,
        behavior: 'smooth',
      });
    } else {
      navigate('/');
      window.setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 72,
            behavior: 'smooth',
          });
        }
      }, 120);
    }
  };

  const navLinks = [
    { id: 'about', label: copy.nav.about },
    { id: 'services', label: copy.nav.services },
    { id: 'solutions', label: copy.nav.solutions },
    { id: 'github', label: copy.nav.github },
    { id: 'contact', label: copy.nav.contact },
  ];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 md:px-12">
          {/* Brand Logo with 3x3 Telemetry Matrix Icon */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-foreground"
          >
            <span
              aria-hidden="true"
              className="grid grid-cols-3 gap-[2px] p-0.5 transition-transform duration-300 group-hover:scale-110"
            >
              <b className="h-[5px] w-[5px] rounded-[1px] bg-sky-500" />
              <b className="h-[5px] w-[5px] rounded-[1px] bg-emerald-400" />
              <b className="h-[5px] w-[5px] rounded-[1px] bg-sky-900" />
              <b className="h-[5px] w-[5px] rounded-[1px] bg-emerald-400" />
              <b className="h-[5px] w-[5px] rounded-[1px] bg-sky-400" />
              <b className="h-[5px] w-[5px] rounded-[1px] bg-emerald-400" />
              <b className="h-[5px] w-[5px] rounded-[1px] bg-sky-900" />
              <b className="h-[5px] w-[5px] rounded-[1px] bg-emerald-400" />
              <b className="h-[5px] w-[5px] rounded-[1px] bg-sky-500" />
            </span>
            <span className="gradient-text font-extrabold">{copy.brand}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isCurrent = activeSection === item.id && location.pathname === '/';
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isCurrent ? 'true' : 'false'}
                  onClick={scrollToSection(item.id)}
                  className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isCurrent ? 'text-foreground' : 'text-foreground/65 hover:text-foreground'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-[2px] origin-left rounded-full bg-sky-400 transition-transform duration-300 ${
                      isCurrent ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
            <span className="mx-1.5 h-4 w-px bg-white/10" />
            <Link
              to="/privacy"
              className={`rounded-lg px-2.5 py-1.5 text-xs font-mono transition-colors ${
                location.pathname === '/privacy'
                  ? 'text-sky-400'
                  : 'text-foreground/55 hover:text-foreground'
              }`}
            >
              {copy.nav.privacy}
            </Link>
            <Link
              to="/support"
              className={`rounded-lg px-2.5 py-1.5 text-xs font-mono transition-colors ${
                location.pathname === '/support'
                  ? 'text-sky-400'
                  : 'text-foreground/55 hover:text-foreground'
              }`}
            >
              {copy.nav.support}
            </Link>
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            <div
              role="group"
              aria-label="Language"
              className="flex items-center rounded-lg border border-white/15 bg-background/70 p-0.5"
            >
              {(['pt', 'en'] as Language[]).map((lang) => {
                const active = language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setLanguage(lang)}
                    className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-all ${
                      active
                        ? 'bg-secondary text-sky-300 shadow-sm ring-1 ring-white/15'
                        : 'text-foreground/55 hover:text-foreground'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="inline-flex lg:hidden items-center justify-center rounded-lg border border-white/15 p-2 text-foreground/80 hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-background/95 px-6 py-4 lg:hidden">
            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={scrollToSection(item.id)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-4 border-t border-white/10 pt-3">
                <Link
                  to="/privacy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs text-foreground/60 hover:text-sky-400"
                >
                  {copy.nav.privacy}
                </Link>
                <Link
                  to="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs text-foreground/60 hover:text-sky-400"
                >
                  {copy.nav.support}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
