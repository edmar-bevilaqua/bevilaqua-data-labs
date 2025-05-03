
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    
    if (section) {
      window.scrollTo({
        top: section.offsetTop, // Offset to account for fixed navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="w-full py-4 px-6 md:px-12 lg:px-24 fixed top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold gradient-text">Portfolio</Link>
        <div className="hidden md:flex space-x-8">
          <a 
            href="#about" 
            onClick={scrollToSection('about')} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </a>
          <a 
            href="#projects" 
            onClick={scrollToSection('projects')} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Projects
          </a>
          <a 
            href="#skills" 
            onClick={scrollToSection('skills')} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Skills
          </a>
          <a 
            href="#contact" 
            onClick={scrollToSection('contact')} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
