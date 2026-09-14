import React from 'react';

interface SectionHeadingProps {
  title: string;
  className?: string;
}

const SectionHeading = ({ title, className = '' }: SectionHeadingProps) => (
  <h2
    className={`font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl ${className}`}
  >
    {title}
  </h2>
);

export default SectionHeading;
