
import React from 'react';
import dataScienceImg from '@/assets/projects/data_science_image.avif';
import timeSeriesImg from '@/assets/projects/time_series_forecasting.avif';
import graphNeuralNetworkImg from '@/assets/projects/graph_neural_network.avif';
import ProjectCard from './ProjectCard';
import { Language, siteContent } from '@/content/siteContent';

interface ProjectsSectionProps {
  language: Language;
}

const projectImages = [dataScienceImg, timeSeriesImg, graphNeuralNetworkImg];

const ProjectsSection = ({ language }: ProjectsSectionProps) => {
  const copy = siteContent[language].solutions;

  return (
    <section id="solutions" className="section-spacing px-6 md:px-12 lg:px-24 relative bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">{copy.title}</h2>
        <p className="text-lg text-foreground/80 max-w-3xl mb-12">{copy.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {copy.items.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={projectImages[index]}
              githubLink={project.githubLink}
              repositoryLabel={copy.repositoryLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
