import { useNavigate } from 'react-router-dom';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollToId = (id: string) => {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

export const useScrollToSection = () => {
  const navigate = useNavigate();

  return (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (document.getElementById(sectionId)) {
      scrollToId(sectionId);
      return;
    }

    navigate('/');
    window.setTimeout(() => scrollToId(sectionId), 100);
  };
};
