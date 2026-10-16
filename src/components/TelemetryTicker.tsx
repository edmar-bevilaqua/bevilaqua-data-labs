import React from 'react';
import { Language, siteContent } from '@/content/siteContent';
import { GitHubRepo } from '@/hooks/useGitHubStats';

interface TelemetryTickerProps {
  language: Language;
  repos: GitHubRepo[];
}

const DOT_COLORS = ['#0284c7', '#38bdf8', '#34d399', '#818cf8'];

const TelemetryTicker: React.FC<TelemetryTickerProps> = ({ language, repos }) => {
  const staticItems = siteContent[language].ticker;

  const formatShortDate = (iso: string | null) => {
    if (!iso) return 'active';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
        day: '2-digit',
        month: 'short',
      });
    } catch {
      return 'active';
    }
  };

  const repoItems = repos
    .filter((r) => !r.fork && !r.archived)
    .slice(0, 5)
    .map((r, i) => ({
      hash: formatShortDate(r.pushed),
      scope: `repo(${r.name})`,
      msg: r.desc
        ? r.desc.length > 68
          ? `${r.desc.slice(0, 68)}…`
          : r.desc
        : r.lang || 'data-engineering',
      color: DOT_COLORS[i % DOT_COLORS.length],
    }));

  const curatedItems = staticItems.map((item, i) => ({
    hash: `0x${((i + 1) * 2654435761 >>> 0).toString(16).slice(0, 6)}`,
    scope: item.scope,
    msg: item.msg,
    color: DOT_COLORS[(i + 2) % DOT_COLORS.length],
  }));

  // Interleave curated pipeline telemetry with live GitHub repository items
  const combined = [...curatedItems, ...repoItems];
  const loopItems = [...combined, ...combined];

  return (
    <div
      aria-hidden="true"
      className="ticker-mask relative z-10 overflow-hidden border-y border-white/10 bg-background/95 py-3.5"
    >
      <div className="ticker-track gap-10">
        {loopItems.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-xs md:text-[13px] text-foreground/60"
          >
            <i
              className="inline-block h-2.5 w-2.5 rounded-[2px] shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <b className="font-medium text-sky-400">{item.hash}</b>
            <em className="not-italic text-foreground/95 font-medium">{item.scope}:</em>
            <span>{item.msg}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TelemetryTicker;
