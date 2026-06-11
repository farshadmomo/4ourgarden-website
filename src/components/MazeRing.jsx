// Deterministic circular maze — the 4ourgarden logo motif.
// Every path carries pathLength=1 so draw-on animations can tween
// stroke-dashoffset between 1 and 0 without measuring.

function buildMaze(seed) {
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  const C = 150;
  const pt = (r, aDeg) => {
    const a = ((aDeg - 90) * Math.PI) / 180;
    return [
      +(C + r * Math.cos(a)).toFixed(2),
      +(C + r * Math.sin(a)).toFixed(2),
    ];
  };
  const arc = (r, a0, a1) => {
    const [x0, y0] = pt(r, a0);
    const [x1, y1] = pt(r, a1);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };

  const rings = [30, 50, 70, 90, 110, 130, 144];
  const gapW = 26;
  const paths = [];

  rings.forEach((r, i) => {
    const gaps = i === rings.length - 1 ? 1 : 1 + Math.floor(rnd() * 2);
    const starts = Array.from({ length: gaps }, () => rnd() * 360).sort(
      (a, b) => a - b
    );
    let prev = starts[starts.length - 1] + gapW - 360;
    starts.forEach((g0) => {
      if (g0 > prev + 4) paths.push(arc(r, prev, g0));
      prev = g0 + gapW;
    });
  });

  for (let i = 0; i < rings.length - 1; i++) {
    const n = 2 + Math.floor(rnd() * 2);
    for (let k = 0; k < n; k++) {
      const a = rnd() * 360;
      const [x0, y0] = pt(rings[i] + 2, a);
      const [x1, y1] = pt(rings[i + 1] - 2, a);
      paths.push(`M ${x0} ${y0} L ${x1} ${y1}`);
    }
  }

  return paths;
}

const MAZE_PATHS = buildMaze(7);

export default function MazeRing({
  className = "",
  strokeWidth = 5,
  ...props
}) {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="150" cy="150" r="9" fill="currentColor" />
      {MAZE_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength="1"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// Compact glyph for nav / marquee — fewer rings, heavier stroke.
export function MazeGlyph({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="150" cy="150" r="16" fill="currentColor" />
      <path
        d="M 150 86 A 64 64 0 1 1 86 150"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M 150 30 A 120 120 0 1 0 270 150"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinecap="round"
      />
    </svg>
  );
}
