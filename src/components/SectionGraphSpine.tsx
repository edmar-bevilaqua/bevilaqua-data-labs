import React, { useEffect, useRef, useState } from 'react';
import { Language, siteContent } from '@/content/siteContent';

type SectionKey = 'inicio' | 'about' | 'services' | 'solutions' | 'github' | 'contact';

const SECTION_INDEX: Record<SectionKey, number> = {
  inicio: 0,
  about: 1,
  services: 2,
  solutions: 3,
  github: 4,
  contact: 5,
};

function getNodeLabel(sectionKey: SectionKey, language: Language): string {
  const copy = siteContent[language];
  switch (sectionKey) {
    case 'inicio':
      return language === 'pt' ? '00. Início' : '00. Home';
    case 'about':
      return copy.about.kicker;
    case 'services':
      return copy.services.kicker;
    case 'solutions':
      return copy.solutions.kicker;
    case 'github':
      return copy.github.kicker;
    case 'contact':
      return copy.contact.kicker;
  }
}

interface CommitSquareParticle {
  tx: string;
  ty: string;
  rot: string;
  size: number;
  color: string;
  delayMs: number;
}

// 14 GitHub-style "commit squares" that burst radially when a section node turns ON
const COMMIT_BURST_SQUARES: CommitSquareParticle[] = [
  { tx: '-26px', ty: '-22px', rot: '-115deg', size: 5.5, color: '#34d399', delayMs: 0 },
  { tx: '-8px', ty: '-32px', rot: '85deg', size: 6, color: '#22E4F5', delayMs: 15 },
  { tx: '14px', ty: '-30px', rot: '140deg', size: 5, color: '#38bdf8', delayMs: 10 },
  { tx: '30px', ty: '-18px', rot: '-95deg', size: 6.5, color: '#34d399', delayMs: 25 },
  { tx: '36px', ty: '-2px', rot: '160deg', size: 5, color: '#0284c7', delayMs: 5 },
  { tx: '32px', ty: '16px', rot: '-130deg', size: 6, color: '#22E4F5', delayMs: 30 },
  { tx: '18px', ty: '28px', rot: '110deg', size: 5.5, color: '#34d399', delayMs: 20 },
  { tx: '0px', ty: '32px', rot: '-75deg', size: 4.5, color: '#38bdf8', delayMs: 35 },
  { tx: '-18px', ty: '26px', rot: '125deg', size: 5.5, color: '#10b981', delayMs: 15 },
  { tx: '-28px', ty: '8px', rot: '-150deg', size: 5, color: '#38bdf8', delayMs: 25 },
  { tx: '22px', ty: '-10px', rot: '70deg', size: 4.5, color: '#6ee7b7', delayMs: 40 },
  { tx: '-16px', ty: '-14px', rot: '-60deg', size: 4.5, color: '#22E4F5', delayMs: 30 },
  { tx: '24px', ty: '8px', rot: '95deg', size: 5, color: '#34d399', delayMs: 45 },
  { tx: '8px', ty: '-18px', rot: '-110deg', size: 4.5, color: '#0284c7', delayMs: 20 },
];

