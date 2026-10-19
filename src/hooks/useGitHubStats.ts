import { useEffect, useState } from 'react';

const GITHUB_USERNAME = 'edmar-bevilaqua';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export interface GitHubRepo {
  name: string;
  url: string;
  desc: string | null;
  lang: string | null;
  stars: number;
  fork: boolean;
  archived: boolean;
  pushed: string | null;
  homepage: string | null;
}

export interface ContributionCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionCalendar {
  cells: (ContributionCell | null | undefined)[];
  total: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  bestDayCount: number;
  bestDayDate: string | null;
  fromDate: string | null;
  toDate: string | null;
}

export interface GitHubTelemetryState {
  status: 'loading' | 'live' | 'fallback';
  publicRepos: number | null;
  repos: GitHubRepo[];
  calendar: ContributionCalendar | null;
}

function formatIsoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

function buildCalendarMetrics(
  entries: ContributionCell[],
  now = new Date()
): ContributionCalendar {
  const todayIso = formatIsoDate(now);
  const filtered = entries
    .filter((e) => e.date <= todayIso)
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  const dayOfWeek = now.getDay();
  const windowSize = 364 + dayOfWeek + 1;
  const recent = filtered.slice(-windowSize);

  const cells: (ContributionCell | null | undefined)[] = [
    ...Array.from({ length: Math.max(0, windowSize - recent.length) }, () => null),
    ...recent,
    ...Array.from({ length: 6 - dayOfWeek }, () => undefined),
  ];

  let total = 0;
  let activeDays = 0;
  let bestDayCount = 0;
  let bestDayDate: string | null = null;
  let longestStreak = 0;
  let runningStreak = 0;

  for (const item of recent) {
    total += item.count;
    if (item.count > 0) {
      activeDays++;
      runningStreak++;
      longestStreak = Math.max(longestStreak, runningStreak);
    } else {
      runningStreak = 0;
    }
    if (item.count > bestDayCount) {
      bestDayCount = item.count;
      bestDayDate = item.date;
    }
  }

  let currentStreak = 0;
  let idx = recent.length - 1;
  if (idx >= 0 && recent[idx].count === 0 && recent[idx].date === todayIso) {
    idx--;
  }
  while (idx >= 0 && recent[idx].count > 0) {
    currentStreak++;
    idx--;
  }

  return {
    cells,
    total,
    activeDays,
    currentStreak,
    longestStreak,
    bestDayCount,
    bestDayDate,
    fromDate: recent[0]?.date ?? null,
    toDate: recent[recent.length - 1]?.date ?? null,
  };
}

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.t < CACHE_TTL_MS) {
      return parsed.d as T;
    }
    return null;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data }));
  } catch {
    // Ignore storage quota errors
  }
}

async function fetchCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = readCache<T>(`bdl_gh:${GITHUB_USERNAME}:${key}`);
  if (cached) return cached;
  const fresh = await fetcher();
  writeCache(`bdl_gh:${GITHUB_USERNAME}:${key}`, fresh);
  return fresh;
}

export function useGitHubStats(): GitHubTelemetryState {
  const [state, setState] = useState<GitHubTelemetryState>(() => ({
    status: 'loading',
    publicRepos: null,
    repos: [],
    calendar: null,
  }));

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [profileRes, reposRes, calRes] = await Promise.allSettled([
        fetchCached('profile', async () => {
          const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            headers: { Accept: 'application/vnd.github+json' },
          });
          if (!res.ok) throw new Error(`GitHub profile ${res.status}`);
          return res.json();
        }),
        fetchCached('repos', async () => {
          const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
            { headers: { Accept: 'application/vnd.github+json' } }
          );
          if (!res.ok) throw new Error(`GitHub repos ${res.status}`);
          const data = await res.json();
          if (!Array.isArray(data)) throw new Error('Invalid repos payload');
          return data.map(
            (r: Record<string, unknown>): GitHubRepo => ({
              name: String(r.name || ''),
              url: String(r.html_url || `https://github.com/${GITHUB_USERNAME}`),
              desc: typeof r.description === 'string' ? r.description : null,
              lang: typeof r.language === 'string' ? r.language : null,
              stars: Number(r.stargazers_count) || 0,
              fork: Boolean(r.fork),
              archived: Boolean(r.archived),
              pushed: typeof r.pushed_at === 'string' ? r.pushed_at : null,
              homepage: typeof r.homepage === 'string' && r.homepage ? r.homepage : null,
            })
          );
        }),
        fetchCached('calendar', async () => {
          const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
          );
          if (!res.ok) throw new Error(`Contributions API ${res.status}`);
          const data = await res.json();
          if (!Array.isArray(data?.contributions)) {
            throw new Error('Invalid contributions payload');
          }
          return data.contributions.map(
            (c: Record<string, unknown>): ContributionCell => ({
              date: String(c.date || ''),
              count: Math.max(0, Number(c.count) || 0),
              level: Math.min(4, Math.max(0, Number(c.level) || 0)) as 0 | 1 | 2 | 3 | 4,
            })
          );
        }),
      ]);

      if (!mounted) return;

      const profile = profileRes.status === 'fulfilled' ? profileRes.value : null;
      const liveRepos =
        reposRes.status === 'fulfilled' && reposRes.value.length > 0
          ? reposRes.value
          : null;
      const liveCalRaw =
        calRes.status === 'fulfilled' && calRes.value.length > 0
          ? calRes.value
          : null;

      const calendar = liveCalRaw ? buildCalendarMetrics(liveCalRaw) : null;

      const publicRepos =
        typeof profile?.public_repos === 'number'
          ? profile.public_repos
          : null;

      const isLive = Boolean(profile || liveRepos || liveCalRaw);

      setState({
        status: isLive ? 'live' : 'fallback',
        publicRepos,
        repos: liveRepos ?? [],
        calendar,
      });
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
