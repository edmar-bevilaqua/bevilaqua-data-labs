import React, { useEffect, useRef, useState } from 'react';
import { Language, siteContent } from '@/content/siteContent';

interface DataGraphCanvasProps {
  language: Language;
  initialCount: number | null;
}

// 5x7 pixel font bitmaps for spelling "BEVILAQUA DATA LABS" in the telemetry matrix
const PIXEL_FONT: Record<string, string[]> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
};

const PALETTE = ['#111827', '#0c4a6e', '#0284c7', '#38bdf8', '#34d399'];

function buildBitmap(lines: string[]) {
  const charAdvance = (ch: string) => (ch === ' ' ? 3 : 6);
  const lineWidths = lines.map(
    (line) => [...line].reduce((acc, ch) => acc + charAdvance(ch), 0) - 1
  );
  const w = Math.max(...lineWidths);
  const h = lines.length * 7 + (lines.length - 1) * 3;
  const bm = new Uint8Array(w * h);

  lines.forEach((line, lineIdx) => {
    let offsetX = Math.floor((w - lineWidths[lineIdx]) / 2);
    const offsetY = lineIdx * 10;
    for (const ch of line) {
      const glyph = PIXEL_FONT[ch];
      if (glyph) {
        for (let r = 0; r < 7; r++) {
          for (let c = 0; c < 5; c++) {
            if (glyph[r][c] === '1') {
              bm[(offsetY + r) * w + offsetX + c] = 1;
            }
          }
        }
      }
      offsetX += charAdvance(ch);
    }
  });

  return { w, h, bm };
}

interface RippleWave {
  x: number;
  y: number;
  t: number;
}

