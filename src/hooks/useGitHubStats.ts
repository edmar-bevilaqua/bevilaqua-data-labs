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
  publicRepos: number;
  repos: GitHubRepo[];
  calendar: ContributionCalendar;
}

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    name: 'anti-money-laundering-project',
    url: 'https://github.com/edmar-bevilaqua/anti-money-laundering-project',
    desc: 'Graph Neural Networks (PyTorch Geometric) applied to detect suspicious patterns in synthetic financial transaction networks.',
    lang: 'Jupyter Notebook',
    stars: 1,
    fork: false,
    archived: false,
    pushed: '2026-08-15T12:00:00Z',
    homepage: null,
  },
  {
    name: 'store-sales-tsf-kaggle-competition',
    url: 'https://github.com/edmar-bevilaqua/store-sales-tsf-kaggle-competition',
    desc: 'Ensemble learning and feature engineering pipeline for multi-store retail demand time-series forecasting.',
    lang: 'Jupyter Notebook',
    stars: 1,
    fork: false,
    archived: false,
    pushed: '2026-07-20T12:00:00Z',
    homepage: null,
  },
  {
    name: 'data_science',
    url: 'https://github.com/edmar-bevilaqua/data_science',
    desc: 'Collection of data science, machine learning, deep learning, statistical analysis and visualization studies.',
    lang: 'Python',
    stars: 2,
    fork: false,
    archived: false,
    pushed: '2026-09-10T12:00:00Z',
    homepage: null,
  },
  {
    name: 'bevilaqua-data-labs',
    url: 'https://github.com/edmar-bevilaqua/bevilaqua-data-labs',
    desc: 'Bevilaqua Data Labs technical portfolio and applied Data Science & AI engineering showcase.',
    lang: 'TypeScript',
    stars: 1,
    fork: false,
    archived: false,
    pushed: new Date().toISOString(),
    homepage: 'https://edmar-bevilaqua.github.io/bevilaqua-data-labs/',
  },
];

function formatIsoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

function generateDeterministicCalendar(): ContributionCalendar {
  const today = new Date();
  const raw: ContributionCell[] = [];
  let seed = 421337;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 365; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const r = rand();
    const activeProb = isWeekend ? 0.35 : 0.68;
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (r < activeProb) {
      const intensity = rand();
      if (intensity < 0.4) {
        count = 1 + Math.floor(rand() * 2);
        level = 1;
      } else if (intensity < 0.72) {
        count = 3 + Math.floor(rand() * 3);
        level = 2;
      } else if (intensity < 0.92) {
        count = 6 + Math.floor(rand() * 5);
        level = 3;
      } else {
        count = 11 + Math.floor(rand() * 8);
        level = 4;
      }
    }

    raw.push({
      date: formatIsoDate(d),
      count,
      level,
    });
  }

  return buildCalendarMetrics(raw, today);
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
    publicRepos: FALLBACK_REPOS.length,
    repos: FALLBACK_REPOS,
    calendar: generateDeterministicCalendar(),
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

      const calendar = liveCalRaw
        ? buildCalendarMetrics(liveCalRaw)
        : generateDeterministicCalendar();

      const repos = liveRepos || FALLBACK_REPOS;
      const publicRepos =
        typeof profile?.public_repos === 'number' && profile.public_repos > 0
          ? profile.public_repos
          : repos.filter((r) => !r.fork).length;

      const isLive = Boolean(profile || liveRepos || liveCalRaw);

      setState({
        status: isLive ? 'live' : 'fallback',
        publicRepos,
        repos,
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
