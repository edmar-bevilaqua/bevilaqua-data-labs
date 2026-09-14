
import React from 'react';
import { SiGithub } from 'react-icons/si';

interface ProjectCardProps {
  title: string;
  problem: string;
  method: string;
  relevance: string;
  tags: string[];
  imageUrl: string;
  githubLink?: string;
  repositoryLabel: string;
  labels: { problem: string; method: string; relevance: string };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  problem,
  method,
  relevance,
  tags,
  imageUrl,
  githubLink,
  repositoryLabel,
  labels,
}) => {
  return (
    <article className="flex flex-col">
      <img
        src={imageUrl}
        alt={`Ilustração conceitual do projeto ${title}`}
        className="mb-5 aspect-[16/10] w-full rounded-md object-cover"
        loading="lazy"
      />
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mb-3 font-display text-lg font-semibold text-foreground">{title}</h3>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="mb-1 font-mono text-[11px] uppercase tracking-wide text-foreground/70">
            {labels.problem}
          </dt>
          <dd className="text-foreground/75">{problem}</dd>
        </div>
        <div>
          <dt className="mb-1 font-mono text-[11px] uppercase tracking-wide text-foreground/70">
            {labels.method}
          </dt>
          <dd className="text-foreground/75">{method}</dd>
        </div>
        <div>
          <dt className="mb-1 font-mono text-[11px] uppercase tracking-wide text-foreground/70">
            {labels.relevance}
          </dt>
          <dd className="text-foreground/75">{relevance}</dd>
        </div>
      </dl>
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-foreground hover:underline"
        >
          <SiGithub className="h-3.5 w-3.5" aria-hidden="true" />
          {repositoryLabel}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
};

export default ProjectCard;
