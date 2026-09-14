import { useEffect, useState } from 'react';

export interface GithubRepo {
  id: number;
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
}

type Status = 'loading' | 'success' | 'error';

const GITHUB_USERNAME = 'edmar-bevilaqua';
const CACHE_KEY = `github-repos-${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 10 * 60 * 1000;

function readCache(): GithubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: { timestamp: number; repos: GithubRepo[] } = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null;
    return entry.repos;
  } catch {
    return null;
  }
}

function writeCache(repos: GithubRepo[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), repos }));
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — skip caching
  }
}

export function useGithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setRepos(cached);
      setStatus('success');
      return;
    }

    const controller = new AbortController();

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&per_page=100`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then((data: Array<Record<string, unknown>>) => {
        const mapped: GithubRepo[] = data
          .filter((repo) => !repo.fork && !repo.archived)
          .map((repo) => ({
            id: repo.id as number,
            name: repo.name as string,
            htmlUrl: repo.html_url as string,
            description: repo.description as string | null,
            language: repo.language as string | null,
            pushedAt: repo.pushed_at as string,
          }));
        setRepos(mapped);
        setStatus('success');
        writeCache(mapped);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setStatus('error');
      });

    return () => controller.abort();
  }, []);

  return { repos, status };
}
