
import React from 'react';
import dataScienceImg from '@/assets/projects/data_science_image.avif';
import timeSeriesImg from '@/assets/projects/time_series_forecasting.avif';
import graphNeuralNetworkImg from '@/assets/projects/graph_neural_network.avif';
import personalWebsiteImg from '@/assets/projects/personal_website.avif';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "Data Science Studies",
    description: "Most of my projects are in this repository. It includes various data science projects, including data cleaning, data analysis, data visualization, deep learning, transfer learning, etc.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Numpy", "Matplotlib"],
    imageUrl: dataScienceImg,
    //demoLink: "#",
    githubLink: "https://github.com/edmar-bevilaqua/data_science",
  },
  {
    title: "Time Series Forecasting",
    description: "Developed a forecasting system based on Ensemble Learning for sales forecasting at Corporación Favorita. Achieved 0.44 on RMSLE metric (Top 100 on Kaggle Competition).",
    tags: ["Time Series", "Ensemble Learning", "Nested-CV", "Hyperparameter Tuning"],
    imageUrl: timeSeriesImg,
    //demoLink: "#",
    githubLink: "https://github.com/edmar-bevilaqua/store-sales-tsf-kaggle-competition",
  },
  {
    title: "Money Laundering Links Prediction",
    description: "Implemented a Graph Neural Network (GNN) for the prediction of fraudulent edges in a synthetic financial transaction dataset for Anti-Money Laundering. Achieved +80% F1-score for all fraudulent transaction patterns",
    tags: ["Deep Learning", "Graph Neural Networks", "PyTorch Geometric"],
    imageUrl: graphNeuralNetworkImg,
    //demoLink: "#",
    githubLink: "https://github.com/edmar-bevilaqua/anti-money-laundering-project",
  },
  {
    title: "Personal Portfolio Website",
    description: "This website you are seeing. I Developed a personal portfolio website using React and Tailwind CSS, showcasing my projects and skills.",
    tags: ["Typescript", "React", "Tailwind CSS", "JSX"],
    imageUrl: personalWebsiteImg,
    //demoLink: "#",
    githubLink: "https://github.com/edmar-bevilaqua/personal_website",
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
              githubLink={project.githubLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
