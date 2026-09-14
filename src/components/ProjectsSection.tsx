
import React from 'react';
import { SiGithub } from 'react-icons/si';
import graphNeuralNetworkImg from '@/assets/projects/graph_neural_network.avif';
import timeSeriesImg from '@/assets/projects/time_series_forecasting.avif';
import dataScienceImg from '@/assets/projects/data_science_image.avif';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';
import GithubRepoList from './GithubRepoList';
import { Language, siteContent } from '@/content/siteContent';
import { useInView, revealClass } from '@/hooks/useInView';

interface ProjectsSectionProps {
  language: Language;
}

const projectImages = [graphNeuralNetworkImg, timeSeriesImg, dataScienceImg];

const ProjectsSection = ({ language }: ProjectsSectionProps) => {
  const copy = siteContent[language].solutions;
  const [featured, ...rest] = copy.items;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="solutions" className="section-spacing bg-secondary/40 px-6 md:px-12 lg:px-24">
      <div ref={ref} className={`mx-auto max-w-6xl ${revealClass(isVisible)}`}>
        <SectionHeading title={copy.title} className="mb-4" />
        <p className="mb-14 max-w-[65ch] text-lg text-foreground/80 md:mb-16">{copy.intro}</p>

        <article className="mb-16 grid gap-8 md:grid-cols-12 md:items-start md:gap-10">
          <img
            src={projectImages[0]}
            alt={`Ilustração conceitual do projeto ${featured.title}`}
            className="aspect-[4/3] w-full rounded-md object-cover md:col-span-5"
            loading="lazy"
          />
          <div className="md:col-span-7">
            <div className="mb-3 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mb-5 font-display text-2xl font-semibold text-foreground">
              {featured.title}
            </h3>
            <dl className="space-y-4">
              <div>
                <dt className="mb-1 font-mono text-xs uppercase tracking-wide text-foreground/70">
                  {copy.labels.problem}
                </dt>
                <dd className="max-w-[60ch] text-foreground/80">{featured.problem}</dd>
              </div>
              <div>
                <dt className="mb-1 font-mono text-xs uppercase tracking-wide text-foreground/70">
                  {copy.labels.method}
                </dt>
                <dd className="max-w-[60ch] text-foreground/80">{featured.method}</dd>
              </div>
              <div>
                <dt className="mb-1 font-mono text-xs uppercase tracking-wide text-foreground/70">
                  {copy.labels.relevance}
                </dt>
                <dd className="max-w-[60ch] text-foreground/80">{featured.relevance}</dd>
              </div>
            </dl>
            {featured.githubLink && (
              <a
                href={featured.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-foreground hover:underline"
              >
                <SiGithub className="h-4 w-4" aria-hidden="true" />
                {copy.repositoryLabel}
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </article>

        <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-2 md:gap-12">
          {rest.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              problem={project.problem}
              method={project.method}
              relevance={project.relevance}
              tags={project.tags}
              imageUrl={projectImages[index + 1]}
              githubLink={project.githubLink}
              repositoryLabel={copy.repositoryLabel}
              labels={copy.labels}
            />
          ))}
        </div>

        <GithubRepoList
          language={language}
          excludeUrls={copy.items.map((item) => item.githubLink).filter((url): url is string => Boolean(url))}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
