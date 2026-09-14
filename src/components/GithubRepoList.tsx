import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { enUS } from 'date-fns/locale/en-US';
import { SiGithub } from 'react-icons/si';
import { Language, siteContent } from '@/content/siteContent';
import { useGithubRepos } from '@/hooks/useGithubRepos';

interface GithubRepoListProps {
  language: Language;
  excludeUrls: string[];
}

const GITHUB_PROFILE_URL = 'https://github.com/edmar-bevilaqua';
const MAX_VISIBLE = 6;

const GithubRepoList = ({ language, excludeUrls }: GithubRepoListProps) => {
  const copy = siteContent[language].solutions.repoList;
  const { repos, status } = useGithubRepos();
  const locale = language === 'pt' ? ptBR : enUS;
  const visible = repos.filter((repo) => !excludeUrls.includes(repo.htmlUrl)).slice(0, MAX_VISIBLE);

  return (
    <div className="mt-16 border-t border-border pt-12">
      <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{copy.title}</h3>
      <p className="mb-8 max-w-[65ch] text-foreground/70">{copy.intro}</p>

      {status === 'loading' && (
        <ul className="divide-y divide-border border-t border-border">
          {[0, 1, 2].map((i) => (
            <li key={i} className="animate-pulse py-4">
              <div className="mb-2 h-4 w-48 rounded bg-secondary" />
              <div className="h-3 w-72 max-w-full rounded bg-secondary" />
            </li>
          ))}
        </ul>
      )}

      {status === 'error' && <p className="text-sm text-foreground/70">{copy.error}</p>}

      {status === 'success' && visible.length > 0 && (
        <ul className="divide-y divide-border border-t border-border">
          {visible.map((repo) => (
            <li key={repo.id} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-muted-foreground"
                >
                  {repo.name}
                </a>
                <span className="font-mono text-xs text-foreground/70">
                  {repo.language ? `${repo.language} · ` : ''}
                  {formatDistanceToNow(new Date(repo.pushedAt), { addSuffix: true, locale })}
                </span>
              </div>
              {repo.description && <p className="mt-1 text-sm text-foreground/70">{repo.description}</p>}
            </li>
          ))}
        </ul>
      )}

      {status === 'success' && visible.length === 0 && (
        <p className="text-sm text-foreground/70">{copy.empty}</p>
      )}

      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-foreground hover:underline"
      >
        <SiGithub className="h-4 w-4" aria-hidden="true" />
        {copy.viewAll}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
};

export default GithubRepoList;
