import React from 'react';
import { ArrowUpRight, GitCommitHorizontal, Star, Terminal } from 'lucide-react';
import { Language, siteContent } from '@/content/siteContent';
import { GitHubTelemetryState } from '@/hooks/useGitHubStats';

interface GitHubSectionProps {
  language: Language;
  telemetry: GitHubTelemetryState;
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'var(--heat-0)',
  1: 'var(--heat-1)',
  2: 'var(--heat-2)',
  3: 'var(--heat-3)',
  4: 'var(--heat-4)',
};

const GitHubSection: React.FC<GitHubSectionProps> = ({ language, telemetry }) => {
  const copy = siteContent[language].github;
  const locale = language === 'pt' ? 'pt-BR' : 'en-US';
  const { calendar, repos, status } = telemetry;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const formatMonthYear = (iso: string | null) => {
    if (!iso) return '';
    try {
      const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
      return d.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
    } catch {
      return '';
    }
  };

  const formatDayMonth = (iso: string | null) => {
    if (!iso) return '';
    try {
      const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
      return d.toLocaleDateString(locale, { day: '2-digit', month: 'short' });
    } catch {
      return '';
    }
  };

  const recentRepos = repos.filter((r) => !r.fork && !r.archived).slice(0, 4);
  const lastValidCellIndex = calendar.cells.reduce(
    (lastIdx, cell, idx) => (cell ? idx : lastIdx),
    -1
  );

  return (
    <section
      id="github"
      className="section-spacing px-6 md:px-12 lg:px-24 relative border-t border-white/5 bg-secondary/20"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="section-kicker">
              <span>{copy.kicker}</span>
              <span className="rounded-md border border-dashed border-sky-400/40 bg-sky-400/10 px-2.5 py-0.5 font-mono text-[11px] lowercase text-sky-300">
                {status === 'live'
                  ? copy.statusLive
                  : status === 'loading'
                  ? copy.statusLoading
                  : copy.statusFallback}
              </span>
            </div>
            <h2 className="section-heading">{copy.title}</h2>
            <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-background/85 px-4 py-3 font-mono text-xs shrink-0 space-y-1">
            <div className="flex items-center justify-between gap-6 text-foreground/50">
              <span className="inline-flex items-center gap-1.5 text-sky-400 font-medium">
                <Terminal className="h-3.5 w-3.5" />
                {copy.telemetryHash}
              </span>
              <span>{copy.telemetryStep}</span>
            </div>
            <div className="text-foreground/85 flex items-center gap-1.5">
              <GitCommitHorizontal className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">chore(github):</span>{' '}
              <span>@edmar-bevilaqua</span>
            </div>
          </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6">
          <div className="lg:col-span-5">
            <b className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-sky-400 block leading-none">
              {calendar.total.toLocaleString(locale)}
            </b>
            <span className="mt-2 block text-sm md:text-base text-foreground/65">
              {copy.totalLabel}
            </span>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            <div className="bg-card p-4">
              <b className="font-display text-2xl font-bold tabular-nums text-foreground block">
                {calendar.activeDays}
              </b>
              <span className="text-xs text-foreground/60">{copy.activeDaysLabel}</span>
            </div>
            <div className="bg-card p-4">
              <b className="font-display text-2xl font-bold tabular-nums text-emerald-400 block">
                {calendar.currentStreak}
              </b>
              <span className="text-xs text-foreground/60">{copy.currentStreakLabel}</span>
            </div>
            <div className="bg-card p-4">
              <b className="font-display text-2xl font-bold tabular-nums text-foreground block">
                {calendar.longestStreak}
              </b>
              <span className="text-xs text-foreground/60">{copy.longestStreakLabel}</span>
            </div>
            <div className="bg-card p-4">
              <b className="font-display text-2xl font-bold tabular-nums text-sky-300 block">
                {calendar.bestDayCount}
              </b>
              <span className="text-xs text-foreground/60 truncate block">
                {calendar.bestDayDate
                  ? `${copy.bestDayLabel} · ${formatDayMonth(calendar.bestDayDate)}`
                  : copy.bestDayLabel}
              </span>
            </div>
          </div>
        </div>

        {/* 53-Week Contribution Heatmap */}
        <div
          onPointerMove={handlePointerMove}
          className="spotlight-card rounded-2xl p-5 md:p-6 space-y-3"
        >
          <div className="overflow-x-auto pb-1">
            <div
              role="img"
              aria-label={copy.heatmapLabel}
              className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[680px] w-full"
              style={{ gridTemplateColumns: 'repeat(53, minmax(0, 1fr))' }}
            >
              {calendar.cells.map((cell, idx) => {
                if (cell === undefined) {
                  return <i key={idx} className="aspect-square invisible" />;
                }
                if (cell === null) {
                  return (
                    <i
                      key={idx}
                      className="aspect-square rounded-[2px]"
                      style={{ backgroundColor: LEVEL_COLORS[0] }}
                    />
                  );
                }
                const isToday = idx === lastValidCellIndex;
                const label = `${cell.count} ${
                  cell.count === 1 ? copy.contributionSingular : copy.contributionPlural
                } · ${cell.date}`;

                return (
                  <i
                    key={idx}
                    title={label}
                    className={`aspect-square rounded-[2px] transition-transform hover:scale-125 ${
                      isToday ? 'ring-1 ring-foreground ring-offset-1 ring-offset-background' : ''
                    }`}
                    style={{ backgroundColor: LEVEL_COLORS[cell.level] }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-xs text-foreground/55 pt-1">
            <span>
              {calendar.fromDate && calendar.toDate
                ? `${formatMonthYear(calendar.fromDate)} — ${formatMonthYear(calendar.toDate)}`
                : ''}
            </span>
            <span>{copy.todayLabel}</span>
          </div>
        </div>

        {/* Recently Updated Repositories Grid */}
        {recentRepos.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-wider text-foreground/60">
                {copy.recentReposLabel}
              </p>
              <a
                href="https://github.com/edmar-bevilaqua?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-sky-400 hover:underline"
              >
                {copy.viewAllLabel}
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerMove={handlePointerMove}
                  className="spotlight-card spotlight-lift rounded-xl p-5 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <b className="font-mono text-sm md:text-base font-semibold text-sky-400 truncate">
                        {repo.name}
                      </b>
                      <ArrowUpRight className="h-4 w-4 text-foreground/40 shrink-0" />
                    </div>
                    {repo.desc && (
                      <p className="text-xs md:text-sm text-foreground/70 line-clamp-2 leading-relaxed">
                        {repo.desc}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs text-foreground/50 pt-1">
                    {repo.lang && <span className="text-foreground/75">{repo.lang}</span>}
                    {repo.stars > 0 && (
                      <span className="inline-flex items-center gap-1 text-amber-300">
                        <Star className="h-3 w-3 fill-amber-300" />
                        {repo.stars}
                      </span>
                    )}
                    {repo.pushed && <span>{formatMonthYear(repo.pushed)}</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubSection;
