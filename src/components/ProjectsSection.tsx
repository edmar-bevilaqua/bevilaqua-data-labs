
import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "Predictive Customer Analytics",
    description: "Built a machine learning model to predict customer churn with 92% accuracy, helping increase retention by 15%.",
    tags: ["Python", "Scikit-Learn", "Pandas"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "Time Series Forecasting",
    description: "Developed an LSTM-based forecasting system for financial market prediction, achieving 85% directional accuracy.",
    tags: ["TensorFlow", "Time Series", "Deep Learning"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "NLP Sentiment Analysis",
    description: "Created a sentiment analysis tool for product reviews using BERT, improving product feedback processing by 70%.",
    tags: ["NLP", "BERT", "PyTorch"],
    imageUrl: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "Data Visualization Dashboard",
    description: "Designed an interactive dashboard for business metrics visualization using D3.js and React, improving decision-making processes.",
    tags: ["D3.js", "React", "Visualization"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    demoLink: "#",
    githubLink: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-spacing px-6 md:px-12 lg:px-24 relative bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              demoLink={project.demoLink}
              githubLink={project.githubLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
