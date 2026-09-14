type EdgeColor = 'k' | 'a' | 's';

interface BeviMarkProps {
  size?: number;
  ink?: string;
  accent?: string;
  inner?: string;
  nodeFill?: string;
  className?: string;
}

const POINTS: Record<string, [number, number]> = {
  p1: [100, 18], p2: [122, 58], p3: [140, 96], p4: [163, 133], p5: [172, 168],
  p6: [158, 205], p7: [128, 228], p8: [95, 233], p9: [62, 222], p10: [38, 193],
  p11: [32, 158], p12: [45, 120], p13: [72, 72],
  A: [100, 80], B: [127, 104], C: [74, 104], D: [100, 118], E: [140, 140],
  F: [60, 140], G: [100, 152], H: [122, 172], I: [78, 172], J: [100, 192],
  K: [140, 196], L: [60, 196], M: [100, 215],
};

const PERIMETER = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13'];

const EXTRA_EDGES: [string, string, EdgeColor][] = [
  ['p1', 'A', 'k'], ['p1', 'B', 'a'], ['p1', 'C', 'a'],
  ['A', 'B', 'k'], ['A', 'C', 'k'], ['A', 'D', 'k'],
  ['B', 'D', 's'], ['C', 'D', 's'], ['B', 'p3', 's'], ['C', 'p13', 's'],
  ['B', 'E', 'a'], ['C', 'F', 'a'], ['p3', 'F', 'a'], ['p13', 'E', 'a'],
  ['D', 'G', 'a'], ['D', 'E', 's'], ['D', 'F', 's'], ['p12', 'D', 's'],
  ['E', 'p4', 'k'], ['F', 'p11', 'k'], ['E', 'G', 'k'], ['F', 'G', 'k'],
  ['G', 'H', 's'], ['G', 'I', 's'], ['G', 'J', 'a'],
  ['H', 'p5', 'a'], ['I', 'p10', 'a'], ['E', 'H', 'a'], ['F', 'I', 'a'],
  ['p4', 'H', 's'], ['H', 'K', 'k'], ['I', 'L', 'k'],
  ['K', 'p6', 's'], ['L', 'p9', 's'], ['H', 'J', 'k'], ['I', 'J', 'k'],
  ['J', 'K', 's'], ['J', 'L', 's'], ['K', 'p7', 'k'], ['L', 'p10', 'k'],
  ['J', 'M', 'a'], ['M', 'p8', 'k'], ['M', 'p7', 's'], ['M', 'p9', 's'],
];

const NODE_TYPES: Record<string, EdgeColor> = {
  p1: 'a', p2: 'a', p3: 'a', p4: 'a', p5: 'a', p6: 's', p7: 'k', p8: 's',
  p9: 'a', p10: 's', p11: 'k', p12: 's', p13: 's',
  A: 'a', B: 's', C: 'a', D: 'a', E: 'k', F: 's', G: 'a', H: 'k',
  I: 'a', J: 'k', K: 'a', L: 's', M: 'a',
};

const ALL_EDGES: [string, string, EdgeColor][] = [
  ...PERIMETER.map((node, i): [string, string, EdgeColor] => [node, PERIMETER[(i + 1) % PERIMETER.length], 'k']),
  ...EXTRA_EDGES,
];

/**
 * The Bevilaqua Data Labs mark: a drop silhouette built as a node mesh
 * (13 perimeter nodes hold the shape, 13 interior nodes carry the topology).
 * Colors default to CSS custom properties so the mark automatically renders
 * as the brand's "full color" variant in light mode and "reversed" in dark mode.
 */
const BeviMark = ({
  size = 32,
  ink = 'hsl(var(--foreground))',
  accent = 'hsl(var(--accent))',
  inner = 'hsl(var(--muted-foreground))',
  nodeFill,
  className,
}: BeviMarkProps) => {
  const scale = size / 204;
  const sizeH = Math.round((size * 252) / 204);
  const edgeWidth = 3.0 / Math.max(scale, 0.45);
  const ringWidth = 2.5 / Math.max(scale, 0.45);
  const colorFor: Record<EdgeColor, string> = { k: ink, a: accent, s: inner };

  return (
    <svg
      viewBox="0 0 204 252"
      width={size}
      height={sizeH}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
      aria-hidden="true"
    >
      <g fill="none" strokeLinecap="round">
        {ALL_EDGES.map(([u, v, c], i) => {
          const [x1, y1] = POINTS[u];
          const [x2, y2] = POINTS[v];
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colorFor[c]} strokeWidth={edgeWidth} />;
        })}
      </g>
      <g>
        {Object.entries(POINTS).map(([key, [x, y]]) => (
          <circle
            key={key}
            cx={x}
            cy={y}
            r={key.startsWith('p') ? 7.6 : 6.4}
            fill={nodeFill || colorFor[NODE_TYPES[key]]}
            stroke={ink}
            strokeWidth={ringWidth}
          />
        ))}
      </g>
    </svg>
  );
};

export default BeviMark;
