
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-24 bg-background/90 border-t border-foreground/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-foreground/60 text-sm">
          © {new Date().getFullYear()} Data Science Portfolio. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-8">
            <li>
              <a href="#about" className="text-foreground/60 text-sm hover:text-foreground transition-colors">About</a>
            </li>
            <li>
              <a href="#projects" className="text-foreground/60 text-sm hover:text-foreground transition-colors">Projects</a>
            </li>
            <li>
              <a href="#skills" className="text-foreground/60 text-sm hover:text-foreground transition-colors">Skills</a>
            </li>
            <li>
              <a href="#contact" className="text-foreground/60 text-sm hover:text-foreground transition-colors">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