const DataGraphCanvas: React.FC<DataGraphCanvasProps> = ({ language, initialCount }) => {
  const copy = siteContent[language].hero.graph;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [badges, setBadges] = useState<{ id: number; text: string }[]>([]);
  const pointerRef = useRef<{ x: number; y: number }>({ x: -10000, y: -10000 });
  const wavesRef = useRef<RippleWave[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId = 0;
    let isRunning = false;
    let isVisible = true;

    let n = 0;
    let pitch = 10;
    let cellSize = 8;
    let width = 800;
    let height = 240;
    let dpr = 1;

    let hx = new Float32Array(0);
    let hy = new Float32Array(0);
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let heat = new Float32Array(0);
    let scatterUntil = new Float64Array(0);
    let levels = new Uint8Array(0);

    const setupGrid = () => {
      width = container.clientWidth || 800;
      const maxH = Math.max(260, Math.min(window.innerHeight * 0.46, 420));

      const twoTierLines = ['BEVILAQUA', 'DATA LABS'];
      const candidates = [
        { lines: twoTierLines, scale: 2, minPitch: 6.0 },
        { lines: twoTierLines, scale: 1, minPitch: 0 },
      ];

      let chosen = candidates[candidates.length - 1];
      let bm = buildBitmap(chosen.lines);
      for (const cand of candidates) {
        const testBm = buildBitmap(cand.lines);
        const colsNeeded = (testBm.w + 4) * cand.scale;
        const rowsNeeded = (testBm.h + 6) * cand.scale;
        const testPitch = Math.min(width / colsNeeded, maxH / rowsNeeded);
        if (testPitch >= cand.minPitch) {
          chosen = cand;
          bm = testBm;
          break;
        }
      }

      const scale = chosen.scale;
      const rows = (bm.h + 6) * scale;
      const rawPitch = Math.min(width / ((bm.w + 4) * scale), maxH / rows);
      pitch = Math.max(4.5, Math.min(15, rawPitch));
      cellSize = pitch * 0.78;

      const textCols = bm.w * scale;
      let totalCols = Math.floor(width / pitch);
      if ((totalCols - textCols) % 2 !== 0) totalCols--;
      const marginCols = (totalCols - textCols) / 2;
      const marginRow = 3 * scale;
      const offsetX = (width - totalCols * pitch) / 2;
      height = Math.round(rows * pitch);

      container.style.height = `${height}px`;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      n = totalCols * rows;
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      px = new Float32Array(n);
      py = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      heat = new Float32Array(n);
      scatterUntil = new Float64Array(n);
      levels = new Uint8Array(n);

      let seed = 1337;
      const rand = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };

      let idx = 0;
      for (let c = 0; c < totalCols; c++) {
        for (let r = 0; r < rows; r++) {
          const bx = Math.floor((c - marginCols) / scale);
          const by = Math.floor((r - marginRow) / scale);
          const isLetter =
            c >= marginCols &&
            bx >= 0 &&
            bx < bm.w &&
            by >= 0 &&
            by < bm.h &&
            bm.bm[by * bm.w + bx] === 1;

          const rv = rand();
          let lvl = 0;
          if (isLetter) {
            lvl = rv < 0.18 ? 2 : rv < 0.65 ? 3 : 4;
          } else {
            lvl = rv < 0.055 ? 1 : rv < 0.072 ? 2 : 0;
          }

          const targetX = offsetX + c * pitch + pitch / 2;
          const targetY = r * pitch + pitch / 2;

          hx[idx] = targetX;
          hy[idx] = targetY;
          px[idx] = prefersReducedMotion
            ? targetX
            : targetX + (rand() - 0.5) * pitch * 5;
          py[idx] = prefersReducedMotion
            ? targetY
            : height + pitch * (1 + rand() * 5);
          levels[idx] = lvl;
          idx++;
        }
      }
    };

    setupGrid();

    const ctx =
      canvas.getContext('2d', { desynchronized: true }) || canvas.getContext('2d');
    const supportsRoundRect =
      typeof Path2D !== 'undefined' && typeof Path2D.prototype.roundRect === 'function';

    const render = (now: number) => {
      if (!isVisible || document.hidden || !ctx) {
        isRunning = false;
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const maxWaveRadius = Math.max(210, Math.min(width * 0.35, 290));
      const maxWaveRadiusSq = maxWaveRadius * maxWaveRadius;
      const waveSpeed = 0.42;

      if (wavesRef.current.length > 0) {
        wavesRef.current = wavesRef.current.filter(
          (w) => (now - w.t) * waveSpeed < maxWaveRadius + 30
        );
      }

      const activeWaves = wavesRef.current;
      const hasWaves = activeWaves.length > 0;
      const mx = pointerRef.current.x;
      const my = pointerRef.current.y;
      const hasPointer = mx > -1000;

      const pathsByLevel = PALETTE.map(() => new Path2D());
      const glowPaths = [0, 1, 2, 3].map(() => new Path2D());

      if (!prefersReducedMotion && Math.random() < 0.35 && n > 0) {
        const sparkIdx = (Math.random() * n) | 0;
        if (levels[sparkIdx] > 0 && heat[sparkIdx] < 0.35) {
          heat[sparkIdx] = 0.45;
        }
      }

      const margin = cellSize * 0.6;

      for (let i = 0; i < n; i++) {
        let h = heat[i];
        if (!prefersReducedMotion) {
          let dvx = vx[i];
          let dvy = vy[i];
          const curX = px[i];
          const curY = py[i];

          // Fast Bounding-Box & Squared-Distance Culling for Click Waves
          if (hasWaves) {
            for (let w = 0; w < activeWaves.length; w++) {
              const wave = activeWaves[w];
              const wdx = curX - wave.x;
              if (wdx > maxWaveRadius || wdx < -maxWaveRadius) continue;
              const wdy = curY - wave.y;
              if (wdy > maxWaveRadius || wdy < -maxWaveRadius) continue;

              const distSq = wdx * wdx + wdy * wdy;
              if (distSq < maxWaveRadiusSq) {
                const waveRadius = (now - wave.t) * waveSpeed;
                const dist = Math.sqrt(distSq) || 0.1;
                const delta = waveRadius - dist;

                if (delta > -16 && delta < 26) {
                  const ringProfile = Math.cos((delta / 26) * 1.570796);
                  const distancePower = Math.pow(1 - dist / maxWaveRadius, 1.45);

                  h = Math.max(h, ringProfile * distancePower * 0.95);

                  const push = ringProfile * distancePower * 0.98;
                  if (push > 0.02) {
                    const angle = Math.atan2(wdy, wdx) + (Math.random() - 0.5) * 0.48;
                    dvx += Math.cos(angle) * push;
                    dvy += Math.sin(angle) * push;

                    const holdDuration =
                      (1850 + Math.random() * 500) * (0.35 + 0.65 * distancePower);
                    if (now + holdDuration > scatterUntil[i]) {
                      scatterUntil[i] = now + holdDuration;
                    }
                  }
                }
              }
            }
          }

          const isScattered = now < scatterUntil[i];

          if (isScattered) {
            dvx *= 0.89;
            dvy *= 0.89;
          } else {
            const timeSinceRelease = now - scatterUntil[i];
            const springRamp =
              scatterUntil[i] > 0 ? Math.min(1, timeSinceRelease / 1100) : 1;
            const springK = 0.012 + 0.055 * (springRamp * springRamp);
            const damping = 0.86 - 0.06 * springRamp;

            dvx = (dvx + (hx[i] - curX) * springK) * damping;
            dvy = (dvy + (hy[i] - curY) * springK) * damping;
          }

          // Fast Bounding-Box Culling for Hover Repulsion
          if (hasPointer) {
            const dx = curX - mx;
            if (dx < 75 && dx > -75) {
              const dy = curY - my;
              if (dy < 75 && dy > -75) {
                const distSq = dx * dx + dy * dy;
                if (distSq < 5600) {
                  const dist = Math.sqrt(distSq) || 1;
                  const force = 1 - dist / 75;
                  h = Math.max(h, 0.4 + force * 0.6);
                  dvx += (dx / dist) * force * 0.85;
                  dvy += (dy / dist) * force * 0.85;
                }
              }
            }
          }

          let nextX = curX + dvx;
          let nextY = curY + dvy;

          if (nextX < margin) {
            nextX = margin;
            dvx = Math.abs(dvx) * 0.5;
          } else if (nextX > width - margin) {
            nextX = width - margin;
            dvx = -Math.abs(dvx) * 0.5;
          }

          if (nextY < margin) {
            nextY = margin;
            dvy = Math.abs(dvy) * 0.5;
          } else if (nextY > height - margin) {
            nextY = height - margin;
            dvy = -Math.abs(dvy) * 0.5;
          }

          vx[i] = dvx;
          vy[i] = dvy;
          px[i] = nextX;
          py[i] = nextY;
          h *= isScattered ? 0.975 : 0.94;
          heat[i] = h;
        }

        const s = cellSize * (1 + Math.min(h, 1) * 0.24);
        const half = s * 0.5;
        const targetPath = pathsByLevel[levels[i]];

        if (supportsRoundRect) {
          targetPath.roundRect(px[i] - half, py[i] - half, s, s, s * 0.22);
        } else {
          targetPath.rect(px[i] - half, py[i] - half, s, s);
        }

        if (h > 0.08) {
          const gIdx = Math.min(3, (h * 4) | 0);
          if (supportsRoundRect) {
            glowPaths[gIdx].roundRect(px[i] - half, py[i] - half, s, s, s * 0.22);
          } else {
            glowPaths[gIdx].rect(px[i] - half, py[i] - half, s, s);
          }
        }
      }

      pathsByLevel.forEach((path, lvl) => {
        ctx.fillStyle = PALETTE[lvl];
        ctx.fill(path);
      });

      glowPaths.forEach((path, idx) => {
        ctx.fillStyle = `rgba(56, 189, 248, ${(idx + 1) * 0.18})`;
        ctx.fill(path);
      });

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    // Pause rendering completely when scrolled off-screen
    const intersectionObs = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) startLoop();
      },
      { rootMargin: '15% 0px' }
    );
    intersectionObs.observe(container);

    const handleVisibilityChange = () => {
      if (!document.hidden && isVisible) startLoop();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeObs = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupGrid();
        startLoop();
      }, 100);
    });
    resizeObs.observe(container);

    startLoop();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      intersectionObs.disconnect();
      resizeObs.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: -10000, y: -10000 };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();

    pointerRef.current = { x, y };
    wavesRef.current.push({ x, y, t: now });
    const id = Date.now() + Math.random();
    setBadges((prev) => [...prev, { id, text: '+1 pulse' }]);
    setTimeout(() => {
      setBadges((prev) => prev.filter((b) => b.id !== id));
    }, 1150);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') {
      handlePointerLeave();
    }
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-card/70 backdrop-blur-md p-4 md:p-5 shadow-xl">
      {badges.map((b) => (
        <span
          key={b.id}
          className="animate-plus-badge pointer-events-none absolute -top-3 right-6 z-20 rounded-full border border-sky-400/50 bg-background px-2.5 py-0.5 font-mono text-xs font-semibold text-sky-300 shadow"
        >
          {b.text}
        </span>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-sky-400">
            {initialCount === null
              ? '—'
              : initialCount.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US')}
          </span>
          <span className="text-foreground/75">{copy.epochsLabel}</span>
          <span className="hidden md:inline-block text-foreground/40 font-mono text-xs">
            ({copy.headerTitle})
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-foreground/60">
          <span>{copy.less}</span>
          {PALETTE.map((color, idx) => (
            <i
              key={idx}
              className="inline-block h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>{copy.more}</span>
        </div>
      </div>

      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerLeave}
        role="img"
        aria-label="Bevilaqua Data Labs interactive telemetry matrix"
        className="relative w-full cursor-pointer select-none touch-pan-y overflow-hidden"
        style={{ height: 340 }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none block h-full w-full"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 font-mono text-[11px] md:text-xs text-foreground/55">
        <span>{copy.hint}</span>
        <span className="text-sky-400/90">{copy.scrollHint}</span>
      </div>
    </div>
  );
};

export default DataGraphCanvas;