interface SectionNodeStationProps {
  sectionKey: SectionKey;
  language: Language;
  isActive: boolean;
  isCurrent: boolean;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Wraps a section's inner `max-w-7xl` content with a Graph Node anchor on the left rail,
 * a horizontal branch edge (`●───`), the section title label directly on the node,
 * a GitHub commit-square particle burst when activated, and bidirectional content reveal.
 */
export const SectionNodeStation: React.FC<SectionNodeStationProps> = ({
  sectionKey,
  language,
  isActive,
  isCurrent,
  headerRight,
  children,
}) => {
  const nodeIndex = SECTION_INDEX[sectionKey];
  const label = getNodeLabel(sectionKey, language);

  // Trigger the commit-square explosion whenever the node transitions from OFF -> ON
  const prevActiveRef = useRef<boolean>(false);
  const [burstKey, setBurstKey] = useState<number>(0);

  useEffect(() => {
    if (isActive && !prevActiveRef.current) {
      setBurstKey((prev) => prev + 1);
    }
    prevActiveRef.current = isActive;
  }, [isActive]);

  const handleScrollToNode = () => {
    if (sectionKey === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const sectionEl = document.getElementById(sectionKey);
    if (sectionEl) {
      window.scrollTo({
        top: Math.max(0, sectionEl.offsetTop - 72),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl pl-6 sm:pl-11 md:pl-14">
      {/* Node Header Row: Graph Node + Horizontal Edge + Section Label */}
      <div className="relative mb-3 sm:mb-4 flex min-h-[24px] items-center justify-between gap-3">
        {/* Left Graph Node Station (Collinear across all sections at left-0 of max-w-7xl) */}
        <div className="absolute -left-6 sm:-left-11 md:-left-14 top-1/2 -translate-y-1/2 z-20 flex items-center">
          {/* The Graph Node (Nó) — Clickable to jump/scroll to section */}
          <button
            type="button"
            onClick={handleScrollToNode}
            aria-label={label}
            data-spine-node={nodeIndex}
            className="group relative flex h-5 w-5 sm:h-6 sm:w-6 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {/* Commit-Squares Explosion when Node is turned ON */}
            {isActive && burstKey > 0 && (
              <div
                key={burstKey}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-visible"
              >
                <span className="animate-commit-ring absolute inset-0 rounded-full border-2 border-emerald-400/80 shadow-[0_0_12px_#34d399]" />
                {COMMIT_BURST_SQUARES.map((sq, idx) => (
                  <i
                    key={idx}
                    className="animate-commit-particle absolute left-1/2 top-1/2 block rounded-[2px]"
                    style={
                      {
                        width: `${sq.size}px`,
                        height: `${sq.size}px`,
                        backgroundColor: sq.color,
                        boxShadow: `0 0 6px ${sq.color}`,
                        animationDelay: `${sq.delayMs}ms`,
                        '--tx': sq.tx,
                        '--ty': sq.ty,
                        '--rot': sq.rot,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}

            {/* Outer Pulse Ring when activated */}
            <span
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isActive
                  ? 'scale-150 bg-cyan-400/20 opacity-100'
                  : 'scale-75 bg-transparent opacity-0 group-hover:scale-125 group-hover:bg-sky-400/15 group-hover:opacity-100'
              }`}
            />
            {isActive && isCurrent && (
              <span className="absolute -inset-1 rounded-full border border-cyan-300/60 animate-ping" />
            )}

            {/* Node Ring */}
            <span
              className={`relative flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 transition-all duration-400 ${
                isActive
                  ? 'border-[#22E4F5] bg-[#0B0F19] shadow-[0_0_16px_rgba(34,228,245,0.75)]'
                  : 'border-slate-700/80 bg-[#0B0F19] group-hover:border-sky-400/70'
              }`}
            >
              {/* Node Core */}
              <span
                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-400 ${
                  isActive
                    ? isCurrent
                      ? 'scale-110 bg-emerald-400 shadow-[0_0_8px_#34d399]'
                      : 'scale-100 bg-[#22E4F5] shadow-[0_0_8px_#22E4F5]'
                    : 'scale-75 bg-slate-700 group-hover:bg-sky-400'
                }`}
              />
            </span>
          </button>

          {/* Horizontal Branch Edge (Aresta Horizontal do Nó para o Texto da Seção) */}
          <div className="pointer-events-none hidden sm:flex items-center">
            <div className="relative h-[2px] w-3.5 md:w-6 overflow-hidden bg-slate-800/90">
              <div
                className={`h-full w-full origin-left bg-gradient-to-r from-[#22E4F5] to-emerald-400 transition-transform duration-400 ease-out ${
                  isActive ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </div>
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-400 ${
                isActive ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-slate-800'
              }`}
            />
          </div>
        </div>

        {/* Section Label on the Node (Clickable Clean Sans-Serif, Natural Case & Spacing) */}
        <button
          type="button"
          onClick={handleScrollToNode}
          className={`ml-2 cursor-pointer text-left font-sans text-xs sm:text-sm md:text-base font-semibold tracking-normal transition-colors duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded ${
            isActive
              ? 'text-sky-400 hover:text-sky-300'
              : 'text-foreground/45 hover:text-sky-400/85'
          }`}
        >
          {label}
        </button>

        {headerRight && <div className="shrink-0">{headerRight}</div>}
      </div>

      {/* Progressive Content Block (loads onto screen when Node is active, turns off when light exits upward) */}
      <div
        className={`transition-all duration-500 ease-out will-change-[opacity,transform,filter] ${
          isActive
            ? 'opacity-100 translate-y-0 scale-100 blur-0'
            : 'opacity-15 translate-y-4 scale-[0.985] blur-[2px] pointer-events-none select-none'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

interface SectionGraphSpineProps {
  mainRef: React.RefObject<HTMLElement>;
  onReachNode: (reachedIdx: number) => void;
}

/**
 * Renders the continuous vertical edge connecting all section nodes (00 -> 05)
 * and animates the traveling light orb along the edge as the user scrolls down or up.
 */
export const SectionGraphSpine: React.FC<SectionGraphSpineProps> = ({
  mainRef,
  onReachNode,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const litEdgeRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<{
    x: number;
    startY: number;
    endY: number;
    nodeYs: number[];
  } | null>(null);

  const nodeYsRef = useRef<number[]>([]);
  const currentIdxRef = useRef<number>(0);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const measureNodes = () => {
      if (!mainEl) return;
      const mainRect = mainEl.getBoundingClientRect();
      const nodeEls = Array.from(
        mainEl.querySelectorAll<HTMLElement>('[data-spine-node]')
      ).sort(
        (a, b) =>
          Number(a.getAttribute('data-spine-node')) -
          Number(b.getAttribute('data-spine-node'))
      );

      if (nodeEls.length === 0) return;

      const firstRect = nodeEls[0].getBoundingClientRect();
      const x = firstRect.left - mainRect.left + firstRect.width / 2;
      const nodeYs = nodeEls.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top - mainRect.top + r.height / 2;
      });

      nodeYsRef.current = nodeYs;
      setGeometry({
        x,
        startY: nodeYs[0],
        endY: nodeYs[nodeYs.length - 1],
        nodeYs,
      });
    };

    measureNodes();

    const resizeObs = new ResizeObserver(() => {
      measureNodes();
    });
    resizeObs.observe(mainEl);
    window.addEventListener('resize', measureNodes, { passive: true });

    return () => {
      resizeObs.disconnect();
      window.removeEventListener('resize', measureNodes);
    };
  }, [mainRef]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      onReachNode(5);
      return;
    }

    let animId = 0;
    let currentBeamY = nodeYsRef.current[0] || 0;
    let targetBeamY = currentBeamY;
    let lastTime = 0;

    const computeTargetBeam = () => {
      const mainEl = mainRef.current;
      const ys = nodeYsRef.current;
      if (!mainEl || ys.length === 0) return;

      const startY = ys[0];
      const endY = ys[ys.length - 1];
      const scrollY = Math.max(0, window.scrollY);
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      const mainTopDoc = mainEl.getBoundingClientRect().top + scrollY;
      const scrollRatio = Math.min(1, scrollY / maxScroll);
      const readingHorizonLocalY =
        scrollY +
        window.innerHeight * (0.5 + 0.38 * Math.pow(scrollRatio, 1.45)) -
        mainTopDoc;

      // Smoothly ramp from startY at scrollY=0 so there is no jump near the top of the page
      const topRamp = Math.min(1, scrollY / 180);
      const rawLocalY = startY + (readingHorizonLocalY - startY) * topRamp;

      targetBeamY = Math.max(startY, Math.min(endY, rawLocalY));
    };

    const tick = (now: number) => {
      const ys = nodeYsRef.current;
      if (ys.length > 0) {
        const dtSec =
          lastTime > 0 ? Math.min(0.04, Math.max(0.001, (now - lastTime) / 1000)) : 1 / 60;
        lastTime = now;

        computeTargetBeam();

        const diff = targetBeamY - currentBeamY;
        const maxSpeedPxPerSec = 1600;
        const lerpFactor = 1 - Math.pow(1 - 0.18, dtSec * 60);
        const rawStep = diff * lerpFactor;
        const maxStep = maxSpeedPxPerSec * dtSec;
        const clampedStep =
          Math.abs(rawStep) > maxStep ? Math.sign(rawStep) * maxStep : rawStep;

        currentBeamY += clampedStep;

        const startY = ys[0];
        const endY = ys[ys.length - 1];
        const clampedBeamY = Math.max(startY, Math.min(endY, currentBeamY));
        const litHeight = Math.max(0, clampedBeamY - startY);

        if (litEdgeRef.current) {
          litEdgeRef.current.style.height = `${litHeight}px`;
        }
        if (orbRef.current) {
          orbRef.current.style.transform = `translate3d(-50%, ${litHeight}px, 0)`;
        }

        // Determine which nodes are currently at or above the traveling light beam
        let reachedIdx = 0;
        for (let i = 0; i < ys.length; i++) {
          if (clampedBeamY >= ys[i] - 8) {
            reachedIdx = i;
          }
        }

        if (reachedIdx !== currentIdxRef.current) {
          currentIdxRef.current = reachedIdx;
          onReachNode(reachedIdx);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    computeTargetBeam();
    currentBeamY = nodeYsRef.current[0] || 0;
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [mainRef, onReachNode]);

  if (!geometry || geometry.endY <= geometry.startY) return null;

  const totalHeight = geometry.endY - geometry.startY;

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-10"
      style={{
        transform: `translate3d(${geometry.x}px, ${geometry.startY}px, 0)`,
        height: `${totalHeight}px`,
      }}
    >
      {/* Dormant Vertical Edge (Base Graph Connection) */}
      <div className="absolute left-0 top-0 h-full w-[2px] -translate-x-1/2 bg-slate-800/90" />
      <div
        className="absolute left-0 top-0 h-full w-[2px] -translate-x-1/2 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(148,163,184,0.35) 0px, rgba(148,163,184,0.35) 4px, transparent 4px, transparent 10px)',
        }}
      />

      {/* Energized Lit Vertical Edge following the Light */}
      <div
        ref={litEdgeRef}
        className="absolute left-0 top-0 w-[2.5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-400 via-[#22E4F5] to-emerald-400 shadow-[0_0_12px_rgba(34,228,245,0.65)]"
        style={{ height: 0 }}
      />

      {/* Traveling Light Pulse (Photon Orb + Comet Trail) */}
      <div
        ref={orbRef}
        className="absolute left-0 top-0 -translate-x-1/2"
        style={{ transform: 'translate3d(-50%, 0px, 0)' }}
      >
        {/* Trailing Light Comet */}
        <div className="absolute bottom-0 left-1/2 h-20 w-[3px] -translate-x-1/2 bg-gradient-to-t from-[#22E4F5] via-sky-400/50 to-transparent blur-[0.5px]" />

        {/* Outer Ambient Glow */}
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22E4F5]/30 blur-md" />

        {/* Mid Energy Ring */}
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#22E4F5] bg-[#22E4F5]/40 shadow-[0_0_16px_#22E4F5]" />

        {/* Photon Core */}
        <div className="relative h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_20px_#22E4F5]" />
      </div>
    </div>
  );
};
