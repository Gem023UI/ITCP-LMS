import * as React from "react";
import "./AreaChart.css";

/** one record on the chart: `a` is the larger value (violet), `b` the smaller one (yellow) */
export type AreaPoint = {
  t: number; // timestamp (ms)
  a: number;
  b: number;
  title: string; // shown in the tooltip, e.g. the quiz name
  subtitle?: string;
};
export type AreaSeries = { label: string; color: string };

interface Props {
  points: AreaPoint[];
  /** x domain (ms): the chart is time-scaled between these two instants */
  from: number;
  to: number;
  seriesA: AreaSeries;
  seriesB: AreaSeries;
  height?: number;
  emptyText?: string;
  /** index to show as hovered on first render (previews / tests) */
  initialActive?: number | null;
}

const PAD = { l: 18, r: 18, t: 22, b: 58 };
const GRID_LINES = 5;
const TICKS = 5;

const fmtShort = (t: number) =>
  new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fmtLong = (t: number) =>
  new Date(t).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
const fmtTime = (t: number) =>
  new Date(t).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

/** smooth curve that never overshoots the data (monotone cubic) */
function monotonePath(p: [number, number][]) {
  const n = p.length;
  if (n === 0) return "";
  if (n === 1) return `M${p[0][0]},${p[0][1]}`;

  const dx: number[] = [];
  const s: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = p[i + 1][0] - p[i][0];
    s[i] = dx[i] === 0 ? 0 : (p[i + 1][1] - p[i][1]) / dx[i];
  }
  const t: number[] = new Array(n);
  t[0] = s[0];
  t[n - 1] = s[n - 2];
  for (let i = 1; i < n - 1; i++) t[i] = s[i - 1] * s[i] <= 0 ? 0 : (s[i - 1] + s[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
    } else {
      const a = t[i] / s[i];
      const b = t[i + 1] / s[i];
      const h = Math.hypot(a, b);
      if (h > 3) {
        const k = 3 / h;
        t[i] = k * a * s[i];
        t[i + 1] = k * b * s[i];
      }
    }
  }

  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${p[i][0] + h},${p[i][1] + t[i] * h} ${p[i + 1][0] - h},${p[i + 1][1] - t[i + 1] * h} ${p[i + 1][0]},${p[i + 1][1]}`;
  }
  return d;
}

export default function AreaChart({
  points,
  from,
  to,
  seriesA,
  seriesB,
  height = 320,
  emptyText = "No data in this period yet.",
  initialActive = null,
}: Props) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [W, setW] = React.useState(800);
  const [active, setActive] = React.useState<number | null>(initialActive);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = (w: number) => setW(Math.max(280, Math.round(w)));
    if (el.clientWidth) measure(el.clientWidth);
    const ro = new ResizeObserver(([e]) => measure(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sorted = React.useMemo(() => [...points].sort((x, y) => x.t - y.t), [points]);

  const H = height;
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const baseline = PAD.t + plotH;
  const span = Math.max(1, to - from);
  const xOf = (t: number) => PAD.l + Math.min(1, Math.max(0, (t - from) / span)) * plotW;

  const rawMax = Math.max(1, ...sorted.map((p) => Math.max(p.a, p.b)));
  const yMax = Math.max(4, Math.ceil(rawMax * 1.15));
  const yOf = (v: number) => PAD.t + (1 - v / yMax) * plotH;

  const geo = React.useMemo(() => {
    const ptsA = sorted.map((p) => [xOf(p.t), yOf(p.a)] as [number, number]);
    const ptsB = sorted.map((p) => [xOf(p.t), yOf(p.b)] as [number, number]);
    const area = (line: string, pts: [number, number][]) =>
      pts.length > 1
        ? `${line}L${pts[pts.length - 1][0]},${baseline}L${pts[0][0]},${baseline}Z`
        : "";
    const lineA = monotonePath(ptsA);
    const lineB = monotonePath(ptsB);
    return { ptsA, ptsB, lineA, lineB, areaA: area(lineA, ptsA), areaB: area(lineB, ptsB) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted, W, H, from, to, yMax]);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!sorted.length) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0;
    let bestD = Infinity;
    geo.ptsA.forEach(([px], i) => {
      const d = Math.abs(px - x);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  };

  const ax = active != null ? geo.ptsA[active]?.[0] : undefined;
  const cur = active != null ? sorted[active] : undefined;
  const TW = 236; // tooltip width (keep in sync with the css)
  const tipLeft = ax == null ? 0 : ax + 16 + TW > W ? ax - 16 - TW : ax + 16;

  const ticks = Array.from({ length: TICKS }, (_, i) => from + (span * i) / (TICKS - 1));

  return (
    <div className="area-chart" ref={wrapRef}>
      <div className="area-chart__legend">
        <span>
          <i style={{ background: seriesA.color }} />
          {seriesA.label}
        </span>
        <span>
          <i style={{ background: seriesB.color }} />
          {seriesB.label}
        </span>
      </div>

      <svg
        className="area-chart__svg"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${seriesA.label} and ${seriesB.label} over time`}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setActive(null)}
      >
        <defs>
          <linearGradient id={`${uid}-a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={seriesA.color} stopOpacity="0.38" />
            <stop offset="100%" stopColor={seriesA.color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={seriesB.color} stopOpacity="0.34" />
            <stop offset="100%" stopColor={seriesB.color} stopOpacity="0" />
          </linearGradient>
          {/* soft fade at both ends of the chart */}
          <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="7%" stopColor="#fff" stopOpacity="1" />
            <stop offset="93%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`${uid}-mask`}>
            <rect x="0" y="0" width={W} height={H} fill={`url(#${uid}-fade)`} />
          </mask>
        </defs>

        {/* dashed grid */}
        {Array.from({ length: GRID_LINES }, (_, i) => {
          const y = PAD.t + (plotH * i) / (GRID_LINES - 1);
          return (
            <line
              key={i}
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y}
              y2={y}
              className="area-chart__grid"
            />
          );
        })}

        {sorted.length === 0 ? (
          <text x={W / 2} y={PAD.t + plotH / 2} textAnchor="middle" className="area-chart__empty">
            {emptyText}
          </text>
        ) : (
          <g mask={`url(#${uid}-mask)`}>
            {geo.areaA && <path d={geo.areaA} fill={`url(#${uid}-a)`} />}
            {geo.areaB && <path d={geo.areaB} fill={`url(#${uid}-b)`} />}
            {geo.lineA && (
              <path d={geo.lineA} fill="none" stroke={seriesA.color} strokeWidth="2.2" strokeLinecap="round" />
            )}
            {geo.lineB && (
              <path d={geo.lineB} fill="none" stroke={seriesB.color} strokeWidth="2.2" strokeLinecap="round" />
            )}
            {/* a single record has no line to draw: show it as a dot */}
            {sorted.length === 1 && (
              <>
                <circle cx={geo.ptsA[0][0]} cy={geo.ptsA[0][1]} r="4" fill={seriesA.color} />
                <circle cx={geo.ptsB[0][0]} cy={geo.ptsB[0][1]} r="4" fill={seriesB.color} />
              </>
            )}
          </g>
        )}

        {/* x axis labels */}
        {ticks.map((t, i) => {
          const x = xOf(t);
          const hidden = ax != null && Math.abs(x - ax) < 56;
          return (
            <text
              key={i}
              x={x}
              y={H - 18}
              textAnchor={i === 0 ? "start" : i === TICKS - 1 ? "end" : "middle"}
              className="area-chart__tick"
              opacity={hidden ? 0 : 1}
            >
              {fmtShort(t)}
            </text>
          );
        })}

        {/* hover: crosshair + dots on both lines */}
        {cur && ax != null && (
          <g pointerEvents="none">
            <line x1={ax} x2={ax} y1={PAD.t - 8} y2={H - PAD.b + 22} className="area-chart__cross" />
            <circle cx={ax} cy={yOf(cur.a)} r="11" fill={seriesA.color} opacity="0.25" />
            <circle cx={ax} cy={yOf(cur.a)} r="5" fill={seriesA.color} />
            <circle cx={ax} cy={yOf(cur.b)} r="11" fill={seriesB.color} opacity="0.25" />
            <circle cx={ax} cy={yOf(cur.b)} r="5" fill={seriesB.color} />
          </g>
        )}
      </svg>

      {/* date chip on the axis */}
      {cur && ax != null && (
        <div className="area-chart__chip" style={{ left: ax, top: H - 40 }}>
          {fmtShort(cur.t)}
        </div>
      )}

      {/* quick info: quiz, items, score, date */}
      {cur && ax != null && (
        <div className="area-chart__tip" style={{ left: tipLeft, top: PAD.t - 6, width: TW }}>
          <div className="area-chart__tip-head">
            <strong>{fmtLong(cur.t)}</strong>
            <span>{fmtTime(cur.t)}</span>
          </div>
          <div className="area-chart__tip-title">
            {cur.title}
            {cur.subtitle && <small>{cur.subtitle}</small>}
          </div>
          <div className="area-chart__tip-row">
            <i style={{ background: seriesA.color }} />
            <span>{seriesA.label}</span>
            <b>{cur.a}</b>
          </div>
          <div className="area-chart__tip-row">
            <i style={{ background: seriesB.color }} />
            <span>{seriesB.label}</span>
            <b>{cur.b}</b>
          </div>
        </div>
      )}
    </div>
  );
}
