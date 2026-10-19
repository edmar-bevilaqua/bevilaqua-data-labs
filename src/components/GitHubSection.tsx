import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { Language, siteContent } from '@/content/siteContent';
import { GitHubTelemetryState } from '@/hooks/useGitHubStats';
import { SectionNodeStation } from './SectionGraphSpine';

interface GitHubSectionProps {
  language: Language;
  telemetry: GitHubTelemetryState;
  isNodeActive?: boolean;
  isNodeCurrent?: boolean;
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'var(--heat-0)',
  1: 'var(--heat-1)',
  2: 'var(--heat-2)',
  3: 'var(--heat-3)',
  4: 'var(--heat-4)',
};

const GitHubSection: React.FC<GitHubSectionProps> = ({
  language,
  telemetry,
  isNodeActive = true,
  isNodeCurrent = false,
}) => {
  const copy = siteContent[language].github;
  const locale = language === 'pt' ? 'pt-BR' : 'en-US';
  const { calendar, repos, status } = telemetry;
  const heatmapScrollRef = useRef<HTMLDivElement>(null);
  const [inspectedCell, setInspectedCell] = useState<{
    count: number;
    date: string;
    level: number;
  } | null>(null);

  useEffect(() => {
    if (calendar && heatmapScrollRef.current) {
      const el = heatmapScrollRef.current;
      el.scrollLeft = el.scrollWidth;
    }
  }, [calendar]);

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

  const formatFullDate = (iso: string | null) => {
    if (!iso) return '';
    try {
      const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
      return d.toLocaleDateString(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const recentRepos = repos.filter((r) => !r.fork && !r.archived).slice(0, 4);
  const lastValidCellIndex = calendar?.cells.reduce(
    (lastIdx, cell, idx) => (cell ? idx : lastIdx),
    -1
  ) ?? -1;

  return (
    <section
      id="github"
      className="section-spacing px-4 sm:px-6 md:px-12 lg:px-24 relative border-t border-white/5 bg-secondary/20"
    >
      <SectionNodeStation
        sectionKey="github"
        language={language}
        isActive={isNodeActive}
        isCurrent={isNodeCurrent}
      >
        <div className="space-y-8 md:space-y-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-6">
            <div className="max-w-3xl space-y-3">
              <h2 className="section-heading">{copy.title}</h2>
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
                {copy.subtitle}
              </p>
            </div>

            <span className="self-start lg:self-auto rounded-md border border-dashed border-sky-400/40 bg-sky-400/10 px-3 py-1 font-mono text-xs text-sky-300 shrink-0">
              {status === 'live'
                ? copy.statusLive
                : status === 'loading'
                ? copy.statusLoading
                : copy.statusFallback}
            </span>
          </div>

          {/* Top KPIs Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-5 lg:gap-6">
            <div className="lg:col-span-5">
              <b className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-sky-400 block leading-none">
                {calendar ? calendar.total.toLocaleString(locale) : '—'}
              </b>
              <span className="mt-2 block text-sm md:text-base text-foreground/65">
                {copy.totalLabel}
              </span>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              <div className="bg-card p-3.5 sm:p-4">
                <b className="font-display text-xl sm:text-2xl font-bold tabular-nums text-foreground block">
                  {calendar?.activeDays ?? '—'}
                </b>
                <span className="text-xs text-foreground/60">{copy.activeDaysLabel}</span>
              </div>
              <div className="bg-card p-3.5 sm:p-4">
                <b className="font-display text-xl sm:text-2xl font-bold tabular-nums text-emerald-400 block">
                  {calendar?.currentStreak ?? '—'}
                </b>
                <span className="text-xs text-foreground/60">{copy.currentStreakLabel}</span>
              </div>
              <div className="bg-card p-3.5 sm:p-4">
                <b className="font-display text-xl sm:text-2xl font-bold tabular-nums text-foreground block">
                  {calendar?.longestStreak ?? '—'}
                </b>
                <span className="text-xs text-foreground/60">{copy.longestStreakLabel}</span>
              </div>
              <div className="bg-card p-3.5 sm:p-4">
                <b className="font-display text-xl sm:text-2xl font-bold tabular-nums text-sky-300 block">
                  {calendar?.bestDayCount ?? '—'}
                </b>
                <span className="text-xs text-foreground/60 truncate block">
                  {calendar?.bestDayDate
                    ? `${copy.bestDayLabel} · ${formatDayMonth(calendar.bestDayDate)}`
                    : copy.bestDayLabel}
                </span>
              </div>
            </div>
          </div>

          {/* 53-Week Contribution Heatmap */}
          <div
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setInspectedCell(null)}
            className="spotlight-card rounded-2xl p-4 sm:p-5 md:p-6 space-y-3"
          >
            {calendar ? (
              <>
                <div ref={heatmapScrollRef} className="overflow-x-auto pb-1">
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
                          onPointerEnter={() => setInspectedCell(cell)}
                          onPointerDown={() => setInspectedCell(cell)}
                          className={`aspect-square cursor-pointer rounded-[2px] transition-transform hover:scale-125 ${
                            isToday ? 'ring-1 ring-foreground ring-offset-1 ring-offset-background' : ''
                          }`}
                          style={{ backgroundColor: LEVEL_COLORS[cell.level] }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-foreground/55 pt-1">
                  <span>
                    {calendar.fromDate && calendar.toDate
                      ? `${formatMonthYear(calendar.fromDate)} — ${formatMonthYear(calendar.toDate)}`
                      : ''}
                  </span>

                  {inspectedCell ? (
                    <span className="inline-flex items-center gap-2 rounded-md border border-sky-400/35 bg-background/90 px-2.5 py-0.5 text-foreground/90">
                      <i
                        className="inline-block h-2.5 w-2.5 rounded-[2px]"
                        style={{ backgroundColor: LEVEL_COLORS[inspectedCell.level] }}
                      />
                      <b className="text-sky-300">
                        {inspectedCell.count}{' '}
                        {inspectedCell.count === 1
                          ? copy.contributionSingular
                          : copy.contributionPlural}
                      </b>
                      <span className="text-foreground/55">
                        · {formatFullDate(inspectedCell.date)}
                      </span>
                    </span>
                  ) : (
                    <span className="text-foreground/45 hidden sm:inline">
                      {language === 'pt'
                        ? 'Passe o mouse ou toque em um dia para inspecionar'
                        : 'Hover or tap a day to inspect'}
                    </span>
                  )}

                  <span>{copy.todayLabel}</span>
                </div>
              </>
            ) : (
              <p className="flex min-h-40 items-center justify-center text-sm text-foreground/60">
                {status === 'loading' ? copy.statusLoading : copy.contributionsUnavailable}
              </p>
            )}
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
      </SectionNodeStation>
    </section>
  );
};

export default GitHubSection;
