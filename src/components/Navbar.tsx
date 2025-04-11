
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 lg:px-24 fixed top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold gradient-text">Portfolio</Link>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">About</a>
          <a href="#projects" className="text-foreground/80 hover:text-foreground transition-colors">Projects</a>
          <a href="#skills" className="text-foreground/80 hover:text-foreground transition-colors">Skills</a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
